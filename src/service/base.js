import axios from "axios"
import { v4 } from "uuid";
export let productsUrl = import.meta.env.VITE_PRODUCTS_API
export let usersUrl = import.meta.env.VITE_USERS_API

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

export const usersApi = {
    getAllUsers: async function () {
        try {
            const response = await axios.get(usersUrl);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    ,
    addUser: function (param) {
        axios.post(usersUrl, param)
    }
    ,
    deleteUser: function (id) {
        axios.delete(`${usersUrl}/${id}`)
    }
    ,
    getSingleUser: async function (id) {
        try {
            const response = await axios.get(`${usersUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    ,
    resetPassword: function (id, data, password) {
        axios.put(`${usersUrl}/${id}`, { ...data, password: password, token: v4() })
    }
    ,
    changeUserData: function (id, param) {
        axios.patch(`${usersUrl}/${id}`, param)
    }
}

export const cartApi = {
    getCart: async function (id) {
        try {
            const response = await axios.get(`${usersUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
} 