import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageModule } from './start-page/start-page.module';
import { MainPagesModule } from './main-pages/main-pages.module';
import { AppLayoutModule } from './app-layout/app-layout.module';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmDialogComponent } from './globalDialogs/confirmDialog/confirmDialog.component';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [AppComponent, ConfirmDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StartPageModule,
    MainPagesModule,
    AppLayoutModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MomentDateModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-EN' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
