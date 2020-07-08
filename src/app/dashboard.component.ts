import {Component} from "@angular/core";
import {Item} from "./item";

@Component({
    selector: "my-dashboard",
    template: `
        <ul>
            <li *ngFor = "let item of itemList">
                {{item.name}}:{{item.price}}円
            </li>
        </ul>
    `,

})

export class DashboardComponent {
    //商品リスト
    itemList : Item[] = [
        {name:"りんご",　price:123},
        {name:"ばなな",　price:200},
        {name:"ぶどう",　price:500}
    ];
}