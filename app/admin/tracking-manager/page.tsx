'use client';

import { useState, useEffect, useMemo } from 'react';
import { AuthGuard } from '@/components/auth-guard';
import { DashboardLayout } from '@/components/dashboard-layout';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MuiButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Activity,
  Search,
  Eye,
  Trash2,
  RefreshCw,
  Copy,
  Check,
  Calendar,
  Layers,
  FileDown,
  Send,
  GitCompare,
  User,
  GraduationCap,
  Building2,
  X,
  Phone,
  Mail,
  Filter,
  UserCheck,
  UserX,
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import BASE_URL from '@/app/config/api';

export interface StudentInfo {
  _id?: string;
  name?: string;
  phone?: string;
  email?: string;
}

export interface CollegeInfo {
  _id?: string;
  name?: string;
  shortName?: string;
}

export interface SearchFiltersData {
  searchText?: string | null;
  location?: string | null;
  category?: string | null;
  specialization?: string | null;
  type?: string | null;
  fees?: string | null;
  searchType?: string | null;
  [key: string]: any;
}

export interface TrackingItem {
  _id: string;
  action: string;
  student?: StudentInfo | null;
  visitorId: string;
  college?: CollegeInfo | string | null;
  searchFilters?: SearchFiltersData | null;
  createdAt: string;
  updatedAt?: string;
  __v?: number;
  [key: string]: any;
}

