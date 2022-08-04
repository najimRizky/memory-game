import { Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
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


    const [openModalFinish, setOpenModalFinish] = useState<boolean>(false);
    const handleOpen = (): void => setOpenModalFinish(true);
    const handleClose = (): void => setOpenModalFinish(false);

    const { level, type } = useParams()
    // const navigate = useNavigate()

    const flipTile = (id: number): void => {
        if (flipped.length < 2) {
            if (flipped.includes(id)) {
                setFlipped(flipped.filter(flipId => flipId !== id))
            } else if (!trueFlipped.includes(id)) {
                setFlipped([...flipped, id])
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
        generateTile(level!, type!)
        setMistakes(0)
        setTrueFlipped([])
        setFlipped([])
        handleClose()
    }

    return (
        <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Box>
                <Typography component={"h2"} variant={"h5"} sx={{ color: "black", textAlign: "center", mb: "10px" }}>
                    Mistakes: {mistakes}
                </Typography>
                <Box className="board" sx={{ width: "400px", height: height, background: "#eff3f6", padding: "10px", borderRadius: "5px" }}>
                    <Grid className="tiles" sx={{ height: "100%" }} container columns={{ xs: 4 }}>
                        {tilesData.map((tileData, id) => (
                            <Tile key={id} type={type!} flipTile={flipTile} tileData={tileData} id={id} trueFlipped={trueFlipped} flipped={flipped} />
                        ))}
                    </Grid>
                </Box>
            </Box>
            <FinishModal mistakes={mistakes} retryGame={retryGame} handleOpen={handleOpen} handleClose={handleClose} openModalFinish={openModalFinish} />
        </Box>
    )
}

export default Game