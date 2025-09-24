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
    _id: string
  }
  averagePackage: string
  highestPackage: string
  topRecruiters: string[]
  createdAt: string
  updatedAt: string
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
  }
}