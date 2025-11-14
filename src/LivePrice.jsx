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
    
    </div>
  );
}
export default LivePrice;   