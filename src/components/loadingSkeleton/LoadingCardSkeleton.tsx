const LoadingCardSkeleton = ({ count = 8 } : {count: number}) => {
  // Generate an array based on the count prop to render multiple skeleton cards
  const skeletons = Array.from({ length: count });

  return (
    <div className="max-w-7xl mx-auto px-2 py-2">
      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {skeletons.map((_, index) => (
          <div
            key={index}
            className="bg-white border border-brand-sand rounded-xl p-4 shadow-sm animate-pulse flex flex-col justify-between"
          >
            <div>
              <div className="w-full h-48 bg-brand-light rounded-lg mb-4"></div>
              <div className="h-3 w-1/3 bg-brand-light rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-brand-light rounded mb-2"></div>
              <div className="h-4 w-2/3 bg-brand-light rounded mb-4"></div>
            </div>
            <div className="pt-4 border-t border-brand-sand/60 mt-4 flex items-center justify-between">
              <div className="h-5 w-16 bg-brand-light rounded"></div>
              <div className="h-8 w-24 bg-brand-light rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoadingCardSkeleton;