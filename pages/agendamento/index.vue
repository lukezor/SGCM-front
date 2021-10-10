<template>
<div class = "main-container">
  <div class= "padding-geral">
    <p class="title"> Agendamento de consultas </p>
    <div class="table-wrapper">
      <Table/>
    </div>
    <div class="buttons">
      <b-button @click.native="redirect('/cadastro/new')" type="is-primary">Agendar nova consulta</b-button>
    </div>
  </div>
</div>
</template>

<script>
import Table from '../../components/molecules/Table.vue';
export default {
  name: "AgendamentoPage",
  components:{Table},
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
}
.title{
  font-weight: 500;
  margin-top:10px;
  margin-left:20px;
}
.table-wrapper{
  width:100%;
}
</style>