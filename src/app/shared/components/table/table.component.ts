import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  input,
  output,
  signal,
  Type,
  viewChild
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  AngularToastifyModule,
  ToastService
} from 'angular-toastify';
import { SortEvent } from 'primeng/api';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
  AutoCompleteSelectEvent
} from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import {
  DialogService,
  DynamicDialogRef
} from 'primeng/dynamicdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import {
  PaginatorModule,
  PaginatorState
} from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  timestamp
} from 'rxjs';
import { StatusCode } from '../../enums/status-code.enum';
import { IChangePaginate } from '../../interfaces/change-paginate.interface';
import { ICloseWindows } from '../../interfaces/close-windows.interface';
import { IColumns } from '../../interfaces/columns.interface';
import { RowsPerPageOptions } from '../../signals/rows-per-page.signal';
import { Alert } from '../../utils/alert.util';
import { _authMe } from '../../signals/models/auth-me';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-table',
  imports: [
    TableModule,
    PaginatorModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    AngularToastifyModule,
    TagModule,
    TooltipModule,
    AutoCompleteModule,
    NgTemplateOutlet
  ],
  providers: [
    DynamicDialogRef,
    ToastService,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})

export class TableComponent<T = any> {
  private destroy$ = new Subject<void>();
  public value = input.required<T[]>()
  public columns = input.required<IColumns[]>()
  protected first = signal<number>(0)
  protected rows = signal<number>(10)
  public totalRecords = input<number>(0)
  protected rowsPerPageOptions = signal(RowsPerPageOptions())

  authMe = _authMe()

  public orderPaginate = output<string>()
  public changePaginate = output<IChangePaginate>()

  protected formBuilder = inject(FormBuilder)
  protected formGroup = signal<FormGroup>(this.formBuilder.group({}))

  public searchFilter = output<string>()
  private searchInputsObservable = signal<[Observable<string>] | null>(null)

  public delete = output<string>()

  public hideOption = output<string>()

  public showSelectEvents = input(false)

  // public onSelect = output<AutoCompleteCompleteEvent>()

  public onSelected = output<string>()
  public onFilteredEvent = output<string>()

  protected onDownload = output()

  public showDownAndUpButton = input<boolean>(false)

  protected onUpload = output<any>()

  protected fileUpload = viewChild<ElementRef<HTMLInputElement>>('fileUpload')

  public nameFile = input<string>()
  public nameFileDownload = input<string>()
  public showFilter = input<boolean>(true)

