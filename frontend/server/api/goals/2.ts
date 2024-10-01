import { Pool } from "mariadb";
import { LearningGoal2Result } from "~/assets/customTypes";
import { database } from "~/server/utils/database";

export default defineEventHandler(async (): Promise<Array<LearningGoal2Result>> => {
    const databaseConnection: Pool = database();
    const data: Array<LearningGoal2Result> = await databaseConnection.query("SELECT week, ROUND(AVG(time_taken / time_planned * 100)) AS avg_time_taken_percentage, ROUND(IFNULL(AVG(qa_iterations), 0), 1) as avg_qa_iterations FROM learning_goal_2 GROUP BY week;");
    return data;
});