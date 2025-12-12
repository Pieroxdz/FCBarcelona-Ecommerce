import MainFooter from "./common/MainFooter"
import MainHeader from "./common/MainHeader"
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio"
import Team from "./pages/Team"
import Equipaciones from "./pages/Equipaciones";
import ProductoDetalle from "./components/ProductoDetalle";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./PrivateRoute";
import Perfil from "./pages/Perfil";
import { Socios } from "./pages/Socios";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <MainHeader />

                <Routes>
                    {/* Rutas existentes */}
                    <Route path='/' element={<Inicio />} />
                    <Route path="/equipaciones" element={<Equipaciones />} />
                    <Route path="/equipaciones/:idSubcategoria" element={<Equipaciones />} />
                    <Route path="/equipaciones/:idSubcategoria/:idSubsubcategoria" element={<Equipaciones />} />
                    <Route path="/producto/:id" element={<ProductoDetalle />} />
                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/perfil" element={<Perfil />} />
                    <Route path="/register" element={<Register />} />

                    <Route element={<PrivateRoute />}>
                        <Route path='/team' element={<Team />} />
                        <Route path='/socios' element={<Socios />} />
                    </Route>
                </Routes>
                <MainFooter />
            </BrowserRouter>
        </>
    )
}

export default App