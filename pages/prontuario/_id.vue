<template>
    <div class = "main-container">
        <div class= "padding-geral">
            <div class="titulo">
                <div style="display:flex;justify-content:space-between" v-if="prontuario.id == null">
                    <h1 class="title"> Novo prontuário </h1>
                    <div class="handle-mobile">
                        <b-button style="margin-right:5px" @click.native="retornar()" type="is-primary-light"> Voltar </b-button>
                        <b-button type='is-primary' @click.prevent="salvar()"> Salvar prontuário </b-button>
                    </div>
                </div>
                <div style="display:flex;justify-content:space-between" v-else>
                    <h1 v-if="userType=='MEDICO'" class="title"> Alterar prontuário </h1>
                    <h1 v-else class="title"> Visualizar prontuário </h1>
                    <div style="display:flex;justify-content:space-between">
                        <b-button @click.native="retornar()" type="is-primary-light"> Voltar </b-button>
                        <b-button v-if="userType=='MEDICO' && prontuario.id == null" type='is-primary' @click.prevent="salvar()"> Salvar prontuário </b-button>
                        <b-button v-if="userType=='MEDICO' && prontuario.id" type='is-primary' @click.prevent="alterar()"> Alterar prontuário </b-button>  
                    </div>
                </div>
            </div>
            <ValidationObserver ref="observer">
                <b-steps
                v-model="activeStep"
                :animated="true"
                :rounded="true"
                :has-navigation="false"
                :mobile-mode="'compact'">
                    <b-step-item step="1" :clickable="true" label="Informações do paciente">
                        <div class = "columns">
                            <div v-if="!prontuario.id" class="column is-full-mobile is-half-tablet is-half-desktop">
                                <CustomSelect
                                    :itens="pacientes"
                                    label="Paciente (usuário)"
                                    itemValue="id"
                                    itemText="fullName"
                                    v-model="prontuario.id_paciente"
                                    @input="carregaInfos()"
                                />
                            </div>
                            <div v-else class="column is-full-mobile is-half-tablet is-half-desktop">
                                <CustomInput disabled rules="required|max:150" type="text" label="Paciente (usuário)" v-model="paciente"/>
                            </div>
                            <div v-if="prontuario.id_paciente" class="column is-full-mobile is-half-tablet is-6-desktop">
                                <CustomInput disabled rules="required|max:150" type="text" label="Nome completo" v-model="infos.nome_completo"/>
                            </div>
                        </div>
                        <div v-if="prontuario.id_paciente">   
                            <div class="columns is-multiline">
                                <div class="column is-full-mobile is-half-tablet is-3-desktop">
                                    <CustomSelect
                                        disabled
                                        :itens="[
                                            {value:'M',label:'Masculino'},
                                            {value:'F',label:'Feminino'}
                                        ]"
                                        rules="required"
                                        label="Sexo" 
                                        itemValue="value"
                                        itemText="label"
                                        v-model="infos.sexo"
                                />
                                </div>
                                <div class="column is-full-mobile is-half-tablet is-3-desktop">
                                    <CustomInputMask
                                        disabled
                                        type="text"
                                        label="CPF"
                                        v-model="infos.documento"
                                        :options="maskCPF"
                                    />
                                </div>
                                <div class="column is-full-mobile is-half-tablet is-3-desktop">
                                    <CustomInputMask
                                        type="text"
                                        disabled
                                        label="Telefone"
                                        v-model="infos.telefone"
                                        :options="maskTelefone"
                                    />
                                </div>
                                <div class="column is-full-mobile is-half-tablet is-3-desktop">
                                    <CustomInputMask
                                        type="text"
                                        disabled
                                        label="Data Nascimento"
                                        v-model="data_de_nascimento" :options="maskDataNascimento"
                                        @input="formataData()"
                                    />
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-full-mobile is-half-tablet is-6-desktop">
                                    <CustomInput disabled rules="required|max:150" type="text" label="Naturalidade" v-model="infos.naturalidade"/>
                                </div>
                                <div class="column is-full-mobile is-half-tablet is-6-desktop">
                                    <CustomInput disabled rules="required|max:150" type="text" label="Profissao" v-model="infos.profissao"/>
                                </div>
                            </div>

                            <div class="columns">
                                <div class="column is-full-mobile is-half-tablet is-6-desktop">
                                    <CustomInput disabled rules="required|max:150" type="text" label="Responsável/cuidador/acompanhante" v-model="infos.reponsavel"/>
                                </div>
                                <div class="column is-full-mobile is-half-tablet is-6-desktop">
                                    <CustomInput disabled rules="required|max:150" type="text" label="Plano de saúde" v-model="infos.plano_saude"/>
                                </div>
                            </div>

                            <div class="columns is-multiline">
                                <div class="column is-full-mobile is-half-tablet is-4-desktop">
                                    <CustomInput disabled rules="required|max:150" type="text" label="Cor/Raça" v-model="infos.cor_raca"/>
                                </div>
                                <div class="column is-full-mobile is-half-tablet is-4-desktop">
                                    <CustomInput disabled rules="required|max:15" type="text" label="Religião" v-model="infos.religiao"/>
                                </div>
                                <div class="column is-full-mobile is-half-tablet is-4-desktop">
                                    <CustomInput disabled rules="required|max:150" type="text" label="Estado civil" v-model="infos.estado_civil"/>
                                </div>
                            </div>
                        </div>
                    </b-step-item>

                    <b-step-item step="2" :clickable="true" label="Primeiro contato">
                        <div class="columns is-multiline">
                            <div class="column is-full-mobile is-full-tablet is-full-desktop">
                                <CustomInput :disabled="userType=='PACIENTE'" rules="max:2000" maxlength="2000" upperCase="0" size="is-medium" type="textarea" label="Queixa principal e duraçao (QD)" v-model="prontuario.qd"/>
                            </div>
                            <div class="column is-full-mobile is-full-tablet is-full-desktop">
                                <CustomInput :disabled="userType=='PACIENTE'" rules="max:2000" maxlength="2000" upperCase="0" size="is-medium" type="textarea" label="História da doença atual" v-model="prontuario.hda"/>
                            </div>
                            <div class="column is-full-mobile is-full-tablet is-full-desktop">
                                <CustomInput :disabled="userType=='PACIENTE'" rules="max:2000" maxlength="2000" upperCase="0" size="is-medium" type="textarea" label="Exame físico geral" v-model="prontuario.efg"/>
                            </div>
                        </div>
                    </b-step-item>

                    <b-step-item step="3" :clickable="true" label="Histórico">
                        <div class="columns is-multiline">
                            <div class="column is-full-mobile is-full-tablet is-full-desktop">
                                <CustomInput :disabled="userType=='PACIENTE'" rules="max:2000" maxlength="2000" upperCase="0" size="is-medium" type="textarea" label="Hábitos de vida" v-model="prontuario.habitos"/>
                            </div>
                            <div class="column is-full-mobile is-full-tablet is-full-desktop">
                                <CustomInput :disabled="userType=='PACIENTE'" rules="max:2000" maxlength="2000" upperCase="0" size="is-medium" type="textarea" label="Antecedentes pessoais" v-model="prontuario.antecedentes_pessoais"/>
                            </div>
                            <div class="column is-full-mobile is-full-tablet is-full-desktop">
                                <CustomInput :disabled="userType=='PACIENTE'" rules="max:2000" maxlength="2000" upperCase="0" size="is-medium" type="textarea" label="Antecedentes familíares" v-model="prontuario.antecedentes_familiares"/>
                            </div>
                        </div>
                    </b-step-item>

                    <b-step-item step="4" :clickable="true" label="Diagnóstico">
                        <div class="columns is-multiline">
                            <div class="column is-full-mobile is-full-tablet is-full-desktop">
                                <CustomInput :disabled="userType=='PACIENTE'" rules="max:2000" maxlength="2000" upperCase="0" size="is-medium" type="textarea" label="Hipótese diagnóstica + CID" v-model="prontuario.hipotese_cid"/>
                            </div>
                            <div class="column is-full-mobile is-full-tablet is-full-desktop">
                                <CustomInput :disabled="userType=='PACIENTE'" rules="max:2000" maxlength="2000" upperCase="0" size="is-medium" type="textarea" label="Exames laboratoriais e complementares" v-model="prontuario.exames"/>
                            </div>
                            <div class="column is-full-mobile is-full-tablet is-full-desktop">
                                <CustomInput :disabled="userType=='PACIENTE'" rules="max:2000" maxlength="2000" upperCase="0" size="is-medium" type="textarea" label="Conduta" v-model="prontuario.conduta"/>
                            </div>
                        </div>
                    </b-step-item>

                    <b-step-item step="5" :clickable="true" label="Prescrição">
                        <div class="columns is-multiline">
                            <div class="column is-full-mobile is-full-tablet is-full-desktop">
                                <CustomInput :disabled="userType=='PACIENTE'" rules="max:2000" maxlength="2000" upperCase="0" size="is-medium" type="textarea" label="Evoluções" v-model="prontuario.evolucoes"/>
                            </div>
                            <div class="column is-full-mobile is-full-tablet is-full-desktop">
                                <CustomInput :disabled="userType=='PACIENTE'" rules="max:2000" maxlength="2000" upperCase="0" size="is-medium" type="textarea" label="Receitas" v-model="prontuario.receitas"/>
                            </div>
                            <div class="column is-full-mobile is-full-tablet is-full-desktop">
                                <CustomInput :disabled="userType=='PACIENTE'" rules="max:2000" maxlength="2000" upperCase="0" size="is-medium" type="textarea" label="Informações adicionais" v-model="prontuario.info_adicional"/>
                            </div>
                        </div>
                    </b-step-item>
                </b-steps>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
    import { ValidationObserver } from 'vee-validate'
    import CustomInput from '~/components/atoms/CustomInput.vue'
    import CustomInputMask from '~/components/atoms/CustomInputMask.vue'
    import CustomSelect from '~/components/atoms/CustomSelect.vue'
    import notification from '~/utils/notification'
    import apiClient from '~/utils/apiClient'
    import $store from '~/store/userData';
    import moment from 'moment'
    export default {

        middleware: ['authenticated','prontuarioPermission'],
        name: 'CadastroConsulta',

        components: {
            ValidationObserver,
            CustomInput,
            CustomSelect,
            CustomInputMask
        },
        data(){
            return {
                activeStep: '0',
                prontuario:{
                    id:this.$route.params.id,
                    id_paciente:null,
                    id_medico:null,
                    teste:null,
                    qd:null,
                    hda:null,
                    efg:null,
                    habitos:null,
                    antecedentes_pessoais:null,
                    antecedentes_familiares:null,
                    hipotese_cid:null,
                    conduta:null,
                    exames:null,
                    prescricoes:null,
                    evolucoes:null,
                    info_adicional:null
                },
                infos: {
                    id:null,
                    id_paciente: null,
                    nome_completo: null,
                    sexo:null,
                    profissao:null,
                    documento:null,
                    naturalidade:null,
                    telefone:null,
                    data_nascimento:null,
                    cor_raca:null,
                    religiao: null,
                    estado_civil: null,
                    plano_saude: null,
                    reponsavel: null
                },
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
                data_de_nascimento:null,
                maskCPF: {
                    blocks: [3, 3, 3, 2],
                    delimiters: ['.', '.', '-'],
                    numericOnly: true
                },
                maskTelefone: {
                    blocks: [0,2,0,5,4],
                    delimiters: ['(', ')',' ','-'],
                    numericOnly: true
                },
                maskDataNascimento: {
                    date: true,
                    datePattern: ['d', 'm', 'Y'],
                    delimiter: '/',
                    dateMin: '1900-01-01',
                    dateMax: '2022-01-01',
                },
                flag_data_nascimento: false,
            }
        },
        methods:{
            async carregaInfos(){
                console.log("chamei")
                var receiver = await apiClient.getMyPersonalInfo(this.prontuario.id_paciente)
                if (receiver.length){
                    this.infos = receiver[0]
                    this.data_de_nascimento = this.formataDataReverso(this.infos.data_nascimento)
                } 
                else{
                    this.infos = {
                        id:null,
                        id_paciente: null,
                        nome_completo: null,
                        sexo:null,
                        profissao:null,
                        documento:null,
                        naturalidade:null,
                        telefone:null,
                        data_nascimento:null,
                        cor_raca:null,
                    }
                    this.data_de_nascimento = ""
                    this.sendError("Infos desse cliente não estão cadastradas.")
                } 
            },
            sendError(err) {
                notification.sendNotification(err, 'is-danger', 5000)
            },
            sendSuccess(msg){
                notification.sendNotification(msg, 'is-success', 5000)
            },
            async salvar() {
                try{
                    await apiClient.createProntuario(this.prontuario)
                }catch(err){
                    console.log(err)
                    this.sendError("Erro ao criar o prontuário")
                    return
                }
                this.sendSuccess('Prontuário criado com sucesso!')
                this.retornar()
            },
            async alterar() {
                this.today = new Date();
                var dd = String(this.today.getDate()).padStart(2, '0');
                var mm = String(this.today.getMonth() + 1).padStart(2, '0');
                var yyyy = this.today.getFullYear();
                this.prontuario.ref = yyyy + '-' + mm + '-' + dd 
                try{
                    await apiClient.alterarProntuario(this.prontuario,this.prontuario.id)
                }catch(err){
                    console.log(err)
                    this.sendError("Erro ao alterar o prontuário")
                    return
                }
                this.sendSuccess('Prontuário alterado com sucesso!')
                this.retornar()
            },
            retornar(){
                this.$router.push('/prontuario/listagem')
            },
            makeFullName(user){
                user.fullName = user.first_name.toUpperCase() + " " + user.last_name.toUpperCase()
            },
            formataData(){
                if(this.data_de_nascimento.length == 8){
                    let dd = this.data_de_nascimento[0]+this.data_de_nascimento[1]
                    let mm = this.data_de_nascimento[2]+this.data_de_nascimento[3]
                    let yyyy = this.data_de_nascimento[4]+this.data_de_nascimento[5]+this.data_de_nascimento[6]+this.data_de_nascimento[7]
                    this.infos.data_nascimento = yyyy+"-"+mm+"-"+dd
                    if(yyyy < 1900 || yyyy > 2022 || mm < 1 || mm > 12 || dd < 1 || dd > 31){
                        this.infos.data_nascimento = null
                        notification.sendNotification('Data de nascimento inválida!', 'is-danger', 8000)
                        this.flag_data_nascimento = true;
                    }
                    else{
                        this.flag_data_nascimento = false;
                    }
                    console.log("depois",this.infos.data_nascimento)
                } 
            },
            formataDataReverso(data){
                let dd = data[8]+data[9]
                let mm = data[5]+data[6]
                let yyyy = data[0]+data[1]+data[2]+data[3]
                return dd+'/'+mm+'/'+yyyy
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
            },
            getIdPaciente(){
                return this.prontuario.id_paciente
            }
        },

        async created() {
            const loadingComponent = this.$buefy.loading.open()
            var date = new Date();
            date.setDate(date.getDate() - 1);
            this.obj = {
                to: date
            }
            try {    
                this.pacientes = await apiClient.getUserByType("PACIENTE")
                this.pacientes.forEach(this.makeFullName)
            } catch (err) {
                this.sendError('Ocorreu um erro ao buscar, tente novamente!')
            }
            if (this.prontuario.id) {
                try {
                    this.prontuario = await apiClient.getProntuario(this.prontuario.id)
                    this.paciente = this.getFullName(this.pacientes,this.prontuario.id_paciente)
                    this.carregaInfos()
                } catch (err) {
                    this.sendError('Ocorreu um erro ao buscar, tente novamente!')
                }
            }
            else{
                if(this.userType == 'MEDICO') this.prontuario.id_medico = $store.state.user.id
                if(this.userType == 'PACIENTE') this.prontuario.id_paciente = $store.state.user.id
            }
            loadingComponent.close()
        },
    }
</script>

<style scoped>
    .main-container {
        background-color: #fff;
        border-radius: 8px;
        flex:1;
        display:flex;
        overflow: hidden;
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
        margin-bottom:15px
    }
    .botoes{
        margin-top: 20px;
    }
    .handle-mobile{
        display:flex
    }
    @media (max-width: 768px) {
        .handle-mobile{
            align-items: center;
            display:block
        }
    }
</style>