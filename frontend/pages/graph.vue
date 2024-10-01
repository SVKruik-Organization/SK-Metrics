<script setup lang="ts">
import type { ChartData } from '~/assets/customTypes';
import { data2_1Parser, data2_2Parser, data_4_1Parser, data_4_2Parser } from '~/utils/data';


// Reactive Data
const goalData_2_1: Ref<null | ChartData> = ref(null);
const goalData_2_2: Ref<null | ChartData> = ref(null);
const goalData_4_1: Ref<null | Array<ChartData>> = ref(null);
const goalData_4_2: Ref<null | Array<ChartData>> = ref(null);

// Data Fetch
const { data: rawGoalData_2 } = await useAsyncData("goal2",
    () => $fetch("/api/goals/2", {
        onRequestError() {
            useRouter().push("/error");
        },
        onResponseError() {
            useRouter().push("/error");
        }
    }));
if (rawGoalData_2.value) {
    goalData_2_1.value = data2_1Parser(rawGoalData_2.value);
    goalData_2_2.value = data2_2Parser(rawGoalData_2.value);
}

const { data: rawGoalData_4 } = await useAsyncData("goal4",
    () => $fetch("/api/goals/4", {
        onRequestError() {
            useRouter().push("/error");
        },
        onResponseError() {
            useRouter().push("/error");
        }
    }));
if (rawGoalData_4.value) {
    goalData_4_1.value = data_4_1Parser(rawGoalData_4.value);
    goalData_4_2.value = data_4_2Parser(rawGoalData_4.value);
}

// Methods

/**
 * Default options for the chart.
 * @param title The title of the graph.
 */
function getOptions(title: string) {
    return {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: title
            }
        }
    };
}
</script>

