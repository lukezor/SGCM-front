<template>
  <div class="padding">
      <div class="titleWrapper">
        <p class="cardTitle">Consultas</p>
        <div @click.native="reloadCard()" class="reloadButton">
            <b-icon class="reloadIcon" @click.native="reloadCard()" icon="reload"/>
        </div>
      </div>
      <div class="infosWrapper">
          <table class="greyTable">
            <thead>
                <tr>
                    <th>Paciente</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>cell1_1</td>
                    <td>cell2_1</td>
                    <td>cell3_1</td>
                </tr>
                <tr>
                    <td>cell1_2</td>
                    <td>cell2_2</td>
                    <td>cell3_2</td>
                </tr>
                <tr>
                    <td>cell1_3</td>
                    <td>cell2_3</td>
                    <td>cell3_3</td>
                </tr>
                <tr>
                    <td>cell1_4</td>
                    <td>cell2_4</td>
                    <td>cell3_4</td
                ></tr>
            </tbody>
        </table>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            countCadastros: "0",
            cadastrosHoje: "0",
        }
    },
    methods:{
        reloadCard(){
            //alterar quando tiver api
            window.location.reload()
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
    height: 60%;
    margin-top: 15px;
    margin-bottom: 15px;
    justify-content: space-around;
}
table.greyTable {
  border: 1px solid #FFFFFF;
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}
table.greyTable td, table.greyTable th {
  padding: 3px 2px;
}
table.greyTable tbody td {
  font-size: 13px;
  color: #6D6D6D;
}
table.greyTable thead {
  background: #FFFFFF;
  background: -moz-linear-gradient(top, #ffffff 0%, #ffffff 66%, #FFFFFF 100%);
  background: -webkit-linear-gradient(top, #ffffff 0%, #ffffff 66%, #FFFFFF 100%);
  background: linear-gradient(to bottom, #ffffff 0%, #ffffff 66%, #FFFFFF 100%);
}
table.greyTable thead th {
  font-size: 15px;
  font-weight: bold;
  color: #000000;
  text-align: center;
}
table.greyTable tfoot td {
  font-size: 14px;
}
table.greyTable tfoot .links {
  text-align: right;
}
table.greyTable tfoot .links a{
  display: inline-block;
  background: #1C6EA4;
  color: #FFFFFF;
  padding: 2px 8px;
  border-radius: 5px;
}
</style>
