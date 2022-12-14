import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { apiKey } from "../App";
import { useState } from 'react';
import { useEffect } from 'react';
import './Modal.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '90%',
  border: 'none',
  boxShadow: 24,
  borderRadius:'10px',
  background: 'rgba(21, 24, 29, .98)',
  p: 4,
  padding:'20px',
};

export default function TransitionsModal({children, image, imgLink, page, genreUrl, overview, title, rate, date, type, id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
const [content, setContent] = useState();
const [video, setVideo] = useState();

const getMovies = async()=>{
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreUrl}`)
            const data = await res.json();
            setContent(data.results);
}
const getVideo=async()=>{
  const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}&language=en-US`)
  const data = await res.json();
  setVideo(data.results && data.results[0]?.key)
}
 useEffect(()=>{
    getMovies();
    getVideo();
    // eslint-disable-next-line
 },[])
 
  return (
    <>
      <Button onClick={handleOpen} className='item'>{children} </Button>
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
          {content&&(
                <div className='modalContainer'>
            <img src={image? `${imgLink}/${image}`: `./images/no picture.png`} alt="" />
            <div className='modalBox'>
            <h2>{title}</h2>
            <p id='overview'>{overview}</p>
            <div className='rateAndYear'>
            <p id="rate">{rate? rate.toFixed(1) : 0}</p>
        <p id="type">{type}</p>
<p id='date'>{date&&date.split('').slice(0,4)}</p>
            </div>
       <button className='videoBtn'
       ><a target="__blank" href={`https://www.youtube.com/watch?v=${video}`}>Watch trailer</a> </button>
            </div>
            
          </div>
            )}
          </Box>
            
          
        </Fade>
      </Modal>
    </>
  );
}