import React from 'react';

export default function NotFound () {
  return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="text-center animate-fadeIn">
        <h1 className="text-9xl font-extrabold text-indigo-600 drop-shadow-lg animate-bounce">
          404
        </h1>
        <p className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800">
          Page Not Found
        </p>
        <p className="mt-2 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="px-6 py-3 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          >
            Go Back Home
          </a>
        </div>
        
      </div>
    </div>

  );
};


