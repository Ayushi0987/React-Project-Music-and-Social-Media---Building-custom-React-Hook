import { useMusic } from '@/context/MusicContext'
import React from 'react'
import css from '@/styles/Card.module.css'

export default function Card({ img, songTitle, artistName, musicInfo }) {
    const {setMusicInfo} = useMusic();
  return (
    <div onClick={()=>setMusicInfo(musicInfo)}>
      <div className={`${css.imgBox}`}>
          <img src={img} />
      </div>
      <div className={`${css.content}`}>
          <div>{songTitle}</div>
          <div>{artistName}</div>
      </div>
    </div>
  )
} 
