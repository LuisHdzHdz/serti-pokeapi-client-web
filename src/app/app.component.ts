import { Component, ViewChild } from '@angular/core';
import { ClientHttpService } from './client-http.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokeapi-angular-client'; 
  pokemons : any;
  results : any;
  columnas: string[] = ['name'];
  loadData = false;
  idEvChain: any;
  evolutionChain: any;

  constructor(private httpService: ClientHttpService) {}
  
  @ViewChild(MatPaginator)  paginator! : MatPaginator;

  getAll() {
    this.httpService.getAll().subscribe(
    (response) => { 
      this.pokemons = response;
      this.results = this.pokemons.results.slice(0, 20);
      this.loadData = true;
    },
    (error) => { console.log(error); });
  }

  getEvolutionChain() {
    this.httpService.getEvolutionChain(this.idEvChain).subscribe(
    (response) => { 
      this.evolutionChain = response;
    },
    (error) => { console.log(error); });
  }

}

