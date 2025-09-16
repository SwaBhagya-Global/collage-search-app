"use client";

import { useState, useEffect } from "react";
import { AuthGuard } from "@/components/auth-guard";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog as UiDialog,
  DialogContent as UiDialogContent,
  DialogHeader,
  DialogTitle as UiDialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import BASE_URL from "@/app/config/api";

// Client-only Tiptap editor
import ClientOnlyEditor from "@/components/ClientOnlyEditor";

type Blog = {
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
  const [formData, setFormData] = useState({ title: "", author: "Admin", coverImage: "", content: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/blog`);
      const data = await res.json();
      const sorted = (data.data || []).sort(
        (a: Blog, b: Blog) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime()
      );
      setBlogs(sorted);
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to fetch blogs", variant: "destructive" });
    }
    setIsLoading(false);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append("image", file);

    try {
      const res = await fetch(`${BASE_URL}/upload`, { method: "POST", body: form });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setFormData((prev) => ({ ...prev, coverImage: data.imageUrl }));
      setSelectedFile(file);
    } catch (error) {
      console.error(error);
      toast({ title: "Upload Error", description: "Failed to upload image", variant: "destructive" });
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      toast({ title: "Error", description: "Title and Content are required", variant: "destructive" });
      return;
    }

    const payload: Blog = {
      title: formData.title,
      author: formData.author,
      content: formData.content,
      coverImage: formData.coverImage,
      publishedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${BASE_URL}/api/blog${editingBlog ? `/${editingBlog._id}` : ""}`, {
        method: editingBlog ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");

      toast({ title: "Success", description: `Blog ${editingBlog ? "updated" : "created"} successfully` });
      fetchBlogs();
      resetForm();
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to save blog", variant: "destructive" });
    }
  };

  const resetForm = () => {
    setFormData({ title: "", author: "Admin", coverImage: "", content: "" });
    setSelectedFile(null);
    setEditingBlog(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      author: blog.author || "Admin",
      coverImage: blog.coverImage || "",
      content: blog.content || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      const res = await fetch(`${BASE_URL}/api/blog/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast({ title: "Deleted", description: "Blog deleted successfully" });
      fetchBlogs();
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to delete blog", variant: "destructive" });
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) || (blog.author?.toLowerCase().includes(query) ?? false)
    );
    setFilteredBlogs(filtered);
    setPage(0);
  }, [searchQuery, blogs]);

  return (
    <AuthGuard>
      <DashboardLayout>
        <div className="space-y-6 p-6 min-h-screen">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Blogs Manager</h1>
            <UiDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm} className="bg-indigo-600 text-white flex items-center">
                  <Plus className="h-4 w-4 mr-2" /> New Blog
                </Button>
              </DialogTrigger>
              <UiDialogContent className="max-w-2xl">
                <DialogHeader>
                  <UiDialogTitle>{editingBlog ? "Edit Blog" : "Create Blog"}</UiDialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <InputField
                    label="Title"
                    value={formData.title}
                    onChange={(val) => setFormData({ ...formData, title: val })}
                  />
                  <InputField
                    label="Author"
                    value={formData.author}
                    onChange={(val) => setFormData({ ...formData, author: val })}
                    disabled
                  />
                  <div className="space-y-1">
                    <Label>Content</Label>
                    <ClientOnlyEditor
                      content={formData.content}
                      onChange={(value) => setFormData({ ...formData, content: value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Upload Main Image</Label>
                    <Input type="file" onChange={handleFileChange} />
                    {selectedFile && <p>{selectedFile.name}</p>}
                  </div>
                  <Button onClick={handleSave} className="bg-green-600 text-white w-full">
                    {editingBlog ? "Update" : "Save"}
                  </Button>
                </div>
              </UiDialogContent>
            </UiDialog>
          </div>

          <div className="mb-4 flex justify-center" style={{ maxWidth: 500, width: "100%" }}>
            <Input
              placeholder="Search by Title or Author"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {isLoading ? (
            <div className="min-h-[200px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : (
            <Paper>
              <TableContainer>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Author</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredBlogs
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((blog) => (
                        <TableRow key={blog._id}>
                          <TableCell>{blog.publishedAt?.split("T")[0]}</TableCell>
                          <TableCell>{blog.title}</TableCell>
                          <TableCell>{blog.author || "-"}</TableCell>
                          <TableCell align="right">
                            <Tooltip title="Edit">
                              <IconButton color="primary" size="small" onClick={() => handleEdit(blog)}>
                                <FiEdit size={18} />
                              </IconButton>
                            </Tooltip>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <IconButton color="error" size="small">
                                  <FiTrash2 size={18} />
                                </IconButton>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you sure you want to delete this blog?
                                  </AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(blog._id)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={blogs.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Paper>
          )}
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}

function InputField({
  label,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
