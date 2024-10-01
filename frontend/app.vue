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
    <div class="flex-col content">
        <div class="flex-col top-content">
            <Navbar />
            <main>
                <NuxtPage />
            </main>
        </div>
        <Footer />
    </div>
</template>

<style scoped>
.content {
    justify-content: space-between;
    gap: 30px;
    width: 100%;
}

.top-content {
    width: 100%;
}

main {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
}
</style>