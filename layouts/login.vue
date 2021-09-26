<template>
  <section>
    <div class="imgArea">
      <img class="imgTop" src="~/assets/images/logo.png" />
      <p>Protótipo</p>
      <p>SGCM</p>
      <p style="margin-top:10%">Slogan da Clínica</p>
    </div>
    <div class="contentArea">
      <div class="formBox">
        <nuxt />
      </div>
    </div>
  </section>
</template>

<script>
export default {
};
</script>

<style lang="scss">
    section{
        position:relative;
        width:100%;
        height:100vh;
        display:flex;
    }
    section .imgArea{
        position:relative;
        width: 50%;
        height: 100%;
        background-color: #4DB0B0;
    }
    section .contentArea{
        display:flex;
        justify-content: center;
        align-items: center;
        width:50%;
        height: 100%;
    }
     .imgTop{
        display:block;
        margin-top:10%;
        margin-left:auto;
        margin-right:auto;
    }
    .imgArea p{
        position:relative;
        top: 10%;
        text-align: center;
        font-size: 25px;
        font-weight: 500;
        color:#fff;
        z-index: 99;
    }
    section .contentArea .formBox{
        background: #FFFFFF;
        padding:50px;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
    }
    @media (max-width: 900px) {
        section .imgArea{
            position:absolute;
            width: 100%;
            height: 100%;
            left:0;
            top:0;
            background-color: #4DB0B0;
        }
        .imgTop{
            display:none;
        }
        .imgArea p{
            display:none
        }
        section .contentArea{
            display:flex;
            justify-content: center;
            align-items: center;
            width:100%;
            height: 100%;
            z-index: 1;
        }
        section .contentArea .formBox{
            box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
            border-radius: 10px;
            width:90%;
            background:white;
            padding: 50px;
            margin:50px;
        }
    }
</style>
