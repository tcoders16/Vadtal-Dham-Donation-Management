import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}: InputFieldProps) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-500"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}