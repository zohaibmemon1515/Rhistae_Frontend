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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setSubmitted(false);

    const age = parseInt(form.age);
    if (isNaN(age) || age < 18 || age > 60) {
      setResult({message: "Age must be between 18-60", success: false});
      setLoading(false);
      return;
    }

    const whatsappRegex = /^\+[1-9]\d{10,14}$/;
    if (!whatsappRegex.test(form.whatsapp)) {
      setResult({message: "Invalid WhatsApp number format (e.g. +923001234567)", success: false});
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://rhistae-agent.onrender.com/api/find-match/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: form.age,
          gender: form.gender,
          number: form.whatsapp,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult({message: data.message, success: data.success});
        if (data.success) {
          setForm({
            name: "",
            age: "",
            gender: "",
            whatsapp: "",
          });
          setSubmitted(true);
        }
      } else {
        setResult({message: data.detail || "Failed to find matches", success: false});
      }
    } catch {
      setResult({message: "Network error. Please try again.", success: false});
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#FFF5F8] py-16 px-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
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
              onClick={() => setSubmitted(false)}
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
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                />
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
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
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
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  loading ? "bg-[#c79ba8]" : "bg-[#9D6D7A] hover:bg-[#854a5c]"
                } text-white py-3 rounded-md text-lg font-medium transition`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </span>
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