"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const useUpdateQuery = () => {
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()

    return (update: Record<string, string | null>, resetPage?: boolean) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(update).forEach(([key, value]) => {
            
            if(value) {
                params.set(key, value);
            }else {
                params.delete(key)
            }
            
        })

        if (resetPage) params.set("page", "1")

        router.push(`${pathName}?${params.toString()}`, { scroll: false})
    }
}

export default useUpdateQuery;