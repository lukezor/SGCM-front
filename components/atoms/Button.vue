<template>
  <div>
    <input class="btn" type="button" :value="btnName" />
  </div>
</template>

<script>
export default {
  props: {
    btnName: {
      type: String,
      required: true
    },
  },
};
</script>
<style lang="scss" scoped>
.btn {
    background-color:#4D66B0;
    height: 50px;
    width: 100%;
    border: none;
    cursor: pointer;
    font-size: 17px;
    /* width: 100%; para ajustar ao tamanho do container descomentar essa linha */
    border-radius: 8px;
    color: #fff;
    &:hover{
          background-color:#3597cf ;
    }
}
</style>
