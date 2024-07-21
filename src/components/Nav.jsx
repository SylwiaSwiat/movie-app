import "./Nav.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Nav = () => {
  const [isActiveTrending, setIsActiveTrending] = useState(false);
  const [isActiveMovies, setISActiveMovies] = useState(false);
  const [isActiveSeries, setIsActiveSeries] = useState(false);
  const [isActivePersons, setIsActivePersons] = useState(false);

  const handleActiveNav = () => {
    const link = window.location.pathname;
    window.scroll(0, 0);
    if (link === "/movies") {
      setIsActiveTrending(false);
      setIsActiveSeries(false);
      setISActiveMovies(true);
      setIsActivePersons(false);
    } else if (link === "/series") {
      setISActiveMovies(false);
      setIsActiveTrending(false);
      setIsActiveSeries(true);
      setIsActivePersons(false);
    } else if (link === "/persons") {
      setISActiveMovies(false);
      setIsActiveSeries(false);
      setIsActiveTrending(false);
      setIsActivePersons(true);
    } else {
      setISActiveMovies(false);
      setIsActiveSeries(false);
      setIsActiveTrending(true);
      setIsActivePersons(false);
    }
  };

  useEffect(() => {
    handleActiveNav();
  }, []);

  return (
    <div className="navContainer">
      <ul>
        <li onClick={handleActiveNav}>
          <Link
            to="/"
            className={`navLink ${isActiveTrending && "activeLink"}`}
          >
            Trending
          </Link>
        </li>
        <li onClick={handleActiveNav}>
          <Link
            to="/movies"
            className={`navLink ${isActiveMovies && "activeLink"} `}
          >
            Movies
          </Link>{" "}
        </li>
        <li onClick={handleActiveNav}>
          <Link
            to="/series"
            className={`navLink ${isActiveSeries && "activeLink"}`}
          >
            Series
          </Link>{" "}
        </li>
        <li onClick={handleActiveNav}>
          <Link
            to="/persons"
            className={`navLink ${isActivePersons && "activeLink"}`}
          >
            Persons
          </Link>{" "}
        </li>
      </ul>
    </div>
  );
};

export default Nav;
