<template>
    <b-navbar>
        <template #brand>
            <b-navbar-item tag="div" class="icone">
                <b-icon @click.native="changeMenuState" icon="menu" size="is-medium"/>
            </b-navbar-item>
        </template>

        <template #end>
            <b-navbar-item tag="div" class="icone">
                <b-icon @click.native="redirect" icon="logout" size="is-medium"/>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default{
   methods: {
        changeMenuState() {
            this.$store.commit('changeMenuState')
        },
        redirect(){
          window.location.replace('http://localhost:3000/login')
        }
   }
}
</script>
<style scoped>
.icone{
  cursor:pointer
}
nav{
  background-color: #367B7B;
}
</style>