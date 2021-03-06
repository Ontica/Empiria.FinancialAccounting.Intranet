/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ROUTES_LIBRARY } from '@app/main-layout';

import {
  AccountingCataloguesAndRulesWorkspaceComponent
} from './accounting-catalogues-and-rules-workspace.component';

import {
  AccountsChartMainPageComponent
} from './accounts-chart-main-page/accounts-chart-main-page.component';

import {
  FinancialConceptsMainPageComponent
} from './financial-concepts-main-page/financial-concepts-main-page.component';

import {
  ReportDesignerMainPageComponent
} from './reports-designer-main-page/reports-designer-main-page.component';

import {
  SubledgerAccountsMainPageComponent
} from './subledger-accounts-main-page/subledger-accounts-main-page.component';


const routes: Routes = [
  {
    data: { permission: ROUTES_LIBRARY.reglas_y_catalogos_catalogos_de_cuentas.permission },
    path: ROUTES_LIBRARY.reglas_y_catalogos_catalogos_de_cuentas.path,
    component: AccountsChartMainPageComponent,
  },
  {
    data: { permission: ROUTES_LIBRARY.reglas_y_catalogos_auxiliares.permission },
    path: ROUTES_LIBRARY.reglas_y_catalogos_auxiliares.path,
    component: SubledgerAccountsMainPageComponent,
  },
  {
    data: { permission: ROUTES_LIBRARY.reglas_y_catalogos_datos_operacion.permission },
    path: ROUTES_LIBRARY.reglas_y_catalogos_datos_operacion.path,
    component: AccountingCataloguesAndRulesWorkspaceComponent,
  },
  {
    data: { permission: ROUTES_LIBRARY.reglas_y_catalogos_agrupaciones.permission },
    path: ROUTES_LIBRARY.reglas_y_catalogos_agrupaciones.path,
    component: FinancialConceptsMainPageComponent,
  },
  {
    data: { permission: ROUTES_LIBRARY.reglas_y_catalogos_configuracion_de_reportes.permission },
    path: ROUTES_LIBRARY.reglas_y_catalogos_configuracion_de_reportes.path,
    component: ReportDesignerMainPageComponent,
  },
  // {
  //   data: { permission: ROUTES_LIBRARY.reglas_y_catalogos_reglas_contabilizadoras.permission },
  //   path: ROUTES_LIBRARY.reglas_y_catalogos_reglas_contabilizadoras.path,
  //   component: AccountingCataloguesAndRulesWorkspaceComponent,
  // },
  {
    path: '',
    redirectTo: ROUTES_LIBRARY.reglas_y_catalogos_catalogos_de_cuentas.path,
    pathMatch: 'full',
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingCataloguesAndRulesWorkspaceRoutingModule { }
