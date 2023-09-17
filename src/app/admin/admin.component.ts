import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { AuthResponseData } from './auth.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  isAuthenticated = false;
  error: string = null;
  isLoginMode = true;
  authForm: FormGroup;

  private userSub: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),
      ]],
    });
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  get email() {
    return this.authForm.get('email');
  }
  get password() {
    return this.authForm.get('password');
  }


  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.logIn(email, password);
    }

    authObs.subscribe(
      resData => {
        this.router.navigate(['cars-list']);
      },
      errorMessage => {
        this.error = errorMessage;
      }
    );

    form.reset();
  }

  $Preview_onClick(form: FormGroup) {
    if (form.invalid) {
      return form.markAllAsTouched();
    }
  }
}

