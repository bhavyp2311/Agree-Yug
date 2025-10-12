// FindBuyers.jsx
import React from "react";
import Markethub from "./Markethub";

export default function FindBuyers() {
  const buyers = [
    {
      name: "AgroFresh Traders",
      location: "Delhi",
      requirement: "Rice (Basmati) - 500 Quintals",
      contact: "📞 +91 9876543210",
      status: "Active",
    },
    {
      name: "Punjab Grain Market",
      location: "Ludhiana",
      requirement: "Wheat (HD-2967) - 300 Quintals",
      contact: "📞 +91 9123456780",
      status: "Active",
    },
    {
      name: "FreshMart Retailers",
      location: "Mumbai",
      requirement: "Tomato (Hybrid) - 5 Tons",
      contact: "📞 +91 9988776655",
      status: "High Demand",
    },
    {
      name: "Onion Exporters Ltd",
      location: "Nashik",
      requirement: "Onion (Red) - 10 Tons",
      contact: "📞 +91 9090909090",
      status: "Pending",
    },
  ];

  return (
    <div>
      {/* <Markethub/>  */}
    <div className="w-full mx-auto p-6 space-y-4">
      
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Find Buyers</h1>

      {buyers.map((buyer, idx) => (
        <div
          key={idx}
          className="border rounded-xl shadow-sm p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h2 className="text-lg font-semibold">{buyer.name}</h2>
            <p className="text-sm text-gray-600">{buyer.location}</p>
            <p className="text-sm text-gray-700 mt-1">{buyer.requirement}</p>
            <p className="text-sm text-blue-600 mt-1">{buyer.contact}</p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              buyer.status === "Active"
                ? "bg-green-100 text-green-700"
                : buyer.status === "High Demand"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {buyer.status}
          </span>
        </div>
      ))}
    </div>
    </div>
  );
}
