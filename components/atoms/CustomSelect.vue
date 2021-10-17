<template>
    <div>
        <ValidationProvider
            :vid="vid"
            :rules="rules"
            v-slot="{ errors }">

            <b-field 
                v-bind="$attrs" 
                :type="{ 'is-danger': errors[0] }" 
                :message="errors" >
                
                <b-select v-bind="$attrs" v-model="innerValue" expanded>
                    <option v-for="item in itens" 
                        :key="getItemValue(item)"
                        :value="getItemValue(item)">
                        {{ getItemText(item) }}
                    </option>
                </b-select>
            </b-field>
        </ValidationProvider>
    </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
    components: {
        ValidationProvider,
    },
    
    props: {
        rules: {
            type: [Object, String],
            default: null
        },
        itens: {
            require: true,
            type: Array
        },
        itemValue: {
            required: true,
            type: String
        },
        itemText: {
            required: true,
            type: String
        },
        value: {
            type: null
        },
        vid: {
            default: null
        }
    },

    methods: {
        getItemValue(option) {
            const property = this.itemValue
            let result = null

            if (option[property] != null) {
                result = option[property]
            } 
            return result
        },
        getItemText(option) {
            const property = this.itemText
            let result = null

            if (option[property] != null) {
                result = option[property]
            } 
            return result
        }
    },

    data() { 
        return {
            innerValue: null
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