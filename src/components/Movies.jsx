import { apiKey } from "../App";
import { useState, useEffect } from "react";
import PaginationComponent from "./PaginationComponent";
import Items from "./Items";
import Genres from "./Genres";
import useGenres from "../useGenres";

const Movies = ({ searchItem }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredGenres, setFilteredGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [isActive, setIsActive] = useState(false);

  const genreUrl = useGenres(filteredGenres);
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreUrl}`;

  const getMovies = async () => {
    if (searchItem === "") {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
      setNumOfPages(500);
    } else {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchItem}&page=${page}&include_adult=false&with_genres=${genreUrl}`
      );
      const data = await res.json();
      setMovies(data.results);
      setNumOfPages(500);
      setIsActive(false);
    }
  };

  const handleActive = () => {
    setIsActive(!isActive);
  };
  useEffect(() => {
    getMovies();
    // eslint-disable-next-line
  }, [page, genreUrl, searchItem]);
  return (
    <div className="container">
      {numOfPages < 1 && <h2>No results</h2>}
      {numOfPages > 0 && searchItem === "" && (
        <button onClick={handleActive} className="categoriesBtn">
          Categories
        </button>
      )}
      {isActive && (
        <Genres
          type="movie"
          filteredGenres={filteredGenres}
          setFilteredGenres={setFilteredGenres}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}
        />
      )}
      <div className="itemsBox">
        {movies?.map((item) => (
          <Items
            page={page}
            genreUrl={genreUrl}
            key={item.id}
            id={item.id}
            title={item.title || item.name}
            image={item.poster_path}
            date={item.first_air_date || item.release_date}
            rate={item.vote_average}
            overview={item.overview}
            setPage={setPage}
            type="movie"
          />
        ))}
      </div>

      {numOfPages > 1 && movies && movies.length && (
        <PaginationComponent setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Movies;
