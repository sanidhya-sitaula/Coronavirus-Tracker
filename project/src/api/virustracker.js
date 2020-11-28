import Axios from "axios";
import React from 'react'; 
const url = "https://covid19.mathdro.id/api"; 


export const fetchData = async (country) => {
    let changeableUrl = url;
  
    if (country) {
      changeableUrl = `${url}/countries/${country}`;
    }
  
    try {
      const { data: { confirmed, recovered, deaths, lastUpdate } } = await Axios.get(changeableUrl);
  
      return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
      return error;
    }
  };
  

  export const fetchDailyData = async () => {
    try {
      const { data } = await Axios.get(`${url}/daily`);
  
      return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
    } catch (error) {
      return error;
    }
  };
  
  export const fetchCountries = async () => {
    try {
      const { data: { countries } } = await Axios.get(`${url}/countries`);
  
      return countries.map((country) => country.name);
    } catch (error) {
      return error;
    }
  };