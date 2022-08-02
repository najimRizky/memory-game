import { Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import FinishModal from "../components/FinishModal"

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
            } else {
                setFlipped([...flipped, id])
                setTotalFlip(totalFlip + 1)
            }
        }
    }

    const generateTile = (): void => {
        let colorType: string[] = ["tomato", "aguamarine", "cyan", "orchid", "black", "yellowgreen", "lightsteelblue", "crimson"]
        const finalColor: string[] = []
        for (let i = 0; i < 16; i++) {
            const randomId: number = Math.floor(Math.random() * (colorType.length));
            if (finalColor.includes(colorType[randomId])) {
                finalColor.push(colorType[randomId])
                colorType.splice(colorType.indexOf(colorType[randomId]), 1)
            } else {
                finalColor.push(colorType[randomId])
            }
        }
        setTilesData(finalColor)
    }

    const checkFlipped = (): void => {
        if (tilesData[flipped[0]] === tilesData[flipped[1]]) {
            setTrueFlipped([...trueFlipped, ...flipped])
            if (trueFlipped.length === 14) {
                setTimeout(() => {
                    handleOpen()
                }, 700)
            }
        }
        setTimeout(() => {
            setFlipped([])
        }, 1300)
    }

    useEffect(() => {
        generateTile()
    }, [])

    useEffect(() => {
        if (flipped.length === 2) {
            checkFlipped()
        }
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
                        {tilesData.map((tileData, index) => (
                            <Grid item xs={1} sx={{ padding: "10px" }} key={index} >
                                <Box onClick={() => flipTile(index)} className={flipped.includes(index) || trueFlipped.includes(index) ? "tile flip" : "tile"} sx={{ cursor: "pointer", height: "100%", borderRadius: "5px" }}>
                                    <Box className="tile-inner" >
                                        <Box className="tile-front" sx={{ borderRadius: "5px" }}></Box>
                                        <Box className="tile-back" sx={{ background: tileData, height: "100%", borderRadius: "5px" }}></Box>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
            <FinishModal totalFlip={totalFlip} retryGame={retryGame} handleOpen={handleOpen} handleClose={handleClose} openModalFinish={openModalFinish} />
        </>
    )
}

export default Game