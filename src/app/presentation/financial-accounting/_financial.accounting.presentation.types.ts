/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


/* Actions */

import { ActionType as VoucherAction } from './voucher.presentation.handler';
export { ActionType as VoucherAction } from './voucher.presentation.handler';

import { ActionType as ReportingAction } from './reporting.presentation.handler';
export { ActionType as ReportingAction } from './reporting.presentation.handler';

export type FAActions = VoucherAction | ReportingAction;


/* Commands */

export type FACommands = '';


/* Effects */

export type FAEffects = '';


/* Selectors */

import { SelectorType as AccountChartStateSelector } from './account-chart.presentation.handler';
export { SelectorType as AccountChartStateSelector } from './account-chart.presentation.handler';

import { SelectorType as CataloguesStateSelector } from './catalogues.presentation.handler';
export { SelectorType as CataloguesStateSelector } from './catalogues.presentation.handler';

import { SelectorType as ExchangeRatesStateSelector } from './exchange-rates.presentation.handler';
export { SelectorType as ExchangeRatesStateSelector } from './exchange-rates.presentation.handler';

import { SelectorType as ExternalVariablesStateSelector } from './external-variables.presentation.handler';
export { SelectorType as ExternalVariablesStateSelector } from './external-variables.presentation.handler';

import { SelectorType as FinancialConceptsStateSelector } from './financial-concepts.presentation.handler';
export { SelectorType as FinancialConceptsStateSelector } from './financial-concepts.presentation.handler';

import { SelectorType as ReportingStateSelector } from './reporting.presentation.handler';
export { SelectorType as ReportingStateSelector } from './reporting.presentation.handler';

import { SelectorType as VoucherStateSelector } from './voucher.presentation.handler';
export { SelectorType as VoucherStateSelector } from './voucher.presentation.handler';

export type FASelectors = AccountChartStateSelector |
                          CataloguesStateSelector |
                          ExchangeRatesStateSelector |
                          ExternalVariablesStateSelector |
                          FinancialConceptsStateSelector |
                          ReportingStateSelector |
                          VoucherStateSelector;
