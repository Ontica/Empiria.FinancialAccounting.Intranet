/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemManagementWorkspaceComponent } from './system-management-workspace.component';


const routes: Routes = [
  { path: 'generacion-de-saldos', component: SystemManagementWorkspaceComponent },
  { path: '', redirectTo: 'generacion-de-saldos', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemManagementWorkspaceRoutingModule { }
