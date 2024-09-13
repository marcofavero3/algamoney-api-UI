import { Component, Input } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Adicionando o CommonModule
import { Contato } from '../../core/model';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  standalone: true,
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css'],
  imports: [FormsModule, CommonModule]  // Importando FormsModule e CommonModule
})
export class PessoaCadastroContatoComponent {
  @Input() contatos: Contato[] = [];
  exibindoFormularioContato = false;
  contato: Contato = new Contato();  // Sempre inicializando o contato
  contatoIndex?: number;

  prepararNovoContato() {
    this.exibindoFormularioContato = true;
    this.contato = new Contato();  // Cria um novo contato vazio
    this.contatoIndex = this.contatos.length;
  }

  prepararEdicaoContato(contato: Contato, index: number) {
    this.contato = { ...contato };  // Clona o contato para edição
    this.exibindoFormularioContato = true;
    this.contatoIndex = index;
  }

  confirmarContato(frm: NgForm) {
    if (this.contatoIndex !== undefined) {
      this.contatos[this.contatoIndex] = { ...this.contato };
    }
    this.exibindoFormularioContato = false;
    frm.resetForm();  // Limpa o formulário
  }

  removerContato(index: number) {
    this.contatos.splice(index, 1);
  }

  get editando(): boolean {
    return !!this.contato.codigo;
  }
}
