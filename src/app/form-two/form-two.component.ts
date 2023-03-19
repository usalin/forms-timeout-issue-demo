import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Entity } from '../entity';

@Component({
  selector: 'app-form-two',
  templateUrl: './form-two.component.html',
  styleUrls: ['./form-two.component.scss']
})
export class FormTwoComponent {
  @Input() set entity(entity: Entity | undefined | null) {
    if (entity != undefined || entity != null) {
     this.form.reset(entity);
     } 
   //  else this.form.reset();
   }
 
   form = new FormGroup({
     description: new FormControl('', [Validators.required]),
     title: new FormControl('', [Validators.required]),
     featTwo: new FormControl('', [Validators.required]),
     fixTwo: new FormControl('', [Validators.required]),
     commonGroup: new FormGroup({
      commonOne: new FormControl('', Validators.required),
      commonTwo: new FormControl('', Validators.required),
      commonThree: new FormControl('', Validators.required)

    })});
 
   get commonGroup() { return this.form.get('commonGroup') as FormGroup; }
}
