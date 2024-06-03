"use client";

import React from "react";
import Link from "next/link";
import { sidebar } from "@/utils/sidebar";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-2 w-full h-full bg-slate-100 text-base capitalize px-5">
      <div className="font-bold text-lg text-center pt-8 pb-6 text-orange-600">
        <Link href={"/"}>{`kelley's sweets 💋`}</Link>
      </div>
      {sidebar.map((item, index) => {
        const isActive =
          (pathname.includes(item.link) && item.link.length > 1) ||
          pathname === item.link;
        return (
          <div
            key={index}
            className={`hover:bg-slate-200  rounded-md cursor-pointer ${
              isActive && `bg-slate-200`
            }`}
          >
            <Link href={item.link} className="w-full block px-4 py-3">
              {item.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
