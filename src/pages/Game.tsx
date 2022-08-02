import { Grid } from "@mui/material"
import { Box } from "@mui/system"

const Game = () => {
    return (
        <Box className="board" sx={{ width: "400px", height: "400px", background: "#eff3f6", padding: "10px", borderRadius: "5px" }}>
            <Grid className="tiles" sx={{ height: "100%" }} container columns={{ xs: 4 }}>
                {Array.from(Array(16)).map((_, index) => (
                    <Grid item xs={1} sx={{ padding: "10px" }} key={index} >
                        <Box className={index !== 0 ? "tile" : "tile flip"} sx={{height: "100%", borderRadius: "5px"}}> 
                            <Box className="tile-inner" >
                                <Box className="tile-front" sx={{borderRadius: "5px"}}></Box>
                                <Box className="tile-back" sx={{background: "tomato", height: "100%", borderRadius: "5px"}}></Box>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Game