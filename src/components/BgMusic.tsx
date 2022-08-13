import { MusicNote, MusicOff, VolumeOff, VolumeUp } from "@mui/icons-material"
import { IconButton, Menu, Slider, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { ClickSound } from "../utils/Click"
import bgMusic from "./../assets/sound/bgMusic.mp3"

const bgMusicSound = new Audio(bgMusic)
bgMusicSound.loop = true
bgMusicSound.muted = true

const playBgMusic = () => {
    bgMusicSound.muted = false
    bgMusicSound.play()
    document.removeEventListener("click", playBgMusic)
}

document.addEventListener("click", playBgMusic)


const BgMusic = () => {

    const [bgMusicIsPlaying, setBgMusicIsPlaying] = useState<boolean>(true)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [volume, setVolume] = useState<number>(40)

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        ClickSound()
    }
    const handleClose = () => {
        setAnchorEl(null);
        ClickSound()
    }

    const toggleBgMusic = (e: any) => {
        // ClickSound()
        handleClick(e)
    }

    const changeVolume = (event: Event, newValue: number | number[]) => {
        setVolume(Number(newValue))
    }

    useEffect(() => {
        if(!bgMusicSound.muted){
            if (volume !== 0 ) {
                bgMusicSound.play()
                bgMusicSound.volume = volume / 100
                setBgMusicIsPlaying(true)
            } else {
                setBgMusicIsPlaying(false)
                bgMusicSound.pause()
            }
        }
    }, [volume])

    return (
        <>
            <IconButton sx={{ position: "absolute", top: "10px", right: "10px", zIndex: 1 }} onClick={toggleBgMusic} aria-label="music" size="large">
                {bgMusicIsPlaying ? (
                    <MusicNote />
                ) : (
                    <MusicOff />
                )}
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Stack direction={"row"} spacing={2} sx={{ width: "130px", px: 2 }}>
                    {bgMusicIsPlaying ? (
                        <VolumeUp sx={{ my: "auto", color: "GrayText" }}/>
                    ) : (
                        <VolumeOff sx={{ my: "auto", color: "GrayText" }} />
                    )}
                    <Slider aria-label="Volume" value={volume} onChange={changeVolume} size="small" />
                </Stack>
            </Menu>
        </>
    )
}

export default BgMusic