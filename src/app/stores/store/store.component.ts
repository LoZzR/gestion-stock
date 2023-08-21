import { Component, Input, OnInit } from '@angular/core';
import { Store } from '../store.model';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  @Input()
  store: Store = null!;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
  }

  deleteStore() {
    if(this.store.idStore) this.storeService.deleteStore(this.store.idStore).subscribe();
  }

}
