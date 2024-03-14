import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login/login";
import { SegundaTela } from "./pages/segundaTela/seegundaTela";
import { LIstarUsuarios } from "./pages/listarUsuarios/listarUsuarios";
import { CadastrarUsuario } from "./pages/cadastarUsuarios/cadastrarUsuario";
import { UserProvider } from "./pages/userId";
import { EditarCadastro } from "./pages/editarCadastro/editarCadastro";
import { SalvarImagem } from "./pages/salvarImagem/salvarImagem";
import { CadastrarProduto } from "./pages/cadastrarProduto/cadastrarProdutos";

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/segundaTela" element={<SegundaTela/>}/>
      <Route path="/listarUsuarios" element={<LIstarUsuarios/>}/>
      <Route path="/cadastrarUsuario" element={<CadastrarUsuario/>}/>
      <Route path="/editar/:id" element={<EditarCadastro/>}/>
      <Route path="/salvarImagem" element={<SalvarImagem/>}/>
      <Route path="/cadastrarProduto" element={<CadastrarProduto/>}/>
    </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
