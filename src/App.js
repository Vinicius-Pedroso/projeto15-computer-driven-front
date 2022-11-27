import { BrowserRouter, Route, Routes,} from "react-router-dom";
import GlobalStyle from "./Assets/GlobalStyles";
import Login from "./Pages/login";
import Cadastro from "./Pages/Cadastro";
import Produtos from "./Pages/Produtos";
import Cart from "./Pages/cart";
import PageNotFound from "./Components/PageNotFound";
import CheckOut from "./Components/checkOut";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<Produtos />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/pagamento" element={<CheckOut/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
