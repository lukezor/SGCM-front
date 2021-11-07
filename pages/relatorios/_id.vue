<template>
    <div class = "main-container">
        <div class= "padding-geral">
            <div class="titulo">
                <div>
                    <p v-if="relatorio.id == '1'" class="title"> Informações de faixa etária de pacientes </p>
                    <p v-else-if="relatorio.id == '2'" class="title"> Horários, dias e meses com maior número de consultas </p>
                    <p v-else-if="relatorio.id == '3'" class="title"> Pacientes com maior número de consultas </p>
                    <p v-else-if="relatorio.id == '4'" class="title"> Relação de consultas realizadas e canceladas </p>
                    <p v-else-if="relatorio.id == '5'" class="title"> Médicos com maior número de consultas </p>
                </div>
            </div>

            <div v-if="infos" class ="padding-interno">
                <div v-if="relatorio.id == '1'">
                    <div class="columns">
                        <div class="column is-full-mobile is-half-tablet is-4-desktop">
                            <CustomInput disabled rules="max:150" type="text" label="Total de pacientes com informações cadastradas" v-model="infos.total_registered"/>
                        </div>
                        <div class="column is-full-mobile is-half-tablet is-2-desktop">
                            <CustomInput disabled rules="max:150" type="text" label="Idade média dos pacientes" v-model="infos.average_age"/>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-full-mobile is-half-tablet is-4-desktop">
                            <CustomInput disabled rules="max:150" type="text" label="Nome do paciente mais velho" v-model="infos.oldest_name"/>
                        </div>
                        <div class="column is-full-mobile is-half-tablet is-2-desktop">
                            <CustomInput disabled rules="max:150" type="text" label="Idade" v-model="infos.oldest_age"/>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-full-mobile is-half-tablet is-4-desktop">
                            <CustomInput disabled rules="max:150" type="text" label="Nome do paciente mais novo" v-model="infos.youngest_name"/>
                        </div>
                        <div class="column is-full-mobile is-half-tablet is-2-desktop">
                            <CustomInput disabled rules="max:150" type="text" label="Idade" v-model="infos.youngest_age"/>
                        </div>
                    </div>
                </div>
                <div v-else-if="relatorio.id == '2'">
                    <div class="columns">
                        <div class="column is-full-mobile is-half-tablet is-4-desktop">
                            <CustomInput disabled rules="max:150" type="text" label="Dia com maior número de consultas" v-model="infos.best_day.day"/>
                        </div>
                        <div class="column is-full-mobile is-half-tablet is-2-desktop">
                            <CustomInput disabled rules="max:150" type="text" label="Quantidade" v-model="infos.best_day.count"/>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-full-mobile is-half-tablet is-4-desktop">
                            <CustomInput disabled rules="max:150" type="text" label="Mês com maior número de consultas" v-model="infos.best_month.month"/>
                        </div>
                        <div class="column is-full-mobile is-half-tablet is-2-desktop">
                            <CustomInput disabled rules="max:150" type="text" label="Quantidade" v-model="infos.best_month.count"/>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-full-mobile is-half-tablet is-4-desktop">
                            <CustomInput disabled rules="max:150" type="text" label="Horário com maior número de consultas" :value="infos.best_time.horario.substring(0,5)"/>
                        </div>
                        <div class="column is-full-mobile is-half-tablet is-2-desktop">
                            <CustomInput disabled rules="max:150" type="text" label="Quantidade" v-model="infos.best_time.count"/>
                        </div>
                    </div>
                </div>
                <div v-else-if="relatorio.id == '4'">
                    <div class="columns">
                        <div class="column is-full-mobile is-half-tablet is-4-desktop">
                            <CustomInput disabled rules="max:150" type="text" label="Quantidade total de consultas" v-model="infos.total"/>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-full-mobile is-half-tablet is-4-desktop">
                            <CustomInput disabled rules="max:150" type="text" label="Quantidade de consultas aguardando confirmação" v-model="infos.awaiting"/>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-full-mobile is-half-tablet is-4-desktop">
                            <CustomInput disabled rules="max:150" type="text" label="Quantidade de consultas confirmação" v-model="infos.confirmed"/>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-full-mobile is-half-tablet is-4-desktop">
                            <CustomInput disabled rules="max:150" type="text" label="Quantidade de consultas canceladas" v-model="infos.canceled"/>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-full-mobile is-half-tablet is-4-desktop">
                            <CustomInput disabled rules="max:150" type="text" label="Quantidade de consultas finalizadas" v-model="infos.ended"/>
                        </div>
                    </div>
                </div>
                <div v-else-if="relatorio.id == '5' || relatorio.id == '3'">
                    <Table :data="infos" :columns="colunas"/>
                </div>
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
    import Table from '~/components/molecules/Table.vue'
    import notification from '~/utils/notification'
    import apiClient from '~/utils/apiClient'
    import $store from '~/store/userData';

    export default {

        middleware: ['authenticated','allowAdminOnly'],
        name: 'GerarRelatorio',

        components: {
            ValidationObserver,
            CustomInput,
            Table
        },
        data(){
            return {
                relatorio: {
                    id: this.$route.params.id
                },
                infos: null,
                colunas:[
                    {
                        field: 'name',
                        label: 'Nome',
                        searchable: true,
                    },
                    {
                        field: 'qnt',
                        label: 'Quantidade de consultas',
                        centered: true,
                    },
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
            retornar(){
                this.$router.push('/relatorios/listagem')
            }
        },

        async created() {
            if (this.relatorio.id) {
                const loadingComponent = this.$buefy.loading.open()
                try {    
                    this.infos = await apiClient.getRelatorio(this.relatorio.id)
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