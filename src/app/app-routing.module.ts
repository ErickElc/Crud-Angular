import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarPensamentoComponent } from './components/pensamentos/criar-pensamento/criar-pensamento.component';
import { ListarPensamentoComponent } from './components/pensamentos/listar-pensamento/listar-pensamento.component';
import { ExcluirPensamentoComponent } from './components/pensamentos/excluir-pensamento/excluir-pensamento.component';
import { EditarPensamentosComponent } from './components/pensamentos/editar-pensamentos/editar-pensamentos.component';

const routes: Routes = [
  { path: 'criar-pensamento', component: CriarPensamentoComponent },
  { path: 'listar-pensamento', component: ListarPensamentoComponent },
  {
    path: 'pensamentos/editar-pensamento/:id',
    component: EditarPensamentosComponent,
  },
  {
    path: 'pensamentos/excluir-pensamento/:id',
    component: ExcluirPensamentoComponent,
  },
  { path: '', redirectTo: 'listar-pensamento', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
