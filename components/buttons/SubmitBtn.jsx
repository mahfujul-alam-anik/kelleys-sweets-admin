import React from "react";

const SubmitBtn = ({ name, loading }) => {
  return (
    <div className="w-full">
      <input
        type="submit"
        className="text-slate-50 hover:text-slate-200 bg-blue-600 hover:bg-blue-700 p-3 rounded-md w-full cursor-pointer text-base font-medium capitalize"
        value={loading ? "loading..." : name}
      />
    </div>
  );
};

export default SubmitBtn;
