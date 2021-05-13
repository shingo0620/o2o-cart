<template>
  <div class="flex justify-around px-1">
    <font-awesome-icon  v-if="modelValue > 0" icon="minus" size="lg" @click="emitValue(-1)" class="text-gray-700 cursor-pointer"/>
    <font-awesome-icon  v-else icon="trash" size="lg" @click="remove" class="text-red-400 cursor-pointer" />
    <span class="text-gray-800">{{ modelValue }}</span>
    <font-awesome-icon icon="plus" size="lg" @click="emitValue(1)" class="text-gray-700 cursor-pointer" />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: Number
  },
  methods: {
    emitValue (quantity) {
      this.$emit('update:modelValue', this.modelValue + quantity)
    },
    remove () {
      this.$emit('remove')
    }
  }
}
</script>

<style>

</style>