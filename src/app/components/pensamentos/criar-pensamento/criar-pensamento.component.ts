import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../../pensamento/pensamento';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.scss'],
})
export class CriarPensamentoComponent implements OnInit {
  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
  };
  constructor(private service: PensamentoService, private router: Router) {}
  criarPensamento() {
    this.service.createPensamento(this.pensamento).subscribe((_) => {
      alert('Pensamento criado com sucesso!');
      this.router.navigate(['/']);
    });
  }

  cancelarPensamento() {
    alert('Pensamento cancelado com sucesso!');
    this.router.navigate(['/']);
  }

  ngOnInit(): void {}
}
