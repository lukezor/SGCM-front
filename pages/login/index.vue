<template>
  <div>
    <h2>Bem vindo à Clínica Médica</h2>
    <form>
        <Input placeHolder="Usuário" v-model="user.login"/>
        <Input type="password" placeHolder="Senha" v-model="user.password"/>
        <div style="text-align: end" class="forgotPass">
            <NuxtLink class="form_link" to="/recuperar-senha">Esqueci minha senha ></NuxtLink>
        </div>
        <div @click.prevent="doLogin()">
            <Button btnName="ENTRAR"/>
        </div>
        <p style="color: gray; margin-top:40px">2021© SGCM</p>
    </form>
  </div>
</template>

<script>
import Input from "@/components/atoms/Input"
import Button from "@/components/atoms/Button"
export default {
  name: "LoginPage",
  layout: 'login',
  components:{
      Input,
      Button,
  },
  data() {
        return {
            user: {
                login: null,
                password : null
            }
        }
    },
    methods:{
        async doLogin(){
            //TODO: Validar login e integrar com api
            this.$router.push("/")
        }
    }
};
</script>

<style lang="scss" scoped>
  *{
      box-sizing: border-box;
   }
  h2{
      font-weight: 600;
      font-size: 1.5em;
      text-align: center;
      color:#fff;
      cursor:default;
  }
  .forgotPass{
      font-weight: 400;
      color:#367B36;
      margin-bottom: 20px;
  }
  a{
      color:#367B36;
      text-decoration: none;
      &:hover {
          color: #234e23;
      }
  }
  .g-recaptcha {
      display: inline-block;
  }
  @media (max-width: 450px){ 
      .recaptcha{
          margin-right:100%
      }
      .g-recaptcha{
        display:block;
        transform: scale(0.8)
      }
  }

.forgotPass{
    font-weight: 400;
    color:#367B36;
    margin-bottom: 20px;
}

a{
    color:#367B36;
    text-decoration: none;
    &:hover {
        color: #234e23;
    }
}

span{
    font-size:16px;
    margin-bottom: 5px;
    display:inline-block;
    font-weight: 300;
    letter-spacing: 1px;
}

.form_input{
    width: 100%;
    padding: 10px 20px;
    outline:none;
    font-weight: 400;
    border: 2px solid #eeeeee;
    font-size: 16px;
    letter-spacing: 1px;
    color:black;
    background:transparent;
    border-radius:6px;
    &:hover {
        border-color: lightblue;
    }
    &:focus {
        border-color: #0e7dbf;
    }
}

label{
    position: relative;
    left: 0.5rem;
    top: -2rem;
    padding: 0 0.5rem;
    font-family: inherit;
    color: grey;
    cursor: text;
    transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in;
    background-color: white;
}

.form_input:focus ~ label,
.form_input:not(:placeholder-shown).form_input:not(:focus) ~ label{
    top: -3.3rem;
    font-size: 0.8rem;
    left: 0.8rem;
}

.form_input:focus ~ label{
    color:#0e7dbf
}

.entrar{
    width:100%;
    padding: 10px 20px;
    outline:none;
    font-weight: 600;
    border: 2px solid #b1e0fc;
    font-size: 16px;
    letter-spacing: 1px;
    color:white;
    background-color:#13a1f5;
    border-radius:6px;
    text-align: center;

    &:hover{
        background-color:#3597cf ;
    }
}

.g-recaptcha {
    display: inline-block;
}

@media (max-width: 450px){ 
    .recaptcha{
        margin-right:100%
    }
    .g-recaptcha{
    display:block;
    transform: scale(0.8)
    }
}
</style>
