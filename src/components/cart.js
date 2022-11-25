import { useNavigate } from "react-router";
import { useState } from 'react'


export default function cart(){

    const navigate = useNavigate("")
    const [useProducts, setUseProducts] = useState([])

    function handleOut(){

        setJwt("");
        navigate("/");
    }

    function HandleAddProduct (){

    }

    function HandleSubProduct (){

    }

    function HandleRemoveProduct (){

    }

    function DisplayProducts (){
        
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
                        {products.map((product, id) => (
                            <li key={id}>

                                <div>
                                    {/* product data */}
                                </div>

                                <Button onClick={() => HandleAddProduct()}>
                                    <ion-icon name="close-circle-outline">Adicionar</ion-icon>
                                </Button>
                                <Button onClick={() => HandleSubProduct("entrada")}>
                                    <ion-icon name="remove-circle-outline">Retirar</ion-icon>
                                </Button>
                                <Button onClick={() => HandleRemoveProduct("entrada")}>
                                    <ion-icon name="close-circle-outline">Deletar</ion-icon>
                                </Button>

                            </li>
                        ))}
                    </ul>
                </Products>

                <Balance>
                    <span>Custo total:</span>
                    <span>R$ {finalPrice}</span>
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

const ProductTemplate = styled.section`

`