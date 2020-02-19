import { BrowserModule  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxsModule } from '@ngxs/store';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth/token.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { JwtHelperService, JWT_OPTIONS  , JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from '@shared/services/auth/auth-guard.service';
import { AuthService } from '@shared/services/auth/auth.service';
import { AmplifyService, AmplifyAngularModule } from 'aws-amplify-angular';
import { AvatarModule } from 'ngx-avatar';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot(),
    HttpClientModule,
    AmplifyAngularModule,
    AvatarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MomentModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    AuthGuardService,
    AuthService,
    AmplifyService

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
