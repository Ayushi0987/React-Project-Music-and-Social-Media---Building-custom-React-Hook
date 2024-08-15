import { useMusic } from '@/context/MusicContext'
import React from 'react'

export default function Card({ img, songTitle, artistName, musicInfo }) {
    const {setMusicInfo} = useMusic();
  return (
    <div onClick={()=>setMusicInfo(musicInfo)}>
      <div>
          <img src={img} />
      </div>
      <div>
          <div>{songTitle}</div>
          <div>{artistName}</div>
      </div>
    </div>
  )
}
