import axios from "axios";
import React, { useState, useContext, useEffect, createContext } from "react";

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, message: "" });
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [people, setPeople] = useState([]);
  const imgPrefix = "https://image.tmdb.org/t/p/w500";

  const fetchData = async (media_type, callback, hasId = false, id = "") => {
    let API_ENDPOINT = "";
    if (!hasId) {
      API_ENDPOINT = `https://api.themoviedb.org/3/${media_type}?api_key=${process.env.REACT_APP_API_KEY}`;
    } else {
      API_ENDPOINT = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}`;
    }
    setIsLoading(true);
    try {
      let { data } = await axios.get(API_ENDPOINT);
      callback(data.results || data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError({ show: true, message: error.message });
    }
  };
  
  useEffect(() => {
    fetchData("trending/all/day", setTrending);
    fetchData("discover/movie", setMovies);
    fetchData("discover/tv", setTvShows);
    fetchData("trending/person/day", setPeople);
  }, []);
  return (
    <AppContext.Provider
      value={{
        isLoading,
        tvShows,
        movies,
        people,
        trending,
        error,
        imgPrefix,
        fetchData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
