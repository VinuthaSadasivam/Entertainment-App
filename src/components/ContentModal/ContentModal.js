import React, { useEffect, useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";
import axios from "axios";
import YouTubeIcon from "@material-ui/icons/YouTube";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import "./ContentModal.css";
import "../SingleContent/SingleContent.css";
import Caroussel from "../Caroussel/Caroussel";

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState([]);
  const [video, setVideo] = useState();

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
      {
        header: {
          Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
          accept: "application/json",
        },
      }
    );

    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
      {
        header: {
          Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
          accept: "application/json",
        },
      }
    );
    console.log(data);
    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="media" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "90%",
              height: "90%",
              backgroundColor: "#39445a",
              border: "1px solid #282c34",
              color: "white",
              boxShadow: 24,
              padding: "8 8 24",
              borderRadius: 10,
            }}
          >
            {content && (
              <div className="ContentModal">
                <img
                  className="ContentModal_portrait"
                  style={{ borderRadius: 10 }}
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.title || content.name}
                />
                <img
                  className="ContentModal_landscape"
                  style={{ borderRadius: 10 }}
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.title || content.name}
                />
                <div className="ContentModal_about">
                  <span className="ContentModal_title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "----"
                    ).substring(0, 4)}
                    )
                  </span>
                  <span className="tagline">
                    <i>{content.tagline}</i>
                  </span>
                  <span className="ContentModal_description">
                    {content.overview}
                  </span>
                  <div>
                    <Caroussel media_type={media_type} id={id} />
                  </div>
                  <Button
                    variant="contained"
                    target="_blank"
                    color="secondary"
                    href={`https://www.youtube.com/watch?v=${video}`}
                    startIcon={<YouTubeIcon />}
                  >
                    Watch the trailer
                  </Button>
                  <div></div>
                </div>
              </div>
            )}
          </div>
        </Fade>
      </Modal>
    </>
  );
}

// style={{backgroundColor: "white", height: "100px", width: "100px", margin: "20px", objectFit:"contain"}}
