import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from './pages/home/home';
import { VisualizarProduto } from "./pages/visualizarProduto/visualizarProduto";
import { Login } from "./pages/login/login";
import { SignUp } from "./pages/signUp/signUp";
import { EditarCliente } from "./pages/editarCliente/editarCliente";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path="/visualizarProduto/:id" element={<VisualizarProduto/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/cadastro" element={<SignUp/>}/>
      <Route path="/editarCliente/:id" element={<EditarCliente/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
