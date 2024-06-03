"use client";

import axios from "axios";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";

const SelectCategory = ({ value, setValue, required, label, id }) => {
  const endpoint = process.env.NEXT_PUBLIC_API_ROUTE + "category";
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(endpoint)
      .then((res) => {
        setCategories(res?.data?.categories.reverse());
      })
      .catch((err) => {
        console.log("Error getting categories: ", err);
        toast.error("Error getting categories.");
      });
  }, []);

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
        className="px-4 py-3 border-2 capitalize border-slate-300 focus:border-blue-600 outline-none rounded-md text-slate-700"
      >
        <option value="" className="capitalize" disabled>
          {label}
        </option>
        {categories.map((opt, i) => (
          <option
            key={i}
            value={opt._id}
            className="capitalize"
            selected={value === opt._id}
          >
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCategory;
