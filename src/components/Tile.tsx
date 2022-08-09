import { Box, Grid } from '@mui/material'
import { motion } from 'framer-motion'

type Props = {
    id: number,
    tileData: string,
    trueFlipped: number[],
    flipped: number[],
    flipTile: (id: number) => void,
    type: string,
    isLast: boolean,
    finishLoadTiles: boolean,
}


const Tile = (props: Props) => {
    return (
        <Grid
            component={motion.div} initial={{ scale: 0 }} animate={{ scale: 1, transition: { type: "spring", delay: 0.05 * props.id, duration: 0.5, damping: 10 } }}
            item xs={1} sx={{ padding: "10px", maxWidth: "fit-content" }} key={props.id} >
            <Box onClick={() => props.flipTile(props.id)} className={`${props.flipped.includes(props.id) || props.trueFlipped.includes(props.id) ? "tile flip" : "tile"} ${props.trueFlipped.includes(props.id) ? "true" : ""}`} sx={{ cursor: "pointer" }}>
                <Box
                    component={motion.div}
                    initial={{ rotateY: "180deg" }}
                    animate={{ rotateY: props.finishLoadTiles === true ? "0deg" : "180deg" }}
                    className="tile-inner"  >
                    <Box className="tile-front" sx={{ borderRadius: "5px" }}></Box>
                    <Box className="tile-back" sx={{ background: props.type === "color" ? props.tileData : "transparent", height: "100%", borderRadius: "5px", overflow: "hidden" }}>
                        {props.type !== "color" && (
                            <img width={"100%"} alt="" src={props.tileData}></img>
                        )}
                    </Box>
                </Box>
            </Box>
        </Grid>
    )
}

export default Tile