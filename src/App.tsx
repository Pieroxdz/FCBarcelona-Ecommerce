import MainFooter from "./common/MainFooter"
import MainHeader from "./common/MainHeader"
import Inicio from "./pages/Inicio"
import Team from "./pages/Team"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Equipaciones from "./pages/Equipaciones";
import ProductoDetalle from "./components/ProductoDetalle";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <MainHeader />

                <Routes>
                    {/* Rutas existentes */}
                    <Route path='/' element={<Inicio />} />
                    <Route path='/team' element={<Team />} />

                    <Route path="/equipaciones" element={<Equipaciones />} />
                    <Route path="/equipaciones/:idSubcategoria" element={<Equipaciones />} />
                    <Route path="/equipaciones/:idSubcategoria/:idSubsubcategoria" element={<Equipaciones />} />
                    <Route path="/producto/:id" element={<ProductoDetalle />} />

                </Routes>

                <MainFooter />
            </BrowserRouter>
        </>
    )
}

export default App