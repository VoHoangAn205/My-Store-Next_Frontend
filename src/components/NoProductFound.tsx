const NoProductFound = () => {
  return (
    <>
      <div className="text-center py-16 bg-white rounded-2xl border border-brand-sand shadow-sm">
        <span className="text-4xl">📦</span>
        <h3 className="mt-2 text-lg font-bold text-brand-dark">
          No products found
        </h3>
        <p className="text-brand-slate text-sm mt-1">
          Try checking your spelling or using different keywords.
        </p>
      </div>
    </>
  );
};

export default NoProductFound;