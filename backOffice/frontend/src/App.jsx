import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login/login";
import { SegundaTela } from "./pages/segundaTela/seegundaTela";
import { LIstarUsuarios } from "./pages/listarUsuarios/listarUsuarios";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/segundaTela" element={<SegundaTela/>}/>
      <Route path="/listarUsuarios" element={<LIstarUsuarios/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
