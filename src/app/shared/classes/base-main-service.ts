import { HttpClient, HttpParams } from "@angular/common/http"
import { inject, signal } from "@angular/core"
import { environment } from "../../../environments/environment"
import { IPaginationFilterParams } from "../interfaces/pagination-filter-params"
import { LocalStorageService } from "../services/local-storage.service"

export abstract class BaseMainService {
    protected baseUrl = signal<string>(environment.apiUrl)
    protected http = inject(HttpClient)
    protected controller = signal<string>('')
    storage = inject(LocalStorageService)

    protected httpParams = ({ search: filter = '', order = 'id', sort = 'DESC', page = 1, limit: take = 5 }: IPaginationFilterParams): HttpParams => {
        let params = new HttpParams()
        if (order) params = params.set('order', order)
        if (sort) params = params.set('sort', sort)
        if (take !== undefined) params = params.set('limit', take.toString())
        if (page !== undefined) params = params.set('page', page.toString())
        if (filter) params = params.set('search', filter)
        return params
    }
}