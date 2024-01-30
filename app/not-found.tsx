import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-dvh flex justify-center items-center gap-3 text-gray-700">
      <h2 className="text-2xl">Not Found</h2>
      <p className="text-lg">Could not find requested resource</p>
      <Link className=" bg-green-500 p-3 rounded text-white" href="/">
        Return Home
      </Link>
    </div>
  );
}
