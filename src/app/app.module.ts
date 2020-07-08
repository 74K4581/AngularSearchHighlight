import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';

import {FormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ListComponent } from './list/list.component';
import { HighlightPipe } from './highlight.pipe';

@NgModule({
  declarations: [
    AppComponent,
    //DashboardComponentを読み込めるように追加
    DashboardComponent,
    ItemComponent,
    ListComponent,
    HighlightPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule, // 追加
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}