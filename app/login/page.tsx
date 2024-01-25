"use client";
import Link from "next/link";
import { useState } from "react";
// import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    console.log(email, password)
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();
      // if (!res.ok) throw Error(json.message);
      if (json.status === 200) {
        localStorage.setItem(
          "token",
          JSON.stringify({ _id: json.id, email: json.email })
        );
        alert(json.message);
        window.location.href = "/dashboard";
        // router.push("/dashboard");
      }
      alert(json.message);
      // console.log(json);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="container min-h-dvh flex justify-center items-center">
        <div className=" border max-w-md w-full rounded-md p-6">
          <h1 className="text-3xl font-bold mb-5 text-center">Login</h1>
          <form className=" flex flex-col justify-center w-[94%] mx-auto">
            <div className=" mb-3">
              <label htmlFor="" className=" block">
                Email{" "}
              </label>
              <input
                className=" border p-1 block rounded w-[100%]"
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter password"
                name="password"
              />
            </div>
            <button
              className=" text-white bg-blue-500 py-2 my-2 rounded"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
          <p className=" text-center mt-3 text-gray-700">
            Do not have an account?{" "}
            <Link href={"/register"} className=" text-blue-700">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

// export default Login;
