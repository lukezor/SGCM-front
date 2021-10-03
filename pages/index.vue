<template>
<div class = "home">
  <div class = "container-left">
    <div class="container-left-top">
      <CardAgendamentos/>
    </div>
    <div class="container-left-bottom">
      <p>Container sul-esquerda</p>
    </div>
  </div>
  <div class="container-right">
    <div class="container-right-top">
      <p>Container norte-direita</p>
    </div>
    <div class="container-right-bottom">
      <p>Container sul-direita</p>
    </div>
  </div>
</div>
</template>

<script>
import CardAgendamentos from '../components/atoms/CardAgendamentos.vue';
export default {
  name: "HomePage",
  components:{CardAgendamentos}
};
</script>

<style scoped>
.home {
  display: flex;
  flex-grow: 1;
}
.container-left {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right:20px;
}

.container-left-top{
  background-color: #fff;
  border-radius: 8px;
  flex:1;
  display:flex;
  margin-bottom:20px;
}

.container-left-bottom{
  background-color: #fff;
  border-radius: 8px;
  flex:1;
  display:flex;
}

.container-right-top{
  background-color: #fff;
  border-radius: 8px;
  flex:1;
  display:flex;
  margin-bottom:20px;
}

.container-right-bottom{
  background-color: #fff;
  border-radius: 8px;
  flex:1;
  display:flex;
}

.container-right {
  flex: 1;
  display: flex;
  flex-direction: column;
}



</style>