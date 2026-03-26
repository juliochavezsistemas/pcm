import { signal } from "@angular/core";

export class BaseLoadingComponent {
    public message = signal<string>('')
    public isLoading = signal<boolean>(false)
}