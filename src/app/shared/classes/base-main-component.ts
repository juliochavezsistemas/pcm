import { inject, signal, Type } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { IChangePaginate } from "../interfaces/change-paginate.interface"
import { IColumns } from "../interfaces/columns.interface"
import { ITitleSubtitle } from "../interfaces/title-subtitle.interface"
import { titleSubTitle } from "../signals/title-subtitle.signal"
import { BaseLoadingComponent } from "./base-loading-component"

export class BaseMainComponent extends BaseLoadingComponent {
    constructor() {
        super()
        this.route.data.subscribe((data) => {
            const ts: ITitleSubtitle = {
                title: data['title'] ?? 'Title for default',
                subTitle: data['subTitle'] ?? ''
            }
            titleSubTitle.set(ts)
        })
    }

    protected route = inject(ActivatedRoute)
    protected columns = signal<IColumns[]>([])
    protected order = signal<string>('DESC')
    protected sort = signal<string>('id')
    protected rows = signal<number>(10)
    protected page = signal<number>(1)
    protected totalRecords = signal<number>(0)
    protected searchType = signal<string>('')
    protected searchValue = signal<string>('')
    protected searchValueExact = signal<boolean>(false)
    protected addOrUpdateComponent!: Type<any>
    protected detailComponent!: Type<any>

    protected verMovimientoComponente!: Type<any>
    protected cambiarEstadoExpedienteComponente!: Type<any>
    protected agregarEscritoExpedienteComponente!: Type<any>
    protected asignarAbogadosExpedienteComponente!: Type<any>

    onChangePaginate = (changePaginate: IChangePaginate): void => {
        this.rows.set(changePaginate.rows)
        this.page.set(changePaginate.page)
    }

    onOrderPaginate = (field: string): void => {
        this.order.set(field)
    }

    onSearchFilter = (text: string) => {
        this.searchValue.set(text)
    }
}