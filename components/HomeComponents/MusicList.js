import React, { useEffect, useState } from 'react'
import Card from '../Common/Card';
import constants from '@/constants'
import { useMusic } from '@/context/MusicContext';

const {BASE_API_PATH, PROJECT_ID} = constants;

export default function MusicList() {
  const [musicList, setMusicList] = useState([]);

  async function getMusicList() {
    try {
      const response = await fetch(`${BASE_API_PATH}/api/v1/music/song`, {
        method: 'GET',
        headers: {
          "content-type": "application/json",
          "projectId": PROJECT_ID
        },
      });
      const data = await response.json();
      setMusicList(data.data)
    }
    catch (err) {
      console.error(err);
    }
  }
  
  useEffect(()=>{
    getMusicList();
  },[])

  return (
    <>
      {musicList.map((musicInfo) => {
        return (
          <Card 
            img = {musicInfo.thumbnail} 
            songTitle = {musicInfo.title} 
            artistName = {musicInfo?.artist?.name} 
            musicInfo = {musicInfo} />
        )
      })}
    </>
  )
}