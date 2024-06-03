"use client";

import React from "react";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import DashboardBoxItem from "@/components/ui/DashboardBoxItem";

const Page = () => {
  return (
    <DefaultLayout>
      <main>
        <section className="flex gap-7 justify-center items-center flex-wrap ">
          <DashboardBoxItem title={`sold ($)`} sum={20} />
          <DashboardBoxItem title={`total product`} sum={20} />
          <DashboardBoxItem title={`total category`} sum={5} />
          <DashboardBoxItem title={`total order`} sum={30} />
          <DashboardBoxItem title={`total sell`} sum={50} />
          <DashboardBoxItem title={`product canceled`} sum={5} />
          <DashboardBoxItem title={`in process`} sum={30} />
          <DashboardBoxItem title={`product shipped`} sum={50} />
        </section>
      </main>
    </DefaultLayout>
  );
};

export default Page;
