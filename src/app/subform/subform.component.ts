import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subform',
  templateUrl: './subform.component.html',
  styleUrls: ['./subform.component.scss']
})
export class SubformComponent {

  @Input() form!: FormGroup;

  get line1() { return this.form.get('line1'); }
  get city() { return this.form.get('city'); }
  get state() { return this.form.get('state'); }
  get zipCode(): any { return this.form.get('zipCode'); }
  get country() { return this.form.get('country'); }
  get county() { return this.form.get('county'); }
}
