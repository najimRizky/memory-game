// import logo from './logo.svg';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';
import Home from './pages/Home';
import Mode from './pages/Mode';

function App() {
    return (
        <Box sx={{ height: "100vh", width: "100vw", background: "#eff3f6"}}>
            <Container sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/play">
                            <Route index element={<Mode />} />
                            <Route path=":level/:type" element={<Game />} />
                        </Route>
                        <Route path='*' element={<Home/>} />
                    </Routes>
                </BrowserRouter>
            </Container>
        </Box>
    );
}

export default App;
