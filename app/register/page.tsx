"use client";
import { useState } from "react";
import Link from "next/link";

function Register() {
  const [data, setData] = useState({
    email: "",
    password: "",
    fullName: "",
    username: "",
    otp: null,
  });

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      const isValid = await verifyOTP(e);
      if (!isValid) {
        return alert("Invalid OTP");
      }
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (json.status === 201) {
        localStorage.setItem(
          "token",
          JSON.stringify({ _id: json.id, email: json.email })
        );
        alert(json.message);
        window.location.href = "/dashboard";
      }
      alert(json.message);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const generateOTP = async (e: any) => {
    e.preventDefault();
    // console.log(data);
    if (!data.email) return alert("Please enter email");
    try {
      const res = await fetch(
        "https://otp-service-beta.vercel.app/api/otp/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            type: "numeric",
            organization: "nextJsAuth",
            subject: "OTP Verification",
          }),
        }
      );
      const json = await res.json();
      if (res.status === 200) return alert("OTP sent to your email");
      alert(json.error);
    } catch (error: any) {
      // alert(error.message);
      console.error(error.message);
    }
  };

  const verifyOTP = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://otp-service-beta.vercel.app/api/otp/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            otp: data.otp,
          }),
        }
      );
      const json = await res.json();
      // console.log(json);
      if (json.error) return false;
      return true;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container min-h-dvh flex justify-center items-center">
        <div className=" border max-w-md w-full rounded-md p-6">
          <h1 className="text-3xl font-bold mb-5 text-center">Register</h1>
          <form className=" flex flex-col justify-center w-[94%] mx-auto">
            <div className=" mb-3">
              <label htmlFor="" className=" block">
                Email{" "}
              </label>
              <input
                className=" border p-1 block rounded w-[100%]"
                onChange={handleChange}
                type="email"
                placeholder="test@gmail.com"
                name="email"
              />
            </div>
            <div className=" mb-3">
              <label htmlFor="" className=" block">
                Password{" "}
              </label>
              <input
                className=" border p-1 block rounded w-[100%]"
                onChange={handleChange}
                type="password"
                placeholder="Enter password"
                name="password"
              />
            </div>
            <div className=" mb-3">
              <label htmlFor="" className=" block">
                Full Name
              </label>
              <input
                className=" border p-1 block rounded w-[100%]"
                onChange={handleChange}
                type="text"
                name="fullName"
              />
            </div>
            <div className=" mb-3">
              <label htmlFor="" className=" block">
                Username
              </label>
              <input
                className=" border p-1 block rounded w-[100%]"
                onChange={handleChange}
                type="text"
                placeholder="username"
                name="username"
              />
            </div>

            <div className=" mb-3">
              <label htmlFor="otp" className=" block">
                OTP
              </label>
              <div className="flex">
                <input
                  className=" border p-1 block rounded w-[100%] me-3"
                  onChange={handleChange}
                  name="otp"
                  type="text"
                />
                <button
                  onClick={generateOTP}
                  className=" text-white bg-blue-500 px-2 rounded min-w-fit"
                >
                  Get OTP
                </button>
              </div>
            </div>

            <button
              className=" text-white bg-blue-500 py-2 my-2 rounded"
              onClick={handleRegister}
            >
              Register
            </button>
          </form>
          <p className=" text-center mt-3 text-slate-700">
            Already have an account?{" "}
            <Link href={"/login"} className=" text-blue-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
