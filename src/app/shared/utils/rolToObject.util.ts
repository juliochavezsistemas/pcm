import { RolesUser } from "../enums/roles-user.enum";
import { IGeneric } from "../interfaces/generic.interface";

export class rolToObject {
    static getList() {
        let roles: IGeneric[] = []
        roles = Object.entries(RolesUser).map(([key, value]) => ({
            id: key,
            name: value,
        }))
        return roles
    }
}