export interface ApiCollege {
  _id: string
  name: string
  shortName: string
  state: string
  distric:string
  affiliation?: string
  address?: string
  rating: number
  established:number
  ranking:number
  type:string
  specialization:string
  intake?: string
  images: string[]
  category?: string[];
  highlights: string[]
  courses: {
    name: string
    duration: string
    fees: string
    eligibility: string
    seats: number
    _id: string
  }[]
  facilities?: string[]
  admissionProcess?: string[]
  links?: {
    website?: string
    facebook?: string
    instagram?: string
    linkedin?: string
    _id: string
  }
  applyLink?: string
  averagePackage: string
  highestPackage: string
  topRecruiters: string[]
  createdAt: string
  updatedAt: string
  email?: string
  phone?: string
  mapUrl: string
  about: string
  brochureLink?: string
  contact?: {
    email?: string
    _id: string
  }
}

export interface CollegeCardProps {
  college: {
    id: string
    name: string
    shortName?: string
    state: string
    distric:string
    rating: number
    fees: string
    courses: string
    images: string
    featured?: boolean
    established: number
    type: string
    ranking?: number
    placement?: string
    averagePackage?: string
    highlights?: string[]
    cutoff?: string
    category?: string[];
    applyLink?:string;
    website?: string
  }
}

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
    applyLink: string;
    established: string;
    type: string[];
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