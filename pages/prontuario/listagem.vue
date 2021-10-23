<template>
  <div class = "main-container">
    <div class= "padding-geral">
      <div>
        <p class="title"> Prontuários </p>
      </div>
      <div class="container is-fluid">
        <Table :data="dados" :columns="colunas"/>
      </div>
      <div class="buttons">
        <b-button @click.native="redirect('/prontuario/')" type="is-primary">Criar novo prontuário</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Table from '~/components/molecules/Table.vue';
export default {
  name: "ProntuarioListagem",
  components:{Table},
  data(){
    return{
      dados:[
        { 'id': 1, 'nome_paciente': 'Jesse', 'nome_medico': 'Simmons', 'date': '15/10/2021' },
        { 'id': 2, 'nome_paciente': 'John', 'nome_medico': 'Jacobs', 'date': '15/10/2021' },
        { 'id': 3, 'nome_paciente': 'Tina', 'nome_medico': 'Gilbert', 'date': '14/10/2021' },
        { 'id': 4, 'nome_paciente': 'Clarence', 'nome_medico': 'Flores', 'date': '13/10/2021'},
        { 'id': 5, 'nome_paciente': 'Anne', 'nome_medico': 'Lee', 'date': '14/10/2021'}
      ],
      colunas:[
                {
                    field: 'nome_paciente',
                    label: 'Nome do paciente',
                    searchable: true,
                },
                {
                    field: 'nome_medico',
                    label: 'Nome do médico',
                    searchable: true,
                },
                {
                    field: 'date',
                    label: 'Data de atendimento',
                    centered: true
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