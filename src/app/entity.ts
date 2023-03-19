export interface Entity {
    id?: number;
    type: 'typeOne' | 'typeTwo' ;
    description: string;
    title: string;
    featOne?: string;
    fixOne?: string;
    featTwo?: string;
    fixTwo?: string;
    commonOne: string;
    commonTwo: string;
    commonThree: string;
}