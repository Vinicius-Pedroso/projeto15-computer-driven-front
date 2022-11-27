import styled from "styled-components";
import Produto from "../Components/Produto";

export default function Produtos() {
  if (!jwt) {
    navigate("/signin");
  }
  return (
    <TelaInteira>
      <Topo>
        <p>Driven Computers</p>
      </Topo>
      <p>Olá, esses são nossos produtos!</p>
      <ProdutosTodos>
        <Produto />
      </ProdutosTodos>
    </TelaInteira>
  );
}

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

