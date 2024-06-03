import React from "react";

const Textarea = ({ id, value, setValue, required, label }) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-slate-800 text-sm font-medium capitalize cursor-pointer"
        htmlFor={label}
      >
        {label}
      </label>
      <textarea
        id={label}
        required={required && true}
        value={value}
        onChange={(e) => setValue(e.target.value, id)}
        className="px-4 py-3 border-2 border-slate-300 focus:border-blue-600 outline-none rounded-md text-slate-700"
      ></textarea>
    </div>
  );
};

export default Textarea;
