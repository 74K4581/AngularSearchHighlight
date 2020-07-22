import { Component, OnInit, ViewChild, ElementRef, Output, Input, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    //@ViewChild("topElem") public elm: ElementRef;
    @Output() onSearch = new EventEmitter<string>();

    @Input() searchTarget: Element = null;

    keyword: string = "";
    index: number = -1;
    resultCount: number = -1;
    hits = null;

    constructor() { }

    ngOnInit(): void {
    }

    changeKeyword() {
        this.index = -1;
        this.resultCount = -1;
        if (this.keyword !== "") {
            setTimeout(() => {
                this.hits = this.searchTarget.querySelectorAll('span.highlight');
                this.resultCount = this.hits.length;
            }, 0);
        }
        this.onSearch.emit(this.keyword);
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

        // 先頭から前には戻らない
        if (this.index <= 0 && inc < 0) return;
        // 最後から次には進まない
        if (this.index === this.hits.length - 1 && inc > 0) return;

        // 前のフォーカスの色を戻す
        if (0 <= this.index) {
            let prev = this.index % this.hits.length;
            this.hits[prev].classList.remove("highlight2");
        }

        // フォーカス位置を進める
        this.index += inc;
        let next = this.index % this.hits.length;
        let hit = this.hits[next];

        // フォーカス位置が画面外ならスクロール
        //let scrollArea = this.searchTarget.querySelectorAll('.scroll')[0];
        if (!this.isInScreen(this.searchTarget, hit)) {
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
