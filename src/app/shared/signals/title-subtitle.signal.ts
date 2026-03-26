import { signal } from "@angular/core";
import { ITitleSubtitle } from "../interfaces/title-subtitle.interface";

const ts: ITitleSubtitle = { title: '', subTitle: '' }
export const titleSubTitle = signal<ITitleSubtitle>(ts)