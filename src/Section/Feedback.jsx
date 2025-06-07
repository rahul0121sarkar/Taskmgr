import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faAngleLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const questions = [
  "How satisfied are you with the overall event experience?",
  "Did the event meet your expectations and goals?",
  "How would you rate our communication during the planning process?",
  "Were deadlines and timelines met effectively?",
  "How would you rate our team’s professionalism and responsiveness on event day?",
  "How satisfied were you with the creativity and design of the event?",
  "Was the quality of vendors/suppliers up to your standards?",
  "Do you feel the event provided good value for your investment?",
  "Would you consider working with us again or recommending us to others?",
  "What did you like most about the event?",
  "What could we have done better ?",
];

const yesNoQuestions = [1, 3, 6, 7, 8];
const yesNoOptions = [
  { key: "Y", label: "Yes" },
  { key: "N", label: "NO" },
];

const Feedback = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(answers[current]);
  }, [current]);

  const updateAnswer = () => {
    const updated = [...answers];
    updated[current] = selected;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (selected !== null) {
      updateAnswer();
      if (current < questions.length - 1) {
        const nextIndex = current + 1;
        setCurrent(nextIndex);
        setSelected(answers[nextIndex]);
      } else {
        alert("Feedback submitted! Thank you!");
        setAnswers(Array(questions.length).fill(null));
        setCurrent(0);
        setSelected(null);
      }
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      const prevIndex = current - 1;
      setCurrent(prevIndex);
      setSelected(answers[prevIndex]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  useEffect(() => {
    const throttleRef = { current: false };

    const handleKeyDown = (e) => {
      if (throttleRef.current) return;

      if (e.key === "ArrowDown") {
        handleNext();
        throttleRef.current = true;
        setTimeout(() => (throttleRef.current = false), 700);
      }

      if (e.key === "ArrowUp") {
        handlePrev();
        throttleRef.current = true;
        setTimeout(() => (throttleRef.current = false), 700);
      }
    };

    const handleWheel = (e) => {
      if (throttleRef.current) return;

      if (e.deltaY > 20) {
        handleNext();
      } else if (e.deltaY < -20) {
        handlePrev();
      }

      throttleRef.current = true;
      setTimeout(() => {
        throttleRef.current = false;
      }, 700);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [current, selected]); // dependencies stay the same

  const isYesNo = yesNoQuestions.includes(current);
  const isTextInput = [9, 10].includes(current);

  return (
    <>
      <div className="w-full h-1 bg-[#95D5E28f] rounded-full overflow-hidden ">
        <div
          className="h-full bg-[#95D5E2] transition-all duration-500"
          style={{
            width: `${
              ((current + (selected !== null ? 1 : 0)) / questions.length) * 100
            }%`,
          }}
        />
      </div>
      <div
        className="min-h-screen px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48 flex items-center justify-center bg-[#fcf8ef] relative"
        style={{
          backgroundImage:
            "url('https://images.typeform.com/images/8i3s72x6Mj84/background/large')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl flex flex-col sniglet-regular items-start overflow-hidden mt-20 sm:mt-32"
          style={{ minHeight: 350 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 sm:mb-8 w-full flex items-start"
            >
              <span className="text-[#5c9ead] font-medium text-lg sm:text-xl min-w-[2rem] flex-shrink-0 flex items-center">
                {current + 1}{" "}
                <span className="mx-1">
                  <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                </span>
              </span>
              <span className="text-xl sm:text-2xl text-gray-800 font-normal block">
                {questions[current]}
              </span>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={"choices-" + current}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col gap-3 mb-7 sm:px-7"
            >
              {isYesNo ? (
                yesNoOptions.map((option) => {
                  const isSelected = selected === option.label;
                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() =>
                        setSelected(
                          selected === option.label ? null : option.label
                        )
                      }
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
                })
              ) : isTextInput ? (
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
              ) : (
                <div className="flex flex-wrap md:flex-nowrap overflow-x-auto w-full gap-2">
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
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-row sm:flex-row sm:items-center gap-2 px-1 sm:px-7 w-full max-w-xs mb-4 mt-6">
            {current > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous"
                className="block sm:hidden w-18 h-12  rounded-md bg-[#b6e0ee] text-[#1B545F] flex items-center justify-center text-2xl font-bold cursor-pointer shadow-md hover:bg-[#9ed3e8] transition disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
            )}
            <button
              type="submit"
              disabled={selected === null}
              className={`
             w-full sm:w-14 px-4 py-2
             rounded-md text-lg font-medium cursor-pointer sniglet-regular shadow-md transition-all
             ${
               selected === null
                 ? "bg-[#b6e0ee] text-[#1B545F] cursor-not-allowed"
                 : "bg-[#b6e0ee] text-[#1B545F] hover:bg-[#9ed3e8] hover:-translate-y-0.5"
             }
           `}
            >
              OK
            </button>
            {current === questions.length - 1 && (
              <span className="text-sm text-gray-600 pl-2">Press Enter ↵</span>
            )}
          </div>

          {/* Arrow Controls */}
          <div className="hidden sm:flex w-full justify-end gap-2 mt-4 sm:absolute sm:bottom-10 sm:right-40 sm:w-auto sm:mt-0">
            <button
              type="button"
              onClick={handlePrev}
              disabled={current === 0}
              aria-label="Previous"
              className="rounded-md px-4 py-2 bg-[#75cef1] shadow-md cursor-pointer hover:bg-[#9ed3e8] transition disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faAngleUp} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={selected === null || current === questions.length - 1}
              aria-label="Next"
              className="rounded-md px-4 py-2 bg-[#c9e9f6] shadow-md cursor-pointer hover:bg-[#9ed3e8] transition disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Feedback;
