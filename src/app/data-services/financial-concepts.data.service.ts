/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Assertion, HttpService, Identifiable } from '@app/core';

import { ExternalVariable, FileReport, FinancialConcept, FinancialConceptDescriptor,
         FinancialConceptEditionCommand, FinancialConceptEntry, FinancialConceptEntryEditionCommand,
         FinancialConceptEntryEditionResult, FinancialConceptsGroup } from '@app/models';


@Injectable()
export class FinancialConceptsDataService {

  constructor(private http: HttpService) { }


  getExternalVariablesSets(): Observable<Identifiable[]> {
    const path = `v2/financial-accounting/financial-concepts/external-variables-sets`;

    return this.http.get<Identifiable[]>(path);
  }


  getExternalVariables(setUID: string): Observable<ExternalVariable[]> {
    const path = `v2/financial-accounting/financial-concepts/external-variables-sets/${setUID}`;

    return this.http.get<ExternalVariable[]>(path);
  }


  getFinancialConceptsGroups(): Observable<FinancialConceptsGroup[]> {
    const path = `v2/financial-accounting/financial-concepts/groups`;

    return this.http.get<FinancialConceptsGroup[]>(path);
  }


  getFinancialConceptsInGroup(financialConceptGroupUID: string): Observable<FinancialConceptDescriptor[]> {
    Assertion.assertValue(financialConceptGroupUID, 'financialConceptGroupUID');

    const path = `v2/financial-accounting/financial-concepts/in-group/${financialConceptGroupUID}`;

    return this.http.get<FinancialConceptDescriptor[]>(path);
  }


  exportFinancialConceptsToExcel(financialConceptGroupUID: string): Observable<FileReport> {
    Assertion.assertValue(financialConceptGroupUID, 'financialConceptGroupUID');

    const path = `v2/financial-accounting/financial-concepts/groups/${financialConceptGroupUID}/excel`;

    return this.http.get<FileReport>(path);
  }


  getFinancialConcept(financialConceptUID: string): Observable<FinancialConcept> {
    Assertion.assertValue(financialConceptUID, 'financialConceptUID');

    const path = `v2/financial-accounting/financial-concepts/${financialConceptUID}`;

    return this.http.get<FinancialConcept>(path);
  }



  insertFinancialConcept(command: FinancialConceptEditionCommand): Observable<FinancialConcept> {
    Assertion.assertValue(command, 'command');

    const path = `v2/financial-accounting/financial-concepts`;

    return this.http.post<FinancialConcept>(path, command);
  }


  updateFinancialConcept(financialConceptUID: string,
                         command: FinancialConceptEditionCommand): Observable<FinancialConcept> {
    Assertion.assertValue(financialConceptUID, 'financialConceptUID');
    Assertion.assertValue(command, 'command');

    const path = `v2/financial-accounting/financial-concepts/${financialConceptUID}`;

    return this.http.put<FinancialConcept>(path, command);
  }


  removeFinancialConcept(financialConceptUID: string): Observable<void> {
    Assertion.assertValue(financialConceptUID, 'financialConceptUID');

    const path = `v2/financial-accounting/financial-concepts/${financialConceptUID}`;

    return this.http.delete<void>(path);
  }


  getFinancialConceptEntry(financialConceptUID: string,
                           financialConceptEntryUID: string): Observable<FinancialConceptEntry> {
    Assertion.assertValue(financialConceptUID, 'financialConceptUID');
    Assertion.assertValue(financialConceptEntryUID, 'financialConceptEntryUID');

    const path = `v2/financial-accounting/financial-concepts/${financialConceptUID}` +
      `/integration/${financialConceptEntryUID}`;

    return this.http.get<FinancialConceptEntry>(path);
  }


  insertFinancialConceptEntry(financialConceptUID: string,
                              command: FinancialConceptEntryEditionCommand): Observable<FinancialConceptEntryEditionResult> {
    Assertion.assertValue(financialConceptUID, 'financialConceptUID');
    Assertion.assertValue(command, 'command');

    const path = `v2/financial-accounting/financial-concepts/${financialConceptUID}/integration`;

    return this.http.post<FinancialConceptEntryEditionResult>(path, command);
  }


  updateFinancialConceptEntry(financialConceptUID: string,
                              financialConceptEntryUID: string,
                              command: FinancialConceptEntryEditionCommand): Observable<FinancialConceptEntryEditionResult> {
    Assertion.assertValue(financialConceptUID, 'financialConceptUID');
    Assertion.assertValue(financialConceptEntryUID, 'financialConceptEntryUID');
    Assertion.assertValue(command, 'command');

    const path = `v2/financial-accounting/financial-concepts/${financialConceptUID}` +
      `/integration/${financialConceptEntryUID}`;

    return this.http.put<FinancialConceptEntryEditionResult>(path, command);
  }


  removeFinancialConceptEntry(financialConceptUID: string,
                              financialConceptEntryUID: string): Observable<void> {
    Assertion.assertValue(financialConceptUID, 'financialConceptUID');
    Assertion.assertValue(financialConceptEntryUID, 'financialConceptEntryUID');

    const path = `v2/financial-accounting/financial-concepts/${financialConceptUID}` +
      `/integration/${financialConceptEntryUID}`;

    return this.http.delete<void>(path);
  }

}
