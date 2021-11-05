<template>
    <div class = "main-container">
        <div class= "padding-geral">
            <div class="titulo">
                <div v-if="agendamento.id == null">
                    <h1 class="title"> Agendar Consulta </h1>
                </div>
                <div v-else>
                    <h1 class="title"> Alterar Consulta </h1>
                </div>
            </div>

            <div class ="padding-interno">
                <ValidationObserver ref="observer">
                <div class="columns">
                    <!-- Bloco user ADMIN ou MEDICO ou SECRETARIO / CRIAR NOVO -->
                    <div v-if="!agendamento.id && userType!='PACIENTE'" class="column is-full-mobile is-half-tablet is-4-desktop">
                        <CustomSelect
                                :itens="pacientes"
                                label="Paciente *" 
                                itemValue="id"
                                itemText="fullName"
                                v-model="agendamento.id_paciente"
                        />
                    </div>
                    <div v-if="!agendamento.id && userType!='PACIENTE'" class="column is-full-mobile is-half-tablet is-4-desktop">
                        <CustomSelect
                                :itens="medicos"
                                label="Medico *" 
                                itemValue="id"
                                itemText="fullName"
                                v-model="agendamento.id_medico"
                        />
                    </div>
                    <!-- Bloco user PACIENTE / CRIAR NOVO -->
                    <div v-if="!agendamento.id && userType=='PACIENTE'" class="column is-full-mobile is-half-tablet is-4-desktop">
                        <CustomInput rules="required|max:150" type="text" label="Paciente *" :upperCase="0" :disabled="true" v-model="myUser"/>
                    </div>
                    <div v-if="!agendamento.id && userType=='PACIENTE'" class="column is-full-mobile is-half-tablet is-4-desktop">
                        <CustomSelect
                                :itens="medicos"
                                label="Medico *" 
                                itemValue="id"
                                itemText="fullName"
                                v-model="agendamento.id_medico"
                        />
                    </div>
                    <div v-if="agendamento.id" class="column is-full-mobile is-half-tablet is-4-desktop">
                        <CustomInput rules="required|max:150" type="text" label="Paciente *" :upperCase="0" :disabled="true" v-model="paciente"/>
                    </div>
                    <div v-if="agendamento.id" class="column is-full-mobile is-half-tablet is-4-desktop">
                        <CustomInput rules="required|max:150" type="text" label="Médico *" :upperCase="0" :disabled="true" v-model="medico"/>
                    </div>
                </div>
                <div v-if="agendamento.id_medico && agendamento.id_paciente" class="columns">
                    <div class="column is-full-mobile is-half-tablet is-3-desktop">
                        <b-field label="Data *">
                            <Datepicker v-if="!agendamento.id" :disabledDates="obj" :inline="true" v-model="unformattedDate"></Datepicker>
                            <CustomInput v-else rules="required|max:150" type="text" :upperCase="0" :disabled="true" v-model="agendamento.data"/>
                        </b-field>
                    </div>
                    <div class="column is-full-mobile is-half-tablet is-5-desktop">
                        <CustomSelect
                                :itens="horariosDisponiveis"
                                label="Horário *" 
                                itemValue="horarioReal"
                                itemText="horario"
                                :disabled="!unformattedDate && !agendamento.id"
                                v-model="agendamento.hora"
                        />
                        <b-button v-if="!agendamento.id" type="is-success is-light" :disabled="!agendamento.hora" @click="checkHorarioAvailable('new')">Checar disponibilidade de horário</b-button>
                        <b-button v-else type="is-success is-light" :disabled="!agendamento.hora" @click="checkHorarioAvailable('modify')">Checar disponibilidade de horário</b-button>
                    </div>
                </div>
                </ValidationObserver>
            </div>

            <div class="botoes">
                <b-button v-if="agendamento.id == null" @click.native="salvar()" type="is-primary">Realizar agendamento</b-button>
                <b-button v-else @click.native="alterar()" type="is-primary">Alterar informações de agendamento</b-button>
                <b-button @click.native="retornar()" type="is-primary-light"> Voltar </b-button>
            </div>

        </div>
    </div>
