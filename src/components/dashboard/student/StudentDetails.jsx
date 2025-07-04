import React from 'react';

function StudentDetails() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { paidAmount, remAmount, email, mobNumber } = userData || {};

  return (
    <div className="mt-10 flex justify-center">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">Student Payment Details</h2>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Email:</span>
            <span className="text-gray-900">{email}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Mobile Number:</span>
            <span className="text-gray-900">{mobNumber}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Paid Amount:</span>
            <span className="text-green-600 font-semibold">₹{paidAmount}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Remaining Amount:</span>
            <span className="text-red-600 font-semibold">₹{remAmount}</span>
          </div>
        </div>

        {remAmount >0 && (
          <div className="mt-6 text-center">
            <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow">
              Pay Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDetails;
