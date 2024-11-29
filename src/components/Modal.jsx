import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { apiKey } from "../App";
import { useState } from "react";
import { useEffect } from "react";
import "./Modal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "90%",
  border: "none",
  boxShadow: 24,
  borderRadius: "10px",
  background: "rgba(21, 24, 29, .98)",
  p: 4,
  padding: "20px",
};

export default function TransitionsModal({
  children,
  image,
  imgLink,
  page,
  genreUrl,
  overview,
  title,
  rate,
  date,
  type,
  id,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    if (type === "person") {
      getPersonDetail();
    } else {
      getVideo();
    }

    getImage();
  };
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const [images, setImages] = useState();
  const [personDetails, setPsersonDetails] = useState([]);
  const personDetailsUrl = `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=en-US`;

  const getPersonDetail = async () => {
    const res = await fetch(personDetailsUrl);
    const data = await res.json();
    setPsersonDetails(data);
  };

  const getMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreUrl}`
    );
    const data = await res.json();
    setContent(data.results);
  };
  const getVideo = async () => {
    if (content) {
      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}&language=en-US`
      );
      const data = await res.json();
      const trailers = data.results.filter((el) => el.type === "Trailer");

      setVideo(data.results && trailers[0]?.key);
    }
  };

  const getImage = async () => {
    if (content) {
      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${apiKey}&?include_image_language=en`
      );
      const data = await res.json();

      if (type === "person") {
        return;
      } else {
        setImages(data.backdrops[0]?.file_path);
      }
    }
  };
  useEffect(() => {
    getMovies();
    // eslint-disable-next-line
  }, [type]);

  return (
    <>
      <Button onClick={handleOpen} className="item">
        {children}{" "}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {content && (
              <div className="modalContainer">
                {window.innerWidth < 780 && type !== "person" && (
                  <img
                    className="mobileImg"
                    src={
                      image ? `${imgLink}/${image}` : `./images/no picture.png`
                    }
                    alt=""
                  />
                )}
                {window.innerWidth >= 780 && (
                  <img
                    className="desktopImg"
                    src={images ? `${imgLink}${images}` : null}
                    alt=""
                  />
                )}
                <div className="modalBox">
                  <h2>{title}</h2>
                  {type === "person" && (
                    <div className="personDetails">
                      <div>
                        <img
                          src={
                            image
                              ? `${imgLink}/${image}`
                              : `./images/no picture.png`
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        {personDetails.birthday && (
                          <p>Birthday: {personDetails.birthday}</p>
                        )}
                        {personDetails.deathday && (
                          <p>Deathday: {personDetails.deathday}</p>
                        )}

                        <p id="overview">
                          {personDetails.biography
                            ? personDetails.biography
                            : "Overview not available"}{" "}
                        </p>
                      </div>
                    </div>
                  )}
                  {type !== "person" && (
                    <p id="overview">
                      {overview ? overview : "Overview not available"}{" "}
                    </p>
                  )}
                  {type !== "person" && (
                    <div className="rateAndYear">
                      <p id="rate">{rate ? rate.toFixed(1) : 0}</p>
                      <p id="type">{type}</p>
                      <p id="date">{date && date.split("").slice(0, 4)}</p>
                    </div>
                  )}
                  {video && typeof video !== "undefined" && (
                    <button className="videoBtn">
                      <a
                        target="__blank"
                        href={`https://www.youtube.com/watch?v=${video}`}
                      >
                        Watch trailer
                      </a>{" "}
                    </button>
                  )}
                </div>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
