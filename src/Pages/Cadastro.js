import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import logo from "../Assets/27dd36c9dc1349ffa91746cce1db97d4.png";
import axios from "axios";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const navigate = useNavigate()

  function enviarCadastro(e){
    e.preventDefault()

    const URL = "http://localhost:5000/signup"
    const body ={nome,email, password1, password2}
    axios.post(URL, body)
    .then((res) =>{
      navigate("/")
    }).catch((res) => console.log(res))
  }


  return (
    <TelaInteira>
      <img src={logo} alt="" />

      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={password1}
        onChange={(e) => setPassword1(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirmar Senha"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />

      <button onClick={enviarCadastro}>Enviar Cadastro</button>
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <p>
          Já possui cadastro? <span>Faça seu login!</span>
        </p>
      </Link>
    </TelaInteira>
  );
}

const TelaInteira = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  img {
    height: 250px;
  }
  input {
    height: 50px;
    width: 70vw;
    border-radius: 40px;
    font-size: 13px;
    color: black;
    padding-left: 20px;
    background-color: aliceblue;
    border: 1px none black;
  }
  input:focus {
    border: 1px solid black;
  }
  button {
    height: 40px;
    width: 70vw;
    border-radius: 40px;
    font-size: 15px;
    font-family: Poppins;
    color: white;
    background-color: black;
    border: 1px none black;
  }
  button:focus {
    border: 3px solid aliceblue;
  }
  span {
    font-weight: 700;
  }
`;
