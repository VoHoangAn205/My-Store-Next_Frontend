"use client"
import Link from "next/link"

interface Props {
  pageName: string
  title: string,
  description: string,
}

const SubPageHeader = ({data} : {data: Props}) => {
    const {pageName = "...", title = "...", description = "..."} = data
    return (<>
         <header className="bg-white border-b border-brand-sand">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-brand-slate mb-3">
              <Link href="/" className="hover:text-brand-rust transition">
                Home
              </Link>
              <span>/</span>
              <span  className="hover:text-brand-rust transition">
                {pageName}
              </span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-brand-dark">{title}</h1>
                <p className="text-sm text-brand-slate mt-1">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </header>
    </>)
}

export default SubPageHeader;