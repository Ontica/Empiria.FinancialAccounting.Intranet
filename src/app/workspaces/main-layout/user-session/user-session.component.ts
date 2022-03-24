/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthenticationService, SessionService } from '@app/core';

import { Principal } from '@app/core/security/principal';

import { APP_CONFIG } from '../config-data';


@Component({
  selector: 'emp-ng-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.scss']
})
export class UserSessionComponent implements OnInit {

  principal: Principal = Principal.empty;

  appLayoutConfig = APP_CONFIG.layout;


  constructor(private session: SessionService,
              private authenticationService: AuthenticationService,
              private router: Router) {}

  ngOnInit(): void {
    this.principal = this.session.getPrincipal();
  }


  logout() {
    this.authenticationService.logout()
      .finally(() => this.router.navigateByUrl('security/login'));
  }

}
