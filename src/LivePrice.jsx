import FindBuyers from './FindBuyers'
import Markethub from './Markethub'
import React from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
export default function LivePrice() {
  const crops = [
    {
      name: "Rice",
      type: "Basmati",
      demand: "High",
      location: "Delhi Mandi",
      time: "2 hours ago",
      price: "₹2,150",
      unit: "/quintal",
      change: 2.5,
    },
    {
      name: "Wheat",
      type: "HD-2967",
      demand: "Medium",
      location: "Punjab Mandi",
      time: "1 hour ago",
      price: "₹1,890",
      unit: "/quintal",
      change: -1.2,
    },
    {
      name: "Tomato",
      type: "Hybrid",
      demand: "High",
      location: "Mumbai Mandi",
      time: "30 min ago",
      price: "₹25",
      unit: "/kg",
      change: 15.3,
    },
    {
      name: "Onion",
      type: "Red",
      demand: "Medium",
      location: "Nashik Mandi",
      time: "45 min ago",
      price: "₹18",
      unit: "/kg",
      change: 0,
    },
  ];

  return (
    <div>
      <Markethub/>
    <div className="  w-full mx-auto p-4 space-y-4">
      {/* Price Alert */}
      <div className="bg-gradient-to-r from-green-50 to-yellow-50 border border-green-200 rounded-xl shadow-sm p-4 flex items-center justify-between">
        <div>
          <p className="font-medium text-green-700">Price Alert!</p>
          <p className="text-sm text-gray-600">
            Tomato prices increased by 15% – Great time to sell
          </p>
        </div>
        <button className="bg-green-700 hover:bg-green-800 text-white rounded-full px-6 py-2 text-sm font-medium">
          Sell Now
        </button>
      </div>

      {/* Crops List */}
      {crops.map((crop, idx) => (
        <div
          key={idx}
          className="border rounded-xl shadow-sm p-4 flex items-center justify-between"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">{crop.name}</h2>
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md">
                {crop.type}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-md font-medium ${crop.demand === "High"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                  }`}
              >
                {crop.demand} Demand
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {crop.location} • {crop.time}
            </p>
          </div>

          <div className="text-right">
            <p className="text-lg font-semibold text-gray-800">
              {crop.price}
              <span className="text-sm font-normal">{crop.unit}</span>
            </p>
            <div className="flex items-center justify-end text-sm">
              {crop.change > 0 ? (
                <span className="flex items-center text-green-600">
                  <ArrowUpRight size={14} className="mr-1" />
                  {crop.change}%
                </span>
              ) : crop.change < 0 ? (
                <span className="flex items-center text-red-600">
                  <ArrowDownRight size={14} className="mr-1" />
                  {Math.abs(crop.change)}%
                </span>
              ) : (
                <span className="flex items-center text-gray-500">
                  <Minus size={14} className="mr-1" /> No change
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}