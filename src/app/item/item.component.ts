import { Component, OnInit, Input } from '@angular/core';
import { ItemData } from '../model/itemData';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() itemData: ItemData;

  constructor() { 
  }

  ngOnInit(): void {
  }

}
