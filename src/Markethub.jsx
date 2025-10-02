// import { useNavigate, useLocation } from 'react-router-dom';
// import LivePrice from './LivePrice';
// import {Link,NavLink,Outlet } from "react-router-dom";

// function Markethub() {
//   const navigate = useNavigate();
//   const location = useLocation(); 
//   // Determine active tab based on current path
//   // const isLivePrice = location.pathname === '/Markethub/';
//   const isLivePrice = location.pathname.startsWith('/Markethub') && !location.pathname.includes('findbuyers');
//   const isFindBuyers = location.pathname === '/Markethub/findbuyers';

//   return (
//     <div>
//       {/* ===============market intelligence====================== */}
//       <section className="flex p-3 items-center">
//         <p className="p-3">
//           <span className="material-symbols-outlined">arrow_left_alt</span>
//         </p>

//         <article className="bg-white flex items-center">
//           <p className="text-white bg-[#c2b7ae] rounded-3xl flex justify-center items-center py-2 px-2 text-2xl">
//             <span className="material-symbols-outlined">moving</span>
//           </p>
//           <div className="px-3">
//             <h2 className="text-[#0f3300] text-xl font-bold">Market Intelligence</h2>
//             <p className="text-[#0f3300] text-md">Live prices, buyers & transport</p>
//           </div>
//         </article>

//         <p className="ml-auto">
//           <span className="material-symbols-outlined">notifications</span>
//         </p>
//       </section>
//       <hr className="bg-[#fff9eb] h-0.5" />

//       {/* ====================search bar =================== */}
//       <section className='p-3'>      
//         <div className="relative w-full">
//           <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
//             search
//           </span>
//           <input 
//             type="text" 
//             placeholder="Search Crops, Market, Buyers" 
//             className="bg-[#fff9eb] p-3 pl-10 pr-10 w-full rounded-xl outline-none"
//           />
//           <span className="material-symbols-outlined absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer">
//             filter_alt
//           </span>
//         </div>
//       </section>
//       <hr className="bg-[#fff9eb] h-0.5"  />

//       {/* ================== Toggle Buttons ================== */}
//       <section className="p-3 flex justify-around">
//         <button
//           onClick={() => navigate("/Markethub/")||location.pathname === ("/Markethub") }
//           className={`w-1/2 py-2 rounded-lg font-medium mr-2 ${isLivePrice ? 'bg-[#0f3300] text-white' : 'bg-[#fff9eb] text-[#0f3300]'}`}
//         >
//           Live Prices
          
//         </button>

//         <button
//           onClick={() => navigate("/Markethub/findbuyers")}
//           className={`w-1/2 py-2 rounded-lg font-medium ${isFindBuyers ? 'bg-[#0f3300] text-white' : 'bg-[#fff9eb] text-[#0f3300]'}`}
//         >
//           Find Buyers
//         </button>
//       </section>
//     </div>
//   );
// }
// export default Markethub;

