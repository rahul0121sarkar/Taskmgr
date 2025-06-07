import React from "react";

const RatingSelector = ({ selected, setSelected }) => (
  <div className="flex flex-wrap md:flex-nowrap overflow-x-auto w-full gap-2 justify-center">
    {[...Array(11).keys()].map((n) => (
      <button
        key={n}
        type="button"
        onClick={() => setSelected(selected === n ? null : n)}
        className={`w-10 h-10 sm:w-20 sm:h-15 rounded-md border-2 flex cursor-pointer items-center justify-center text-lg sm:text-xl font-medium transition-colors ${
          selected === n
            ? "bg-[#5c9ead] text-white border-[#5c9ead]"
            : "bg-[#e7f2f5] text-gray-700 border-[#a3bfc7] hover:border-[#5c9ead]"
        }`}
      >
        {n}
      </button>
    ))}
  </div>
);

export default RatingSelector;