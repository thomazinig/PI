import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login/login";
import { SegundaTela } from "./pages/segundaTela/seegundaTela";
import { LIstarUsuarios } from "./pages/listarUsuarios/listarUsuarios";
import { CadastrarUsuario } from "./pages/cadastarUsuarios/cadastrarUsuario";
import { UserProvider } from "./pages/userId";
import { EditarCadastro } from "./pages/editarCadastro/editarCadastro";
import { CadastrarProduto } from "./pages/cadastrarProduto/cadastrarProdutos";
import { ListarProduto } from "./pages/listarProduto/listarProduto";
import { VisualizarProduto } from "./pages/visualizarProduto/visualizarProduto";
import { EditarProduto } from "./pages/editarProduto/editarProduto";

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
      <Route path="/cadastrarProduto" element={<CadastrarProduto/>}/>
      <Route path="/listarProduto" element={<ListarProduto/>}/>
      <Route path="/visualizarProduto/:id" element={<VisualizarProduto/>}/>
      <Route path="/editarProduto/:id" element={<EditarProduto/>}/>
    </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
