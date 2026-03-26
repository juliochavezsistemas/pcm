import { signal } from "@angular/core";
import { IIncidenceType } from "../../interfaces/models/incidence-type.interface";

export const _incidenceType = signal<IIncidenceType>({
    id: '',
    name: '',
    time: '',
    isActive: true
})