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
