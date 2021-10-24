<template>
    <ValidationProvider
        :vid="vid"
        :rules="rules"
        v-slot="{ errors }">

        <b-field :class="classe"
            v-bind="$attrs"
            :addons="false"
            :type="{ 'is-danger': errors[0] }"
            :message="errors">
        <div class="control" v-bind:class="{ 'has-icons-right' : errors[0] }">    
            <Cleave v-bind="$attrs" v-model="innerValue" :options="options" @blur="blur" class="input" :class="{ 'is-danger': errors[0]}"/>
            <span class="icon is-right has-text-danger" v-show="errors[0]">
                <i class="mdi mdi-alert-circle mdi-24px"></i>
            </span>
        </div>
        </b-field>
    </ValidationProvider>
</template>

<script>  
import Cleave from 'vue-cleave-component'
import { ValidationProvider } from 'vee-validate'

export default {
    components: {
        Cleave,
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
        options: {
            type: Object
        },
        vid: {
            default: null
        },
        atendimento: {
            default: false
        }
    },

    data() {
        return {
            innerValue: '',
            classe: '',
        }
    },

    methods: {
        blur() {
            this.$emit('blur')
        }
    },

    watch: {
        innerValue(newVal) {
            this.$emit('input', newVal)
        },
        value(newVal) {
            if(this.options.date && newVal.length == 8){
                let maxDate = new Date()
                let dd = newVal[0]+newVal[1]
                let mm = newVal[2]+newVal[3]
                let yyyy = newVal[4]+newVal[5]+newVal[6]+newVal[7]
                let valDate = yyyy+"-"+mm+"-"+dd
                let actualDate = new Date(valDate) 
                // console.log(actualDate.getFullYear())
                
                if(actualDate >= maxDate){
                    actualDate = maxDate
                    let dd = String(actualDate.getDate()).padStart(2, '0')
                    let mm = String(actualDate.getMonth() + 1).padStart(2, '0')
                    newVal = `${dd}${mm}${actualDate.getFullYear()}`
                }else if(actualDate.getFullYear() === -1){
                    newVal = newVal.replace(/\d{4}$/, this.options.dateMin.slice(0,4))
                }
            }
            this.innerValue = newVal
        }
    },

    created() {
        if (this.value) {
            this.innerValue = this.value
        }
        if (this.atendimento) {
            this.classe = 'inputmask-color'
        }
    }
}
</script>

<style scoped>

    .inputmask-color input {
        background-color: #d8e4f8;
    }
    
</style>