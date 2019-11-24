import { Component, OnInit } from '@angular/core';
import { Name } from '../../entities/ngrx/name';
import { NameService } from '../name.service';
import { selectAllHeroes } from '../../entities/ngrx/reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Name[] = [];

  constructor(private nameService: NameService, private store: Store<any>) { }

  ngOnInit() {
    this.getHeroes();
  }

  public getHeroes(): void {
    this.store.select(selectAllHeroes).subscribe(heroes=>{
    this.heroes = heroes.slice(0,4);
    });
  }
}
