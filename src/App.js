import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import GlobalStyle from "./Assets/GlobalStyles";
import Login from "./Pages/Login";
import Cadastro from "./Pages/Cadastro";
import Produtos from "./Pages/Produtos";
import Carrinho from "./Pages/Carrinho";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/carrinho" element={<Carrinho />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
