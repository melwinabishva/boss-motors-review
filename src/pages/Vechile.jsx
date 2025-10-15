
import React, { useContext, useState, useMemo } from "react";
import { DataContext } from "../context/DataContext";
import { Search, Filter, Car, X, ChevronDown, ChevronUp } from "lucide-react";
import VehicleModal from './model/VehicleModal';

const Vehicle = () => {
  const { vehicles, loading } = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [makeFilter, setMakeFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!vehicles || vehicles.length <= 1) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
        <Car size={64} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-600 mb-2">No vehicles available</h2>
        <p className="text-gray-500">Check back later for new arrivals</p>
      </div>
    );
  }

  const vehicleList = vehicles.slice(1);

  // Memoized filtered vehicles
  const filteredVehicles = useMemo(() => {
    return vehicleList.filter(([id, make, model, , variant]) => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        make.toLowerCase().includes(query) ||
        model.toLowerCase().includes(query) ||
        variant.toLowerCase().includes(query);

      const matchesMake = !makeFilter || make === makeFilter;

      return matchesSearch && matchesMake;
    });
  }, [searchTerm, makeFilter, vehicleList]);

  const uniqueMakes = useMemo(() => [...new Set(vehicleList.map(([_, make]) => make))], [vehicleList]);

  const hasActiveFilters = searchTerm || makeFilter;

  const clearFilters = () => {
    setSearchTerm("");
    setMakeFilter("");
    setShowFilters(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-[64px] z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">      <div className="flex items-center justify-between gap-3">
          {/* Title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-gray-900 truncate">Vehicles</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {filteredVehicles.length} {filteredVehicles.length === 1 ? 'vehicle' : 'vehicles'} available
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-32 xs:w-40 border border-gray-300 rounded-lg pl-8 pr-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-1 px-2 py-1.5 border rounded-lg text-sm transition-colors ${hasActiveFilters
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <Filter size={14} />
                <span className="hidden xs:inline">Filter</span>
                {hasActiveFilters && <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>}
                {showFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {/* Filter Dropdown */}
              {showFilters && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[160px]">
                  <div className="p-2 space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Make</label>
                      <select
                        value={makeFilter}
                        onChange={(e) => setMakeFilter(e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">All Makes</option>
                        {uniqueMakes.map(make => <option key={make} value={make}>{make}</option>)}
                      </select>
                    </div>

                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="w-full text-center text-xs text-blue-600 hover:text-blue-700 pt-2 border-t"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

          {/* Active Filter Pills */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {searchTerm && (
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm("")} className="hover:text-blue-900">
                    <X size={10} />
                  </button>
                </span>
              )}
              {makeFilter && (
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                  Make: {makeFilter}
                  <button onClick={() => setMakeFilter("")} className="hover:text-blue-900">
                    <X size={10} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Vehicle Cards */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filteredVehicles.map(vehicle => {
              const [id, make, model, , variant, imageURL] = vehicle;
              return (
                <div
                  key={id}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200 cursor-pointer group"
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={imageURL || "/api/placeholder/300/200"}
                      alt={`${make} ${model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-2">
                    <h2 className="font-semibold text-sm text-gray-900 truncate mb-0.5">{make} {model}</h2>
                    <p className="text-gray-600 text-xs truncate">{variant}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Car size={48} className="text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No vehicles found</h3>
            <p className="text-gray-500 text-sm mb-4">
              {searchTerm ? `No results for "${searchTerm}"` : "No vehicles match your filters"}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>

      <VehicleModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />
    </div>
  );
};

export default Vehicle;
