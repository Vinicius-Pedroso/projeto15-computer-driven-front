import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import GlobalStyle from "./Assets/GlobalStyles";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={}/>
      <Route path="/cadastro" element={}/>
      <Route path="/produtos" element={}/>
      <Route path="/carrinho" element={}/>
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
