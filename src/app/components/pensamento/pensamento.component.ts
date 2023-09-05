import { PensamentoService } from '../pensamentos/pensamento.service';
import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from './pensamento';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.scss'],
})
export class PensamentoComponent implements OnInit {
  constructor(private service: PensamentoService) {}

  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
  };
  larguraPensamento(): string {
    return this.pensamento.conteudo.length >= 256
      ? 'pensamento-g'
      : 'pensamento-p';
  }

  ngOnInit(): void {}
}
