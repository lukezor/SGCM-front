<template>
        <b-table 
            :data="data"
            :paginated="true"
            :per-page="8"
            :paginated-position="'bottom'">
            <template v-for="column in columns">
                <b-table-column :key="column.id" v-bind="column">
                    <template
                        v-if="column.searchable && !column.numeric"
                        #searchable="props">
                        <b-input
                            v-model="props.filters[props.column.field]"
                            placeholder="Search..."
                            icon="magnify"
                            size="is-small" />
                    </template>
                    <template v-slot="props">
                        
                        <template v-if="column.field == 'crud-options-edit'">
                            <div class="editar">
                                <b-button class="is-primary is-outlined" icon-right="border-color" @click="$router.push({path: path + props.row.id})"/>
                            </div>
                        </template>
                        <template v-else-if="column.field == 'crud-options-confirm-edit'">
                            <div class="editar">
                                <b-button class="is-primary is-outlined" icon-right="check" @click="confirm(props.row.id)" :disabled="isDisabledConfirm"/>
                                <b-button class="is-primary is-outlined" icon-right="close" @click="unconfirm(props.row.id)" :disabled="isDisabledUnconfirm"/>
                                <b-button class="is-primary is-outlined" icon-right="border-color" @click="$router.push({path: path + props.row.id})"/>
                            </div>
                        </template>
                        <template v-else-if="column.field == 'crud-options-confirm'">
                            <div class="editar">
                                <b-button class="is-primary is-outlined" icon-right="check" @click="confirm(props.row.id)" :disabled="isDisabledConfirm"/>
                                <b-button class="is-primary is-outlined" icon-right="close" @click="unconfirm(props.row.id)" :disabled="isDisabledUnconfirm"/>
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
    export default {
        props: {
            data: {
                required: true,
                type: Array
            },
            columns: {
                required: true,
                type: Array
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
            confirm(id){
                console.log("Confirmando: ",id)
            },
            unconfirm(id){
                console.log("Cancelando: ",id)
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