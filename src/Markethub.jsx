import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Markethub() {
  const navigate = useNavigate();
  const location = useLocation(); // Get current URL path

  // Determine active tab based on current path
  const isLivePrice = location.pathname === '/Markethub/liveprice';
  const isFindBuyers = location.pathname === '/Markethub/findbuyers';

  return (
    <div>
      {/* ===============market intelligence====================== */}
      <section className="flex p-3 items-center">
        <p className="p-3">
          <span className="material-symbols-outlined">arrow_left_alt</span>
        </p>

        <article className="bg-white flex items-center">
          <p className="text-white bg-[#c2b7ae] rounded-3xl flex justify-center items-center py-2 px-2 text-2xl">
            <span className="material-symbols-outlined">moving</span>
          </p>
          <div className="px-3">
            <h2 className="text-[#0f3300] text-xl font-bold">Market Intelligence</h2>
            <p className="text-[#0f3300] text-md">Live prices, buyers & transport</p>
          </div>
        </article>

        <p className="ml-auto">
          <span className="material-symbols-outlined">notifications</span>
        </p>
      </section>
      <hr className="bg-[#fff9eb] h-0.5" />

      {/* ====================search bar =================== */}
      <section className='p-3'>      
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            search
          </span>
          <input 
            type="text" 
            placeholder="Search Crops, Market, Buyers" 
            className="bg-[#fff9eb] p-3 pl-10 pr-10 w-full rounded-xl outline-none"
          />
          <span className="material-symbols-outlined absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer">
            filter_alt
          </span>
        </div>
      </section>
      <hr className="bg-[#fff9eb] h-0.5"  />

      {/* ================== Toggle Buttons ================== */}
      <section className="p-3 flex justify-around">
        <button
          onClick={() => navigate("/Markethub/liveprice")}
          className={`w-1/2 py-2 rounded-lg font-medium mr-2 ${isLivePrice ? 'bg-[#0f3300] text-white' : 'bg-[#fff9eb] text-[#0f3300]'}`}
        >
          Live Prices
        </button>

        <button
          onClick={() => navigate("/Markethub/findbuyers")}
          className={`w-1/2 py-2 rounded-lg font-medium ${isFindBuyers ? 'bg-[#0f3300] text-white' : 'bg-[#fff9eb] text-[#0f3300]'}`}
        >
          Find Buyers
        </button>
      </section>
    </div>
  );
}

export default Markethub;
