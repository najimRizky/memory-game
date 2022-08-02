import { Button, Container, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Link } from "react-router-dom"

// type Props = {tes: string}

const Home = () => {
    return (
        <Box>
            <Container>
                <Box>
                    <Typography variant="h2" component="h1" sx={{ textAlign: "center", mb: "20px" }}>
                        Memory game
                    </Typography>
                    <Typography variant="subtitle1" component="p" sx={{ textAlign: "center", mb: "20px" }}>
                        by: Najim Rizky
                    </Typography>
                </Box>
                <Box sx={{textAlign: "center"}}>
                    <Typography variant="h6" component="p" sx={{ textAlign: "center", mb: "20px" }}>
                        Choose mode: 
                    </Typography>
                    <Link to={"/play"} style={{textDecoration: "none"}}>
                        <Button variant="contained" color="success">
                            Color mode
                        </Button>
                    </Link>
                </Box>
            </Container>
        </Box>
    )
}

export default Home