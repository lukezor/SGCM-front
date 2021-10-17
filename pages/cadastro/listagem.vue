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
export default {
  name: "CadastroListagem",
  middleware: 'authenticated',
  components:{Table},
  data(){
    return{
      dados:[
        { 'id': 1, 'nome_usuario': 'John', 'tipo_usuario': 'Administrador', 'data_cadastro': '15/10/2021'},
        { 'id': 2, 'nome_usuario': 'Doe', 'tipo_usuario': 'Administrador', 'data_cadastro': '15/10/2021'},
        { 'id': 3, 'nome_usuario': 'Tina', 'tipo_usuario': 'Secretario', 'data_cadastro': '14/10/2021'},
        { 'id': 4, 'nome_usuario': 'Teste', 'tipo_usuario': 'Secretario', 'data_cadastro': '13/10/2021'},
        { 'id': 5, 'nome_usuario': 'Anne', 'tipo_usuario': 'Paciente', 'data_cadastro': '14/10/2021'}
      ],
      colunas:[
                {
                    field: 'nome_usuario',
                    label: 'Nome do usuário',
                    searchable: true,
                },
                {
                    field: 'tipo_usuario',
                    label: 'Tipo de usuário',
                    searchable: true,
                },
                {
                    field: 'data_cadastro',
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