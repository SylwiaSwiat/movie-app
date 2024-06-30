import { Chip } from "@mui/material";
import { useEffect } from "react";
import { apiKey } from "../App";

const Genres = ({
  filteredGenres,
  genres,
  setGenres,
  setFilteredGenres,
  setPage,
  type,
}) => {
  const getGenres = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${apiKey}&language=en-US`
    );
    const data = await res.json();
    setGenres(data.genres);
  };

  useEffect(() => {
    getGenres();
    // eslint-disable-next-line
  }, []);

  const handleChangeGenre = (genre) => {
    setFilteredGenres([...filteredGenres, genre]);
    setGenres(genres.filter((item) => item.id !== genre.id));
    setPage(1);
  };

  const removeGenre = (genre) => {
    setFilteredGenres(filteredGenres.filter((item) => item.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
  };

  return (
    <div className="genres">
      {filteredGenres &&
        filteredGenres.map((genre) => (
          <Chip
            variant="outlined"
            label={genre.name}
            id={genre.id}
            key={genre.id}
            style={{
              margin: 10,
              padding: 5,
              color: "#15181d",
              background: "#eeeeee",
            }}
            clickable
            onDelete={() => removeGenre(genre)}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            variant="outlined"
            label={genre.name}
            id={genre.id}
            key={genre.id}
            style={{ margin: 10, padding: 5, color: "#eeeeee" }}
            clickable
            onClick={() => handleChangeGenre(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
