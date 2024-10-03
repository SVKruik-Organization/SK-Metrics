import type { ChartData } from "~/assets/customTypes";

export const useFetchGoal4 = async (force: boolean) => {
    const dataStorage = useDataStorage();

    const data = {
        "goalData_4_1": dataStorage.goalData_4_1 || [] as Array<ChartData>,
        "goalData_4_2": dataStorage.goalData_4_2 || [] as Array<ChartData>
    }

    if (force || data.goalData_4_1.length === 0 || data.goalData_4_2.length === 0) {
        const rawGoalData_4 = await $fetch("/api/graph/4");
        if (rawGoalData_4) {
            const parsedData4_1: Array<ChartData> = graph_4_1_Parser(rawGoalData_4);
            const parsedData4_2: Array<ChartData> = graph_4_2_Parser(rawGoalData_4);

            data.goalData_4_1 = parsedData4_1;
            dataStorage.goalData_4_1 = parsedData4_1;

            data.goalData_4_2 = parsedData4_2;
            dataStorage.goalData_4_2 = parsedData4_2;
        }
    }

    return data;
}