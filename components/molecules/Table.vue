<template>
    <section class="tableSection">
        <b-table :data="data">
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
                        {{ props.row[column.field] }}
                    </template>
                </b-table-column>
            </template>
        </b-table>
    </section>
</template>

 <script>
    export default {
        data() {
            return {
                data: [
                    { 'id': 1, 'nome_paciente': 'Jesse', 'nome_medico': 'Simmons', 'date': '15/10/2021', 'time': '12:00' },
                    { 'id': 2, 'nome_paciente': 'John', 'nome_medico': 'Jacobs', 'date': '15/10/2021', 'time': '13:00' },
                    { 'id': 3, 'nome_paciente': 'Tina', 'nome_medico': 'Gilbert', 'date': '14/10/2021', 'time': '14:00' },
                    { 'id': 4, 'nome_paciente': 'Clarence', 'nome_medico': 'Flores', 'date': '13/10/2021', 'time': '08:00' },
                    { 'id': 5, 'nome_paciente': 'Anne', 'nome_medico': 'Lee', 'date': '14/10/2021', 'time': '12:00' }
                ],
                columns: [
                    {
                        field: 'nome_paciente',
                        label: 'Nome do paciente',
                        searchable: true,
                    },
                    {
                        field: 'nome_medico',
                        label: 'Nome do médico',
                        searchable: true,
                    },
                    {
                        field: 'date',
                        label: 'Data',
                        centered: true
                    },
                    {
                        field: 'time',
                        label: 'Horário',
                    }
                ]
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