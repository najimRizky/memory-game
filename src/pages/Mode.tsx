import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Level from "./../rules/Level.json"

// type Props = {}

const Mode = () => {
    const [level, setLevel] = useState<number>(0);
    const navigate = useNavigate()

    const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
        setLevel(newValue);
    };

    const a11yProps = (index: number): object => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const goToGame = (): void => {
        navigate(`${Level[level].level}/color`)
    }

    return (
        <Box className="mode">
            <Typography variant="body1" component="p" sx={{ textAlign: "center", mb: "0" }}>
                Chose level:
            </Typography>
            <Box sx={{mb: "20px"}}>
                <Tabs value={level} onChange={handleChange} aria-label="basic tabs example">
                    {Level.map((lvl, id) => (
                        <Tab label={lvl.level.replaceAll("_", " ")} {...a11yProps(id)} key={id} />
                    ))}
                </Tabs>
            </Box>
            {/* <Typography variant="body1" component="p" sx={{ textAlign: "center", mb: "20px" }}>
                Choose mode:
            </Typography> */}
            <Box sx={{ textAlign: "center" }}>
                {/* <Link to={"/play"} style={{ textDecoration: "none" }}> */}
                <Button onClick={goToGame} sx={{ width: "100px" }} variant="contained" color="success">
                    Play
                </Button>
                {/* </Link> */}
            </Box>
        </Box>
    )
}

export default Mode