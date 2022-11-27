import axios from 'axios'

export function ProductAddOne(id, jwt) {

    const alteration = {
        modify:  1,
        productId: id,
        remove: false
    }

    const response = axios
      .post(`http://localhost:5000/cart`, alteration, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .catch((err) => {
        return err.response;
      });
    return response;
}

export function ProductSubOne(id, jwt) {

    const alteration = {
        modify:  -1,
        productId: id,
        remove: false
    }

    const response = axios
      .post(`http://localhost:5000/cart`, alteration, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .catch((err) => {
        return err.response;
      });
    return response;
}


export function ProductRemove(id, jwt) {

    const alteration = {
        modify:  0,
        productId: id,
        remove: true
    }

    const response = axios
      .post(`http://localhost:5000/cart`, alteration, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .catch((err) => {
        return err.response;
      });
    return response;
}
