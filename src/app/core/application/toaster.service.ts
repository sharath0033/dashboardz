import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TosterService {
  private defaultOptions = {
    closeButton: true,
    easeTime: 200,
    timeOut: 5000,
    extendedTimeOut: 1000,
    enableHtml: true,
    tapToDismiss: false
  }
  constructor(private toastr: ToastrService) { }

  tostError(message: string, title: string = 'Error', options?: any) {
    this.toastr.error(message, title, { ...this.defaultOptions, ...options });
  }
  tostInfo(message: string, title: string = 'Info', options?: any) {
    this.toastr.info(message, title, { ...this.defaultOptions, ...options });
  }
  tostSuccess(message: string, title: string = 'Success', options?: any) {
    this.toastr.success(message, title, { ...this.defaultOptions, ...options });
  }
  tostWarning(message: string, title: string = 'Warning', options?: any) {
    this.toastr.warning(message, title, { ...this.defaultOptions, ...options });
  }
}
