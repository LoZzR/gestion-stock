import { Component, OnInit } from '@angular/core';
import { Store } from '../store.model';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {

  stores: Store[] = [new Store("test1", "test1", "test1", "test1"),
                      new Store("test2", "test2", "test2", "test2"),
                      new Store("test3", "test3", "test3", "test3")
                    ];
  constructor() { }

  ngOnInit(): void {
  }

}
