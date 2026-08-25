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
} from '@mui/material';
import {
  FileText,
  Plus,
  Search,
  RefreshCw,
  Eye,
  Trash2,
  Edit,
  Calendar,
  User,
  Image as ImageIcon,
  BookOpen,
  Layers,
  Sparkles,
  X,
  Upload,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import BASE_URL from '@/app/config/api';
import ClientOnlyEditor from '@/components/ClientOnlyEditor';
import DOMPurify from 'dompurify';

export type Blog = {
  _id?: string;
  title: string;
  author?: string;
  content: string;
  coverImage?: string;
  publishedAt?: string;
};

export default function BlogsManager() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [formData, setFormData] = useState({ title: '', author: 'Admin', coverImage: '', content: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [previewBlog, setPreviewBlog] = useState<Blog | null>(null);
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBlogs = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/blog`);
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();
      const sorted = (data.data || []).sort(
        (a: Blog, b: Blog) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
      );
      setBlogs(sorted);
    } catch (error: any) {
      console.error(error);
      toast({ title: 'Error', description: error.message || 'Failed to fetch blogs', variant: 'destructive' });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append('image', file);

    try {
      const res = await fetch(`${BASE_URL}/upload`, { method: 'POST', body: form });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setFormData((prev) => ({ ...prev, coverImage: data.imageUrl }));
      setSelectedFile(file);
      toast({ title: 'Success', description: 'Image uploaded successfully' });
    } catch (error: any) {
      console.error(error);
      toast({ title: 'Upload Error', description: error.message || 'Failed to upload image', variant: 'destructive' });
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      toast({ title: 'Validation Error', description: 'Title and Content are required', variant: 'destructive' });
      return;
    }

    setIsSaving(true);
    const payload: Blog = {
      title: formData.title,
      author: formData.author || 'Admin',
      content: formData.content,
      coverImage: formData.coverImage,
      publishedAt: editingBlog?.publishedAt || new Date().toISOString(),
    };

    try {
      const token = localStorage.getItem('token');
      const url = `${BASE_URL}/blog${editingBlog ? `/${editingBlog._id}` : ''}`;
      const res = await fetch(url, {
        method: editingBlog ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Save failed');

      toast({ title: 'Success', description: `Blog article ${editingBlog ? 'updated' : 'created'} successfully` });
      fetchBlogs(true);
      resetForm();
    } catch (error: any) {
      console.error(error);
      toast({ title: 'Error', description: error.message || 'Failed to save blog', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', author: 'Admin', coverImage: '', content: '' });
    setSelectedFile(null);
    setEditingBlog(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      author: blog.author || 'Admin',
      coverImage: blog.coverImage || '',
      content: blog.content || '',
    });
    setSelectedFile(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/blog/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) throw new Error('Delete failed');
      toast({ title: 'Deleted', description: 'Blog deleted successfully' });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      setDeleteBlogId(null);
    } catch (error: any) {
      console.error(error);
      toast({ title: 'Error', description: error.message || 'Failed to delete blog', variant: 'destructive' });
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return blogs.filter(
      (blog) =>
        !query ||
        blog.title.toLowerCase().includes(query) ||
        (blog.author?.toLowerCase().includes(query) ?? false)
    );
  }, [searchQuery, blogs]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = blogs.length;
    const authors = new Set(blogs.map((b) => b.author).filter(Boolean)).size;
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const recentPosts = blogs.filter((b) => new Date(b.publishedAt || 0).getTime() > thirtyDaysAgo).length;

    return { total, authors, recentPosts };
  }, [blogs]);

  const getFormattedDate = (dateString?: string): { date: string; time: string } => {
    if (!dateString) return { date: '-', time: '-' };
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return { date: dateString, time: '' };
      return {
        date: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      };
    } catch {
      return { date: dateString, time: '' };
    }
  };

  return (
    <AuthGuard>
      <DashboardLayout>
        <div className="space-y-6 p-2 md:p-6 min-h-screen">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <FileText className="h-7 w-7 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Blog & Articles Manager</h1>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Create, edit, publish, and manage all news articles, guides, and student publications.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => fetchBlogs(true)}
                disabled={isLoading || isRefreshing}
                className="inline-flex items-center px-3.5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm disabled:opacity-50 transition-colors"
                title="Refresh blogs data"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin text-blue-600' : 'text-gray-500'}`} />
                Refresh
              </button>

              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setIsDialogOpen(true);
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Blog
              </button>
            </div>
          </div>

          {/* Stats KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Articles</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</h3>
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                <FileText className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent (30 Days)</p>
                <h3 className="text-2xl font-bold text-emerald-600 mt-1">{stats.recentPosts}</h3>
              </div>
              <div className="h-12 w-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                <Calendar className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Authors</p>
                <h3 className="text-2xl font-bold text-purple-600 mt-1">{stats.authors}</h3>
              </div>
              <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                <User className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:max-w-md">
              <TextField
                label="Search by Article Title or Author"
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

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1 underline"
              >
                Clear Search
              </button>
            )}
          </div>

          {/* Table Container */}
          <div className="relative">
            {isLoading ? (
              <div className="min-h-[300px] flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
                <p className="text-sm text-gray-500">Loading articles...</p>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="min-h-[250px] flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200 p-8 text-center">
                <FileText className="h-12 w-12 text-gray-300 mb-3" />
                <h3 className="text-base font-semibold text-gray-700">No blog posts found</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-sm">
                  {searchQuery
                    ? 'No articles match your search terms. Try searching something else.'
                    : 'No articles published yet. Click "New Blog" to create your first article.'}
                </p>
              </div>
            ) : (
              <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '0.75rem', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 650 }}>
                  <Table stickyHeader aria-label="blogs table">
                    <TableHead>
                      <TableRow sx={{ '& th': { backgroundColor: '#f9fafb', fontWeight: 600, color: '#374151' } }}>
                        <TableCell width={60}>Sr.No</TableCell>
                        <TableCell width={160}>Date</TableCell>
                        <TableCell>Article</TableCell>
                        <TableCell width={150}>Author</TableCell>
                        <TableCell align="right" width={130}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredBlogs
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((blog, index) => {
                          const { date, time } = getFormattedDate(blog.publishedAt);

                          return (
                            <TableRow key={blog._id || index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell className="text-gray-500 font-medium">
                                {page * rowsPerPage + index + 1}
                              </TableCell>

                              {/* Date */}
                              <TableCell>
                                <div className="text-xs font-semibold text-gray-900">{date}</div>
                                {time && <div className="text-xs text-gray-500">{time}</div>}
                              </TableCell>

                              {/* Title & Cover Thumbnail */}
                              <TableCell>
                                <div className="flex items-center space-x-3">
                                  {blog.coverImage ? (
                                    <img
                                      src={blog.coverImage}
                                      alt={blog.title}
                                      className="h-10 w-14 rounded-lg object-cover border border-gray-200 flex-shrink-0 shadow-sm"
                                    />
                                  ) : (
                                    <div className="h-10 w-14 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center flex-shrink-0 border border-slate-200">
                                      <ImageIcon className="h-4 w-4" />
                                    </div>
                                  )}
                                  <div>
                                    <div className="font-semibold text-gray-900 line-clamp-1 max-w-md">
                                      {blog.title}
                                    </div>
                                    <div className="text-xs text-gray-400 font-mono mt-0.5">
                                      {blog._id ? `ID: ${blog._id.slice(-6)}` : ''}
                                    </div>
                                  </div>
                                </div>
                              </TableCell>

                              {/* Author */}
                              <TableCell>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                  <User className="h-3 w-3 mr-1" />
                                  {blog.author || 'Admin'}
                                </span>
                              </TableCell>

                              {/* Actions */}
                              <TableCell align="right">
                                <div className="flex items-center justify-end space-x-1">
                                  <Tooltip title="Preview Article">
                                    <IconButton
                                      size="small"
                                      color="info"
                                      onClick={() => setPreviewBlog(blog)}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title="Edit Article">
                                    <IconButton
                                      size="small"
                                      color="primary"
                                      onClick={() => handleEdit(blog)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title="Delete Article">
                                    <IconButton
                                      size="small"
                                      color="error"
                                      onClick={() => setDeleteBlogId(blog._id || null)}
                                      disabled={!blog._id}
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
                  count={filteredBlogs.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                />
              </Paper>
            )}
          </div>

          {/* Create / Edit Blog Dialog */}
          <Dialog
            open={isDialogOpen}
            onClose={() => !isSaving && setIsDialogOpen(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span className="font-bold text-gray-900">
                  {editingBlog ? 'Edit Blog Article' : 'Create New Blog Article'}
                </span>
              </div>
              <IconButton size="small" onClick={() => setIsDialogOpen(false)} disabled={isSaving}>
                <X className="h-4 w-4" />
              </IconButton>
            </DialogTitle>

            <DialogContent className="pt-4 space-y-4">
              <div className="space-y-4 mt-2">
                <TextField
                  label="Article Title"
                  required
                  fullWidth
                  size="small"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter a compelling article title"
                />

                <TextField
                  label="Author"
                  fullWidth
                  size="small"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Author Name (defaults to Admin)"
                />

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-gray-700 uppercase">Cover Image</Label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {formData.coverImage && (
                      <img
                        src={formData.coverImage}
                        alt="Cover preview"
                        className="h-10 w-16 object-cover rounded border border-gray-200"
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-gray-700 uppercase">Content (Rich Editor)</Label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden min-h-[220px]">
                    <ClientOnlyEditor
                      content={formData.content}
                      onChange={(val) => setFormData({ ...formData, content: val })}
                    />
                  </div>
                </div>
              </div>
            </DialogContent>

            <DialogActions className="border-t p-3">
              <MuiButton onClick={resetForm} disabled={isSaving}>
                Cancel
              </MuiButton>
              <MuiButton
                onClick={handleSave}
                variant="contained"
                color="primary"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : editingBlog ? 'Update Article' : 'Publish Article'}
              </MuiButton>
            </DialogActions>
          </Dialog>

          {/* View Article Preview Modal */}
          <Dialog
            open={!!previewBlog}
            onClose={() => setPreviewBlog(null)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span className="font-bold text-gray-900">Article Preview</span>
              </div>
              <IconButton size="small" onClick={() => setPreviewBlog(null)}>
                <X className="h-4 w-4" />
              </IconButton>
            </DialogTitle>

            <DialogContent className="pt-4 space-y-4">
              {previewBlog && (
                <div className="space-y-4">
                  {previewBlog.coverImage && (
                    <img
                      src={previewBlog.coverImage}
                      alt={previewBlog.title}
                      className="w-full h-64 object-cover rounded-xl border border-gray-200 shadow-sm"
                    />
                  )}

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{previewBlog.title}</h2>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-2 pb-3 border-b border-gray-200">
                      <span className="font-medium text-blue-600">By {previewBlog.author || 'Admin'}</span>
                      <span>•</span>
                      <span>
                        {previewBlog.publishedAt ? new Date(previewBlog.publishedAt).toLocaleDateString('en-US', { dateStyle: 'long' }) : '-'}
                      </span>
                    </div>
                  </div>

                  <div
                    className="prose max-w-none text-sm text-gray-800 leading-relaxed pt-2"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(previewBlog.content || ''),
                    }}
                  />
                </div>
              )}
            </DialogContent>

            <DialogActions className="border-t p-3">
              <MuiButton onClick={() => setPreviewBlog(null)} variant="outlined">
                Close
              </MuiButton>
            </DialogActions>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={!!deleteBlogId}
            onClose={() => setDeleteBlogId(null)}
          >
            <DialogTitle>Confirm Delete Article</DialogTitle>
            <DialogContent>
              <p className="text-sm text-gray-600">
                Are you sure you want to delete this blog post? This action cannot be undone.
              </p>
            </DialogContent>
            <DialogActions>
              <MuiButton onClick={() => setDeleteBlogId(null)}>Cancel</MuiButton>
              <MuiButton
                color="error"
                variant="contained"
                onClick={() => deleteBlogId && handleDelete(deleteBlogId)}
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
