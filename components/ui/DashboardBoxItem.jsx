import React from "react";

const DashboardBoxItem = ({ title, sum }) => {
  return (
    <div className=" w-[200px] bg-slate-50 px-4 py-5 rounded-md flex flex-col gap-3 justify-center items-center shadow-lg shadow-slate-200">
      <h3 className="text-slate-700 font-semibold text-lg capitalize">
        {title}
      </h3>
      <h1 className="font-bold text-4xl text-orange-400">{sum}</h1>
    </div>
  );
};

export default DashboardBoxItem;
