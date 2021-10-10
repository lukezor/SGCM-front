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
            <b-menu-item icon="clock-outline" label="Agendamentos" tag="router-link" to="/agendamento"></b-menu-item>
            <b-menu-item icon="newspaper-variant-outline" label="Prontuários" tag="router-link" to="/"></b-menu-item>
            <b-menu-item icon="account" label="Cadastros" tag="router-link" to="/cadastro"></b-menu-item>
            <b-menu-item icon="chart-box-outline" label="Relatórios" tag="router-link" to="/relatorios"></b-menu-item>
          </b-menu-list>
          <b-menu-list label="Ações">
            <b-menu-item @click.native="logout" label="Logout" icon="close-circle-outline"></b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
</template>

<script>
import apiClient from '~/utils/apiClient'
export default {
  data() {
    return {
    };
  },
  computed: {
        menuState () {
            return this.$store.state.openMenu
        }
  },
   methods: {
        changeMenuState() {
            this.$store.commit('changeMenuState')
        },
        async logout(){
            await apiClient.logout()
            window.location.replace('http://localhost:3000/login')
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