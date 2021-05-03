<template>
  <BasicLayout>
    <h1>Acerca de...</h1>
    <form class="ui form" @submit.prevent="register">
     <select class="ui dropdown">
      <option value="">Gender</option>
      <option value="1">Male</option>
      <option value="0">Female</option>
     </select>
    </form>

  </BasicLayout>
</template>

<script>
import BasicLayout from "../layouts/BasicLayout"
export default {
  name: 'About',
  components: {
    BasicLayout,
  }
}
</script>

<style>

</style>