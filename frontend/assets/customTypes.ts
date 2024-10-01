// Learning Goal Item
export type LearningGoalEntry = {
    "id": number,
    "weekNumber": number,
    "ticketNumber": number,
    "timePlanned": number,
    "timeTaken": number,
    "helpNeeded": boolean,
    "qaIterations": number
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