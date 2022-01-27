/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { ExternalProcessTypes, PermissionsLibrary } from '@app/models';


type ControlPanelOptionType = 'AccountingCalendars' |
                              'ExternalProcessRentabilidad' |
                              'ExternalProcessConciliacionSIC';


export interface ControlPanelOption {
  title: string;
  description: string;
  actionTitle: string;
  type: ControlPanelOptionType;
  permission: PermissionsLibrary;
  externalProcessType?: ExternalProcessTypes;
}


export const ControlPanelOptionList: ControlPanelOption[] = [
  {
    title: 'Períodos',
    description: 'Edición de fechas de los calendarios.' ,
    actionTitle: 'Períodos',
    type: 'AccountingCalendars',
    permission: PermissionsLibrary.FEATURE_ACCOUNTING_CALENDARS_EDITION,
  },
  {
    title: 'Rentabilidad',
    description: 'Ejecución de proceso de rentabilidad.' ,
    actionTitle: 'Rentabilidad',
    type: 'ExternalProcessRentabilidad',
    permission: PermissionsLibrary.FEATURE_EXTERNAL_PROCESS_EXECUTION,
    externalProcessType: ExternalProcessTypes.Rentabilidad,
  },
  {
    title: 'Conciliación de cartera',
    description: 'Ejecución de proceso de conciliación de cartera.' ,
    actionTitle: 'Conciliación',
    type: 'ExternalProcessConciliacionSIC',
    permission: PermissionsLibrary.FEATURE_EXTERNAL_PROCESS_EXECUTION,
    externalProcessType: ExternalProcessTypes.ConciliacionSIC,
  },
];
