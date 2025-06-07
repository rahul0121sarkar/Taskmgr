import React from "react";

const TextareaInput = ({ selected, setSelected, handleNext }) => (
  <textarea
    rows="1"
    placeholder=" your feedback here..."
    className="w-full p-4 text-lg border-b-2 sniglet-regular border-[#5c9ead] bg-transparent text-[#5c9ead] focus:outline-none resize-none placeholder-[#b6cfd6]"
    value={selected || ""}
    onChange={(e) => setSelected(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleNext();
      }
    }}
  />
);

export default TextareaInput;