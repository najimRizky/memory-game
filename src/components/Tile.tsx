import { Box, Grid } from '@mui/material'

type Props = {
    id: number,
    tileData: string,
    trueFlipped: number[],
    flipped: number[],
    flipTile: (id: number) => void,
    type: string
}

const Tile = (props: Props) => {
    return (
        <Grid item xs={1} sx={{ padding: "10px" }} key={props.id} >
            <Box onClick={() => props.flipTile(props.id)} className={`${props.flipped.includes(props.id) || props.trueFlipped.includes(props.id) ? "tile flip" : "tile"} ${props.trueFlipped.includes(props.id) ? "true" : ""}`} sx={{ cursor: "pointer", height: "100%", borderRadius: "5px" }}>
                <Box className="tile-inner" >
                    <Box className="tile-front" sx={{ borderRadius: "5px" }}></Box>
                    <Box className="tile-back" sx={{ background: props.type === "color" ? props.tileData : "transparent", height: "100%", borderRadius: "5px" }}>
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