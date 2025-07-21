"use client";
import { useState } from "react";

const FindRishtaForm = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    whatsapp: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{message: string; success: boolean} | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    age: false,
    gender: false,
    whatsapp: false
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const validateForm = () => {
    const errors = [];
    
    if (!form.name.trim()) errors.push("Name is required");
    
    const age = parseInt(form.age);
    if (isNaN(age)) {
      errors.push("Age must be a number");
    } else if (age < 18 || age > 60) {
      errors.push("Age must be between 18-60");
    }
    
    if (!form.gender) errors.push("Gender is required");
    
    const whatsappRegex = /^\+[1-9]\d{10,14}$/;
    if (!whatsappRegex.test(form.whatsapp)) {
      errors.push("Invalid WhatsApp number format (e.g. +923001234567)");
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setSubmitted(false);

    const errors = validateForm();
    if (errors.length > 0) {
      setResult({message: errors.join(". "), success: false});
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://rhistae-agent.onrender.com/api/find-match/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          age: form.age,
          gender: form.gender,
          number: form.whatsapp,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || `Request failed with status ${res.status}`);
      }

      const data = await res.json();
      setResult({message: data.message, success: data.success});
      
      if (data.success) {
        setForm({
          name: "",
          age: "",
          gender: "",
          whatsapp: "",
        });
        setTouched({
          name: false,
          age: false,
          gender: false,
          whatsapp: false
        });
        setSubmitted(true);
      }
    } catch (error) {
      setResult({
        message: error instanceof Error ? error.message : "Network error. Please try again.",
        success: false
      });
    } finally {
      setLoading(false);
    }
  };

  const isFieldValid = (fieldName: keyof typeof form) => {
    if (!touched[fieldName]) return true;
    return validateForm().every(error => !error.includes(fieldName));
  };

  return (
    <section className="bg-[#FFF5F8] py-16 px-4 sm:px-6">
      <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#9D6D7A] text-center mb-6">
          💘 Find Your Perfect Match
        </h2>

        {submitted && result?.success ? (
          <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Success!</h3>
            <p className="text-green-600">{result.message}</p>
            <p className="mt-2 text-sm text-green-500">We&apos;ve sent matches to your WhatsApp</p>
            <button
              onClick={() => {
                setSubmitted(false);
                setResult(null);
              }}
              className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition"
            >
              Search Again
            </button>
          </div>
        ) : (
          <>
            {result && !result.success && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                {result.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                  required
                  className={`w-full border ${isFieldValid('name') ? 'border-gray-300' : 'border-red-500'} rounded-md px-4 py-2 text-sm`}
                />
                {!isFieldValid('name') && (
                  <p className="text-red-500 text-xs mt-1">Please enter a valid name</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Age (18-60)</label>
                <input
                  name="age"
                  type="number"
                  min="18"
                  max="60"
                  value={form.age}
                  onChange={handleChange}
                  onBlur={() => setTouched(prev => ({ ...prev, age: true }))}
                  required
                  className={`w-full border ${isFieldValid('age') ? 'border-gray-300' : 'border-red-500'} rounded-md px-4 py-2 text-sm`}
                />
                {!isFieldValid('age') && (
                  <p className="text-red-500 text-xs mt-1">Age must be between 18-60</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  onBlur={() => setTouched(prev => ({ ...prev, gender: true }))}
                  required
                  className={`w-full border ${isFieldValid('gender') ? 'border-gray-300' : 'border-red-500'} rounded-md px-4 py-2 text-sm`}
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
                {!isFieldValid('gender') && (
                  <p className="text-red-500 text-xs mt-1">Please select a gender</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  WhatsApp Number (with country code)
                </label>
                <input
                  name="whatsapp"
                  type="tel"
                  placeholder="+923001234567"
                  pattern="^\+[1-9]\d{10,14}$"
                  value={form.whatsapp}
                  onChange={handleChange}
                  onBlur={() => setTouched(prev => ({ ...prev, whatsapp: true }))}
                  required
                  className={`w-full border ${isFieldValid('whatsapp') ? 'border-gray-300' : 'border-red-500'} rounded-md px-4 py-2 text-sm`}
                />
                {!isFieldValid('whatsapp') && (
                  <p className="text-red-500 text-xs mt-1">Format: +923001234567</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  loading ? "bg-[#c79ba8]" : "bg-[#9D6D7A] hover:bg-[#854a5c]"
                } text-white py-3 rounded-md text-lg font-medium transition flex items-center justify-center gap-2`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </>
                ) : (
                  "Find My Match 💖"
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>We&apos;ll send matches directly to your WhatsApp</p>
              <p className="mt-1">No matches found? Try again later!</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FindRishtaForm;