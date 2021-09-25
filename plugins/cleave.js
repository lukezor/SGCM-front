import Vue from 'vue'
import Cleave from "cleave.js";
import "cleave.js/dist/addons/cleave-phone.br";


Vue.directive('cleave', {
    name: 'cleave',
    bind(el, binding) {
        const input = el.querySelector("input");
        input._vCleave = new Cleave(input, binding.value);
    },
    unbind(el) {
        const input = el.querySelector("input");
        input._vCleave.destroy();
    },
})
