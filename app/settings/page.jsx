"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import Input from "@/components/inputs/Input";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SubmitBtn from "@/components/buttons/SubmitBtn";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Textarea from "@/components/inputs/Textarea";
import SelectCategory from "@/components/inputs/SelectCategory";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import Image from "next/image";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const endpoint = process.env.NEXT_PUBLIC_API_ROUTE + "settings";
  const [formData, setFormData] = useState({
    _id: "",
    about: "",
    emailAddress: "",
    phoneNumber: "",
    twitterLink: "",
    instagramLink: "",
    facebookLink: "",
    linkedinLink: "",
  });

  // fetch the data
  useEffect(() => {
    axios
      .get(endpoint)
      .then((res) => {
        setFormData(res?.data?.settings);
      })
      .catch((err) => {
        console.log("Error getting settings", err);
        toast.error(err?.response?.data.message);
      });
  }, []);

  // handling changing input values
  const handleValueChange = (value, inputName) => {
    setFormData((prev) => ({
      ...prev,
      [inputName]: value,
    }));
  };

  // handing file value
  const handleFileValue = (url) => {
    setFormData((prev) => ({
      ...prev,
      ["images"]: [...prev.images, url],
    }));
  };

  // submit the form, then set the form value empty
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // adding slug in formData
    const slug =
      formData.name.replaceAll(" ", "-") + new Date().getMilliseconds();
    formData.slug = slug;

    axios
      .post(endpoint, formData)
      .then((res) => {
        toast.success("Product added successfully.");
      })
      .catch((err) => {
        console.log("error", err);
        toast.error("Product not added, please try again.");
      })
      .finally(() => {
        setLoading(false);
        // reset the form data
        setFormData({
          about: "",
          emailAddress: "",
          phoneNumber: "",
          twitterLink: "",
          instagramLink: "",
          facebookLink: "",
          linkedinLink: "",
        });
      });
  };

  return (
    <DefaultLayout>
      <main>
        <Breadcrumb title={"Add New Category"} />
        <div className="mt-10 pb-20">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-20">
            <div>
              <Textarea
                id={"about"}
                value={formData.about}
                setValue={handleValueChange}
                label={"about"}
                required={true}
              />
            </div>
            <div className="flex gap-8">
              <div className="w-full">
                <Input
                  type={`text`}
                  id={"emailAddress"}
                  value={formData.emailAddress}
                  setValue={handleValueChange}
                  label={"email address"}
                  required={true}
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-full">
                <Input
                  type={`text`}
                  id={"phoneNumber"}
                  value={formData.phoneNumber}
                  setValue={handleValueChange}
                  label={"phone number"}
                  required={true}
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-full">
                <Input
                  type={`text`}
                  id={"twitterLink"}
                  value={formData.twitterLink}
                  setValue={handleValueChange}
                  label={"twitterLink"}
                  required={true}
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-full">
                <Input
                  type={`text`}
                  id={"instagramLink"}
                  value={formData.instagramLink}
                  setValue={handleValueChange}
                  label={"instagram Link"}
                  required={true}
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-full">
                <Input
                  type={`text`}
                  id={"facebookLink"}
                  value={formData.facebookLink}
                  setValue={handleValueChange}
                  label={"facebook Link"}
                  required={true}
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-full">
                <Input
                  type={`text`}
                  id={"linkedinLink"}
                  value={formData.linkedinLink}
                  setValue={handleValueChange}
                  label={"linkedin Link"}
                  required={true}
                />
              </div>
            </div>

            <div className="mt-4">
              <SubmitBtn name={"update details"} loading={loading} />
            </div>
          </form>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default Page;
