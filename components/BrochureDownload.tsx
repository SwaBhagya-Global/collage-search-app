'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Download } from 'lucide-react';

export default function BrochureDownload({ brochureLink }: { brochureLink: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '' });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      alert('Please fill in all fields');
      return;
    }

    closeModal();

    // Trigger download
    const link = document.createElement('a');
    link.href = brochureLink;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = 'brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Download button */}
      <button
        onClick={openModal}
        className="w-full bg-[#3b48d4] hover:bg-[#2a349b] text-white font-semibold px-5 py-3 rounded-md shadow-lg flex items-center justify-center transition-colors duration-300"
      >
        <Download className="w-5 h-5 mr-2" />
        Download Brochure
      </button>

      {/* Modal */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

        {/* Modal container */}
        <div className="fixed inset-0 flex items-center justify-center p-6">
          <Dialog.Panel className="bg-white rounded-xl max-w-md w-full p-8 shadow-2xl border border-gray-200">
            {/* Heading */}
            <Dialog.Title className="text-3xl font-extrabold text-[#3b48d4] mb-2 text-center">
              Admission in MBA
            </Dialog.Title>
            {/* Subheading */}
            <p className="text-gray-600 mb-8 text-center text-sm sm:text-base">
              Please enter your details below to download the brochure.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b48d4] focus:border-transparent transition"
                required
              />
              <input
                name="phone"
                type="tel"
                placeholder="Contact Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b48d4] focus:border-transparent transition"
                required
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-600 font-medium hover:text-[#3b48d4] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#3b48d4] text-white font-semibold px-6 py-3 rounded-md shadow-lg hover:bg-[#2a349b] transition"
                >
                  Submit & Download
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
