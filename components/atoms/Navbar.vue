<template>
    <b-navbar :mobile-burger="false" :centered="true" :shadow="true">
        <template #brand>
            <b-navbar-item tag="div" class="icone">
                <b-icon @click.native="changeMenuState" icon="menu" size="is-medium"/>
            </b-navbar-item>
        </template>

        <template #start>
            <p class="user-welcome">Bem Vindo, {{usuario}}</p>
        </template>

        <template #end>
            <b-navbar-item tag="div" class="icone">
                <b-icon @click.native="logout" icon="logout" size="is-medium"/>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import $store from '~/store/userData'
import apiClient from '~/utils/apiClient'
export default{
    computed:{
        usuario() {
            return $store.state.user == null ? null : ($store.state.user.first_name + ' ' + $store.state.user.last_name + ' (' + $store.state.user.user_type + ')')
        }
    },
    methods: {
        changeMenuState() {
            this.$store.commit('changeMenuState')
        },
        async logout(){
            await apiClient.logout()
            window.location.replace('https://sgcm-front.herokuapp.com/login')
        }
   }
}
</script>
<style scoped>
.icone{
  cursor:pointer
}
.icon{
    color:white;
}
nav{
  background-color: #367B7B;
}
.user-welcome{
    align-self:center;
    color:#fff;
    font-size: 18px;
    font-weight: 300;
}
</style>