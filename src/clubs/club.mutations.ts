import MClub from "./club"
import ClubSQL from "./club.sql"
import MUser from "../users/user"
import CreateClubInput from "../models/createClubInput"

export const mutations = {
    club(_: any, raw: any, context: any) {
        const creator: MUser = context.user 
        if (creator == undefined) {
            return Error("You don't have permission to create event.")
        }
        const input = new CreateClubInput(raw.input, creator)
        const club = MClub.createFromInput(input)
        if (club.title === "") {
            return Error("Title is empty")
        }
        if (club.description === "") {
            return Error("Description is empty")
        }
        if (club.time.startAt === 0) {
            return Error("When does the event  start?")
        }
        if (club.time.duration === 0) {
            return Error("How long does the event  last?")
        }
        if (club.location.address === "") {
            return Error("Where does the event happen?")
        }
        if (club.location.lat === 0 || club.location.long === 0) {
            return Error("Invalid location address")
        }
        if (club.slotCount === undefined) {
            club.slotCount = 0
        }
        
        let host: MUser[] = [creator]
        if (club.host !== undefined) {
            club.host.push(creator)
            host = club.host
        }
        club.host = host
        let sql = new ClubSQL()
        const newClub = sql.create(club)
        return newClub
    }
}
