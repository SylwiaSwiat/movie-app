import { useState, useEffect } from "react";
import Items from "./Items";
import PaginationComponent from "./PaginationComponent";
import { apiKey } from "../App";

const Persons = ({ searchItem }) => {
  const [persons, setPersons] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();

  const url = `https://api.themoviedb.org/3/trending/person/day?api_key=139d01b05b0da0f486bb336ef87b9e2f&page=${page}`;

  const getPersons = async () => {
    if (searchItem === "") {
      const res = await fetch(url);
      const data = await res.json();
      setPersons(data.results);
      setNumOfPages(500);
    } else {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&language=en-US&query=${searchItem}&page=${page}&include_adult=false`
      );
      const data = await res.json();
      setPersons(data.results);
      setNumOfPages(500);
    }
  };

  useEffect(() => {
    getPersons();
    // eslint-disable-next-line
  }, [page, searchItem]);

  return (
    <div className="container">
      {numOfPages < 1 && <h2>No results</h2>}

      <div className="itemsBox">
        {persons?.map((item) => (
          <Items
            page={page}
            key={item.id}
            id={item.id}
            title={item.title || item.name}
            image={item.poster_path || item.profile_path}
            date={item.first_air_date || item.release_date}
            rate={item.vote_average}
            overview={item.overview}
            setPage={setPage}
            type="person"
          />
        ))}
      </div>

      {numOfPages > 1 && persons && persons.length && (
        <PaginationComponent setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Persons;
