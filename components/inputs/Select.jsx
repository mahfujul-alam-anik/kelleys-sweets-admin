import React from "react";

const Select = ({ options, setValue, required, label, id }) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-slate-800 text-sm font-medium capitalize cursor-pointer"
        htmlFor={label}
      >
        {label}
      </label>
      <select
        id={label}
        value={value}
        required={required && true}
        onChange={(e) => setValue(e.target.value, id)}
        className="px-4 py-3 border-2 border-slate-300 focus:border-blue-600 outline-none rounded-md text-slate-700"
      >
        <option value="" className="capitalize">
          {label}
        </option>
        {options.map((opt, i) => (
          <option
            key={i}
            value={opt}
            className="capitalize"
            selected={value === opt}
          >
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
