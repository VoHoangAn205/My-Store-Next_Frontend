export default function LoadingPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex">
      {/* Fake Sidebar Layout */}
      <div className="w-64 bg-[#1e293b] border-r border-slate-800 p-6 hidden md:flex flex-col gap-6 animate-pulse">
        <div className="h-8 bg-slate-700 rounded w-3/4 mb-4"></div>
        <div className="space-y-4">
          <div className="h-4 bg-slate-700 rounded w-5/6"></div>
          <div className="h-4 bg-slate-700 rounded w-2/3"></div>
          <div className="h-4 bg-slate-700 rounded w-4/5"></div>
        </div>
      </div>

      {/* Main Panel Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Fake Top Nav */}
        <div className="h-16 bg-[#1e293b] border-b border-slate-800 px-8 flex items-center justify-between animate-pulse">
          <div className="h-4 bg-slate-700 rounded w-32"></div>
          <div className="h-8 w-8 bg-slate-700 rounded-full"></div>
        </div>

        {/* Fake Body Cards Grid */}
        <div className="p-8 flex-1 space-y-6 max-w-5xl w-full mx-auto animate-pulse">
          <div className="h-6 bg-slate-700 rounded w-1/4 mb-4"></div>

          {/* Top Row Grid Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-28 bg-[#1e293b] rounded-lg border border-slate-800 p-4 space-y-3">
              <div className="h-3 bg-slate-700 rounded w-1/3"></div>
              <div className="h-6 bg-slate-700 rounded w-1/2"></div>
            </div>
            <div className="h-28 bg-[#1e293b] rounded-lg border border-slate-800 p-4 space-y-3">
              <div className="h-3 bg-slate-700 rounded w-1/4"></div>
              <div className="h-6 bg-slate-700 rounded w-1/2"></div>
            </div>
            <div className="h-28 bg-[#1e293b] rounded-lg border border-slate-800 p-4 space-y-3">
              <div className="h-3 bg-slate-700 rounded w-1/2"></div>
              <div className="h-6 bg-slate-700 rounded w-1/3"></div>
            </div>
          </div>

          {/* Large Graph Panel */}
          <div className="h-64 bg-[#1e293b] rounded-xl border border-slate-800"></div>
        </div>
      </div>
    </div>
  );
}
