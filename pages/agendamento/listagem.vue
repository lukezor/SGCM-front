<template>
  <div class = "main-container">
    <div class= "padding-geral">
      <div style="display:flex;justify-content:space-between">
        <p class="title"> Agendamento de consultas </p>
        <div @click.native="reload()" class="reloadButton">
            <b-icon class="reloadIcon" @click.native="reload()" icon="reload"/>
        </div>
      </div>
      <div class="container is-fluid">
        <Table :data="dados" :columns="colunas" :path="'/agendamento/'"/>
      </div>
      <div class="buttons">
        <b-button @click.native="redirect('/agendamento/')" type="is-primary">Agendar nova consulta</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Table from '~/components/molecules/Table.vue';
import apiClient from '~/utils/apiClient.js'
import notification from '~/utils/notification.js'
import $store from '~/store/userData';
export default {
  name: "AgendamentoListagem",
  components:{Table},
  data(){
    return{
      dados:[],
      colunas:[
                {
                    placeholder:true
                },
                {
                    field: 'id_medico',
                    label: 'Identificador do médico',
                    searchable: true,
                },
                {
                    field: 'data',
                    label: 'Data',
                    searchable: true,
                },
                {
                    field: 'hora',
                    label: 'Horário',
                    searchable: true,
                },
                {
                    field: 'status',
                    label: 'Status',
                    searchable: true,
                },
                {
                    field:'crud-options-confirm-edit',
                    label:'Acoes',
                    centered: true
                }
            ]
      }
    },
  methods:{
        redirect(location){
            this.$router.push({path: location});
        },
        async reload(){
          await this.loadData()
        },
        async loadData(){
          const loadingComponent = this.$buefy.loading.open()
          if($store.state.user.user_type == "PACIENTE"){
            try{
              this.dados = await apiClient.getAllClienteAgendamentos($store.state.user.id)
            } catch (err) {
              console.log("Erro: ",err)
              notification.sendNotification('Ocorreu um erro ao buscar, tente novamente!', 'is-danger', 5000)
            }
          }
          else{
              this.colunas[0].field = 'id_paciente'
              this.colunas[0].label = 'Identificador do paciente'
              this.colunas[0].searchable = true
              this.colunas[5].field = 'crud-options-confirm-edit-delete'
            try{
              this.dados = await apiClient.getAllAgendamentos()
            } catch (err) {
              console.log("Erro: ",err)
              notification.sendNotification('Ocorreu um erro ao buscar, tente novamente!', 'is-danger', 5000)
            }
          }
          loadingComponent.close()
        }
  },
  async created(){
    await this.loadData()
  }
};
</script>

<style scoped>
.main-container {
  background-color: #fff;
  border-radius: 8px;
  flex:1;
  display:flex;
}
.padding-geral{
  padding:25px;
  width:100%;
  height: 100%;
}
.title{
  font-weight: 500;
  margin-top:10px;
  margin-left:20px;
  margin-bottom: 10px;
}
.buttons{
  display: flex;
  margin-top:20px;
  justify-content: left;
}
@media (max-width: 768px) {
  .buttons{
    justify-content: center;
  }
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
</style>