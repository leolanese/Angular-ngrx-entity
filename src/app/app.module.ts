import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { ElementsComponent } from './elements/elements.component';
import { SearchComponent } from './search/search.component';
import { NameService } from './name.service';
import { MessageService } from './message.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MessagesComponent } from './messages/messages.component';
import { heroReducer } from '../entities/ngrx/reducer';
import { NameEffects } from '../entities/ngrx/effects';
import { HeaderFooterComponent }  from './header-footer/header-footer.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    StoreModule.forRoot({}),
    StoreModule.forFeature('heroes', heroReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([NameEffects]),
    StoreModule.forRoot(heroReducer, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
        strictStateSerializability: false,
        strictActionSerializability: false
      }
    })
  ],
  declarations: [
    AppComponent,
    ElementsComponent,
    DetailComponent,
    MessagesComponent,
    SearchComponent,
    HeaderFooterComponent
  ],
  providers: [ NameService, MessageService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
