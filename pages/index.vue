<template>
<div class = "home">
  <div v-if="userLoaded" class = "container-mobile">
    <p class = "mobile-title">Bem vindo ao sistema!</p>
    <p class = "mobile-subtitle">Utilize o menu lateral para acessar as funcionalidades.</p>
  </div>
  <div v-if="userLoaded" class = "container-left">
    <div class="container-left-top">
      <CardAgendamentos/>
    </div>
    <div class="container-left-bottom">
      <CardCadastros/>
    </div>
  </div>
  <div v-if="userLoaded" class="container-right">
    <div class="container-right-top">
      <CardConsultas/>
    </div>
    <div class="container-right-bottom">
      <CardRelatorios/>
    </div>
  </div>
</div>
</template>

<script>
import CardAgendamentos from '../components/atoms/CardAgendamentos.vue';
import CardCadastros from '../components/atoms/CardCadastros.vue';
import CardRelatorios from '../components/atoms/CardRelatorios.vue';
import CardConsultas from '../components/atoms/CardConsultas.vue';
import $store from '~/store/userData';
export default {
  name: "HomePage",
  middleware: 'authenticated',
  components:{CardAgendamentos,CardCadastros,CardRelatorios,CardConsultas},
  computed:{
        userLoaded() {
            return $store.state.user == null ? null : $store.state.user.username
        }
    },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-grow: 1;
}
.container-left {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right:20px;
}

.container-left-top{
  background-color: #fff;
  border-radius: 8px;
  flex:1;
  display:flex;
  margin-bottom:20px;
}

.container-left-bottom{
  background-color: #fff;
  border-radius: 8px;
  flex:1;
  display:flex;
}

.container-right-top{
  background-color: #fff;
  border-radius: 8px;
  flex:1;
  display:flex;
  margin-bottom:20px;
}

.container-right-bottom{
  background-color: #fff;
  border-radius: 8px;
  flex:1;
  display:flex;
}

.container-right {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.container-mobile{
  display:none
}

@media only screen and (max-width: 900px) {
  .container-right{
    display:none
  }
  .container-left{
    display:none
  }
  .container-mobile{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding:30px;
    width:100%;
    background-color: #fff;
    border-radius: 8px;
  }
  .mobile-title{
    font-size: 20px;
    font-weight: 800;
  }
}



</style>