'use client';

import { useState, useEffect } from "react";
import { AuthGuard } from "@/components/auth-guard";
import { DashboardLayout } from "@/components/dashboard-layout";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MuiButton,
  Tooltip,
  TextField
} from "@mui/material";
import { Edit2, Trash2, Plus, Delete, Edit } from "lucide-react";
import CollegeForm, { College } from "@/components/CollageForm";
import BASE_URL from "@/app/config/api";

export default function DashboardPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteCollegeId, setDeleteCollegeId] = useState<string | null>(null);
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const initialCollege: College = {
    name: "",
    shortName: "",
    about: "",
    location: "",
    address: "",
    mapUrl: "",
    brochureLink: "",
    established: new Date().getFullYear(),
    type: "Full Time",
    affiliation: "",
    state: "",
    ranking: 0,
    rating: 0,
    intake: "",
    images: [],
    category: [],
    specialization: [],
    averagePackage: "",
    highestPackage: "",
    topRecruiters: [""],
    phone: "",
    email: "",
    highlights: [""],
    courses: [{ name: "", duration: "", fees: "", eligibility: "", seats: 0 }],
    facilities: [""],
    admissionProcess: [""],
    links: { website: "", facebook: "", instagram: "", linkedin: "" }
  };

  // Fetch colleges
  const fetchColleges = async () => {
    setIsLoading(true); // start loader
    try {
      const res = await fetch(`${BASE_URL}/api/colleges`);
      const data = await res.json();
      setColleges(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false); // stop loader
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
        ? `${BASE_URL}/${data._id}` // match DELETE route style
        : `${BASE_URL}/api/colleges`;

      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save");

      fetchColleges();
      setIsFormOpen(false);
      setSelectedCollege(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete college
  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/colleges/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // sending token here
      }
    });
      if (res.ok) fetchColleges();
    } catch (err) {
      console.error(err);
    }
  };

  // Pagination
  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  // Add this useEffect for instant search
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = colleges.filter(
      (college) =>
        college.name.toLowerCase().includes(query) ||
        college.shortName.toLowerCase().includes(query)
    );
    setFilteredColleges(filtered);
    setPage(0);
  }, [searchQuery, colleges]);

  return (
    <AuthGuard>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold">Manage Colleges</h1>
              <p className="text-gray-600">Add or edit colleges information</p>
            </div>

            {/* Add College Button */}
            <CollegeForm
              open={isFormOpen}
              setOpen={setIsFormOpen}
              initialData={selectedCollege || initialCollege}
              onSave={handleSave}
            />
          </div>
          {/* ======= Dashboard-style Search Input ======= */}
          <div className="mb-4 flex justify-center" style={{ maxWidth: 500, width: "100%" }}>
            <TextField
              label="Search by name or shortname"
              variant="outlined"
              size="small"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>


          {/* Table */}
          <div className="relative">
            {/* Loader overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}

            {/* Table + Pagination */}
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ height: 60 }}>
                    <TableCell>Name</TableCell>
                    <TableCell>Short Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Ranking</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredColleges
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((college) => (
                      <TableRow key={college._id} sx={{ height: 60 }}>
                        <TableCell>{college.name}</TableCell>
                        <TableCell>{college.shortName}</TableCell>
                        <TableCell>{college.type}</TableCell>
                        <TableCell>{college.rating}</TableCell>
                        <TableCell>{college.ranking}</TableCell>

                        <TableCell>
                          {/* Actions preserved */}
                          <Tooltip title="Edit">
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={() => {
                                setSelectedCollege(college);
                                setIsFormOpen(true);
                              }}
                            >
                              <FiEdit size={18} />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete">
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => setDeleteCollegeId(college._id || null)}
                            >
                              <FiTrash2 size={18} />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>

              <TablePagination
                component="div"
                count={filteredColleges.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </TableContainer>
          </div>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={!!deleteCollegeId}
            onClose={() => setDeleteCollegeId(null)}
          >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this college? This action cannot be undone.
            </DialogContent>
            <DialogActions>
              <MuiButton onClick={() => setDeleteCollegeId(null)}>Cancel</MuiButton>
              <MuiButton
                color="error"
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
