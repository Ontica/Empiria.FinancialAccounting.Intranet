/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Assertion, EmpObservable, HttpService } from '@app/core';

import { BalanceStorageCommand, FileReport, StoredBalanceSet } from '@app/models';

@Injectable()
export class BalancesStoreDataService {

  constructor(private http: HttpService) { }


  getBalancesSetsList(accountsChartUID: string): EmpObservable<StoredBalanceSet[]> {
    Assertion.assertValue(accountsChartUID, 'accountsChartUID');

    const path = `v2/financial-accounting/accounts-charts/${accountsChartUID}/balance-store`;

    return this.http.get<StoredBalanceSet[]>(path);
  }


  getStoredBalanceSet(accountsChartUID: string, balanceSetUID: string): EmpObservable<StoredBalanceSet> {
    Assertion.assertValue(accountsChartUID, 'accountsChartUID');

    const path = `v2/financial-accounting/accounts-charts/${accountsChartUID}/balance-store/${balanceSetUID}`;

    return this.http.get<StoredBalanceSet>(path);
  }


  createStoredBalancesSet(accountsChartUID: string,
                          command: BalanceStorageCommand): EmpObservable<StoredBalanceSet> {
    Assertion.assertValue(accountsChartUID, 'accountsChartUID');
    Assertion.assertValue(command, 'command');

    const path = `v2/financial-accounting/accounts-charts/${accountsChartUID}/balance-store`;

    return this.http.post<StoredBalanceSet>(path, command);
  }


  calculateStoredBalancesSet(accountsChartUID: string,
                             balanceSetUID: string): EmpObservable<StoredBalanceSet> {
    Assertion.assertValue(accountsChartUID, 'accountsChartUID');
    Assertion.assertValue(balanceSetUID, 'balanceSetUID');

    const path = `v2/financial-accounting/accounts-charts/${accountsChartUID}` +
      `/balance-store/${balanceSetUID}/calculate`;

    return this.http.post<StoredBalanceSet>(path);
  }


  deleteStoredBalancesSet(accountsChartUID: string,
                          balanceSetUID: string): EmpObservable<void> {
    Assertion.assertValue(accountsChartUID, 'accountsChartUID');
    Assertion.assertValue(balanceSetUID, 'balanceSetUID');

    const path = `v2/financial-accounting/accounts-charts/${accountsChartUID}` +
      `/balance-store/${balanceSetUID}`;

    return this.http.delete<void>(path);
  }


  exportStoredBalanceSetToExcel(accountsChartUID: string, balanceSetUID: string): EmpObservable<FileReport> {
    Assertion.assertValue(accountsChartUID, 'accountsChartUID');
    Assertion.assertValue(balanceSetUID, 'balanceSetUID');

    const path = `v2/financial-accounting/accounts-charts/${accountsChartUID}` +
      `/balance-store/${balanceSetUID}/excel`;

    return this.http.get<FileReport>(path);
  }

}
