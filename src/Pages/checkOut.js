import styled from "styled-components"
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { RefreshContext } from "../Contexts/RefreshContext";
import { reportCompleteCheckout } from "../Components/reportCompleteCheck";
import joi from 'joi'

export default function CheckOut (){

    const { refresh } = useContext(RefreshContext);
    const navigate = useNavigate("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [brazillianState, setBrazillianState] = useState("")
    const [number, setNumber] = useState("")
    const [cartProducts, setCartProducts] = useState([])

    useEffect(() => {

        getProducts();
    
    }, [refresh]);

    const adressSchema = joi.object({
        street: joi.string().required().min(3),
        city: joi.string().required().min(3),
        brazillianState: joi.string().required().min(3),
        number: joi.number().required
    });

    async function getProducts (){

        let total = 0

        if (!jwt) {
            navigate("/");
        }

        const response = await pullAllUserProducts(jwt);
        setUser(response.data.user);
        setCartProducts(response.data.products);

        response.data.products.forEach((product) => {
            total += Number(product.value*product.amount);
        }) 
  
        setBalance(total);
    }

    function handleCheckOut(){

        const userAdress = {
            street: street,
            city: city,
            brazillianState: brazillianState, 
            number: number
        }

        const { error } = adressSchema.validate(userAdress, { abortEarly: false });

        if (error) {
            return alert("Endereço inválido")    
        }

        reportCompleteCheckout()    
    }

    return (
        <Container>
            <div className="userData">

                if(cartProducts.length === 0){
                    <Link to="/">
                        <h1>Não há produtos no seu carrinho!</h1>
                    </Link>
                }

                if(cartProducts){
                    <p>Olá {user}! Confira os produtos selecionados!</p>    
                }
                
                {cartProducts.map((product, id) => (
                    
                    <li>
                        <img src={imagem} alt="" />
                        <p key={id}>{product.name} x{product.amount}</p>
                        <p key={id}>{product.description}</p>
                        <p key={id}>Preço de cada unidade: R${product.price} </p>
                        <p key={id}>Total: {product.price*product.amount}</p>
                    </li>
                        
                ))}
                    
            </div>

            {cartProducts.length > 0} (
                <Form autoComplete="off">

                    <p>Por favor, insira o endereço da entrega!</p>

                    <input
                        type="text"
                        placeholder="Rua"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Cidade"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Estado (sigla)"
                        value={brazillianState}
                        onChange={(e) => setBrazillianState(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Número"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />

                </Form>

                <button onClick={handleCheckOut}>Finalizar a compra:</button>
            )
            
        </Container>
    )
}

const Container = styled.div`
    height: 100hv;
    width: 100wv;
    padding-left: 5%;

    .userData{

    }

    p {
        font-size: 15px;
        font-family: Poppins;
        color: white;
    }

    img {
        background-color: #ffcaa6;
        height: 40%;
        width: 100%;
        border-radius: 0.5rem;
        transition: 0.3s ease;
    }
    Link {
        display: flex;
        justify-content: center;
        align-items: center;

        h1{
            font-size: 26px;
            font-family: Poppins;
            color: darkgray;
        }
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
`