import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../../pensamento/pensamento';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.scss'],
})
export class CriarPensamentoComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: PensamentoService,
    private router: Router
  ) {}

  lowercaseValidator(control: AbstractControl) {
    const value = control.value;
    if (value !== value.toLowerCase()) {
      return { lowercase: true };
    }
    return null;
  }

  criarPensamento() {
    console.log(this.formulario.get('autoria')?.errors);
    if (this.formulario.valid) {
      this.service.createPensamento(this.formulario.value).subscribe((_) => {
        alert('Pensamento criado com sucesso!');
        this.router.navigate(['/']);
      });
    } else {
      alert('Escreva tudo');
    }
  }

  cancelarPensamento() {
    alert('Pensamento cancelado com sucesso!');
    this.router.navigate(['/']);
  }

  habilitarBotao(): string {
    console.log(this.formulario.valid);
    if (this.formulario.valid) {
      return 'botao';
    }
    return 'botao__desabilitado';
  }

  ngOnInit(): void {
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
            // this.lowercaseValidator,
          ]),
        ],
      ],
      modelo: ['modelo1'],
    });
  }
}
