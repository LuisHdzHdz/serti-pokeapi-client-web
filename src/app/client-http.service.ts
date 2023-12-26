import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientHttpService {
  private allUrl = 'http://localhost:8080/pokemon';
  private volutionUrl = 'http://localhost:8080/pokemon/evolution-chain?id=';
  private spriteURl = "https://pokeapi.co/api/v2/pokemon/"
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get(this.allUrl);
  }

  getEvolutionChain(id : any) {
    return this.http.get(this.volutionUrl+id);
  }

  getSprite(id : any){
    return this.http.get(this.spriteURl+id);
  }
}
