<template>
  <div class="padding">
      <div class="titleWrapper">
        <p class="cardTitle">Relatórios</p>
        <div @click.native="reloadCard()" class="reloadButton">
            <b-icon class="reloadIcon" @click.native="reloadCard()" icon="reload"/>
        </div>
      </div>
      <div class="infosWrapper">
          <p> Relatórios disponíveis: {{countRelatorios}} </p>
      </div>
      <div class="buttonArea">
          <b-button @click.native="redirect('/relatorios/listagem')" class="leftButton" type="is-primary">Geração de relatórios</b-button>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            countRelatorios: "0",
        }
    },
    methods:{
        reloadCard(){
            //desnecessario
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
