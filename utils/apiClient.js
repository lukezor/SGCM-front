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

    async getUserByType(type) {
        var params = "?user_type=" + type
        return internalGet(urljoin('api','users','/',params))
    }

    async getAllUsersToday(today) {
        var params = "?date_joined=" + today
        return internalGet(urljoin('api','users','/',params))
    }

    async createUser(user) {
        return internalPost('auth/users/', user)
    }

    async updateUser(user) {
        return internalPut(urljoin('api','users', user.id.toString() + '/'), user)
    }

    // INFOS PESSOAIS

    async getAllPersonalInfos(){
        return internalGet(urljoin('api', 'infospessoais/'))
    }

    async getInfosById(userId) {
        return internalGet(urljoin('api', 'infospessoais', userId.toString() + '/'))
    }

    async getMyPersonalInfo(userId) {
        var params = "?id_paciente="+userId
        return internalGet(urljoin('api','infospessoais','/',params))
    }

    async createInfos(infos) {
        return internalPost('api/infospessoais/', infos)
    }

    async updateInfos(infos) {
        return internalPut(urljoin('api','infospessoais', infos.id.toString() + '/'), infos)
    }

    async updateUserInfosCadastradas(user) {
        return internalPut(urljoin('api','userinfo', user.id.toString() + '/'), user)
    }

    async getPacientesSemInfo(){
        var params = "?info_cadastrada=false&user_type=PACIENTE"
        return internalGet(urljoin('api','users','/',params))
    }

    // Agendamentos

    async getAllAgendamentos() {
        return internalGet(urljoin('api','agendamentos/'))
    }

    async createAgendamento(obj) {
        return internalPost('api/agendamentos/', obj)
    }

    async deleteAgendamento(id) {
        return internalDelete('api/agendamentos/'+id+'/')
    }

    async alterarAgendamento(obj,id) {
        return internalPut('api/agendamentos/'+id+'/', obj)
    }

    async changeStatusAgendamento(id,status) {
        let obj={
            status: status
        }
        return internalPut('api/changeAgendamentoStatus/'+id+'/', obj)
    }

    async getAgendamentoById(id) {
        return internalGet(urljoin('api', 'agendamentos', id.toString() + '/'))
    }

    async getAllClienteAgendamentos(id) {
        // Pegar os agendamentos para o paciente que está usando o sistema
        var params = "?id_paciente="+ id
        return internalGet(urljoin('api','agendamentos','/',params))
    }

    async getAgendamentosToday(today) {
        var params = "?data=" + today
        return internalGet(urljoin('api','agendamentos','/',params))
    }

    async getAgendamentosByMedicoDateTime(date,time,medico) {
        var params = ("?id_medico="+medico+"&data_hora=" + date + "T" + time)
        return internalGet(urljoin('api','agendamentos','/',params))
    }

    async getMyAgendamentosToday(today,id) {
        // Pegar os agendamentos de hoje aguardando confirmação para o paciente que está usando o sistema
        var params = "?data=" + today + "&id_paciente="+ id + '&status=0'
        return internalGet(urljoin('api','agendamentos','/',params))
    }

    async getMyConsultasToday(today,id) {
        // Pegar os agendamentos de hoje confirmados para o medico que está usando o sistema
        var params = "?data=" + today + "&id_medico="+ id + '&status=1'
        return internalGet(urljoin('api','agendamentos','/',params))
    }

    // Prontuários

    async getProntuariosByQuery(query){
        return internalGet(urljoin('api','prontuarios','/',query))
    }
}


export default new ApiClient()