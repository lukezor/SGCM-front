<template>
<div class = "home">
  <div v-if="userLoaded" class = "container-mobile">
    <p class = "mobile-title">Bem vindo ao sistema!</p>
    <p class = "mobile-subtitle">Utilize o menu lateral para acessar as funcionalidades.</p>
  </div>
  <div v-if="userLoaded" class = "container-left">
    <!-- Superior Esquerdo -->
    <div v-if="userType == 'ADMIN' || userType == 'MEDICO' || userType == 'SECRETARIO'" class="container-left-top">
      <CardAgendamentos/>
    </div>
    <div v-if="userType == 'PACIENTE'" class="container-left-top">
      <CardAgendamentos :isPaciente="true"/>
    </div>
    <!-- Inferior Esquerdo -->
    <div v-if="userType == 'ADMIN'" class="container-left-bottom">
      <CardCadastros/>
    </div>
    <div v-if="userType == 'SECRETARIO'" class="container-left-bottom">
      <CardCadastros :hasListagem="false"/>
    </div>
    <div v-if="userType == 'MEDICO'" class="container-left-bottom">
      <CardProntuarios :hasListagem="true"/>
    </div>
    <div v-if="userType == 'PACIENTE'" class="container-left-bottom">
      <CardProntuarios :hasListagem="false"/>
    </div>
  </div>
  <div v-if="userLoaded" class="container-right">
    <!-- Direito Full -->
     <div v-if="userType =='MEDICO'" class="container-right-full">
      <CardConfirmacoes :userType="'MEDICO'" :quantidade="7"/>
    </div>
    <!-- Superior Direito -->
    <div v-if="userType != 'MEDICO'" class="container-right-top">
      <!-- <CardConsultas/> -->
      <CardAttInfos/>
    </div>
    <!-- Inferior Direito -->
    <div v-if="userType == 'ADMIN'" class="container-right-bottom">
      <CardRelatorios/>
    </div>
    <div v-if="userType == 'SECRETARIO' || userType == 'PACIENTE'" class="container-right-bottom">
      <CardConfirmacoes/>
    </div>
  </div>
</div>
</template>

<script>
import CardAgendamentos from '../components/atoms/CardAgendamentos.vue';
import CardCadastros from '../components/atoms/CardCadastros.vue';
import CardRelatorios from '../components/atoms/CardRelatorios.vue';
import CardConsultas from '../components/atoms/CardConsultas.vue';
import CardAttInfos from '../components/atoms/CardAttInfos.vue';
import CardConfirmacoes from '../components/atoms/CardConfirmacoes.vue';
import CardProntuarios from '../components/atoms/CardProntuarios.vue';
import $store from '~/store/userData';
export default {
  name: "HomePage",
  middleware: 'authenticated',
  components:{CardAgendamentos,CardCadastros,CardRelatorios,CardConsultas,CardAttInfos,CardConfirmacoes,CardProntuarios},
  computed:{
        userLoaded() {
            return $store.state.user == null ? null : $store.state.user.username
        },
        userType(){
          return $store.state.user.user_type
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

.container-right-full{
  background-color: #fff;
  border-radius: 8px;
  flex:1;
  display:flex;
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