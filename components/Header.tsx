"use client";
import { getUserId, logout } from "@/utils/helper";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { getSize } from "@/utils/helper";
//logo
// Home
// Men
// Women
// wishlist, cart, logout || login, register

function Header() {
  const [isUser, setIsUser] = useState(false);
  const [sizes, setSizes] = useState({ cartSize: 0, wishlistSize: 0 });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // console.log(useUserContext());

  // const x = [1, 2, 3];

  function isActive(path: string, name: string, value: string) {
    if (name === "" && value === "") {
      return path === pathname
        ? "underline underline-offset-8 text-gray-900"
        : "";
    }
    return path === pathname && searchParams.get(name) === value
      ? "underline underline-offset-8 text-gray-900"
      : "";
  }

  const handleLogout = () => {
    logout();
    setIsUser(false);
  };

  const check = async () => {
    const res = await getUserId();
    if (res) {
      const s = await getSize(res);
      setSizes(s);
    }

    setIsUser(!!!(res === ""));
  };
  useEffect(() => {
    check();
  }, []);

  return pathname === "/login" || pathname === "/register" ? (
    <></>
  ) : (
    <div className=" sticky top-0 text-gray-700 shadow mb-3 md:mb-4 bg-white">
      <div className="flex w-full border py-3 lg:py-4 font-semibold justify-around items-center">
        <h1
          className="text-lg md:text-xl cursor-pointer"
          onClick={() => router.push("/")}
        >
          eCommerce
        </h1>
        <div className="hidden md:flex md:gap-6 lg:gap-8">
          <h2
            className={`${isActive("/", "", "")} cursor-pointer `}
            onClick={() => router.push("/")}
          >
            Home
          </h2>
          <h2
            className={`${isActive(
              "/products",
              "gender",
              "Men"
            )} cursor-pointer`}
            onClick={() => router.push("/products?gender=Men")}
          >
            Men
          </h2>
          <h2
            className={`${isActive(
              "/products",
              "gender",
              "Women"
            )} cursor-pointer`}
            onClick={() => router.push("/products?gender=Women")}
          >
            Women
          </h2>
        </div>

        {isUser ? (
          <div className="flex md:gap-6 lg:gap-8">
            <button
              className={`${isActive("/wishlist", "", "")}`}
              onClick={() => router.push("/wishlist")}
            >
              {`Wishlist (${sizes.wishlistSize})`}
            </button>
            <button
              className={`${isActive("/cart", "", "")}`}
              onClick={() => router.push("/cart")}
            >{`Cart (${sizes.cartSize})`}</button>
            <button
              className="rounded px-2 py-1 bg-red-600 text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="rounded px-3 py-1  bg-green-600 text-white"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
