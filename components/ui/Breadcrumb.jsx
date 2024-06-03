import Link from "next/link";
import React from "react";

const Breadcrumb = ({ title, btnLink }) => {
  return (
    <div className="bg-slate-200 flex-between px-8 py-5 rounded-md">
      <h1 className="text-slate-600 uppercase font-semibold ">{title}</h1>
      {btnLink && (
        <Link
          href={btnLink}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New
        </Link>
      )}
    </div>
  );
};

export default Breadcrumb;
