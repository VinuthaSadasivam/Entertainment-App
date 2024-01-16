const useGenre = (selectedGenres) => {
  if (selectedGenres < 1) return "";

  const genreId = selectedGenres.map((g) => g.id);
  return genreId.reduce((p, c) => p + "," + c);
  
};
export default useGenre;
