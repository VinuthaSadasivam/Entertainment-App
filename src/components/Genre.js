import React, { useEffect } from "react";
import { Chip } from "@material-ui/core";
import axios from "axios";

const Genre = ({
  type,
  setPage,
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((e) => e.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(selectedGenres.filter((e) => e.id !== genre.id));
    setGenres([...genres, genre]);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en`,
      {
        header: {
          accept: "application/json",
        },
      }
    );

    setGenres(data.genres);
    console.log(data);
  };

  useEffect(() => {
    fetchGenres();
    // eslint-disable-next-line
  }, []);
  return (
    <div styel={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            style={{ margin: "2px" }}
            key={genre.id}
            label={genre.name}
            size="small"
            color="primary"
            clickable
            onClick={() => handleAdd(genre)}
            onDelete={() => handleRemove(genre)}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            style={{ margin: "2px" }}
            key={genre.id}
            label={genre.name}
            size="small"
            clickable
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genre;
