<template>
  <div class="padding">
      <div class="titleWrapper">
        <p class="cardTitle">Cadstro de Usuários</p>
        <div @click.native="reloadCard()" class="reloadButton">
            <b-icon class="reloadIcon" @click.native="reloadCard()" icon="reload"/>
        </div>
      </div>
      <div class="infosWrapper">
          <p> Total de usuários cadastrados: {{countCadastros}} </p>
          <p> Novos usuários hoje: {{cadastrosHoje}} </p>
      </div>
      <div class="buttonArea">
          <b-button @click.native="redirect('/cadastro/')" class="leftButton" type="is-primary">Cadastrar novo usuário</b-button>
          <b-button v-if="hasListagem" @click.native="redirect('/cadastro/listagem')" class="rightButton" type="is-primary is-light">Listagem de cadastros</b-button>
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
            cadastrosHoje: "Carregando...",
            today:""
        }
    },
    props:{
        hasListagem:{
            type:Boolean,
            required:false,
            default:true
        },
    },
    methods:{
        async reloadCard(){
            this.countCadastros = "Carregando..."
            this.cadastrosHoje = "Carregando..."
            await this.loadData()
        },
        redirect(location){
            this.$router.push({path: location});
        },
        async loadData(){
            try{
            this.countCadastros = await apiClient.getAllUsers()
            this.countCadastros = this.countCadastros.length
            this.cadastrosHoje = await apiClient.getAllUsersToday(this.today)
            this.cadastrosHoje = this.cadastrosHoje.length
            }catch(e){
                notification.sendNotification('Ocorreu um erro ao consultar os cadastros, tente novamente!', 'is-danger', 5000)
            }
        },
        getToday(){
            this.today = new Date();
            var dd = String(this.today.getDate()).padStart(2, '0');
            var mm = String(this.today.getMonth() + 1).padStart(2, '0');
            var yyyy = this.today.getFullYear();
            this.today = yyyy + '-' + mm + '-' + dd
        },
    },
    async created(){
        this.getToday()
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
