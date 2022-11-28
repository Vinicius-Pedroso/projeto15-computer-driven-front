import axios from "axios";

export async function reportCompleteCheckout(){
            
    const checkoutDone = true

    await axios.post(`http://localhost:5000/cart`, checkoutDone, {
        headers: {
        Authorization: `Bearer ${jwt}`,
        },
    }).catch((err) => {
        return err.response;
    });
    return alert.log("Seu pedido foi realizado com sucesso!")
};