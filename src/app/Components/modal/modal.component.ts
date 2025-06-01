import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input({required:true}) modalId:string = '';
  @Input() inPosts:boolean = false;
  @Input({required:false}) buttonContent!:string;
  @Input({required:true}) modelTitle!:string;
  
}
