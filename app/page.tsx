import Image from "next/image";
import React from "react";
import Link from "next/link";

function Home() {
  return (
    <div className=" min-h-svh -mt-4">
      <Link href="/products">
        <Image
          className="w-full h-auto"
          src="/images/banner.jpg"
          alt="banner"
          width={1800}
          height={800}
        />
      </Link>

      <div className="flex flex-col md:flex-row max-w-7xl mx-auto gap-5 mt-4 md:mt-8">
        <Link href="/products?gender=Men">
          <Image
            className="w-[900px] h-auto"
            src="/images/lhs.jpg"
            alt="banner"
            width={900}
            height={400}
          />
        </Link>

        <Link href="/products?gender=Women">
          <Image
            className="w-[900px] h-auto"
            src="/images/rhs.webp"
            alt="banner"
            width={900}
            height={400}
          />
        </Link>
      </div>
    </div>
  );
}

export default Home;
