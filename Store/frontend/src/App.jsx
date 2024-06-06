import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from './pages/home/home';
import { VisualizarProduto } from "./pages/visualizarProduto/visualizarProduto";
import { Login } from "./pages/login/login";
import { SignUp } from "./pages/signUp/signUp";
import { EditarCliente } from "./pages/editarCliente/editarCliente";
import { DefaultLayout } from "./layout/defaultLayout";
import { Profile } from "./pages/profile/profile";
import { ListarEnderecoEntrega } from "./pages/enderecoEntrega/listarEnderecosEntrega";
import { AdicionarEndereco } from "./pages/enderecoEntrega/adicionarEndereco";
import { EditarEndereco } from "./pages/enderecoEntrega/editarEndereco";
import Provider from "./context/Provider";
import Cart from "./pages/cart/cart";
import { CheckoutEndereco } from "./pages/checkout/checkoutEndereco";
import { AdicionarEnderecoCarrinho } from "./pages/enderecoEntrega/adicionarEnderecoCarrinho";
import { CheckoutPagamento } from "./pages/checkout/checkoutPagamento";
import { CheckoutFinal } from "./pages/checkout/checkoutFinal";
import { MeusPedidos } from "./pages/checkout/meusPedidos";

function App() {
  return (
    <Provider>
      <Cart />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={< DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/visualizarProduto/:id" element={<VisualizarProduto />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/listarEnderecoEntrega" element={<ListarEnderecoEntrega />} />
            <Route path="/adicionarEndereco" element={<AdicionarEndereco />} />
            <Route path="/adicionarEnderecoCarrinho" element={<AdicionarEnderecoCarrinho />} />
            <Route path="/editarEndereco/:id" element={<EditarEndereco />} />
            <Route path="/checkoutEndereco" element={<CheckoutEndereco />} />
            <Route path="/checkoutPagamento" element={<CheckoutPagamento />} />
            <Route path="/CheckoutFinal" element={<CheckoutFinal />} />
            <Route path="/MeusPedidos" element={<MeusPedidos />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/editarCliente/:id" element={<EditarCliente />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
