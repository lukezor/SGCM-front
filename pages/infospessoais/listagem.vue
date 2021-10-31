<template>
  <div class = "main-container">
    <div class= "padding-geral">
      <div>
        <p class="title"> Informações pessoais de pacientes </p>
      </div>
      <div class="container is-fluid">
        <Table :data="dados" :columns="colunas" :path="''"/>
      </div>
      <div class="buttons">
        <b-button @click.native="redirect('/infospessoais/')" type="is-primary">Cadastrar informações pessoais</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Table from '~/components/molecules/Table.vue';
import apiClient from '~/utils/apiClient.js'
import notification from '~/utils/notification.js'
export default {
  name: "InfosListagem",
  middleware: ['authenticated','allowInternalOnly'],
  components:{Table},
  data(){
    return{
      dados:[],
      colunas:[
                {
                    field: 'id_paciente',
                    label: 'ID Usuário',
                    searchable: true,
                },
                {
                    field: 'nome_completo',
                    label: 'Nome Completo',
                    searchable: true,
                },
                {
                    field: 'profissao',
                    label: 'Profissao',
                    searchable: true,
                },
                {
                    field: 'data_nascimento',
                    label: 'Data de nascimento',
                    searchable: true,
                },
                {
                    field: 'sexo',
                    label: 'Sexo',
                    centered: false
                },
                {
                    field: 'crud-options-edit',
                    label: 'Ações',
                    centered: true
                }
            ]
      }
    },
    methods:{
        redirect(location){
            this.$router.push({path: location});
        }
    },
    async created(){
      const loadingComponent = this.$buefy.loading.open()
      try{
        this.dados = await apiClient.getAllPersonalInfos()
      } catch (err) {
        console.log("Erro: ",err)
        notification.sendNotification('Ocorreu um erro ao buscar, tente novamente!', 'is-danger', 5000)
      }
      console.log("retorno: ",this.dados)
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