"use client"
import DesktopCartRow from "@/components/cartPageComponent/DesktopCartRow";
import MobileStackedCard from "@/components/cartPageComponent/MobileStackedCard";
import OrderSummarySidebar from "@/components/cartPageComponent/OrderSummarySidebar";
import TableSkeleton from "@/components/loadingSkeleton/TableSkeleton";
import getErrorMessage from "@/helpers/getErrorMessage";
import renderStatusColor from "@/helpers/renderStatusColor";
import cartService from "@/services/cartService";
import { CartItemInput } from "@/services/orderService";
import { useAuthStore } from "@/store/useAuthStore";
import { CartInput, CartItems } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const CartPage = () => {
    const authStatus = useAuthStore((s) => s.authStatus);
    const [cartList, setCartList] = useState<CartItems[]>([]);
    const [selectedItem, setSelectedItem] = useState<CartItemInput[]>([]);
    const [isLoading, setIsLoading] = useState(true)

  const getListCart = async () => {
    try {
        const cartList = await cartService.getAllCart();
        setCartList(cartList.cartItems)
        
    } catch (err) {
        const message = getErrorMessage(err);
        toast.error(message);
    } finally {
        setIsLoading(false);
    }
  }

  const handleRemoveItem = useCallback( async (id: string) => {
    try {
        const response = await cartService.deleteCart(id);
        setCartList(response.cartItems)
    } catch (err) {
        const message = getErrorMessage(err);
        toast.error(message);
    }
  },[]);

  const handleQuantityChange = useCallback( async (data: CartInput) => {
    try {
        const response = await cartService.addToCart(data);
        setCartList(response.cartItems)
    } catch (err) {
        const message = getErrorMessage(err);
        toast.error(message);
    }
  },[]);

  const handleToggleSelectItem = (item: CartItemInput, isSelected: boolean) => {
    if (!isSelected) {
      setSelectedItem(
        selectedItem.filter((elm) => elm.productId !== item.productId),
      );
    } else {
      setSelectedItem([...selectedItem, item]);
    }
  };

  const selectedIds = useMemo(() => {
    return new Set(selectedItem.map((item) => item.productId));
}, [selectedItem]);

  useEffect(() => {
    if(authStatus === "loading") return;
    if(authStatus === "guest") {
      setIsLoading(false);
      return;
    }
    getListCart()
  }, [authStatus]);

  if (isLoading) {
    return <TableSkeleton rows={4} cols={4}/>;
  }
  return (
    <>
      <div className="p-6 max-w-7xl mx-auto space-y-8 min-h-screen">
        {/* Header Banner */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <i className="fa-solid fa-bag-shopping text-indigo-600 text-xl"></i>{" "}
              My Shopping Cart
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Review your selected products before proceeding to checkout
            </p>
          </div>
          <span className="bg-indigo-50 text-indigo-700 text-sm font-semibold px-4 py-2 rounded-xl border border-indigo-100">
            {cartList.length} {cartList.length === 1 ? "Item" : "Items"}
          </span>
        </div>

        {cartList.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <i className="fa-solid fa-cart-flatbed text-2xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-slate-700">
              Your cart is empty
            </h3>
            <p className="text-slate-500 max-w-md mx-auto text-sm">
              Looks like you haven't added anything to your cart yet. Explore
              our inventory to find great products!
            </p>
          </div>
        ) : (
          /* Grid Layout: Cart List + Order Summary */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Cart Items Table (Desktop Layout) */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden hidden md:block">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="p-4 w-10 text-center">
                        {/* Optional Select All Checkbox header */}
                      </th>
                      <th className="p-4">Product</th>
                      <th className="p-4">Price</th>
                      <th className="p-4 text-center">Quantity</th>
                      <th className="p-4 text-right">Total</th>
                      <th className="p-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {cartList.map((item) => {
                      return (
                        <DesktopCartRow
                        key={item._id}
                        selectedIds={selectedIds}
                        item={item}
                        handleQuantityChange={handleQuantityChange}
                        handleRemoveItem={handleRemoveItem}
                        handleToggleSelectItem={handleToggleSelectItem}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile View: Responsive Stacked Cards */}
            <div className="block md:hidden space-y-4">
              {cartList.map((item) => {
                return (
                  <MobileStackedCard 
                  key={item._id}
                  selectedIds={selectedIds}
                  item={item}
                  handleQuantityChange={handleQuantityChange}
                  handleRemoveItem={handleRemoveItem}
                  handleToggleSelectItem={handleToggleSelectItem}
                />
                )
              })}         
            </div>

            {/* Right Column: Order Summary Sidebar */}
            <OrderSummarySidebar selectedItem={selectedItem} cartList={cartList}/>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;