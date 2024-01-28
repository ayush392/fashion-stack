"use client";
import { addToCart } from "@/utils/cartController";
import { addToWishlist } from "@/utils/wishlistController";
import {
  // usePathname,
  useParams,
  useSearchParams,
  useRouter,
} from "next/navigation";

function Button({ btnName, action, clsName }: any) {
  const params = useParams();
  //  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const productId = params.id;
  const quantity = parseInt(searchParams.get("quantity") || "1");
  const size = searchParams.get("size");

  async function checkAndCall() {
    switch (action) {
      case "getFilter":
        // getFilter();
        break;

      case "addToWishlist":
        const wish = await addToWishlist(productId);
        alert(wish);
        break;

      case "addToCart":
        // console.log(params, searchParams, pathname);
        if (!size) {
          alert("Please select a size");
          return;
        }
        // alert("Add to cart");
        const cart = await addToCart(productId, quantity, size);
        alert(cart);
        break;

      case "goToCart":
        router.push("/cart");
        break;

      case "gotoWishlist":
        router.push("/wishlist");
        break;
    }
  }

  return (
    <button className={clsName} onClick={checkAndCall}>
      {btnName}
    </button>
  );
}

export default Button;
