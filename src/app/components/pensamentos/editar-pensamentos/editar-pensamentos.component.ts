import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../../pensamento/pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-pensamentos',
  templateUrl: './editar-pensamentos.component.html',
  styleUrls: ['./editar-pensamentos.component.scss'],
})
export class EditarPensamentosComponent implements OnInit {
  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
  };

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getPensamentoPorId(parseInt(id)).subscribe((res) => {
        if (res.body) {
          this.pensamento = res.body;
        }
      });
    }
  }
  editarPensamento() {
    this.service.updatePensamento(this.pensamento).subscribe((res) => {
      if (res.status == 200) {
        alert('Pensamento editado com sucesso!');
        this.router.navigate(['/']);
      }
    });
  }

  cancelarPensamento() {
    alert('Pensamento cancelado com sucesso!');
    this.router.navigate(['/']);
  }
}
