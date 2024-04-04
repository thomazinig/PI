import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from './pages/home/home';
import { VisualizarProduto } from "./pages/visualizarProduto/visualizarProduto";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path="/visualizarProduto/:id" element={<VisualizarProduto/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
