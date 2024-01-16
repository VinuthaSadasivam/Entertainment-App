import React from "react";
import { img_300 } from "../../config/config";
import { unavailable } from "../../config/config";
import "./SingleContent.css";
import { Badge } from "@material-ui/core";
import ContentModal from "../ContentModal/ContentModal";

const SingleContent = ({
  id,
  poster,
  title,
  media_type,
  date,
  vote_average,
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
      />
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <div className="subTitleMain">
        <span className="subTitle">
          {media_type === "tv" ? "Tv Series" : "Movie"}
        </span>
        <span className="subTitle">{date}</span>
      </div>
    </ContentModal>
  );
};

export default SingleContent;
