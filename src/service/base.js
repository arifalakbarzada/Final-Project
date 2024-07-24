import axios from "axios"
export let productsUrl = import.meta.env.VITE_PRODUCTS_API
export const productsApi = {
    getAllProduct: async function () {
        try {
            const response = await axios.get(productsUrl);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error; 
        }
    }
    ,
    addProduct: function (param) {
        axios.post(productsUrl, param)
    }
}