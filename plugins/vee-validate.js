import { extend } from "vee-validate";
import { required, between, max, email, min, min_value, required_if, max_value, alpha_spaces } from "vee-validate/dist/rules";

extend("required", {
    ...required,
    message: "Este campo é obrigatório"
});

extend("required_if", {
    ...required_if,
    message: "Este campo é obrigatório"
});

extend("between", {
    ...between,
    message: "Respeite o intervalo entre {min} a {max}"
});

extend("max", {
    ...max,
    message: "Máximo {length} caracteres"
});

extend("min", {
    ...min,
    message: "Mínimo {length} caracteres"
});

extend("min_value", {
    ...min_value,
    message: "Valor mínimo: {min}"
});

extend("max_value", {
    ...max_value,
    message: "Valor máximo: {max}"
});

extend("email", {
    ...email,
    message: "Email inválido"
});

extend('alpha_spaces',{
    ...alpha_spaces,
    message: "Utilize apenas letras"
})