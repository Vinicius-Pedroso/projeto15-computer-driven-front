import styled from "styled-components";
import { useNavigate } from "react-router";
import { useState, useEffect } from 'react'
import { ProductAddOne, ProductSubOne, ProductRemove } from "../Components/cartFunctions";
import { RefreshContext } from "../Contexts/RefreshContext";
import { AuthContext } from "../context/AuthContext";
import { reportCompleteCheckout } from "../Components/reportCompleteCheck";
import joi from 'joi'

export default function Cart() {

    const { refresh } = useContext(RefreshContext);
    const { jwt, setJwt } = useContext(AuthContext);
    const navigate = useNavigate("")
    const [balance, setBalance] = useState(0)
    const [cartProducts, setCartProducts] = useState([])
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [brazillianState, setBrazillianState] = useState("")
    const [number, setNumber] = useState("")
    

    useEffect(() => {

        DisplayProducts();

    }, [refresh]);

    const adressSchema = joi.object({
        street: joi.string().required().min(3),
        city: joi.string().required().min(3),
        brazillianState: joi.string().required().min(3),
        number: joi.number().required
    });

    function handleOut() {

        setJwt("");
        navigate("/");
    }

    async function HandleAddProduct(productId) {

        await ProductAddOne(productId, jwt).then((res) => {
            if (res.status === 401) {
                return console.log("erro ao editar o produto")
            }
        });

        DisplayProducts();
    }

    async function HandleSubProduct(productId) {

        await ProductSubOne(productId, jwt).then((res) => {
            if (res.status === 401) {
                return console.log("erro ao editar o produto")
            }
        });

        DisplayProducts();
    }

    async function HandleRemoveProduct(productId) {

        await ProductRemove(productId, jwt).then((res) => {
            if (res.status === 401) {
                return console.log("erro ao deletar o produto do carrinho")
            }
        });

        DisplayProducts();
    }

    async function DisplayProducts() {

        let total = 0

        if (!jwt) {
            navigate("/");
        }

        const response = axios.get(`http://localhost:5000/cart`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        }).catch((err) => {
            return err.response;
        });

        setCartProducts(response.data.cartProducts);

        response.data.cartProducts.forEach((product) => {
            total += Number(product.value * product.quantity);
        })

        setBalance(total);
    }

    function HandleCheckOut(){

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
        <Container>po

            <header>
                <h2>Bem vindo, {user.name}</h2>
                <ion-icon name="exit-outline" onClick={handleOut}></ion-icon>
            </header>


            <Products>
                {cartProducts.map((product, id) => (<>
                    <div className="product">
                        <img src='product.imgUrl' alt="" />
                        <div>
                            <p >{product.name}</p>
                            <p >{product.quantity} unidade(s)</p>
                            <p >{product.price}</p>
                            <p >Total: {product.price * product.quantity}</p>
                        </div>
                    </div>
                    <EditCart>
                        <div className="edit" onClick={() => HandleAddProduct(product.id)}>
                            <ion-icon name="close-circle-outline">Adicionar</ion-icon>
                        </div>
                        <div className="edit" onClick={() => HandleSubProduct(product.id)}>
                            <ion-icon name="remove-circle-outline">Retirar</ion-icon>
                        </div>
                        <div className="edit" onClick={() => HandleRemoveProduct(product.id)}>
                            <ion-icon name="close-circle-outline">Deletar</ion-icon>
                        </div>
                    </EditCart>
                    <div className="line"></div>
                </>))}
            </Products>

            <h3>Custo total: R$ {balance}</h3>
            <h3>Por favor, insira o endereço da entrega!</h3>

            <div className="inputcolomn">

                <input
                    type="text"
                    placeholder="Rua"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                />
                <div className="line"></div>
                <input
                    type="text"
                    placeholder="Cidade"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <div className="line"></div>
                <input
                    type="text"
                    placeholder="Estado (sigla)"
                    value={brazillianState}
                    onChange={(e) => setBrazillianState(e.target.value)}
                />
                <div className="line"></div>
                <input
                    type="text"
                    placeholder="Número"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />
            </div>
            <div className="line"></div>

            <button >Finalizar a compra:</button>


            <section>

                <Button onClick={() => HandleCheckOut()}>Finalizar a compra</Button>
            </section>
        </Container>
    )
}

const Container = styled.div`
    padding-top: 5%;
    height: 100hv;
    width: 100%;
    padding-left: 5%;

    .product{
        display: flex;
        flex-wrap: wrap;
    }

    h2{
        width: 100%;
        padding-top: 10px;
        padding-left: 5%;
        font-size: 22px;
        font-family: Poppins;
        color: black;
    }

    .product:div {
        width: 100%;
        padding-top: 10%;
        padding-bottom: 10%;
        display: flex;
        flex-direction: column;
    }

    h3{
        height: 40px;
        font-size: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    p {
        width: 100%;
        padding-top: 10px;
        padding-left: 5%;
        font-size: 15px;
        font-family: Poppins;
        color: black;
    }

    .inputcolomn {
        display: flex;
        flex-direction: column;
    }

    input {
        height: 15px;
        width: 89%;
        border-radius: 3px;
        font-size: 15px;
        font-family: Poppins;
        color: black;
        background-color: #f0f0f0;
        border: 1px none black;
        ::placeholder {
            color: black;
        }
    }

    img {
        padding-left: 5%;
        padding-top: 10px;
        padding-bottom: 20px;
        height: 120px;
        width: 120px;
        border-radius: 0.5rem;
    }

    h1{
        padding-top: 5px;
        padding-bottom: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
        font-family: Poppins;
        color: #404040;
    }
    
    .line{
        width: 100vw;
        height: 2px;
        background-color: white;
    }

    button {
        margin-top: 5%;
        margin-bottom: 2%;
        height: 40px;
        width: 90%;
        border-radius: 40px;
        font-size: 15px;
        font-family: Poppins;
        color: white;
        background-color: black;
        border: 1px none black;
    }

    .userData{
        width: 85%;
        padding-right: 5%;
        background-color: lightgray;
        border-radius: 10px;
        border: none;
    }
`

const EditCart = styled.div`
    padding-bottom: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;

`