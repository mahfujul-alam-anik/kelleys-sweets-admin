"use client";

import axios from "axios";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import Input from "@/components/inputs/Input";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SubmitBtn from "@/components/buttons/SubmitBtn";
import DefaultLayout from "@/components/layouts/DefaultLayout";

const Page = ({ params }) => {
  const id = params.update;
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

  // fetch the form data
  useEffect(() => {
    axios
      .get(endpoint, { params: { id } })
      .then((res) => {
        setFormData(res?.data?.categories);
      })
      .catch((err) => {
        console.log("Error getting category for edit.", err);
        toast.error("Error getting category for edit.");
      });
  }, [endpoint, id]);

  // handle edit action
  const handleEdit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .put(endpoint, formData)
      .then((res) => {
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.log("error", err);
        toast.error("Error updating category, please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <DefaultLayout>
      <main>
        <Breadcrumb title={"Edit Category"} />
        <div className="mt-10">
          <form onSubmit={handleEdit}>
            <div className=" flex flex-col gap-5 w-6/12 m-auto">
              <Input
                id={"name"}
                type={`text`}
                value={formData.name}
                setValue={handleValueChange}
                label={"Category Name"}
                required={true}
              />
              <SubmitBtn name={"update"} loading={loading} />
            </div>
          </form>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default Page;
