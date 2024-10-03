<script setup lang="ts">
import { TableHeaderType, type ChartData, type LearningGoalSingleDatasets, type LearningGoalEntry, type TableAllData, type TableSingleData } from '~/assets/customTypes';
import { table_2_Parser } from '~/utils/data';
import { formatISODate } from '~/utils/date';

// Reactive Data
const tableAllData: Ref<TableAllData> = ref({ tableHeaders: [], points: [] });
const tableGoalData_2_1: Ref<TableSingleData | null> = ref(null);
const tableGoalData_2_2: Ref<TableSingleData | null> = ref(null);
const tableGoalData_2_3: Ref<TableSingleData | null> = ref(null);
const tableGoalDataRefs: Record<string, Ref<TableSingleData | null>> = {
    "goalData_2_1": tableGoalData_2_1,
    "goalData_2_2": tableGoalData_2_2,
    "goalData_2_3": tableGoalData_2_3
};

// Props
const props: LearningGoalSingleDatasets = defineProps({
    "goalData_2_1": { type: [Object, null] as PropType<ChartData | null>, required: true },
    "goalData_2_2": { type: [Object, null] as PropType<ChartData | null>, required: true },
    "goalData_2_3": { type: [Object, null] as PropType<ChartData | null>, required: true },
    "goalData_4_1": { type: Array as PropType<Array<ChartData>>, required: true },
    "goalData_4_2": { type: Array as PropType<Array<ChartData>>, required: true }
});

// Data Fetch
onMounted(async () => {
    tableAllData.value = await $fetch("/api/table");
    tableGoalData_2_1.value = table_2_Parser(props.goalData_2_1, TableHeaderType.PERCENTAGE);
    tableGoalData_2_2.value = table_2_Parser(props.goalData_2_2, TableHeaderType.NUMBER);
    tableGoalData_2_3.value = table_2_Parser(props.goalData_2_3, TableHeaderType.NUMBER);
});

// Methods

/**
 * Sort the All Data table based on the clicked column.
 * @param event The click event.
 * @param column The column to sort on.
 * @param type Overwrite the default sorting method. Default is number.
 */
