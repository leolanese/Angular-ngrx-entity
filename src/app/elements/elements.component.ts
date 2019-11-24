import { Component, OnInit } from '@angular/core';
import { Name } from '../../entities/ngrx/name';
import { NameService } from '../name.service';
import { Store } from '@ngrx/store';
import * as heroActions from '../../entities/ngrx/actions';
import { selectAllHeroes } from '../../entities/ngrx/reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {
  heroes: Name[];

  constructor
  (private nameService: NameService,
   private store: Store<any>,
   private router: Router
   ) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.store.select(selectAllHeroes).subscribe(heroes=>{
    this.heroes = heroes;
    });
  }

  onAdd(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.store.dispatch(new heroActions.AddHero({ name } as Name));
  }

  onDelete(hero: Name): void {
    this.store.dispatch(new heroActions.DeleteHero(hero));
  }

  onEdit(hero: Name): void {
    this.router.navigate([`/detail/${hero.id}`])
  }

  onDeleteAll(): void {
    this.store.dispatch(new heroActions.DeleteAllNames());
  }

  onEditAll() : void {
    this.router.navigate([`/detail/all`])
  }

}
