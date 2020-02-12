<template>
  <div class="HelloWorld">
    <canvas ref="canvas"></canvas>
  </div>
</template>
<script>
import World from '@/engine/World'
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  mounted () {
    console.log('on HelloWorld');
    this.$nextTick(() => {
      const w = new World({
        canvas: this.$refs.canvas
      })
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" src="@/styles/components/HelloWorld.styl"> </style>
