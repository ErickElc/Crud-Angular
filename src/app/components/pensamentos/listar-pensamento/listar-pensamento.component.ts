import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { Pensamento } from '../../pensamento/pensamento';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.scss'],
})
export class ListarPensamentoComponent implements OnInit {
  existeMaisPensamentos: boolean = true;
  listaPensamentos: Pensamento[] = [];
  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu Mural';
  favorito: boolean = false;
  paginaAtual: number = 1;
  filtro: string = '';
  constructor(private service: PensamentoService) {}

  ngOnInit(): void {
    this.service
      .getPensamentos(this.paginaAtual, this.filtro)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos =
          listaPensamentos.body !== null ? listaPensamentos.body : [];
      });
  }

  filtrarPensamentos() {
    this.service
      .getPensamentos(this.paginaAtual, this.filtro)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos =
          listaPensamentos.body !== null ? listaPensamentos.body : [];
      });
  }

  listarPensamentos() {
    this.titulo = 'Meu Mural';
    this.paginaAtual = 1;
    this.existeMaisPensamentos = true;
    this.favorito = false;
    this.service
      .getPensamentos(this.paginaAtual, this.filtro)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos =
          listaPensamentos.body !== null ? listaPensamentos.body : [];
      });
  }

  listarFavoritos() {
    this.existeMaisPensamentos = true;
    this.titulo = 'Meus Favoritos';
    this.paginaAtual = 1;
    this.favorito = true;
    this.service
      .getPensamentos(this.paginaAtual, '', true)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos =
          listaPensamentos.body !== null ? listaPensamentos.body : [];
        this.listaFavoritos =
          listaPensamentos.body !== null ? listaPensamentos.body : [];
      });
  }
  carregarMaisPensamentos() {
    this.service
      .getPensamentos(++this.paginaAtual, this.filtro, this.favorito)
      .subscribe((response) => {
        if (response.body !== null) {
          this.listaPensamentos.push(...response.body);
          if (!response.body.length) {
            this.existeMaisPensamentos = false;
          }
        }
      });
  }
}
