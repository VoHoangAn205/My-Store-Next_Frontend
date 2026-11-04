"use client"
import getErrorMessage from "@/helpers/getErrorMessage";
import orderService, { CartItemInput } from "@/services/orderService";
import { CartItems } from "@/types";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface Props {
    selectedItem: CartItemInput[]
    cartList: CartItems[]
}
const OrderSummarySidebar = ({selectedItem, cartList} : Props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const router = useRouter();

      const handleCreateOrder = async () => {
    if(isCheckout) return;
    setIsCheckout(true);
    try {
      await orderService.createOrder({ cartItems: selectedItem });

      toast.success("Order Successfully");
      router.push("/account/purchases");
    } catch (err) {
      const message = getErrorMessage(err);

      toast.error(message);
    } finally {
      setIsCheckout(false);
    }
  };

    const orderValue = useMemo(() => {
        const subtotal = selectedItem.reduce((acc, item) => {
          const matchItem = cartList.find(
            (elm) => elm.product?._id === item.productId,
          );
    
          if (!matchItem || !matchItem.product) return acc;
          const price = matchItem.product.price || 0;
          const quantity = matchItem.quantity || 0;
    
          return acc + price * quantity;
        }, 0);
    
        const shippingFee = subtotal > 0 ? 15 : 0;
        const voucherFreeShip = 15;
    
        const netShipping = Math.max(0, shippingFee - voucherFreeShip);
        const grandTotal = subtotal + netShipping;
    
        return { subtotal, shippingFee, voucherFreeShip, grandTotal };
      }, [selectedItem, cartList]);

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 h-fit">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">
                    ${orderValue.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-slate-800">
                    ${orderValue.shippingFee.toFixed(2)}
                  </span>
                </div>
                {orderValue.shippingFee > 0 ? (
                  <div className="flex justify-between text-slate-600">
                    <span>Voucher Free Ship</span>
                    <span className="font-semibold text-slate-800">
                      -${orderValue.voucherFreeShip.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <></>
                )}

                <div className="border-t border-slate-100 pt-3 flex justify-between text-base font-bold text-slate-800">
                  <span>Grand Total</span>
                  <span className="text-indigo-600">
                    ${orderValue.grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCreateOrder}
                disabled={isCheckout}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                {" "}
                {isCheckout && (
                  <i
                    id="btnSpinner"
                    className="fa-solid fa-circle-notch fa-spin hidden"
                  ></i>
                )}
                Proceed to Checkout{" "}
                <i className="fa-solid fa-arrow-right text-sm"></i>
              </button>
            </div>
    )
}

export default OrderSummarySidebar;