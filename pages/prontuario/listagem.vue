<template>
  <div class = "main-container">
    <div class= "padding-geral">
      <div>
        <p class="title"> Prontuários </p>
      </div>
      <div class="container is-fluid">
        <Table :data="dados" :columns="colunas" :path="'/prontuario/'"/>
      </div>
      <div class="buttons">
        <b-button v-if="userType == 'MEDICO'" @click.native="redirect('/prontuario/')" type="is-primary">Criar novo prontuário</b-button>
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
  name: "ProntuarioListagem",
  middleware: ['authenticated','prontuarioPermission'],
  components:{Table},
  data(){
    return{
      dados:[],
      colunas:[
                {
                    field: 'id_paciente',
                    label: '(ID) Paciente',
                    searchable: true,
                },
                {
                    field: 'ref',
                    label: 'Data de referência',
                    searchable: true,
                },
                {
                    field:'crud-options-edit',
                    label:'Acoes',
                    centered: true
                }
            ]
      }
    },
    computed:{
      userType(){
        return $store.state.user.user_type
      }
    },
    methods:{
        redirect(location){
            this.$router.push({path: location});
        }
    },
    async created(){
      const loadingComponent = this.$buefy.loading.open()
      if(this.userType == 'MEDICO'){
        let query = '?id_medico='+$store.state.user.id
        try{
          this.dados = await apiClient.getProntuariosByQuery(query)
        } catch (err) {
          console.log("Erro: ",err)
          notification.sendNotification('Ocorreu um erro ao buscar, tente novamente!', 'is-danger', 5000)
        }
      }
      else{
        let query = '?id_paciente'+$store.state.user.id
        this.colunas[0].field = 'id_medico'
        this.colunas[0].label = 'Identificação do médico'
        this.colunas[2].field = 'crud-options-view'
        try{
          this.dados = await apiClient.getProntuariosByQuery(query)
        } catch (err) {
          console.log("Erro: ",err)
          notification.sendNotification('Ocorreu um erro ao buscar, tente novamente!', 'is-danger', 5000)
        }
      }
      loadingComponent.close()
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
  position: fixed;
  bottom: 50px;
}
</style>