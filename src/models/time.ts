export default class MTime {
    startAt: number
    endAt: number
    duration: number
    timeNotes: string
    constructor(raw: any) {
        this.startAt = raw.startAt
        this.endAt = raw.endAt
        this.duration = raw.duration
        this.timeNotes = raw.timeNotes
    }
}
