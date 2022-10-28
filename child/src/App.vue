<template>
    <div class="app">
        <button @click="handleHomeDetailClick">Home</button>
        <confirm/>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
    name: 'App',
    components: {
        Confirm: defineAsyncComponent(() => import('home/Confirm.vue')),
    },
    setup() {
        function handleHomeDetailClick() {
            window.microApp.dispatch({
                backTime: Date.now(),
            });
        }
        return {
            handleHomeDetailClick,
        };
    },
});

</script>

<style lang="less" scoped>
.app {
    color: red;

    &__link {
        display: block;
    }
}
</style>
