import type { ChartDataset } from "chart.js";
import { TableHeaderType, type ChartData, type LearningGoal2Result, type LearningGoal4Result, type TableHeaderLearningGoal_2_Item, type TableDataLearningGoal_2, type TableHeaderGenericItem, type TableDataLearningGoal_4_Item } from "~/assets/customTypes";

/**
 * Format incoming data for Learning Goal 2.1 into Chart.JS format.
 * @param input The data to parse.
 * @returns The parsed data in Chart.JS format.
 */
export function graph_2_1_Parser(input: Array<LearningGoal2Result>): ChartData {
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
export function graph_2_2_Parser(input: Array<LearningGoal2Result>): ChartData {
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
 * Format incoming data for Learning Goal 2.3 into Chart.JS format.
 * @param input The data to parse.
 * @returns The parsed data in Chart.JS format.
 */
export function graph_2_3_Parser(input: Array<LearningGoal2Result>): ChartData {
    return {
        labels: input.map((entry) => `Week ${entry.week}`),
        datasets: [
            {
                label: "Aantal vragen",
                data: input.map((entry) => entry.avg_help_needed),
                backgroundColor: "#FFFFFF",
                borderColor: "#3572EF"
            }
        ]
    }
}

/**
 * Format incoming data for Learning Goal 4.1 into Chart.JS format.
 * @param input The data to parse.
 * @returns The parsed data in Chart.JS format.
 */
export function graph_4_1_Parser(input: LearningGoal4Result): Array<ChartData> {
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
export function graph_4_2_Parser(input: LearningGoal4Result): Array<ChartData> {
    return [
        {
            labels: input.categoryNames,
            datasets: [
                {
                    label: "Volledig",
                    data: input.categoryHours.total,
                    backgroundColor: "#3ABEF930",
                    borderColor: "#3ABEF9",
                    fill: true
                },
                {
                    label: "Eerste Helft",
                    data: input.categoryHours.firstHalf,
                    backgroundColor: "#3572EF30",
                    borderColor: "#3572EF",
                    fill: true
                },
                {
                    label: "Tweede Helft",
                    data: input.categoryHours.secondHalf,
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
                    data: input.languageHours.total,
                    backgroundColor: "#FFDE4D30",
                    borderColor: "#FFDE4D",
                    fill: true
                },
                {
                    label: "Eerste Helft",
                    data: input.languageHours.firstHalf,
                    backgroundColor: "#FF822530",
                    borderColor: "#FF8225",
                    fill: true
                },
                {
                    label: "Tweede Helft",
                    data: input.languageHours.secondHalf,
                    backgroundColor: "#EB5B0030",
                    borderColor: "#EB5B00",
                    fill: true
                }
            ]
        }
    ]
}

/**
 * Parse a single dataset into a table format.
 * @param input The chart data to parse.
 * @param type The type of the table header.
 * @returns The parsed data in table single format.
 */
export function table_2_Parser(input: ChartData, type: TableHeaderType): TableDataLearningGoal_2 {
    const dataset: Array<number> = input.datasets[0].data;

    const tableHeaders: Array<TableHeaderLearningGoal_2_Item> = [{
        "label": "Week",
        "type": TableHeaderType.NUMBER,
        "key": 'week'
    }, {
        "label": "Waarde",
        "type": type,
        "key": 'value'
    }, {
        "label": "Verschil",
        "type": TableHeaderType.NUMBER,
        "key": 'delta'
    }];

    return {
        "tableHeaders": tableHeaders,
        "points": dataset.map((entry: number, index: number) => {
            return {
                "week": +input.labels[index].split(" ")[1],
                "value": entry,
                "delta": index === 0 ? 0 : +(entry - dataset[index - 1]).toFixed(2),
            }
        })
    }
}

/**
 * Parse a single dataset into a table format.
 * @param input The chart data to parse.
 * @param type The type of the table header.
 * @returns The parsed data in table multi format.
 */
export function table_4_Parser(input: Array<ChartData>, type: TableHeaderType): Array<TableDataLearningGoal_4_Item> {
    // In Count
    const countDataset_Category: Array<ChartDataset> = input[0].datasets;
    const countLabels_Category: Array<string> = input[0].labels;
    const countDataset_Language: Array<ChartDataset> = input[1].datasets;
    const countLabels_Language: Array<string> = input[1].labels;

    // In Hours
    const hoursLabels_Category: Array<ChartDataset> = input[2].datasets;
    const hoursDataset_Category: Array<string> = input[2].labels;
    const hoursDataset_Language: Array<ChartDataset> = input[3].datasets;
    const hoursLabels_Language: Array<string> = input[3].labels;

    return [{
        "label": "Werkzaamheden per categorie in aantal",
        "tableHeaders": headerMapper(countLabels_Category, type),
        "points": pointMapper(countDataset_Category)
    },
    {
        "label": "Werkzaamheden per categorie in uren",
        "tableHeaders": headerMapper(hoursDataset_Category, type),
        "points": pointMapper(hoursLabels_Category)
    },
    {
        "label": "Werkzaamheden per taal in aantal",
        "tableHeaders": headerMapper(countLabels_Language, type),
        "points": pointMapper(countDataset_Language)
    },
    {
        "label": "Werkzaamheden per taal in uren",
        "tableHeaders": headerMapper(hoursLabels_Language, type),
        "points": pointMapper(hoursDataset_Language)
    }]
}

/**
 * Extract the header labels from the chart data.
 * @param input The data to parse.
 * @param type The type of the header.
 * @returns The header labels in the correct format.
 */
function headerMapper(input: Array<string>, type: TableHeaderType): Array<TableHeaderGenericItem> {
    const labels: Array<TableHeaderGenericItem> = input.map((label: string) => {
        return {
            "label": label,
            "type": type
        }
    });
    labels.unshift({
        "label": "Stage Periode",
        "type": TableHeaderType.STRING
    });
    return labels;
}

/**
 * Extract the dataset data points from the chart data.
 * @param input The data to parse.
 * @returns The data points in the correct format.
 */
function pointMapper(input: Array<ChartDataset>): Array<any> {
    return input.map((dataset: ChartDataset) => [dataset.label, ...dataset.data])
} 