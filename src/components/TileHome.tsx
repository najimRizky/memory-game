import { Box, Grid } from "@mui/material"
import { useEffect } from "react"
import animal4 from "./../assets/animals/animal (4).jpg"
import fruit4 from "./../assets/fruits/fruit (4).jpg"

// type Props = {}

const tilesItem = [
    {
        type: "color",
        data: "tomato"
    },
    {
        type: "image",
        data: animal4
    },
    {
        type: "image",
        data: fruit4
    },
    {
        type: "color",
        data: "seagreen"
    }
]


const TileHome = () => {
    
    useEffect(() => {
        const tile1 = setInterval(() => {
            document.getElementsByClassName("tile")[0].classList.toggle("flip")
        }, 1500)
        const tile2 = setInterval(() => {
            document.getElementsByClassName("tile")[1].classList.toggle("flip")
        }, 4500)
        const tile3 = setInterval(() => {
            document.getElementsByClassName("tile")[2].classList.toggle("flip")
        }, 3500)
        const tile4 = setInterval(() => {
            document.getElementsByClassName("tile")[3].classList.toggle("flip")
        }, 5500)
        return () =>{
            clearInterval(tile1)
            clearInterval(tile2)
            clearInterval(tile3)
            clearInterval(tile4)
        }
    }, [])

    return (
        <Box className=""
            sx={{ width: { xs: "200px" }, mx: "auto", height: "fit-content", background: "#eff3f6", padding: "10px", borderRadius: "5px" }}>
            <Grid className="tiles" sx={{ height: "100%", justifyContent: "center" }} columns={2} container >
                {tilesItem.map((tile, i) =>
                    <Grid item xs={1} sx={{ padding: "10px", maxWidth: "fit-content" }} key={i} >
                        <Box className="tile" sx={{ cursor: "pointer" }} >
                            <Box className="tile-inner" >
                                <Box className="tile-front" sx={{ borderRadius: "5px" }}></Box>
                                <Box className="tile-back"
                                    sx={{ background: tile.type === "color" ? tile.data : "transparent", height: "100%", borderRadius: "5px", overflow: "hidden" }}
                                >
                                    {tile.type !== "color" && (
                                        <img width={"100%"} alt="" src={tile.data}></img>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}

export default TileHome