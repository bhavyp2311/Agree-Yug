import React, { useState, useMemo, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import FindBuyers from './FindBuyers';
import { useTranslation } from "react-i18next";

  // ==================== Filter Modal Component ====================
  function FilterModal({ isOpen, onClose, filters, setFilters, onApply }) {
  const [localFilters, setLocalFilters] = useState(filters);
  const { t,i18n } = useTranslation();


  // const indianStates = [
  //   t('All States'), t('Andhra Pradesh'), t('Arunachal Pradesh'), t('Assam'), t('Bihar'), t('Chhattisgarh'),
  //   t('Goa'), 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  //   'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  //   'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  //   'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi'
  // ];

  // const commodities = [
  //   'All Commodities', 'Rice', 'Wheat', 'Maize', 'Bajra', 'Jowar', 'Barley',
  //   'Cotton', 'Sugarcane', 'Jute', 'Tea', 'Coffee', 'Rubber',
  //   'Potato', 'Onion', 'Tomato', 'Cabbage', 'Cauliflower',
  //   'Soybean', 'Groundnut', 'Sunflower', 'Mustard', 'Sesame',
  //   'Chickpea', 'Pigeon Pea', 'Green Gram', 'Black Gram', 'Lentil',
  //   'Banana', 'Mango', 'Apple', 'Orange', 'Grapes', 'Pomegranate',
  //   'Chilli', 'Turmeric', 'Coriander', 'Cumin', 'Ginger', 'Garlic'
  // ];

    const indianStates = [
    t('All States'), t('Andhra Pradesh'), t('Arunachal Pradesh'), t('Assam'), t('Bihar'), t('Chhattisgarh'),
    t('Goa'), t('Gujarat'), t('Haryana'), t('Himachal Pradesh'), t('Jharkhand'), t('Karnataka'),
    t('Kerala'), t('Madhya Pradesh'), t('Maharashtra'), t('Manipur'), t('Meghalaya'), t('Mizoram'),
    t('Nagaland'), t('Odisha'), t('Punjab'), t('Rajasthan'), t('Sikkim'), t('Tamil Nadu'),
    t('Telangana'), t('Tripura'), t('Uttar Pradesh'), t('Uttarakhand'), t('West Bengal'), t('Delhi')
  ];

  const commodities = [
    t('All Commodities'), t('Rice'), t('Wheat'), t('Maize'), t('Bajra'), t('Jowar'), t('Barley'),
    t('Cotton'), t('Sugarcane'), t('Jute'), t('Tea'), t('Coffee'), t('Rubber'),
    t('Potato'), t('Onion'), t('Tomato'), t('Cabbage'), t('Cauliflower'),
    t('Soybean'), t('Groundnut'), t('Sunflower'), t('Mustard'), t('Sesame'),
    t('Chickpea'), t('Pigeon Pea'), t('Green Gram'), t('Black Gram'), t('Lentil'),
    t('Banana'), t('Mango'), t('Apple'), t('Orange'), t('Grapes'), t('Pomegranate'),
    t('Chilli'), t('Turmeric'), t('Coriander'), t('Cumin'), t('Ginger'), t('Garlic')
  ];

  const handleApply = () => {
    setFilters(localFilters);
    onApply(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      demand: '',
      state: t('All States'),
      commodity: t('All Commodities')
    };
    setLocalFilters(resetFilters);
    setFilters(resetFilters);
    onApply(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">{t("Filter Options")}</h2>
          <button onClick={onClose} className="text-2xl text-gray-500">×</button>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">{t("Demand Level")}</h3>
            <div className="flex gap-2">
              {['', t('High'), t('Medium'), t('Low')].map((demand) => (
                <button
                  key={demand}
                  onClick={() => setLocalFilters({ ...localFilters, demand })}
                  className={`px-4 py-2 rounded-lg font-medium flex-1 ${
                    localFilters.demand === demand
                      ? 'bg-green-700 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {demand || t('All')}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">{t("State")}</h3>
            <select
              value={localFilters.state}
              onChange={(e) => setLocalFilters({ ...localFilters, state: e.target.value })}
              className="w-full p-3 bg-gray-100 rounded-lg outline-none text-gray-900"
            >
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">{t("Commodity")}</h3>
            <select
              value={localFilters.commodity}
              onChange={(e) => setLocalFilters({ ...localFilters, commodity: e.target.value })}
              className="w-full p-3 bg-gray-100 rounded-lg outline-none text-gray-900"
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
            className="flex-1 py-3 rounded-lg font-medium bg-gray-100 text-gray-700"
          >
            {t("Reset")}
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-3 rounded-lg font-medium bg-green-700 text-white"
          >
            {t("Apply Filters")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== LivePrice Component ====================
function LivePrice({ filters = {}, searchQuery = '' }) {
  const { t, i18n } = useTranslation(); 
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  
  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'summer';
    if (month >= 6 && month <= 9) return 'monsoon';
    if (month >= 10 && month <= 11) return 'autumn';
    return 'winter';
  };

  // const seasonalCommodities = {
  //   summer: ['Wheat', 'Barley', 'Chickpea', 'Mustard', 'Sunflower', 'Tomato', 'Onion'],
  //   monsoon: ['Rice', 'Maize', 'Bajra', 'Cotton', 'Soybean', 'Groundnut', 'Green Gram'],
  //   autumn: ['Rice', 'Maize', 'Sugarcane', 'Turmeric', 'Ginger', 'Chilli'],
  //   winter: ['Wheat', 'Potato', 'Cabbage', 'Cauliflower', 'Pea', 'Mustard', 'Chickpea']
  // };

  // const allStates = [
  //   'Jharkhand', 'Maharashtra', 'Punjab', 'Haryana', 'Uttar Pradesh', 
  //   'Madhya Pradesh', 'Gujarat', 'Rajasthan', 'Karnataka', 'Tamil Nadu',
  //   'Andhra Pradesh', 'West Bengal', 'Bihar', 'Odisha', 'Kerala'
  // ];

  // const commodityTypes = {
  //   'Rice': ['Basmati', 'Sona Masoori', 'IR-64', 'Swarna'],
  //   'Wheat': ['HD-2967', 'Lokwan', 'Sharbati', 'PBW-343'],
  //   'Tomato': ['Hybrid', 'Desi', 'Cherry'],
  //   'Onion': ['Red', 'White', 'Nasik Red'],
  //   'Potato': ['Kufri', 'Jyoti', 'Chandramukhi'],
  //   'Maize': ['Hybrid', 'Sweet Corn', 'Local'],
  //   'Cotton': ['Bt Cotton', 'Desi', 'Hybrid'],
  //   'Soybean': ['JS-335', 'JS-95-60', 'Local'],
  //   'default': ['Local', 'Hybrid', 'Standard']
  // };

    const seasonalCommodities = {
    summer: [t('Wheat'), t('Barley'), t('Chickpea'), t('Mustard'), t('Sunflower'), t('Tomato'), t('Onion')],
    monsoon: [t('Rice'), t('Maize'), t('Bajra'), t('Cotton'), t('Soybean'), t('Groundnut'), t('Green Gram')],
    autumn: [t('Rice'), t('Maize'), t('Sugarcane'), t('Turmeric'), t('Ginger'), t('Chilli')],
    winter: [t('Wheat'), t('Potato'), t('Cabbage'), t('Cauliflower'), t('Pea'), t('Mustard'), t('Chickpea')]
  };

  const allStates = [
    t('Jharkhand'), t('Maharashtra'), t('Punjab'), t('Haryana'), t('Uttar Pradesh'), 
    t('Madhya Pradesh'), t('Gujarat'), t('Rajasthan'), t('Karnataka'), t('Tamil Nadu'),
    t('Andhra Pradesh'), t('West Bengal'), t('Bihar'), t('Odisha'), t('Kerala')
  ];

  const commodityTypes = {
    [t('Rice')]: ['Basmati', 'Sona Masoori', 'IR-64', 'Swarna'],
    [t('Wheat')]: ['HD-2967', 'Lokwan', 'Sharbati', 'PBW-343'],
    [t('Tomato')]: ['Hybrid', 'Desi', 'Cherry'],
    [t('Onion')]: ['Red', 'White', 'Nasik Red'],
    [t('Potato')]: ['Kufri', 'Jyoti', 'Chandramukhi'],
    [t('Maize')]: ['Hybrid', 'Sweet Corn', 'Local'],
    [t('Cotton')]: ['Bt Cotton', 'Desi', 'Hybrid'],
    [t('Soybean')]: ['JS-335', 'JS-95-60', 'Local'],
    default: ['Local', 'Hybrid', 'Standard']
  };
  // OPTIMIZED: Fetch with reduced timeout and single retry
  const fetchCommodityPrice = async (state, commodity, district = '', retries = 1) => {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 seconds timeout
        
        const response = await fetch('https://commodity-price-api.onrender.com/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ state, commodity, district }),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.prediction && data.prediction.per_quintal) {
          return {
            priceNum: data.prediction.per_quintal,
            price: `₹${Math.round(data.prediction.per_quintal).toLocaleString('en-IN')}`,
            unit: t`/quintal`
          };
        }
        
        return null;
      } catch (err) {
        if (attempt === retries) {
          return null;
        }
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    return null;
  };

  const generateChange = () => {
    const changes = [-2.5, -1.8, -1.2, -0.5, 0, 0.5, 1.2, 2.1, 3.5, 5.2, 8.3, 12.5, 15.3];
    return changes[Math.floor(Math.random() * changes.length)];
  };

  const generateTime = () => {
    const minutes = Math.floor(Math.random() * 60);
    const hours = Math.floor(Math.random() * 5);
    // const min=t("min ago");
    if (minutes < 30 && hours === 0) {
      return `${minutes} ${t("minutes_ago")}`;
    } else if (hours === 0) {
      return `${minutes} ${t("minutes ago")}`;
    } else if(hours > 1){
      return `${hours} ${t("hours ago")}`;
    }else if(hours==1){
      return `${hours} ${t("hour ago")}`;
    }
  };

  // OPTIMIZED: Load in batches with progressive enhancement
  const loadInitialCrops = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const season = getCurrentSeason();
      const seasonalCrops = seasonalCommodities[season];
      const initialStates = ['Jharkhand', 'Maharashtra', 'Punjab', 'Gujarat'];
      const demands = ['High', 'High', 'Medium'];
      
      console.log('Loading initial crops for season:', season);
      
      // Load only 6 items first for fast initial render
      const batchSize = 6;
      const initialBatch = [];
      
      for (let i = 0; i < Math.min(seasonalCrops.length, batchSize); i++) {
        const commodity = seasonalCrops[i];
        const types = commodityTypes[commodity] || commodityTypes['default'];
        const state = initialStates[i % initialStates.length];
        const type = types[0];
        const demand = demands[i % demands.length];
        
        initialBatch.push({
          state,
          commodity,
          type,
          demand
        });
      }
      
      // Fetch first batch
      console.log(`Fetching initial batch of ${initialBatch.length} items...`);
      const batchPromises = initialBatch.map(async ({ state, commodity, type, demand }) => {
        const priceData = await fetchCommodityPrice(state, commodity);
        if (priceData) {
          return {
            name: commodity,
            type: type,
            demand: demand,
            location: t`${state} Mandi`,
            state: state,
            time: generateTime(),
            ...priceData,
            change: generateChange()
          };
        }
        return null;
      });
      
      const results = await Promise.all(batchPromises);
      const validCrops = results.filter(crop => crop !== null);
      
      console.log('✓ Initial batch loaded:', validCrops.length);
      
      // Show initial results immediately
      if (validCrops.length > 0) {
        setCrops(validCrops);
      }
      
      // Load remaining items in background
      setTimeout(async () => {
        const remainingBatch = [];
        for (let i = batchSize; i < seasonalCrops.length && remainingBatch.length < 6; i++) {
          const commodity = seasonalCrops[i];
          const types = commodityTypes[commodity] || commodityTypes['default'];
          const state = initialStates[i % initialStates.length];
          
          remainingBatch.push({
            state,
            commodity,
            type: types[0],
            demand: demands[i % demands.length]
          });
        }
        
        if (remainingBatch.length > 0) {
          console.log('Loading second batch in background...');
          const moreBatch = remainingBatch.map(async ({ state, commodity, type, demand }) => {
            const priceData = await fetchCommodityPrice(state, commodity);
            if (priceData) {
              return {
                name: commodity,
                type: type,
                demand: demand,
                location: t`${state} Mandi`,
                state: state,
                time: generateTime(),
                ...priceData,
                change: generateChange()
              };
            }
            return null;
          });
          
          const moreResults = await Promise.all(moreBatch);
          const moreCrops = moreResults.filter(crop => crop !== null);
          
          if (moreCrops.length > 0) {
            setCrops(prev => [...prev, ...moreCrops]);
            console.log('✓ Second batch loaded:', moreCrops.length);
          }
        }
      }, 1000);
      
      if (validCrops.length === 0) {
        setError('Unable to fetch commodity prices. Please check your API connection.');
      }
      
    } catch (err) {
      console.error('Error loading initial crops:', err);
      setError('Failed to load commodity data. Please try again.');
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };
  
  // OPTIMIZED: Load 4 items at a time instead of 6
  const loadMoreCrops = async () => {
    if (loading || !hasMore) return;
    
    console.log('Loading more crops...');
    setLoading(true);
    
    const allCommodities = Object.values(seasonalCommodities).flat();
    const uniqueCommodities = [...new Set(allCommodities)];
    const demands = ['High', 'High', 'Medium', 'Medium', 'Low'];
    
    const promises = Array.from({ length: 4 }, async () => {
      const randomState = allStates[Math.floor(Math.random() * allStates.length)];
      const randomCommodity = uniqueCommodities[Math.floor(Math.random() * uniqueCommodities.length)];
      const types = commodityTypes[randomCommodity] || commodityTypes['default'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      try {
        const priceData = await fetchCommodityPrice(randomState, randomCommodity);
        
        if (priceData) {
          console.log(`✓ Loaded more: ${randomCommodity} from ${randomState}`);
          return {
            name: randomCommodity,
            type: type,
            demand: demands[Math.floor(Math.random() * demands.length)],
            location: t`${randomState} Mandi`,
            state: randomState,
            time: generateTime(),
            ...priceData,
            change: generateChange()
          };
        }
      } catch (err) {
        console.error(`✗ Failed to fetch ${randomCommodity} from ${randomState}:`, err);
      }
      return null;
    });
    
    const results = await Promise.all(promises);
    const newCrops = results.filter(crop => crop !== null);
    
    console.log(`✓ Added ${newCrops.length} more crops. Total: ${crops.length + newCrops.length}`);
    
    setCrops(prev => [...prev, ...newCrops]);
    setLoading(false);
    
    if (crops.length + newCrops.length >= 50) {
      console.log('Reached maximum crops limit (50)');
      setHasMore(false);
    }
  };

  // Filtering Crops
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

  // OPTIMIZED: Throttled infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      
      if (scrollHeight - scrollTop - clientHeight < 300 && !loading && hasMore && !initialLoad) {
        console.log('Scroll triggered - loading more crops');
        loadMoreCrops();
      }
    };

    let scrollTimeout;
    const throttledScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        handleScroll();
        scrollTimeout = null;
      }, 200);
    };

    window.addEventListener('scroll', throttledScroll);
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [loading, hasMore, initialLoad, crops.length]);

  // Initial load
  useEffect(() => {
    loadInitialCrops();
  }, []);
  return (
    <div className="w-full mx-auto p-4 space-y-4">
      {/* Price Alert */}
      {filteredCrops.some(crop => crop.change > 10) && (
        <div className="bg-gradient-to-r from-green-50 to-yellow-50 border border-green-200 rounded-xl shadow-sm p-4 flex items-center justify-between">
          <div>
            <p className="font-medium text-green-700">{t("Price Alert!")}</p>
            <p className="text-sm text-gray-600">
              {filteredCrops.find(crop => crop.change > 10)?.name} {t("prices increased by")} {filteredCrops.find(crop => crop.change > 10)?.change}% – {t("Great time to sell")}
            </p>
          </div>
          <button className="bg-green-700 hover:bg-green-800 text-white rounded-full px-6 py-2 text-sm font-medium">
            {t("Sell Now")}
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-red-700 font-medium">Failed to load prices</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
          <button 
            onClick={loadInitialCrops}
            className="mt-2 text-red-600 underline text-sm"
          >
            {t("Try Again")}
          </button>
        </div>
      )}

      {/* Results Count */}
      {(searchQuery || filters.demand || filters.state !== 'All States' || filters.commodity !== 'All Commodities') && (
        <div className="text-sm text-gray-600 px-1">
          {filteredCrops.length} {filteredCrops.length === 1 ? 'result' : 'results'} {t("found")}
        </div>
      )}

      {/* No Results */}
      {!loading && filteredCrops.length === 0 && !initialLoad && (
        <div className="text-center py-10">
          <div className="text-gray-400 text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">{t("No crops found")}</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Initial Loading */}
      {initialLoad && loading && (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-700 border-t-transparent mb-4"></div>
          <p className="text-gray-600 font-medium">{t("Loading seasonal commodities...")}</p>
          <p className="text-gray-500 text-sm mt-2">{t("Fetching live prices from multiple states")}</p>
        </div>
      )}

      {/* Crop Cards */}
      {filteredCrops.map((crop, idx) => (
        <div key={`${crop.name}-${crop.state}-${idx}`} className="border rounded-xl shadow-sm p-4 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-semibold">{crop.name}</h2>
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md">{crop.type}</span>
              <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                crop.demand === "High" ? "bg-green-100 text-green-700" :
                crop.demand === "Medium" ? "bg-orange-100 text-orange-700" :
                "bg-red-100 text-red-700"
              }`}>
                {t(crop.demand)} {t("Demand")}
              </span>
            </div>
            <p className="text-sm text-gray-500">{t(crop.location)} • {t(crop.time)}</p>
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
                <span className="flex items-center text-gray-500"><Minus size={14} className="mr-1" /> {t("No change")}</span>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Loading More Indicator */}
      {loading && !initialLoad && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-700 border-t-transparent"></div>
          <p className="text-gray-500 mt-2 text-sm">{t("Loading more prices...")}</p>
        </div>
      )}

      {/* End of Results */}
      {!hasMore && !loading && filteredCrops.length > 0 && (
        <div className="text-center py-4 text-gray-500 text-sm">
          {t("No more commodities to load")}
        </div>
      )}
    </div>
  );
}

// ==================== Main Markethub Component ====================
function Markethub() {
  const { t, i18n } = useTranslation(); 
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
          <p className="text-white bg-[#c2b7ae] rounded-3xl flex justify-center items-center py-3 px-3 text-2xl">
            <span class="material-symbols-outlined">trending_up</span>
          </p>
          <div className="px-3">
            <h2 className="text-[#0f3300] text-xl font-bold">{t("Market Intelligence")}</h2>
            <p className="text-[#0f3300] text-md">{t("Live prices, buyers & transport")}</p>
          </div>
        </article>
        <p className="ml-auto text-2xl">
          <span class="material-symbols-outlined">notifications</span>
        </p>
      </section>
      <hr className="bg-[#fff9eb] h-0.5" />


      {/* ==================== Search & Filter ==================== */}
       <section className='p-3'>      
        <div className="relative w-full flex">
          <section className="absolute  p-3  text-gray-500">
            <span class="material-symbols-outlined">search</span>
          </section>
          <input 
            type="text" 
            placeholder={t("Search Crops, Market, Buyers")} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#fff9eb] p-3 pl-10 pr-10 w-full rounded-xl outline-none"
          />
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <section className="text-gray-500" >
              <span class="material-symbols-outlined">filter_alt</span>
            </section>
            {activeFiltersCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
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
          {t("Live Prices")}
        </button>

        <button
          onClick={() => setCurrentView('findbuyers')}
          className={`w-1/2 py-2 rounded-lg font-medium ${
            currentView === 'findbuyers' ? 'bg-[#0f3300] text-white' : 'bg-[#fff9eb] text-[#0f3300]'
          }`}
        >
          {t("Find Buyers")}
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
        // <LivePrice filters={filters} searchQuery={searchQuery} key={JSON.stringify(filters) + searchQuery}/>
        <LivePrice filters={filters} searchQuery={searchQuery} key={JSON.stringify(filters)} />

      )}
      
      {currentView === 'findbuyers' && (
        <FindBuyers filters={filters} searchQuery={searchQuery} key={JSON.stringify(filters) + searchQuery}/>
        // <FindBuyers filters={filters} searchQuery={searchQuery} key={JSON.stringify(filters)}/>

      )}
    </div>
  );
}
export default Markethub;