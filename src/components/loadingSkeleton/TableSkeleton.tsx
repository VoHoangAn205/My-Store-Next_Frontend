interface Props {
    rows: number,
    cols: number,
}

export default function TableSkeleton({ rows, cols }: Props) {
  // Generate arrays based on props to render the matching placeholder grids
  const skeletonRows = Array(rows).fill(0);
  const skeletonCols = Array(cols).fill(0);

  return (
    <div className="w-full bg-white border border-brand-sand/60 rounded-2xl overflow-hidden shadow-sm animate-pulse">
      {/* Table Action Header Placeholder Bar */}
      <div className="p-4 border-b border-brand-sand/40 flex justify-between items-center bg-slate-50/50">
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        <div className="h-8 bg-slate-200 rounded-lg w-20"></div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Mock Headers */}
          <thead>
            <tr className="border-b border-brand-sand/40 bg-slate-50/35">
              {skeletonCols.map((_, index) => (
                <th key={index} className="p-4">
                  <div className="h-3.5 bg-slate-200 rounded w-2/3"></div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Mock Body Row Data Cells */}
          <tbody>
            {skeletonRows.map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-brand-sand/20 last:border-0 hover:bg-slate-50/20"
              >
                {/* Columns Loop */}
                {skeletonCols.map((_, colIndex) => (
                  <td key={colIndex} className="p-4">
                    {colIndex === 0 ? (
                      /* First column layout mimic: Mock Image Thumbnail + Multi-line Text Block */
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-slate-200 rounded-xl shrink-0"></div>
                        <div className="space-y-2 w-full">
                          <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                          <div className="h-2.5 bg-slate-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ) : colIndex === skeletonCols.length - 1 ? (
                      /* Last column layout mimic: Right-aligned isolated action dots/button block */
                      <div className="flex justify-end">
                        <div className="h-7 bg-slate-200 rounded-lg w-14"></div>
                      </div>
                    ) : (
                      /* Middle columns layouts mimic: Standard layout data strings */
                      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}