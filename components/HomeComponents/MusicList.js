import React, { useEffect, useState } from 'react'
import Card from '../Common/Card';
import constants from '@/constants'
import { useRouter } from 'next/router';

const {BASE_API_PATH, PROJECT_ID} = constants;



export default function MusicList() {
  const [musicList, setMusicList] = useState([]);
  const router = useRouter();
  const musicQuery = router.query.music;
  
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

  async function getSearchedMusic() {
    try {
      const response = await fetch(`${BASE_API_PATH}/api/v1/music/song?search={"title": ${musicQuery}}`, {
        method: 'GET',
        headers: {
          "content-type": "application/json",
          "projectId": PROJECT_ID
        },
      });
      if(!response.ok){
        throw new Error('Not Found')
      }
      const data = await response.json();
      setMusicList(data.data)
    }
    catch (err) {
      console.error(err);
    }
  }
  
  useEffect(()=>{
    if(musicQuery){
      getSearchedMusic();
    }
    else{
      getMusicList(); 
    }
  },[musicQuery])

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