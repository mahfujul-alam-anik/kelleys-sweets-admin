"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Input from "@/components/inputs/Input";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SubmitBtn from "@/components/buttons/SubmitBtn";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Textarea from "@/components/inputs/Textarea";
import SelectCategory from "@/components/inputs/SelectCategory";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import Image from "next/image";

const Page = ({ params }) => {
  const id = params.update;
  const [loading, setLoading] = useState(false);
  const endpoint = process.env.NEXT_PUBLIC_API_ROUTE + "product/all";
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    category: "",
    price: "",
    discountPercentage: "",
    images: [],
    rating: "",
    stock: "",
    measurements: "",
    estimatedDeliveryDays: "",
  });

  // fetch the data
  useEffect(() => {
    axios
      .get(endpoint, { params: { id } })
      .then((res) => {
        setFormData(res?.data?.products);
      })
      .catch((err) => {
        console.log("Error getting product by id", err);
        toast.error(err?.response?.data.message);
      });
  }, [id]);

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

  // remove image from images in from data
  const removeImage = (img) => {
    const newImages = formData.images.filter((image) => image !== img);
    return setFormData((prev) => ({
      ...prev,
      ["images"]: newImages,
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
      .put(endpoint, formData)
      .then((res) => {
        toast.success("Product updated successfully.");
      })
      .catch((err) => {
        console.log("error", err);
        toast.error("Product not updated, please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <DefaultLayout>
      <main>
        <Breadcrumb title={"Update Product"} />
        <div className="mt-10 pb-20">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-20">
            <div className="flex gap-8">
              <div className="w-full">
                <Input
                  type={`text`}
                  id={"name"}
                  value={formData?.name}
                  setValue={handleValueChange}
                  label={"product name"}
                  required={true}
                />
              </div>
            </div>
            <div className="flex gap-5">
              {formData?.images.map((img, i) => (
                <div className="relative" key={i}>
                  <span
                    className="absolute right-0 top-0 w-5 h-5 rounded-full bg-orange-600 text-lg text-white flex-center cursor-pointer"
                    onClick={() => removeImage(img)}
                  >
                    &times;
                  </span>
                  <Image
                    src={img}
                    width={100}
                    height={100}
                    alt="product image"
                  />
                </div>
              ))}
              <div className="w-full pl-6">
                <CldUploadWidget
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
                  onSuccess={(results) => {
                    handleFileValue(results.info.url);
                  }}
                >
                  {({ open }) => {
                    return (
                      <div className="w-full">
                        <label className="text-slate-800 text-sm font-medium capitalize cursor-pointer">
                          Product Image
                        </label>
                        <div
                          onClick={() => open()}
                          className="mt-[5px] px-4 py-3 border-2 border-slate-300 focus:border-blue-600 outline-none rounded-md text-slate-700 text-center cursor-pointer hover:bg-slate-100"
                        >
                          {formData?.images.length !== 0
                            ? `Change Image`
                            : `Select Image`}
                        </div>
                      </div>
                    );
                  }}
                </CldUploadWidget>
              </div>
            </div>
            <div>
              <Textarea
                id={"description"}
                value={formData?.description}
                setValue={handleValueChange}
                label={"product description"}
                required={true}
              />
            </div>
            <div className="flex gap-8">
              <div className="w-6/12">
                <SelectCategory
                  id="category"
                  value={formData?.category}
                  setValue={handleValueChange}
                  label={"select category"}
                  required={true}
                />
              </div>
              <div className="w-6/12">
                <Input
                  type={`number`}
                  id={"price"}
                  value={formData?.price}
                  setValue={handleValueChange}
                  label={"product price"}
                  required={true}
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-6/12">
                <Input
                  type={`number`}
                  id={"stock"}
                  value={formData?.stock}
                  setValue={handleValueChange}
                  label={"product stock"}
                  required={true}
                />
              </div>
              <div className="w-6/12">
                <Input
                  type={`number`}
                  id={"discountPercentage"}
                  value={formData?.discountPercentage}
                  setValue={handleValueChange}
                  label={"discount percentage"}
                  required={false}
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-full">
                <Input
                  type={`text`}
                  id={"measurements"}
                  value={formData?.measurements}
                  setValue={handleValueChange}
                  label={"measurements type"}
                  required={true}
                />
              </div>
              <div className="w-full">
                <Input
                  type={`number`}
                  id={"rating"}
                  value={formData?.rating}
                  setValue={handleValueChange}
                  label={"default rating (1 to 5)"}
                  required={true}
                />
              </div>
              <div className="w-full">
                <Input
                  type={`number`}
                  id={"estimatedDeliveryDays"}
                  value={formData?.estimatedDeliveryDays}
                  setValue={handleValueChange}
                  label={"estimated Delivery Days"}
                  required={true}
                />
              </div>
            </div>

            <div className="mt-4">
              <SubmitBtn name={"add product"} loading={loading} />
            </div>
          </form>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default Page;
