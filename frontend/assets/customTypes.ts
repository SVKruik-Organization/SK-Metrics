// Learning Goal Item
export type LearningGoalEntry = {
    "weekNumber": number,
    "ticketNumber": number,
    "timePlanned": number,
    "timeTaken": number,
    "timeTakenPercentage": number,
    "helpNeeded": number,
    "qaIterations": number,
    "dateCreation": string,
    "dateUpdated": string
}

// Raw Learning Goal Item
export type LearningGoalEntryRaw = {
    "id": number,
    "week": number,
    "ticket": number,
    "time_planned": number,
    "time_taken": number,
    "time_taken_percentage": number,
    "help_needed": number,
    "qa_iterations": number,
    "category": string,
    "language": string,
    "date_creation": string,
    "date_updated": string
}

// Date Formatter
export type DateFormat = {
    "date": string,
    "time": string,
    "today": Date,
    "fullDate": string
}

// Uplink Network Payload
export type UplinkMessage = {
    "sender": string,
    "recipient": string,
    "triggerSource": string,
    "reason": string,
    "task": string,
    "content": string,
    "timestamp": Date
}

// Chart Data
export type ChartData = {
    "labels": Array<string>,
    "datasets": Array<{
        "label": string,
        "data": Array<number>,
        "backgroundColor"?: Array<string> | string,
        "borderColor"?: string,
        "fill"?: boolean
    }>
}

// Learning Goal 2 Result Item
export type LearningGoal2Result = {
    "week": number,
    "avg_time_taken_percentage": number,
    "avg_qa_iterations": number,
    "avg_help_needed": number
}

// Learning Goal 4 Unprocessed Incoming Result Item
export type LearningGoal4RawResult = {
    "category": string,
    "language": string,
    "date_creation": string,
    "time_taken_hours": number
}

export type LearningGoal4RawResultType = {
    "total": Map<string, number>,
    "firstHalf": Map<string, number>,
    "secondHalf": Map<string, number>
}

export type LearningGoal4ResultType = {
    "total": Array<number>,
    "firstHalf": Array<number>,
    "secondHalf": Array<number>
}

// Learning Goal 4 Result Item
export type LearningGoal4Result = {
    "categoryNames": Array<string>
    "categoryCounts": LearningGoal4ResultType,
    "categoryHours": LearningGoal4ResultType,
    "languageNames": Array<string>,
    "languageCounts": LearningGoal4ResultType,
    "languageHours": LearningGoal4ResultType
}

export enum TableHeaderType {
    NUMBER = "number",
    PERCENTAGE = "percentage",
    DATE = "date",
    STRING = "string"
}

// Generic Table Header Item
interface TableHeaderItem {
    "id"?: number,
    "label": string,
    "type": TableHeaderType
}

// Table All Data
export interface TableHeaderAllItem extends TableHeaderItem {
    "value": keyof LearningGoalEntry
}

export interface TableHeaderGenericItem extends TableHeaderItem {
    "key": keyof TableSingleData["points"][0]
}

export type TableAllData = {
    "points": Array<LearningGoalEntry>,
    "tableHeaders": Array<TableHeaderAllItem>
}

export type TableSingleData = {
    "points": Array<{
        "week": number,
        "value": number,
        "delta": number
    }>,
    "tableHeaders": Array<TableHeaderGenericItem>
}

// Learning Goal Data Props - Single
export type LearningGoalSingleDatasets = {
    "goalData_2_1": any,
    "goalData_2_2": any,
    "goalData_2_3": any
}

// Learning Goal Data Props - Array
export type LearningGoalArrayDatasets = {
    "goalData_4_1": any,
    "goalData_4_2": any
}