"use client"

import { User } from "@/types";

interface Props {
    data: User
}
const VendorInfo = ({data} : Props) => {
    const { username } = data
    return (
        <>
            <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-brand-sand flex items-center justify-center text-xs text-brand-dark font-bold">
                    {username?.charAt(0) || "U"}
                </div>
                <span className="text-xs font-medium text-brand-slate">
                Sold by{" "}
                <span className="text-brand-dark font-semibold">
                    {username || "Seller"}
                </span>
                </span>
            </div>
        </>
    )
}

export default VendorInfo;