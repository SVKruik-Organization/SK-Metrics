import { defineStore } from "pinia";
import { useLocalStorage, useSessionStorage } from "@vueuse/core";
import type { ChartData } from "~/assets/customTypes";

export const useDataStorage = defineStore("useDataStorage", {
    state: () => ({
        filters: useLocalStorage("filters", [] as Array<string>),
        goalData_2_1: useSessionStorage("goalData_2_1", null as unknown as ChartData),
        goalData_2_2: useSessionStorage("goalData_2_2", null as unknown as ChartData),
        goalData_2_3: useSessionStorage("goalData_2_3", null as unknown as ChartData),
        goalData_4_1: useSessionStorage("goalData_4_1", [] as Array<ChartData>),
        goalData_4_2: useSessionStorage("goalData_4_2", [] as Array<ChartData>),
    }),
    hydrate(state) {
        state.filters = useLocalStorage("filters", []);
        state.goalData_2_1 = useSessionStorage("goalData_2_1", null);
        state.goalData_2_2 = useSessionStorage("goalData_2_2", null);
        state.goalData_2_3 = useSessionStorage("goalData_2_3", null);
        state.goalData_4_1 = useSessionStorage("goalData_4_1", []);
        state.goalData_4_2 = useSessionStorage("goalData_4_2", []);
    }
});