<template>
    <div class = "main-container">
        <div class= "padding-geral">
            <div class="titulo">
                <h1 class="title"> Cadastrar Informações Pessoais </h1>
            </div>

            <div class ="padding-interno">
                <ValidationObserver ref="observer">

                    <div class="columns">
                        <div v-if="!infos.id && userType!='PACIENTE'" class="column is-full-mobile is-half-tablet is-4-desktop">
                            <CustomSelect
                                    :itens="users"
                                    label="Usuário *" 
                                    itemValue="id"
                                    itemText="username"
                                    v-model="infos.id_paciente"
                            />
                        </div>
                        <div v-else-if="!infos.id && userType=='PACIENTE'" class="column is-full-mobile is-half-tablet is-4-desktop">
                            <CustomInput rules="required|max:150" type="text" label="Usuário *" :upperCase="0" :disabled="true" v-model="myUser"/>
                        </div>
                        <div v-else class="column is-full-mobile is-half-tablet is-4-desktop">
                            <CustomInput rules="required|max:150" type="text" label="Usuário *" :upperCase="0" :disabled="true" v-model="placeholder"/>
                        </div>
                    </div>

                    <div v-if="infos.id_paciente">   
                        <div class="columns">
                            <div class="column is-full-mobile is-half-tablet is-6-desktop">
                                <CustomInput rules="required|max:150" type="text" label="Nome completo *" v-model="infos.nome_completo"/>
                            </div>
                            <div class="column is-full-mobile is-half-tablet is-2-desktop">
                                <CustomSelect
                                    :itens="[
                                        {value:'M',label:'Masculino'},
                                        {value:'F',label:'Feminino'}
                                    ]"
                                    rules="required"
                                    label="Sexo *" 
                                    itemValue="value"
                                    itemText="label"
                                    v-model="infos.sexo"
                            />
                            </div>
                        </div>

                        <div class="columns">
                            <div class="column is-full-mobile is-half-tablet is-4-desktop">
                                <CustomInput rules="required|max:150" type="text" label="Profissao *" v-model="infos.profissao"/>
                            </div>
                            <div class="column is-full-mobile is-half-tablet is-4-desktop">
                                <CustomInputMask
                                    rules="required"
                                    type="text"
                                    label="CPF *"
                                    v-model="infos.documento"
                                    :options="maskCPF"
                                />
                            </div>
                        </div>

                        <div class="columns">
                            <div class="column is-full-mobile is-half-tablet is-4-desktop">
                                <CustomInput rules="required|max:150" type="text" label="Naturalidade *" v-model="infos.naturalidade"/>
                            </div>
                            <div class="column is-full-mobile is-half-tablet is-4-desktop">
                                <CustomInputMask
                                    rules="required"
                                    type="text"
                                    label="Telefone *"
                                    v-model="infos.telefone"
                                    :options="maskTelefone"
                                />
                            </div>
                        </div>

                        <div class="columns">
                            <div class="column is-full-mobile is-half-tablet is-4-desktop">
                                <CustomInputMask
                                    rules="required"
                                    type="text"
                                    label="Data Nascimento *"
                                    v-model="data_de_nascimento" :options="maskDataNascimento"
                                    @input="formataData()"
                                />
                            </div>
                            <div class="column is-full-mobile is-half-tablet is-4-desktop">
                                <CustomInput rules="required|max:15" type="text" label="Cor/Raça *" v-model="infos.cor_raca"/>
                            </div>
                        </div>
                    </div>
                </ValidationObserver>
            </div>

            <div class="botoes">
                <b-button v-if="!infos.id" @click.native="salvar()" type="is-primary">Cadastrar informações pessoais</b-button>
                <b-button v-else @click.native="alterar()" type="is-primary">Alterar informações pessoais</b-button>
                <b-button @click.native="retornar()" type="is-primary-light"> Voltar </b-button>
            </div>

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

    export default {

        middleware: 'authenticated',
        name: 'CadastrarInfos',

        components: {
            ValidationObserver,
            CustomInput,
            CustomSelect,
            CustomInputMask
        },
        data(){
            return {
                placeholder:'Carregando...',
                infos: {
                    id:this.$route.params.id,
                    id_paciente: null,
                    nome_completo: null,
                    sexo:null,
                    profissao:null,
                    documento:null,
                    naturalidade:null,
                    telefone:null,
                    data_nascimento:null,
                    cor_raca:null,
                },
                data_de_nascimento:null,
                users:[],
                myUser:"",
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
        computed:{
            userType(){
                return $store.state.user.user_type
            }
        },
        methods:{
            sendError(err) {
                notification.sendNotification(err, 'is-danger', 8000)
            },
            sendSuccess(msg){
                notification.sendNotification(msg, 'is-success', 8000)
            },
            async salvar() {
                console.log(this.infos)
                const objTratado={
                    id:this.infos.id_paciente,
                    info_cadastrada:true,
                }
                if(this.flag_data_nascimento){
                    this.sendError('Data de nascimento inválida!')
                    return;
                }
                try{
                    await apiClient.createInfos(this.infos)
                    await apiClient.updateUserInfosCadastradas(objTratado)
                    }catch(err){
                        console.log(err)
                        this.sendError("Por favor preencha corretamente os campos.")
                        return
                    }
                    this.sendSuccess('Informações pessoais atualizadas com sucesso!')
                    this.retornar()
            },
            async alterar() {
                console.log(this.infos)
                const objTratado={
                    id:this.infos.id_paciente,
                    info_cadastrada:true,
                }
                if(this.flag_data_nascimento){
                    this.sendError('Data de nascimento inválida!')
                    return;
                }
                try{
                    await apiClient.updateInfos(this.infos)
                    await apiClient.updateUserInfosCadastradas(objTratado)
                    }catch(err){
                        console.log(err)
                        this.sendError("Por favor preencha corretamente os campos.")
                        return
                    }
                    this.sendSuccess('Informações pessoais atualizadas com sucesso!')
                    this.retornar()
            },
            retornar(){
                if(this.userType=='PACIENTE') this.$router.push('/')
                else this.$router.push('/infospessoais/listagem')
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
            }
        },

        async created() {
            const loadingComponent = this.$buefy.loading.open()
            if(!this.infos.id){
                if(this.userType != "PACIENTE"){
                    try {    
                        this.users = await apiClient.getPacientesSemInfo()
                    } catch (err) {
                        this.sendError('Ocorreu um erro ao buscar, tente novamente!')
                    } finally {
                        loadingComponent.close()
                    }
                }
                else{
                    this.myUser = $store.state.user.username
                    this.infos.id_paciente = $store.state.user.id
                    loadingComponent.close()
                }
            }
            else{
                try {
                    this.infos = await apiClient.getInfosById(this.infos.id)
                    let placeholder = await apiClient.getUserById(this.infos.id_paciente)
                    this.placeholder = placeholder.username
                    this.data_de_nascimento = this.formataDataReverso(this.infos.data_nascimento)
                } catch (err) {
                    console.log(err)
                    this.sendError('Ocorreu um erro ao buscar, tente novamente!')
                } finally {
                    loadingComponent.close()
                }
            }
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