"use client";

import axios from "axios";
import toast from "react-hot-toast";
import React, { useState } from "react";
import Input from "@/components/inputs/Input";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SubmitBtn from "@/components/buttons/SubmitBtn";
import DefaultLayout from "@/components/layouts/DefaultLayout";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const endpoint = process.env.NEXT_PUBLIC_API_ROUTE + "category";
  const [formData, setFormData] = useState({
    name: "",
  });

  // handling changing input values
  const handleValueChange = (value, inputName) => {
    setFormData((prev) => ({
      ...prev,
      [inputName]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(endpoint, formData)
      .then((res) => {
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.log("Error adding category", err);
        toast.error("Category not added, please try again");
      })
      .finally(() => {
        setLoading(false);
        setFormData({
          name: "",
        });
      });
  };

  return (
    <DefaultLayout>
      <main>
        <Breadcrumb title={"Add New Category"} />
        <div className="mt-10">
          <form onSubmit={handleSubmit}>
            <div className=" flex flex-col gap-5 w-6/12 m-auto">
              <Input
                id={"name"}
                type={`text`}
                value={formData.name}
                setValue={handleValueChange}
                label={"Category Name"}
                required={true}
              />
              <SubmitBtn name={"add new"} loading={loading} />
            </div>
          </form>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default Page;
