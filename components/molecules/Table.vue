<template>
        <b-table 
            :data="data"
            :paginated="paginated"
            :per-page="perPage"
            :paginated-position="'bottom'">
            <template v-for="column in columns">
                <b-table-column :key="column.id" v-bind="column">
                    <template
                        v-if="column.searchable && !column.numeric && column.field != 'data' && column.field != 'status' && column.field != 'id_medico' && column.field != 'id_paciente'"
                        #searchable="props">
                        <b-input
                            v-model="props.filters[props.column.field]"
                            placeholder="Pesquisar..."
                            icon="magnify"
                            size="is-small" />
                    </template>
                    <template
                        v-else-if="column.field == 'data'"
                        #searchable="props">
                        <b-input
                            v-model="props.filters[props.column.field]"
                            placeholder="aaaa-mm-dd"
                            icon="magnify"
                            size="is-small" />
                    </template>
                    <template
                        v-else-if="column.field == 'id_medico' || column.field == 'id_paciente'"
                        #searchable="props">
                        <b-input
                            v-model="props.filters[props.column.field]"
                            placeholder="Pesquisa por ID"
                            icon="magnify"
                            size="is-small" />
                    </template>
                    <template
                        v-else-if="column.field == 'status'"
                        #searchable="props">
                        <b-select placeholder="Selecione..." v-model="props.filters[props.column.field]" size="is-small" icon="magnify">
                            <option value="">...</option>
                            <option value="0">Aguardando confirmação</option>
                            <option value="1">Confirmado</option>
                            <option value="2">Cancelado</option>
                            <option value="3">Finalizado</option>
                        </b-select>
                    </template>
                    <template v-slot="props">
                        
                        <template v-if="column.field == 'id_medico' || column.field == 'id_paciente'">
                            {{getUserName(props.row[column.field])}}
                        </template>
                        <template v-else-if="column.field == 'data'">
                            {{$moment(props.row[column.field]).format('DD/MM/yyyy')}}
                        </template>
                        <template v-else-if="column.field == 'status'">
                            {{replaceAndSaveStatus(props.row[column.field],props.row.id)}}
                        </template>
                        <template v-else-if="column.field == 'crud-options-edit'">
                            <div class="editar">
                                <b-button class="is-primary is-outlined" icon-right="border-color" @click="$router.push({path: path + props.row.id})"/>
                            </div>
                        </template>
                        <template v-else-if="column.field == 'relatorio'">
                            <div class="editar">
                                <b-button class="is-primary is-outlined" icon-right="clipboard-edit" @click="$router.push({path: path + props.row.id})"/>
                            </div>
                        </template>
                        <template v-else-if="column.field == 'crud-options-view'">
                            <div class="editar">
                                <b-button class="is-primary is-outlined" icon-right="file-find" @click="$router.push({path: path + props.row.id})"/>
                            </div>
                        </template>
                        <template v-else-if="column.field == 'crud-options-confirm-edit'">
                            <div class="editar">
                                <b-button class="is-primary is-outlined" icon-right="check" @click="confirm(props.row.id)" :disabled="disabledRows.includes(props.row.id)"/>
                                <b-button class="is-primary is-outlined" icon-right="close" @click="unconfirm(props.row.id)" :disabled="disabledRows.includes(props.row.id)"/>
                                <b-button class="is-primary is-outlined" icon-right="border-color" @click="$router.push({path: path + props.row.id})" :disabled="disabledRows.includes(props.row.id)"/>
                            </div>
                        </template>
                        <template v-else-if="column.field == 'crud-options-confirm-edit-delete'">
                            <div class="editar">
                                <b-button class="is-primary is-outlined" icon-right="check" @click="confirm(props.row.id)" :disabled="disabledRows.includes(props.row.id)"/>
                                <b-button class="is-primary is-outlined" icon-right="close" @click="unconfirm(props.row.id)" :disabled="disabledRows.includes(props.row.id)"/>
                                <b-button class="is-primary is-outlined" icon-right="border-color" @click="$router.push({path: path + props.row.id})"/>
                                <b-button class="is-danger is-outlined" icon-right="delete" @click="deelete(props.row.id)"/>
                            </div>
                        </template>
                        <template v-else-if="column.field == 'crud-options-confirm'">
                            <div class="editar">
                                <b-button class="is-primary is-outlined" icon-right="check" @click="confirm(props.row.id)" :disabled="disabledRows.includes(props.row.id)"/>
                                <b-button class="is-primary is-outlined" icon-right="close" @click="unconfirm(props.row.id)" :disabled="disabledRows.includes(props.row.id)"/>
                            </div>
                        </template>
                        <template v-else-if="column.field == 'crud-options-finish'">
                            <div class="editar">
                                <b-button class="is-primary is-outlined" icon-right="alarm-check" @click="finish(props.row.id)"/>
                            </div>
                        </template>
                        <template v-else>
                            {{ props.row[column.field] }}
                        </template>
                    </template>
                </b-table-column>
            </template>
        </b-table>
