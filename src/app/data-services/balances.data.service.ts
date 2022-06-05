/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Assertion, HttpService } from '@app/core';

import { AccountBalance, AccountStatement, AccountStatementQuery, BalanceExplorerResult, BalanceExplorerQuery, FileReport,
         TrialBalance, TrialBalanceQuery } from '@app/models';


@Injectable()
export class BalancesDataService {

  constructor(private http: HttpService) { }


  getLedgersAccountsBalances(standardAccountUID: string): Observable<AccountBalance[]> {
    Assertion.assertValue(standardAccountUID, 'standardAccountUID');

    const path = `v2/financial-accounting/balances/${standardAccountUID}`;

    return this.http.get<AccountBalance[]>(path);
  }


  exportBalanceExplorerBalancesToExcel(query: BalanceExplorerQuery): Observable<FileReport> {
    Assertion.assertValue(query, 'query');

    const path = 'v2/financial-accounting/balance-explorer/balances/excel';

    return this.http.post<FileReport>(path, query);
  }


  getBalancesForBalanceExplorer(query: BalanceExplorerQuery): Observable<BalanceExplorerResult> {
    Assertion.assertValue(query, 'query');

    const path = `v2/financial-accounting/balance-explorer/balances`;

    return this.http.post<BalanceExplorerResult>(path, query);
  }


  exportTrialBalanceToExcel(query: TrialBalanceQuery): Observable<FileReport> {
    Assertion.assertValue(query, 'query');

    const path = 'v2/financial-accounting/balance-engine/trial-balance/excel';

    return this.http.post<FileReport>(path, query);
  }


  getTrialBalance(query: TrialBalanceQuery): Observable<TrialBalance> {
    Assertion.assertValue(query, 'query');

    const path = `v2/financial-accounting/balance-engine/trial-balance`;

    return this.http.post<TrialBalance>(path, query);
  }


  exportAccountStatementToExcel(query: AccountStatementQuery): Observable<FileReport> {
    Assertion.assertValue(query, 'query');

    const path = `v2/financial-accounting/account-statement/excel`;

    return this.http.post<FileReport>(path, query);
  }


  getAccountStatement(query: AccountStatementQuery): Observable<AccountStatement> {
    Assertion.assertValue(query, 'query');

    const path = `v2/financial-accounting/account-statement`;

    return this.http.post<AccountStatement>(path, query);
  }

}
