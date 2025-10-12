// LivePrice.jsx
import React, { useState, useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import Markethub from './Markethub';

function LivePrice({ filters = {}, searchQuery = '' }) {
  // Crop data
  const [crops] = useState([
    {
      name: "Rice",
      type: "Basmati",
      demand: "High",
      location: "Delhi Mandi",
      state: "Delhi",
      time: "2 hours ago",
      price: "₹2,150",
      priceNum: 2150,
      unit: "/quintal",
      change: 2.5,
    }
  ]);

  // Filter and search logic
  const filteredCrops = useMemo(() => {
    let filtered = [...crops];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(crop =>
        crop.name.toLowerCase().includes(query) ||
        crop.type.toLowerCase().includes(query) ||
        crop.location.toLowerCase().includes(query) ||
        crop.state.toLowerCase().includes(query)
      );
    }

    if (filters.demand) {
      filtered = filtered.filter(crop => crop.demand.toLowerCase() === filters.demand.toLowerCase());
    }

    if (filters.state && filters.state !== 'All States') {
      filtered = filtered.filter(crop => crop.state === filters.state);
    }

    if (filters.commodity && filters.commodity !== 'All Commodities') {
      filtered = filtered.filter(crop => crop.name.toLowerCase() === filters.commodity.toLowerCase());
    }

    return filtered;
  }, [crops, searchQuery, filters]);

  return (
    <div className="w-full mx-auto p-4 space-y-4">
      <Markethub/>
      {/* Price Alert */}
      {/* {filteredCrops.some(crop => crop.change > 10) && (
        <div className="bg-gradient-to-r from-green-50 to-yellow-50 border border-green-200 rounded-xl shadow-sm p-4 flex items-center justify-between">
          <div>
            <p className="font-medium text-green-700">Price Alert!</p>
            <p className="text-sm text-gray-600">
              {filteredCrops
                .filter(crop => crop.change > 10)
                .map(crop => ${crop.name} prices increased by ${crop.change}% – Great time to sell)
                .join(", ")}
            </p>
          </div>
          <button className="bg-green-700 hover:bg-green-800 text-white rounded-full px-6 py-2 text-sm font-medium">
            Sell Now
          </button>
        </div>
      )}

      {(searchQuery || filters.demand || filters.state !== 'All States' || filters.commodity !== 'All Commodities') && (
        <div className="text-sm text-gray-600 px-1">
          {filteredCrops.length} {filteredCrops.length === 1 ? 'result' : 'results'} found
        </div>
      )}

      {filteredCrops.length === 0 && (
        <div className="text-center py-10">
          <div className="text-gray-400 text-5xl mb-4">
            <span className="material-symbols-outlined text-6xl">search_off</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No crops found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {filteredCrops.map((crop, idx) => (
        <div key={crop.name + crop.location} className="border rounded-xl shadow-sm p-4 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">{crop.name}</h2>
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md">{crop.type}</span>
              <span
                className={`text-xs px-2 py-1 rounded-md font-medium ${
                  crop.demand === "High" ? "bg-green-100 text-green-700" :
                  crop.demand === "Medium" ? "bg-orange-100 text-orange-700" :
                  "bg-red-100 text-red-700"
                }`}
              >
                {crop.demand} Demand
              </span>
            </div>
            <p className="text-sm text-gray-500">{crop.location} • {crop.time}</p>
          </div>

          <div className="text-right">
            <p className="text-lg font-semibold text-gray-800">
              {crop.price}<span className="text-sm font-normal">{crop.unit}</span>
            </p>
            <div className="flex items-center justify-end text-sm">
              {crop.change > 0 ? (
                <span className="flex items-center text-green-600">
                  <ArrowUpRight size={14} className="mr-1" />{crop.change}%
                </span>
              ) : crop.change < 0 ? (
                <span className="flex items-center text-red-600">
                  <ArrowDownRight size={14} className="mr-1" />{Math.abs(crop.change)}%
                </span>
              ) : (
                <span className="flex items-center text-gray-500">
                  <Minus size={14} className="mr-1" /> No change
                </span>
              )}
            </div>
          </div>
        </div>
      ))} */}
    </div>
  );
}
export default LivePrice;   