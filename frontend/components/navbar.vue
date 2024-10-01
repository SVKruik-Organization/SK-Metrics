<template>
    <header>
        <nav>
            <NuxtLink class="nav-link" active-class="active-nav-link" to="/">Home</NuxtLink>
            <NuxtLink class="nav-link" active-class="active-nav-link" to="/graph">Grafieken</NuxtLink>
            <NuxtLink class="nav-link" active-class="active-nav-link" to="/table">Tabellen</NuxtLink>
            <a class="nav-link" href="https://github.com/SVKruik-Organization/SK-Metrics" target="_blank">Repository</a>
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
}

.active-nav-link {
    border-bottom: 2px solid var(--border);
}
</style>