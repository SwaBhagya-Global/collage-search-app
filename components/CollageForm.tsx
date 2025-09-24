'use client';

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as Icons from "lucide-react";
import { Upload } from "lucide-react";
import BASE_URL from "@/app/config/api";


// Options
const categoryOptions = ["MBA", "PGDM"];
// const specializationOptions = ["HR", "Marketing", "Finance"];
const specializationOptions = [
    "HR",
    "Marketing",
    "Finance",
    "Operations & Supply Chain Management",
    "International Business",
    "Business Analytics / Data Analytics",
    "Information Technology (IT) / Systems",
    "Healthcare & Hospital Management",
    "Retail & E-Commerce Management",
    "Banking, Financial Services & Insurance (BFSI)",
    "Agri-Business Management",
    "Media & Communication Management",
    "Tourism & Hospitality Management",
    "Digital Marketing",
    "Entrepreneurship & Startups",
    "Artificial Intelligence & Machine Learning in Business",
    "Sustainability & Environmental Management",
    "Sports Management",
    "Project Management",
    "Logistics & Supply Chain Management",
    "Aviation Management",
    "Energy & Power Management",
    "Pharmaceutical Management",
    "Rural & Development Management",
    "Public Policy & Administration",
    "Event Management",
    "Family Business Management",
    "Infrastructure & Real Estate Management",
    "Telecom Management",
    "Defence Management",
    "Hospitality & Leisure Management",
    "Corporate Social Responsibility (CSR) & NGO Management",
    "Economics & Public Policy",
    "Innovation & Design Thinking",
    "Risk Management",
    "Insurance Management",
    "Education Management",
    "Fashion Management",
    "Luxury Brand Management",
    "Port & Shipping Management",
];
const typeOptions = ["Full Time", "Part Time", "Online", "Executive"];
const courseTypes = ["MBA", "PGDM"];

// Types
export interface Course {
    name: string;
    duration: string;
    fees: string;
    eligibility: string;
    seats: number;
}

export interface Links {
    website: string;
    facebook: string;
    instagram: string;
    linkedin: string;
}

export interface College {
    _id?: string;
    name: string;
    shortName: string;
    about: string;
    distric: string;
    address: string;
    mapUrl: string;
    brochureLink: string;
    established: string;
    type: string;
    affiliation: string;
    state: string;
    ranking: number;
    rating: number;
    intake: string;
    images: string[];
    category: string[];
    specialization: string[];
    averagePackage: string;
    highestPackage: string;
    topRecruiters: string[];
    phone: string;
    email: string;
    highlights: string[];
    courses: Course[];
    facilities: string[];
    admissionProcess: string[];
    links: Links;
}

// Props
interface CollegeFormProps {
    open: boolean;
    setOpen: (val: boolean) => void;
    initialData: College;
    onSave: (data: College) => void;
}

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhatisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
];

