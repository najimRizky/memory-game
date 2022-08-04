import { Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import { useParams } from "react-router-dom"
import FinishModal from "../components/FinishModal"
import Tile from "../components/Tile"
import { generateTile } from "../utils/GameLogic"

const Game = () => {
    const [flipped, setFlipped] = useState<number[]>([])
    const [tilesData, setTilesData] = useState<string[]>([])
    const [trueFlipped, setTrueFlipped] = useState<number[]>([])
    const [mistakes, setMistakes] = useState<number>(0)
    const [height, setHeight] = useState<string>("")

    const [finishLoadTiles, setFinishLoadTiles] = useState<boolean>(false)


    const [openModalFinish, setOpenModalFinish] = useState<boolean>(false);
    const handleOpen = (): void => setOpenModalFinish(true);
    const handleClose = (): void => setOpenModalFinish(false);

    const { level, type } = useParams()
    // const navigate = useNavigate()

    const flipTile = (id: number): void => {
        if(finishLoadTiles){
            if (flipped.length < 2) {
                if (flipped.includes(id)) {
                    setFlipped(flipped.filter(flipId => flipId !== id))
                } else if (!trueFlipped.includes(id)) {
                    setFlipped([...flipped, id])
                }
            }
        }
    }

    const checkFlipped = (): void => {
        if (tilesData[flipped[0]] === tilesData[flipped[1]]) {
            setTrueFlipped([...trueFlipped, ...flipped])
            // setTimeout(() => {
            setFlipped([])
            // },)
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
        switch (level) {
            case "easy": setHeight("200px")
                break;

            case "normal": setHeight("300px")
                break;

            case "hard": setHeight("400px")
                break;

            case "very_hard": setHeight("500px")
                break;
        }
        setTilesData(generateTile(level!, type!))
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (flipped.length === 2) {
            checkFlipped()
        }
        // eslint-disable-next-line
    }, [flipped])

    const retryGame = (): void => {
        setTilesData(generateTile(level!, type!))
        setMistakes(0)
        setTrueFlipped([])
        setFlipped([])
        handleClose()
        setFinishLoadTiles(false)
    }

    const rememberTime: number = 5000

    const renderTime = (remainingTime: number) => {
        if (remainingTime === 0) {
            return <h3 className="timer">Happy play!</h3>;
        }

        return (
            <div className="timer" style={{ textAlign: "center" }}>
                <div className="text">Remembering time</div>
                <h2 style={{ margin: "0" }} className="value">{remainingTime}</h2>
                <div className="text">seconds</div>
            </div>
        );
    };

    const CountdownTimer = () => {
        return(
            <Box component={motion.div} sx={{ position: "absolute", left: "10vw", top: "50vh", transform: "translateY(-40%)"}} 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0, transition: {delay: 0.5}}}
            >
                <CountdownCircleTimer
                    size={180}
                    isPlaying
                    duration={rememberTime / 1000}
                    colors={"#1e90ff"}
                    onComplete={() => {
                        setFinishLoadTiles(true)
                    }}
                >
                    {({ remainingTime }) => renderTime(remainingTime)}
                </CountdownCircleTimer>
            </Box>
        )
    }

    return (
        <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Box>
                <AnimatePresence exitBeforeEnter>
                    {!finishLoadTiles &&
                        <CountdownTimer/>
                    }
                    </AnimatePresence>
                <Typography component={"h2"} variant={"h5"} sx={{ color: "black", textAlign: "center", mb: "10px" }}>
                    Mistakes: {mistakes}
                </Typography>
                <Box className="board" sx={{ width: "400px", height: height, background: "#eff3f6", padding: "10px", borderRadius: "5px" }}>
                    <Grid
                        className="tiles" sx={{ height: "100%" }} container columns={{ xs: 4 }}>
                            <AnimatePresence>
                                {tilesData.map((tileData, id) => (
                                    <Tile finishLoadTiles={finishLoadTiles} isLast={id + 1 === tilesData.length} key={id} type={type!} flipTile={flipTile} tileData={tileData} id={id} trueFlipped={trueFlipped} flipped={flipped} />
                                ))}
                            </AnimatePresence>
                    </Grid>
                </Box>
            </Box>
            <FinishModal mistakes={mistakes} retryGame={retryGame} handleOpen={handleOpen} handleClose={handleClose} openModalFinish={openModalFinish} />
        </Box>
    )
}

export default Game