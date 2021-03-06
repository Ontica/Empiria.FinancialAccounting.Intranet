/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { EventInfo } from '@app/core';

import { AccountsChart, EmptyAccountsChart } from '@app/models';

import { sendEvent } from '@app/shared/utils';

export enum AccountsChartControlsEventType {
  EXPORT_BUTTON_CLICKED = 'AccountsChartControlsComponent.Event.ExportButtonClicked',
}

@Component({
  selector: 'emp-fa-accounts-chart-controls',
  templateUrl: './accounts-chart-controls.component.html',
})
export class AccountsChartControlsComponent{

  @Input() accountsChart: AccountsChart = EmptyAccountsChart;

  @Output() accountsChartControlsEvent = new EventEmitter<EventInfo>();


  onExportButtonClicked() {
    sendEvent(this.accountsChartControlsEvent, AccountsChartControlsEventType.EXPORT_BUTTON_CLICKED);
  }

}
