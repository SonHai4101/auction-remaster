import { useState, useEffect } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface PaginationProps {
  currentPage?: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  justify?: "start" | "center" | "end";
}

const Pagination = ({
  currentPage = 1,
  totalPages,
  onPageChange,
  justify = "center",
}: PaginationProps) => {
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const getVisiblePages = (current: number, total: number, delta = 1): (number | string)[] => {
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];
    let lastPage: number | undefined;

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (lastPage !== undefined) {
        if ((i as number) - lastPage === 2) {
          rangeWithDots.push(lastPage + 1);
        } else if ((i as number) - lastPage > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      lastPage = i as number;
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages(page, totalPages, 1);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    onPageChange(newPage);
  };

  const justifyClass =
    justify === "start" ? "justify-start" : justify === "end" ? "justify-end" : "justify-center";

  return (
    <div className={`flex ${justifyClass} mt-6 gap-2`}>
      <button
        className="w-9 h-9 rounded-md bg-[#1F1F30] text-white disabled:opacity-50 flex items-center justify-center"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <LuChevronLeft size={16} />
      </button>

      {visiblePages.map((p, i) =>
        typeof p === "number" ? (
          <button
            key={i}
            className={`w-9 h-9 rounded-md text-black flex items-center justify-center transition-all
              ${
                p === page
                  ? "bg-[#ffdb33]"
                  : "bg-transparent hover:bg-[#fff1b2]"
              }`}
            onClick={() => handlePageChange(p)}
          >
            {p}
          </button>
        ) : (
          <span key={i} className="px-2 text-gray-400 select-none">
            {p}
          </span>
        )
      )}

      <button
        className="w-9 h-9 rounded-md bg-[#1F1F30] text-white disabled:opacity-50 flex items-center justify-center"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        <LuChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
