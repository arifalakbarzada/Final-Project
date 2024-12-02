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
    },

    changeUserStatus: function (id, user, status) {
        axios.put(`${usersUrl}/${id}`, { ...user, status: status })
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
    getUserCountry: async function () {
        try {
            const response = await axios.get("https://ipinfo.io/json?token=89c1c413324bc8")
            return response.data
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    resetPassword: function (id, data, password) {
        const time = new Date();
        axios.put(`${usersUrl}/${id}`, { ...data, password: password, token: v4() , lastActivity : time })
    }
    ,
    changeUserData: function (id, user, param) {
        const time = new Date();
        axios.put(`${usersUrl}/${id}`, { ...user, ...param ,lastActivity : time  })
    },
    changeUserActivity: function (id, user, param) {
        axios.put(`${usersUrl}/${id}`, { ...user, lastActivity: param })
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

    },
    changeUserCart: function (id, user, changes) {
        const time = new Date()
        axios.put(`${usersUrl}/${id}`, { ...user, userCart: changes , lastActivity: time })

    }
}

export const favListApi = {
    getFavList: async function (id) {
        try {
            const response = await axios.get(`${usersUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    changeFavList: async function (id, user, changes) {
        const time = new Date()
        try {
            const updatedUser = { ...user, favlist: changes, lastActivity: time };
            const response = await axios.put(`${usersUrl}/${id}`, updatedUser);

            return response.data;
        } catch (error) {
            console.error("Error updating favList:", error);
            throw error;
        }
    }
};

export const ordersApi = {
    getOrders: async function (id) {
        try {
            const response = await axios.get(`${usersUrl}/${id}`)
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    changeOrder: function (id, user, changes) {
        axios.put(`${usersUrl}/${id}`, { ...user, orders: changes , userCart : [] })
    }
}