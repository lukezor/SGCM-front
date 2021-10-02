<template>
  <!-- <div class="container is-widescreen pt-0"> -->
  <div>
    <Navbar/>
    <Sidebar/>
    <nuxt />
  </div>
</template>

<script>
import Navbar from "../components/atoms/Navbar.vue";
import Sidebar from "../components/atoms/Sidebar.vue";
export default {
  components:{ Navbar, Sidebar },
  data() {
    return {};
  },
};
</script>

<style>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  font-family: sans-serif;
}
.content-area{
  height: 100%;
  width: 100%;
  background-color: #EEE;
}
a{
  text-decoration: none;
}

</style>
