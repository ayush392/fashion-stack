"use client";
import { useEffect, useState } from "react";
import {
  getAllOrders,
  updateOrderStatus,
} from "@/utils/controller/dashboardController";

function Dashboard() {
  const [data, setData] = useState([] as any);
  const [isUpadted, setIsUpdated] = useState(false);
  async function handleUpdate(orderId: any, productId: any, status: string) {
    await updateOrderStatus(orderId, productId, status);
    alert("Order Status updated");
    setIsUpdated((prev: boolean) => !prev);
  }

  const getDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  async function fetchData() {
    const res = await getAllOrders();
    setData(res);
    // console.log(res, "All orders");
  }

  useEffect(() => {
    fetchData();
  }, [isUpadted]);

  return (
    <div className=" max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <br />
      <table className="text-xs md:text-base table-fixed w-full max-w-full text-center border">
        <thead>
          <tr className=" border-b bg-gray-50">
            <th className=" border-r p-2">productId</th>
            <th className=" border-r p-2">Title</th>
            <th className=" border-r p-2">Order Date</th>
            <th className=" border-r p-2">Quantity</th>
            <th className=" border-r p-2">Size</th>
            <th className=" border-r p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((item: any, i: number) => {
              return item?.products.map((pro: any, i: number) => {
                return (
                  <tr key={i} className="border-b">
                    <td className=" border-r p-2 w-[20%] truncate">
                      {pro.product._id}
                    </td>
                    <td className=" border-r p-2 w-[20%] truncate">
                      {pro.product.title}
                    </td>
                    <td className=" border-r p-2">{getDate(item.orderDate)}</td>
                    <td className=" border-r p-2">{pro.quantity}</td>
                    <td className=" border-r p-2">{pro.size}</td>
                    <td className=" border-r p-2">
                      <select
                        name="orderStatus"
                        id="orderStatus"
                        defaultValue={pro.orderStatus}
                        onChange={(e) =>
                          handleUpdate(
                            item._id,
                            pro.product._id,
                            e.target.value
                          )
                        }
                      >
                        {[
                          "Processing",
                          "Shipped",
                          "Delivered",
                          "Cancelled",
                          "Refunded",
                        ].map((str: string, i: number) => {
                          return (
                            <option key={i} value={str}>
                              {str}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                  </tr>
                );
              });
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
