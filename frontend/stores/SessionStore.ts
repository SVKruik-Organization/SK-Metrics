import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useSessionStore = defineStore("sessionStore", {
    state: () => ({
        filters: useLocalStorage("filters", [] as Array<string>)
    }),
    hydrate(state) {
        state.filters = useLocalStorage("filters", []);
    },
    actions: {
    }
});