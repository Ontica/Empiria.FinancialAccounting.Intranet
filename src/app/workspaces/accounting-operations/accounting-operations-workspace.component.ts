/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { Assertion, EventInfo } from '@app/core';

import { PresentationLayer, SubscriptionHelper } from '@app/core/presentation';

import { MainUIStateSelector, VoucherAction,
         VoucherStateSelector } from '@app/presentation/exported.presentation.types';

import { EmptySearchVouchersCommand, EmptyVoucherDescriptor, mapVoucherStageFromViewName,
        SearchVouchersCommand, VoucherDescriptor, VoucherStage} from '@app/models';

import { View } from '../main-layout';

import { VouchersDataService } from '@app/data-services/vouchers.data.service';

import { VouchersExplorerEventType } from '@app/views/vouchers/vouchers-explorer/vouchers-explorer.component';

type AccountingOperationModalOptions = 'VoucherCreator' | 'VouchersImporter';


@Component({
  selector: 'emp-fa-accounting-operations-workspace',
  templateUrl: './accounting-operations-workspace.component.html'
})
export class AccountingOperationsWorkspaceComponent implements OnInit, OnDestroy {

  currentView: View;

  voucherList: VoucherDescriptor[] = [];
  filter: SearchVouchersCommand = EmptySearchVouchersCommand;

  selectedVoucher: VoucherDescriptor = EmptyVoucherDescriptor;

  displayVoucherTabbedView = false;
  displayOptionModalSelected: AccountingOperationModalOptions = null;

  isLoading = false;
  isLoadingVoucher = false;

  subscriptionHelper: SubscriptionHelper;

  constructor(private uiLayer: PresentationLayer,
              private vouchersData: VouchersDataService) {
    this.subscriptionHelper = uiLayer.createSubscriptionHelper();
  }


  ngOnInit() {

    this.subscriptionHelper.select<View>(MainUIStateSelector.CURRENT_VIEW)
      .subscribe(x => this.onCurrentViewChanged(x));

    this.subscriptionHelper.select<SearchVouchersCommand>(VoucherStateSelector.LIST_FILTER)
      .subscribe(x => {
        this.filter = x;
      });

  }


  ngOnDestroy() {
    this.subscriptionHelper.destroy();
  }


  onVouchersExplorerEvent(event: EventInfo): void {

    switch (event.type as VouchersExplorerEventType) {

      case VouchersExplorerEventType.FILTER_CHANGED:
        this.applyVoucherFilter(event.payload);
        this.searchVouchers();
        return;

      case VouchersExplorerEventType.SELECT_VOUCHER:
        Assertion.assertValue(event.payload.voucher, 'event.payload.voucher');
        this.selectedVoucher = event.payload.voucher;
        console.log('SELECT_VOUCHER', this.selectedVoucher);

        // TODO: get complete model of voucher and pass to the editor
        // this.isLoadingVoucher = true;

        return;

      case VouchersExplorerEventType.CREATE_VOUCHER_CLICKED:
        console.log('CREATE_VOUCHER_CLICKED');
        // TODO: open the voucher creator
        // this.displayOptionModalSelected = 'VoucherCreator';
        return;

      case VouchersExplorerEventType.IMPORT_VOUCHERS_CLICKED:
        console.log('IMPORT_VOUCHERS_CLICKED');
        // TODO: open the voucher importer
        // this.displayOptionModalSelected = 'VouchersImporter';
        return;

      case VouchersExplorerEventType.SELECT_VOUCHERS_OPTION:
        Assertion.assertValue(event.payload.vouchers, 'event.payload.vouchers');
        console.log('SELECT_VOUCHERS_OPTION', event.payload.vouchers);
        // TODO: validate the option and open the corresponding editor

        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  private onCurrentViewChanged(newView: View) {
    this.currentView = newView;
    this.applyVoucherFilter({ stage: mapVoucherStageFromViewName(this.currentView.name)});
  }


  private applyVoucherFilter(data?: { keywords?: string, stage?: VoucherStage }) {
    const currentFilter =
      this.uiLayer.selectValue<SearchVouchersCommand>(VoucherStateSelector.LIST_FILTER);

    const filter: SearchVouchersCommand = Object.assign({}, currentFilter, data);

    this.uiLayer.dispatch(VoucherAction.SET_LIST_FILTER, { filter });
  }


  private searchVouchers() {
    if (!this.filter.accountsChartUID) {
      return;
    }

    this.isLoading = true;

    this.vouchersData.searchVouchers(this.filter)
      .toPromise()
      .then(x => {
        this.voucherList = x;
      })
      .finally(() => this.isLoading = false);
  }

}