import React, { useState, useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

// ==================== Filter Modal Component ====================
function FilterModal({ isOpen, onClose, filters, setFilters, onApply }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const indianStates = [
    'All States', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi'
  ];

  const commodities = [
    'All Commodities', 'Rice', 'Wheat', 'Maize', 'Bajra', 'Jowar', 'Barley',
    'Cotton', 'Sugarcane', 'Jute', 'Tea', 'Coffee', 'Rubber',
    'Potato', 'Onion', 'Tomato', 'Cabbage', 'Cauliflower',
    'Soybean', 'Groundnut', 'Sunflower', 'Mustard', 'Sesame',
    'Chickpea', 'Pigeon Pea', 'Green Gram', 'Black Gram', 'Lentil',
    'Banana', 'Mango', 'Apple', 'Orange', 'Grapes', 'Pomegranate',
    'Chilli', 'Turmeric', 'Coriander', 'Cumin', 'Ginger', 'Garlic'
  ];

  const handleApply = () => {
    setFilters(localFilters); // Update parent filters
    onApply(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      demand: '',
      state: 'All States',
      commodity: 'All Commodities'
    };
    setLocalFilters(resetFilters);
    setFilters(resetFilters); // Reset parent filters
    onApply(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#0f3300]">Filter Options</h2>
          <button onClick={onClose} className="text-2xl text-gray-500">×</button>
        </div>

        <div className="p-4 space-y-6">
          {/* Demand Filter */}
          <div>
            <h3 className="font-semibold text-[#0f3300] mb-3">Demand Level</h3>
            <div className="flex gap-2">
              {['', 'High', 'Medium', 'Low'].map((demand) => (
                <button
                  key={demand}
                  onClick={() => setLocalFilters({ ...localFilters, demand })}
                  className={`px-4 py-2 rounded-lg font-medium flex-1 ${
                    localFilters.demand === demand
                      ? 'bg-[#0f3300] text-white'
                      : 'bg-[#fff9eb] text-[#0f3300]'
                  }`}
                >
                  {demand || 'All'}
                </button>
              ))}
            </div>
          </div>

          {/* State Filter */}
          <div>
            <h3 className="font-semibold text-[#0f3300] mb-3">State</h3>
            <select
              value={localFilters.state}
              onChange={(e) => setLocalFilters({ ...localFilters, state: e.target.value })}
              className="w-full p-3 bg-[#fff9eb] rounded-lg outline-none text-[#0f3300]"
            >
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Commodity Filter */}
          <div>
            <h3 className="font-semibold text-[#0f3300] mb-3">Commodity</h3>
            <select
              value={localFilters.commodity}
              onChange={(e) => setLocalFilters({ ...localFilters, commodity: e.target.value })}
              className="w-full p-3 bg-[#fff9eb] rounded-lg outline-none text-[#0f3300]"
            >
              {commodities.map((commodity) => (
                <option key={commodity} value={commodity}>
                  {commodity}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t p-4 flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 py-3 rounded-lg font-medium bg-[#fff9eb] text-[#0f3300]"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-3 rounded-lg font-medium bg-[#0f3300] text-white"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== LivePrice Component ====================
function LivePrice({ filters = {}, searchQuery = '' }) {
  const [crops] = useState([
    { name: "Rice", type: "Basmati", demand: "High", location: "Delhi Mandi", state: "Delhi", time: "2 hours ago", price: "₹2,150", priceNum: 2150, unit: "/quintal", change: 2.5 },
    { name: "Wheat", type: "HD-2967", demand: "Medium", location: "Punjab Mandi", state: "Punjab", time: "1 hour ago", price: "₹1,890", priceNum: 1890, unit: "/quintal", change: -1.2 },
    { name: "Tomato", type: "Hybrid", demand: "High", location: "Mumbai Mandi", state: "Maharashtra", time: "30 min ago", price: "₹25", priceNum: 25, unit: "/kg", change: 15.3 },
    { name: "Onion", type: "Red", demand: "Medium", location: "Nashik Mandi", state: "Maharashtra", time: "45 min ago", price: "₹18", priceNum: 18, unit: "/kg", change: 0 },
  ]);

  // ==================== Filtering Crops ====================
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
      {/* ==================== Price Alert ==================== */}
      {filteredCrops.some(crop => crop.name === "Tomato" && crop.change > 10) && (
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
      )}

      {/* ==================== Results Count ==================== */}
      {(searchQuery || filters.demand || filters.state !== 'All States' || filters.commodity !== 'All Commodities') && (
        <div className="text-sm text-gray-600 px-1">
          {filteredCrops.length} {filteredCrops.length === 1 ? 'result' : 'results'} found
        </div>
      )}

      {/* ==================== No Results ==================== */}
      {filteredCrops.length === 0 && (
        <div className="text-center py-10">
          <div className="text-gray-400 text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No crops found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* ==================== Crop Cards ==================== */}
      {filteredCrops.map((crop, idx) => (
        <div key={idx} className="border rounded-xl shadow-sm p-4 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">{crop.name}</h2>
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md">{crop.type}</span>
              <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                crop.demand === "High" ? "bg-green-100 text-green-700" :
                crop.demand === "Medium" ? "bg-orange-100 text-orange-700" :
                "bg-red-100 text-red-700"
              }`}>
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
                <span className="flex items-center text-green-600"><ArrowUpRight size={14} className="mr-1" />{crop.change}%</span>
              ) : crop.change < 0 ? (
                <span className="flex items-center text-red-600"><ArrowDownRight size={14} className="mr-1" />{Math.abs(crop.change)}%</span>
              ) : (
                <span className="flex items-center text-gray-500"><Minus size={14} className="mr-1" /> No change</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ==================== Main Markethub Component ====================
function Markethub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentView, setCurrentView] = useState('liveprice');
  const [filters, setFilters] = useState({
    demand: '',
    state: 'All States',
    commodity: 'All Commodities'
  });

  const handleApplyFilters = (newFilters) => {
    console.log('Filters applied:', newFilters);
  };

  const activeFiltersCount = () => {
    let count = 0;
    if (filters.demand) count++;
    if (filters.state !== 'All States') count++;
    if (filters.commodity !== 'All Commodities') count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ==================== Header ==================== */}
      <section className="flex p-3 items-center">
        <p className="p-3"><span className="text-2xl">←</span></p>
        <article className="bg-white flex items-center">
          <p className="text-white bg-[#c2b7ae] rounded-3xl flex justify-center items-center py-2 px-2 text-2xl">
            <span className="material-symbols-outlined">moving</span>
          </p>
          <div className="px-3">
            <h2 className="text-[#0f3300] text-xl font-bold">Market Intelligence</h2>
            <p className="text-[#0f3300] text-md">Live prices, buyers & transport</p>
          </div>
        </article>
        <p className="ml-auto text-2xl">
          <span className="material-symbols-outlined">notifications</span>
        </p>
      </section>
      <hr className="bg-[#fff9eb] h-0.5" />

      {/* ==================== Search & Filter ==================== */}
      <section className='p-3'>      
        <div className="relative w-full flex">
          <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">search</span>
          <input 
            type="text" 
            placeholder="Search Crops, Market, Buyers" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#fff9eb] p-3 pl-10 pr-10 w-full rounded-xl outline-none"
          />
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-gray-500">filter_alt</span>
            {activeFiltersCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#0f3300] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {activeFiltersCount()}
              </span>
            )}
          </button>
        </div>
      </section>
      <hr className="bg-[#fff9eb] h-0.5" />

      {/* ==================== Active Filters Display ==================== */}
      {(filters.demand || filters.state !== 'All States' || filters.commodity !== 'All Commodities') && (
        <section className="px-3 py-2">
          <div className="flex flex-wrap gap-2">
            {filters.demand && (
              <span className="bg-[#0f3300] text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                Demand: {filters.demand}
                <button onClick={() => setFilters({ ...filters, demand: '' })}>×</button>
              </span>
            )}
            {filters.state !== 'All States' && (
              <span className="bg-[#0f3300] text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {filters.state}
                <button onClick={() => setFilters({ ...filters, state: 'All States' })}>×</button>
              </span>
            )}
            {filters.commodity !== 'All Commodities' && (
              <span className="bg-[#0f3300] text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {filters.commodity}
                <button onClick={() => setFilters({ ...filters, commodity: 'All Commodities' })}>×</button>
              </span>
            )}
          </div>
        </section>
      )}

      {/* ==================== Toggle Buttons ==================== */}
      <section className="p-3 flex justify-around">
        <button
          onClick={() => setCurrentView('liveprice')}
          className={`w-1/2 py-2 rounded-lg font-medium mr-2 ${
            currentView === 'liveprice' ? 'bg-[#0f3300] text-white' : 'bg-[#fff9eb] text-[#0f3300]'
          }`}
        >
          Live Prices
        </button>

        <button
          onClick={() => setCurrentView('findbuyers')}
          className={`w-1/2 py-2 rounded-lg font-medium ${
            currentView === 'findbuyers' ? 'bg-[#0f3300] text-white' : 'bg-[#fff9eb] text-[#0f3300]'
          }`}
        >
          Find Buyers
        </button>
      </section>

      {/* ==================== Filter Modal ==================== */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        onApply={handleApplyFilters}
      />

      {/* ==================== Conditional Views ==================== */}
      {currentView === 'liveprice' && (
        // ==================== Key added here to prevent duplicate renders ====================
        <LivePrice filters={filters} searchQuery={searchQuery} key={JSON.stringify(filters) + searchQuery}/>
      )}
      
      {currentView === 'findbuyers' && (
        <div className="p-4 text-center text-gray-500">
          Find Buyers section coming soon...
        </div>
      )}
    </div>
  );
}

export default Markethub;
