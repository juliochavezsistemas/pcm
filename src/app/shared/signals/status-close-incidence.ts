import { signal } from "@angular/core";

export var _statusCloseIncidence = signal<any[]>([
    { name: 'No resuelto', code: 'No resuelto' },
    { name: 'Finalizado', code: 'Finalizado' }
])