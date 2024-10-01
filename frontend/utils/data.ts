import type { ChartData, LearningGoal2Result, LearningGoal4Result } from "~/assets/customTypes";

/**
 * Format incoming data for Learning Goal 2.1 into Chart.JS format.
 * @param input The data to parse.
 * @returns The parsed data in Chart.JS format.
 */
export function data2_1Parser(input: Array<LearningGoal2Result>): ChartData {
    return {
        labels: input.map((entry) => `Week ${entry.week}`),
        datasets: [
            {
                label: "Percentage",
                data: input.map((entry) => entry.avg_time_taken_percentage),
                backgroundColor: "#FFFFFF",
                borderColor: "#6EC207"
            },
        ]
    }
}

/**
 * Format incoming data for Learning Goal 2.2 into Chart.JS format.
 * @param input The data to parse.
 * @returns The parsed data in Chart.JS format.
 */
export function data2_2Parser(input: Array<LearningGoal2Result>): ChartData {
    return {
        labels: input.map((entry) => `Week ${entry.week}`),
        datasets: [
            {
                label: "QA Iteraties",
                data: input.map((entry) => entry.avg_qa_iterations),
                backgroundColor: "#FFFFFF",
                borderColor: "#EF5A6F"
            }
        ]
    }
}

/**
 * Format incoming data for Learning Goal 4.1 into Chart.JS format.
 * @param input The data to parse.
 * @returns The parsed data in Chart.JS format.
 */
export function data_4_1Parser(input: LearningGoal4Result): Array<ChartData> {
    return [
        {
            labels: input.categoryNames,
            datasets: [
                {
                    label: "Volledig",
                    data: input.categoryCounts.total,
                    backgroundColor: "#D2FF7230",
                    borderColor: "#D2FF72",
                    fill: true
                },
                {
                    label: "Eerste Helft",
                    data: input.categoryCounts.firstHalf,
                    backgroundColor: "#6EC20730",
                    borderColor: "#6EC207",
                    fill: true
                },
                {
                    label: "Tweede Helft",
                    data: input.categoryCounts.secondHalf,
                    backgroundColor: "#11755430",
                    borderColor: "#117554",
                    fill: true
                }
            ]
        },
        {
            labels: input.languageNames,
            datasets: [
                {
                    label: "Volledig",
                    data: input.languageCounts.total,
                    backgroundColor: "#F5004F30",
                    borderColor: "#F5004F",
                    fill: true
                },
                {
                    label: "Eerste Helft",
                    data: input.languageCounts.firstHalf,
                    backgroundColor: "#EF5A6F30",
                    borderColor: "#EF5A6F",
                    fill: true
                },
                {
                    label: "Tweede Helft",
                    data: input.languageCounts.secondHalf,
                    backgroundColor: "#80000030",
                    borderColor: "#800000",
                    fill: true
                }
            ]
        }
    ]
}

/**
 * Format incoming data for Learning Goal 4.2 into Chart.JS format.
 * @param input The data to parse.
 * @returns The parsed data in Chart.JS format.
 */
export function data_4_2Parser(input: LearningGoal4Result): Array<ChartData> {
    return [
        {
            labels: input.categoryNames,
            datasets: [
                {
                    label: "Volledig",
                    data: input.categoryCounts.total,
                    backgroundColor: "#3ABEF930",
                    borderColor: "#3ABEF9",
                    fill: true
                },
                {
                    label: "Eerste Helft",
                    data: input.categoryCounts.firstHalf,
                    backgroundColor: "#3572EF30",
                    borderColor: "#3572EF",
                    fill: true
                },
                {
                    label: "Tweede Helft",
                    data: input.categoryCounts.secondHalf,
                    backgroundColor: "#01204E30",
                    borderColor: "#01204E",
                    fill: true
                }
            ]
        },
        {
            labels: input.languageNames,
            datasets: [
                {
                    label: "Volledig",
                    data: input.languageCounts.total,
                    backgroundColor: "#FFDE4D30",
                    borderColor: "#FFDE4D",
                    fill: true
                },
                {
                    label: "Eerste Helft",
                    data: input.languageCounts.firstHalf,
                    backgroundColor: "#FF822530",
                    borderColor: "#FF8225",
                    fill: true
                },
                {
                    label: "Tweede Helft",
                    data: input.languageCounts.secondHalf,
                    backgroundColor: "#EB5B0030",
                    borderColor: "#EB5B00",
                    fill: true
                }
            ]
        }
    ]
}
