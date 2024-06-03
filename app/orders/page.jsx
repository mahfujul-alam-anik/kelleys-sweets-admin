"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import Table from "@/components/layouts/Table";
import Breadcrumb from "@/components/ui/Breadcrumb";
import React, { useEffect, useMemo, useState } from "react";
import DefaultLayout from "@/components/layouts/DefaultLayout";

const Page = () => {
  const endpoint = process.env.NEXT_PUBLIC_API_ROUTE + "orders/all";
  const [rows, setRows] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: "No.",
        accessor: "no",
        Cell: ({ row }) => <span>{row.index + 1}</span>,
      },
      {
        Header: "Order ID",
        accessor: "orderId",
      },
      {
        Header: "Customer Name",
        accessor: "customer",
        Cell: ({ row }) => <span>{row?.original?.customer?.fullName}</span>,
      },
      {
        Header: "Items",
        accessor: "items",
        Cell: ({ row }) => <span>{row?.original?.items?.length}</span>,
      },
      {
        Header: "Total Price",
        accessor: "totalPrice",
      },
      {
        Header: "Shipping Address",
        accessor: "shippingAddress",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => {
          const { status } = row?.original;
          let color = "";

          if (status === "shipped") {
            color = "text-blue-600";
          } else if (status === "delivered") {
            color = "text-green-600";
          } else if (status === "canceled") {
            color = "text-red-600";
          } else {
            color = "text-yellow-500";
          }

          return (
            <span className={`text-sm capitalize ${color}`}>{status}</span>
          );
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex-center gap-1">
            <Link href={`/orders/${row.original._id}`} className="view-btn">
              View
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
        setRows(res?.data?.orders.reverse());
      })
      .catch((err) => {
        console.log("Error getting orders: ", err);
        toast.error("Error getting orders.");
      });
  }, []);

  // Handle delete action
  const handleDelete = (id) => {
    const confirmed = confirm("Are you sure? you want to delete this order?");

    if (confirmed) {
      axios
        .delete(endpoint, { params: { id } })
        .then((res) => {
          setRows(res?.data?.orders.reverse());
          toast.success(res?.data?.message);
        })
        .catch((err) => {
          console.log("Error deleting order: ", err);
          toast.error("Not deleted, something went wrong.");
        });
    }
  };

  return (
    <DefaultLayout>
      <main>
        <Breadcrumb title={"all orders"} />
        <div>
          <Table columns={columns} data={rows} />
        </div>
      </main>
    </DefaultLayout>
  );
};

export default Page;
