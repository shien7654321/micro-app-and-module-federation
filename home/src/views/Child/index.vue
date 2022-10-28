<template>
    <micro-app
        class="child"
        name="child"
        url="http://localhost:6062/"
        baseroute="/child"
        @datachange="handleDataChange"
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// @ts-ignore
import { removeDomScope } from '@micro-zoe/micro-app';
import {useRouter} from 'vue-router';

export default defineComponent({
    name: 'Child',
    setup() {
        const router = useRouter();
        function handleDataChange() {
            removeDomScope();
            router.push({
                name: 'Home',
            });
        }
        return {
            handleDataChange,
        };
    },
});
</script>

<style lang="less" scoped>

.child {
    height: 100vh;
}

</style>
