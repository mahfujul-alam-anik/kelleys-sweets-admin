import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DefaultLayout = ({ children }) => {
  return (
    <main className="flex min-h-[100vh]">
      <section className="w-[20%]">
        <Sidebar />
      </section>
      <section className="w-[80%]">
        <Header />
        <div className=" overflow-x-hidden overflow-y-auto w-full p-7">
          {children}
        </div>
      </section>
    </main>
  );
};

export default DefaultLayout;
