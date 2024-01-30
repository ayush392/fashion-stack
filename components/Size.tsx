"use client";
import { useCallback, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SizeComp({ sizes }: { sizes: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      {sizes.map((size: any, i: number) => {
        return (
          <div
            key={i}
            className={`text-gray-700 cursor-pointer border min-w-fit size-10 md:size-11 lg:size-12 p-3 rounded-full flex justify-center items-center hover:border-black 
            ${
              searchParams.get("size") === size &&
              "border-green-600 text-green-600"
            }`}
            onClick={() => {
              router.push(pathname + "?" + createQueryString("size", size));
            }}
          >
            <p className=" font-bold md:text-lg">{size}</p>
          </div>
        );
      })}
    </>
  );
}

export default function Size({ sizes }: { sizes: any }) {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <SizeComp sizes={sizes} />
    </Suspense>
  );
}
