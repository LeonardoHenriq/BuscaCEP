import { Component, OnInit , NgModuleRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Dados } from '../Models/Dados';
import {DadosService} from '../services/Dados.service';


@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.css']
})
export class CepComponent implements OnInit {

  public dados : Dados[];
  public dadosForm : FormGroup;
  public modeSave = 'post';
  public dadosSelecionados : Dados;
  public bcep :string;
  private unsubscriber = new Subject();



  constructor(private fb: FormBuilder,
    private dadosService : DadosService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
    this.criarForm();
   }

   criarForm() {
    this.dadosForm = this.fb.group({
      cep:['',Validators.required],
      logradouro:[''],
      complemento:[''],
      bairro:[''],
      localidade:[''],
      uf:[''],
      ibge:[''],
      gia:[''],
      ddd:[''],
      siafi:['']
     });
  }

  buscaCEP(){
    this.spinner.show();
     this.dadosService.getByCep(this.bcep)
     .pipe(takeUntil(this.unsubscriber))
     .subscribe(
       (dados:Dados[])=>{
       this.dados = dados;
       console.log(dados);
       this.dadosForm.patchValue(dados);
     },
     (error:any)=>{
       console.log(error);
       this.toastr.success('CEP não encontrado!');
       this.criarForm()
     },() => this.spinner.hide()
     );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}
