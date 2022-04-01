<template>
  <div>
    <!-- <router-view /> -->
    <history-transition keep-alive />
  </div>
</template>
<script>
import { Transition } from  '@/packages/'
export default {
  components: {
    'history-transition': Transition,
  }
}
</script>