</template>

 <script>
    import apiClient from '~/utils/apiClient.js'
    import notification from '~/utils/notification.js'
    export default {
        data(){
            return{
                users:[],
                disabledRows:[],
                here:''
            }
        },
        props: {
            data: {
                required: true,
                type: Array
            },
            columns: {
                required: true,
                type: Array
            },
            paginated: {
                required: false,
                type: Boolean,
                default: true,
            },
            perPage: {
                required: false,
                type: Number,
                default: 7,
            },
            path:{
                required: true,
                type: String
            },
            isDisabledConfirm:{
                required: false,
                type: Boolean,
                default: false
            },
            isDisabledUnconfirm:{
                required: false,
                type: Boolean,
                default: false
            }
        },
        methods:{
            async confirm(id){
                console.log("Confirmando consulta com id: ",id)
                try{
                    await apiClient.changeStatusAgendamento(id,1)
                }catch(e){
                    console.log(e)
                    notification.sendNotification('Ocorreu um erro ao confirmar a consulta, tente novamente!', 'is-danger', 5000)
                    return
                }
                notification.sendNotification('Consulta confirmada com sucesso.', 'is-success', 5000)
            },
            async unconfirm(id){
                console.log("Cancelando consulta com id: ",id)
                try{
                    await apiClient.changeStatusAgendamento(id,2)
                }catch(e){
                    console.log(e)
                    notification.sendNotification('Ocorreu um erro ao cancelar a consulta, tente novamente!', 'is-danger', 5000)
                    return
                }
                notification.sendNotification('Consulta cancelada com sucesso.', 'is-success', 5000)
            },
            async finish(id){
                console.log("Finalizando consulta com id: ",id)
                try{
                    await apiClient.changeStatusAgendamento(id,3)
                }catch(e){
                    console.log(e)
                    notification.sendNotification('Ocorreu um erro ao finalizar a consulta, tente novamente!', 'is-danger', 5000)
                    return
                }
                notification.sendNotification('Consulta finalizada com sucesso.', 'is-success', 5000)
            },
            async deelete(id){
                console.log("Deletando consulta com id: ",id)
                try{
                    await apiClient.deleteAgendamento(id)
                }catch(e){
                    console.log(e)
                    notification.sendNotification('Ocorreu um erro ao deletar a consulta, tente novamente!', 'is-danger', 5000)
                    return
                }
                notification.sendNotification('Consulta deletada com sucesso.', 'is-success', 5000)
            },
            getUserName(id){
                for(let i = 0; i < this.users.length; i++){
                    if (this.users[i].id == id)
                        return "("+this.users[i].id+") "+ this.users[i].first_name.toUpperCase() + " " + this.users[i].last_name.toUpperCase()
                }
            },
            replaceAndSaveStatus(status,row){
                if(status == '0') return "Aguardando confirmação"
                if(status == '1'){
                    if(!this.disabledRows.includes(row)) this.disabledRows.push(row)
                    return "Confirmado"
                }
                if(status == '2'){
                    if(!this.disabledRows.includes(row)) this.disabledRows.push(row)
                    return "Cancelado" 
                } 
                if(status == '3'){
                    if(!this.disabledRows.includes(row)) this.disabledRows.push(row)
                    return "Finalizado" 
                } 
            }
        },
        async created(){
            try{
                this.users = await apiClient.getAllUsers()
            }catch(e){
                console.log("Error in table: ",e)
            }
        }
    }
</script>
<style>
.tableSection{
    height: 100%;
    width:100%;
}
</style>