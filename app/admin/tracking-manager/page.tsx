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
  ExternalLink,
  X,
  Filter,
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import BASE_URL from '@/app/config/api';

export interface SearchFiltersData {
  searchText?: string;
  location?: string;
  category?: string;
  specialization?: string;
  type?: string;
  fees?: string;
  searchType?: string;
  [key: string]: any;
}

export interface TrackingItem {
  _id?: string;
  id?: string;
  action: string;
  collegeId?: string | { _id?: string; name?: string; shortName?: string };
  collegeName?: string;
  visitorId?: string;
  userId?: string | { _id?: string; name?: string; email?: string };
  searchFilters?: SearchFiltersData;
  ip?: string;
  userAgent?: string;
  createdAt?: string;
  updatedAt?: string;
  timestamp?: string;
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

      // Sort newest first if dates are present
      const sorted = [...trackingData].sort((a, b) => {
        const dateA = new Date(a.createdAt || a.timestamp || 0).getTime();
        const dateB = new Date(b.createdAt || b.timestamp || 0).getTime();
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
  const getEventId = (item: TrackingItem): string => item._id || item.id || '';

  const getCollegeDisplay = (item: TrackingItem): string => {
    if (item.collegeName) return item.collegeName;
    if (typeof item.collegeId === 'object' && item.collegeId !== null) {
      return item.collegeId.name || item.collegeId.shortName || item.collegeId._id || 'N/A';
    }
    if (typeof item.collegeId === 'string') {
      return item.collegeId;
    }
    return '-';
  };

  const getVisitorDisplay = (item: TrackingItem): string => item.visitorId || 'Anonymous';

  const getUserDisplay = (item: TrackingItem): string => {
    if (typeof item.userId === 'object' && item.userId !== null) {
      return item.userId.name || item.userId.email || item.userId._id || '';
    }
    if (typeof item.userId === 'string') {
      return item.userId;
    }
    if (typeof item.user === 'object' && item.user !== null) {
      return item.user.name || item.user.email || '';
    }
    return '';
  };

  const getFormattedDate = (item: TrackingItem): { date: string; time: string } => {
    const raw = item.createdAt || item.timestamp || item.updatedAt;
    if (!raw) return { date: '-', time: '-' };
    try {
      const d = new Date(raw);
      if (isNaN(d.getTime())) return { date: String(raw), time: '' };
      return {
        date: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
      };
    } catch {
      return { date: String(raw), time: '' };
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({ title: 'Copied', description: 'Visitor ID copied to clipboard' });
  };

  // Action styling and labels
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

  // Filtering
  const filteredList = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return trackingList.filter((item) => {
      const action = (item.action || '').toLowerCase();
      const college = getCollegeDisplay(item).toLowerCase();
      const visitor = getVisitorDisplay(item).toLowerCase();
      const user = getUserDisplay(item).toLowerCase();
      const searchTerms = item.searchFilters
        ? Object.values(item.searchFilters).filter(Boolean).join(' ').toLowerCase()
        : '';
      const dateStr = (item.createdAt || item.timestamp || '').toLowerCase();

      const matchesQuery =
        !query ||
        action.includes(query) ||
        college.includes(query) ||
        visitor.includes(query) ||
        user.includes(query) ||
        searchTerms.includes(query) ||
        dateStr.includes(query);

      const matchesAction =
        actionFilter === 'all' || action === actionFilter.toLowerCase();

      return matchesQuery && matchesAction;
    });
  }, [trackingList, searchQuery, actionFilter]);

  // KPI Statistics
  const stats = useMemo(() => {
    const total = trackingList.length;
    const uniqueVisitors = new Set(
      trackingList.map((i) => i.visitorId).filter(Boolean)
    ).size;
    const searches = trackingList.filter(
      (i) => (i.action || '').toLowerCase() === 'search'
    ).length;
    const conversions = trackingList.filter((i) => {
      const act = (i.action || '').toLowerCase();
      return act === 'apply_now' || act === 'download_brochure';
    }).length;

    return { total, uniqueVisitors, searches, conversions };
  }, [trackingList]);

  // Handle Delete Event
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
      setTrackingList((prev) => prev.filter((i) => getEventId(i) !== id));
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
                Monitor user activity, college views, searches, applications, brochure downloads, and visitor analytics.
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
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Unique Visitors</p>
                <h3 className="text-2xl font-bold text-teal-600 mt-1">{stats.uniqueVisitors}</h3>
              </div>
              <div className="h-12 w-12 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600">
                <User className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Search Queries</p>
                <h3 className="text-2xl font-bold text-amber-600 mt-1">{stats.searches}</h3>
              </div>
              <div className="h-12 w-12 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                <Search className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">High Intent Actions</p>
                <h3 className="text-2xl font-bold text-emerald-600 mt-1">{stats.conversions}</h3>
              </div>
              <div className="h-12 w-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                <Send className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:max-w-md">
              <TextField
                label="Search by Action, College, Visitor ID, or Keyword"
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
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel id="action-filter-label">Action Type</InputLabel>
                <Select
                  labelId="action-filter-label"
                  value={actionFilter}
                  label="Action Type"
                  onChange={(e) => setActionFilter(e.target.value)}
                >
                  <MenuItem value="all">All Actions</MenuItem>
                  <MenuItem value="view_detail">View Details</MenuItem>
                  <MenuItem value="apply_now">Apply Now</MenuItem>
                  <MenuItem value="download_brochure">Download Brochure</MenuItem>
                  <MenuItem value="search">Search</MenuItem>
                  <MenuItem value="compare">Compare</MenuItem>
                  <MenuItem value="remove_compare">Remove Compare</MenuItem>
                </Select>
              </FormControl>

              {(searchQuery || actionFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActionFilter('all');
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
                  {searchQuery || actionFilter !== 'all'
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
                        <TableCell width={70}>Sr.No</TableCell>
                        <TableCell width={160}>Date & Time</TableCell>
                        <TableCell width={180}>Action</TableCell>
                        <TableCell>Target College / Info</TableCell>
                        <TableCell>Visitor / User ID</TableCell>
                        <TableCell>Parameters / Details</TableCell>
                        <TableCell align="right" width={110}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredList
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((item, index) => {
                          const eventId = getEventId(item);
                          const { date, time } = getFormattedDate(item);
                          const badge = getActionBadge(item.action);
                          const IconComponent = badge.icon;
                          const collegeText = getCollegeDisplay(item);
                          const visitorText = getVisitorDisplay(item);
                          const userText = getUserDisplay(item);

                          return (
                            <TableRow key={eventId || index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell className="text-gray-500 font-medium">
                                {page * rowsPerPage + index + 1}
                              </TableCell>
                              <TableCell>
                                <div className="text-xs font-semibold text-gray-900">{date}</div>
                                {time && <div className="text-xs text-gray-500">{time}</div>}
                              </TableCell>
                              <TableCell>
                                <span
                                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${badge.classes}`}
                                >
                                  <IconComponent className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                                  {badge.label}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm font-medium text-gray-900">
                                  {collegeText !== '-' ? collegeText : (
                                    <span className="text-gray-400 italic">None / Search Event</span>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <span className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded max-w-[140px] truncate" title={visitorText}>
                                    {visitorText}
                                  </span>
                                  {visitorText !== 'Anonymous' && (
                                    <button
                                      type="button"
                                      onClick={() => handleCopy(visitorText, eventId || String(index))}
                                      className="text-gray-400 hover:text-gray-700 p-0.5 rounded transition-colors"
                                      title="Copy Visitor ID"
                                    >
                                      {copiedId === (eventId || String(index)) ? (
                                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                                      ) : (
                                        <Copy className="h-3.5 w-3.5" />
                                      )}
                                    </button>
                                  )}
                                </div>
                                {userText && (
                                  <div className="text-xs text-blue-600 mt-0.5 flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    <span>{userText}</span>
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>
                                {item.searchFilters && Object.keys(item.searchFilters).length > 0 ? (
                                  <div className="flex flex-wrap gap-1 max-w-xs">
                                    {item.searchFilters.searchText && (
                                      <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded">
                                        Query: "{item.searchFilters.searchText}"
                                      </span>
                                    )}
                                    {item.searchFilters.location && (
                                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                                        Loc: {item.searchFilters.location}
                                      </span>
                                    )}
                                    {item.searchFilters.category && (
                                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                                        Cat: {item.searchFilters.category}
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-xs text-gray-400">-</span>
                                )}
                              </TableCell>
                              <TableCell align="right">
                                <div className="flex items-center justify-end space-x-1">
                                  <Tooltip title="View Full Payload">
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
                                      onClick={() => setDeleteEventId(eventId)}
                                      disabled={!eventId}
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

          {/* View Event Details Modal */}
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
                  {/* Top summary header */}
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
                        {getCollegeDisplay(selectedEvent) !== '-'
                          ? getCollegeDisplay(selectedEvent)
                          : 'General User Interaction'}
                      </h4>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-gray-400 uppercase font-semibold">Timestamp</p>
                      <p className="text-sm font-medium text-gray-800 mt-0.5">
                        {selectedEvent.createdAt || selectedEvent.timestamp
                          ? new Date(selectedEvent.createdAt || selectedEvent.timestamp || '').toLocaleString()
                          : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Key metadata grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-white border rounded-lg">
                      <p className="text-xs text-gray-400 uppercase font-semibold">Event ID</p>
                      <p className="font-mono text-gray-800 text-xs mt-1 break-all">
                        {getEventId(selectedEvent) || 'N/A'}
                      </p>
                    </div>

                    <div className="p-3 bg-white border rounded-lg">
                      <p className="text-xs text-gray-400 uppercase font-semibold">Visitor ID</p>
                      <p className="font-mono text-gray-800 text-xs mt-1 break-all">
                        {getVisitorDisplay(selectedEvent)}
                      </p>
                    </div>

                    {getUserDisplay(selectedEvent) && (
                      <div className="p-3 bg-white border rounded-lg sm:col-span-2">
                        <p className="text-xs text-gray-400 uppercase font-semibold">User Info</p>
                        <p className="text-gray-800 text-sm mt-1">
                          {getUserDisplay(selectedEvent)}
                        </p>
                      </div>
                    )}

                    {selectedEvent.searchFilters && (
                      <div className="p-3 bg-white border rounded-lg sm:col-span-2">
                        <p className="text-xs text-gray-400 uppercase font-semibold mb-2">Search Filters Applied</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {Object.entries(selectedEvent.searchFilters).map(([k, v]) => (
                            <div key={k} className="p-2 bg-gray-50 rounded">
                              <span className="font-semibold text-gray-600">{k}: </span>
                              <span className="text-gray-900">{String(v)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Raw JSON viewer */}
                  <div className="border rounded-lg p-3 bg-slate-900 text-slate-100">
                    <p className="text-xs font-mono text-slate-400 mb-2 font-semibold">Raw Event Payload:</p>
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
