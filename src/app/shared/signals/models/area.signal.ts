import { signal } from "@angular/core";
import { IArea } from "../../interfaces/models/area.interface";

export const _area = signal<IArea>({
    id: '',
    name: '',
    isActive: true
})