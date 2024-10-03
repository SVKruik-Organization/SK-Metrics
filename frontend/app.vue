<script setup lang="ts">
import type { RouteLocation } from "vue-router";
import "~/assets/css/base.css";
import type { ChartData } from "./assets/customTypes";

// Reactive Data
const goalData_2_1: Ref<null | ChartData> = ref(null);
const goalData_2_2: Ref<null | ChartData> = ref(null);
const goalData_2_3: Ref<null | ChartData> = ref(null);
const goalData_4_1: Ref<null | Array<ChartData>> = ref([]);
const goalData_4_2: Ref<null | Array<ChartData>> = ref([]);

// Life Cycle
onMounted(async () => {
    setTimeout(() => {
        setDocumentTitle(useRoute().path);
    }, 100);

    await useFetchGoal2(false);
    await useFetchGoal4(false);
    loadData(useDataStorage().$state);
});

// Watchers
watch(useRoute(), (to: RouteLocation, _from: RouteLocation) => {
    setDocumentTitle(to.path);
});
watch(useDataStorage().$state, (to) => {
    loadData(to);
});

// Methods

/**
 * (Re-)load the data from the session storage.
 * @param source The source to load the data from.
 */
function loadData(source: any): void {
    goalData_2_1.value = JSON.parse(source.goalData_2_1);
    goalData_2_2.value = JSON.parse(source.goalData_2_2);
    goalData_2_3.value = JSON.parse(source.goalData_2_3);
    goalData_4_1.value = source.goalData_4_1;
    goalData_4_2.value = source.goalData_4_2;
}

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
                <NuxtPage :goalData_2_1="goalData_2_1" :goalData_2_2="goalData_2_2" :goalData_2_3="goalData_2_3"
                    :goalData_4_1="goalData_4_1" :goalData_4_2="goalData_4_2" />
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
    min-height: 100vh;
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