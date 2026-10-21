"use client"
import cartService from "@/services/cartService";
import orderService from "@/services/orderService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

 interface ButtonProps {
  label: string,
  disable: boolean,
  color: "sand" | "rust" | "slate" | "dark" | "light",
  isLoading?: boolean,
  onClick: () => void
}

interface PropItems {
    stock: number,
    price: number,
    _id:  string,
}

interface Props {
    data: PropItems,
}

const ActionButton = ({label, color, disable, isLoading = false, onClick} : ButtonProps) => (
  <button
    onClick={onClick}
    disabled={disable}
    className={`w-full bg-brand-${color} hover:bg-brand-${color}/90 disabled:bg-brand-slate/30 text-white font-medium py-3 px-6 rounded-xl transition duration-200 shadow-sm disabled:cursor-not-allowed`}
  >
    {isLoading && (
      <i
        id="btnSpinner"
        className="fa-solid fa-circle-notch fa-spin hidden"
      ></i>
    )}{" "}
    {label}
  </button>
)
const ActionSection = ({data} : Props) => {
    const router = useRouter()
    const {_id, stock} = data;
    const [quantity, setQuantity] = useState(1)
    const [addLoading, setAddLoading] = useState(false)
    const [checkoutLoading, setCheckoutLoading] = useState(false)
    

    const handleAddToCart = async () => {
    if (addLoading) return;
    setAddLoading(true);
    try {
      const response = await cartService.addToCart({ product: _id, quantity });

    toast.success("Added to your cart");
    } catch (err) {
      console.error("Add to cart failed ",err)
      toast.error("Could not add this product. Please try again.");
    } finally {
      setAddLoading(false);
    }
  };

  const handleCreateOrder = async () => {  
    if (checkoutLoading) return;  
    setCheckoutLoading(true);
    try {
      const response = await orderService.createOrder({ cartItems: [{ productId: _id, quantity }] });

      if (response) {
        router.push("/myPurchases");
      }      
    } catch (err) {
       console.error("Create Order failed ",err)
      toast.error("Could not create order. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  let isOutOfStock = stock === 0 ? true : false

    return (
        <>
        <div className="space-y-4 pt-4 border-t border-brand-sand/60">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-brand-dark">
                  Quantity:
                </label>
                <div className="flex items-center border border-brand-sand rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={isOutOfStock || quantity <= 1}
                    className="px-3 py-1.5 bg-brand-light hover:bg-brand-sand/40 text-brand-dark font-bold disabled:opacity-40 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-semibold text-brand-dark">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((prev) => Math.min(stock, prev + 1))
                    }
                    disabled={isOutOfStock || quantity >= stock}
                    className="px-3 py-1.5 bg-brand-light hover:bg-brand-sand/40 text-brand-dark font-bold disabled:opacity-40 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ActionButton 
                label="Add to Cart" 
                color="rust" 
                disable={isOutOfStock || addLoading} 
                isLoading={addLoading} 
                onClick={handleAddToCart}/>

                <ActionButton 
                label="Buy Now" 
                color="dark" 
                disable={isOutOfStock || checkoutLoading} 
                isLoading={checkoutLoading} 
                onClick={handleCreateOrder}/>
              </div>
            </div>
        </>
    )
}

export default ActionSection;