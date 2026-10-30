"use client"
import TableSkeleton from "@/components/loadingSkeleton/TableSkeleton";
import SubOrderRow from "@/components/SubOrderRow";
import getErrorMessage from "@/helpers/getErrorMessage";
import orderService from "@/services/orderService";
import { useAuthStore } from "@/store/useAuthStore";
import { ParentOrder } from "@/types";  
import { useEffect, useState } from "react";

const purchases = () => {
  const {authStatus } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<ParentOrder[]>([]);

  useEffect(()=>{
    if(authStatus === "loading") return;
    if(authStatus === "guest") {
      setIsLoading(false);
      return;
    }

    (async () => {
      try {
      const response = await orderService.getMyOrder();
      
      setOrders(response);
      } catch (err) {
        const message = getErrorMessage(err);
        console.error(message)
      } finally {
        setIsLoading(false);
      }
    })();
  },[authStatus])
  

  if (isLoading) {
    return <TableSkeleton rows={4} cols={4}/>
  }
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          My Purchases
        </h1>
      </div>

    
      { orders?.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 font-medium">
          No transactions recorded on this profile yet.
        </div>
      ) : (
        <div className="space-y-6">
          {orders && orders.map((parentOrder) => (
            <div
              key={parentOrder._id}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Parent Order Container Master Banner Header */}
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 mb-4 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Order Reference
                  </p>
                  <p className="text-xs font-mono font-bold text-slate-700">
                    {parentOrder._id}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Transaction Date
                  </p>
                  <p className="text-xs text-slate-600 font-medium">
                    {new Date(parentOrder.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Total Invoice
                  </p>
                  <p className="text-sm font-bold text-indigo-600 font-mono">
                    ${parentOrder.totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Nested Sub-Order mapping list using our local state component row above */}
              <div className="bg-white">
                {parentOrder.subOrders?.map((subOrder) => (
                  <SubOrderRow key={subOrder._id} subOrder={subOrder} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default purchases;