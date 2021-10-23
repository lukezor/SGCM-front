<template>
  <div class="padding">
      <div class="titleWrapper">
        <p class="cardTitle">Confirmações de Consultas</p>
        <div @click.native="reloadCard()" class="reloadButton">
            <b-icon class="reloadIcon" @click.native="reloadCard()" icon="reload"/>
        </div>
      </div>
      <div class="infosWrapper">
          <Table :data="dados" :columns="colunas" :perPage="quantidade"/>
      </div>
  </div>
</template>

<script>
import Table from "~/components/molecules/Table.vue"
import $store from '~/store/userData';
export default {
    components:{Table},
    data(){
        return{
          dados:[
                  { 'id': 1, 'nome_paciente': 'Jesse', 'nome_medico': 'Simmons', 'date': '15/10/2021', 'time': '12:00' },
                  { 'id': 2, 'nome_paciente': 'John', 'nome_medico': 'Jacobs', 'date': '15/10/2021', 'time': '13:00' },
                  { 'id': 3, 'nome_paciente': 'Tina', 'nome_medico': 'Gilbert', 'date': '14/10/2021', 'time': '14:00' },
                  { 'id': 4, 'nome_paciente': 'Clarence', 'nome_medico': 'Flores', 'date': '13/10/2021', 'time': '08:00' },
                  { 'id': 5, 'nome_paciente': 'Anne', 'nome_medico': 'Lee', 'date': '14/10/2021', 'time': '12:00' },
                  { 'id': 6, 'nome_paciente': 'Clarence', 'nome_medico': 'Flores', 'date': '13/10/2021', 'time': '08:00' },
                  { 'id': 7, 'nome_paciente': 'Anne', 'nome_medico': 'Lee', 'date': '14/10/2021', 'time': '12:00' },
                  { 'id': 8, 'nome_paciente': 'Anne', 'nome_medico': 'Lee', 'date': '14/10/2021', 'time': '12:00' }
          ],
          colunas:[
                    {
                        field: 'nome_paciente',
                        label: 'Nome do paciente',
                    },
                    {
                        field: 'nome_medico',
                        label: 'Nome do médico',
                    },
                    {
                        field: 'date',
                        label: 'Data',
                        centered: true
                    },
                    {
                        field: 'time',
                        label: 'Horário',
                        centered: true
                    },
                    {
                        field:'crud-options-confirm',
                        label:'Acoes',
                        centered: true
                    }
            ]
        }
    },
    props:{
        quantidade:{
            type:Number,
            required:false,
            default:'1'
        },
        userType:{
            type:String,
            required:false,
            default:'SECRETARIO'
        }
    },
    methods:{
        reloadCard(){
            //alterar quando tiver api
            window.location.reload()
        },
        redirect(location){
            this.$router.push({path: location});
        },
    },
    created(){
        console.log("#debug: ",this.quantidade)
        console.log("#debug: ",this.quantidade)
        if(this.userType == 'MEDICO'){
            this.colunas[4].field = 'crud-options-finish'
        }
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
    height: 60%;
    margin-top: 15px;
    margin-bottom: 15px;
    justify-content: space-around;
}
</style>
