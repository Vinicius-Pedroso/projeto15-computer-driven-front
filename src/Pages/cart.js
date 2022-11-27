import { useNavigate } from "react-router";
import { useState } from 'react'
import { ProductAddOne, ProductSubOne, ProductRemove } from "../Components/cartFunctions";
import { RefreshContext } from "../Contexts/RefreshContext";

export default function Cart(){

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

    function HandleRemoveProduct (productId){

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

    function HandleCheckOut (){

        navigate("/pagamento")
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

                            <ProdutoCard>
                                <div className="card">
                                    <div className="card-img">
                                    <img src={product.image} alt="" />
                                    </div>
                                    <div className="card-info">
                                    <p className="text-title">{product.name} </p>
                                    <p className="text-body">{product.description}</p>
                                    </div>
                                    <div className="card-footer">
                                    <span className="text-title">R$ {product.price}</span>
                                    </div>
                                </div>
                            </ProdutoCard>
                            <EditCart>
                                <div className="edit" onClick={() => HandleAddProduct(key)}>
                                    <ion-icon name="close-circle-outline">Adicionar</ion-icon>
                                </div>
                                <div className="edit" onClick={() => HandleSubProduct(key)}>
                                    <ion-icon name="remove-circle-outline">Retirar</ion-icon>
                                </div>
                                <div className="edit" onClick={() => HandleRemoveProduct(key)}>
                                    <ion-icon name="close-circle-outline">Deletar</ion-icon>
                                </div>
                            </EditCart>
                                
                            </li>
                        ))}
                    </ul>
                </Products>

                <Balance>
                    <span>Custo total:</span>
                    <span>R$ {balance}</span>
                </Balance>

                <section>
                
                <Button onClick={() => HandleCheckOut()}>Finalizar a compra</Button>
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

const EditCart = styled.div`

    .edit{
        width: 100px;
        height: 40px;
        background-color: grey;
        border-radius: 5px;
        display: table-cell;
        text-align: center;
        vertical-align: middle;
    }

`

const Balance = styled.div`

`