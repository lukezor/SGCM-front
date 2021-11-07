<template>
  <div class = "main-container">
    <div class= "padding-geral">
      <div>
        <p class="title"> Cadastro de usuários </p>
      </div>
      <div class="container is-fluid">
        <Table :data="dados" :columns="colunas" :path="''"/>
      </div>
      <div class="buttons">
        <b-button @click.native="redirect('/cadastro/')" type="is-primary">Cadastrar novo usuário</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Table from '~/components/molecules/Table.vue';
import apiClient from '~/utils/apiClient.js'
import notification from '~/utils/notification.js'
export default {
  name: "CadastroListagem",
  middleware: ['authenticated','allowInternalOnly'],
  components:{Table},
  data(){
    return{
      dados:[],
      colunas:[
                {
                    field: 'username',
                    label: 'Nome do usuário',
                    searchable: true,
                },
                {
                    field: 'user_type',
                    label: 'Tipo de usuário',
                    searchable: true,
                },
                {
                    field: 'email',
                    label: 'Email',
                    centered: false
                },
                {
                    field: 'date_joined',
                    label: 'Data de cadastro',
                    centered: true
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
        this.dados = await apiClient.getAllUsers()
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
  display: flex;
  margin-top:20px;
  justify-content: left;
}
@media (max-width: 768px) {
  .buttons{
    justify-content: center;
  }
}
</style>