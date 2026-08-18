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
  Chip,
} from '@mui/material';
import {
  Users,
  UserCheck,
  ShieldCheck,
  UserPlus,
  RefreshCw,
  Eye,
  Trash2,
  Search,
  Mail,
  Phone,
  Calendar,
  X,
  Plus,
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import BASE_URL from '@/app/config/api';

export interface UserItem {
  _id?: string;
  id?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  phoneNumber?: string;
  role?: string;
  isVerified?: boolean;
  verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export default function UsersManagerPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals state
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New user form state
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'user',
  });

  const fetchUsers = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setIsRefreshing(true);
    else setIsLoading(true);

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${BASE_URL}/admin/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch users: ${res.status}`);
      }

      const data = await res.json();
      const userData: UserItem[] = Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.users)
          ? data.users
          : Array.isArray(data)
            ? data
            : [];

      setUsers(userData);
    } catch (err: any) {
      console.error('Error fetching users:', err);
      toast({
        title: 'Notice',
        description: err.message || 'Could not load users list from server.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getUserName = (user: UserItem): string => {
    if (user.name) return user.name;
    const combined = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    return combined || 'Anonymous User';
  };

  const getUserEmail = (user: UserItem): string => user.email || 'N/A';
  const getUserPhone = (user: UserItem): string => user.phone || user.phoneNumber || 'N/A';
  const getUserRole = (user: UserItem): string => user.role || 'user';
  const isUserVerified = (user: UserItem): boolean => {
    if (typeof user.isEmailVerified === 'boolean') return user.isEmailVerified;
    return false;
  };
  const getUserId = (user: UserItem): string => user._id || user.id || '';

  const getInitials = (name: string): string => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (name[0] || 'U').toUpperCase();
  };

  // Filtered users
  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return users.filter((user) => {
      const name = getUserName(user).toLowerCase();
      const email = getUserEmail(user).toLowerCase();
      const phone = getUserPhone(user).toLowerCase();
      const role = getUserRole(user).toLowerCase();
      const created = (user.createdAt || '').toLowerCase();

      const matchesSearch =
        !query ||
        name.includes(query) ||
        email.includes(query) ||
        phone.includes(query) ||
        role.includes(query) ||
        created.includes(query);

      const matchesRole =
        roleFilter === 'all' || role === roleFilter.toLowerCase();

      const verified = isUserVerified(user);
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'verified' && verified) ||
        (statusFilter === 'unverified' && !verified);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = users.length;
    const verified = users.filter((u) => isUserVerified(u)).length;
    const admins = users.filter((u) => getUserRole(u).toLowerCase() === 'admin').length;
    const regularUsers = total - admins;
    return { total, verified, admins, regularUsers };
  }, [users]);

  // Handle Add User
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserForm.name || !newUserForm.email) {
      toast({ title: 'Validation Error', description: 'Name and email are required', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${BASE_URL}/admin/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(newUserForm),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message || 'Failed to create user');
      }

      toast({ title: 'Success', description: 'User added successfully' });
      setIsAddUserOpen(false);
      setNewUserForm({ name: '', email: '', phone: '', password: '', role: 'user' });
      fetchUsers(true);
    } catch (err: any) {
      console.error(err);
      toast({ title: 'Error', description: err.message || 'Failed to add user', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete User
  const handleDeleteUser = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${BASE_URL}/admin/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) {
        throw new Error('Failed to delete user');
      }

      toast({ title: 'Success', description: 'User deleted successfully' });
      setUsers((prev) => prev.filter((u) => getUserId(u) !== id));
      setDeleteUserId(null);
    } catch (err: any) {
      console.error(err);
      toast({ title: 'Error', description: err.message || 'Failed to delete user', variant: 'destructive' });
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
          {/* Header Title & Add Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <Users className="h-7 w-7 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Users Manager</h1>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                View, search, manage, and inspect all registered platform users.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => fetchUsers(true)}
                disabled={isLoading || isRefreshing}
                className="inline-flex items-center px-3.5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm disabled:opacity-50 transition-colors"
                title="Refresh user data"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin text-blue-600' : 'text-gray-500'}`} />
                Refresh
              </button>

              {/* <button
                type="button"
                onClick={() => setIsAddUserOpen(true)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </button> */}
            </div>
          </div>

          {/* Stats KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Users</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</h3>
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                <Users className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Verified Users</p>
                <h3 className="text-2xl font-bold text-emerald-600 mt-1">{stats.verified}</h3>
              </div>
              <div className="h-12 w-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                <UserCheck className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Admins</p>
                <h3 className="text-2xl font-bold text-purple-600 mt-1">{stats.admins}</h3>
              </div>
              <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Standard Users</p>
                <h3 className="text-2xl font-bold text-slate-700 mt-1">{stats.regularUsers}</h3>
              </div>
              <div className="h-12 w-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                <UserPlus className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:max-w-md">
              <TextField
                label="Search by Name, Email, Phone, or Role"
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
              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel id="role-filter-label">Role</InputLabel>
                <Select
                  labelId="role-filter-label"
                  value={roleFilter}
                  label="Role"
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <MenuItem value="all">All Roles</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel id="status-filter-label">Verification</InputLabel>
                <Select
                  labelId="status-filter-label"
                  value={statusFilter}
                  label="Verification"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="verified">Verified</MenuItem>
                  <MenuItem value="unverified">Unverified</MenuItem>
                </Select>
              </FormControl>

              {(searchQuery || roleFilter !== 'all' || statusFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setRoleFilter('all');
                    setStatusFilter('all');
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
                <p className="text-sm text-gray-500">Loading users data...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="min-h-[250px] flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200 p-8 text-center">
                <Users className="h-12 w-12 text-gray-300 mb-3" />
                <h3 className="text-base font-semibold text-gray-700">No users found</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-sm">
                  {searchQuery || roleFilter !== 'all' || statusFilter !== 'all'
                    ? 'No users match the search criteria. Try clearing filters.'
                    : 'No users have been registered yet or the backend returned an empty list.'}
                </p>
              </div>
            ) : (
              <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '0.75rem', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 650 }}>
                  <Table stickyHeader aria-label="users table">
                    <TableHead>
                      <TableRow sx={{ '& th': { backgroundColor: '#f9fafb', fontWeight: 600, color: '#374151' } }}>
                        <TableCell width={70}>Sr.No</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Registered Date</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredUsers
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((user, index) => {
                          const name = getUserName(user);
                          const email = getUserEmail(user);
                          const phone = getUserPhone(user);
                          const role = getUserRole(user);
                          const verified = isUserVerified(user);
                          const userId = getUserId(user);
                          const date = user.createdAt ? user.createdAt.split('T')[0] : '-';

                          return (
                            <TableRow key={userId || index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell className="text-gray-500 font-medium">
                                {page * rowsPerPage + index + 1}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-3">
                                  <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs flex-shrink-0">
                                    {getInitials(name)}
                                  </div>
                                  <div>
                                    <div className="font-semibold text-gray-900">{name}</div>
                                    {userId && (
                                      <div className="text-xs text-gray-400 font-mono">
                                        ID: {userId.slice(-6)}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-gray-700">
                                <span className="flex items-center space-x-1.5">
                                  <Mail className="h-3.5 w-3.5 text-gray-400" />
                                  <span>{email}</span>
                                </span>
                              </TableCell>
                              <TableCell className="text-gray-700">
                                <span className="flex items-center space-x-1.5">
                                  <Phone className="h-3.5 w-3.5 text-gray-400" />
                                  <span>{phone}</span>
                                </span>
                              </TableCell>
                              <TableCell>
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${role.toLowerCase() === 'admin'
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-blue-50 text-blue-700'
                                    }`}
                                >
                                  {role}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${verified
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                    }`}
                                >
                                  {verified ? 'Verified' : 'Pending / Active'}
                                </span>
                              </TableCell>
                              <TableCell className="text-gray-600">
                                <span className="flex items-center space-x-1.5 text-sm">
                                  <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                  <span>{date}</span>
                                </span>
                              </TableCell>
                              <TableCell align="right">
                                <div className="flex items-center justify-end space-x-1">
                                  <Tooltip title="View Details">
                                    <IconButton
                                      size="small"
                                      color="primary"
                                      onClick={() => setSelectedUser(user)}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title="Delete User">
                                    <IconButton
                                      size="small"
                                      color="error"
                                      onClick={() => setDeleteUserId(userId)}
                                      disabled={!userId}
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
                  count={filteredUsers.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                />
              </Paper>
            )}
          </div>

          {/* View User Details Dialog */}
          <Dialog
            open={!!selectedUser}
            onClose={() => setSelectedUser(null)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="font-bold text-gray-900">User Profile Details</span>
              </div>
              <IconButton size="small" onClick={() => setSelectedUser(null)}>
                <X className="h-4 w-4" />
              </IconButton>
            </DialogTitle>
            <DialogContent className="pt-4 space-y-4">
              {selectedUser && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="h-14 w-14 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xl shadow">
                      {getInitials(getUserName(selectedUser))}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{getUserName(selectedUser)}</h4>
                      <p className="text-sm text-gray-500">{getUserEmail(selectedUser)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase bg-purple-100 text-purple-800">
                          {getUserRole(selectedUser)}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                          {isUserVerified(selectedUser) ? 'Verified' : 'Unverified'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-white border rounded-lg">
                      <p className="text-xs text-gray-400 uppercase font-semibold">User ID</p>
                      <p className="font-mono text-gray-800 text-xs mt-1 break-all">
                        {getUserId(selectedUser) || 'N/A'}
                      </p>
                    </div>

                    <div className="p-3 bg-white border rounded-lg">
                      <p className="text-xs text-gray-400 uppercase font-semibold">Phone Number</p>
                      <p className="text-gray-800 font-medium mt-1">
                        {getUserPhone(selectedUser)}
                      </p>
                    </div>

                    <div className="p-3 bg-white border rounded-lg">
                      <p className="text-xs text-gray-400 uppercase font-semibold">Created Date</p>
                      <p className="text-gray-800 font-medium mt-1">
                        {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : 'N/A'}
                      </p>
                    </div>

                    <div className="p-3 bg-white border rounded-lg">
                      <p className="text-xs text-gray-400 uppercase font-semibold">Last Updated</p>
                      <p className="text-gray-800 font-medium mt-1">
                        {selectedUser.updatedAt ? new Date(selectedUser.updatedAt).toLocaleString() : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Raw Data Accordion/JSON view if more fields exist */}
                  <div className="border rounded-lg p-3 bg-slate-900 text-slate-100">
                    <p className="text-xs font-mono text-slate-400 mb-2 font-semibold">Raw User Data:</p>
                    <pre className="text-xs font-mono overflow-x-auto max-h-40 text-emerald-400">
                      {JSON.stringify(selectedUser, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </DialogContent>
            <DialogActions className="border-t p-3">
              <MuiButton onClick={() => setSelectedUser(null)} variant="outlined">
                Close
              </MuiButton>
            </DialogActions>
          </Dialog>

          {/* Add User Dialog */}
          <Dialog
            open={isAddUserOpen}
            onClose={() => !isSubmitting && setIsAddUserOpen(false)}
            maxWidth="sm"
            fullWidth
          >
            <form onSubmit={handleAddUser}>
              <DialogTitle className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center space-x-2">
                  <UserPlus className="h-5 w-5 text-blue-600" />
                  <span className="font-bold text-gray-900">Add New User</span>
                </div>
                <IconButton size="small" onClick={() => setIsAddUserOpen(false)} disabled={isSubmitting}>
                  <X className="h-4 w-4" />
                </IconButton>
              </DialogTitle>
              <DialogContent className="pt-4 space-y-4">
                <div className="space-y-4 mt-2">
                  <TextField
                    label="Full Name"
                    required
                    fullWidth
                    size="small"
                    value={newUserForm.name}
                    onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  />

                  <TextField
                    label="Email Address"
                    type="email"
                    required
                    fullWidth
                    size="small"
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  />

                  <TextField
                    label="Phone Number"
                    type="tel"
                    fullWidth
                    size="small"
                    value={newUserForm.phone}
                    onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                  />

                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    size="small"
                    value={newUserForm.password}
                    onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                    helperText="Leave empty to let user create via registration/OTP"
                  />

                  <FormControl fullWidth size="small">
                    <InputLabel id="new-user-role-label">Role</InputLabel>
                    <Select
                      labelId="new-user-role-label"
                      value={newUserForm.role}
                      label="Role"
                      onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                    >
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </DialogContent>
              <DialogActions className="border-t p-3">
                <MuiButton onClick={() => setIsAddUserOpen(false)} disabled={isSubmitting}>
                  Cancel
                </MuiButton>
                <MuiButton type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create User'}
                </MuiButton>
              </DialogActions>
            </form>
          </Dialog>

          {/* Delete User Confirmation Dialog */}
          <Dialog
            open={!!deleteUserId}
            onClose={() => setDeleteUserId(null)}
          >
            <DialogTitle>Confirm Delete User</DialogTitle>
            <DialogContent>
              <p className="text-sm text-gray-600">
                Are you sure you want to permanently delete this user account? This action cannot be undone.
              </p>
            </DialogContent>
            <DialogActions>
              <MuiButton onClick={() => setDeleteUserId(null)}>Cancel</MuiButton>
              <MuiButton
                color="error"
                variant="contained"
                onClick={() => deleteUserId && handleDeleteUser(deleteUserId)}
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
