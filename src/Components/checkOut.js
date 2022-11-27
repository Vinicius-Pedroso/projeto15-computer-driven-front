import styled from "styled-components"
import { Link } from 'react-router-dom'
import { useState } from "react";
import { useNavigate } from "react-router";


export default function CheckOut (){

    const navigate = useNavigate("")
    const [cartProducts, setCartProducts] = useState([])

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

    return (
        <Container>
            <div className="userData">
                <p>Olá {user}</p>

                {cartProducts.map((product, id) => (
                    <li>
                        <img src={imagem} alt="" />
                        <p key={id}>{product.name} x{product.amount}</p>
                        <p key={id}>R$: {product.price}</p>
                        <p key={id}>Total: {product.price*product.amount}</p>
                    </li>
                        
                ))}
                if(cartProducts.length === 0){
                    <Link to="/">
                        <p>Não há produtos no seu carrinho!</p>
                    </Link>
                }
                    
            </div>
        </Container>
    )
}

const Container = styled.div`
    height: 100hv;
    width: 100wv;

    .userData{

    }
`