import { Route, Routes, useLocation } from "react-router-dom"
import Game from "../pages/Game"
import Home from "../pages/Home"
import Mode from "../pages/Mode"
import { AnimatePresence } from 'framer-motion';


const AllRoutes = () => {
    const location = useLocation()

    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.key}>
                <Route path="/" element={<Home />} />
                {/* <Route path='/play' element={<Mode />} />
                <Route path="/play/:level/:type" element={<Game />} /> */}
                <Route path="/play">
                    <Route index element={<Mode />} />
                    <Route path=":level/:type" element={<Game />} />
                </Route>
                <Route path='*' element={<Home />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AllRoutes