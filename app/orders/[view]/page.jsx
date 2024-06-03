"use client";

import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { formateDateTime } from "@/utils/formates";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import DefaultLayout from "@/components/layouts/DefaultLayout";

const Page = ({ params }) => {
  const id = params.view;
  const endpoint = process.env.NEXT_PUBLIC_API_ROUTE + "orders/all";
  const putEndpoint = process.env.NEXT_PUBLIC_API_ROUTE + "orders";
  const [orderDetails, setOrderDetails] = useState({});
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const allStatus = ["processing", "shipped", "delivered", "canceled"];

  // fetch the data
  useEffect(() => {
    axios
      .get(endpoint, { params: { id } })
      .then((res) => {
        setOrderDetails(res?.data?.orders);
        setOrderStatus(res?.data?.orders.status);
        setEstimatedDeliveryTime(res?.data?.orders?.estimatedDeliveryTime);
      })
      .catch((err) => {
        console.log("Error getting order by id", err);
        toast.error("Error getting order by id.");
      });
  }, [id]);

  // update the order
  const handleSubmit = () => {
    axios
      .put(putEndpoint, { id, estimatedDeliveryTime, status: orderStatus })
      .then((res) => {
        toast.success("Order updated successfully.");
        setOrderDetails(res?.data?.order);
      })
      .catch((err) => {
        console.log("Order updating error", err);
        toast.error("Order not updated, please try again.");
      });
  };

  return (
    <DefaultLayout>
      <main>
        <Breadcrumb title={"Order Details"} />
        <div className="mt-10 pb-20">
          <div className="flex flex-col gap-3 px-3">
            <h1 className="text-slate-700 bg-slate-100 pl-4 p-2 rounded-sm text-start mb-4">
              Customer Details
            </h1>
            <div className="od-row flex gap-3 justify-between px-4">
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold text-slate-700 capitalize">
                  full name:
                </h4>
                <p>{orderDetails?.customer?.fullName}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold text-slate-700 capitalize">
                  email address:
                </h4>
                <p>{orderDetails?.customer?.email}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold text-slate-700 capitalize">
                  phone number:
                </h4>
                <p>{orderDetails?.customer?.phone}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold text-slate-700 capitalize">
                  address:
                </h4>
                <p>{orderDetails?.customer?.address}</p>
              </div>
            </div>
            <h1 className="text-slate-700 bg-slate-100 pl-4 p-2 rounded-sm text-start mb-4 mt-8">
              Order Details
            </h1>
            <div className="od-row flex gap-3 justify-between px-4">
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold text-slate-700 capitalize">
                  order ID:
                </h4>
                <p>{orderDetails?.orderId}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold text-slate-700 capitalize">
                  order date:
                </h4>
                <p>{formateDateTime(orderDetails?.createdAt)}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold text-slate-700 capitalize">
                  shipping address:
                </h4>
                <p>{orderDetails?.shippingAddress}</p>
              </div>
            </div>
            <div className="od-row flex gap-3 justify-between mt-3 px-4 items-end">
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold text-slate-700 capitalize">
                  estimated Delivery Time:
                </h4>
                <input
                  type="text"
                  className="px-3 py-2 rounded-md border-2 border-slate-400"
                  value={estimatedDeliveryTime}
                  onChange={(e) => setEstimatedDeliveryTime(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold text-slate-700 capitalize">
                  order status
                </h4>
                <select
                  className="px-3 py-2 rounded-md border-2 border-slate-400"
                  onChange={(e) => setOrderStatus(e.target.value)}
                >
                  {allStatus.map((s, i) => (
                    <option value={s} key={i} selected={s === orderStatus}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2 ">
                <button
                  className="px-7 py-3 bg-blue-600 rounded-md text-slate-100"
                  onClick={() => handleSubmit()}
                >
                  Update Order
                </button>
              </div>
            </div>
            <h1 className="text-slate-700 bg-slate-100 pl-4 p-2 rounded-sm text-start mb-4 mt-8">
              Payment Details
            </h1>
            <div className="od-row flex gap-3 justify-between px-4 mt-3">
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold text-slate-700 capitalize">
                  payment ID:
                </h4>
                <p>{orderDetails?.paymentDetails?.paymentId}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold text-slate-700 capitalize">
                  total price:
                </h4>
                <p>${orderDetails?.totalPrice} USD</p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold text-slate-700 capitalize">
                  shipping fee:
                </h4>
                <p>${orderDetails?.shippingFee} USD</p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold text-slate-700 capitalize">
                  paypal fee:
                </h4>
                <p>${orderDetails?.paymentDetails?.paypal_fee} USD</p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold text-slate-700 capitalize">
                  net amount:
                </h4>
                <p>${orderDetails?.paymentDetails?.net_amount} USD</p>
              </div>
            </div>
            <h1 className="text-slate-700 bg-slate-100 pl-4 p-2 rounded-sm text-start mb-4 mt-8">
              Item Details
            </h1>
            <div className="od-row flex flex-col gap-3 justify-between px-4 mt-3">
              {orderDetails?.items?.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 flex gap-3 justify-between"
                >
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold text-slate-700 capitalize">
                      Image:
                    </h4>
                    <Image
                      src={item?.image}
                      alt={item.name}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold text-slate-700 capitalize">
                      Product Name:
                    </h4>
                    <p>{item.name}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold text-slate-700 capitalize">
                      Category Name:
                    </h4>
                    <p>{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default Page;
