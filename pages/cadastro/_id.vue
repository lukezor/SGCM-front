<template>
    <div class = "main-container">
        <div class= "padding-geral">
            <div class="titulo">
                <div v-if="user.id == null">
                    <h1 class="title"> Adicionar Usuário </h1>
                </div>
                <div v-else>
                    <h1 class="title"> Alterar Usuário </h1>
                </div>
            </div>

            <div class ="padding-interno">
                <ValidationObserver ref="observer">
                <div class="columns">
                    <div class="column is-full-mobile is-half-tablet is-4-desktop">
                        <CustomInput rules="required|max:100" type="text" label="Nome *" v-model="user.first_name"/>
                    </div>
                    <div class="column is-full-mobile is-half-tablet is-4-desktop">
                        <CustomInput rules="required|max:100" type="text" label="Sobrenome *" v-model="user.last_name"/>
                    </div>
                </div>

                <div class="columns">
                    <div class="column is-full-mobile is-half-tablet is-8-desktop">
                        <CustomInput rules="email|required|max:100" type="email" label="Endereço de e-mail *" v-model="user.email" :upperCase="2"/>
                    </div>
                </div>

                <div class="columns">
                    <div class="column is-full-mobile is-one-quarter-tablet is-4-desktop">
                        <CustomInput  rules="required|max:100" type="text" label="Login *" v-model="user.username" :disabled="user.id" :upperCase="2"/>
                    </div>
                    <div class="column is-full-mobile is-one-quarter-tablet is-4-desktop">
                        <CustomSelect
                            :itens="[
                                    {value:'ADMIN', text:'Administrador'}, 
                                    {value:'SECRETARIO', text:'Secretário'},
                                    {value:'PACIENTE', text:'Paciente'},
                                    {value:'MEDICO', text:'Médico'}
                                ]"
                            label="Tipo de usuário *" 
                            itemValue="value"
                            itemText="text"
                            v-model="user.user_type"
                        />
                    </div>
                </div>

                <div v-if="user.id == null" class="columns">
                    <div class="column is-full-mobile is-half-tablet is-4-desktop">
                        <CustomInput rules="required|max:100" :password-reveal="true" type="password" label="Senha *" v-model="user.password" :upperCase="0"/>
                    </div>
                    <div class="column is-full-mobile is-half-tablet is-4-desktop">
                        <CustomInput rules="required|max:100" :password-reveal="true" type="password" label="Confirmação de senha *" v-model="passConfirmation" :upperCase="0"/>
                    </div>
                </div>
                </ValidationObserver>
            </div>

            <div class="botoes">
                <b-button v-if="user.id == null" @click.native="salvar()" type="is-primary">Cadastrar novo usuário</b-button>
                <b-button v-else @click.native="alterar()" type="is-primary">Alterar usuário</b-button>
                <b-button @click.native="retornar()" type="is-primary-light"> Voltar </b-button>
            </div>

        </div>
    </div>
</template>

<script>
    import { ValidationObserver } from 'vee-validate'
    import CustomInput from '~/components/atoms/CustomInput.vue'
    import CustomSelect from '~/components/atoms/CustomSelect.vue'
    import notification from '~/utils/notification'
    import apiClient from '~/utils/apiClient'
    import $store from '~/store/userData';

    export default {

        middleware: ['authenticated','allowInternalOnly'],
        name: 'CadastroUsuário',

        components: {
            ValidationObserver,
            CustomInput,
            CustomSelect
        },
        data(){
            return {
                user: {
                    id: this.$route.params.id,
                    user_type: null,
                    email: null,
                    password: null,
                    username: null,
                    first_name: null,
                    last_name: null,
                    is_superuser: false,
                    is_staff: false,
                    info_cadastrada: null,
                },
                passConfirmation: null
            }
        },
        methods:{
            sendError(err) {
                notification.sendNotification(err, 'is-danger', 5000)
            },
            sendSuccess(msg){
                notification.sendNotification(msg, 'is-success', 5000)
            },
            async salvar() {
                console.log(this.user)
                if (this.passConfirmation !== this.user.password){
                    this.sendError('As senhas não conferem!')
                    return
                }
                if(this.user.user_type == 'ADMIN'){
                    this.user.is_superuser = true
                    this.user.is_staff = true
                }
                if(this.user.user_type == 'PACIENTE'){
                    this.user.info_cadastrada = false
                }
                try{
                    await apiClient.createUser(this.user)
                    }catch(err){
                        this.sendError(err)
                        return
                    }
                this.sendSuccess('Usuário criado com sucesso!')
                this.retornar()
            },
            async alterar() {
                const objTratado = {
                    id: this.user.id,
                    email: this.user.email,
                    user_type: this.user.user_type,
                    first_name: this.user.first_name,
                    last_name: this.user.last_name,
                }
                try{
                    await apiClient.updateUser(objTratado)
                    }catch(err){
                        this.sendError(err)
                        return
                    }
                    this.sendSuccess('Usuário alterado com sucesso!')
                    this.retornar()
            },
            retornar(){
                if (this.userType == "SECRETARIO") this.$router.push('/')
                else this.$router.push('/cadastro/listagem')
            }
        },

        computed:{
            userType(){
                return $store.state.user.user_type
            }
        },

        async created() {
            if (this.user.id) {
                const loadingComponent = this.$buefy.loading.open()
                try {    
                    this.user = await apiClient.getUserById(this.user.id)
                    if(this.user.user_type == 'ADMIN'){
                        this.user.is_superuser = true
                        this.user.is_staff = true
                    }
                } catch (err) {
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