"use client"

import TableSkeleton from "@/components/loadingSkeleton/TableSkeleton";
import authService from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const AccountPage = () => {
    const { userInfo, authStatus } = useAuthStore();
    const router = useRouter();
    const [requestLoading, setRequestLoading] = useState(false);
    const [upgradeStatus, setUpgradeStatus] = useState(
        userInfo?.isPendingVendor || false,
    );

  const handleSubmitUpgrade = async () => {
    if(requestLoading) return;
    setRequestLoading(true);
    try {
      await authService.requestUpgradeToVendor();
      setUpgradeStatus(true);

      toast.success("Send request successfully");
    } catch (err) {
      toast.error("Send request failed");
    } finally {
      setRequestLoading(false);
    }
  };

  if (authStatus === "loading") {
    return <TableSkeleton rows={4} cols={4}/>;
  } else if(authStatus === "guest" || !userInfo) {
    toast.error("You must to logged in");
    router.push("/");
    return;
  }
  const isVendor = userInfo.roles?.includes(1984);
  return (
    <div className="min-h-screen bg-brand-light text-brand-dark font-sans flex">
      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* USER HEADER BANNER */}
          <div className="bg-brand-dark rounded-2xl p-6 sm:p-8 border border-brand-slate/20 shadow-md text-brand-light flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-brand-slate flex items-center justify-center text-3xl font-bold text-brand-sand border-4 border-brand-rust">
                {userInfo.username?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-brand-light">
                  {userInfo.username}
                </h1>
                <p className="text-sm text-brand-sand/80 mt-0.5">
                  <i className="fa-regular fa-envelope mr-1.5"></i>
                  {userInfo.email}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-rust/20 text-brand-sand border border-brand-rust/40 capitalize">
                    <i className="fa-solid fa-shield-halved mr-1"></i>
                    {isVendor ? "Vendor" : "Customer"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* TAB 1: READ-ONLY ACCOUNT DETAILS */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-sand/60 shadow-sm space-y-6">
            <div className="border-b border-brand-sand/40 pb-4">
              <h2 className="text-lg font-bold text-brand-dark">
                Account Details
              </h2>
              <p className="text-xs text-brand-slate">
                Your registered account credentials and current permission
                roles.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-brand-light rounded-xl border border-brand-sand/40">
                <span className="block text-[11px] font-bold text-brand-slate uppercase tracking-wider mb-1">
                  Username
                </span>
                <p className="font-semibold text-brand-dark text-sm">
                  {userInfo.username}
                </p>
              </div>

              <div className="p-4 bg-brand-light rounded-xl border border-brand-sand/40">
                <span className="block text-[11px] font-bold text-brand-slate uppercase tracking-wider mb-1">
                  Email Address
                </span>
                <p className="font-semibold text-brand-dark text-sm">
                  {userInfo.email}
                </p>
              </div>

              <div className="p-4 bg-brand-light rounded-xl border border-brand-sand/40">
                <span className="block text-[11px] font-bold text-brand-slate uppercase tracking-wider mb-1">
                  Account ID
                </span>
                <p className="font-mono text-xs text-brand-slate">
                  #{userInfo._id}
                </p>
              </div>

              <div className="p-4 bg-brand-light rounded-xl border border-brand-sand/40">
                <span className="block text-[11px] font-bold text-brand-slate uppercase tracking-wider mb-1">
                  Active Roles
                </span>
                <p className="font-semibold text-brand-dark text-sm capitalize">
                  {isVendor ? "Vendor" : "User"}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-sand/60 shadow-sm space-y-6">
              <div className="border-b border-brand-sand/40 pb-4">
                <h2 className="text-lg font-bold text-brand-dark">
                  Vendor Role Upgrade
                </h2>
                <p className="text-xs text-brand-slate">
                  Apply to upgrade your account to vendor status.
                </p>
              </div>

              {/* State 1: User is already a vendor */}
              {isVendor ? (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center gap-3 text-emerald-800 text-sm">
                  <i className="fa-solid fa-circle-check text-emerald-600 text-xl"></i>
                  <div>
                    <p className="font-bold">You are a Vendor</p>
                    <p className="text-xs text-emerald-600">
                      Your account already has full vendor access to manage
                      sales and shop orders.
                    </p>
                  </div>
                </div>
              ) : upgradeStatus ? (
                /* State 2: User has a pending request */
                <div className="bg-brand-sand/30 border border-brand-sand p-4 rounded-xl flex items-center gap-3 text-brand-dark text-sm">
                  <i className="fa-solid fa-clock-rotate-left text-brand-rust text-xl"></i>
                  <div>
                    <p className="font-bold">Upgrade Application Pending</p>
                    <p className="text-xs text-brand-slate">
                      Your request has been sent to the admin team for review.
                    </p>
                  </div>
                </div>
              ) : (
                /* State 3: User can apply */
                <div className="space-y-4">
                  <div className="bg-brand-light p-4 rounded-xl border border-brand-sand/40 text-xs text-brand-slate space-y-2">
                    <p className="font-bold text-brand-dark text-sm">
                      <i className="fa-solid fa-circle-info text-brand-rust mr-2"></i>
                      Requirements to become a Vendor
                    </p>
                    <p>
                      • Gain access to list products and sell on our platform.
                    </p>
                    <p>
                      • Receive email notifications for incoming shop orders.
                    </p>
                  </div>

                  <button
                    onClick={handleSubmitUpgrade}
                    disabled={requestLoading}
                    className="px-6 py-3 bg-brand-dark text-brand-sand font-bold text-xs sm:text-sm rounded-xl hover:bg-brand-rust hover:text-white transition shadow-sm flex items-center gap-2"
                  >
                    {requestLoading ? (
                      <i className="fa-solid fa-spinner animate-spin"></i>
                    ) : (
                      <i className="fa-solid fa-paper-plane"></i>
                    )}
                    Request Vendor Upgrade
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;