  downloadFormatFile() {
    const url = `${environment.frontUrl}assets/documents/${this.nameFile()}`
    console.log(url);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.nameFileDownload()}_${Date.now()}.xlsx`;
    a.click();
  }

  upload = () => {
    Alert.confirm({
      title: '¿Subir archivo?',
      text: '¿Desea agregar registros masivamente?.',
      confirmButtonText: 'Subir',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      onConfirm: () => {
        this.fileUpload()?.nativeElement.click()
      },
    })
  }

  uploadFormat = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      const formData = new FormData();
      formData.append('file', event.target.files[0])
      this.onUpload.emit(formData)
      event.target.value = ''
    }
  }

  download = () => this.onDownload.emit()

  onFilterEvent = (event: AutoCompleteCompleteEvent) => {
    this.onFilteredEvent.emit(event.query)
  }

  onSelect = (event: AutoCompleteSelectEvent | null) => {
    this.onSelected.emit(event ? event.value.id : '')
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.initForm()
    this.setupSearchDebounce()
    this.onSelect(null)
  }

  private dialogService = inject(DialogService)
  private ref: DynamicDialogRef | undefined

  //CAMBIAR ESTADO EXPEDIENTE
  public asignarAbogadosComponente = input<Type<any>>()
  public widthAsignarAbogadosComponente = input<string>('25rem')
  public iconAsignarAbogadosComponente = input<string>('bi bi-person-fill-add')
  public showButtonAsignarAbogadosComponente = input<boolean>(false)
  public iconColorButtonAsignarAbogadosComponente = input<string>('Crimson')
  public toolTipAsignarAbogadosComponente = input<string>('Asignar abogados')

  //CAMBIAR ESTADO EXPEDIENTE
  public agregarEscritoComponente = input<Type<any>>()
  public widthAgregarEscritoComponente = input<string>('25rem')
  public iconAgregarEscritoComponente = input<string>('bi bi-paperclip')
  public showButtonAgregarEscritoComponente = input<boolean>(false)
  public iconColorButtonAgregarEscritoComponente = input<string>('blue')
  public toolTipAgregarEscritoComponente = input<string>('Registrar acto arbitral')

  //CAMBIAR ESTADO EXPEDIENTE
  public cambiarEstadoExpedienteComponente = input<Type<any>>()
  public widthCambiarEstadoExpedienteComponente = input<string>('25rem')
  public iconCambiarEstadoExpedienteComponente = input<string>('bi bi-arrow-left-right')
  public showButtonCambiarEstadoExpedienteComponente = input<boolean>(false)
  public iconColorButtonCambiarEstadoExpedienteComponente = input<string>('green')
  public toolTipCambiarEstadoExpedienteComponente = input<string>('Cambiar estado')

  //ASIGN COMPONENT
  public verMovimientoComponente = input<Type<any>>()
  public widthVerMovimientoComponente = input<string>('25rem')
  public iconAddVerMovimientoComponente = input<string>('bi bi-compass')
  public showButtonVerMovimientoComponente = input<boolean>(false)
  public iconColorButtonVerMovimientoComponente = input<string>('purple')
  public toolTipVerMovimientoComponente = input<string>('Seguimiento')

  //ADD OR UPDATE COMPONENTE
  public addOrUpdateComponent = input<Type<any>>()
  public widthAddOrUpdateComponent = input<string>('25rem')
  public iconEditComponent = input<string>('pi pi-pencil')
  public showButtonAddOrUpdate = input<boolean>(true)
  public showButtonEdit = input<Boolean>(true)
  public addOrUpdate = output<StatusCode>()
  public toolTipEditName = input<string>('Editar')


  //SHOW DETAIL COMPONENT
  public showButtonDetail = input<boolean>(true)
  public iconColorButtonDetail = input<string>('Teal')
  public widthDetailComponent = input<string>('25rem')
  public detailComponent = input<Type<any>>()
  public detail = output<number>()
  public toolTipDetailName = input<string>('Detalles')

  //DELETE
  public showButtonDelete = input<boolean>(true)
  public iconDeleteComponent = input<string>('pi pi-trash')
  public iconColorButtonDelete = input<string>('red')
  public iconColorButtonEdit = input<string>('orange')
  public toolTipDeleteName = input<string>('Eliminar')

  public _toastService = inject(ToastService)

  protected agregarAbogadosExpediente = (id: string): void => {
    this.ref = this.dialogService.open(this.asignarAbogadosComponente()!, {
      closeOnEscape: false,
      header: 'Asignar abogados',
      width: this.widthAsignarAbogadosComponente(),
      data: {
        id
      },
      modal: true,
      focusOnShow: false
    })
    this.ref.onClose.subscribe((closeWindows: ICloseWindows) => {
      if (closeWindows.code === StatusCode.CONFIRM) {
        id ? this._toastService.warn('Registro actualizado correctamente') : this._toastService.success('Registrado agregado correctamente')
        this.addOrUpdate.emit(StatusCode.CONFIRM) //direct emit html
      } else {
        this._toastService.info('Operación cancelada')
      }
    })
  }

  protected agregarEscritoExpediente = (id: string): void => {
    this.ref = this.dialogService.open(this.agregarEscritoComponente()!, {
      closeOnEscape: false,
      header: 'Registrar actuación arbitral',
      width: this.widthAgregarEscritoComponente(),
      data: {
        id
      },
      modal: true,
      focusOnShow: false
    })
    this.ref.onClose.subscribe((closeWindows: ICloseWindows) => {
      if (closeWindows.code === StatusCode.CONFIRM) {
        id ? this._toastService.warn('Registro actualizado correctamente') : this._toastService.success('Registrado agregado correctamente')
        this.addOrUpdate.emit(StatusCode.CONFIRM) //direct emit html
      } else {
        this._toastService.info('Operación cancelada')
      }
    })
  }

  protected cambiarEstadoExpediente = (id: string): void => {
    this.ref = this.dialogService.open(this.cambiarEstadoExpedienteComponente()!, {
      closeOnEscape: false,
      header: 'Cambiar estado del expediente',
      width: this.widthCambiarEstadoExpedienteComponente(),
      data: {
        id
      },
      modal: true,
      focusOnShow: false
    })
    this.ref.onClose.subscribe((closeWindows: ICloseWindows) => {
      if (closeWindows.code === StatusCode.CONFIRM) {
        id ? this._toastService.warn('Registro actualizado correctamente') : this._toastService.success('Registrado agregado correctamente')
        this.addOrUpdate.emit(StatusCode.CONFIRM) //direct emit html
      } else {
        this._toastService.info('Operación cancelada')
      }
    })
  }

  protected movimientos = (id: string): void => {
    this.ref = this.dialogService.open(this.verMovimientoComponente()!, {
      closeOnEscape: false,
      header: 'Historial del expediente',
      width: this.widthVerMovimientoComponente(),
      data: {
        id
      },
      modal: true,
      focusOnShow: false
    })
    this.ref.onClose.subscribe((closeWindows: ICloseWindows) => {
      if (closeWindows.code === StatusCode.CANCEL) {
        this.detail.emit(0)
      }
    })
  }


  protected addOrUpdateRegister = (id?: string): void => {
    this.ref = this.dialogService.open(this.addOrUpdateComponent()!, {
      closeOnEscape: false,
      header: id ? 'Actualizar registro' : 'Agregar nuevo registro',
      width: this.widthAddOrUpdateComponent(),
      data: {
        id: id ?? ''
      },
      modal: true,
      focusOnShow: false
    })
    this.ref.onClose.subscribe((closeWindows: ICloseWindows) => {
      if (closeWindows.code === StatusCode.CONFIRM) {
        id ? this._toastService.warn('Registro actualizado correctamente') : this._toastService.success('Registrado agregado correctamente')
        this.addOrUpdate.emit(StatusCode.CONFIRM) //direct emit html
      } else {
        this._toastService.info('Operación cancelada')
      }
    })
  }

  protected details = (id: string): void => {
    this.ref = this.dialogService.open(this.detailComponent()!, {
      closeOnEscape: false,
      header: 'Detalle del registro',
      width: this.widthDetailComponent(),
      data: {
        id: id,
      },
      modal: true,
      focusOnShow: false
    })
    this.ref.onClose.subscribe((closeWindows: ICloseWindows) => {
      if (closeWindows.code === StatusCode.CANCEL) {
        this.detail.emit(0)
      }
    })
  }

  deleteRegister = (id: string) => {
    this.confirmDelete(id)
  }

  protected confirmDelete = (id: string): void => Alert.confirm(
    {
      title: '¿Estás seguro?',
      text: '¡Esta acción no se puede deshacer!',
      icon: 'warning',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      onConfirm: () => {
        this.delete.emit(id)
        this._toastService.error('Registro eliminado correctamente') //!HERE NO TOAST ONLY IN EACH COMPONENT
      }
    }
  )

  private setupSearchDebounce = (): void => {
    combineLatest(this.searchInputs()!)
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value: [string]) => {
        this.searchFilter.emit(value[0])
      })
    this.formGroup().get('searchValue')?.updateValueAndValidity()
  }

  private searchInputs = (): [Observable<string>] | null => {
    const searchValue = this.formGroup().get('searchValue')?.valueChanges as Observable<string>
    this.searchInputsObservable.set([searchValue])
    return this.searchInputsObservable()
  }

  protected cleanInputs = (): void => this.formGroup().patchValue({
    searchValue: '',
  })

  private initForm = (): void => this.formGroup.set(this.formBuilder.group({
    searchValue: ['', [Validators.maxLength(15)]]
  }))

  protected onSortChange = ({ order, field }: SortEvent): void => {
    const sortField = order && field ? (order > 0 ? field : `-${field}`) : ''
    this.orderPaginate.emit(sortField)
  }

  protected onPageChange = ({ first = 0, rows = 0 }: PaginatorState): void => {
    this.first.set(first)
    this.rows.set(rows)
    const page = rows > 0 ? first / rows + 1 : 1
    this.changePaginate.emit({ page, rows })
  }
}