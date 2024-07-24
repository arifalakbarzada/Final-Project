import axios from "axios"
let productsUrl = import.meta.env.VITE_PRODUCTS_API
export const productsApi = {
    getAllProduct: async function () {
        return (await axios.get(productsUrl)).data

    },
    addProduct: function (param) {
        axios.post(productsUrl, param)
    }
}