/// <reference path='Model.ts' />
/// <reference path='Explanation.ts' />

'use strict';

module Model{
  export class Question {
    private id           : string;
    private caseId       : string;
    private label        : string;
    private answer       : boolean;
    public  images       : any[];
    public  explanations : any[];

    //Constructors
    constructor(id:string, caseId:string, label?:string, answer?:boolean, images?:any[], explanations?:any[]) {
      this.id            = id || null;
      this.caseId        = caseId;
      this.label         = label || null;
      this.answer        = answer || true;
      this.images        = images || [];
      this.explanations  = explanations || [];
    }

    //Getters
    public getId             (): string   { return this.id}
    public getCaseId         (): string   { return this.caseId}
    public getLabel          (): string   { return this.label}
    public getAnswer         (): boolean  { return this.answer}
    public getImages         (): any[]    { return this.images}
    public getExplanations   (): any[]    { return this.explanations}

    //Setters
    public setId             (id          : string) { this.id  = id}
    public setCaseId         (caseId      : string) { this.caseId  = caseId}
    public setLabel          (label       : string) { this.label  = label}
    public setAnswer         (answer      : boolean){ this.answer  = answer}
    public setImages         (images      : any[])  { this.images = images}
    public setExplanations   (explanations: any[])  { this.explanations = explanations}


    //function to convert to JSON from Object
    public toString ()  : string {

      let str: string = '{';


      if(this.id){
        str+='"id"'+ ': ';
        if(this.id === null || this.id === undefined){
          str+=this.id;
        } else {
          str+= '"'+ this.id + '"';
        }
      }
      if(this.caseId){
        str+=', "caseId"'+ ': ';
        if(this.caseId === null || this.caseId === undefined){
          str+=this.caseId;
        } else {
          str+= '"'+ this.caseId + '"';
        }
      }
      if(this.label){
        str+=', "label"'+ ': ';
        if(this.label === null || this.label === undefined){
          str+=this.label;
        } else {
          str+= '"'+ this.label + '"';
        }
      }
      if(this.answer){
        str+=', "answer"'+ ': ';
        if(this.answer === null || this.answer === undefined){
          str+=this.answer;
        } else {
          str+= '"'+ this.answer + '"';
        }
      }
      if (this.images) {
        if (this.images.length === 1) {
          str += ', "images"' + ': "' + this.images[0] + '"';
        }
        else {
          str += ', "images":[';
          for (let i:number = 0, len:number = this.images.length; i < len; i += 1) {
            str += '"' + this.images[i] + '"';
            if(i - 1 != len) str+= ', ';
          }
          str+=']';
        }
      }
      if (this.explanations) {
        if (this.explanations.length === 1) {
          str += ', "explanations"' + ': "' + this.explanations[0] + '"';
        }
        else {
          str += ', "explanations":[';
          for (let i:number = 0, len:number = this.explanations.length; i < len; i += 1) {
            str += '"' + this.explanations[i] + '"';
            if(i - 1 != len) str+= ', ';
            //str += (i - 1 === len) ? ']}' : ', ';
          }
          str+=']';
        }
      }


      str+='}';

      return str
    }

    public static fromJson(o: any) {
      let id           : string = null,
          caseId       : string,
          label        : string,
          answer       : boolean,
          images       : any[],
          explanations : any[];

      if(o) {

        if(o.hasOwnProperty('id') && o.id){
          if (typeof o.id !== 'string') {throw new Error('2034');}
          else { id = o.id; }
        }

        if(o.hasOwnProperty('caseId') && o.caseId){
          if (typeof o.caseId !== 'string') {throw new Error('2040');}
          else { caseId = o.caseId; }
        }


        if(o.hasOwnProperty('label') && o.label){
          if (typeof o.label !== 'string') {throw new Error('2035');}
          else { label = o.label; }
        }
        //else { throw new Error('2040');}


        if(o.hasOwnProperty('answer')){
          if (typeof o.answer !== 'boolean') {
            throw new Error('2036');
          }
          else {
            answer = o.answer;
          }
        }
        //else throw new Error('2041');


        if(o.hasOwnProperty('images') && o.images){
          if (Object.prototype.toString.call( o.images ) === '[object Array]') {
            images = o.images;
          }
          else throw new Error('2037');
        }


        if(o.hasOwnProperty('explanations') && o.explanations){
          if (Object.prototype.toString.call( o.explanations ) === '[object Array]') {
            explanations = o.explanations;
          }
          else throw new Error('2038');
        }

      }
      else {
        throw new Error('2043');
      }

      return new Model.Question(
        id,
        caseId,
        label,
        answer,
        images,
        explanations
      );
    }
  }
}
