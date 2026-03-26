import { signal } from "@angular/core";
import { IIncidenceType } from "../../interfaces/models/incidence-type.interface";
import { ITechSupport } from "../../interfaces/models/tech-support.interface";

export const _techSupport = signal<ITechSupport>({
    id: '',
    firstName: '',
    lastName: '',
    secondLastName: '',
    profilePicture: '',
    user: {
        fullName: '',
        id: '',
    },
    isActive: true
})