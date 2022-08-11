import { Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import { useNavigate, useParams } from "react-router-dom"
import { fadeTransition } from "../animation/pagesTransition"
import FinishModal from "../components/FinishModal"
import Tile from "../components/Tile"
import { generateTile } from "../utils/GameLogic"

import tileFlip from "./../assets/sound/tileFlip.mp3"
import correct from "./../assets/sound/correct.mp3"
import win from "./../assets/sound/win.mp3"

import BackButton from "../components/BackButton"

const tileFlipSound = new Audio(tileFlip)
const correctSound = new Audio(correct)
const winSound = new Audio(win)
tileFlipSound.volume = 0.5
correctSound.volume = 0.4
winSound.volume = 0.4

const Game = () => {
    const [flipped, setFlipped] = useState<number[]>([])
    const [tilesData, setTilesData] = useState<string[]>([])
    const [trueFlipped, setTrueFlipped] = useState<number[]>([])
    const [mistakes, setMistakes] = useState<number>(0)

    const [finishLoadTiles, setFinishLoadTiles] = useState<boolean>(false)


    const [openModalFinish, setOpenModalFinish] = useState<boolean>(false);
    const handleOpen = (): void => {
        setOpenModalFinish(true)
        winSound.play()
    }
    const handleClose = (): void => setOpenModalFinish(false);

    const { level, type } = useParams()
    const navigate = useNavigate()

    const flipTile = (id: number, e: any): void => {
        if (finishLoadTiles) {
            if (flipped.length < 2) {
                if (!trueFlipped.includes(id) && !e.target.closest(".flip")) {
                    setFlipped([...flipped, id])
                    tileFlipSound.currentTime = 0
                    tileFlipSound.play()
                }
            }
        }
    }

    const checkFlipped = (): void => {
        if (tilesData[flipped[0]] === tilesData[flipped[1]]) {
            setTrueFlipped([...trueFlipped, ...flipped])
            correctSound.currentTime = 0
            correctSound.play()
            setFlipped([])
            if (trueFlipped.length === tilesData.length - 2) {
                setTimeout(() => {
                    handleOpen()
                }, 700)
            }
        } else {
            setTimeout(() => { setMistakes(mistakes + 1) }, 400)
            setTimeout(() => { setFlipped([]) }, 900)
        }
    }

    useEffect(() => {
        const tmp = generateTile(level!, type!)
        if (tmp === null) {
            navigate("/play")
        } else {
            setTilesData(tmp)
        }
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (flipped.length === 2) {
            checkFlipped()
        }
        // eslint-disable-next-line
    }, [flipped])

    const retryGame = (): void => {
        setTilesData(generateTile(level!, type!)!)
        setMistakes(0)
        setTrueFlipped([])
        setFlipped([])
        handleClose()
        setFinishLoadTiles(false)
    }


    const rememberTime: number = 5000

    const renderTime = (remainingTime: number) => {
        if (remainingTime === 0) {
            return <Typography variant="h6" className="timer">Start!</Typography>
        }

        return (
            <div className="timer" style={{ textAlign: "center" }}>
                {/* <div className="text">Remembering time</div> */}
                <Typography variant="h4" style={{ margin: "0" }} className="value">{remainingTime}</Typography>
                {/* <div className="text">seconds</div> */}
            </div>
        );
    };

    const CountdownTimer = () => {
        return (
            <Box component={motion.div} sx={{ position: "absolute", left: "50%", top: "0", transform: "translateX(-50%)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { delay: 0.5 } }}
            >
                <CountdownCircleTimer
                    size={80}
                    isPlaying
                    duration={rememberTime / 1000}
                    // duration={rememberTime}
                    colors={"#1e90ff"}
                    onComplete={() => {
                        setFinishLoadTiles(true)
                    }}
                >
                    {({ remainingTime }) => renderTime(remainingTime)}
                </CountdownCircleTimer>
                <Typography className="text">Get ready...</Typography>
            </Box>
        )
    }

    return (
        <>
            <BackButton />
            <Box sx={{py: "40px"}} component={motion.div} {...fadeTransition}>
                    <Box sx={{ position: "relative", height: "100px", mb: "20px" }}>
                        <AnimatePresence>
                            {!finishLoadTiles &&
                                <CountdownTimer />
                            }
                        </AnimatePresence>
                        <AnimatePresence>
                            {finishLoadTiles &&
                                <Typography
                                    component={motion.h2}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { delay: 0.8 } }}
                                    exit={{ opacity: 0 }}
                                    variant={"h5"} sx={{ position: "absolute", color: "black", top: "55%", width: "100%", textAlign: "center", mb: "10px" }}>
                                    Mistakes: {mistakes}
                                </Typography>
                            }
                        </AnimatePresence>
                    </Box>
                    <Box className="board"
                        sx={{ width: { xs: "300px", sm: "400px", md: "500px" }, height: "fit-content", background: "#eff3f6", padding: "10px", borderRadius: "5px" }}>
                        <Grid className="tiles" sx={{ height: "100%", justifyContent: "center" }} columns={{ xs: 4 }} container >
                            <AnimatePresence>
                                {tilesData.map((tileData, id) => (
                                    <Tile finishLoadTiles={finishLoadTiles} isLast={id + 1 === tilesData.length} key={id} type={type!} flipTile={flipTile} tileData={tileData} id={id} trueFlipped={trueFlipped} flipped={flipped} />
                                ))}
                            </AnimatePresence>
                        </Grid>
                    </Box>
            </Box>
            <FinishModal mistakes={mistakes} retryGame={retryGame} handleOpen={handleOpen} handleClose={handleClose} openModalFinish={openModalFinish} />
        </>
    )
}

export default Game