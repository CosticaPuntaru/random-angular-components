import { Component, OnInit } from '@angular/core';
interface Item {
  id: number;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public pageSize = 20;

  public progress = 76;
  public completed = false;
  public dataArr: Item[] = []

  public changeList: any[] = []

  public changes(type: string, event: any) {
    this.changeList.unshift({ type, event })
  }

  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.dataArr.push({
        id: i,
        firstName: Math.floor(Math.random() * 1000) + "-firstName-" + i,
        lastName: Math.floor(Math.random() * 1000) + "-lastName-" + i,
      })
    }
  }
}
