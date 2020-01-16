import ClubSQL from "./club.sql"
import { MClubBuilder } from "../utils/builder"
import { CreateClubInput, MUser, MClub } from "../resolvers-types"
import { MutationResolvers } from "resolvers-types"
export const _mutations: MutationResolvers = {
    club: (root, args, ctx) => {
        const creator: MUser = ctx.user
        if (creator == undefined) {
            throw new Error("You don't have permission to create event.")
        }

        const input: CreateClubInput = args.input
        const club = MClubBuilder.createFromInput(input)
        if (club.title === "") {
            throw new Error("Title is empty")
        }
        if (club.description === "") {
            throw new Error("Description is empty")
        }
        if (club.time.startAt === 0) {
            throw new Error("When does the event  start?")
        }
        if (club.time.duration === 0) {
            throw new Error("How long does the event  last?")
        }
        if (club.location.address === "") {
            throw new Error("Where does the event happen?")
        }
        if (club.location.lat === 0 || club.location.long === 0) {
            throw new Error("Invalid location address")
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
