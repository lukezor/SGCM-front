<template>
  <div class = "main-container">
    <div class= "padding-geral">
      <div>
        <p class="title"> Geração de relatórios </p>
      </div>
      <div class="container is-fluid">
        <Table :data="dados" :columns="colunas" :path="'/relatorios/'"/>
      </div>
    </div>
  </div>
</template>

<script>
import Table from '~/components/molecules/Table.vue';
export default {
  name: "RelatoriosListagem",
  middleware: ['authenticated','allowAdminOnly'],
  components:{Table},
  data(){
    return{
      dados:[
        { 'id': 1, 'nome_relatorio': 'Informações de faixa etária de pacientes', 'tipo_relatorio': 'Avançado'},
        { 'id': 2, 'nome_relatorio': 'Horários, dias e meses com maior número de consultas', 'tipo_relatorio': 'Avançado'},
        { 'id': 3, 'nome_relatorio': 'Pacientes com maior número de consultas', 'tipo_relatorio': 'Simples'},
        { 'id': 5, 'nome_relatorio': 'Médicos com maior número de consultas', 'tipo_relatorio': 'Simples'},
        { 'id': 4, 'nome_relatorio': 'Relação de consultas realizadas e canceladas', 'tipo_relatorio': 'Simples'}
      ],
      colunas:[
                {
                    field: 'nome_relatorio',
                    label: 'Nome do relatório',
                    searchable: true,
                },
                {
                    field: 'tipo_relatorio',
                    label: 'Tipo de relatório',
                    searchable: true,
                },
                {
                  field: 'relatorio',
                  label: 'Gerar'
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
</style>