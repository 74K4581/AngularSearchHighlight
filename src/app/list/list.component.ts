import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ItemData } from '../model/itemData'

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewChecked {

    @ViewChild("topElem") public elm: ElementRef;

    keyword: string = "";
    itemDatas: ItemData[] = [];
    index: number = -1;
    resultCount: number = -1;

    constructor() {
    }

    ngOnInit(): void {
        let d = new Date();
        for (let i = 0; i < 3; ++i) {
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

    changeKeyword() {
        this.index = -1;
        this.resultCount = -1;

    }

    public ngAfterViewChecked(): void {
        if (this.keyword !== "") {
            let hits = this.elm.nativeElement.querySelectorAll('.highlight');
            this.resultCount = hits.length;
        }
    }

    keyUpEnter(e: any) {
        if (e.keyCode === 13) {
            this.focusNext(e.shiftKey === true ? -1 : +1);
        }
    }

    // フォーカスする位置を変更する「
    // inc : 次に進めるなら+1、前に戻るなら-1
    focusNext(inc: number) {
        if (!this.keyword || this.keyword === "") {
            return;
        }

        // フォーカスすべき要素を取得
        let hits = this.elm.nativeElement.querySelectorAll('.highlight');

        // 先頭から前には戻らない
        if (this.index <= 0 && inc < 0) return;
        // 最後から次には進まない
        if (this.index === hits.length - 1 && inc > 0) return;

        // 前のフォーカスの色を戻す
        if (0 <= this.index) {
            let prev = this.index % hits.length;
            hits[prev].classList.remove("highlight2");
        }

        // フォーカス位置を進める
        this.index += inc;
        let next = this.index % hits.length;
        let hit = hits[next];

        // フォーカス位置が画面外ならスクロール
        let scrollArea = this.elm.nativeElement.querySelectorAll('.scroll')[0];
        if (!this.isInScreen(scrollArea, hit)) {
            hit.scrollIntoView(inc < 0);
        }

        // フォーカス位置の色を変える
        hit.classList.add("highlight2");
    }

    // 指定要素が画面内かどうか判定する
    // parentElem : スクリーン領域
    // elem : 判定する要素
    isInScreen(parentElem: Element, elem: Element) {
        const parentRect = parentElem.getBoundingClientRect();
        const rect = elem.getBoundingClientRect();
        return parentRect.top < rect.top && rect.bottom < parentRect.top + parentRect.height;
    }
}
