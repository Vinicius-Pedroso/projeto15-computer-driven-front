import styled from "styled-components";
import Produto from "../Components/Produto";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Produtos() {
  const [produtos, setProdutos] = useState({
    name: "",
    price: "",
    imgUrl: ""    
  });
  const URL = "http://localhost:5000/products";
  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        setProdutos(res.data);
       
      })
      .catch((res) => console.log(res));
  }, []);
  console.log(produtos);
  return (
    <TelaInteira>
      <Topo>
        <p>Driven Computers</p>
      </Topo>
      <p>Olá, esses são nossos produtos!</p>
      <ProdutosTodos>
        {produtos.map((objeto) => 
          <Produto />
        )}
      </ProdutosTodos>
      <Rodape>
        <Link to="/carrinho">
          <button>Ir para o Checkout!</button>
        </Link>
      </Rodape>
    </TelaInteira>
  );
}

const Rodape = styled.div`
  width: 100vw;
  height: 80px;
  background-color: black;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    height: 40px;
    width: 70vw;
    border-radius: 40px;
    font-size: 18px;
    font-family: Poppins;
    color: black;
    background-color: white;
    border: 1px none black;
  }
`;

const TelaInteira = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-family: Poppins;
    margin-top: 10px;
  }
`;

const ProdutosTodos = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  gap: 20px;
`;

const Topo = styled.div`
  width: 100vw;
  height: 130px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-family: Poppins;
    font-size: 30px;
    color: white;
  }
`;
