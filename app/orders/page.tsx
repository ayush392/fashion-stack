import OrdersCard from "@/components/cards/OrdersCard";
import { getOrders } from "@/utils/controller/orderController";

async function Orders() {
  try {
    const orders = await getOrders();

    return (
      <div className="max-w-screen-md md:mx-auto mx-2 text-sm md:text-base">
        <h1 className="text-xl font-bold my-3">My Orders</h1>
        <div className="flex flex-col gap-3">
          {orders?.map((order: any) => {
            return order.products.map((item: any, i: number) => {
              return <OrdersCard key={i} item={item} />;
            });
          })}
        </div>
      </div>
    );
  } catch (error: any) {
    return <div>Please login</div>;
  }
}

export default Orders;