function sortTableAll(event: MouseEvent, column: keyof LearningGoalEntry, type?: TableHeaderType): void {
    const eventTarget: HTMLTableCellElement = event.target as HTMLTableCellElement;
    const sortOrder: string = eventTarget.getAttribute("data-sort-order") as string;
    const multiplier: number = sortOrder === "asc" ? 1 : -1;
    eventTarget.setAttribute("data-sort-order", sortOrder === "asc" ? "desc" : "asc");

    if (type === TableHeaderType.NUMBER || type === TableHeaderType.PERCENTAGE) {
        tableAllData.value.points.sort((a, b) => {
            const columnA: number = parseInt(a[column] as string);
            const columnB: number = parseInt(b[column] as string);

            if (columnA < columnB) return -1 * multiplier;
            if (columnA > columnB) return 1 * multiplier;
            return 0;
        });
    } else if (type === TableHeaderType.DATE) {
        tableAllData.value.points.sort((a, b) => {
            const columnA: Date = new Date(formatISODate(a[column] as string));
            const columnB: Date = new Date(formatISODate(b[column] as string));

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

/**
 * Sort a non-specific table based on the clicked column.
 * @param event The click event.
 * @param column The column to sort on.
 * @param type Overwrite the default sorting method. Default is number.
 */
function sortTabelGeneric(event: MouseEvent, column: keyof TableSingleData["points"][0], data: keyof LearningGoalSingleDatasets) {
    const datasets = tableGoalDataRefs[data].value;
    if (!datasets) return;

    const eventTarget: HTMLTableCellElement = event.target as HTMLTableCellElement;
    const sortOrder: string = eventTarget.getAttribute("data-sort-order") as string;
    const multiplier: number = sortOrder === "asc" ? 1 : -1;
    eventTarget.setAttribute("data-sort-order", sortOrder === "asc" ? "desc" : "asc");

    datasets.points.sort((a, b) => {
        const columnA: number = a[column];
        const columnB: number = b[column];

        if (columnA < columnB) return -1 * multiplier;
        if (columnA > columnB) return 1 * multiplier;
        return 0;
    });
}

function tableGoalData_2_1_viewer(key: keyof TableSingleData["points"][0], value: string | number, invert: boolean): number | string {
    let trendValues = {
        "colorGood": "green",
        "colorBad": "red"
    }

    if (invert) {
        trendValues = {
            "colorGood": "red",
            "colorBad": "green"
        }
    }

    switch (key) {
        case 'delta':
            return `
            <div class="flex ${(value as number) === 0 ? 'hidden' : ''}">
                <p class="text-color-${(value as number) > 0 ? trendValues.colorBad : trendValues.colorGood}">${value}</p>
                <i class="fa-regular 
                    fa-arrow-trend-${(value as number) > 0 ? 'up' : 'down'}
                    text-color-${(value as number) > 0 ? trendValues.colorBad : trendValues.colorGood}"></i>
            </div>`;
        case 'value':
            return `${value}%`;
        default:
            return value;
    }
}
</script>

<template>
    <section class="content-wrapper">
        <article class="flex-col">
            <p>
                Op deze pagina zijn de ruwe gegevens te vinden die in de database zijn opgeslagen. Ook heb ik de
                gefilterde en berekende data die in de <NuxtLink to="/graph">Grafieken</NuxtLink> gebruikt worden in
                tabelvorm hieronder weergegeven.
            </p>
            <p>
                Tijdens mijn stage houd ik deze meetpunten in een database bij, zodat hier altijd de nieuwste resultaten
                te zien zijn. Zie ook de <NuxtLink to="/graph">Grafieken</NuxtLink> pagina voor nog meer interessante
                data.
            </p>
            <p>
                Om het systeem te besparen worden sommige datasets in de browser (session storage) opgeslagen. Dit
                betekent dat de data niet opnieuw opgehaald hoeft te worden bij het herladen van de pagina. Mocht u de
                nieuwste data willen hebben, klik dan rechtsboven op de refresh knop.
            </p>
            <span class="splitter splitter-light"></span>
            <p>
                Alle tabellen ondersteunen sorteren op kolom. Klik op de kolomnaam om te sorteren. Sommige tabellen zijn
                te breed voor de pagina, dus deze zijn horizontaal scrollbaar. Gebruik de scrollbar onder de tabel of
                houd de Shift toets ingedrukt en scroll met de muis/trackpad.
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
                Het is gesorteerd op oplopend week nummer. Ik heb verder geen andere tabellen, dus uit deze data worden
                alle grafieken en berekeningen gemaakt.
            </p>
        </article>
        <span class="splitter splitter-light"></span>
        <div class="flex-col table-container">
            <p>Alle Meetpunten</p>
            <table>
                <thead>
                    <tr>
                        <th data-sort-order="asc" v-for="header in tableAllData.tableHeaders" :key="header.id"
                            @click="sortTableAll($event, header.value, header.type)">{{ header.label }}</th>
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
                Hieronder zijn de tabellen te vinden die op de <NuxtLink to="/graph">Grafieken</NuxtLink> pagina in
                grafiek-vorm te vinden zijn. De kolom 'Verschil' laat het verschil zien tussen de deze en vorige week.
                Een positief getal betekent dat ik meer tijd nodig had, en negatief minder. Lager is dus beter.
            </p>
        </article>
        <span class="splitter splitter-light"></span>
        <div class="table-container-multiple">
            <div class="flex-col table-container">
                <p>Besteedde Tijd</p>
                <table>
                    <thead>
                        <tr>
                            <th data-sort-order="asc" v-if="tableGoalData_2_1"
                                v-for="(header, index) in tableGoalData_2_1.tableHeaders" :key="index"
                                @click="sortTabelGeneric($event, header.key, 'goalData_2_1')">{{ header.label }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="tableGoalData_2_1" v-for="(point, index) in tableGoalData_2_1.points" :key="index">
                            <td v-for="(value, key) in point" :key="key"
                                v-html="tableGoalData_2_1_viewer(key, value, false)">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <small>Lagere Waarde is beter.</small>
            </div>
            <div class="flex-col table-container">
                <p>QA Iteraties</p>
                <table>
                    <thead>
                        <tr>
                            <th data-sort-order="asc" v-if="tableGoalData_2_2"
                                v-for="(header, index) in tableGoalData_2_2.tableHeaders" :key="index"
                                @click="sortTabelGeneric($event, header.key, 'goalData_2_2')">{{ header.label }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="tableGoalData_2_2" v-for="(point, index) in tableGoalData_2_2.points" :key="index">
                            <td v-for="(value, key) in point" :key="key"
                                v-html="tableGoalData_2_1_viewer(key, value, false)">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <small>Lagere Waarde is beter.</small>
            </div>
            <div class="flex-col table-container">
                <p>Vragen</p>
                <table>
                    <thead>
                        <tr>
                            <th data-sort-order="asc" v-if="tableGoalData_2_3"
                                v-for="(header, index) in tableGoalData_2_3.tableHeaders" :key="index"
                                @click="sortTabelGeneric($event, header.key, 'goalData_2_3')">{{ header.label }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="tableGoalData_2_3" v-for="(point, index) in tableGoalData_2_3.points" :key="index">
                            <td v-for="(value, key) in point" :key="key"
                                v-html="tableGoalData_2_1_viewer(key, value, true)">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <small>Hogere of lagere Waarde is neutraal.</small>
            </div>
        </div>
        <span class="splitter"></span>
        <h3>Leerdoel 4: Persoonlijke Ontwikkeling</h3>
        <article>
            <p>

            </p>
        </article>
    </section>
</template>

<style scoped>
.table-container-multiple {
    display: flex;
    gap: 20px;
}

.table-container {
    overflow-x: auto;
}

table {
    width: max-content;
    border-collapse: collapse;
}

table:nth-of-type(1) th {
    background-color: #6EC20770;
}

table:nth-of-type(2) th {
    background-color: #EF5A6F70;
}

table:nth-of-type(3) th {
    background-color: #3572EF70;
}

table:nth-of-type(4) th {
    background-color: #FF822570;
}

th:hover {
    filter: brightness(0.8);
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
