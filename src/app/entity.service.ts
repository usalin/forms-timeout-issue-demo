
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Entity } from './entity';

export const mockEntity: Entity = { id: 1, type: 'typeOne', description: 'description', title: 'title', featOne: 'feature one', fixOne: 'fixOne',
commonOne: 'commonOne', commonTwo: 'commonTwo', commonThree: 'commonThree' }

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  private activeEntity = new BehaviorSubject<Entity>(mockEntity)
  activeEntity$ = this.activeEntity.asObservable();

  private updateSuccesful = new BehaviorSubject<boolean>(false);
  updateSuccesful$ = this.updateSuccesful.asObservable();

  updateEntity(entity: Entity) {
    this.activeEntity.next(entity);
    this.updateSuccesful.next(true)
  }
}
