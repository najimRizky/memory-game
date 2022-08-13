import { Box, Button, Divider, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Level from "./../rules/Level.json"
import { modeType } from "../rules/Type"
import { motion } from 'framer-motion';
import { slideTransition } from '../animation/pagesTransition';
import { ClickSound, ClickSound2 } from '../utils/Click';
import BackButton from '../components/BackButton';

// type Props = {}

const Mode = () => {
    const [level, setLevel] = useState<number>(0);
    const [type, setType] = useState<string>("color");
    const navigate = useNavigate()

    const handleChange = (event: React.SyntheticEvent, newLevel: number): void => {
        setLevel(newLevel)
        ClickSound2()
    }

    const a11yProps = (index: number): object => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const goToGame = (): void => {
        navigate(`${Level[level].level}/${type}`)
    }

    const changeType = (newType: string) => {
        if (type !== newType) {
            setType(newType)
            ClickSound2()
        }
    }

    return (
        <>
            <BackButton destination="/" />
            <Box sx={{ transform: "unset" }} component={motion.div} className="mode" {...slideTransition}>
                <Typography variant="body1" component="p" sx={{ textAlign: "center", mb: "20px" }}>
                    Chose level:
                </Typography>
                <Box sx={{ mb: "20px" }}>
                    <Tabs value={level} onChange={handleChange} aria-label="basic tabs example">
                        {Level.map((lvl, id) => (
                            <Tab sx={{ textTransform: "capitalize" }} label={lvl.level.replaceAll("_", " ")} {...a11yProps(id)} key={id} />
                        ))}
                    </Tabs>
                </Box>
                <Divider sx={{ mb: "20px" }} />
                <Typography variant="body1" component="p" sx={{ textAlign: "center", mb: "20px" }}>
                    Choose mode:
                </Typography>
                <Box className="modeListContainer">
                    <Box sx={{ display: "flex", mb: "20px" }} className="modeList">
                        {modeType.map((typ, id) => (
                            <Box onClick={() => { changeType(typ.type) }} className={`modeItem ${type === typ.type ? "selected" : ""}`} key={id}>
                                <img height={"100%"} src={typ.image} alt={typ.type}></img>
                                <Box className='modeName'>
                                    <Typography sx={{ textTransform: "capitalize" }}>
                                        {typ.type}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                    {/* <Link to={"/play"} style={{ textDecoration: "none" }}> */}
                    <Button onClick={() => { goToGame(); ClickSound(); }} sx={{ width: "100px" }} variant="contained" color="success">
                        Play
                    </Button>
                    {/* </Link> */}
                </Box>
            </Box>
        </>
    )
}

export default Mode