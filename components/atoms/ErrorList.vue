<template>
  <div>
    <ul style="color: red">
      <li v-for="(err, idx) in errors" :key="idx">{{ err }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ErrorList",
  props: {
    errors: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
};
</script>
