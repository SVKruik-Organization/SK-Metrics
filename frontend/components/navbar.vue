<script setup lang="ts">

// Setup
const dataStorage = useDataStorage();

// Reactive Data
const refreshing: Ref<boolean> = ref(false);

// Methods

/**
 * Refresh the content on the page.
 */
function handleRefresh(): void {
    if (refreshing.value) return;
    dataStorage.reset();
    refreshing.value = true;
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}
</script>

<template>
    <header>
        <nav>
            <NuxtLink class="nav-link" active-class="active-nav-link" to="/">Home</NuxtLink>
            <NuxtLink class="nav-link" active-class="active-nav-link" to="/graph">Grafieken</NuxtLink>
            <NuxtLink class="nav-link" active-class="active-nav-link" to="/table">Tabellen</NuxtLink>
            <a class="nav-link" href="https://github.com/SVKruik-Organization/SK-Metrics" target="_blank">Repository</a>
            <button @click.prevent="handleRefresh" :class="{ 'reloading': refreshing }">
                <i class="fa-regular fa-arrows-rotate"></i>
            </button>
        </nav>
    </header>
</template>

<style scoped>
header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

nav {
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border);
    margin-bottom: 35px;
}

.nav-link {
    height: 70px;
    line-height: 80px;
    box-sizing: border-box;
    color: var(--font);
    text-decoration: none;
}

.active-nav-link {
    border-bottom: 2px solid var(--border);
}

button {
    position: fixed;
    top: 10px;
    right: 10px;
    background-color: var(--fill);
    border: 1px solid var(--border);
    border-radius: var(--border-radius-low);
    box-sizing: border-box;
    padding: 5px;
    width: 35px;
    aspect-ratio: 1 / 1;
    transition: background-color 0.3s;
}

button:hover {
    background-color: var(--fill-light);
}
</style>