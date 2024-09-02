import React, { useState, useEffect } from 'react'
import constants from '@/constants'
import Card from '@/components/Common/Card';

const {FAVOURITE_MUSIC_LOCAL_STORAGE_KEY} = constants;

export default function library() {
  const [musicList, setMusicList] = useState([]);
  useEffect(()=>{
    const favouriteMusicList = JSON.parse(localStorage.getItem(FAVOURITE_MUSIC_LOCAL_STORAGE_KEY)) || [];
    setMusicList(favouriteMusicList)
  },[])
  return (
    <>
      {musicList.map((musicInfo) => {
        return (
          <Card 
            key={musicInfo._id}
            img = {musicInfo.thumbnail} 
            songTitle = {musicInfo.title} 
            artistName = {musicInfo?.artist?.name} 
            musicInfo = {musicInfo} />
        )
      })}
    </>
  )
}
