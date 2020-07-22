import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ItemData } from '../model/itemData'

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    keyword: string = "";
    itemDatas: ItemData[] = [];

    constructor() {
    }

    ngOnInit(): void {
        let d = new Date();
        for (let i = 0; i < 30; ++i) {
            this.itemDatas.push(new ItemData("User-A", d, "Comment&nbsp;test"));
            this.itemDatas.push(new ItemData("User-B", d, "Comment<strong>strong</strong><br />Comment<strong>strong</strong>"));
            this.itemDatas.push(new ItemData("User-B", d, "Comment<mark>mark</mark><br />Comment<mark>mark</mark>"));
            this.itemDatas.push(new ItemData("User-B", d, "<a href='https://www.google.co.jp/'>Link to google.jp</a>"));
        }

        for (let i = 0; i < 30; ++i) {
            this.itemDatas.push(new ItemData(
                Math.random().toString(32).substring(2),
                d,
                Math.random().toString(32).substring(2)));
        }
    }

    onSearch(keyword:string) {
        this.keyword = keyword;
    }
}
