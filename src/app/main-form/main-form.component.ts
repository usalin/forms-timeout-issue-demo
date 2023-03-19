import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription, take } from 'rxjs';
import { Entity } from '../entity';
import { EntityService } from '../entity.service';
import { FormOneComponent } from '../form-one/form-one.component';
import { FormTwoComponent } from '../form-two/form-two.component';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainFormComponent {

  @ViewChild(FormOneComponent) formOneComponent?: FormOneComponent;
  @ViewChild(FormTwoComponent) formTwoComponent?: FormTwoComponent;

  /* OBSERVABLES */
  activeEntityInfo$: Observable<Entity | undefined> = this.entityService.activeEntity$;

  /* FORMCONTROLS */
  componentType = new FormControl();

  /* VARIABLES */
  activeForm?: FormGroup | null;
  hideButton : boolean = false;
    
  constructor(private entityService: EntityService) { }
 

  ngOnInit(): void {
    this.activeEntityInfo$.pipe(
      take(1)).subscribe(entity => {
        console.log(entity)
       this.initialise(entity!);
    });
    this.componentType.valueChanges
    .subscribe((type) => 
    {  this.hideButton = true;
      setTimeout(() => this.setActiveForm(), 5 )})

    this.entityService.updateSuccesful$
    .subscribe((action: any) => {
      this.activeForm?.reset();
      console.log('active form dirty?', this.activeForm?.dirty)
      console.log('active form invalid?', this.activeForm?.invalid)
      this.activeForm?.markAsUntouched();
      const result = this.activeForm?.invalid || !(this.activeForm?.touched);
      console.log(result);
      // this.hideButton = true;
    })
  }

  initialise(entity: Entity) {
    this.componentType.setValue(entity?.type);
    setTimeout(() => this.setActiveForm(), 5);
  }

  setActiveForm() {
    const activeComponent = this.componentType.value === 'typeOne' ? this.formOneComponent : this.formTwoComponent;
    this.activeForm = activeComponent?.form;
    // const controls = (this.activeForm?.controls!);
    // this.enableSaveButtonOnChanges(controls);
  }

  // enableSaveButtonOnChanges(controls: any) {
  //   Object.keys(controls).forEach(element => {
  //      this.activeForm?.get(element)?.valueChanges
  //      .subscribe(() => { 
  //       this.hideButton = false;
  //     })
  //   });
  // }
  
  updateEntity() {
    const activeForm = this.activeForm;
    const entity =  {insuredType: this.componentType.value, ...activeForm!.value } as Entity;
    this.entityService.updateEntity(entity);

  }

}
