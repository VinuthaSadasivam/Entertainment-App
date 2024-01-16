import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Trending.css";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`,
      {
        header: {
          Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
          accept: "application/json",
        },
      }
    );

    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <span className="pageTitle"> Trending </span>

      <div className="trending">
        {content &&
          content.map((e) => (
            <SingleContent
              key={e.id}
              id={e.id}
              poster={e.poster_path}
              title={e.name || e.title}
              date={e.first_air_date || e.release_date}
              media_type={e.media_type}
              vote_average={e.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
