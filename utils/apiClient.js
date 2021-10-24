'use strict'

import $store from '~/store/userData'

const axios = require('axios')
const urljoin = require('url-join')
const queryString = require('query-string')
const isDeploy = false


function getUrl() {
    switch (isDeploy){
        case true:
            return 'https://api-deploy.com/api'
        case false:
            return 'http://localhost:8000'
        default:
            return 'http://localhost:8000'
    }
}

function internalRequest(method, url, data, skipToken) {
    let baseUrl = getUrl()
    let headers = null

    if (skipToken)
        headers = {
            'Content-Type': 'application/json'
        }
    else
        headers = {
            'Authorization': 'Token ' + $store.state.token,
            'Content-Type': 'application/json'
        }

        console.log("infos: \n",baseUrl + '/' + url, method, headers)
    return axios({
        method: method,
        headers: headers,
        crossdomain: true,
        url: baseUrl + '/' + url,
        data: data
    })
        .then(function (res) {
            if (res.data)
                return res.data

            return null
        })
        .catch(function (err) {
            var exception = {}
            console.log(err)
            if (err.response && err.response.data) {
                exception.data = err.response.data
                exception.statusCode = err.response.status
            }

            throw exception
        })
}

function internalDelete(url) {
    return internalRequest('delete', url, null)
}

function internalGet(url) {
    return internalRequest('get', url, null)
}

function internalPost(url, data, skipToken) {
    return internalRequest('post', url, data, skipToken)
}

function internalPut(url, data) {
    return internalRequest('put', url, data)
}

class ApiClient {

    buscaCep(cep) {
        var url = 'https://viacep.com.br/ws/' + cep + '/json/'

        return axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
            crossdomain: true,
            url: url
        })
            .then(function (res) {
                if (res.data)
                    return res.data

                return null
            })
            .catch(function (err) {
                var exception = {}

                if (err.response && err.response.data) {
                    exception.data = err.response.data
                    exception.statusCode = err.response.status
                }

                throw exception
            })
    }

    // AUTH
    async login(username, password) {
        const payload = {
            'username': username,
            'password': password
        }

        const result = await internalPost(urljoin('auth', 'token','login'), payload, true)
        $store.commit('setToken', result.auth_token)
        return result
    }

    async checkSession() {
        return internalGet(urljoin('auth', 'users', 'me/'))
    }

    async changePassword(payload){
        return internalPost(urljoin('auth','users','set_password/'),payload)
    }

    async logout(){
        return internalPost(urljoin('auth','token','logout'),null)
    }

    // USERS

    async getAllUsers(){
        return internalGet(urljoin('api', 'users/'))
    }

    async getUserById(userId) {
        return internalGet(urljoin('api', 'users', userId.toString() + '/'))
    }

    async createUser(user) {
        return internalPost('auth/users/', user)
    }

    async updateUser(user) {
        return internalPut(urljoin('auth','users', user.id.toString() + '/'), user)
    }

    // INFOS PESSOAIS

    async getAllPersonalInfos(){
        return internalGet(urljoin('api', 'infospessoais/'))
    }

    async getInfosById(userId) {
        return internalGet(urljoin('api', 'infospessoais', userId.toString() + '/'))
    }

    async createInfos(infos) {
        return internalPost('api/infospessoais/', infos)
    }

    async updateInfos(infos) {
        return internalPut(urljoin('api','infospessoais', infos.id.toString() + '/'), infos)
    }

    async getPacientesSemInfo(){
        var params = "?info_cadastrada=false&user_type=PACIENTE"
        return internalGet(urljoin('api','users','/',params))
    }
}


export default new ApiClient()