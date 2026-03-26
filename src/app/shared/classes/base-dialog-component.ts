import { inject, signal } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StatusCode } from "../enums/status-code.enum";
import { BaseLoadingComponent } from "./base-loading-component";

export class BaseDialogComponent<T = any> extends BaseLoadingComponent {
    constructor() {
        super()
    }

    public ref = inject(DynamicDialogRef)
    public config = inject(DynamicDialogConfig)
    public id = signal<string>(this.config.data.id)

    protected close = (code?: StatusCode, data?: T): void => {
        this.ref.close({ code: code ?? StatusCode.CANCEL, data })
    }
}