<template>
    <section class="content-wrapper">
        <article class="flex-col">
            <p>
                Op deze pagina zijn verschillende grafieken te zien die mijn leerdoel inspanning en resultaten in kaart
                brengen. Ik begon met een simpele Excel, maar dat bleek toch wat minder overzichtelijk te zijn.
            </p>
            <p>
                Tijdens mijn stage houd ik deze in een database bij, zodat hier altijd de nieuwste resultaten te zien
                zijn. Zie ook de <NuxtLink to="/table">tabellen</NuxtLink> pagina voor nog meer interessante data.
            </p>
            <p style="margin-top: 10px;">
                <strong>Belangrijk!</strong> Dit project geldt niet voor alle leerdoelen.
                Sommige leerdoelen verwerk en bewijs ik op een andere manier, en zijn daarom niet opgenomen in dit
                project. Ik houd de Portfolio nummering wel aan, dus daarom begin ik bij leerdoel 2.
            </p>
            <p>
                Houdt er daarnaast rekening mee dat ik hier niet alle SMART leerdoelen uitwerk. Raadpleeg mijn portfolio
                voor de leerdoelen, dit zijn enkel de resultaten voor de <strong>M</strong> in SMART.
            </p>
        </article>
        <span class="splitter"></span>
        <h3>Leerdoel 2: Samenwerken</h3>
        <article class="flex-col">
            <p>
                Voor dit leerdoel heb ik verschillende data bijgehouden gedurende mijn stage. Ik presenteer deze data
                doormiddel van de onderstaande grafieken die een goed beeld geven van mijn inspanning en resultaten.
                De grafieken werken met een precisie van een week, en zijn dus gemiddelden per week. Voor exacte
                resultaten verwijs ik naar de <NuxtLink to="/table">tabellen</NuxtLink>. Het concrete doel van dit
                leerdoel is doormiddel van meer vragen te stellen (in plaats van het volledig zelf uit te zoeken) de
                kwaliteit van mijn werk te verbeteren. Minder tijd besteedt en minder QA iteraties voordat de ticket
                echt af is.
            </p>
            <span class="splitter splitter-light"></span>
            <p>
                Hieronder is een grafiek te zien van hoeveel tijd in procenten ik besteed heb aan alle taken per week.
                Stel een ticket is begroot ter waarde van 90 minuten en ik besteed omdat ik vlijtig ben maar 60 minuten,
                dan is het percentage 66%. 150% van 90 minuten zou dus 135 besteedde minuten betekenen. In realiteit zit
                ik hier vaker boven dan onder. De begroting is een inschatting gemaakt door de en voor ervaren
                collega's, dus daarom zit ik er meestal ietwat boven.
            </p>
            <p>
                Dit is het gemiddelde per week. Ik houd per taak bij hoeveel procent ik hier aan werk, en bereken dan
                per week een gemiddelde. In het <NuxtLink to="/table">tabellen</NuxtLink> overzicht zijn de rijen apart
                inzichtelijk.
            </p>
        </article>
        <ChartLine class="chart" label="Besteedde en geplande tijd per ticket in procenten per week."
            :data="goalData_2_1" :options="getOptions('Tijd besteed per taak gemiddeld per week')"></ChartLine>
        <small class="graph-note">Lager is beter.</small>
        <span class="splitter splitter-light"></span>
        <article>
            <p>
                Hieronder is een grafiek te zien van hoeveel QA iteraties er nodig waren voordat een taak productie in
                kon. Dit is een gemiddelde per week. Dit is een indicator van hoe goed ik de taak begreep en hoe goed ik
                de taak heb uitgevoerd. Maar natuurlijk ook programmeer kennis. Soms zijn er functies in het framework
                die ik gebruiken kan, en hoef ik het niet zelf opnieuw uit te vinden.Een waarde van 0 betekent dat er
                wel naar gekeken is, maar dat er geen verdere aanpassingen nodig waren. Sommige taken zijn gevoelig en
                complex, dus vereisen daarom veel iteraties. Over het algemeen is dit getal naar beneden te krijgen door
                vragen te stellen, wat het doel van dit leerdoel is.
            </p>
        </article>
        <ChartLine class="chart" label="Hoeveelheid QA iteraties vereist voordat een taak productie in kon per week."
            :data="goalData_2_2" :options="getOptions('QA iteraties vereist per taak gemiddeld per week')"></ChartLine>
        <small class="graph-note">Lager is beter.</small>
        <span class="splitter"></span>
        <h3>Leerdoel 4: Persoonlijke Ontwikkeling</h3>
        <article class="flex-col">
            <p>
                Ook voor dit leerdoel heb ik verschillende data bijgehouden gedurende mijn stage. Bij PO gaat het erom
                dat ik in meer 'afdelingen' van het bedrijf meedraai, en zo meer kennis opdoe. Dit betekent dus niet
                alleen backend, maar ook deployment, frontend, enzovoorts. Bij verschillende afdelingen horen dan
                natuurlijk ook andere talen, dus die heb ik ook bijgehouden.
            </p>
            <p>
                Ik laat dit zien door gebruik te maken van een Radar chart. Dit type grafiek geeft goed aan hoe verdeeld
                mijn werkzaamheden zijn. Des te meer verdeeld, des te beter. Het eerste paar grafieken telt de
                hoeveelheid dat een categorie of taal in een taak voorkomt, en het tweede paar gebruikt de besteedde
                tijd in minuten.
            </p>
            <span class="splitter splitter-light"></span>
            <p>
                Per grafiek heb ik drie datasets: de eerste neemt de data van de hele stage periode, de tweede van enkel
                de eerste helft, en de derde van alleen de tweede helft. Door de totale dataset uit te schakelen (klik
                op het label boven de grafiek) kan je het verschil zien tussen de eerste en tweede helft.
            </p>
        </article>
        <div class="radar-chart-wrapper">
            <ChartRadar v-if="goalData_4_1 && goalData_4_1.length > 0" class="chart"
                label="Werkzaamheden per categorie in aantal" :data="goalData_4_1[0]"
                :options="getOptions('Werkzaamheden per categorie in aantal')"></ChartRadar>
            <ChartRadar v-if="goalData_4_1 && goalData_4_1.length > 1" class="chart"
                label="Werkzaamheden per taal in aantal" :data="goalData_4_1[1]"
                :options="getOptions('Werkzaamheden per taal in aantal')"></ChartRadar>
        </div>
        <div class="radar-chart-wrapper">
            <ChartRadar v-if="goalData_4_2 && goalData_4_2.length > 0" class="chart"
                label="Werkzaamheden per categorie in minuten" :data="goalData_4_2[0]"
                :options="getOptions('Werkzaamheden per categorie in minuten')"></ChartRadar>
            <ChartRadar v-if="goalData_4_2 && goalData_4_2.length > 1" class="chart"
                label="Werkzaamheden per taal in minuten" :data="goalData_4_2[1]"
                :options="getOptions('Werkzaamheden per taal in minuten')"></ChartRadar>
        </div>
        <small class="graph-note">Gelijkmatige verdeeldheid is beter.</small>
        <span class="splitter"></span>
    </section>
</template>

<style scoped>
.chart {
    height: 400px;
}

.radar-chart-wrapper {
    width: 400px;
    display: flex;
}

.graph-note {
    width: 100%;
    text-align: center;
}
</style>
