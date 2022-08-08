// import logo from './logo.svg';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { BrowserRouter} from 'react-router-dom';
import './styles/App.scss';
import AllRoutes from './components/AllRoutes';


function App() {
    return (
        <Box sx={{ minHeight: "100vh", width: "100vw", background: "#eff3f6" }}>
            <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh"}}>
                <BrowserRouter>
                    <AllRoutes/>
                </BrowserRouter>
            </Container>
        </Box>
    );
}

export default App;
