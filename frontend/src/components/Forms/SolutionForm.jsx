import React, { useState } from 'react';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import BackgroundSection from '../BackgroundSection';
import { Heading } from '../Heading/Heading';
import toast from 'react-hot-toast';
import { BiCheckCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export default function SolutionForm({ pageSource, data }) {
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    message: `inquiry from solution page - ${pageSource}`,
    company: '',
    country: '',
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
          category: 'Solution Offering',
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

  return (
    <BackgroundSection>
      <div className="container">
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
            <h2 className="text-2xl font-semibold text-white mb-2">
              Details Submitted Successfully!
            </h2>
            <p className="text-woodsmoke-200">
              Dear <span className="font-medium">{formData.fullName}</span>,
              <br />
              Thank you for contacting us. We will get back to you shortly.
            </p>
            <div className="flex gap-5 text-center mt-10">
              <Link
                to={data?.link1}
                className="text-white border-b border-flamingo-500 font-semibold text-lg"
              >
                Azure Solution
              </Link>
              <Link
                to={data?.link2}
                className="text-white border-b border-flamingo-500 font-semibold text-lg"
              >
                Case Study
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="relative z-10 flex flex-col items-center gap-10"
          >
            {/* Heading */}
            <Heading
              classes={'items-center'}
              smallTitle={'Contact Us'}
              title={'Explore Our Azure Offers'}
              subText={'Unlock Insights. Submit to Discover.'}
            />
            {/* Fields */}
            <div className="flex flex-col gap-8 w-full max-w-3xl">
              <div className="flex flex-wrap gap-8">
                <div className="flex-1 min-w-[260px]">
                  <label className="block text-white mb-2 font-semibold">
                    Full Name *
                  </label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white text-woodsmoke-500 border border-white rounded-md focus:outline-none"
                  />
                </div>
                <div className="flex-1 min-w-[260px]">
                  <label className="block text-white mb-2 font-semibold">
                    Business Email *
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    required
                    className="w-full px-4 py-2 bg-white text-woodsmoke-500 border border-white rounded-md focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-8">
                <div className="flex-1 min-w-[260px]">
                  <label className="block text-white mb-2 font-semibold">
                    Company
                  </label>
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white text-woodsmoke-500 border border-white rounded-md focus:outline-none"
                  />
                </div>
                <div className="flex-1 min-w-[260px]">
                  <label className="block text-white mb-2 font-semibold">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white text-woodsmoke-500 border border-white rounded-md focus:outline-none"
                  >
                    <option className="text-black" value="United States">
                      United States
                    </option>
                    <option className="text-black" value="India">
                      India
                    </option>
                    <option className="text-black" value="United Kingdom">
                      United Kingdom
                    </option>
                    <option className="text-black" value="Australia">
                      Australia
                    </option>
                  </select>
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <div className="mt-6">
              <PrimaryButton
                disabled={isSending}
                type="submit"
                title={isSending ? 'Sending - Please Wait...' : 'Submit'}
              />{' '}
            </div>

            {/* Disclaimer */}
            <div className="max-w-[1058px] text-center text-sm text-[#eaeaea] mt-4">
              By submitting your information in this form you are agreeing to
              the terms listed in our
              <span className="text-flamingo-500 font-semibold ml-1">
                Privacy Policy
              </span>
              . Bizmetric will only use this information to contact you about
              the products and services you requested.
            </div>
          </form>
        )}
      </div>
    </BackgroundSection>
  );
}
