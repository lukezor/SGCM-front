<template>
    <b-navbar :mobile-burger="false" :centered="true" :shadow="true">
        <template #brand>
            <b-navbar-item tag="div" class="icone">
                <b-icon @click.native="changeMenuState" icon="menu" size="is-medium"/>
            </b-navbar-item>
        </template>

        <template #start>
            <p class="user-welcome">Bem Vindo, {{username}}</p>
        </template>

        <template #end>
            <b-navbar-item tag="div" class="icone">
                <b-icon @click.native="redirect" icon="logout" size="is-medium"/>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default{
    data(){
        return{
            username: "TESTE"
        }
    },
    methods: {
        changeMenuState() {
            this.$store.commit('changeMenuState')
        },
        redirect(){
          window.location.replace('http://localhost:3000/login')
        }
   }
}
</script>
<style scoped>
.icone{
  cursor:pointer
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