import { MusicNote, MusicOff } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useEffect, useState } from "react"
// import { useEffect, useRef } from "react"
import bgMusic from "./../assets/sound/bgMusic.mp3"

const bgMusicSound = new Audio(bgMusic)
bgMusicSound.volume = 0.5
bgMusicSound.loop = true

const BgMusic = () => {

    const [bgMusicIsPlaying, setBgMusicIsPlaying] = useState<boolean>(false)

    // useEffect(() => {
    //     toggleBgMusic()
    // }, [])

    const toggleBgMusic = () => {
        if(bgMusicSound.paused) bgMusicSound.play()
        else bgMusicSound.pause()
        setBgMusicIsPlaying(!bgMusicIsPlaying)
    }

    return (
        <>
            <IconButton sx={{position: "absolute", top: "10px", right: "10px"}} onClick={toggleBgMusic} aria-label="delete" size="large">
                { bgMusicIsPlaying ? (
                    <MusicNote />
                ) : (
                    <MusicOff />
                )}
            </IconButton>
        </>
    )
}

export default BgMusic