import React from 'react'
import { useAuth } from '@/context/AuthContext';
import { useMusic } from '@/context/MusicContext'
import css from '@/styles/MusicPlayer.module.css'
import Link from 'next/link';
import constants from '@/constants';

const {FAVOURITE_MUSIC_LOCAL_STORAGE_KEY} = constants;

import AudioPlayer from 'react-h5-audio-player';

export default function MusicPlayer() {
  const {isMusicSet, currentMusicInfo} = useMusic();
  const {token} = useAuth();

  function toggleSongFavourite(){
      const favouriteMusicList = JSON.parse(localStorage.getItem(FAVOURITE_MUSIC_LOCAL_STORAGE_KEY)) || [];
      const isMusicPresent = favouriteMusicList.filter((song)=>{
          return song._id === currentMusicInfo._id
      })
      if(isMusicPresent.length > 0){
        const updatedSongs = favouriteMusicList.filter((song)=>{
            return song._id !== currentMusicInfo._id
        })
        localStorage.setItem(FAVOURITE_MUSIC_LOCAL_STORAGE_KEY, JSON.stringify(updatedSongs));
        return; 
      }
      favouriteMusicList.push(currentMusicInfo);
      localStorage.setItem(FAVOURITE_MUSIC_LOCAL_STORAGE_KEY, JSON.stringify(favouriteMusicList));
  }

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
        {!token ? 
          <div className='flex'>
            <div>Please login first</div>
            <Link href={'/login'}><button>Login here</button></Link>
          </div>
          :
          <>
          <AudioPlayer
            autoPlay={false}
            src={currentMusicInfo.audio_url}
            onPlay={e => console.log("onPlay")}
            // other props here
          />
          <div onClick={toggleSongFavourite}>Like Icon</div>
          </>
          } 
      </div>
    </>
  )
}
      