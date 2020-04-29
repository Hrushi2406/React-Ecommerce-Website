exports.userInterpolation = (data) => {
    data.userId = data.userid
    data.addressList = data.addresslist
    data.defaultAddress = data.defaultaddress
    delete data.userid;
    delete data.addresslist
    delete data.defaultaddress
    return data
}


exports.productInterpolation = (arrOfProd) => {
    arrOfProd.forEach(data => {
        data.productId = data.productid
        delete data.productid;
    })
    return arrOfProd

}

