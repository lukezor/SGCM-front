<template>
    <ValidationProvider
        :vid="vid"
        :rules="rules"
        :placeholer="placeholer"
        v-slot="{ errors }">

        <b-field
            v-bind="$attrs"
            :type="{ 'is-danger': errors[0] }" 
            :message="errors">
            <b-input 
                v-bind="$attrs" 
                v-model="innerValue" 
                @blur="valueUpperCase()" 
                :custom-class="classe"/>
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
        placeholer: {
            type: String,
            default: '',
            required: false
        },
        upperCase: {
            default: 1,
            required: false
        },
        atraso: {
            required: false,
            default: null
        },
        alinhamentoDireita: {
            required: false,
            default: false
        },
        larguraColuna: {
            required: false,
            default: false
        }
    },

    data() { 
        return {
            innerValue: null,
            classe: 'uppercase'
        }

    },

    methods: {
        valueUpperCase() {
            if (typeof this.innerValue === 'string' && this.upperCase == 1) {
                this.innerValue = this.innerValue.toUpperCase()
            }
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
        if (this.upperCase == 0) {
            this.classe = 'notransform'
        } else if (this.upperCase == 2) {
            this.classe = 'lowercase'
        }
    }
}
</script>

<style>

    .uppercase {
        text-transform: uppercase
    }

    .notransform {
        text-transform: none
    }

    .lowercase {
        text-transform: lowercase
    }

    input[type=number]::-webkit-inner-spin-button { 
        -webkit-appearance: none;
    }

    input[type=number] { 
        -moz-appearance: textfield;
        appearance: textfield;
    }

</style>