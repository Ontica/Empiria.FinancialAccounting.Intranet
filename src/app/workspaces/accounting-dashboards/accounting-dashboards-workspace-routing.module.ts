/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ROUTES_LIBRARY } from '@app/main-layout';

import { BalanceReconciliationMainPageComponent } from './balance-reconciliation-main-page/balance-reconciliation-main-page.component';

import { FinancialReportsMainPageComponent } from './financial-reports-main-page/financial-reports-main-page.component';

import { OperationalReportsMainPageComponent } from './operational-reports-main-page/operational-reports-main-page.component';

import { TrialBalanceMainPageComponent } from './trial-balance-main-page/trial-balance-main-page.component';


const routes: Routes = [
  {
    data: { permission: ROUTES_LIBRARY.tableros_saldos_y_balanzas.permission },
    path: ROUTES_LIBRARY.tableros_saldos_y_balanzas.path,
    component: TrialBalanceMainPageComponent,
  },
  {
    data: { permission: ROUTES_LIBRARY.tableros_reportes_regulatorios.permission },
    path: ROUTES_LIBRARY.tableros_reportes_regulatorios.path,
    component: FinancialReportsMainPageComponent,
  },
  {
    data: { permission: ROUTES_LIBRARY.tableros_conciliaciones.permission },
    path: ROUTES_LIBRARY.tableros_conciliaciones.path,
    component: BalanceReconciliationMainPageComponent,
  },
  {
    data: { permission: ROUTES_LIBRARY.tableros_reportes_operativos.permission },
    path: ROUTES_LIBRARY.tableros_reportes_operativos.path,
    component: OperationalReportsMainPageComponent,
  },
  {
    data: { permission: ROUTES_LIBRARY.tableros_reportes_fiscales.permission },
    path: ROUTES_LIBRARY.tableros_reportes_fiscales.path,
    component: OperationalReportsMainPageComponent,
  },
  {
    path: '',
    redirectTo: ROUTES_LIBRARY.tableros_saldos_y_balanzas.path,
    pathMatch: 'full',
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingDashboardsWorkspaceRoutingModule { }
