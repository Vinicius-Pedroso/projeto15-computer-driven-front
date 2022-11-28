import styled from "styled-components";
import axios from "axios";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";

export default function Produto({objeto}) {
  const [produtoAdicionado, setProdutoAdicionado] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const URL = `http://localhost:5000/carrinho`;
  // const config = {
  //   headers: {
  //     Authorization: "Bearer " + token,
  //   }
  // };
  function enviarProdutoCarrinho(e) {
    e.preventDefault();

    const body = {
      // id,
      quantity,
    };

    axios
      .post(URL, body)
      .then((res) => {
        setProdutoAdicionado(!produtoAdicionado);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  return (
    <ProdutoCard>
      <div className="card">
        <div className="card-img">
          <img src="" alt="" />
        </div>
        <div className="card-info">
          <p className="text-title"> </p>
        </div>
        <div className="card-footer">
          <span className="text-title">R$ </span>
          <p>Quantidade: </p>
          <select
            name="quantity"
            id=""
            onChange={(e) => {
              const selectedValue = e.target.value;
              setQuantity(selectedValue);
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <div className="card-button">
            {produtoAdicionado ? (
              <AiOutlineShoppingCart onClick={enviarProdutoCarrinho} />
            ) : (
              <div className="deletar">
                <p>Adicionado ao carrinho!</p>
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
    color: black;
  }
  .deletar {
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
    border: 1px solid black;
    border-radius: 50%;
    transition: 0.3s ease-in-out;
  }

  .card-img:hover {
    transform: translateY(-10%);
    box-shadow: rgba(226, 196, 63, 0.25) 0px 13px 47px -5px,
      rgba(180, 71, 71, 0.3) 0px 8px 16px -8px;
  }

  .card-button:hover {
    border: 1px solid black;
    border-radius: 50%;
  }
`;
