const useGenres = (filteredGenres) => {
  if (!filteredGenres.length) return "";

  const idArray = filteredGenres.map((item) => item.id);

  return idArray.reduce((acc, current) => acc + "," + current);
};

export default useGenres;
