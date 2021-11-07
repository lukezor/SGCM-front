<template>
  <div class="padding">
      <div class="titleWrapper">
        <p class="cardTitle">Agendamento de Consultas</p>
        <div @click.native="reloadCard()" class="reloadButton">
            <b-icon class="reloadIcon" @click.native="reloadCard()" icon="reload"/>
        </div>
      </div>
      <div class="infosWrapper">
          <p> Data: {{today}} </p>
          <p v-if="userType!='PACIENTE'"> Consultas marcadas para hoje: {{consultasMarcadas}} </p>
          <p v-else> Minhas consultas hoje: {{consultasMarcadas}} </p>
      </div>
      <div class="buttonArea">
          <b-button @click.native="redirect('/agendamento/')" class="leftButton" type="is-primary">Novo agendamento</b-button>
          <b-button @click.native="redirect('/agendamento/listagem')" class="rightButton" type="is-primary is-light">Visualizar agendamentos</b-button>
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
            today: "Carregando...",
            consultasMarcadas: "Carregando...",
            formattedToday: "",
        }
    },
    computed:{
        userType(){
            return $store.state.user.user_type
        }
    },
    methods:{
        async reloadCard(){
            this.consultasMarcadas = "Carregando..."
            this.today = "Carregando..."
            this.formattedToday = "Carregando..."
            this.getToday()
            await this.loadData()
        },
        getToday(){
            this.today = new Date();
            var dd = String(this.today.getDate()).padStart(2, '0');
            var mm = String(this.today.getMonth() + 1).padStart(2, '0');
            var yyyy = this.today.getFullYear();
            this.today = dd + '-' + mm + '-' + yyyy
            this.formattedToday = yyyy + '-' + mm + '-' + dd 
        },
        redirect(location){
            this.$router.push({path: location});
        },
        async loadData(){
            try{
                if($store.state.user.user_type != "PACIENTE"){
                    this.consultasMarcadas = await apiClient.getAgendamentosToday(this.formattedToday)
                    this.consultasMarcadas = this.consultasMarcadas.length
                }
                else{
                    this.consultasMarcadas = await apiClient.getMyAgendamentosToday(this.formattedToday,$store.state.user.id)
                    this.consultasMarcadas = this.consultasMarcadas.length
                }
            }catch(e){
                notification.sendNotification('Ocorreu um erro ao buscar as consultas, tente novamente!', 'is-danger', 5000)
            }
        }
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
