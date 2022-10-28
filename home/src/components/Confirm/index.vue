<template>
    <div class="confirm">
        <p>确认</p>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Confirm',
});
</script>

<style lang="less" scoped>
.confirm {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: cyan;
    padding: 20px;
    width: 100px;
}
</style>
