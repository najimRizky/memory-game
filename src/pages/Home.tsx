import { Button, Container, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Link } from "react-router-dom"

// type Props = {tes: string}

const Home = () => {
    return (
        <Box>
            <Container>
                <Box>
                    <Typography variant="h2" component="h1" sx={{ textAlign: "center" }}>
                        Memory game
                    </Typography>
                </Box>
                <Box sx={{textAlign: "center"}}>
                    <Link to={"/play"} style={{textDecoration: "none"}}>
                        <Button variant="contained" color="success">
                            Play
                        </Button>
                    </Link>
                </Box>
            </Container>
        </Box>
    )
}

export default Home