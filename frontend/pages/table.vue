<script setup lang="ts">
import { TableHeaderType, type LearningGoalEntry, type TableAllData } from '~/assets/customTypes';
import { formatISODate } from '~/utils/date';

// Reactive Data
const tableAllData: Ref<TableAllData> = ref({ tableHeaders: [], points: [] });

// Data Fetch
onMounted(async () => {
    // Index
    tableAllData.value = await $fetch("/api/table");
});

// Methods

/**
 * Sort the table based on the clicked column.
 * @param column The column to sort on.
 * @param type Overwrite the default sorting method. Default is number.
 */
function sortTable(event: MouseEvent, column: keyof LearningGoalEntry, type?: TableHeaderType): void {
    const eventTarget = event.target as HTMLTableCellElement;
    const sortOrder = eventTarget.getAttribute("data-sort-order");
    const multiplier = sortOrder === "asc" ? 1 : -1;
    eventTarget.setAttribute("data-sort-order", sortOrder === "asc" ? "desc" : "asc");

    if (type === TableHeaderType.NUMBER || type === TableHeaderType.PERCENTAGE) {
        tableAllData.value.points.sort((a, b) => {
            const columnA = parseInt(a[column] as string);
            const columnB = parseInt(b[column] as string);

            if (columnA < columnB) return -1 * multiplier;
            if (columnA > columnB) return 1 * multiplier;
            return 0;
        });
    } else if (type === TableHeaderType.DATE) {
        tableAllData.value.points.sort((a, b) => {
            const columnA = new Date(formatISODate(a[column] as string));
            const columnB = new Date(formatISODate(b[column] as string));

            if (columnA < columnB) return -1 * multiplier;
            if (columnA > columnB) return 1 * multiplier;
            return 0;
        });
    } else tableAllData.value.points.sort((a, b) => {
        if (a[column] < b[column]) return -1 * multiplier;
        if (a[column] > b[column]) return 1 * multiplier;
        return 0;
    });
}
</script>

<template>
    <section class="content-wrapper">
        <article class="flex-col">
            <p>
                Op deze pagina zijn de ruwe gegevens te vinden die in de database zijn opgeslagen. Ook heb ik de
                gefilterde en berekende data die in de <NuxtLink to="/graph">grafieken</NuxtLink> gebruikt worden in
                tabelvorm hieronder weergegeven.
            </p>
            <p>
                Tijdens mijn stage houd ik deze meetpunten in een database bij, zodat hier altijd de nieuwste resultaten
                te zien zijn. Zie ook de <NuxtLink to="/graph">grafieken</NuxtLink> pagina voor nog meer interessante en
                ruwe data.
            </p>
            <p>
                Om het systeem te besparen worden sommige datasets in de browser (session storage) opgeslagen. Dit
                betekent dat de data niet opnieuw opgehaald hoeft te worden bij het herladen van de pagina. Mocht u de
                nieuwste data willen hebben, klik dan rechtsboven op de refresh knop.
            </p>
            <span class="splitter splitter-light"></span>
            <p>
                Alle tabellen ondersteunen sorteren op kolom. Klik op de kolomnaam om te sorteren.
            </p>
        </article>
        <span class="splitter"></span>
        <h3>Kolommen Uitleg</h3>
        <article class="flex-col">
            <p class="flex-col">
                <strong>Week Nr:</strong> Het weeknummer waarin de ticket is aangemaakt.
                <strong>Ticket Nr:</strong> Het interne ticketnummer van het meetpunt.
                <strong>T Geplanned:</strong> De geplande tijd voor de ticket in minuten. We doen sprint poker om de
                tijd te schatten, dus deze waarde correspondeert met een gewicht.
                <strong>T Nodig:</strong> De tijd die nodig was om de ticket af te ronden in minuten.
                <strong>T Nodig %:</strong> Het percentage van de geplande tijd dat nodig was om de ticket af te
                ronden. 100% betekent dat de ticket precies op tijd was afgerond. Onder de 100% betekent dat de ticket
                sneller was afgerond dan gepland en boven de 100% betekent dat de ticket langer duurde dan gepland.
                <strong>Vragen:</strong> Het aantal vragen dat ik had over de ticket.
                <strong>QA:</strong> Het aantal QA iteraties dat nodig was om de ticket af te ronden. Een lege waarde
                betekent dat ik nog wacht op feedback van de QA.
                <strong>Datum Creatie:</strong> De datum waarop het meetpunt is aangemaakt.
                <strong>Datum Update:</strong> De datum waarop het meetpunt voor het laatst is geüpdatet.
            </p>
        </article>
        <span class="splitter"></span>
        <h3>Alle Meetpunten</h3>
        <article class="flex-col">
            <p>
                Voordat ik de datasets verwerkt laat zien, bij deze de ruwe data die ik in de database heb opgeslagen.
                Het is gesorteerd op oplopend week nummer.
            </p>
        </article>
        <span class="splitter splitter-light"></span>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th data-sort-order="asc" v-for="header in tableAllData.tableHeaders" :key="header.id"
                            @click="sortTable($event, header.value, header.type)">{{ header.label }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(point, index) in tableAllData.points" :key="index">
                        <td v-for="(value, key) in point" :key="key">
                            {{ key === 'timeTakenPercentage' ? `${value}%` : value }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <span class="splitter"></span>
        <h3>Leerdoel 2: Samenwerken</h3>
        <article>
            <p>

            </p>
        </article>
        <span class="splitter"></span>
        <h3>Leerdoel 4: Persoonlijke Ontwikkeling</h3>
        <article>
            <p>

            </p>
        </article>
    </section>
</template>

<style scoped>
.table-container {
    overflow-x: auto;
}

table {
    width: 900px;
    border-collapse: collapse;
}

table:nth-child(1) th {
    background-color: #6EC20770;
}

table:nth-child(2) th {
    background-color: #EF5A6F70;
}

table:nth-child(3) th {
    background-color: #3572EF70;
}

table:nth-child(4) th {
    background-color: #FF822570;
}

th {
    cursor: pointer;
    user-select: none;
}

td:hover {
    background-color: var(--fill-light);
}

th,
td {
    border: 1px solid var(--font);
    padding: 8px;
    text-align: left;
}

@media (width <=570px) {
    .table-container {
        width: 100%;
        align-self: flex-start;
    }
}
</style>
