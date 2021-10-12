<template>
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
            }
        },
    }
</script>
<style>
.tableSection{
    height: 100%;
    width:100%;
}
</style>