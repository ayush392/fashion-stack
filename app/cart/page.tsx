"use client";
import { getCart } from "@/utils/controller/cartController";
import { useEffect, useState } from "react";
import CartCard from "@/components/cards/CartCard";
import { useRouter } from "next/navigation";
import { getAddress } from "@/utils/controller/accountController";
import { createOrder } from "@/utils/controller/orderController";

function Cart() {
  const [data, setData] = useState({
    cart: [],
    prices: { totalPrice: 0, totalMrp: 0, totalDiscount: 0 },
  });

  const [shipAddress, setShipAddress] = useState({});
  const [address, setAddress] = useState([
    { house: "", street: "", city: "", state: "", country: "", pincode: null },
  ]);

  const router = useRouter();
  let rupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const handleOrder = async () => {
    const res = await createOrder(
      data.cart,
      data.prices.totalPrice,
      shipAddress
    );
    alert(res);
  };

  async function fetchCartData() {
    try {
      const res = await getCart();
      setData(res);
    } catch (error) {
      alert(error);
    }
  }
  async function fetchAdd() {
    const res = await getAddress();
    setAddress(res);
  }

  useEffect(() => {
    fetchCartData();
    fetchAdd();
  }, []);

  return (
    // Navbar
    <div className="w-full max-w-screen-lg m-auto text-gray-700">
      {data?.cart?.length <= 0 ? (
        <div className=" h-svh w-full font-bold flex flex-col justify-center items-center">
          <h1 className="text-xl md:text-3xl ">No items in cart</h1>
          <button
            className="m-4 bg-green-600 rounded-md px-4 py-2 text-white"
            onClick={() => router.push("/products")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:gap-x-6">
          <div className="w-full">
            {data?.cart?.map((item: any, i: number) => {
              return (
                <CartCard
                  key={i}
                  product={item.product}
                  quantity={item.quantity}
                  size={item.size}
                  setData={setData}
                />
              );
            })}
          </div>
          <div className="m-3 md:w-full lg:w-3/5 ">
            {/* address details */}
            <div className="mb-3">
              <label className="mb-2 block">Shipping Address:</label>
              <select
                name="shipaddress"
                id="shipaddress"
                className="border rounded px-1 py-px ml-1"
                onChange={(e: any) => setShipAddress(address[e.target.value])}
              >
                <option>-Select-</option>
                {address.length > 0 &&
                  address.map((data, i) => {
                    return (
                      <option value={i}>
                        <p>{data.house + ", " + data.street}</p>
                        <p>{data.city + ", " + data.state}</p>
                      </option>
                    );
                  })}
              </select>
            </div>

            {/* price info */}
            <div className="flex flex-col ">
              <h3 className="font-bold mb-3">{`Price Details (${data?.cart?.length} Items)`}</h3>
              <div className="flex justify-between mb-3">
                <h3>Total MRP</h3>
                <h3>{rupee.format(data?.prices?.totalMrp)}</h3>
              </div>
              <div className="flex justify-between mb-3">
                <h3>Discount on MRP</h3>
                <h3 className="text-green-600">
                  - {rupee.format(data?.prices?.totalDiscount)}
                </h3>
              </div>
              <div className="flex justify-between mb-3">
                <h3>Platform Fee</h3>
                <h3 className="text-green-600">FREE</h3>
              </div>
              <div className="flex justify-between mb-3">
                <h3>Shipping Fee</h3>
                <h3 className="text-green-600">FREE</h3>
              </div>
              <hr className="mb-3" />
              <div className="flex justify-between mb-3">
                <h2 className="font-bold">Total Amount</h2>
                <h2 className="font-bold">
                  {rupee.format(data?.prices?.totalPrice)}
                </h2>
              </div>

              <button
                onClick={handleOrder}
                className=" w-full text-center font-bold py-2 bg-orange-600 border  text-white"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
