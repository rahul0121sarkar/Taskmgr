import React from 'react'

const LoadingOverlay = ({message = "Loading...."}) => {
  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/20'>
      <div className="flex flex-col items-center space-y-4 bg-white px-6 py-4 rounded-xl shadow-lg">
         <svg
          className="animate-spin h-6 w-6 text-gray-700"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
        <p className='text-gray-800 font-medium text-lg'>{message}</p>
      </div>
    </div>
  )
}

export default LoadingOverlay
