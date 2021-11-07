<template>
    <b-sidebar
      type="is-primary"
      :fullheight="true"
      :fullwidth="false"
      :overlay="true"
      :right="false"
      :open="menuState"
      :onCancel="changeMenuState"
    >
      <div class="p-1">
        <img
          src="../../assets/images/logo.png"
          alt="SGCM"
        />
        <b-menu>
          <b-menu-list label="Páginas">
            <b-menu-item icon="home" label="Home" tag="router-link" to="/"></b-menu-item>
            <b-menu-item icon="clock-outline" label="Agendamentos" tag="router-link" to="/agendamento/listagem"></b-menu-item>
            <b-menu-item v-if="userType == 'PACIENTE' || userType == 'MEDICO'" icon="newspaper-variant-outline" label="Prontuários" tag="router-link" to="/prontuario/listagem"></b-menu-item>
            <b-menu-item v-if="userType == 'ADMIN'" icon="account" label="Cadastros" tag="router-link" to="/cadastro/listagem"></b-menu-item>
            <b-menu-item v-if="userType == 'ADMIN' || userType == 'SECRETARIO'" icon="account-details" label="Informações Pessoais" tag="router-link" to="/infospessoais/listagem"></b-menu-item>
            <b-menu-item v-if="userType == 'PACIENTE'" icon="account-details" label="Informações Pessoais" tag="router-link" to="/infospessoais/"></b-menu-item>
            <b-menu-item v-if="userType == 'ADMIN'" icon="chart-box-outline" label="Relatórios" tag="router-link" to="/relatorios/listagem"></b-menu-item>
          </b-menu-list>
          <b-menu-list label="Ações">
            <b-menu-item @click.native="changePass" label="Alterar Senha" icon="lock-reset"></b-menu-item>
            <b-menu-item @click.native="logout" label="Logout" icon="close-circle-outline"></b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
</template>

<script>
import apiClient from '~/utils/apiClient'
import $store from '~/store/userData';
export default {
  data() {
    return {
    };
  },
  computed: {
        menuState () {
            return this.$store.state.openMenu
        },
        userType(){
          return $store.state.user.user_type
        }
  },
   methods: {
        changeMenuState() {
            this.$store.commit('changeMenuState')
        },
        changePass(){
            this.$router.push('/alterar-senha')
        },
        async logout(){
            await apiClient.logout()
            window.location.replace('https://sgcm-front.herokuapp.com/login')
        }
   }
};
</script>

<style lang="scss" scoped>
.p-1 {
  padding: 1em;
}
.menu-label{
    color:#CCC;
}
.menu-list a{
    color:#EEE !important;
}
span{
    color:#EEE
}
</style>