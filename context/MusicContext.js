import React, { createContext, useContext, useState } from 'react'

const MusicContext = createContext();
const sampleMusicData = {
    "_id": "64cf907d47ae38c3e33a189a",
    "title": "Kohinoor",
    "artist": [
        {
            "_id": "64ce7c0bbbbada037c35eda9",
            "name": "DIVINE",
            "description": "Emotive storyteller, infusing lyrics with heartfelt meaning. Using music to inspire positive change, a beacon of hope.",
            "image": "https://newton-project-resume-backend.s3.ap-south-1.amazonaws.com/148de808-8598-4066-8fe0-972e78d834d8size_xl_1663590345.webp",
            "languages": [
                "punjabi",
                "tamil",
                "hindi",
                "bengali",
                "telugu",
                "malayalam",
                "english",
                "marathi",
                "bhojpuri",
                "gujarati"
            ],
            "songs": [
                "64cf907d47ae38c3e33a189a",
                "64cf909147ae38c3e33a1a3a",
                "64cf909e47ae38c3e33a1b4b",
                "64cf920b47ae38c3e33a3889",
                "64cf949647ae38c3e33a6c29",
                "64cf94cf47ae38c3e33a70a6",
                "64cf94cf47ae38c3e33a70ae",
                "64cf94d047ae38c3e33a70b8",
                "64cf94d047ae38c3e33a70c2",
                "64cf94d147ae38c3e33a70cc",
                "64cf94d147ae38c3e33a70d5",
                "64cf94d247ae38c3e33a70dc",
                "64cf94d247ae38c3e33a70e4",
                "64cf94d347ae38c3e33a70ed",
                "64cf94d347ae38c3e33a70f4",
                "64cf94d347ae38c3e33a70fb",
                "64cf94d447ae38c3e33a7103"
            ],
            "appType": "music",
            "__v": 17
        }
    ],
    "likedBy": [],
    "type": "song",
    "mood": "happy",
    "thumbnail": "https://newton-project-resume-backend.s3.amazonaws.com/thumbnail/64cf907d47ae38c3e33a189a.jpg",
    "appType": "music",
    "createdAt": "2023-08-06T12:22:21.474Z",
    "__v": 0,
    "audio_url": "https://newton-project-resume-backend.s3.amazonaws.com/audio/64cf907d47ae38c3e33a189a.mp3",
    "featured": "Trending songs"
}

export const MusicProvider = ({children}) => {
    const [currentMusicInfo, setCurrentMusicInfo] = useState(sampleMusicData);
    const [isMusicSet, setIsMusic] = useState(true);

    function setMusicInfo(data){
        setCurrentMusicInfo(data);
        setIsMusic(true);
    }

  return (
    <MusicContext.Provider value={{currentMusicInfo, isMusicSet, setMusicInfo}}>
        {children}
    </MusicContext.Provider>
  )
}

export const useMusic = () =>{
    return useContext(MusicContext)
} 