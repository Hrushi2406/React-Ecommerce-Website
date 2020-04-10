export const addToCart = item => {
    var cartItems =
        localStorage.getItem('cartItems');
    var temp = JSON.parse(cartItems) ?? [];
    item.count++;
    item.inCart = true
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

export const increaseCount = (id) => {
    var cartItems =
        localStorage.getItem('cartItems');
    var temp = JSON.parse(cartItems) ?? [];
    var objId = temp.findIndex((obj => obj.id === id));
    temp[objId].count++;
    localStorage.setItem('cartItems', JSON.stringify(temp))

    return {
        type: 'GET_CART_ITEMS',
        payload: temp,
    }
}

export const decreaseCount = (id) => {
    var cartItems =
        localStorage.getItem('cartItems');
    var temp = JSON.parse(cartItems) ?? [];
    var objId = temp.findIndex((obj => obj.id === id));
    temp[objId].count = temp[objId].count - 1;
    localStorage.setItem('cartItems', JSON.stringify(temp))

    return {
        type: 'GET_CART_ITEMS',
        payload: temp,
    }
}

export const removeItem = (id) => {
    var cartItems =
        localStorage.getItem('cartItems');
    var temp = JSON.parse(cartItems) ?? [];
    var arr = temp.filter((item) => item.id !== id);
    localStorage.setItem('cartItems', JSON.stringify(arr))
    return {
        type: 'REMOVE_CART_ITEM',
        payload: arr,
    }
}