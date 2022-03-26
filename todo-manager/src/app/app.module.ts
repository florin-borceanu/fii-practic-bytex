import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CommonComponentsModule } from './common/common.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, HomepageComponent, NotFoundComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonComponentsModule,
    HttpClientModule,
  ],
})
export class AppModule {}
