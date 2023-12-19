import { Component, Inject } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {

  constructor(
    public diagRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero,
  ) { }

  onConfirm(): void {
    this.diagRef.close(true);
  }

  onNoClick(): void {
    this.diagRef.close(false);
  }
}
