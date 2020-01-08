export class MTime {
    startAt: number
    endAt: number
    duration: number
    description: string
    constructor(
        startAt: number,
        endAt: number,
        duration: number,
        description: string
    ) {
        this.startAt = startAt
        this.endAt = endAt
        this.duration = duration
        this.description = description
    }
}
