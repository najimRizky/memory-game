import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
    openModalFinish: boolean
}

const Timer = (props: Props) => {
    const [running, setRunning] = useState<boolean>(false)
    const [currentTimeMs, setCurrentTimeMs] = useState<number>(0)
    const [currentTimeSec, setCurrentTimeSec] = useState<number>(0)
    const [currentTimeMin, setCurrentTimeMin] = useState<number>(0)

    let timerWatch: any = useRef(null)

    const formatTime = (val: number, rest: string = ""): string => {
        let value = val.toString();
        if (value.length < 2) {
            value = "0" + value;
        }
        if (rest === "ms" && value.length < 3) {
            value = "0" + value;
        }
        return value;
    };

    const start = () => {
        if (!running) {
            setRunning(true)
            timerWatch.current = setInterval(() => {
                pace()
            }, 10);
        }
    };

    const stop = () => {
        setRunning(false)
        clearInterval(timerWatch.current)
    };

    const pace = () => {
        setCurrentTimeMs(currentTimeMs => {
            return currentTimeMs + 10
        })

    };

    // const reset = () => {
    //     setCurrentTimeMs(0)
    //     setCurrentTimeSec(0)
    //     setCurrentTimeMin(0)
    // };

    useEffect(() => {
        if(props.openModalFinish){
            stop()
        }
    }, [props.openModalFinish])

    useEffect(() => {
        setTimeout(() => {
            start()
        }, 500)
        return () => {
            clearInterval(timerWatch.current)
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (currentTimeMs >= 1000) {
            setCurrentTimeSec(currentTimeSec => currentTimeSec + 1)
            setCurrentTimeMs(0)
        }
        if (currentTimeSec >= 60) {
            setCurrentTimeMin(currentTimeMin => currentTimeMin + 1)
            setCurrentTimeSec(0)
        }
        // eslint-disable-next-line
    }, [currentTimeMs])

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.8 } }}
            exit={{ opacity: 0 }}
            className="timer"
            >
            <Typography
                id="timerText"
                variant={"h5"}
                sx={{ position: "absolute", color: "black", top: "55%", width: "100%", textAlign: "center", mb: "10px" }}
            >
                {formatTime(currentTimeMin)}:
                {formatTime(currentTimeSec)}:
                {formatTime(currentTimeMs, "ms")}
            </Typography>
        </Box >
    );
}

export default Timer;
