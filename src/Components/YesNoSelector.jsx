import React from "react";

const yesNoOptions = [
  { key: "Y", label: "Yes" },
  { key: "N", label: "NO" },
];

const YesNoSelector = ({ selected, setSelected }) => (
  <>
    {yesNoOptions.map((option) => {
      const isSelected = selected === option.label;
      return (
        <button
          key={option.key}
          type="button"
          onClick={() => setSelected(isSelected ? null : option.label)}
          className={`w-full sm:w-56 flex items-center sniglet-regular cursor-pointer justify-between px-4 py-3 border-2 rounded-md transition-all duration-200 ${
            isSelected
              ? "border-[#5c9ead] bg-[#e7f2f5]"
              : "border-[#b6cfd6] bg-white hover:border-[#5c9ead]"
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`w-6 h-6 flex items-center justify-center rounded font-lg transition-all ${
                isSelected
                  ? "bg-[#5c9ead] text-white"
                  : "text-[#5c9ead] border border-[#5c9ead]"
              }`}
            >
              {option.key}
            </span>
            <span className="text-lg text-[#5c9ead]">
              {option.label}
            </span>
          </div>
          {isSelected && (
            <svg
              className="w-5 h-5 text-[#5c9ead]"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>
      );
    })}
  </>
);

export default YesNoSelector;