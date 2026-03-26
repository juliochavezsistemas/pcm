import { inject, signal } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BaseDialogComponent } from "./base-dialog-component";

export class BaseAddUpdateComponent extends BaseDialogComponent {
    constructor() {
        super()
    }

    public panelStyle = signal({
        'max-height': '250px',
        'max-width': '100%',
        'overflow-y': 'auto'
    })

    public formBuilder = inject(FormBuilder)
    public formGroup = signal<FormGroup>(this.formBuilder.group({}))

    public action = signal<string>('')
    public wrongMessage = signal<string>('')
}