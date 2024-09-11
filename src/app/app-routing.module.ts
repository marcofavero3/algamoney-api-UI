import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';  // Importando o componente de não autorizado

const routes: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },  // Rota para não autorizado
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },  // Rota para página não encontrada
  { path: '**', redirectTo: 'pagina-nao-encontrada' }  // Qualquer outra rota redireciona para página não encontrada
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
