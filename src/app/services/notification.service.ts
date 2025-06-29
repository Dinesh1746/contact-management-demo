import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar,
    private toaster: ToastrService
  ) { }

  //SnackBar
  showSnackBar(message: string, action: string = 'Close', duration = 3000){
    this.snackBar.open(message, action,{
      duration,
      panelClass: ['custom-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'left'
    });
  }


  // Toaster
  showSuccess(message: string, title: string = 'Success'){
    this.toaster.success(message, title);
  }

  showError(message: string, title: string = 'Error'){
    this.toaster.error(message, title);
  }
  
  showInfo(message: string, title: string = 'Info'){
    this.toaster.info(message, title);
  }

  showWarning(message: string, title: string = 'Warning'){
    this.toaster.warning(message, title);
  }
}
