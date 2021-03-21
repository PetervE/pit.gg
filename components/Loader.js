import React from "react";

export default function Loader({ darkModeActive, fullscreen }) {
  return (
    <div
      className={`flex flex-1 justify-center items-center ${
        fullscreen ? "min-h-screen" : ""
      }`}
    >
      <div className="flex">
        <button
          type="button"
          className={`inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md bg-rose-600 hover:bg-rose-500 focus:border-rose-700 active:bg-rose-700 transition ease-in-out duration-150 cursor-not-allowed ${
            darkModeActive === true ? "text-white" : "text-black"
          }`}
          disabled
        >
          <svg
            className={`animate-spin -ml-1 mr-3 h-5 w-5 ${
              darkModeActive === true ? "text-white" : "text-black"
            }`}
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-0"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
