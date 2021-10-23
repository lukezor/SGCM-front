<template>
  <div class="padding">
      <div class="titleWrapper">
        <p class="cardTitle">Atualização de Informações Pessoais</p>
        <div @click.native="reloadCard()" class="reloadButton">
            <b-icon class="reloadIcon" @click.native="reloadCard()" icon="reload"/>
        </div>
      </div>
      <div class="infosWrapper">
          <p> Pacientes cadastrados: {{countCadastros}} </p>
          <p> Pacientes sem informações pessoais: {{countNoInfo}} </p>
      </div>
      <div class="buttonArea">
          <b-button @click.native="redirect('/cadastro/')" class="leftButton" type="is-primary">Atualizar informações pessoais</b-button>
      </div>
  </div>
</template>

<script>
import apiClient from '~/utils/apiClient.js'
import notification from '~/utils/notification.js'
export default {
    data(){
        return{
            countCadastros: "Carregando...",
            countNoInfo: "Carregando...",
        }
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
        async loadData(){
            try{
            //this.cadastrosHoje = await apiClient.countTotalCadastrosByFilter()
            //this.countNoInfo = await apiClient.countTotalInfoPessoalByFilter()
            this.countCadastros = "0"
            this.countNoInfo = "0"
            }catch(e){
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
