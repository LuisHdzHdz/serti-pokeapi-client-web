import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPokemonsComponent } from './all-pokemons/all-pokemons.component';

const routes: Routes = [
  { path: 'all', component: AllPokemonsComponent}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
