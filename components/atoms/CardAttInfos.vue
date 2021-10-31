<template>
  <div class="padding">
      <div class="titleWrapper">
        <p class="cardTitle">Atualização de Informações Pessoais</p>
        <div v-if="userType != 'PACIENTE'" @click.native="reloadCard()" class="reloadButton">
            <b-icon class="reloadIcon" @click.native="reloadCard()" icon="reload"/>
        </div>
      </div>
      <div v-if="userType != 'PACIENTE'" class="infosWrapper">
          <p> Pacientes cadastrados: {{countCadastros}} </p>
          <p> Pacientes sem informações pessoais: {{countNoInfo}} </p>
      </div>
      <div v-else class="infosWrapper">
          <p> Informações cadastradas? <strong>{{isCadastrada}}</strong></p>
          <p v-if="isCadastrada == 'Não'"><strong>Lembrete:</strong> Por favor, cadastre as suas informações pessoais para desfrutar das funcionalidades do prontuário eletrônico</p>
      </div>
      <div class="buttonArea">
          <b-button v-if="userType == 'PACIENTE'" @click.native="handlePatientRedirect()" class="leftButton" type="is-primary">Atualizar minhas informações pessoais</b-button>
          <b-button v-else @click.native="redirect('/infospessoais/listagem')" class="leftButton" type="is-primary">Atualizar informações pessoais de pacientes</b-button>
      </div>
  </div>
</template>

<script>
import apiClient from '~/utils/apiClient.js'
import notification from '~/utils/notification.js'
import $store from '~/store/userData';
export default {
    data(){
        return{
            countCadastros: "Carregando...",
            countNoInfo: "Carregando...",
            my_id:""
        }
    },
    computed:{
        userType(){
            return $store.state.user.user_type
        },
        isCadastrada(){
            if($store.state.user.info_cadastrada) return "Sim"
            else return "Não"
        },
    },
    methods:{
        async reloadCard(){
            this.countCadastros = "Carregando..."
            this.countNoInfo = "Carregando..."
            await this.loadData()
        },
        redirect(location){
            this.$router.push({path: location});
        },
        handlePatientRedirect(){
            if(this.isCadastrada == 'Sim')
                this.redirect('/infospessoais/'+this.my_id)
            else{
                this.redirect('/infospessoais/')   
            }
        },
        async loadData(){
            try{
            this.countNoInfo = await apiClient.getPacientesSemInfo()
            this.countNoInfo = this.countNoInfo.length
            this.countCadastros = await apiClient.getUserByType("PACIENTE")
            this.countCadastros = this.countCadastros.length
            this.my_id = await apiClient.getMyPersonalInfo($store.state.user.id)
            if(this.my_id[0]) this.my_id = this.my_id[0].id
            }catch(e){
                console.log(e)
                notification.sendNotification('Ocorreu um erro ao consultar os cadastros, tente novamente!', 'is-danger', 5000)
            }
        }
    },
    async created(){
        await this.loadData()
    }
};
</script>
<style lang="scss" scoped>
.padding{
    padding:25px;
    width:100%;
    height: 100%;
    position: relative;
}
.titleWrapper{
    display:flex;
    flex-direction: row;
    align-items:center;
}
.cardTitle{
    color:black;
    font-size:18px;
    font-weight: 600;
}
.reloadButton{
    background-color: #4d66b083;
    cursor:pointer;
    width: 40px;
    height: 40px;
    margin-left:auto;
    border-radius: 100px;
    display:flex;
    align-items:center;
    justify-content: center;
}
.icon{
    color:#4D66B0
}
.infosWrapper{
    display:flex;
    height: 50%;
    margin-top: 15px;
    margin-bottom: 15px;
    flex-direction: column;
    justify-content: space-around;
}
.buttonArea{
    display:flex;
    justify-content: space-around;
}
</style>
