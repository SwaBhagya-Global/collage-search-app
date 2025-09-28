'use client';

import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import BASE_URL from '@/app/config/api';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  buttonText: string;
  brochureLink?: string;
  applyLink?: string;
  showEmail?: boolean;
  flag: string;
  collegeName:string;
}

export default function FormModal({
  isOpen,
  onClose,
  title,
  subtitle,
  buttonText,
  brochureLink,
  applyLink,
  showEmail = false,
  flag,
  collegeName
}: FormModalProps) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', flag: flag, CollegeName: collegeName });
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  console.log("form",form)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handle",form);
    const { name, value } = e.target;

    if (name === 'phone') {
      // Allow only digits and max 10 characters
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setForm(prev => ({ ...prev, phone: digitsOnly }));

      // Validate phone immediately
      if (!digitsOnly) {
        setErrors(prev => ({ ...prev, phone: 'Phone number is required' }));
      } else if (!/^\d{10}$/.test(digitsOnly)) {
        setErrors(prev => ({ ...prev, phone: 'Phone number must be 10 digits' }));
      } else {
        setErrors(prev => ({ ...prev, phone: undefined }));
      }
    } else if (name === 'email') {
      setForm(prev => ({ ...prev, email: value }));

      // Validate email immediately if showEmail is true
      if (showEmail) {
        if (!value.trim()) {
          setErrors(prev => ({ ...prev, email: 'Email is required' }));
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value.trim())) {
          setErrors(prev => ({ ...prev, email: 'Invalid email format' }));
        } else {
          setErrors(prev => ({ ...prev, email: undefined }));
        }
      }
    } else {
      setForm(prev => ({ ...prev, [name]: value }));

      if (name === 'name') {
        if (!value.trim()) {
          setErrors(prev => ({ ...prev, name: 'Name is required' }));
        } else {
          setErrors(prev => ({ ...prev, name: undefined }));
        }
      }
    }
  };

  useEffect(() => {
  setForm(prev => ({ ...prev, CollegeName: collegeName }));
}, [collegeName]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate before submit
    if (!form.name.trim() || !form.phone.trim() || (showEmail && !form.email.trim())) {
      setResponseMessage("Please fill in all required fields.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMessage(data.message || 'Form submitted successfully!');
        setForm({ name: '', phone: '', email: '', flag: flag, CollegeName: collegeName }); // Reset form
        if (flag === 'download_brochure' && brochureLink) {
          const link = document.createElement('a');
          link.href = brochureLink;
          link.download = ''; // Let browser infer the filename
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }else{
          window.open(applyLink, "_blank");
        }
      } else {
        setResponseMessage(data.message || 'Submission failed.');
      }
    } catch (error: any) {
      setResponseMessage(error.message || 'Something went wrong.');
    }
  };

  const onCancle = () => {
    setForm({ name: '', phone: '', email: '', flag: flag, CollegeName: collegeName });
    setResponseMessage(null);
    onClose();
  }


  return (
    <Dialog open={isOpen} onClose={onCancle} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-6">
        <Dialog.Panel className="bg-white rounded-xl max-w-md w-full p-8 shadow-2xl border border-gray-200">
          <Dialog.Title className="text-3xl font-extrabold text-[#3b48d4] mb-2 text-center">{title}</Dialog.Title>
          <p className="text-gray-600 mb-8 text-center text-sm sm:text-base">{subtitle}</p>

          {/* ✅ Show response message here */}
          {responseMessage && (
            <div className="mb-4 text-center text-sm text-gray-700">
              {responseMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className={`w-full border rounded-md p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b48d4] focus:border-transparent transition ${errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                required
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                name="phone"
                type="text"
                inputMode="numeric"
                pattern="\d{10}"
                placeholder="Contact Number"
                value={form.phone}
                onChange={handleChange}
                className={`w-full border rounded-md p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b48d4] focus:border-transparent transition ${errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                required
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {showEmail && (
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full border rounded-md p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b48d4] focus:border-transparent transition ${errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            )}


            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onCancle}
                className="text-gray-600 font-medium hover:text-[#3b48d4] transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#3b48d4] text-white font-semibold px-6 py-3 rounded-md shadow-lg hover:bg-[#2a349b] transition"
              >
                {buttonText}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
