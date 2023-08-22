import { Component, Input, OnInit } from '@angular/core';
import { Store } from '../store.model';
import { StoreService } from '../store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  @Input()
  store: Store = null!;

  constructor(private storeService: StoreService, private router: Router) { }

  ngOnInit(): void {
  }

  editSotre() {
    this.router.navigate(['/main/edit-magasin', this.store.idStore]);
  }

  deleteStore() {
    if(this.store.idStore) this.storeService.deleteStore(this.store.idStore).subscribe();
  }

}
