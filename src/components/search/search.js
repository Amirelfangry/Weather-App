import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";
// const fetch = require('node-fetch');

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    const response = await fetch(
      `${GEO_API_URL}/cities?namePrefix=${inputValue}`,
      geoApiOptions
    );
    const result = await response.json();
    console.log(result.data);
    return {
      options: result.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      }),
    };
  };
  // const loadOptions = async () => {
  //   const url = "https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions";
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": "ded15f14d1mshc13b9c099d1302bp1955b0jsn0ea4256cf7a5",
  //       "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  //     },
  //   };

  //   try {
  //     const response = await fetch(url, options);
  //     const result = await response.json();
  //     setSearch(result.data);
  //     console.log(result.data);
  //     return {
  //       options: result.data.map((city) => {
  //         return {
  //           value: `${city.latitude} ${city.longitude}`,
  //           label: `${city.name}, ${city.countryCode}`,
  //         };
  //       }),
  //     };
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      min
      loadOptions={loadOptions}
    />
  );
};

export default Search;
