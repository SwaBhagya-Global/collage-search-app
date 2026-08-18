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
  Mail,
  Phone,
  Search,
  RefreshCw,
  Eye,
  Trash2,
  Calendar,
  Building2,
  User,
  Send,
  FileDown,
  Layers,
  Check,
  Copy,
  X,
  GraduationCap,
  MessageSquare,
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import BASE_URL from '@/app/config/api';

export interface Contact {
  _id?: string;
  name: string;
  CollegeName: string;
  phone: string;
  email: string;
  createdAt?: string;
  flag?: string;
  [key: string]: any;
}

export default function ContactsManager() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [flagFilter, setFlagFilter] = useState('all');

  // Modals state
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [deleteContactId, setDeleteContactId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchContacts = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setIsRefreshing(true);
    else setIsLoading(true);

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${BASE_URL}/leads`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch leads: ${res.status}`);
      }

      const data = await res.json();
      const contactData: Contact[] = Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.leads)
        ? data.leads
        : Array.isArray(data)
        ? data
        : [];

      // Sort newest first
      const sorted = [...contactData].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      });

      setContacts(sorted);
    } catch (err: any) {
      console.error('Error fetching leads:', err);
      toast({
        title: 'Notice',
        description: err.message || 'Failed to fetch contact inquiries.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const getInitials = (name: string): string => {
    if (!name) return 'L';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (name[0] || 'L').toUpperCase();
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

  // Flag badge styling
  const getFlagBadge = (flag?: string) => {
    const lower = (flag || '').toLowerCase();
    if (lower.includes('apply') || lower.includes('admission')) {
      return {
        label: flag || 'Apply Now',
        classes: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
        icon: Send,
      };
    }
    if (lower.includes('brochure') || lower.includes('download')) {
      return {
        label: flag || 'Brochure Download',
        classes: 'bg-purple-100 text-purple-800 border border-purple-200',
        icon: FileDown,
      };
    }
    if (lower.includes('contact') || lower.includes('inquiry')) {
      return {
        label: flag || 'Contact Form',
        classes: 'bg-blue-100 text-blue-800 border border-blue-200',
        icon: MessageSquare,
      };
    }
    return {
      label: flag || 'General Lead',
      classes: 'bg-slate-100 text-slate-800 border border-slate-200',
      icon: Mail,
    };
  };

  // Extract unique flags for dropdown filter
  const uniqueFlags = useMemo(() => {
    const set = new Set<string>();
    contacts.forEach((c) => {
      if (c.flag) set.add(c.flag);
    });
    return Array.from(set);
  }, [contacts]);

  // Filtered contacts
  const filteredContacts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return contacts.filter((contact) => {
      const name = (contact.name || '').toLowerCase();
      const college = (contact.CollegeName || '').toLowerCase();
      const email = (contact.email || '').toLowerCase();
      const phone = (contact.phone || '').toLowerCase();
      const flag = (contact.flag || '').toLowerCase();
      const created = (contact.createdAt || '').toLowerCase();

      const matchesQuery =
        !query ||
        name.includes(query) ||
        college.includes(query) ||
        email.includes(query) ||
        phone.includes(query) ||
        flag.includes(query) ||
        created.includes(query);

      const matchesFlag =
        flagFilter === 'all' || (contact.flag || '').toLowerCase() === flagFilter.toLowerCase();

      return matchesQuery && matchesFlag;
    });
  }, [contacts, searchQuery, flagFilter]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = contacts.length;
    const uniqueColleges = new Set(contacts.map((c) => c.CollegeName).filter(Boolean)).size;
    const applies = contacts.filter((c) => (c.flag || '').toLowerCase().includes('apply')).length;
    const brochures = contacts.filter((c) => (c.flag || '').toLowerCase().includes('brochure')).length;
    const generalInquiries = total - (applies + brochures);

    return { total, uniqueColleges, applies, brochures, generalInquiries };
  }, [contacts]);

  // Handle Delete Lead
  const handleDeleteLead = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${BASE_URL}/leads/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) {
        throw new Error('Failed to delete lead inquiry');
      }

      toast({ title: 'Success', description: 'Lead inquiry deleted successfully' });
      setContacts((prev) => prev.filter((c) => c._id !== id));
      setDeleteContactId(null);
    } catch (err: any) {
      console.error(err);
      toast({ title: 'Error', description: err.message || 'Failed to delete lead', variant: 'destructive' });
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
                <Mail className="h-7 w-7 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Contacts & Leads Manager</h1>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                View, filter, manage, and inspect all student inquiries, lead applications, and contact submissions.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => fetchContacts(true)}
                disabled={isLoading || isRefreshing}
                className="inline-flex items-center px-3.5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm disabled:opacity-50 transition-colors"
                title="Refresh leads data"
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
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Inquiries</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</h3>
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                <Layers className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Direct Applies</p>
                <h3 className="text-2xl font-bold text-emerald-600 mt-1">{stats.applies}</h3>
              </div>
              <div className="h-12 w-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                <Send className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Brochure Requests</p>
                <h3 className="text-2xl font-bold text-purple-600 mt-1">{stats.brochures}</h3>
              </div>
              <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                <FileDown className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Targeted Colleges</p>
                <h3 className="text-2xl font-bold text-teal-600 mt-1">{stats.uniqueColleges}</h3>
              </div>
              <div className="h-12 w-12 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600">
                <Building2 className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:max-w-md">
              <TextField
                label="Search by Name, College, Email, Phone, or Source"
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
                <InputLabel id="flag-filter-label">Source / From</InputLabel>
                <Select
                  labelId="flag-filter-label"
                  value={flagFilter}
                  label="Source / From"
                  onChange={(e) => setFlagFilter(e.target.value)}
                >
                  <MenuItem value="all">All Sources</MenuItem>
                  {uniqueFlags.map((flag) => (
                    <MenuItem key={flag} value={flag}>
                      {flag}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {(searchQuery || flagFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFlagFilter('all');
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
                <p className="text-sm text-gray-500">Loading contact inquiries...</p>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="min-h-[250px] flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200 p-8 text-center">
                <Mail className="h-12 w-12 text-gray-300 mb-3" />
                <h3 className="text-base font-semibold text-gray-700">No contact inquiries found</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-sm">
                  {searchQuery || flagFilter !== 'all'
                    ? 'No leads match the current search criteria.'
                    : 'No leads or inquiries have been received yet.'}
                </p>
              </div>
            ) : (
              <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '0.75rem', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 650 }}>
                  <Table stickyHeader aria-label="contacts table">
                    <TableHead>
                      <TableRow sx={{ '& th': { backgroundColor: '#f9fafb', fontWeight: 600, color: '#374151' } }}>
                        <TableCell width={60}>Sr.No</TableCell>
                        <TableCell width={150}>Date & Time</TableCell>
                        <TableCell>Student / Lead</TableCell>
                        <TableCell>Contact Info</TableCell>
                        <TableCell>Target College</TableCell>
                        <TableCell width={140}>Source (From)</TableCell>
                        <TableCell align="right" width={110}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredContacts
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((contact, index) => {
                          const { date, time } = getFormattedDate(contact.createdAt);
                          const badge = getFlagBadge(contact.flag);
                          const IconComponent = badge.icon;
                          const contactId = contact._id || String(index);

                          return (
                            <TableRow key={contactId} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell className="text-gray-500 font-medium">
                                {page * rowsPerPage + index + 1}
                              </TableCell>

                              {/* Date & Time */}
                              <TableCell>
                                <div className="text-xs font-semibold text-gray-900">{date}</div>
                                {time && <div className="text-xs text-gray-500">{time}</div>}
                              </TableCell>

                              {/* Student Avatar + Name */}
                              <TableCell>
                                <div className="flex items-center space-x-3">
                                  <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs flex-shrink-0">
                                    {getInitials(contact.name)}
                                  </div>
                                  <div>
                                    <div className="font-semibold text-gray-900">{contact.name || 'Anonymous'}</div>
                                    {contact._id && (
                                      <div className="text-xs text-gray-400 font-mono">
                                        ID: {contact._id.slice(-6)}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </TableCell>

                              {/* Contact Details */}
                              <TableCell>
                                <div className="space-y-1 text-xs">
                                  {contact.phone && (
                                    <div className="flex items-center space-x-1.5 text-gray-700">
                                      <Phone className="h-3 w-3 text-gray-400 flex-shrink-0" />
                                      <a href={`tel:${contact.phone}`} className="hover:text-blue-600 font-medium">
                                        {contact.phone}
                                      </a>
                                    </div>
                                  )}
                                  {contact.email && (
                                    <div className="flex items-center space-x-1.5 text-gray-600">
                                      <Mail className="h-3 w-3 text-gray-400 flex-shrink-0" />
                                      <a href={`mailto:${contact.email}`} className="hover:text-blue-600 truncate max-w-[180px]">
                                        {contact.email}
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </TableCell>

                              {/* College Name */}
                              <TableCell>
                                <div className="flex items-start space-x-1.5">
                                  <Building2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm font-medium text-gray-900 leading-tight">
                                    {contact.CollegeName || '-'}
                                  </span>
                                </div>
                              </TableCell>

                              {/* Source / Flag Badge */}
                              <TableCell>
                                <span
                                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${badge.classes}`}
                                >
                                  <IconComponent className="h-3 w-3 mr-1 flex-shrink-0" />
                                  {badge.label}
                                </span>
                              </TableCell>

                              {/* Action Buttons */}
                              <TableCell align="right">
                                <div className="flex items-center justify-end space-x-1">
                                  <Tooltip title="View Details">
                                    <IconButton
                                      size="small"
                                      color="primary"
                                      onClick={() => setSelectedContact(contact)}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title="Delete Lead">
                                    <IconButton
                                      size="small"
                                      color="error"
                                      onClick={() => setDeleteContactId(contact._id || null)}
                                      disabled={!contact._id}
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
                  count={filteredContacts.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                />
              </Paper>
            )}
          </div>

          {/* View Details Dialog */}
          <Dialog
            open={!!selectedContact}
            onClose={() => setSelectedContact(null)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-600" />
                <span className="font-bold text-gray-900">Lead Inquiry Details</span>
              </div>
              <IconButton size="small" onClick={() => setSelectedContact(null)}>
                <X className="h-4 w-4" />
              </IconButton>
            </DialogTitle>

            <DialogContent className="pt-4 space-y-4">
              {selectedContact && (
                <div className="space-y-4">
                  {/* Lead Summary Header */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="h-14 w-14 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xl shadow flex-shrink-0">
                      {getInitials(selectedContact.name)}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{selectedContact.name || 'Anonymous Lead'}</h4>
                      <p className="text-sm text-gray-500">{selectedContact.email || 'No email provided'}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                            getFlagBadge(selectedContact.flag).classes
                          }`}
                        >
                          {selectedContact.flag || 'General Lead'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-white border rounded-lg sm:col-span-2">
                      <p className="text-xs text-gray-400 uppercase font-semibold">Target College</p>
                      <p className="text-base font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        {selectedContact.CollegeName || '-'}
                      </p>
                    </div>

                    <div className="p-3 bg-white border rounded-lg">
                      <p className="text-xs text-gray-400 uppercase font-semibold">Phone Number</p>
                      <p className="text-gray-900 font-medium mt-1">
                        {selectedContact.phone ? (
                          <a href={`tel:${selectedContact.phone}`} className="text-blue-600 hover:underline">
                            {selectedContact.phone}
                          </a>
                        ) : (
                          '-'
                        )}
                      </p>
                    </div>

                    <div className="p-3 bg-white border rounded-lg">
                      <p className="text-xs text-gray-400 uppercase font-semibold">Email Address</p>
                      <p className="text-gray-900 font-medium mt-1 truncate">
                        {selectedContact.email ? (
                          <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:underline">
                            {selectedContact.email}
                          </a>
                        ) : (
                          '-'
                        )}
                      </p>
                    </div>

                    <div className="p-3 bg-white border rounded-lg">
                      <p className="text-xs text-gray-400 uppercase font-semibold">Submission Date</p>
                      <p className="text-gray-800 font-medium mt-1">
                        {selectedContact.createdAt
                          ? new Date(selectedContact.createdAt).toLocaleString()
                          : 'N/A'}
                      </p>
                    </div>

                    <div className="p-3 bg-white border rounded-lg">
                      <p className="text-xs text-gray-400 uppercase font-semibold">Lead Record ID</p>
                      <p className="font-mono text-gray-800 text-xs mt-1 break-all">
                        {selectedContact._id || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Raw Data JSON Viewer */}
                  <div className="border rounded-lg p-3 bg-slate-900 text-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-mono text-slate-400 font-semibold">Raw Lead Payload:</p>
                      <button
                        type="button"
                        onClick={() => handleCopy(JSON.stringify(selectedContact, null, 2), 'raw-lead')}
                        className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono"
                      >
                        <Copy className="h-3 w-3" />
                        Copy JSON
                      </button>
                    </div>
                    <pre className="text-xs font-mono overflow-x-auto max-h-48 text-emerald-400">
                      {JSON.stringify(selectedContact, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </DialogContent>

            <DialogActions className="border-t p-3">
              <MuiButton onClick={() => setSelectedContact(null)} variant="outlined">
                Close
              </MuiButton>
            </DialogActions>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={!!deleteContactId}
            onClose={() => setDeleteContactId(null)}
          >
            <DialogTitle>Confirm Delete Lead</DialogTitle>
            <DialogContent>
              <p className="text-sm text-gray-600">
                Are you sure you want to permanently delete this lead inquiry? This action cannot be undone.
              </p>
            </DialogContent>
            <DialogActions>
              <MuiButton onClick={() => setDeleteContactId(null)}>Cancel</MuiButton>
              <MuiButton
                color="error"
                variant="contained"
                onClick={() => deleteContactId && handleDeleteLead(deleteContactId)}
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
