<template>
  <div class="padding">
      <div class="titleWrapper">
        <p class="cardTitle">Agendamento de Consultas</p>
        <div @click.native="reloadCard()" class="reloadButton">
            <b-icon class="reloadIcon" @click.native="reloadCard()" icon="reload"/>
        </div>
      </div>
      <div class="infosWrapper">
          <p> Data: {{today()}} </p>
          <p> Consultas marcadas: {{consultasMarcadas}} </p>
          <p> Horários livres: {{horariosLivres}} </p>
          <p> Consultas finalizadas: {{consultasFinalizadas}} </p>
          <p> Consultas canceladas: {{consultasCanceladas}} </p>
      </div>
      <div class="buttonArea">
          <b-button @click.native="redirect('/agendamento/')" class="leftButton" type="is-primary">Novo agendamento</b-button>
          <b-button @click.native="redirect('/agendamento/listagem')" class="rightButton" type="is-primary is-light">Visualizar agendamentos</b-button>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            consultasMarcadas: "0",
            horariosLivres: "0",
            consultasFinalizadas: "0",
            consultasCanceladas: "0"
        }
    },
    methods:{
        reloadCard(){
            //alterar quando tiver api
            window.location.reload()
        },
        today(){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            return (today = dd + '/' + mm + '/' + yyyy) 
        },
        redirect(location){
            this.$router.push({path: location});
        }
    }
};
</script>
<style lang="scss" scoped>
.padding{
    padding:25px;
    width:100%;
    height: 100%;
    position: relative;
}
.titleWrapper{
    display:flex;
    flex-direction: row;
    align-items:center;
}
.cardTitle{
    color:black;
    font-size:18px;
    font-weight: 600;
}
.reloadButton{
    background-color: #4d66b083;
    cursor:pointer;
    width: 40px;
    height: 40px;
    margin-left:auto;
    border-radius: 100px;
    display:flex;
    align-items:center;
    justify-content: center;
}
.icon{
    color:#4D66B0
}
.infosWrapper{
    display:flex;
    height: 50%;
    margin-top: 15px;
    margin-bottom: 15px;
    flex-direction: column;
    justify-content: space-around;
}
.buttonArea{
    display:flex;
    justify-content: space-around;
}
</style>
