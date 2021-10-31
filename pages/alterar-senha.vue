<template>
    <div class = "main-container">
        <div class= "padding-geral">
            <div class="titulo">
                <div>
                    <h1 class="title"> Alterar Senha </h1>
                </div>
            </div>

            <div class ="padding-interno">
                <ValidationObserver ref="observer">
                <div class="columns">
                    <div class="column is-full-mobile is-half-tablet is-8-desktop">
                        <CustomInput rules="required|max:100" type="password" :password-reveal="true" label="Senha anterior *" v-model="user.oldPass" :upperCase="0"/>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-full-mobile is-half-tablet is-4-desktop">
                        <CustomInput rules="required|max:100" type="password" :password-reveal="true" label="Nova senha *" v-model="user.newPass" :upperCase="0"/>
                    </div>
                    <div class="column is-full-mobile is-half-tablet is-4-desktop">
                        <CustomInput rules="required|max:100" type="password" :password-reveal="true" label="Confirmação de nova senha *" v-model="passConfirmation" :upperCase="0"/>
                    </div>
                </div>
                </ValidationObserver>
            </div>

            <div class="botoes">
                <b-button @click.native="alterar()" type="is-primary">Alterar senha</b-button>
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

    export default {

        middleware: 'authenticated',
        name: 'AlterarSenha',

        components: {
            ValidationObserver,
            CustomInput,
            CustomSelect
        },
        data(){
            return {
                user: {
                    id: null,
                    oldPass: null,
                    newPass: null,
                },
                passConfirmation: null
            }
        },
        methods:{
            sendError(err) {
                notification.sendNotification(err, 'is-danger', 5000)
            },
            sendSuccess(msg){
                notification.sendNotification(msg, 'is-success', 10000)
            },
            async alterar() {
                console.log(this.user)
                if(!this.user.oldPass || !this.user.newPass || !this.passConfirmation){
                    this.sendError('Por favor, preencha todos os campos!')
                    return
                }

                if (this.passConfirmation !== this.user.newPass){
                    this.sendError('As senhas não conferem!')
                    return
                }
                const objTratado = {
                    new_password: this.user.newPass,
                    current_password: this.user.oldPass
                }
                try{
                    await apiClient.changePassword(objTratado)
                    }catch(err){
                        if(err.data.current_password)
                            this.sendError('A senha anterior não confere.')
                        else this.sendError(err.data)
                        return
                    }
                    this.sendSuccess('Senha alterada com sucesso, por favor faça seu login novamente!')
                    this.$buefy.loading.open()
                    await apiClient.logout()
                    this.retornar()
            },
            retornar(){
                this.$router.push('/')
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