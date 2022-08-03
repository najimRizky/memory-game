import { Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import FinishModal from "../components/FinishModal"
import Tile from "../components/Tile"
import { generateTile } from "../utils/GameLogic"

const Game = () => {
    const [flipped, setFlipped] = useState<number[]>([])
    const [tilesData, setTilesData] = useState<string[]>([])
    const [trueFlipped, setTrueFlipped] = useState<number[]>([])
    const [totalFlip, setTotalFlip] = useState<number>(0)

    const [openModalFinish, setOpenModalFinish] = useState<boolean>(false);
    const handleOpen = (): void => setOpenModalFinish(true);
    const handleClose = (): void => setOpenModalFinish(false);

    const flipTile = (id: number): void => {
        if (flipped.length < 2) {
            if (flipped.includes(id)) {
                setFlipped(flipped.filter(flipId => flipId !== id))
            } else if (!trueFlipped.includes(id)) {
                setFlipped([...flipped, id])
                setTotalFlip(totalFlip + 1)
            }
        }
    }

    const checkFlipped = (): void => {
        if (tilesData[flipped[0]] === tilesData[flipped[1]]) {
            setTrueFlipped([...trueFlipped, ...flipped])
            // setTimeout(() => {
            setFlipped([])
            // },)
            if (trueFlipped.length === 14) {
                setTimeout(() => {
                    handleOpen()
                }, 700)
            }
        } else {
            setTimeout(() => {
                setFlipped([])
            }, 900)
        }
    }

    useEffect(() => {
        setTilesData(generateTile())
    }, [])

    useEffect(() => {
        if (flipped.length === 2) {
            checkFlipped()
        }
        // eslint-disable-next-line
    }, [flipped])

    const retryGame = (): void => {
        generateTile()
        setTotalFlip(0)
        setTrueFlipped([])
        setFlipped([])
        handleClose()
    }

    return (
        <>
            <Box>
                <Typography component={"h2"} variant={"h5"} sx={{ color: "black", textAlign: "center", mb: "10px" }}>
                    Total flip: {totalFlip}
                </Typography>
                <Box className="board" sx={{ width: "400px", height: "400px", background: "#eff3f6", padding: "10px", borderRadius: "5px" }}>
                    <Grid className="tiles" sx={{ height: "100%" }} container columns={{ xs: 4 }}>
                        {tilesData.map((tileData, id) => (
                            <Tile flipTile={flipTile} tileData={tileData} id={id} trueFlipped={trueFlipped} flipped={flipped} />
                        ))}
                    </Grid>
                </Box>
            </Box>
            <FinishModal totalFlip={totalFlip} retryGame={retryGame} handleOpen={handleOpen} handleClose={handleClose} openModalFinish={openModalFinish} />
        </>
    )
}

export default Game