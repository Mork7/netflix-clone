import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "./axios";
import requests from "./Requests";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
        const request = await axios.get(requests.fetchNetflixOriginals);
        setMovie(
            request.data.results[
                //generate random number form 0 all the way to length of results -1.
                Math.floor(Math.random() * request.data.results.length-1)
            ]
        )
        return request;
    }

    fetchData();
  }, []);

  console.log(movie);

  // if string requested from api is greater than number of chars specified, we create a substring of chars 0 to num of chars - 1 in length, and add ... to the end, indicating there is more to the description.
  function truncate(string, number_of_characters) {
    return string?.length > number_of_characters
      ? string.substr(0, number_of_characters - 1) + "..."
      : string;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
