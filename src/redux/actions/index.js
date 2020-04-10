export const addToCart = item => {
    var cartItems =
        localStorage.getItem('cartItems');
    var temp = JSON.parse(cartItems) ?? [];
    temp.push(item);

    localStorage.setItem('cartItems', JSON.stringify(temp))
    console.log(temp)

    return {
        type: 'ADD_TO_CART',
        payload: item,
    }
}

export const getCartItems = () => {
    var cartItems =
        localStorage.getItem('cartItems');
    var temp = JSON.parse(cartItems) ?? [];
    return {
        type: 'GET_CART_ITEMS',
        payload: temp,
    }
}