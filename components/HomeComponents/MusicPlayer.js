import { useAuth } from '@/context/AuthContext';
import { useMusic } from '@/context/MusicContext'
import css from '@/styles/MusicPlayer.module.css'
import React from 'react'

import AudioPlayer from 'react-h5-audio-player';



export default function MusicPlayer() {
  const {isMusicSet, currentMusicInfo} = useMusic();
  const {token} = useAuth();

  if(!isMusicSet) return null;
  return (
    <>
      <div className={`${css.musicPlayer} flex`}>
        <div className={`${css.musicImgBox}`}>
          <img src={currentMusicInfo.thumbnail} />
        </div>
        <div className={`${css.musicData} flex`}>
          <span>{currentMusicInfo.title}</span>
          <span>{currentMusicInfo?.artist?.name}</span>
        </div>
        <AudioPlayer
          autoPlay={false}
          src={currentMusicInfo.audio_url}
          onPlay={e => console.log("onPlay")}
          // other props here
        />
        <div>Like Icon</div>
      </div>
      
    </>
  )
}
      