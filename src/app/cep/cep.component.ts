import { Component, OnInit , NgModuleRef} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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



  constructor(private fb: FormBuilder,private dadosService : DadosService) {
    this.criarForm();
   }

   criarForm() {
    this.dadosForm = this.fb.group({
      cep:[''],
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
     this.dadosService.getByCep(this.bcep).
     subscribe(
       (dados:Dados[])=>{
       this.dados = dados;
       console.log(dados);
       this.dadosForm.patchValue(dados);
     },
     (error:any)=>{
       console.log(error);
     });
  }

  ngOnInit(): void {
  }

}