export default function CollegeForm({ open, setOpen, initialData, onSave }: CollegeFormProps) {
    const [formData, setFormData] = useState<College>(initialData);
    const [isUploading, setIsUploading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        const uploadForm = new FormData();
        uploadForm.append("image", file);

        try {
            const res = await fetch(`${BASE_URL}/upload`, {
                method: "POST",
                body: uploadForm
            });

            if (res.ok) {
                const data = await res.json();
                setFormData(prev => ({ ...prev, images: [data.imageUrl] }));
            } else {
                console.error("Upload failed:", await res.text());
            }
        } catch (error) {
            console.error("Upload error:", error);
        }

        setIsUploading(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleSpecialization = (val: string) => {
        if (formData.specialization.includes(val)) {
            setFormData({
                ...formData,
                specialization: formData.specialization.filter((v) => v !== val),
            });
        } else {
            setFormData({
                ...formData,
                specialization: [...formData.specialization, val],
            });
        }
    };

    const filteredOptions = specializationOptions.filter((opt) =>
        opt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = () => onSave(formData);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
                <DialogTitle></DialogTitle>
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-green-700">Basic Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <InputField label="Name*" value={formData.name} onChange={val => setFormData({ ...formData, name: val })} />
                        <InputField label="Short Name*" value={formData.shortName} onChange={val => setFormData({ ...formData, shortName: val })} />
                        <TextAreaField label="About" value={formData.about} onChange={val => setFormData({ ...formData, about: val })} />
                        <InputField label="District*" value={formData.distric} onChange={val => setFormData({ ...formData, distric: val })} />
                        <TextAreaField label="Address*" value={formData.address} onChange={val => setFormData({ ...formData, address: val })} />
                        <InputField label="Map URL" value={formData.mapUrl} onChange={val => setFormData({ ...formData, mapUrl: val })} />
                        <InputField label="Brochure Link" value={formData.brochureLink} onChange={val => setFormData({ ...formData, brochureLink: val })} />
                        <InputField label="Established" value={formData?.established} onChange={val => setFormData({ ...formData, established: val })} />
                        <div>
                            <Label>Type</Label>
                            <Select value={formData.type} onValueChange={val => setFormData({ ...formData, type: val })}>
                                <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
                                <SelectContent>{typeOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                        <InputField label="Affiliation" value={formData.affiliation} onChange={val => setFormData({ ...formData, affiliation: val })} />
                        {/* <InputField label="State*" value={formData.state} onChange={val => setFormData({ ...formData, state: val })} /> */}
                       <div className="space-y-2">
  <label className="text-sm font-medium text-gray-700">State*</label>
  <Select
    value={formData.state}
    onValueChange={(val) => setFormData({ ...formData, state: val })}
  >
    <SelectTrigger className="h-12 w-full bg-white border border-gray-300">
      <SelectValue placeholder="Select State" />
    </SelectTrigger>
    <SelectContent className="max-h-60 overflow-y-auto">
      {indianStates.map((state) => (
        <SelectItem key={state} value={state}>
          {state}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>
                        <InputField label="Ranking" value={formData?.ranking?.toString()} onChange={val => setFormData({ ...formData, ranking: parseInt(val) || 0 })} />
                        <InputField label="Rating" value={formData?.rating?.toString()} onChange={val => setFormData({ ...formData, rating: parseInt(val) || 0 })} disabled />
                        <InputField label="Average Package" value={formData.averagePackage} onChange={val => setFormData({ ...formData, averagePackage: val })} />
                        <InputField label="Highest Package" value={formData.highestPackage} onChange={val => setFormData({ ...formData, highestPackage: val })} />
                        <InputField label="Phone" value={formData.phone} onChange={val => setFormData({ ...formData, phone: val })} />
                        <InputField label="Email" value={formData.email} onChange={val => setFormData({ ...formData, email: val })} />
                        <CheckboxField label="Category" values={formData.category} onChange={vals => setFormData({ ...formData, category: vals })} options={categoryOptions} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Specialization Multi-Select */}
                        <div className="relative" ref={dropdownRef}>
                            <label className="block mb-1 font-medium text-gray-700">Specializations*</label>
                            <div
                                className="border h-12 px-3 flex items-center justify-between rounded-lg bg-white border-gray-300 cursor-pointer"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <span className="truncate">
                                    {formData.specialization.length > 0
                                        ? formData.specialization.join(", ")
                                        : "Select Specializations"}
                                </span>
                                <span className="ml-2 text-gray-500">&#9662;</span>
                            </div>

                            {dropdownOpen && (
                                <div className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto border bg-white shadow-md rounded-lg">
                                    <div className="p-2">
                                        <input
                                            type="text"
                                            placeholder="Search specialization..."
                                            className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                    {filteredOptions.length > 0 ? (
                                        filteredOptions.map((opt) => (
                                            <label key={opt} className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.specialization.includes(opt)}
                                                    onChange={() => toggleSpecialization(opt)}
                                                    className="mr-2"
                                                />
                                                {opt}
                                            </label>
                                        ))
                                    ) : (
                                        <div className="px-3 py-2 text-gray-400">No results found</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <ArrayField label="Highlights" values={formData.highlights} onChange={vals => setFormData({ ...formData, highlights: vals })} />
                    <ArrayField label="Top Recruiters" values={formData.topRecruiters} onChange={vals => setFormData({ ...formData, topRecruiters: vals })} />
                    <ArrayField label="Facilities" values={formData.facilities} onChange={vals => setFormData({ ...formData, facilities: vals })} />
                    <ArrayField label="Admission Process" values={formData.admissionProcess} onChange={vals => setFormData({ ...formData, admissionProcess: vals })} />

                    <CoursesField courses={formData.courses} onChange={courses => setFormData({ ...formData, courses })} />

                    <div className="grid grid-cols-2 gap-4">
                        <InputField label="Website" value={formData.links.website} onChange={val => setFormData({ ...formData, links: { ...formData.links, website: val } })} />
                        <InputField label="Facebook" value={formData.links.facebook} onChange={val => setFormData({ ...formData, links: { ...formData.links, facebook: val } })} />
                        <InputField label="Instagram" value={formData.links.instagram} onChange={val => setFormData({ ...formData, links: { ...formData.links, instagram: val } })} />
                        <InputField label="LinkedIn" value={formData.links.linkedin} onChange={val => setFormData({ ...formData, links: { ...formData.links, linkedin: val } })} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="main-image" className="text-gray-700 font-medium">
                            Upload Main Image*
                        </Label>
                        <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center bg-blue-50 hover:border-blue-500 hover:bg-blue-100 transition-colors">
                            <input
                                id="main-image"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            <label htmlFor="main-image" className="cursor-pointer">
                                <Upload className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                                <p className="text-sm text-blue-700">
                                    {formData.images.length > 0 ? "Image selected" : "Click to upload main image or drag and drop"}
                                </p>
                            </label>
                        </div>
                        {isUploading && <p className="text-sm text-gray-500">Uploading image...</p>}
                        {formData.images.length > 0 && (
                            <div className="mt-2 w-32 h-32 mx-auto">
                                <img src={formData.images[0]} alt="Uploaded" className="w-full h-full object-cover rounded" />
                            </div>
                        )}
                    </div>

                    <Button onClick={handleSubmit} className="w-full bg-green-600 text-white hover:bg-green-700">
                        {formData._id ? "Update College" : "Save College"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

// Reusable Input Components
function InputField({ label, value, onChange, disabled = false }: { label: string; value: string; onChange: (val: string) => void; disabled?: boolean }) {
    return (
        <div>
            <Label>{label}</Label>
            <Input value={value} disabled={disabled} onChange={e => onChange(e.target.value)} />
        </div>
    );
}

function TextAreaField({ label, value, onChange }: { label: string; value: string; onChange: (val: string) => void }) {
    return (
        <div>
            <Label>{label}</Label>
            <textarea value={value} onChange={e => onChange(e.target.value)} className="w-full border p-2 rounded" />
        </div>
    );
}

function CheckboxField({ label, values, onChange, options }: { label: string; values: string[]; onChange: (vals: string[]) => void; options: string[] }) {
    const toggleValue = (val: string) => {
        if (values.includes(val)) {
            onChange(values.filter(v => v !== val));
        } else {
            onChange([...values, val]);
        }
    };

    return (
        <div>
            <h3 className="text-lg font-semibold text-green-700">{label}</h3>
            <div className="flex flex-wrap gap-4">
                {options.map((opt) => (
                    <label key={opt} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={values.includes(opt)}
                            onChange={() => toggleValue(opt)}
                        />
                        <span>{opt}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

function ArrayField({ label, values, onChange, options }: { label: string; values: string[]; onChange: (vals: string[]) => void; options?: string[] }) {
    const updateValue = (index: number, val: string) => {
        const newVals = [...values];
        newVals[index] = val;
        onChange(newVals);
    };

    const removeValue = (index: number) => {
        if (values.length === 1) {
            onChange([""]);
        } else {
            onChange(values.filter((_, i) => i !== index));
        }
    };

    return (
        <div>
            <h3 className="text-lg font-semibold text-green-700">{label}</h3>
            {values.map((val, i) => (
                <div key={i} className="flex gap-2 items-end mb-2">
                    {options ? (
                        <Select value={val} onValueChange={v => updateValue(i, v)}>
                            <SelectTrigger><SelectValue placeholder={`Select ${label}`} /></SelectTrigger>
                            <SelectContent>{options.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent>
                        </Select>
                    ) : (
                        <Input className="flex-1" value={val} onChange={e => updateValue(i, e.target.value)} />
                    )}
                    <Button variant="destructive" onClick={() => removeValue(i)}><Icons.Trash className="h-4 w-4" /></Button>
                </div>
            ))}
            <Button onClick={() => onChange([...values, ""])}>Add {label}</Button>
        </div>
    );
}

function CoursesField({ courses, onChange }: { courses: Course[]; onChange: (courses: Course[]) => void }) {
    const updateCourse = (index: number, key: keyof Course, value: string | number) => {
        const newCourses = [...courses];
        newCourses[index] = { ...newCourses[index], [key]: value };
        onChange(newCourses);
    };
    const removeCourse = (index: number) => onChange(courses.filter((_, i) => i !== index));

    return (
        <div>
            <h3 className="text-lg font-semibold text-green-700">
                Courses
                <span className="ml-2 text-sm font-normal text-red-600">
                    (at least one course is required)
                </span>
            </h3>
            {courses.map((course, i) => (
                <div key={i} className="grid grid-cols-5 gap-2 mb-2 items-end">
                    <Select
                        value={course.name}
                        onValueChange={val => updateCourse(i, "name", val)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Course" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="MBA">MBA</SelectItem>
                            <SelectItem value="PGDM">PGDM</SelectItem>
                        </SelectContent>
                    </Select>
                    {/* <Select
                        value={course.duration}
                        onValueChange={val => updateCourse(i, "duration", val)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Duration" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1-Year">1-Year</SelectItem>
                            <SelectItem value="2-Year">2-Year</SelectItem>
                            <SelectItem value="3-Year">3-Year</SelectItem>
                            <SelectItem value="4-Year">4-Year</SelectItem>
                        </SelectContent>
                    </Select> */}
                    <Input value={course.duration} placeholder="Duration" onChange={e => updateCourse(i, "duration", e.target.value)} />
                    <Input value={course.fees} placeholder="Fees" onChange={e => updateCourse(i, "fees", e.target.value)} />
                    <Input value={course.eligibility} placeholder="Eligibility" onChange={e => updateCourse(i, "eligibility", e.target.value)} />
                    <Input value={course.seats.toString()} type="number" placeholder="Seats" onChange={e => updateCourse(i, "seats", parseInt(e.target.value) || 0)} />
                    <Button variant="destructive" onClick={() => removeCourse(i)}><Icons.Trash className="h-4 w-4" /></Button>
                </div>
            ))}
            <Button onClick={() => onChange([...courses, { name: "", duration: "", fees: "", eligibility: "", seats: 0 }])}>Add Course</Button>
        </div>
    );
}
