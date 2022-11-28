import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/27dd36c9dc1349ffa91746cce1db97d4.png";
// import { AuthContext } from "../Contexts/AuthContext";
// import { useContext } from "react";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const setJwt  = useContext(AuthContext);

  function sendToHome(e) {
    e.preventDefault();

    const URL = "http://localhost:5000/login";
    const body = { email, password };
    axios
      .post(URL, body)
      .then((res) => {
        // setJwt(res.data.token);
        navigate("/produtos");
      })
      .catch((res) => console.log(res));
  }
  return (
    <TelaInteira>
      <img src={logo} alt="" />

      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={sendToHome}>Fazer Login</button>
      <Link to="/cadastro" style={{ textDecoration: "none", color: "black" }}>
        <p>
          Não possui cadastro? <span>Faça seu cadastro!</span>
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
