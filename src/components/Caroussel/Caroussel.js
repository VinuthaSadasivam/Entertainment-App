import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../config/config";
import "./Caroussel.css";

const handleDragStart = (e) => e.preventDefault();

const Caroussel = ({ media_type, id }) => {
  const [cast, setCast] = useState([]);

  const items = cast?.map((e) => (
    <div className="CarousselItem">
      <img
        src={e.profile_path ? `${img_300}/${e.profile_path}` : noPicture}
        alt={e?.name}
        onDragStart={handleDragStart}
        className="CarousselItem_img"
      />
      <b className="Caroussel_text">{e.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },

    1024: {
      items: 7,
    },
  };

  const fetchCast = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
      {
        header: {
          Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
          accept: "application/json",
        },
      }
    );

    setCast(data.cast);
  };

  useEffect(() => {
    fetchCast();
    // eslint-disable-next-line
  }, []);

  return (
    <AliceCarousel
      mouseTracking
      items={items}
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      autoPlay
    />
  );
};

export default Caroussel;
