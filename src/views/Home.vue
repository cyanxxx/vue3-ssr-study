<template>
  <div>
    <div>HOME</div>
    <div>id: {{item.id}}</div>
    <div>name: {{item.name}}</div>
  </div>
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