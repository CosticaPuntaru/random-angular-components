import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TProgressComponent } from './t-progress/t-progress.component';
import { TColumnComponent } from './t-column/t-column.component';
import { TGridComponent } from './t-grid/t-grid.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TProgressComponent,
    TColumnComponent,
    TGridComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
