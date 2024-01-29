"use client";
import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Pagination({ size }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      let page = parseInt(params.get(name) || "0");

      if (value === "+1") page += 1;
      else page = Math.max(page - 1, 0);

      params.set(name, page.toString());

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <div className="flex justify-between m-4">
        <button
          disabled={parseInt(searchParams.get("page") || "0") === 0}
          className="text-blue-600 "
          onClick={() => {
            router.push(pathname + "?" + createQueryString("page", "-1"));
          }}
        >{`< prev`}</button>
        <button
          className="text-blue-600 "
          disabled={length < 15}
          onClick={() => {
            router.push(pathname + "?" + createQueryString("page", "+1"));
          }}
        >{`next >`}</button>
      </div>
    </>
  );
}

export default Pagination;
