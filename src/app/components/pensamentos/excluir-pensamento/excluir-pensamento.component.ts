import { ActivatedRoute, Router } from '@angular/router';
import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../../pensamento/pensamento';

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrls: ['./excluir-pensamento.component.scss'],
})
export class ExcluirPensamentoComponent implements OnInit {
  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false,
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getPensamentoPorId(parseInt(id!)).subscribe((pensamento) => {
      if (pensamento.body) {
        this.pensamento = pensamento.body;
      }
    });
  }

  excluirPensamento() {
    if (this.pensamento.id) {
      this.service.deletePensamento(this.pensamento.id).subscribe((res) => {
        if (res.status == 200) {
          alert('Pensamento excluído com sucesso!');
          this.router.navigate(['/']);
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
