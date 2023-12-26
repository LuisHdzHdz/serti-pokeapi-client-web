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
  columnas: string[] = [];
  loadData = false;
  idEvChain: any;
  evolutionChain: any;
  chain: any;
  evolvesTo: any;
  species: any;
  evolDetails : any[] = [];
  numberOfEvolutions : any;
  loadChain = false;
  pokemonSprite: any;

  constructor(private httpService: ClientHttpService) {}
  
  @ViewChild(MatPaginator)  paginator! : MatPaginator;

  getAll() {
    this.columnas =["name"];
    this.httpService.getAll().subscribe(
    (response) => { 
      this.pokemons = response;
      this.results = this.pokemons.results.slice(0, 20);
      this.loadData = true;
    },
    (error) => { console.log(error); });
  }

  getEvolutionChain() {
    this.columnas =["species_name"];
    this.loadChain = false;
    this.httpService.getEvolutionChain(this.idEvChain).subscribe(    
    (response) => { 
      this.evolutionChain = response;
      this.chain = this.evolutionChain.chain;
      this.evolvesTo = this.chain.evolves_to;
      this.species = this.chain.evolves_to.species;
      this.evolDetails.splice(0,this.evolDetails.length);
      do{
      this.numberOfEvolutions = this.chain['evolves_to'].length;
      this.evolDetails.push({
        "species_name": this.chain.species.name,
        "min_level": !this.chain ? 1 : this.chain.min_level,
        "item": !this.chain ? null : this.chain.item
      });

      if(this.numberOfEvolutions > 1) {
        for (let i = 1;i < this.numberOfEvolutions; i++) { 
          this.evolDetails.push({
            "species_name": this.chain.evolves_to[i].species.name,
            "min_level": !this.chain.evolves_to[i]? 1 : this.chain.evolves_to[i].min_level,
            "trigger_name": !this.chain.evolves_to[i]? null : this.chain.evolves_to[i].trigger.name,
            "item": !this.chain.evolves_to[i]? null : this.chain.evolves_to[i].item
         });
        }
      }

      this.chain = this.chain['evolves_to'][0];
    }while(!!this.chain && this.chain.hasOwnProperty('evolves_to')){
      this.loadChain = true;
      //console.log("URL sprire: "+this.getEvolutionChain());
      console.log("chain:"+JSON.stringify(this.evolDetails));
    }

    },
    (error) => { console.log(error); });
  }

  getSprite(idSprite: any){
    let image;
    this.httpService.getSprite(idSprite).subscribe(
      (response) => { 
        this.pokemonSprite = response;
        image = this.pokemonSprite.sprites.front_default;
        return image;
      },
      (error) => { console.log(error); });
  }

}

