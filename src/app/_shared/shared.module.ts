import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSlideToggleModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WakeupCardComponent } from "./components/wakeup-card/wakeup-card.component";
import { WakeupImportFileComponent } from "./components/wakeup-import-file/wakeup-import-file.component";
import { WakeupConfirmDialogComponent } from './components/wakeup-confirm-dialog/wakeup-confirm-dialog.component';
@NgModule({
  imports: [
    CommonModule, 
    RouterModule,
    MatCardModule, 
    MatButtonModule,
    MatTooltipModule],
  declarations: [
    WakeupCardComponent,
    WakeupImportFileComponent,
    WakeupConfirmDialogComponent],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSlideToggleModule,
    WakeupCardComponent
  ],
  entryComponents: [WakeupImportFileComponent, WakeupConfirmDialogComponent]
})
export class SharedModule { }
