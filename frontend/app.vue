<script setup lang="ts">
import type { RouteLocation } from "vue-router";
import "~/assets/css/base.css";

// Setup
const route = useRoute();

// Watchers
watch(() => route, (to: RouteLocation, _from: RouteLocation) => {
    let suffix: string = to.path.split("/")[1];
    if (suffix.length) {
        suffix = suffix.charAt(0).toUpperCase() + suffix.slice(1);
    } else suffix = "Home";
    document.title = `SK Metrics | ${suffix}`;
});
</script>

<template>
    <Navbar />
    <main>
        <NuxtPage />
    </main>
</template>

<style scoped>
main {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
}
</style>