import { CriarPensamentoComponent } from './../criar-pensamento/criar-pensamento.component';
import { Component, OnInit } from '@angular/core';
import { RouterEvent, RouterLink, RouterState } from '@angular/router';
import { PensamentoService } from '../pensamento.service';
import { Pensamento } from '../../pensamento/pensamento';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.scss'],
})
export class ListarPensamentoComponent implements OnInit {
  constructor(private service: PensamentoService) {}
  listaPensamentos: Pensamento[] = [];

  ngOnInit(): void {
    this.service.getPensamentos().subscribe((listaPensamentos) => {
      this.listaPensamentos =
        listaPensamentos.body !== null ? listaPensamentos.body : [];
    });
  }
}
