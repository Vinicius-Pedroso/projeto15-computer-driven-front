import { useNavigate } from "react-router";
import { useState } from 'react'
import { ProductAddOne, ProductSubOne, ProductRemove } from "./cartFunctions";
import { RefreshContext } from "../Contexts/RefreshContext";

export default function cart(){

    const { refresh } = useContext(RefreshContext);
    const { jwt, setJwt } = useContext(AuthContext);
    const navigate = useNavigate("")
    const [balance, setBalance] = useState(0)
    const [cartProducts, setCartProducts] = useState([])

    useEffect(() => {

        DisplayProducts();
    
    }, [refresh]);

    function handleOut(){

        setJwt("");
        navigate("/");
    }

    function HandleAddProduct (productId){

        ProductAddOne(productId, jwt).then((res) => {
            if (res.status === 401) {
              return console.log("erro ao editar o produto")
            }
        });

        DisplayProducts();
    }

    function HandleSubProduct (productId){

        ProductSubOne(productId, jwt).then((res) => {
            if (res.status === 401) {
              return console.log("erro ao editar o produto")
            }
        });
        
        DisplayProducts();
    }

    function HandleRemoveProduct (productId, productId){

        ProductRemove(jwt).then((res) => {
            if (res.status === 401) {
              return console.log("erro ao deletar o produto do carrinho")
            }
        });

        DisplayProducts();
    }

    async function DisplayProducts (){

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

            <header>
                <h1>Welcome, {user.name}</h1>
                <ion-icon name="exit-outline" onClick={handleOut}></ion-icon>
            </header>

            <div>

                <Products>
                    <ul>
                        {cartProducts.map((product, id) => (
                            <li key={id}>

                                <div>
                                    {/* product data */}
                                </div>

                                <Button onClick={() => HandleAddProduct(key)}>
                                    <ion-icon name="close-circle-outline">Adicionar</ion-icon>
                                </Button>
                                <Button onClick={() => HandleSubProduct(key)}>
                                    <ion-icon name="remove-circle-outline">Retirar</ion-icon>
                                </Button>
                                <Button onClick={() => HandleRemoveProduct(key)}>
                                    <ion-icon name="close-circle-outline">Deletar</ion-icon>
                                </Button>

                            </li>
                        ))}
                    </ul>
                </Products>

                <Balance>
                    <span>Custo total:</span>
                    <span>R$ {balance}</span>
                </Balance>

                <section>
                
                <Button onClick={() => HandleCheckOut}>Finalizar a compra</Button>
                </section>
            </div>
        </Container>
    )
}

const Container = styled.div`
    height: 100hv;
    
    header {
        margin-top: 5%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`

const Products = styled.section`

`

const Balance = styled.div`

`