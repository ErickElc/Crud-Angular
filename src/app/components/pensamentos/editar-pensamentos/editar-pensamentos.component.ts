import { Component, OnInit } from '@angular/core';
// import { Pensamento } from '../../pensamento/pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamentos',
  templateUrl: './editar-pensamentos.component.html',
  styleUrls: ['./editar-pensamentos.component.scss'],
})
export class EditarPensamentosComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.formulario = this.formBuilder.group({
      conteudo: [
        '',
        [
          Validators.compose([
            Validators.required,
            Validators.pattern(/(.|\s)*\S(.|\s)*/),
            Validators.minLength(3),
          ]),
        ],
      ],
      autoria: [
        '',
        [
          Validators.compose([
            Validators.required,
            Validators.pattern(/(.|\s)*\S(.|\s)*/),
            Validators.minLength(3),
          ]),
        ],
      ],
      modelo: '',
      favorito: [false],
    });
    if (id) {
      this.service.getPensamentoPorId(parseInt(id)).subscribe((res) => {
        if (res.body) {
          this.formulario.setValue({
            conteudo: res.body.conteudo,
            autoria: res.body.autoria,
            modelo: res.body.modelo,
            favorito: res.body.favorito,
          });
        }
      });
    }
  }
  editarPensamento() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
      this.service
        .updatePensamento({
          id: parseInt(this.route.snapshot.paramMap.get('id')!),
          conteudo: this.formulario.value.conteudo,
          autoria: this.formulario.value.autoria,
          modelo: this.formulario.value.modelo,
          favorito: this.formulario.value.favorito,
        })
        .subscribe((res) => {
          if (res.status == 200) {
            alert('Pensamento editado com sucesso!');
            this.router.navigate(['/']);
          }
        });
    }
  }

  cancelarPensamento() {
    alert('Pensamento cancelado com sucesso!');
    this.router.navigate(['/']);
  }
}
