import { Button, Container, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Link } from "react-router-dom"
import LinkM from '@mui/material/Link';
import { motion } from "framer-motion";
import { slideTransition } from "../animation/pagesTransition";
import { ClickSound } from "../utils/Click";

const Home = () => {
    return (
        <Box component={motion.div} {...slideTransition}>
            <Container>
                <Box>
                    <Typography variant="h2" component="h1" sx={{ textAlign: "center", mb: "0" }}>
                        Memory game
                    </Typography>
                    <Typography variant="subtitle1" component="p" sx={{ textAlign: "center", mb: "40px" }}>
                        by: <LinkM target={"_blank"} style={{color: "unset"}} href="https://nazky.site">Nazky</LinkM>
                    </Typography>
                </Box>
                <Box sx={{textAlign: "center"}}>
                    <Link to={"/play"} style={{textDecoration: "none"}}>
                        <Button onClick={ClickSound} sx={{width: "100px"}} variant="contained" color="success">
                            Play
                        </Button>
                    </Link>
                </Box>
            </Container>
        </Box>
    )
}

export default Home