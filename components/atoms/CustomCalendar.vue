<template>
    <ValidationProvider
        :vid="vid"
        :rules="rules"
        v-slot="{ errors }">

        <b-field 
            v-bind="$attrs" 
            :type="{ 'is-danger': errors[0] }" 
            :message="errors">
            
            <b-datepicker
                :custom-class="classe" 
                v-bind="$attrs" 
                v-model="innerValue"
                locale="pt-BR"
                placeholder="Clique para selecionar...">

                <button class="button is-primary"
                    @click="innerValue = new Date()">
                    <b-icon icon="calendar-today"></b-icon>
                    <span>Hoje</span>
                </button>

                <button class="button is-danger"
                    @click="innerValue = null">
                    <b-icon icon="close"></b-icon>
                    <span>Limpar</span>
                </button>
            </b-datepicker>
        </b-field>
    </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
    components: {
        ValidationProvider
    },
    
    props: {
        rules: {
            type: [Object, String],
            default: null
        },
        value: {
            type: null
        },
        vid: {
            default: null
        },
    },

    data() { 
        return {
            innerValue: null,
            classe: ''
        }
    },

    watch: {
        innerValue(newVal) {
            this.$emit('input', newVal)
        },
        value(newVal) {
            this.innerValue = newVal
        }
    },

    created() {
        if (this.value) {
            this.innerValue = this.value
        }
    }
}
</script>