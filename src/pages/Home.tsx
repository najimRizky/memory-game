import { Container, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useNavigate } from "react-router-dom"
import LinkM from '@mui/material/Link';
import { AnimatePresence, motion } from "framer-motion";
import { slideTransition } from "../animation/pagesTransition";
import { ClickSound } from "../utils/Click";
import { useState } from "react";
import TileHome from "./../components/TileHome"

const Home = () => {
    const navigate = useNavigate()
    const playGame = () => {
        setIntro(false)
        ClickSound()
        setTimeout(() => {
            navigate("/play")
        }, 500)
    }

    const [intro, setIntro] = useState<boolean>(true)

    return (
        <Box sx={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}
            component={motion.div} {...slideTransition}
            onClick={playGame}>
            <Container>
                <Box>
                    <Typography variant="h3" component="h1" sx={{ textAlign: "center", mb: "0", fontWeight: "300" }}>
                        Simple Memory game
                    </Typography>
                    <Typography variant="h5" component={"h2"} sx={{ textAlign: "center", mb: "0", color: "rgba(0,0,0,0.8)" }}>
                        <i> Test your memory skill!</i>
                    </Typography>
                    <TileHome />
                    <Typography variant="subtitle1" component="p" sx={{ textAlign: "center", my: "20px" }}>
                        by: <LinkM target={"_blank"} style={{ color: "unset" }} href="https://nazky.site">Nazky</LinkM>
                    </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                    <AnimatePresence>
                        {intro &&
                            <Typography
                                sx={{position: "absolute", width: "97%"}}
                                component={motion.p}
                                initial={{ y: 10, opacity: 0.8 }}
                                animate={{ y: -10, opacity: 1, transition: { repeatType: "reverse", repeat: Infinity, duration: 0.8 } }}
                                exit={{ y: 40, opacity: 0, transition: {duration: 0.5} }}
                            >
                                Click anywhere to start playing..
                            </Typography>
                        }
                    </AnimatePresence>
                </Box>
            </Container>
        </Box>
    )
}

export default Home