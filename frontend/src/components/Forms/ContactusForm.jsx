import React, { useState, useEffect } from 'react';
import {
  HiOutlineBriefcase,
  HiOutlineDotsHorizontal,
  HiOutlineUserGroup,
} from 'react-icons/hi';

import { PrimaryButton } from '../Buttons/PrimaryButton';
import toast from 'react-hot-toast';
import { BiCheckCircle } from 'react-icons/bi';

const ContactusForm = ({ pageSource }) => {
  const [selectedTab, setSelectedTab] = useState('Business Offerings');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    source: [],
    pageSource: pageSource,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => {
        const source = checked
          ? [...prev.source, value]
          : prev.source.filter((item) => item !== value);
        return { ...prev, source };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const response = await fetch('/api/contact/sendForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          category: selectedTab,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Something went wrong.');
      }

      setIsSending(false);
      setIsSuccess(true);
      setShowCheck(true);
      toast.success('Form Submitted');
    } catch (error) {
      setIsSending(false);
      toast.error(`Submission error - ${error.message}`);
    }
  };

  const tabs = [
    {
      label: 'Business Offerings',
      icon: <HiOutlineBriefcase className="w-5 h-5 mr-1" />,
    },
    {
      label: 'Career Opportunities',
      icon: <HiOutlineUserGroup className="w-5 h-5 mr-1" />,
    },
    {
      label: 'Other',
      icon: <HiOutlineDotsHorizontal className="w-5 h-5 mr-1" />,
    },
  ];

  return (
    <div>
      <div className="max-w-xl p-6 bg-white rounded-lg shadow-md relative z-10 -mt-20">
        {isSuccess ? (
          <div className="flex flex-col justify-center items-center text-center p-6">
            <div className="relative w-20 h-20 mb-4">
              <div
                className={`w-20 h-20 rounded-full border-4 border-junglegreen-300 flex items-center justify-center transition-all duration-700 ease-out ${
                  showCheck ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                }`}
              >
                <BiCheckCircle className="h-12 w-12 text-junglegreen-500 animate-bounce" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Details Submitted Successfully!
            </h2>
            <p className="text-gray-600">
              Dear <span className="font-medium">{formData.fullName}</span>,
              <br />
              Thank you for contacting us. We will get back to you shortly.
            </p>
          </div>
        ) : (
          <div>
            {/* Tabs */}
            <div className="flex justify-center mb-6 space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setSelectedTab(tab.label)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors border ${
                    selectedTab === tab.label
                      ? 'bg-green-100 text-green-700 border-green-500'
                      : 'bg-gray-100 text-gray-500 border-transparent'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <h2 className="text-2xl font-semibold mb-2">
              We’d love to hear from you
            </h2>
            <p className="text-gray-500 mb-6 text-md">
              Have a question? Submit your details through our Contact Us form
              and we’ll get back to you soon.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                type="text"
                placeholder="Full Name *"
                required
                className="w-full px-4 py-2 border rounded-md"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Business Email *"
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                placeholder="Message *"
                required
                className="w-full px-4 py-2 border rounded-md"
              ></textarea>

              <label className="block text-sm font-medium mb-2">
                How did you hear about us? *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  'Social Media',
                  'Google Search',
                  'Billboard',
                  'Third-Party Review',
                  'Peer Referral',
                  'Other',
                ].map((label) => (
                  <label key={label} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="source"
                      value={label}
                      checked={formData.source.includes(label)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>

              {/* Submit Button */}
              <div className="w-full flex justify-center pt-5 pb-5">
                <PrimaryButton
                  disabled={isSending}
                  type="submit"
                  title={isSending ? 'Sending - Please Wait...' : 'Submit'}
                />
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-gray-500 text-center mt-4">
                By submitting your information in this form you are agreeing to
                the terms listed in our{' '}
                <a href="#" className="text-flamingo-500 underline">
                  Privacy Policy
                </a>
                . Bitmetric will only use this information to contact you about
                the products and services you requested. We will be in touch
                with you shortly once we receive your details.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactusForm;
