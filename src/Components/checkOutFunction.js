import axios from "axios";

export default async function reportCompleteCheckout (){

    const checkoutDone = true

    const response = await axios.post(`http://localhost:5000/cart`, checkoutDone, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .catch((err) => {
        return err.response;
      });
    return alert.log("Seu pedido foi realizado com sucesso!")
}