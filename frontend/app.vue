<script setup lang="ts">
import type { RouteLocation } from "vue-router";
import "~/assets/css/base.css";

// Life Cycle
onMounted(() => {
    setTimeout(() => {
        setDocumentTitle(useRoute().path);
    }, 100);
});

// Watchers
watch(useRoute(), (to: RouteLocation, _from: RouteLocation) => {
    setDocumentTitle(to.path);
});

// Methods

/**
 * Set the document title based on the route path.
 * @param title The route path.
 */
function setDocumentTitle(title: string): void {
    const split = title.split("/");
    if (split[1]) {
        document.title = `SK Metrics - ${split[1].charAt(0).toUpperCase() + split[1].slice(1)}`;
    } else document.title = "SK Metrics | Home";
}
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