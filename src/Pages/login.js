import styled from 'styled-components'
import swal from "sweetalert";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setJwt } = useContext(AuthContext);

    function handleLogin (event){

        event.preventDefault();

        const userLogin = {
            email: email,
            password, password
        }

        const response = axios.post(`http://localhost:5000/login`, userLogin)

        response.then((res) => {
        if (res.data.message) {
            return swal({
            title: "Error",
            text: res.data.message,
            icon: "error",
            timer: "7000",
            });
        }

        setJwt(res.data.token);
        navigate("/");
        
        });
    }

    return (
        <Container>

            <img src='./img/leave.png' alt="" />

            <Form autoComplete="off">

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


                <button onClick={handleLogin}>Fazer Login</button>

                <Link to="/cadastro" style={{ textDecoration: "none", color: "black" }}>
                    <p>
                        Não possui cadastro? <span>Faça seu cadastro!</span>
                    </p>
                </Link>

            </Form>

        </Container>
    )
}

const Container = styled.div`
    height: 100hv;
    width: 100wv;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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
`