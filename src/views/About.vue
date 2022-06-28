<template>
  <div>About</div>
   <div>id: {{item.id}}</div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  inject: ['store'],
  asyncData({ store, route }) {
    return route.value.query.id && store.dispatch('fetchItems', route.value.query.id)
  },
  computed: {
      // 从 store 的 state 对象中的获取 item。
      item() {
          return this.store.state.item;
      }
  }
}

</script>
<style lang='scss' scoped>
</style>