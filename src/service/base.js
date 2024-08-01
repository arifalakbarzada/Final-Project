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
    ,
    deleteProduct: function (id) {
        axios.delete(`${productsUrl}/${id}`)
        }
        ,
        updateProduct: function (id, param) {
            axios.put(`${productsUrl}/${id}`, param)
            }
            ,
            getSingleProduct: async function (id) {
                try {
                    const response = await axios.get(`${productsUrl}/${id}`);
                    return response.data;
                } catch (error) {
                    console.error(error);
                    throw error; 
                }
            }
}