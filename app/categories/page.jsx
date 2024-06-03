"use client";

import axios from "axios";
import toast from "react-hot-toast";
import Table from "@/components/layouts/Table";
import Breadcrumb from "@/components/ui/Breadcrumb";
import React, { useEffect, useMemo, useState } from "react";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Link from "next/link";

const Page = () => {
  const endpoint = process.env.NEXT_PUBLIC_API_ROUTE + "category";
  const [rows, setRows] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex-center gap-1">
            <Link href={`/categories/${row.original._id}`} className="edit-btn">
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

  useEffect(() => {
    axios
      .get(endpoint)
      .then((res) => {
        setRows(res?.data?.categories.reverse());
      })
      .catch((err) => {
        console.log("Error getting categories: ", err);
        toast.error("Error getting categories.");
      });
  }, []);

  // Handle delete action
  const handleDelete = (id) => {
    const confirmed = confirm(
      "Are you sure? All product will be deleted under this category."
    );

    if (confirmed) {
      axios
        .delete(endpoint, { params: { id } })
        .then((res) => {
          setRows(res?.data?.categories.reverse());
          toast.success(res?.data?.message);
        })
        .catch((err) => {
          console.log("Error deleting categories: ", err);
          toast.error("Not deleted, something went wrong.");
        });
    }
  };

  return (
    <DefaultLayout>
      <main>
        <Breadcrumb title={"all categories"} btnLink={"/categories/new"} />
        <div>
          <Table columns={columns} data={rows} />
        </div>
      </main>
    </DefaultLayout>
  );
};

export default Page;
