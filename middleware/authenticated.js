import $store from '~/store/userData'
import apiClient from '~/utils/apiClient'

function redirectToLogin() {
    if (process.browser) {
        $store.commit('setToken', null)
        window.location = '/login'
    }
}

export default async function ({ store, redirect }) {
    const token = $store.state.token
    let isAuthenticated = false

    if (!token) {
        redirectToLogin()
    }

    try {
        const result = await apiClient.checkSession()
        console.log("resultado do me: ",result)
        
        $store.commit("setUser",  result)

        isAuthenticated = true
    } catch (err) {
        isAuthenticated = false
    }

    if (isAuthenticated != true) {
        redirectToLogin()
    }
}