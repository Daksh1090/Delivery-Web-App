import React from "react";

function Input({ type, name, placeholder, value, onChange, maxLength }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange} // fixed typo
      maxLength={maxLength}
      required
      className="w-full p-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}

export default Input;