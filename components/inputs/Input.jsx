import React from "react";

const Input = ({ type, value, setValue, required, label, id }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        className="text-slate-800 text-sm font-medium capitalize cursor-pointer"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required && true}
        onChange={(e) => setValue(e.target.value, id)}
        className="px-4 py-3 border-2 border-slate-300 focus:border-blue-600 outline-none rounded-md text-slate-700"
      />
    </div>
  );
};

export default Input;
