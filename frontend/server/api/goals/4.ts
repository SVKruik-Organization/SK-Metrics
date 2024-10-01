import { Pool } from "mariadb";
import { LearningGoal4Result, LearningGoal4RawResult, LearningGoal4RawResultType } from "~/assets/customTypes";
import { database } from "~/server/utils/database";

export default defineEventHandler(async (): Promise<LearningGoal4Result> => {
    const databaseConnection: Pool = database();
    const data: Array<LearningGoal4RawResult> = await databaseConnection.query("SELECT time_taken, category, language, date_creation FROM learning_goal_2;");

    // Type, Count
    const categories: LearningGoal4RawResultType = {
        total: new Map<string, number>(),
        firstHalf: new Map<string, number>(),
        secondHalf: new Map<string, number>(),
    };
    const languages: LearningGoal4RawResultType = {
        total: new Map<string, number>(),
        firstHalf: new Map<string, number>(),
        secondHalf: new Map<string, number>(),
    };

    const midpointDate = new Date("2024-09-15T00:00:00.000Z");
    data.forEach((item) => {
        const itemDate = new Date(item.date_creation);
        const isFirstHalf = itemDate <= midpointDate;

        // Process Categories
        item.category.split(",").forEach((category: string) => {
            category = category.trim();
            categories.total.set(category, (categories.total.get(category) || 0) + 1);
            if (isFirstHalf) {
                categories.firstHalf.set(category, (categories.firstHalf.get(category) || 0) + 1);
            } else categories.secondHalf.set(category, (categories.secondHalf.get(category) || 0) + 1);
        });

        // Process Languages
        item.language.split(",").forEach((language: string) => {
            language = language.trim();
            languages.total.set(language, (languages.total.get(language) || 0) + 1);

            if (isFirstHalf) {
                languages.firstHalf.set(language, (languages.firstHalf.get(language) || 0) + 1);
            } else languages.secondHalf.set(language, (languages.secondHalf.get(language) || 0) + 1);
        });
    });

    return {
        "categoryNames": Array.from(categories.total.keys()),
        "categoryCounts": {
            total: Array.from(categories.total.values()),
            firstHalf: Array.from(categories.firstHalf.values()),
            secondHalf: Array.from(categories.secondHalf.values()),
        },
        "languageNames": Array.from(languages.total.keys()),
        "languageCounts": {
            total: Array.from(languages.total.values()),
            firstHalf: Array.from(languages.firstHalf.values()),
            secondHalf: Array.from(languages.secondHalf.values()),
        }
    };
});