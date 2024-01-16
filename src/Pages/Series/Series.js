import React, { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import axios from "axios";
import useGenre from "../../Hooks/useGenre";
import Genre from "../../components/Genre";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genreforURL = useGenre(selectedGenres);

  const fetchTvSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreforURL}`,
      {
        header: {
          Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
          accept: "application/json",
        },
      }
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchTvSeries();
    // eslint-disable-next-line
  }, [page, genreforURL]);
  return (
    <div>
      <span className="pageTitle">Tv Series</span>
      <Genre
        type="tv"
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((e) => (
            <SingleContent
              key={e.id}
              id={e.id}
              poster={e.poster_path}
              date={e.first_air_date || e.release_date}
              media_type="tv"
              vote_average={e.vote_average}
            />
          ))}
      </div>

      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Series;
