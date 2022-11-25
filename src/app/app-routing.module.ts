import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
const routes: Routes = [
  { path: '', component: ConfirmDialogComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
