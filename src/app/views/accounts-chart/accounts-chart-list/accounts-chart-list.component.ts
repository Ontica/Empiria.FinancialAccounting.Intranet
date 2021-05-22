/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output,
         ViewChild } from '@angular/core';

import { EventInfo, isEmpty } from '@app/core';

import { AccountDescriptor, AccountsChart, EmptyAccountsChart } from '@app/models';

export enum AccountsChartListEventType {
  ACCOUNT_CLICKED = 'AccountsChartList.Event.AccountClicked',
}

@Component({
  selector: 'emp-fa-accounts-chart-list',
  templateUrl: './accounts-chart-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsChartListComponent implements OnChanges {

  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;

  @Input() accountsChart: AccountsChart = EmptyAccountsChart;

  @Output()  accountsChartListEvent = new EventEmitter<EventInfo>();

  maxLevel = 11;

  ngOnChanges(): void {
    if (this.virtualScroll) {
      this.virtualScroll.scrollToIndex(0);
    }

    if (this.displayAccountsChartList && this.accountsChart.accounts.length > 0) {
      this.maxLevel = this.accountsChart.accounts
                      .reduce((prev, current) => (prev.level > current.level) ? prev : current).level;
    }
  }

  get displayAccountsChartList() {
    return !isEmpty(this.accountsChart);
  }


  onAccountClicked(account: AccountDescriptor) {
    this.sendEvent(AccountsChartListEventType.ACCOUNT_CLICKED, { account });
  }


  private sendEvent(eventType: AccountsChartListEventType, payload?: any) {
    const event: EventInfo = {
      type: eventType,
      payload
    };

    this.accountsChartListEvent.emit(event);
  }

}