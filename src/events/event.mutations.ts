import MClub from "./event"
import EventSQL from "./event.sql"
import MUser from "../users/user"

export const mutations = {
    createEvent(_: any, raw: any, context: any) {
        const creator: MUser = context.user 
        if (creator == undefined) {
            return Error("You don't have permission to create event.")
        }
        const event = new MClub(raw)
        if (event.title === "") {
            return Error("Title is empty")
        }
        if (event.description === "") {
            return Error("Description is empty")
        }
        if (event.time.startAt === 0) {
            return Error("When does the event  start?")
        }
        if (event.time.duration === 0) {
            return Error("How long does the event  last?")
        }
        if (event.location.address === "") {
            return Error("Where does the event happen?")
        }
        if (event.location.lat === 0 || event.location.long === 0) {
            return Error("Invalid location address")
        }
        if (event.slotCount === undefined) {
            event.slotCount = 0
        }
        
        let host: MUser[] = [creator]
        if (event.host !== undefined) {
            event.host.push(creator)
            host = event.host
        }
        event.host = host
        let eventSQL = new EventSQL()
        const newEvent = eventSQL.create(event)
        return newEvent
    }
}
