"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"

const specializationOptions = [
  "Marketing Management",
  "Finance Management",
  "Human Resource (HR) Management",
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
]

export function MultiSelectSpecialization({
  values,
  onChange,
}: {
  values: string[]
  onChange: (val: string[]) => void
}) {
  const allSelected = values.length === specializationOptions.length

  const toggleValue = (val: string) => {
    if (val === "All Specializations") {
      if (allSelected) {
        onChange([])
      } else {
        onChange([...specializationOptions])
      }
    } else {
      if (values.includes(val)) {
        onChange(values.filter((v) => v !== val))
      } else {
        onChange([...values, val])
      }
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-12 w-full justify-between bg-white border-gray-300"
        >
          {values.length > 0
            ? allSelected
              ? "All Specializations"
              : values.join(", ")
            : "Select Specializations"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      {/* Set max-h and overflow here, not just CommandList */}
      <PopoverContent className="w-[300px] p-0 max-h-[400px] overflow-hidden">
        <Command className="h-full">
          <CommandInput placeholder="Search specialization..." className="sticky top-0 z-10 bg-white" />
          <CommandList className="overflow-y-auto max-h-[360px]">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                key="All Specializations"
                value="All Specializations"
                onSelect={() => toggleValue("All Specializations")}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${allSelected ? "opacity-100" : "opacity-0"}`}
                />
                All Specializations
              </CommandItem>

              {specializationOptions.map((spec) => (
                <CommandItem
                  key={spec}
                  value={spec}
                  onSelect={() => toggleValue(spec)}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${values.includes(spec) ? "opacity-100" : "opacity-0"}`}
                  />
                  {spec}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
