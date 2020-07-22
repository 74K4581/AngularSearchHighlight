import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ListComponent } from './list/list.component';
import { HighlightPipe } from './highlight.pipe';
import { SearchComponent } from './search/search.component';

@NgModule({
    declarations: [
        AppComponent,
        ItemComponent,
        ListComponent,
        HighlightPipe,
        SearchComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}