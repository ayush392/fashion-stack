"use client";
import { useState, Suspense } from "react";
import { addAddress } from "@/utils/controller/accountController";

function AddressComp() {
  const [data, setData] = useState({
    house: "",
    street: "",
    city: "",
    state: "",
    country: "India",
    pincode: null,
  });

  const handleAdd = async (e: any) => {
    e.preventDefault();
    try {
      const res = await addAddress(data);
      alert(res);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container min-h-dvh flex justify-center items-center">
        <div className=" border max-w-md w-full rounded-md p-6">
          <h1 className="text-3xl font-bold mb-5 text-center">
            Add new address
          </h1>
          <form className=" flex flex-col justify-center w-[94%] mx-auto">
            <div className=" mb-3">
              <label htmlFor="" className=" block">
                House{" "}
              </label>
              <input
                className=" border p-1 block rounded w-[100%]"
                onChange={handleChange}
                type="text"
                name="house"
              />
            </div>
            <div className=" mb-3">
              <label htmlFor="" className=" block">
                Street{" "}
              </label>
              <input
                className=" border p-1 block rounded w-[100%]"
                onChange={handleChange}
                type="text"
                name="street"
              />
            </div>
            <div className=" mb-3">
              <label htmlFor="" className=" block">
                City
              </label>
              <input
                className=" border p-1 block rounded w-[100%]"
                onChange={handleChange}
                type="text"
                name="city"
              />
            </div>
            <div className=" mb-3">
              <label htmlFor="" className=" block">
                State
              </label>
              <input
                className=" border p-1 block rounded w-[100%]"
                onChange={handleChange}
                type="text"
                name="state"
              />
            </div>

            <label htmlFor="otp" className=" block">
              Pincode
            </label>
            <input
              className=" border p-1 block rounded w-[100%] me-3"
              onChange={handleChange}
              name="pincode"
              type="number"
            />

            <button
              className=" text-white bg-blue-500 py-2 my-2 rounded"
              onClick={handleAdd}
            >
              Add Address
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default function Address() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <AddressComp />
    </Suspense>
  );
}
