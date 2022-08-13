import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
// import { useState } from "react";
import { Link } from "react-router-dom";
import { ClickSound } from "../utils/Click";

type Props = {
    mistakes: number,
    retryGame: any,
    handleOpen: any,
    handleClose: any,
    openModalFinish: boolean
}

const style: object = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {sm: 400, xs: "75vw"},
    bgcolor: 'background.paper',
    outline: "none",
    boxShadow: 24,
    p: 4,
    borderRadius: "5px"
};

const FinishModal = (props: Props) => {

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.openModalFinish}
                // onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.openModalFinish}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" sx={{textAlign: "center", fontWeight: "normal"}} variant="h6" component="h3">
                            Congratulations! You finish this game with <b>{props.mistakes}</b> mistakes
                        </Typography>
                        <Box sx={{textAlign: "center", mt: "20px"}}>
                            <Button onClick={() => {props.retryGame(); ClickSound()}} variant="contained" sx={{mr: "10px"}} color="success" >Retry</Button>
                            <Link to={"/play"} style={{textDecoration: "none"}}>
                                <Button onClick={ClickSound} variant="contained" color="secondary" >Change Mode</Button>
                            </Link>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default FinishModal