import { Component, OnInit } from '@angular/core';
import { ItemData } from '../model/itemData'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  keyword:string = "";
  itemDatas:ItemData[] = [];

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 3; ++i) {
      this.itemDatas.push(new ItemData("User-A", "Comment "));
      this.itemDatas.push(new ItemData("User-B", "Comment<strong>strong</strong><br />Comment<strong>strong</strong>"));
      this.itemDatas.push(new ItemData("User-B", "Comment<mark>mark</mark><br />Comment<mark>mark</mark>"));
      this.itemDatas.push(new ItemData("User-B", "<a href=`https://www.google.co.jp/'>Link to google jp</a>"));
    }
  }

}
