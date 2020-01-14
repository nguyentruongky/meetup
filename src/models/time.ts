export default class MTime {
    startAt: number
    endAt: number
    duration: number
    timeNotes: string
    constructor(raw: any) {
        this.startAt = raw.startAt
        this.endAt = raw.endAt
        this.duration = raw.endAt - raw.startAt
        this.timeNotes = raw.timeNotes
    }
}