export default function TrackingManagerPage() {
  const [trackingList, setTrackingList] = useState<TrackingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [userTypeFilter, setUserTypeFilter] = useState('all'); // all, registered, anonymous

  // Modals state
  const [selectedEvent, setSelectedEvent] = useState<TrackingItem | null>(null);
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchTrackingDetails = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setIsRefreshing(true);
    else setIsLoading(true);

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${BASE_URL}/admin/tracking-details`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch tracking details: ${res.status}`);
      }

      const data = await res.json();
      const trackingData: TrackingItem[] = Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.tracking)
        ? data.tracking
        : Array.isArray(data)
        ? data
        : [];

      // Sort newest first
      const sorted = [...trackingData].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      });

      setTrackingList(sorted);
    } catch (err: any) {
      console.error('Error fetching tracking details:', err);
      toast({
        title: 'Notice',
        description: err.message || 'Could not load tracking details from server.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTrackingDetails();
  }, []);

  // Helpers
  const getCollegeName = (item: TrackingItem): string => {
    if (!item.college) return '';
    if (typeof item.college === 'object') {
      return item.college.name || item.college.shortName || item.college._id || '';
    }
    return String(item.college);
  };

  const getCollegeId = (item: TrackingItem): string => {
    if (!item.college) return '';
    if (typeof item.college === 'object') {
      return item.college._id || '';
    }
    return String(item.college);
  };

  const getFormattedDate = (dateString?: string): { date: string; time: string } => {
    if (!dateString) return { date: '-', time: '-' };
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return { date: dateString, time: '' };
      return {
        date: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
      };
    } catch {
      return { date: dateString, time: '' };
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({ title: 'Copied', description: 'Copied to clipboard' });
  };

  // Action badge configurations
  const getActionBadge = (action: string) => {
    const lower = (action || '').toLowerCase();
    switch (lower) {
      case 'view_detail':
      case 'view_details':
      case 'view':
        return {
          label: 'View Detail',
          classes: 'bg-blue-100 text-blue-800 border border-blue-200',
          icon: Eye,
        };
      case 'apply_now':
      case 'apply':
        return {
          label: 'Apply Now',
          classes: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
          icon: Send,
        };
      case 'download_brochure':
      case 'brochure':
        return {
          label: 'Download Brochure',
          classes: 'bg-purple-100 text-purple-800 border border-purple-200',
          icon: FileDown,
        };
      case 'search':
        return {
          label: 'Search Query',
          classes: 'bg-amber-100 text-amber-800 border border-amber-200',
          icon: Search,
        };
      case 'compare':
        return {
          label: 'Compare',
          classes: 'bg-teal-100 text-teal-800 border border-teal-200',
          icon: GitCompare,
        };
      case 'remove_compare':
        return {
          label: 'Remove Compare',
          classes: 'bg-rose-100 text-rose-800 border border-rose-200',
          icon: X,
        };
      default:
        return {
          label: action || 'Event',
          classes: 'bg-slate-100 text-slate-800 border border-slate-200',
          icon: Activity,
        };
    }
  };

  // Active non-null search filters helper
  const getActiveFilters = (filters?: SearchFiltersData | null) => {
    if (!filters) return [];
    return Object.entries(filters).filter(([_, val]) => val !== null && val !== undefined && val !== '');
  };

  // Filtered List
  const filteredList = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return trackingList.filter((item) => {
      const action = (item.action || '').toLowerCase();
      const collegeName = getCollegeName(item).toLowerCase();
      const studentName = (item.student?.name || '').toLowerCase();
      const studentEmail = (item.student?.email || '').toLowerCase();
      const studentPhone = (item.student?.phone || '').toLowerCase();
      const visitorId = (item.visitorId || '').toLowerCase();
      const dateStr = (item.createdAt || '').toLowerCase();

      // Search filters values
      const filterValues = item.searchFilters
        ? Object.values(item.searchFilters).filter(Boolean).join(' ').toLowerCase()
        : '';

      const matchesQuery =
        !query ||
        action.includes(query) ||
        collegeName.includes(query) ||
        studentName.includes(query) ||
        studentEmail.includes(query) ||
        studentPhone.includes(query) ||
        visitorId.includes(query) ||
        filterValues.includes(query) ||
        dateStr.includes(query);

      const matchesAction =
        actionFilter === 'all' || action === actionFilter.toLowerCase();

      const isRegistered = Boolean(item.student && item.student.name);
      const matchesUserType =
        userTypeFilter === 'all' ||
        (userTypeFilter === 'registered' && isRegistered) ||
        (userTypeFilter === 'anonymous' && !isRegistered);

      return matchesQuery && matchesAction && matchesUserType;
    });
  }, [trackingList, searchQuery, actionFilter, userTypeFilter]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = trackingList.length;
    const registeredStudentEvents = trackingList.filter((i) => Boolean(i.student && i.student.name)).length;
    const anonymousVisitorEvents = trackingList.filter((i) => !i.student).length;
    const uniqueVisitors = new Set(
      trackingList.filter((i) => !i.student).map((i) => i.visitorId).filter(Boolean)
    ).size;
    const searchEvents = trackingList.filter((i) => (i.action || '').toLowerCase() === 'search').length;

    return { total, registeredStudentEvents, anonymousVisitorEvents, uniqueVisitors, searchEvents };
  }, [trackingList]);

  // Handle Delete Record
  const handleDeleteEvent = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${BASE_URL}/admin/tracking-details/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) {
        throw new Error('Failed to delete tracking record');
      }

      toast({ title: 'Success', description: 'Tracking record deleted' });
      setTrackingList((prev) => prev.filter((i) => i._id !== id));
      setDeleteEventId(null);
    } catch (err: any) {
      console.error(err);
      toast({ title: 'Error', description: err.message || 'Failed to delete tracking record', variant: 'destructive' });
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <AuthGuard>
      <DashboardLayout>
        <div className="space-y-6 p-2 md:p-6 min-h-screen">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <Activity className="h-7 w-7 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Tracking Manager</h1>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Real-time tracking of student interactions, college views, searches, applications, and anonymous visitor traffic.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => fetchTrackingDetails(true)}
                disabled={isLoading || isRefreshing}
                className="inline-flex items-center px-3.5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin text-blue-600' : 'text-gray-500'}`} />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Events</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</h3>
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                <Layers className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Student Events</p>
                <h3 className="text-2xl font-bold text-emerald-600 mt-1">{stats.registeredStudentEvents}</h3>
              </div>
              <div className="h-12 w-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                <UserCheck className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Anonymous Visitors</p>
                <h3 className="text-2xl font-bold text-teal-600 mt-1">{stats.uniqueVisitors}</h3>
                <span className="text-xs text-gray-400">({stats.anonymousVisitorEvents} events)</span>
              </div>
              <div className="h-12 w-12 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600">
                <UserX className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Search Queries</p>
                <h3 className="text-2xl font-bold text-amber-600 mt-1">{stats.searchEvents}</h3>
              </div>
              <div className="h-12 w-12 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                <Search className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:max-w-md">
              <TextField
                label="Search by Student, College, Visitor ID, or Keyword"
                variant="outlined"
                size="small"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <Search className="h-4 w-4 text-gray-400 mr-2" />,
                }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel id="user-type-filter-label">User Type</InputLabel>
                <Select
                  labelId="user-type-filter-label"
                  value={userTypeFilter}
                  label="User Type"
                  onChange={(e) => setUserTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">All Traffic</MenuItem>
                  <MenuItem value="registered">Registered Students</MenuItem>
                  <MenuItem value="anonymous">Anonymous Visitors</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 170 }}>
                <InputLabel id="action-filter-label">Action Type</InputLabel>
                <Select
                  labelId="action-filter-label"
                  value={actionFilter}
                  label="Action Type"
                  onChange={(e) => setActionFilter(e.target.value)}
                >
                  <MenuItem value="all">All Actions</MenuItem>
                  <MenuItem value="view_detail">View Detail</MenuItem>
                  <MenuItem value="apply_now">Apply Now</MenuItem>
                  <MenuItem value="download_brochure">Download Brochure</MenuItem>
                  <MenuItem value="search">Search</MenuItem>
                  <MenuItem value="compare">Compare</MenuItem>
                  <MenuItem value="remove_compare">Remove Compare</MenuItem>
                </Select>
              </FormControl>

              {(searchQuery || actionFilter !== 'all' || userTypeFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActionFilter('all');
                    setUserTypeFilter('all');
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1 underline"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Table Container */}
          <div className="relative">
            {isLoading ? (
              <div className="min-h-[300px] flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
                <p className="text-sm text-gray-500">Loading tracking data...</p>
              </div>
            ) : filteredList.length === 0 ? (
              <div className="min-h-[250px] flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200 p-8 text-center">
                <Activity className="h-12 w-12 text-gray-300 mb-3" />
                <h3 className="text-base font-semibold text-gray-700">No tracking records found</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-sm">
                  {searchQuery || actionFilter !== 'all' || userTypeFilter !== 'all'
                    ? 'No tracking events match the current filter criteria.'
                    : 'No tracking interactions recorded yet.'}
                </p>
              </div>
            ) : (
              <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '0.75rem', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 650 }}>
                  <Table stickyHeader aria-label="tracking details table">
                    <TableHead>
                      <TableRow sx={{ '& th': { backgroundColor: '#f9fafb', fontWeight: 600, color: '#374151' } }}>
                        <TableCell width={60}>Sr.No</TableCell>
                        <TableCell width={160}>Date & Time</TableCell>
                        <TableCell width={160}>Action</TableCell>
                        <TableCell>Student / User</TableCell>
                        <TableCell>College / Target</TableCell>
                        <TableCell>Search / Filters</TableCell>
                        <TableCell align="right" width={110}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredList
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((item, index) => {
                          const { date, time } = getFormattedDate(item.createdAt);
                          const badge = getActionBadge(item.action);
                          const IconComponent = badge.icon;
                          const collegeName = getCollegeName(item);
                          const student = item.student;
                          const activeFilters = getActiveFilters(item.searchFilters);

                          return (
                            <TableRow key={item._id || index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell className="text-gray-500 font-medium">
                                {page * rowsPerPage + index + 1}
                              </TableCell>

                              {/* Date & Time */}
                              <TableCell>
                                <div className="text-xs font-semibold text-gray-900">{date}</div>
                                {time && <div className="text-xs text-gray-500">{time}</div>}
                              </TableCell>

                              {/* Action Badge */}
                              <TableCell>
                                <span
                                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${badge.classes}`}
                                >
                                  <IconComponent className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                                  {badge.label}
                                </span>
                              </TableCell>

                              {/* Student / User info */}
                              <TableCell>
                                {student && student.name ? (
                                  <div>
                                    <div className="font-semibold text-gray-900 flex items-center gap-1.5">
                                      <GraduationCap className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                                      <span>{student.name}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-0.5">
                                      {student.email || student.phone || 'Registered User'}
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <div className="flex items-center space-x-1.5">
                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                                        Anonymous Visitor
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-1 mt-1 text-xs text-gray-400 font-mono">
                                      <span className="max-w-[130px] truncate" title={item.visitorId}>
                                        {item.visitorId ? item.visitorId.slice(0, 13) + '...' : '-'}
                                      </span>
                                      {item.visitorId && (
                                        <button
                                          type="button"
                                          onClick={() => handleCopy(item.visitorId, item._id)}
                                          className="text-gray-400 hover:text-gray-700 p-0.5 rounded"
                                          title="Copy Visitor ID"
                                        >
                                          {copiedId === item._id ? (
                                            <Check className="h-3 w-3 text-emerald-600" />
                                          ) : (
                                            <Copy className="h-3 w-3" />
                                          )}
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </TableCell>

                              {/* College / Target */}
                              <TableCell>
                                {collegeName ? (
                                  <div className="flex items-start space-x-1.5">
                                    <Building2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm font-medium text-gray-900 leading-tight">
                                      {collegeName}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-xs text-gray-400 italic">
                                    {activeFilters.length > 0 ? 'Search Platform' : 'General Platform'}
                                  </span>
                                )}
                              </TableCell>

                              {/* Search Filters */}
                              <TableCell>
                                {activeFilters.length > 0 ? (
                                  <div className="flex flex-wrap gap-1 max-w-xs">
                                    {activeFilters.slice(0, 2).map(([key, val]) => (
                                      <span
                                        key={key}
                                        className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded"
                                      >
                                        <strong className="capitalize">{key}:</strong> {String(val)}
                                      </span>
                                    ))}
                                    {activeFilters.length > 2 && (
                                      <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">
                                        +{activeFilters.length - 2} more
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-xs text-gray-400">-</span>
                                )}
                              </TableCell>

                              {/* Actions */}
                              <TableCell align="right">
                                <div className="flex items-center justify-end space-x-1">
                                  <Tooltip title="View All Details">
                                    <IconButton
                                      size="small"
                                      color="primary"
                                      onClick={() => setSelectedEvent(item)}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title="Delete Record">
                                    <IconButton
                                      size="small"
                                      color="error"
                                      onClick={() => setDeleteEventId(item._id)}
                                      disabled={!item._id}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </IconButton>
                                  </Tooltip>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  component="div"
                  count={filteredList.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, 50, 100]}
                />
              </Paper>
            )}
          </div>

          {/* View Event Details Modal - Shows ALL fields */}
          <Dialog
            open={!!selectedEvent}
            onClose={() => setSelectedEvent(null)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-blue-600" />
                <span className="font-bold text-gray-900">Tracking Event Details</span>
              </div>
              <IconButton size="small" onClick={() => setSelectedEvent(null)}>
                <X className="h-4 w-4" />
              </IconButton>
            </DialogTitle>

            <DialogContent className="pt-4 space-y-4">
              {selectedEvent && (
                <div className="space-y-4">
                  {/* Top Action & Timestamp Banner */}
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          getActionBadge(selectedEvent.action).classes
                        }`}
                      >
                        {getActionBadge(selectedEvent.action).label}
                      </span>
                      <h4 className="text-base font-bold text-gray-900 mt-2">
                        {getCollegeName(selectedEvent) || 'General Interaction / Search Event'}
                      </h4>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-gray-400 uppercase font-semibold">Created Date & Time</p>
                      <p className="text-sm font-medium text-gray-800 mt-0.5">
                        {selectedEvent.createdAt
                          ? new Date(selectedEvent.createdAt).toLocaleString('en-US', {
                              dateStyle: 'medium',
                              timeStyle: 'medium',
                            })
                          : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Student Details Card */}
                  <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-5 w-5 text-blue-600" />
                        <h5 className="font-bold text-gray-900 text-sm">Student Information</h5>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          selectedEvent.student
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {selectedEvent.student ? 'Registered Student' : 'Anonymous / Not Logged In'}
                      </span>
                    </div>

                    {selectedEvent.student ? (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                        <div className="p-2.5 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 font-semibold uppercase">Student Name</p>
                          <p className="text-sm font-bold text-gray-900 mt-0.5">
                            {selectedEvent.student.name || '-'}
                          </p>
                        </div>

                        <div className="p-2.5 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 font-semibold uppercase">Phone</p>
                          <p className="text-sm font-medium text-gray-900 mt-0.5">
                            {selectedEvent.student.phone ? (
                              <a href={`tel:${selectedEvent.student.phone}`} className="text-blue-600 hover:underline">
                                {selectedEvent.student.phone}
                              </a>
                            ) : (
                              '-'
                            )}
                          </p>
                        </div>

                        <div className="p-2.5 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 font-semibold uppercase">Email</p>
                          <p className="text-sm font-medium text-gray-900 mt-0.5 truncate">
                            {selectedEvent.student.email ? (
                              <a href={`mailto:${selectedEvent.student.email}`} className="text-blue-600 hover:underline">
                                {selectedEvent.student.email}
                              </a>
                            ) : (
                              '-'
                            )}
                          </p>
                        </div>

                        {selectedEvent.student._id && (
                          <div className="p-2.5 bg-gray-50 rounded-lg sm:col-span-3">
                            <p className="text-xs text-gray-500 font-semibold uppercase">Student User ID</p>
                            <p className="text-xs font-mono text-gray-700 mt-0.5">
                              {selectedEvent.student._id}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 italic">
                        This action was performed by an anonymous visitor before signing in.
                      </p>
                    )}
                  </div>

                  {/* College Details Card */}
                  <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-3">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      <h5 className="font-bold text-gray-900 text-sm">College Target Information</h5>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-2.5 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 font-semibold uppercase">College Name</p>
                        <p className="text-sm font-bold text-gray-900 mt-0.5">
                          {getCollegeName(selectedEvent) || 'None (Search Event)'}
                        </p>
                      </div>

                      <div className="p-2.5 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 font-semibold uppercase">College ID</p>
                        <p className="text-xs font-mono text-gray-700 mt-0.5">
                          {getCollegeId(selectedEvent) || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Search Filters Card */}
                  <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-3">
                    <div className="flex items-center space-x-2">
                      <Search className="h-5 w-5 text-amber-600" />
                      <h5 className="font-bold text-gray-900 text-sm">Search Filters</h5>
                    </div>

                    {selectedEvent.searchFilters && getActiveFilters(selectedEvent.searchFilters).length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                        {Object.entries(selectedEvent.searchFilters).map(([k, v]) => (
                          <div key={k} className={`p-2.5 rounded-lg border ${v !== null && v !== undefined && v !== '' ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
                            <p className="text-xs font-semibold uppercase">{k}</p>
                            <p className="text-xs font-medium mt-0.5">{v !== null && v !== undefined && v !== '' ? String(v) : 'null'}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                        {selectedEvent.searchFilters && Object.entries(selectedEvent.searchFilters).map(([k, v]) => (
                          <div key={k} className="p-2 bg-gray-50 rounded border border-gray-200 text-gray-400 text-xs">
                            <span className="font-semibold uppercase">{k}: </span>
                            <span>{v === null ? 'null' : String(v)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Session / IDs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-white border rounded-lg">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-400 uppercase font-semibold">Visitor ID</p>
                        {selectedEvent.visitorId && (
                          <button
                            type="button"
                            onClick={() => handleCopy(selectedEvent.visitorId, 'modal-visitor')}
                            className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <Copy className="h-3 w-3" />
                            Copy
                          </button>
                        )}
                      </div>
                      <p className="font-mono text-gray-800 text-xs mt-1 break-all">
                        {selectedEvent.visitorId || 'N/A'}
                      </p>
                    </div>

                    <div className="p-3 bg-white border rounded-lg">
                      <p className="text-xs text-gray-400 uppercase font-semibold">Record ID (_id)</p>
                      <p className="font-mono text-gray-800 text-xs mt-1 break-all">
                        {selectedEvent._id || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Complete Raw JSON Viewer */}
                  <div className="border rounded-lg p-3 bg-slate-900 text-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-mono text-slate-400 font-semibold">Complete Event JSON Object:</p>
                      <button
                        type="button"
                        onClick={() => handleCopy(JSON.stringify(selectedEvent, null, 2), 'raw-json')}
                        className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono"
                      >
                        <Copy className="h-3 w-3" />
                        Copy JSON
                      </button>
                    </div>
                    <pre className="text-xs font-mono overflow-x-auto max-h-56 text-emerald-400">
                      {JSON.stringify(selectedEvent, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </DialogContent>

            <DialogActions className="border-t p-3">
              <MuiButton onClick={() => setSelectedEvent(null)} variant="outlined">
                Close
              </MuiButton>
            </DialogActions>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={!!deleteEventId}
            onClose={() => setDeleteEventId(null)}
          >
            <DialogTitle>Confirm Delete Event</DialogTitle>
            <DialogContent>
              <p className="text-sm text-gray-600">
                Are you sure you want to delete this tracking record? This action cannot be undone.
              </p>
            </DialogContent>
            <DialogActions>
              <MuiButton onClick={() => setDeleteEventId(null)}>Cancel</MuiButton>
              <MuiButton
                color="error"
                variant="contained"
                onClick={() => deleteEventId && handleDeleteEvent(deleteEventId)}
              >
                Delete
              </MuiButton>
            </DialogActions>
          </Dialog>
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}
