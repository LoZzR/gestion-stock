import { Component, Input, OnInit } from '@angular/core';
import { Store } from '../store.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  @Input()
  store: Store = new Store("test", "test", "test", "test");

  constructor() { }

  ngOnInit(): void {
  }

}