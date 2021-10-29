<template>
  <div class="padding">
      <div class="titleWrapper">
        <p class="cardTitle">Prontuários</p>
        <div @click.native="reloadCard()" class="reloadButton">
            <b-icon class="reloadIcon" @click.native="reloadCard()" icon="reload"/>
        </div>
      </div>
      <div class="infosWrapper">
          <p> Quantidade de prontuários encontrados: {{countProntuarios}} </p>
      </div>
      <div class="buttonArea">
          <b-button v-if="hasCreate" @click.native="redirect('/cadastro/')" class="leftButton" type="is-primary">Cadastrar novo prontuário</b-button>
          <b-button @click.native="redirect('/cadastro/listagem')" class="rightButton" type="is-primary is-light">Listagem de prontuários</b-button>
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
            countProntuarios: "Carregando...",
        }
    },
    props:{
        hasCreate:{
            type:Boolean,
            required:false,
            default:true
        },
    },
    methods:{
        async reloadCard(){
            this.countProntuarios = "Carregando..."
            await this.loadData()
        },
        redirect(location){
            this.$router.push({path: location});
        },
        async loadData(){
            try{
                let query = $store.state.user.id
                if($store.state.user.user_type == "MEDICO") query = "?id_medico="+query
                else query= "?id_paciente="+query
                this.countProntuarios = await apiClient.getProntuariosByQuery(query)
                this.countProntuarios = this.countProntuarios.length
            }catch(e){
                notification.sendNotification('Ocorreu um erro ao consultar os prontuários, tente novamente!', 'is-danger', 5000)
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
