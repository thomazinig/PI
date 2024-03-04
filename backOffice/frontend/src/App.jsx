import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login/login";
import { SegundaTela } from "./pages/segundaTela/seegundaTela";
import { LIstarUsuarios } from "./pages/listarUsuarios/listarUsuarios";
import { CadastrarUsuario } from "./pages/cadastarUsuarios/cadastrarUsuario";
import { UserProvider } from "./pages/userId";

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/segundaTela" element={<SegundaTela/>}/>
      <Route path="/listarUsuarios" element={<LIstarUsuarios/>}/>
      <Route path="/cadastrarUsuario" element={<CadastrarUsuario/>}/>
    </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
