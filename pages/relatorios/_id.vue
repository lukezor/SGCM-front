<template>
    <div class = "main-container">
        <div class= "padding-geral">
            <div class="titulo">
                <div>
                    <h1 class="title"> Geração de relatórios </h1>
                </div>
            </div>

            <div class ="padding-interno">
                <div>{{relatorio.id}}</div>
            </div>
                

            <div class="botoes">
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

        middleware: ['authenticated','allowAdminOnly'],
        name: 'GerarRelatorio',

        components: {
            ValidationObserver,
            CustomInput,
            CustomSelect
        },
        data(){
            return {
                relatorio: {
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
                console.log(this.relatorio)
                try{
                    await apiClient.createUser(this.relatorio)
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
                this.$router.push('/relatorios/listagem')
            }
        },

        computed:{
            userType(){
                return $store.state.user.user_type
            }
        },

        async created() {
            if (this.relatorio.id) {
                const loadingComponent = this.$buefy.loading.open()
                try {    
                    //this.user = await apiClient.getUserById(this.user.id)
                } catch (err) {
                    //this.sendError('Ocorreu um erro ao buscar, tente novamente!')
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