import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DownloadService {
  downloadFile = (
    data: ArrayBuffer,
    filename: string = 'documento',
    mimeType: string = 'application/pdf'
  ) => {
    const blob = new Blob([data], { type: mimeType })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }
}