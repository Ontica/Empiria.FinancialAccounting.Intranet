/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { EventInfo } from '@app/core';

import { VoucherEntryDescriptor } from '@app/models';

import { MessageBoxService } from '@app/shared/containers/message-box';

export enum VoucherEntryTableEventType {
  UPDATE_VOUCHER_ENTRY_CLICKED = 'VoucherEntryTableComponent.Event.UpdateVoucherEntryClicked',
  REMOVE_VOUCHER_ENTRY_CLICKED = 'VoucherEntryTableComponent.Event.RemoveVoucherEntryClicked',
}

@Component({
  selector: 'emp-fa-voucher-entry-table',
  templateUrl: './voucher-entry-table.component.html',
})
export class VoucherEntryTableComponent implements OnChanges {

  @Input() voucherEntryList: VoucherEntryDescriptor[] = [];

  @Output() voucherEntryTableEvent = new EventEmitter<EventInfo>();

  displayedColumns: string[] = ['accountNumber', 'sector', 'accountName', 'verificationNumber',
    'responsibilityArea', 'currency', 'exchangeRate', 'partial', 'debit', 'credit', 'action' ];

  dataSource: MatTableDataSource<VoucherEntryDescriptor>;

  constructor(private messageBox: MessageBoxService) { }


  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.voucherEntryList);
  }


  onUpdateVoucherEntryClicked(voucherEntry: VoucherEntryDescriptor) {
    this.sendEvent(VoucherEntryTableEventType.UPDATE_VOUCHER_ENTRY_CLICKED, {voucherEntry});
  }


  onRemoveVoucherEntryClicked(voucherEntry: VoucherEntryDescriptor) {

    const message = this.getConfirmMessage(voucherEntry);

    this.messageBox.confirm(message, 'Eliminar movimiento', 'DeleteCancel')
      .toPromise()
      .then(x => {
        if (x) {
          this.sendEvent(VoucherEntryTableEventType.REMOVE_VOUCHER_ENTRY_CLICKED, {voucherEntry});
        }
      });
  }


  private getConfirmMessage(voucherEntry: VoucherEntryDescriptor): string {
    return `
      <table style='margin: 0;'>
        <tr><td class='nowrap'>Tipo de movimiento: </td><td><strong>
          ${voucherEntry.voucherEntryType}
        </strong></td></tr>

        <tr><td class='nowrap'>No. cuenta / Auxiliar: </td><td><strong>
          ${voucherEntry.accountNumber}
        </strong></td></tr>

        <tr><td class='nowrap'>Descripción / Concepto: </td><td><strong>
          ${voucherEntry.accountName}
        </strong></td></tr>
      </table>

     <br>¿Elimino el movimiento?`;
  }


  private sendEvent(eventType: VoucherEntryTableEventType, payload?: any) {
    const event: EventInfo = {
      type: eventType,
      payload
    };

    this.voucherEntryTableEvent.emit(event);
  }

}