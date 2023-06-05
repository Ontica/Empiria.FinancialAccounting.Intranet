/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { EventInfo } from '@app/core';

import { VoucherSpecialCaseType } from '@app/models';

import { FormHelper, sendEvent } from '@app/shared/utils';

export enum VoucherSpecialCaseEditorEventType {
  FIELDS_CHANGED = 'VoucherSpecialCaseEditorComponent.Event.FieldsChanged',
}

interface VoucherSpecialCaseFormModel extends FormGroup<{
  calculationDate: FormControl<string>;
  onVoucherNumber: FormControl<string>;
}> { }

@Component({
  selector: 'emp-fa-voucher-special-case-editor',
  templateUrl: './voucher-special-case-editor.component.html',
})
export class VoucherSpecialCaseEditorComponent implements OnChanges {

  @Input() voucherSpecialCaseType: VoucherSpecialCaseType;

  @Output() voucherSpecialCaseEditorEvent = new EventEmitter<EventInfo>();

  form: VoucherSpecialCaseFormModel;

  formHelper = FormHelper;

  constructor() {
    this.initForm();
  }


  ngOnChanges() {
    this.form.reset();
    this.validateRequiredFormFields();
  }


  invalidateForm() {
    this.formHelper.markFormControlsAsTouched(this.form);
  }


  private initForm() {
    const fb = new FormBuilder();

    this.form = fb.group({
      calculationDate: ['', Validators.required],
      onVoucherNumber: ['', Validators.required],
    });

    this.form.valueChanges.subscribe(v => this.emitChanges());
  }


  private validateRequiredFormFields() {
    if (this.voucherSpecialCaseType?.askForCalculationDateField) {
      this.formHelper.setControlValidators(this.form.controls.calculationDate, Validators.required);
    } else {
      this.formHelper.clearControlValidators(this.form.controls.calculationDate);
    }

    if (this.voucherSpecialCaseType?.askForVoucherNumberField) {
      this.formHelper.setControlValidators(this.form.controls.onVoucherNumber, Validators.required);
    } else {
      this.formHelper.clearControlValidators(this.form.controls.onVoucherNumber);
    }
  }


  private emitChanges() {
    const payload = {
      isFormValid: this.form.valid,
      voucherSpecialCase: this.getFormData(),
    };

    setTimeout(() => {
      sendEvent(this.voucherSpecialCaseEditorEvent,
        VoucherSpecialCaseEditorEventType.FIELDS_CHANGED, payload);
    });
  }


  private getFormData() {
    const formModel = this.form.getRawValue();

    const data = {
      calculationDate: formModel.calculationDate ?? null,
      onVoucherNumber: formModel.onVoucherNumber ?? '',
    };

    return data;
  }

}
