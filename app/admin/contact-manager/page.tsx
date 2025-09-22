'use client';

import { useState, useEffect } from "react";
import { AuthGuard } from "@/components/auth-guard";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField } from "@mui/material";
import { toast } from '@/components/ui/use-toast';
import BASE_URL from "@/app/config/api";

type Contact = {
    _id?: string;
    name: string;
    CollegeName: string;
    phone: string;
    email: string;
    createdAt?: string; // date field
    flag:string;
};

export default function ContactsManager() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${BASE_URL}/api/leads`,{ 
        method: "GET",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // sending token here
      }
       });
            const data = await res.json();
            const contactData = Array.isArray(data.data) ? data.data : [];
            setContacts(contactData);
            setFilteredContacts(contactData);
        } catch (err) {
            console.error(err);
            toast({ title: 'Error', description: 'Failed to fetch contacts', variant: 'destructive' });
        }
        setIsLoading(false);
    };

    
    useEffect(() => {
        const query = searchQuery.toLowerCase();
        const filtered = contacts.filter(contact =>
            contact?.CollegeName?.toLowerCase()?.includes(query) ||
            (contact?.createdAt?.split('T')[0]?.includes(query) ?? false)
        );
        setFilteredContacts(filtered);
        setPage(0);
    }, [searchQuery, contacts]);

    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <AuthGuard>
            <DashboardLayout>
                <div className="space-y-6 p-6 min-h-screen">
                    <h1 className="text-2xl font-bold mb-4">Contacts Manager</h1>

                   
                    <div className="mb-4 flex justify-center" style={{ maxWidth: 500, width: "100%" }}>
                        <TextField
                            label="Search by Date or College Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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
                                            <TableCell>Sr.No</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>College Name</TableCell>
                                            <TableCell>Phone</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>From</TableCell>
                                            <TableCell>Date</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredContacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((contact,index) => (
                                                <TableRow key={contact._id}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{contact.name}</TableCell>
                                                    <TableCell>{contact.CollegeName}</TableCell>
                                                    <TableCell>{contact.phone}</TableCell>
                                                    <TableCell>{contact.email}</TableCell>
                                                     <TableCell>{contact.flag}</TableCell>
                                                    <TableCell>{contact.createdAt?.split('T')[0] || '-'}</TableCell>
                                                </TableRow>
                                            ))}
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
                                rowsPerPageOptions={[5, 10, 25]}
                            />
                        </Paper>
                    )}
                </div>
            </DashboardLayout>
        </AuthGuard>
    );
}

// 'use client';

// import { useState, useEffect } from "react";
// import { AuthGuard } from "@/components/auth-guard";
// import { DashboardLayout } from "@/components/dashboard-layout";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField } from "@mui/material";

// type Contact = {
//     _id?: string;
//     name: string;
//     collegeName: string;
//     phone: string;
//     email: string;
//     createdAt?: string; // date field
// };

// export default function ContactsManager() {
//     const sampleData: Contact[] = [
//         { _id: '1', name: 'Alice Johnson', collegeName: 'Harvard University', phone: '1234567890', email: 'alice@example.com', createdAt: '2025-09-10T12:00:00Z' },
//         { _id: '2', name: 'Bob Smith', collegeName: 'Stanford University', phone: '9876543210', email: 'bob@example.com', createdAt: '2025-09-11T12:00:00Z' },
//         { _id: '3', name: 'Charlie Brown', collegeName: 'MIT', phone: '5555555555', email: 'charlie@example.com', createdAt: '2025-09-10T08:30:00Z' },
//         { _id: '4', name: 'Diana Prince', collegeName: 'Oxford University', phone: '1112223333', email: 'diana@example.com', createdAt: '2025-09-12T10:45:00Z' },
//         { _id: '5', name: 'Ethan Hunt', collegeName: 'Cambridge University', phone: '4445556666', email: 'ethan@example.com', createdAt: '2025-09-11T09:20:00Z' },
//     ];

//     const [contacts, setContacts] = useState<Contact[]>([]);
//     const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//     const [searchQuery, setSearchQuery] = useState('');

//     useEffect(() => {
//         // Load sample data
//         setContacts(sampleData);
//         setFilteredContacts(sampleData);
//     }, []);

//     // Instant search logic
//     useEffect(() => {
//         const query = searchQuery.toLowerCase();
//         const filtered = contacts.filter(contact =>
//             contact.collegeName.toLowerCase().includes(query) ||
//             (contact.createdAt?.split('T')[0].includes(query) ?? false)
//         );
//         setFilteredContacts(filtered);
//         setPage(0);
//     }, [searchQuery, contacts]);

//     const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
//     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     return (
//         <AuthGuard>
//             <DashboardLayout>
//                 <div className="space-y-6 p-6 min-h-screen">
//                     <h1 className="text-2xl font-bold mb-4">Contacts Manager</h1>

//                     {/* Instant Search Input */}
//                     <div className="mb-4 flex justify-center" style={{ maxWidth: 500, width: "100%" }}>
//                         <TextField
//                             label="Search by Date or College Name"
//                             variant="outlined"
//                             size="small"
//                             fullWidth
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                         />
//                     </div>

//                     <Paper>
//                         <TableContainer>
//                             <Table stickyHeader>
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell>Name</TableCell>
//                                         <TableCell>College Name</TableCell>
//                                         <TableCell>Phone</TableCell>
//                                         <TableCell>Email</TableCell>
//                                         <TableCell>Date</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {filteredContacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                         .map(contact => (
//                                             <TableRow key={contact._id}>
//                                                 <TableCell>{contact.name}</TableCell>
//                                                 <TableCell>{contact.collegeName}</TableCell>
//                                                 <TableCell>{contact.phone}</TableCell>
//                                                 <TableCell>{contact.email}</TableCell>
//                                                 <TableCell>{contact.createdAt?.split('T')[0] || '-'}</TableCell>
//                                             </TableRow>
//                                         ))}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>

//                         <TablePagination
//                             component="div"
//                             count={filteredContacts.length}
//                             page={page}
//                             onPageChange={handleChangePage}
//                             rowsPerPage={rowsPerPage}
//                             onRowsPerPageChange={handleChangeRowsPerPage}
//                             rowsPerPageOptions={[5, 10, 25]}
//                         />
//                     </Paper>
//                 </div>
//             </DashboardLayout>
//         </AuthGuard>
//     );
// }
