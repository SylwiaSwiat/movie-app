import "./Header.css";
import Nav from "./Nav";
import SearchBar from "./SearchBarr";

const Header = ({ handleTop, searchItem, setSearchItem }) => {
  return (
    <div className="header">
      <div className="leftSide">
        <h1 onClick={handleTop}>Super Movie App </h1>
        <Nav />
      </div>
      <SearchBar searchItem={searchItem} setSearchItem={setSearchItem} />
    </div>
  );
};

export default Header;
