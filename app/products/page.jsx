"use client";

import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import Table from "@/components/layouts/Table";
import Breadcrumb from "@/components/ui/Breadcrumb";
import React, { useEffect, useMemo, useState } from "react";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Image from "next/image";

const Page = () => {
  const endpoint = process.env.NEXT_PUBLIC_API_ROUTE + "product/all";
  const [rows, setRows] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: "No.",
        accessor: "no",
        Cell: ({ row }) => <span>{row.index + 1}</span>,
      },
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ row }) => (
          <div>
            <Image
              src={row.original.images[0]}
              alt="image"
              width={80}
              height={50}
            />
          </div>
        ),
      },
      {
        Header: "Product Name",
        accessor: "name",
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: ({ row }) => <span>{row.original.category?.name}</span>,
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Discount %",
        accessor: "discountPercentage",
      },
      {
        Header: "Stock",
        accessor: "stock",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex-center gap-1">
            <Link href={`/products/${row.original._id}`} className="edit-btn">
              Edit
            </Link>
            <button
              onClick={() => handleDelete(row.original._id)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // fetch the table data
  useEffect(() => {
    axios
      .get(endpoint)
      .then((res) => {
        setRows(res?.data?.products.reverse());
      })
      .catch((err) => {
        console.log("Error getting products: ", err);
        toast.error("Error getting products.");
      });
  }, []);

  // Handle delete action
  const handleDelete = (id) => {
    const confirmed = confirm("Are you sure you want to delete this product?");

    if (confirmed) {
      axios
        .delete(endpoint, { params: { id } })
        .then((res) => {
          setRows(res?.data?.products.reverse());
          toast.success(res?.data?.message);
        })
        .catch((err) => {
          console.log("Error deleting products: ", err);
          toast.error("Not deleted, something went wrong.");
        });
    }
  };

  return (
    <DefaultLayout>
      <main>
        <Breadcrumb title={"all products"} btnLink={"/products/new"} />
        <div>
          <Table columns={columns} data={rows} />
        </div>
      </main>
    </DefaultLayout>
  );
};

export default Page;
