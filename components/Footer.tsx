"use client";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();

  //   if (pathname === "/login" || pathname === "/register") {
  //     return <></>;
  //   }
  return pathname === "/login" || pathname === "/register" ? (
    <></>
  ) : (
    <div className="mt-3 text-center text-gray-500 bg-gray-50 p-5 font-medium">
      <p>© 2024 www.myecommerceapp.com. All rights reserved.</p>
    </div>
  );
}

export default Footer;
