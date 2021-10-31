<template>
  <div class="padding">
      <div class="titleWrapper">
        <p class="cardTitle">Confirmações de Consultas</p>
        <div @click.native="reloadCard()" class="reloadButton">
            <b-icon class="reloadIcon" @click.native="reloadCard()" icon="reload"/>
        </div>
      </div>
      <div v-if="hasDados" class="infosWrapper">
          <Table :data="dados" :columns="colunas" :perPage="quantidade"/>
      </div>
      <div v-else class="infosWrapper">
          <p v-if="userType=='PACIENTE'">Nenhuma consulta encontrada para hoje - {{today}}</p>
          <p v-else>Nenhuma consulta confirmada até agora - {{today}}</p>
      </div>
  </div>
</template>

<script>
import Table from "~/components/molecules/Table.vue"
import apiClient from '~/utils/apiClient.js'
import notification from '~/utils/notification.js'
import $store from '~/store/userData';
export default {
    components:{Table},
    data(){
        return{
          dados:[],
          hasDados:false,
          today:"",
          formattedToday:"",
          colunas:[
                    {
                        field: 'id_medico',
                        label: '(ID) Médico',
                    },
                    {
                        field: 'data',
                        label: 'Data',
                    },
                    {
                        field: 'hora',
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
    },
    computed:{
        userType(){
            return $store.state.user.user_type
        }
    },
    methods:{
        async reloadCard(){
            await this.loadData()
        },
        redirect(location){
            this.$router.push({path: location});
        },
        getToday(){
            this.today = new Date();
            var dd = String(this.today.getDate()).padStart(2, '0');
            var mm = String(this.today.getMonth() + 1).padStart(2, '0');
            var yyyy = this.today.getFullYear();
            this.today = dd + '/' + mm + '/' + yyyy 
            this.formattedToday = yyyy + '-' + mm + '-' + dd 
        },
        async loadData(){
            if(this.userType == 'MEDICO'){
                this.colunas[3].field = 'crud-options-finish'
                this.colunas[0].field = 'id_paciente'
                this.colunas[0].label = '(ID) Paciente'
                try{
                    this.dados=await apiClient.getMyConsultasToday(this.formattedToday,$store.state.user.id)
                    if(this.dados.length) this.hasDados = true
                }catch(e){
                    notification.sendNotification('Ocorreu um erro ao consultar os cadastros, tente novamente!', 'is-danger', 5000)
                }
            }
            else if (this.userType =='SECRETARIO'){
                try{
                    this.dados=await apiClient.getAgendamentosToday(this.formattedToday)
                    if(this.dados.length) this.hasDados = true
                }catch(e){
                    notification.sendNotification('Ocorreu um erro ao consultar os cadastros, tente novamente!', 'is-danger', 5000)
                }
            }
            else if (this.userType =='PACIENTE'){
                try{
                    this.dados=await apiClient.getMyAgendamentosToday(this.formattedToday,$store.state.user.id)
                    if(this.dados.length) this.hasDados = true
                }catch(e){
                    notification.sendNotification('Ocorreu um erro ao consultar os cadastros, tente novamente!', 'is-danger', 5000)
                }
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
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
</style>
