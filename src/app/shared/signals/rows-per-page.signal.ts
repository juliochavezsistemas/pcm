import { signal } from "@angular/core";

const rows: number[] = [5, 10, 20, 50]
export const RowsPerPageOptions = signal<number[]>(rows)