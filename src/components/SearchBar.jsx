import "./SearchBar.css";

const SearchBar = ({ setSearchItem }) => {
  return (
    <div className="searchBarContainer">
      <i className="fas fa-search"></i>
      <input
        type="text"
        placeholder="Search..."
        className="search"
        onChange={(e) => setSearchItem(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
