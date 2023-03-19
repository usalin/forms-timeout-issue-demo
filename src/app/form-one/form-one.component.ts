import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Entity } from '../entity';

@Component({
  selector: 'app-form-one',
  templateUrl: './form-one.component.html',
  styleUrls: ['./form-one.component.scss']
})
export class FormOneComponent {
  
  @Input() set entity(entity: Entity | undefined | null) {
    if (entity != undefined || entity != null) {
     this.form.reset(entity);
     } 
   //  else this.form.reset();
   }
 
   form = new FormGroup({
     description: new FormControl('', [Validators.required]),
     title: new FormControl('', [Validators.required]),
     featOne: new FormControl('', [Validators.required]),
     fixOne: new FormControl('', [Validators.required]),
     commonGroup: new FormGroup({
      commonOne: new FormControl('', Validators.required),
      commonTwo: new FormControl('', Validators.required),
      commonThree: new FormControl('', Validators.required)

    })});
 
   get commonGroup() { return this.form.get('commonGroup') as FormGroup; }
}
