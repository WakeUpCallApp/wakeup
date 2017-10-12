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
import { AppCardComponent } from './components/app-card/app-card.component';
import { AppImportFileComponent } from './components/app-import-file/app-import-file.component';
import { AppConfirmDialogComponent } from './components/app-confirm-dialog/app-confirm-dialog.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule],
  declarations: [
    AppCardComponent,
    AppImportFileComponent,
    AppConfirmDialogComponent],
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
    AppCardComponent
  ],
  entryComponents: [AppImportFileComponent, AppConfirmDialogComponent]
})
export class SharedModule { }
