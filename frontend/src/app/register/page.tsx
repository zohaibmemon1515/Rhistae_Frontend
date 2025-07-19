"use client";
import { useState } from "react";

interface FormData {
  name: string;
  age: string;
  gender: string;
  city: string;
  profession: string;
  education: string;
}

const RegisterForm = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    age: "",
    gender: "",
    city: "",
    profession: "",
    education: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (result.success) {
        alert("✅ Profile registered successfully!");
        setForm({
          name: "",
          age: "",
          gender: "",
          city: "",
          profession: "",
          education: "",
        });
      } else {
        alert("❌ Failed to register");
      }
    } catch (err) {
      alert("❌ Something went wrong");
      console.error(err);
    }
  };

  return (
    <section className="bg-[#FDF8F3] py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-[#9D6D7A] text-center mb-8">
          💌 Register Your Profile
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Age"
            name="age"
            type="number"
            value={form.age}
            onChange={handleInputChange}
            required
            min={18}
            max={60}
          />
          <Input
            label="City"
            name="city"
            value={form.city}
            onChange={handleInputChange}
            required
          />

          <div className="flex flex-col gap-1">
            <label
              htmlFor="gender"
              className="text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleSelectChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:border-[#9D6D7A] focus:ring-1 focus:ring-[#9D6D7A]"
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>

          <Input
            label="Profession"
            name="profession"
            value={form.profession}
            onChange={handleInputChange}
          />
          <Input
            label="Education"
            name="education"
            value={form.education}
            onChange={handleInputChange}
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#9D6D7A] text-white py-3 rounded-md text-lg font-medium hover:bg-[#854a5c] transition"
            >
              Submit Profile
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: number;
  max?: number;
}

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  min,
  max,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        max={max}
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#9D6D7A] focus:ring-1 focus:ring-[#9D6D7A]"
      />
    </div>
  );
}

export default RegisterForm;