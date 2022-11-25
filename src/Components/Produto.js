import styled from "styled-components";
import axios from "axios";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";

export default function Produto({
  preco,
  nome,
  descricao,
  imagem,
  productId,
  token,
}) {
  const [produtoAdicionado, setProdutoAdicionado] = useState(false);

  const URL = `http://localhost:5000/carrinho/${productId}`;
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  function enviarProdutoCarrinho(e) {
    e.preventDefault();
    
    const body = {
      productId,
    };

    axios
      .post(URL, body, config)
      .then((res) => {
        setProdutoAdicionado(!produtoAdicionado);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function deletarProdutoCarrinho(e) {
    e.preventDefault()
    axios.delete(URL, config)
    .then((res) => {
        setProdutoAdicionado(!produtoAdicionado)
    })
    .catch((res) => {
        console.log(res)
    })
  }
  
  return (
    <ProdutoCard>
      <div className="card">
        <div className="card-img">
          <img src={imagem} alt="" />
        </div>
        <div className="card-info">
          <p className="text-title">{nome} </p>
          <p className="text-body">{descricao}</p>
        </div>
        <div className="card-footer">
          <span className="text-title">R$ {preco}</span>
          <div className="card-button">
            {produtoAdicionado ? (
              <AiOutlineShoppingCart onClick={enviarProdutoCarrinho} />
            ) : (
              <div className="deletar" onClick={deletarProdutoCarrinho}>
                <p>Retirar do carrinho!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProdutoCard>
  );
}

const ProdutoCard = styled.div`
  .card {
    width: 88vw;
    height: 254px;
    border-radius: 10px;
    padding: 0.8em;
    font-family: Poppins;
    background: #f5f5f5;
    position: relative;
    overflow: visible;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  p {
    font-size: 15px;
    font-family: Poppins;
    color: white;
  }
  .deletar{
    width: 100px;
    height: 40px;
    background-color: grey;
    border-radius: 5px;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }

  .card-img {
    background-color: #ffcaa6;
    height: 40%;
    width: 100%;
    border-radius: 0.5rem;
    transition: 0.3s ease;
  }

  .card-info {
    padding-top: 5%;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  .card-footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    border-top: 1px solid #ddd;
  }

  .text-title {
    font-weight: 900;
    font-size: 1.2em;
    line-height: 1.5;
  }

  .text-body {
    font-size: 0.9em;
    padding-bottom: 10px;
  }

  .card-button {
    font-size: 80px;
    display: flex;
    padding: 0.3em;
    cursor: pointer;

    transition: 0.3s ease-in-out;
  }

  .card-img:hover {
    transform: translateY(-25%);
    box-shadow: rgba(226, 196, 63, 0.25) 0px 13px 47px -5px,
      rgba(180, 71, 71, 0.3) 0px 8px 16px -8px;
  }

  .card-button:hover {
    border: 1px solid #ffcaa6;
    background-color: #ffcaa6;
  }
`;
