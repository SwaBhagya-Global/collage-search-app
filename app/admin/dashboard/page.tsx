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
  Building2,
  Plus,
  Search,
  RefreshCw,
  Eye,
  Trash2,
  Edit,
  Star,
  Award,
  MapPin,
  Globe,
  Mail,
  Phone,
  BookOpen,
  Layers,
  Sparkles,
  X,
  Copy,
} from 'lucide-react';
import CollegeForm from '@/components/CollageForm';
import BASE_URL from '@/app/config/api';
import { College } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';

export default function DashboardPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [viewCollege, setViewCollege] = useState<College | null>(null);
  const [deleteCollegeId, setDeleteCollegeId] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const initialCollege: College = {
    name: '',
    shortName: '',
    about: '',
    distric: '',
    address: '',
    mapUrl: '',
    brochureLink: '',
    applyLink: '',
    established: '',
    type: [],
    affiliation: '',
    state: '',
    ranking: 0,
    rating: 0,
    intake: '',
    images: [],
    category: [],
    specialization: [],
    averagePackage: '',
    highestPackage: '',
    topRecruiters: [''],
    phone: '',
    email: '',
    highlights: [''],
    courses: [{ name: '', duration: '', fees: '', eligibility: '', seats: 0 }],
    facilities: [''],
    admissionProcess: [''],
    links: { website: '', facebook: '', instagram: '', linkedin: '' },
  };

  // Fetch colleges
  const fetchColleges = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/colleges`);
      if (!res.ok) throw new Error('Failed to fetch colleges');
      const data = await res.json();
      setColleges(Array.isArray(data.data) ? data.data : []);
    } catch (err: any) {
      console.error(err);
      toast({ title: 'Error', description: err.message || 'Failed to fetch colleges', variant: 'destructive' });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  // Save college
  const handleSave = async (data: College) => {
    try {
      const isEdit = Boolean(data._id);
      const url = isEdit
        ? `${BASE_URL}/colleges/${data._id}`
        : `${BASE_URL}/colleges`;

      const token = localStorage.getItem('token');
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to save college profile');

      toast({ title: 'Success', description: `College ${isEdit ? 'updated' : 'created'} successfully` });
      fetchColleges(true);
      setIsFormOpen(false);
      setSelectedCollege(null);
    } catch (err: any) {
      console.error(err);
      toast({ title: 'Error', description: err.message || 'Failed to save college', variant: 'destructive' });
    }
  };

  // Delete college
  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/colleges/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      if (!res.ok) throw new Error('Failed to delete college');

      toast({ title: 'Success', description: 'College deleted successfully' });
      setColleges((prev) => prev.filter((c) => c._id !== id));
      setDeleteCollegeId(null);
    } catch (err: any) {
      console.error(err);
      toast({ title: 'Error', description: err.message || 'Failed to delete college', variant: 'destructive' });
    }
  };

  // Extract unique types for dropdown
  const uniqueTypes = useMemo(() => {
    const set = new Set<string>();
    colleges.forEach((c) => {
      if (Array.isArray(c.type)) {
        c.type.forEach((t) => t && set.add(t));
      } else if (typeof c.type === 'string' && c.type) {
        set.add(c.type);
      }
    });
    return Array.from(set);
  }, [colleges]);

  // Filtered colleges
  const filteredColleges = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return colleges.filter((college) => {
      const name = (college.name || '').toLowerCase();
      const shortName = (college.shortName || '').toLowerCase();
      const state = (college.state || '').toLowerCase();
      const distric = (college.distric || '').toLowerCase();
      const affiliation = (college.affiliation || '').toLowerCase();

      const typeArray = Array.isArray(college.type)
        ? college.type.map((t) => t.toLowerCase())
        : [String(college.type || '').toLowerCase()];

      const matchesSearch =
        !query ||
        name.includes(query) ||
        shortName.includes(query) ||
        state.includes(query) ||
        distric.includes(query) ||
        affiliation.includes(query) ||
        typeArray.some((t) => t.includes(query));

      const matchesType =
        typeFilter === 'all' ||
        typeArray.includes(typeFilter.toLowerCase());

      return matchesSearch && matchesType;
    });
  }, [colleges, searchQuery, typeFilter]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = colleges.length;
    const topRated = colleges.filter((c) => (c.rating || 0) >= 4.0).length;
    const ranked = colleges.filter((c) => (c.ranking || 0) > 0).length;
    const totalCourses = colleges.reduce((sum, c) => sum + (c.courses?.length || 0), 0);

    return { total, topRated, ranked, totalCourses };
  }, [colleges]);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getInitials = (name: string): string => {
    if (!name) return 'C';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (name[0] || 'C').toUpperCase();
  };

  return (
    <AuthGuard>
      <DashboardLayout>
        <div className="space-y-6 p-2 md:p-6 min-h-screen">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <Building2 className="h-7 w-7 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Manage Colleges</h1>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Add, edit, inspect, and manage university profiles, courses, rankings, and contact details.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => fetchColleges(true)}
                disabled={isLoading || isRefreshing}
                className="inline-flex items-center px-3.5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm disabled:opacity-50 transition-colors"
                title="Refresh colleges data"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin text-blue-600' : 'text-gray-500'}`} />
                Refresh
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedCollege(null);
                  setIsFormOpen(true);
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add College
              </button>
            </div>
          </div>

          {/* College Form Modal */}
          <CollegeForm
            open={isFormOpen}
            setOpen={setIsFormOpen}
            initialData={selectedCollege || initialCollege}
            onSave={handleSave}
          />

          {/* Stats KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Colleges</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</h3>
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                <Building2 className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Top Rated (4.0+ ★)</p>
                <h3 className="text-2xl font-bold text-amber-600 mt-1">{stats.topRated}</h3>
              </div>
              <div className="h-12 w-12 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                <Star className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ranked Colleges</p>
                <h3 className="text-2xl font-bold text-purple-600 mt-1">{stats.ranked}</h3>
              </div>
              <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                <Award className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Courses</p>
                <h3 className="text-2xl font-bold text-emerald-600 mt-1">{stats.totalCourses}</h3>
              </div>
              <div className="h-12 w-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                <BookOpen className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:max-w-md">
              <TextField
                label="Search by Name, Short Name, State, or District"
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
                <InputLabel id="type-filter-label">College Type</InputLabel>
                <Select
                  labelId="type-filter-label"
                  value={typeFilter}
                  label="College Type"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  {uniqueTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {(searchQuery || typeFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setTypeFilter('all');
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
                <p className="text-sm text-gray-500">Loading colleges...</p>
              </div>
            ) : filteredColleges.length === 0 ? (
              <div className="min-h-[250px] flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200 p-8 text-center">
                <Building2 className="h-12 w-12 text-gray-300 mb-3" />
                <h3 className="text-base font-semibold text-gray-700">No colleges found</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-sm">
                  {searchQuery || typeFilter !== 'all'
                    ? 'No institutions match the current search criteria.'
                    : 'No colleges have been created yet. Click "Add College" to create one.'}
                </p>
              </div>
            ) : (
              <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '0.75rem', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 650 }}>
                  <Table stickyHeader aria-label="colleges table">
                    <TableHead>
                      <TableRow sx={{ '& th': { backgroundColor: '#f9fafb', fontWeight: 600, color: '#374151' } }}>
                        <TableCell width={60}>Sr.No</TableCell>
                        <TableCell>College</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell width={100}>Rating</TableCell>
                        <TableCell width={100}>Ranking</TableCell>
                        <TableCell align="right" width={130}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredColleges
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((college, index) => {
                          const typeString = Array.isArray(college.type)
                            ? college.type.join(', ')
                            : String(college.type || '-');

                          return (
                            <TableRow key={college._id || index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell className="text-gray-500 font-medium">
                                {page * rowsPerPage + index + 1}
                              </TableCell>

                              {/* College Name & Avatar */}
                              <TableCell>
                                <div className="flex items-center space-x-3">
                                  {college.images && college.images.length > 0 ? (
                                    <img
                                      src={college.images[0]}
                                      alt={college.name}
                                      className="h-10 w-10 rounded-lg object-cover border border-gray-200 flex-shrink-0 shadow-sm"
                                    />
                                  ) : (
                                    <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs flex-shrink-0">
                                      {getInitials(college.name)}
                                    </div>
                                  )}
                                  <div>
                                    <div className="font-semibold text-gray-900">{college.name}</div>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                      {college.shortName && (
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                          {college.shortName}
                                        </span>
                                      )}
                                      {college.affiliation && (
                                        <span className="text-xs text-gray-500 truncate max-w-[180px]">
                                          {college.affiliation}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </TableCell>

                              {/* Location */}
                              <TableCell>
                                <div className="flex items-center space-x-1.5 text-xs text-gray-700">
                                  <MapPin className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                                  <span>
                                    {college.distric ? `${college.distric}, ` : ''}
                                    {college.state || '-'}
                                  </span>
                                </div>
                              </TableCell>

                              {/* Type */}
                              <TableCell>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                  {typeString || '-'}
                                </span>
                              </TableCell>

                              {/* Rating */}
                              <TableCell>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                                  <span className="text-xs font-bold text-gray-800">
                                    {college.rating ? college.rating.toFixed(1) : '0.0'}
                                  </span>
                                </div>
                              </TableCell>

                              {/* Ranking */}
                              <TableCell>
                                {college.ranking ? (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                    #{college.ranking}
                                  </span>
                                ) : (
                                  <span className="text-xs text-gray-400">-</span>
                                )}
                              </TableCell>

                              {/* Actions */}
                              <TableCell align="right">
                                <div className="flex items-center justify-end space-x-1">
                                  <Tooltip title="View Overview">
                                    <IconButton
                                      size="small"
                                      color="info"
                                      onClick={() => setViewCollege(college)}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title="Edit College">
                                    <IconButton
                                      size="small"
                                      color="primary"
                                      onClick={() => {
                                        setSelectedCollege(college);
                                        setIsFormOpen(true);
                                      }}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title="Delete College">
                                    <IconButton
                                      size="small"
                                      color="error"
                                      onClick={() => setDeleteCollegeId(college._id || null)}
                                      disabled={!college._id}
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
                  count={filteredColleges.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                />
              </Paper>
            )}
          </div>

          {/* View College Details Dialog */}
          <Dialog
            open={!!viewCollege}
            onClose={() => setViewCollege(null)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                <span className="font-bold text-gray-900">College Profile Overview</span>
              </div>
              <IconButton size="small" onClick={() => setViewCollege(null)}>
                <X className="h-4 w-4" />
              </IconButton>
            </DialogTitle>

            <DialogContent className="pt-4 space-y-4">
              {viewCollege && (
                <div className="space-y-4">
                  {/* Top Card */}
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3.5">
                      {viewCollege.images && viewCollege.images.length > 0 ? (
                        <img
                          src={viewCollege.images[0]}
                          alt={viewCollege.name}
                          className="h-14 w-14 rounded-xl object-cover border border-gray-200 shadow-sm"
                        />
                      ) : (
                        <div className="h-14 w-14 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-xl shadow">
                          {getInitials(viewCollege.name)}
                        </div>
                      )}
                      <div>
                        <h4 className="text-base font-bold text-gray-900">{viewCollege.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {viewCollege.distric ? `${viewCollege.distric}, ` : ''}
                          {viewCollege.state}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          {viewCollege.shortName && (
                            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                              {viewCollege.shortName}
                            </span>
                          )}
                          {viewCollege.ranking ? (
                            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-purple-100 text-purple-800">
                              Rank #{viewCollege.ranking}
                            </span>
                          ) : null}
                          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800 flex items-center gap-1">
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                            {viewCollege.rating || 0}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-left sm:text-right text-xs text-gray-500">
                      <p>Established: {viewCollege.established || '-'}</p>
                      <p>Affiliation: {viewCollege.affiliation || '-'}</p>
                    </div>
                  </div>

                  {/* Summary Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-white border rounded-lg">
                      <p className="text-xs text-gray-400 uppercase font-semibold">Contact Email</p>
                      <p className="text-gray-800 font-medium mt-1 truncate">
                        {viewCollege.email || '-'}
                      </p>
                    </div>

                    <div className="p-3 bg-white border rounded-lg">
                      <p className="text-xs text-gray-400 uppercase font-semibold">Contact Phone</p>
                      <p className="text-gray-800 font-medium mt-1">
                        {viewCollege.phone || '-'}
                      </p>
                    </div>

                    <div className="p-3 bg-white border rounded-lg">
                      <p className="text-xs text-gray-400 uppercase font-semibold">Average Package</p>
                      <p className="text-gray-800 font-medium mt-1">
                        {viewCollege.averagePackage || '-'}
                      </p>
                    </div>

                    <div className="p-3 bg-white border rounded-lg">
                      <p className="text-xs text-gray-400 uppercase font-semibold">Highest Package</p>
                      <p className="text-gray-800 font-medium mt-1">
                        {viewCollege.highestPackage || '-'}
                      </p>
                    </div>

                    <div className="p-3 bg-white border rounded-lg sm:col-span-2">
                      <p className="text-xs text-gray-400 uppercase font-semibold">Total Courses</p>
                      <p className="text-gray-800 font-medium mt-1">
                        {viewCollege.courses?.length || 0} courses registered
                      </p>
                    </div>
                  </div>

                  {/* Raw JSON View */}
                  <div className="border rounded-lg p-3 bg-slate-900 text-slate-100">
                    <p className="text-xs font-mono text-slate-400 mb-2 font-semibold">Raw College Data:</p>
                    <pre className="text-xs font-mono overflow-x-auto max-h-44 text-emerald-400">
                      {JSON.stringify(viewCollege, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </DialogContent>

            <DialogActions className="border-t p-3">
              <MuiButton onClick={() => setViewCollege(null)} variant="outlined">
                Close
              </MuiButton>
            </DialogActions>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={!!deleteCollegeId}
            onClose={() => setDeleteCollegeId(null)}
          >
            <DialogTitle>Confirm Delete College</DialogTitle>
            <DialogContent>
              <p className="text-sm text-gray-600">
                Are you sure you want to permanently delete this college from the platform? This action cannot be undone.
              </p>
            </DialogContent>
            <DialogActions>
              <MuiButton onClick={() => setDeleteCollegeId(null)}>Cancel</MuiButton>
              <MuiButton
                color="error"
                variant="contained"
                onClick={() => deleteCollegeId && handleDelete(deleteCollegeId)}
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