</template>

<script>
    import { ValidationObserver } from 'vee-validate'
    import CustomInput from '~/components/atoms/CustomInput.vue'
    import Datepicker from 'vuejs-datepicker';
    import CustomSelect from '~/components/atoms/CustomSelect.vue'
    import notification from '~/utils/notification'
    import apiClient from '~/utils/apiClient'
    import $store from '~/store/userData';
    import moment from 'moment'

    export default {

        middleware: 'authenticated',
        name: 'CadastroConsulta',

        components: {
            ValidationObserver,
            CustomInput,
            CustomSelect,
            Datepicker
        },
        data(){
            return {
                agendamento: {
                    id: this.$route.params.id,
                    id_medico: null,
                    id_paciente: null,
                    status: "0",
                    data: null,
                    hora: null,
                },
                unformattedDate: null,
                obj:[],
                pacientes:[],
                paciente:null,
                medicos:[],
                medico:null,
                horariosDisponiveis:[
                    {horarioReal:'07:00:00', horario:'07:00'},
                    {horarioReal:'08:00:00', horario:'08:00'},
                    {horarioReal:'09:00:00', horario:'09:00'},
                    {horarioReal:'10:00:00', horario:'10:00'},
                    {horarioReal:'11:00:00', horario:'11:00'},
                    {horarioReal:'13:00:00', horario:'13:00'},
                    {horarioReal:'14:00:00', horario:'14:00'},
                    {horarioReal:'15:00:00', horario:'15:00'},
                    {horarioReal:'16:00:00', horario:'16:00'},
                    {horarioReal:'17:00:00', horario:'17:00'},
                ]
            }
        },
        methods:{
            sendError(err) {
                notification.sendNotification(err, 'is-danger', 5000)
            },
            sendSuccess(msg){
                notification.sendNotification(msg, 'is-success', 5000)
            },
            sendInfo(msg){
                notification.sendNotification(msg, 'is-primary', 5000)
            },
            async salvar() {
                if(!this.agendamento.id_medico || !this.agendamento.id_paciente || !this.agendamento.hora)
                    return this.sendError("Preencha todos os campos.")
                this.agendamento.hora = this.agendamento.hora.substring(0,5)
                this.agendamento.data = this.getCorrectDate()
                if (moment(this.agendamento.data+"T"+this.agendamento.hora).isBefore(moment())) return this.sendError("Entrada inválida. Selecione um horário/data possíveis.")
                try{
                    await apiClient.createAgendamento(this.agendamento)
                }catch(err){
                    console.log(err)
                    this.sendError("Já existe uma consulta nesse mesmo horário, por favor escolha outro.")
                    return
                }
                this.sendSuccess('Consulta agendada com sucesso!')
                this.retornar()
            },
            async alterar() {
                if(!this.agendamento.id_medico || !this.agendamento.id_paciente || !this.agendamento.hora)
                    return this.sendError("Preencha todos os campos.")
                const horaTratada = this.agendamento.hora.substring(0,5)
                const dataHora = this.agendamento.data + "T" + horaTratada
                if (moment(dataHora).isBefore(moment())) return this.sendError("Entrada inválida. Selecione um horário/data possíveis.")
                const objTratado = {
                    status: String(this.agendamento.status),
                    data: this.agendamento.data,
                    hora: horaTratada,
                    data_hora: dataHora
                }
                try{
                    await apiClient.alterarAgendamento(objTratado,this.agendamento.id)
                }catch(err){
                    console.log(err)
                    this.sendError("Já existe uma consulta nesse mesmo horário, por favor escolha outro.")
                    return
                }
                this.sendSuccess('Consulta alterada com sucesso!')
                this.retornar()
            },
            retornar(){
                this.$router.push('/agendamento/listagem')
            },
            makeFullName(user){
                user.fullName = user.first_name.toUpperCase() + " " + user.last_name.toUpperCase()
            },
            disabledDates(date){
                if(date.getDate() < new Date()) return true
            },
            getCorrectDate(){
                var data = moment(this.unformattedDate).format('yyyy-MM-DD')
                return String(data)
            },
            async checkHorarioAvailable(param){
                const now = String(moment().format(moment.HTML5_FMT.DATETIME_LOCAL))
                if (param == 'new'){
                    let correctTime = this.agendamento.hora.substring(0,5)
                    let selectedTime = moment(this.getCorrectDate()+"T"+correctTime,moment.HTML5_FMT.DATETIME_LOCAL)._i
                    let allowed = false
                    if(moment(now).isAfter(moment(selectedTime))) allowed = true
                    if (allowed){
                        this.sendError('Entrada inválida. Selecione um horário/data possíveis.')
                        return
                    }
                    var array = await apiClient.getAgendamentosByMedicoDateTime(this.getCorrectDate(),correctTime,this.agendamento.id_medico)
                    console.log("array:",array)
                    if (array.length) this.sendError('Já existe uma consulta nesse mesmo horário, por favor escolha outro.')
                    else this.sendInfo("Este horário está disponível")
                }
                else{
                    let correctTime = this.agendamento.hora.substring(0,5)
                    let selectedTime = moment(this.agendamento.data+"T"+correctTime,moment.HTML5_FMT.DATETIME_LOCAL)
                    let allowed = false
                    if(moment(now).isAfter(moment(selectedTime))) allowed = true
                    if (allowed){
                        this.sendError('Entrada inválida. Selecione um horário/data possíveis.')
                        return
                    }
                    var array = await apiClient.getAgendamentosByMedicoDateTime(this.agendamento.data,correctTime,this.agendamento.id_medico)
                    console.log("array:",array)
                    if (array.length) this.sendError('Já existe uma consulta nesse mesmo horário, por favor escolha outro.')
                    else this.sendInfo("Este horário está disponível")
                }
            },
            getFullName(array,id){
                for(let i = 0; i < array.length; i++){
                    if(array[i].id == id) return array[i].fullName
                }
            }
        },

        computed:{
            userType(){
                return $store.state.user.user_type
            },
            myUser(){
                return $store.state.user.first_name.toUpperCase() + " " + $store.state.user.last_name.toUpperCase()
            }
        },

        async created() {
            var date = new Date();
            date.setDate(date.getDate() - 1);
            this.obj = {
                to: date
            }
            const loadingComponent = this.$buefy.loading.open()
            try {    
                this.pacientes = await apiClient.getUserByType("PACIENTE")
                this.pacientes.forEach(this.makeFullName)
                this.medicos = await apiClient.getUserByType("MEDICO")
                this.medicos.forEach(this.makeFullName)
            } catch (err) {
                this.sendError('Ocorreu um erro ao buscar, tente novamente!')
            }
            if (this.agendamento.id) {
                try {    
                    this.agendamento = await apiClient.getAgendamentoById(this.agendamento.id)
                    console.log(this.agendamento)
                    this.paciente = this.getFullName(this.pacientes,this.agendamento.id_paciente)
                    this.medico = this.getFullName(this.medicos,this.agendamento.id_medico)
                } catch (err) {
                    this.sendError('Ocorreu um erro ao buscar, tente novamente!')
                }
            }
            else{
                if(this.userType == 'MEDICO') this.agendamento.id_medico = $store.state.user.id
                if(this.userType == 'PACIENTE') this.agendamento.id_paciente = $store.state.user.id
            }
            loadingComponent.close()
        }
    }
</script>

<style scoped>
    .main-container {
        background-color: #fff;
        border-radius: 8px;
        flex:1;
        display:flex;
    }
    .padding-geral{
        padding:35px;
        width:100%;
        height: 100%;
    }
    .padding-interno{
        padding:10px;
    }
    .titulo{
        margin-bottom:20px
    }
    .botoes{
        margin-top: 20px;
    }
</style>