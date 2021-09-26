<template>
  <div class="inputBx">
    <input class="form_input" :type='type' placeholder=" " autocomplete="off" v-model="innerValue" >
    <img v-if="filename" id="imagem" ref="hideSvg"  :src="require(`@/assets/images/${filename}`)" alt="">
    <label :class="noImage()" >{{placeHolder}}</label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      innerValue: null,
    }
  },
  props: {
    type:{
      type:String,
      required:false,
      default:'text'
    },
    value: {
      type: null
    },
    placeHolder: {
      type: String,
      required: true,
      default: "Digite algo...",
    },
    filename: {
      type: String,
      required: false,
      default: "",
    },
  },
  methods: {
    noImage() {
      console.log(this.filename);
      if (!this.filename) {
        return "moveLabel";
      }
    },
  },
  mounted() {
    this.noImage();
  },
  watch: {
    innerValue(newVal) {
      this.$emit("input", newVal);
    },

    value(newVal) {
      this.innerValue = newVal;
    },
  },

  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  }
}
</script>

<style lang="scss" scoped>
  .inputBx{
    width:100%;
    height: 70px;
  }
  input{
    width:100%;
    padding: 10px 20px;
    outline:none;
    font-weight: 400;
    border: 2px solid #4DB0B0;
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
    padding: 0 0.5rem;
    font-family: inherit;
    color: #aaaaaa;
    cursor: text;
    transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in;
    background-color: white;
    pointer-events: none;
  }
  .form_input:focus ~ label,
  .form_input:not(:placeholder-shown).form_input:not(:focus) ~ label{
    top: -3.5rem;
    font-size: 0.8rem;
    left: 0.8rem;
  }
  .form_input:focus ~ label{
    color:#0e7dbf
  }    
  #imagem{
    position: relative;
    left: 20px;
    top: -2rem;
    pointer-events: none;
    filter: invert(80%) sepia(1%) saturate(0%) hue-rotate(359deg) brightness(86%) contrast(86%);
    width:24px;
    height:24px
  }  

  .form_input:focus ~ img,
  .form_input:not(:placeholder-shown).form_input:not(:focus) ~ img{
    display: none;
  }
  .moveLabel{
    left: 1rem;
    top: -1.9rem;
  }

.form_input:focus ~ label {
  color: #0e7dbf;
}

#imagem {
  position: relative;
  left: 20px;
  top: -2rem;
  pointer-events: none;
  filter: invert(52%) sepia(0%) saturate(0%) hue-rotate(356deg) brightness(97%)
  contrast(86%);
  width: 24px;
  height: 24px;
}

.form_input:focus ~ img,
.form_input:not(:placeholder-shown).form_input:not(:focus) ~ img {
  display: none;
}

.moveLabel {
  left: 1rem;
  top: -1.9rem;
}
</style>
