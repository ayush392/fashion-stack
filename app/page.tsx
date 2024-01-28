"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullName: "",
    state: "",
    country: "",
    username: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const getCredentials = async () => {
    try {
      const res = await fetch("api/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorisation: "Bearer " + localStorage.getItem("token"),
        },
        credentials: "include",
      });
      const json = await res.json();
      if (json.status === 200) {
        setUser(json.user);
        // console.log(json.user);
      } else {
        window.location.href = "/login";
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getCredentials();
  }, []);

  return (
    <>
      {user.email === "" ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="container min-h-dvh flex justify-center items-center">
            <div className="max-w-md w-full p-6 text-center border shadow-lg rounded-lg">
              <h1 className=" text-3xl font-bold">{`Welcome ${user.fullName}!`}</h1>
              <h2 className="text-2xl text-gray-600 font-semibold">
                {`@${user.username}`}
              </h2>
              <div className="mt-5 text-lg">
                <p className="text-gray-600">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                {user?.state && (
                  <p className="text-gray-600">
                    <span className="font-semibold">State:</span> {user.state}
                  </p>
                )}
                <p className="text-gray-600">
                  <span className="font-semibold">Country:</span> {user.country}
                </p>
              </div>
            </div>
          </div>
          <button
            className=" absolute right-4 top-4 bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
