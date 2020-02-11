<template>
  <div class="HelloWorld">
    <h1>HelloWorld</h1>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" src="@/styles/components/HelloWorld.styl"> </style>
