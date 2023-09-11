import { PensamentoService } from '../pensamentos/pensamento.service';
import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from './pensamento';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.scss'],
})
export class PensamentoComponent implements OnInit {
  @Input() listaFavoritos: Pensamento[] = [];
  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false,
  };

  constructor(private service: PensamentoService) {}

  larguraPensamento(): string {
    return this.pensamento.conteudo.length >= 256
      ? 'pensamento-g'
      : 'pensamento-p';
  }

  favoritarPensamento() {
    this.service
      .favoritarPensamento(this.pensamento.id, !this.pensamento.favorito)
      .subscribe((res) => {
        if (res.body) {
          this.pensamento.favorito = res.body.favorito;
        }
      });
    if (this.pensamento.favorito) {
      this.listaFavoritos = this.listaFavoritos.splice(
        this.listaFavoritos.indexOf(this.pensamento),
        1
      );
    }
  }
  ngOnInit(): void {}
}
