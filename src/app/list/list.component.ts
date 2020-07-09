import { Component, OnInit, ElementRef } from '@angular/core';
import { ItemData } from '../model/itemData'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private el: HTMLElement;
  keyword:string = "";
  itemDatas:ItemData[] = [];
  index:number = -1;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  ngOnInit(): void {
    let d = new Date();
    for (let i = 0; i < 3 ; ++i) {
      this.itemDatas.push(new ItemData("User-A", d, "Comment "));
      this.itemDatas.push(new ItemData("User-B", d, "Comment<strong>strong</strong><br />Comment<strong>strong</strong>"));
      this.itemDatas.push(new ItemData("User-B", d, "Comment<mark>mark</mark><br />Comment<mark>mark</mark>"));
      this.itemDatas.push(new ItemData("User-B", d, "<a href=`https://www.google.co.jp/'>Link to google jp</a>"));
    }

    for (let i = 0; i < 30 ; ++i) {
      this.itemDatas.push(new ItemData(
        Math.random().toString(32).substring(2),
        d,
        Math.random().toString(32).substring(2)));
    }
  }

  changeKeyword() {
    this.index = -1;
  }


  focusNext(inc:number) {
    
    let hits = this.el.querySelectorAll('.highlight');
    //let hits = document.getElementsByClassName("highlight");

    if (this.index < 0) {
      this.index += hits.length;
    }

    // 前のフォーカスの色を戻す
    let prev = this.index % hits.length;
    hits[prev].classList.remove("highlight2");

    this.index += inc;

    // 次のフォーカスを設定
    let next = this.index % hits.length;
    let hit = hits[next];
    hit.scrollIntoView(inc < 0 );
    hit.classList.add("highlight2");
  }

}
