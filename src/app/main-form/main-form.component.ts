import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
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
  private destroy$ = new Subject();

  /* FORMCONTROLS */
  componentType = new FormControl();

  /* VARIABLES */
  activeForm?: FormGroup | null;

  constructor(private entityService: EntityService) {}

  ngOnInit(): void {
    this.activeEntityInfo$
      .pipe(takeUntil(this.destroy$))
      .subscribe((entity) => {
        this.initialise(entity!);
      });

    this.componentType.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((type) => {
       setTimeout(() => this.setActiveForm(), 5);
      });

    this.entityService.updateSuccesful$
    .pipe(takeUntil(this.destroy$))
    .subscribe((action: any) => {
      this.activeForm?.reset();
    });
  }

  initialise(entity: Entity) {
    this.componentType.setValue(entity?.type);
    this.setActiveForm();
    setTimeout(() => this.setActiveForm(), 5);
  }

  setActiveForm() {
    const activeComponent = this.componentType.value === 'typeOne' ? this.formOneComponent : this.formTwoComponent;
    this.activeForm = activeComponent?.form;
  }

  updateEntity() {
    const entity = {
      type: this.componentType.value,
      ...this.activeForm!.value,
    } as Entity;
    this.entityService.updateEntity(entity);
  }
}
