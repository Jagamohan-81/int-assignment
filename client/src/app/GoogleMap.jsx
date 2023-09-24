"use client";
import React, { useEffect, useState } from "react";

const GoogleMap = () => {
  const key = "AIzaSyDqIrqD7WLhLNEXocCc3rX0XU-KCbm1k_M";
  const suggestionsEndpoint = "http://localhost:3001/location/get-list";

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // const handleSearch = (Location) => {
  //   try {
  //     if (Location) {
  //       console.log("Loc", Location );
  //       const { latitude, longitude, name } = Location;
  //       initMap(Number(latitude), Number(longitude), name);
  //     } else {
  //       alert("No location selected.");
  //     }
  //   } catch (error) {
  //     console.error("Error handling search:", error);
  //   }
  // };
  const handleSearch = async (Location) => {
    setSuggestions([]);
    try {
      const { latitude, longitude, name } = Location;
      if (name) {
        initMap(Number(latitude), Number(longitude), name);
      } else if (searchTerm) {
        const response = await fetch(`${suggestionsEndpoint}/${searchTerm}`);
        const data = await response.json();
        if (data && data.data[0]) {
          const location = data.data[0];
          const { latitude, longitude, name } = location;
          initMap(Number(latitude), Number(longitude), name);
        } else {
          alert("No results found for the provided location.");
        }
      } else {
        alert("Please enter a location or select from suggestions.");
      }
    } catch (error) {
      console.error("Error handling search:", error);
    }
  };

  const handleSuggestionClick = (location) => {
    setSuggestions([]);
    setSearchTerm(location.name);
    setSelectedLocation(location);
    handleSearch(location);
  };

  const initMap = (lat = 22.5726, lng = 88.3639, placeName = "Kolkata") => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat, lng },
      zoom: 15,
    });

    // Add a marker for the searched place
    new window.google.maps.Marker({
      position: { lat, lng },
      map,
      title: placeName,
    });
  };

  const loadSuggestions = async () => {
    try {
      const response = await fetch(`${suggestionsEndpoint}/${searchTerm}`);
      const data = await response.json();
      console.log(data, "data----");
      setSuggestions(data?.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const loadMapScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
        script.async = true;
        script.defer = true;

        script.addEventListener("load", () => {
          initMap();
        });

        document.body.appendChild(script);
      } else {
        initMap();
      }
    };

    loadMapScript();
  }, [key]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      loadSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (selectedLocation) {
      initMap(
        selectedLocation.lat,
        selectedLocation.lng,
        selectedLocation.name
      );
    }
  }, [selectedLocation]);

  return (
    <div className="flex flex-col items-center mt-8 relative">
      <div className="mb-4 flex items-center relative">
        <input
          type="text"
          className="border border-gray-400 p-2 w-64 rounded-l"
          placeholder="Enter a location"
          value={searchTerm}
          onChange={(e) => handleChange(e)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {suggestions && suggestions.length > 0 && (
        <ul className="bg-white border border-gray-400 p-2 w-64 absolute z-10 mt-20">
          {suggestions.map((location, index) => (
            <li
              key={index}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(location)}
            >
              {location.name}
            </li>
          ))}
        </ul>
      )}

      <div
        id="map"
        className="mt-6 rounded shadow-lg"
        style={{ height: "60vh", width: "80%" }}
      ></div>

      {selectedLocation && (
        <div
          className="mt-6 absolute z-20 hidden md:block"
          style={{ top: "70px", right: "155px" }}
        >
          <ul className="bg-white border border-gray-400 p-2 w-64">
            <li className="cursor-pointer hover:bg-gray-100">
              <strong>{selectedLocation.remark}</strong>
            </li>
            <li className="cursor-pointer hover:bg-gray-100">
              <strong>Name : </strong> {selectedLocation.name}
            </li>
            <li className="cursor-pointer hover:bg-gray-100">
              <strong>Longitude : </strong> {selectedLocation.longitude}
            </li>
            <li className="cursor-pointer hover:bg-gray-100">
              <strong>Latitude : </strong> {selectedLocation.latitude}
            </li>
            <li className="cursor-pointer hover:bg-gray-100">
              <strong>Temperature :</strong> {selectedLocation.temprature}{" "}
              <sup>°</sup> C
            </li>
            <li className="cursor-pointer hover:bg-gray-100">
              <strong>State :</strong> {selectedLocation.state}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
