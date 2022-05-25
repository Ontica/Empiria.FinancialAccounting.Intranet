/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component } from '@angular/core';

import { Assertion, EventInfo, isEmpty } from '@app/core';

import { FinancialConceptsDataService } from '@app/data-services';

import { EmptyFinancialConcept, EmptyFinancialConceptCommand, FinancialConcept, FinancialConceptCommand,
         FinancialConceptDescriptor } from '@app/models';

import {
  FinancialConceptCreatorEventType
} from '@app/views/financial-concepts/financial-concept-edition/financial-concept-creator.component';

import {
  FinancialConceptTabbedViewEventType
} from '@app/views/financial-concepts/financial-concept-tabbed-view/financial-concept-tabbed-view.component';

import {
  FinancialConceptsViewerEventType
} from '@app/views/financial-concepts/financial-concepts-viewer/financial-concepts-viewer.component';


@Component({
  selector: 'emp-fa-financial-concepts-main-page',
  templateUrl: './financial-concepts-main-page.component.html',
})
export class FinancialConceptsMainPageComponent {

  isLoading = false;

  isLoadingFinancialConcept = false;

  financialConceptCommand: FinancialConceptCommand = Object.assign({}, EmptyFinancialConceptCommand);

  financialConceptsList: FinancialConceptDescriptor[] = [];

  selectedFinancialConcept: FinancialConcept = EmptyFinancialConcept;

  excelFileUrl = '';

  displayFinancialConceptCreator = false;

  displayFinancialConceptTabbed = false;


  constructor(private financialConceptsData: FinancialConceptsDataService) { }


  onFinancialConceptsViewerEvent(event: EventInfo) {
    switch (event.type as FinancialConceptsViewerEventType) {
      case FinancialConceptsViewerEventType.SEARCH_FINANCIAL_CONCEPTS_CLICKED:
        Assertion.assertValue(event.payload.financialConceptCommand, 'event.payload.financialConceptCommand');
        this.financialConceptCommand = event.payload.financialConceptCommand as FinancialConceptCommand;
        this.getFinancialConceptsInGroup();
        return;

      case FinancialConceptsViewerEventType.EXPORT_DATA_BUTTON_CLICKED:
        if (!this.financialConceptCommand.groupUID) {
          return;
        }

        this.exportFinancialConceptsToExcel();
        return;

      case FinancialConceptsViewerEventType.SELECT_FINANCIAL_CONCEPT_CLICKED:
        Assertion.assertValue(event.payload.financialConcept, 'event.payload.financialConcept');
        this.getFinancialConcept(event.payload.financialConcept.uid);
        return;

      case FinancialConceptsViewerEventType.CREATE_FINANCIAL_CONCEPT_CLICKED:
        this.displayFinancialConceptCreator = true;
        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  onFinancialConceptCreatorEvent(event: EventInfo) {
    switch (event.type as FinancialConceptCreatorEventType) {

      case FinancialConceptCreatorEventType.CLOSE_MODAL_CLICKED:
        this.displayFinancialConceptCreator = false;
        return;

      case FinancialConceptCreatorEventType.FINANCIAL_CONCEPT_CREATED:
        Assertion.assertValue(event.payload.financialConcept, 'event.payload.financialConcept');
        this.displayFinancialConceptCreator = false;
        this.setSelectedFinancialConcept(event.payload.financialConcept as FinancialConcept);
        this.validateRefreshFinancialConcepts();
        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  onFinancialConceptTabbedViewEvent(event: EventInfo) {
    switch (event.type as FinancialConceptTabbedViewEventType) {

      case FinancialConceptTabbedViewEventType.CLOSE_BUTTON_CLICKED:
        this.displayFinancialConceptTabbed = false;
        return;

      case FinancialConceptTabbedViewEventType.FINANCIAL_CONCEPT_UPDATED:
        Assertion.assertValue(event.payload.financialConcept, 'event.payload.financialConcept');
        this.setSelectedFinancialConcept(event.payload.financialConcept as FinancialConcept);
        this.validateRefreshFinancialConcepts();
        return;

      case FinancialConceptTabbedViewEventType.FINANCIAL_CONCEPT_REMOVED:
        this.validateRefreshFinancialConcepts();
        this.setSelectedFinancialConcept(EmptyFinancialConcept);
        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  private getFinancialConceptsInGroup() {
    this.setFinancialConceptsListData([]);
    this.isLoading = true;

    this.financialConceptsData.getFinancialConceptsInGroup(this.financialConceptCommand.groupUID)
      .toPromise()
      .then(x => this.setFinancialConceptsListData(x))
      .finally(() => this.isLoading = false);
  }


  private exportFinancialConceptsToExcel() {
    this.financialConceptsData.exportFinancialConceptsToExcel(this.financialConceptCommand.groupUID)
      .toPromise()
      .then(x => this.excelFileUrl = x.url);
  }


  private getFinancialConcept(financialConceptUID: string) {
    this.isLoadingFinancialConcept = true;
    this.financialConceptsData.getFinancialConcept(financialConceptUID)
      .toPromise()
      .then(x => this.setSelectedFinancialConcept(x))
      .finally(() => this.isLoadingFinancialConcept = false);
  }


  private setFinancialConceptsListData(financialConceptsList: FinancialConceptDescriptor[]) {
    this.financialConceptsList = financialConceptsList;
  }


  private validateRefreshFinancialConcepts() {
    if (this.financialConceptCommand.groupUID === this.selectedFinancialConcept.group.uid){
      this.getFinancialConceptsInGroup();
    }
  }


  private setSelectedFinancialConcept(financialConcept: FinancialConcept) {
    this.selectedFinancialConcept = financialConcept;
    this.displayFinancialConceptTabbed = !isEmpty(financialConcept);
  }

}
