import React, { useContext, useState, useMemo, useRef, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { Search, Filter, Car, X, Grid, List, Star, MapPin } from "lucide-react";
import VehicleModal from "./model/VehicleModal";
import { useViewMode } from "../context/ViewModeProvider";

const Vehicle = () => {
  const { vehicles, loading } = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [makeFilter, setMakeFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const { viewMode, setViewMode } = useViewMode();
  const filterRef = useRef(null);

  // Close filters when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading vehicles...</p>
        </div>
      </div>
    );
  }

  if (!vehicles || vehicles.length <= 1) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 text-center p-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200/50">
          <Car size={80} className="text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-700 mb-3">No vehicles available</h2>
          <p className="text-gray-500 max-w-sm">We're updating our inventory. Check back soon for new arrivals.</p>
        </div>
      </div>
    );
  }

  const vehicleList = vehicles.slice(1);

  const filteredVehicles = useMemo(() => {
    return vehicleList.filter(([id, make, model, year, variant, imageURL, price, location]) => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        make.toLowerCase().includes(query) ||
        model.toLowerCase().includes(query) ||
        variant.toLowerCase().includes(query);
      const matchesMake = !makeFilter || make === makeFilter;
      return matchesSearch && matchesMake;
    });
  }, [searchTerm, makeFilter, vehicleList]);

  const uniqueMakes = useMemo(
    () => [...new Set(vehicleList.map(([_, make]) => make))].sort(),
    [vehicleList]
  );

  const hasActiveFilters = searchTerm || makeFilter;

  const clearFilters = () => {
    setSearchTerm("");
    setMakeFilter("");
    setShowFilters(false);
  };

  const totalVehicles = vehicleList.length;
  const showingCount = filteredVehicles.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Sticky Header */}
      <div className="bg-white border-b border-gray-200 sticky top-[60px] sm:top-[64px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-3 mb-3">
            {/* Left Header Section */}
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="bg-blue-100 p-1.5 rounded-lg">
                <Car className="text-blue-600" size={18} />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-gray-900 truncate">Choose Your Vehicle</h1>
                <p className="text-xs text-gray-500 truncate">
                  {showingCount} of {totalVehicles} shown
                </p>
              </div>
            </div>

            {/* Right Header Controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Search (Desktop) */}
              <div className="relative hidden xs:block">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-32 border border-gray-300 rounded-lg pl-8 pr-2 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Filter & View Mode */}
              <div className="flex items-center gap-1 border border-gray-300 rounded-lg bg-white/80 p-1">
                <div className="relative" ref={filterRef}>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-1 px-2 py-1.5 rounded-md text-sm transition-all ${hasActiveFilters
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <Filter size={16} />
                    {hasActiveFilters && (
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                    )}
                  </button>

                  {showFilters && (
                    <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 min-w-[140px]">
                      <div className="p-2 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-700">Make</span>
                          {makeFilter && (
                            <button
                              onClick={() => setMakeFilter("")}
                              className="text-blue-600 hover:text-blue-700 text-xs"
                            >
                              Clear
                            </button>
                          )}
                        </div>
                        <select
                          value={makeFilter}
                          onChange={(e) => setMakeFilter(e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">All Makes</option>
                          {uniqueMakes.map((make) => (
                            <option key={make} value={make}>
                              {make}
                            </option>
                          ))}
                        </select>

                        {hasActiveFilters && (
                          <button
                            onClick={clearFilters}
                            className="w-full text-center text-xs text-blue-600 hover:text-blue-700 pt-1 border-t border-gray-200"
                          >
                            Clear all
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="h-4 w-px bg-gray-300"></div>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded transition-colors ${viewMode === "grid"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  <Grid size={14} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded transition-colors ${viewMode === "list"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  <List size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Search (Mobile) */}
          <div className="xs:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {searchTerm && (
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                  "{searchTerm}"
                  <button onClick={() => setSearchTerm("")} className="hover:text-blue-900">
                    <X size={10} />
                  </button>
                </span>
              )}
              {makeFilter && (
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                  {makeFilter}
                  <button onClick={() => setMakeFilter("")} className="hover:text-blue-900">
                    <X size={10} />
                  </button>
                </span>
              )}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                >
                  Clear all
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6">
        {filteredVehicles.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4"
                : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            }
          >



            {filteredVehicles.map((vehicle) => {
              const [id, make, model, year, variant, imageURL, price, location, rating] = vehicle;
              return (
                <div
                  key={id}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className={`group cursor-pointer transition-all duration-200 hover:transform hover:scale-[1.02] ${viewMode === "list"
                    ? "bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200/60 p-3 flex items-start gap-3"
                    : "bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200/60 overflow-hidden"
                    }`}
                >
                  <div
                    className={
                      viewMode === "list"
                        ? "w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden"
                        : "relative overflow-hidden aspect-[4/3]"
                    }
                  >
                    <img
                      src={imageURL || "/api/placeholder/400/300"}
                      alt={`${make} ${model}`}
                      className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${viewMode === "list" ? "rounded-lg" : ""
                        }`}
                    />
                  </div>

                  <div className={viewMode === "list" ? "flex-1 min-w-0" : "p-3"}>
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate text-sm">
                          {make} {model}
                        </h3>
                        <p className="text-gray-600 text-xs truncate">{variant}</p>
                      </div>
                      {price && (
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-gray-900 text-sm">${price}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        {location && viewMode === "grid" && (
                          <div className="flex items-center gap-0.5">
                            <MapPin size={12} />
                            <span className="truncate max-w-[60px]">{location}</span>
                          </div>
                        )}
                        {rating && (
                          <div className="flex items-center gap-0.5">
                            <Star size={12} className="text-yellow-400 fill-current" />
                            <span className="font-medium">{rating}</span>
                          </div>
                        )}
                      </div>
                      {viewMode === "list" && (
                        <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                          View →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 max-w-md mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200/50">
              <Car size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-700 mb-2">No vehicles found</h3>
              <p className="text-gray-500 text-sm mb-4">
                {searchTerm
                  ? `No results for "${searchTerm}"`
                  : "No vehicles match your filters"}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <VehicleModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />
    </div>
  );
};

export default Vehicle;
