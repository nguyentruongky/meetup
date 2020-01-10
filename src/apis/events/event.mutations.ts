import MEvent from "./event"
import EventSQL from "./event.sql"
import MUser from "../../apis/users/user"

export const mutations = {
    createEvent: async (_: any, raw: any) => {
        const event = new MEvent(raw)
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
        
        event.host = new MUser({ name: "Ky"})
        
        let eventSQL = new EventSQL()
        const newEvent = eventSQL.create(event)
        return newEvent
    }
}
