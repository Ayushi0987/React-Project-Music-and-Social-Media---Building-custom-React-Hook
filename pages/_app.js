import { AuthProvider } from '@/context/AuthContext'
import '@/styles/globals.css'
import 'react-h5-audio-player/lib/styles.css';
import NavBar from '@/components/NavBar'
import MusicPlayer from '@/components/HomeComponents/MusicPlayer'
import { MusicProvider, useMusic } from '@/context/MusicContext'

export default function App({ Component, pageProps }) {
  // const {isMusicSet} = useMusic();
  return (
    <AuthProvider>
      <MusicProvider>
        <NavBar />
        <Component {...pageProps} />
        <MusicPlayer />
      </MusicProvider>
    </AuthProvider>
  )
}
