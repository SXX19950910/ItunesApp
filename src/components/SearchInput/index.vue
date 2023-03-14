<template>
  <div class="search-input relative">
    <input v-model="keyword" class="search-input__inner pl-10" placeholder="Search..." @keydown="onkeydown"/>
    <van-icon class="absolute left-3 top-2 text-[#A3AEB5]" size="22" name="search" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { debounce } from '@/utils/tools'

const keyword = ref('')

const $emit = defineEmits(['search'])

const onkeydown = debounce(() => {
  $emit('search', keyword.value)
}, 400)
</script>

<style lang="less">
.search-input {
  &__inner {
    width: 100%;
    height: 40px;
    border-radius: 40px;
    background-color: #F4F4F4;
  }
}
</style>