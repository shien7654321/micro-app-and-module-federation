<template>
    <div class="home">
        <p>Home</p>
        <router-link
            class="home__link"
            to="/child"
        >
            Child
        </router-link>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Confirm from '@/components/Confirm/index.vue';

export default defineComponent({
    name: 'home',
    components: {
        Confirm,
    },
});
</script>

<style lang="less" scoped>
.home {
    &__link {
        display: block;
    }
}
</style>
