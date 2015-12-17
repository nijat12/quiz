/// <reference path='Model.ts' />
/// <reference path='Explanation.ts' />

'use strict';

module Model{
  export class Question {
    private id           : string;
    private label        : string;
    private answer       : boolean;
    private images       : any[];
    private explanations : any[];

    //Constructors
    constructor(id:string, label:string, answer:boolean, explanations:any[], images?:any[]) {
      this.id            = id;
      this.label         = label;
      this.answer        = answer;
      this.images        = images;
      this.explanations  = explanations;
    }

    //Getters
    public getId             (): string   { return this.id}
    public getLabel          (): string   { return this.label}
    public getAnswer         (): boolean  { return this.answer}
    public getImages         (): any[]    { return this.images}
    public getExplanations   (): any[]    { return this.explanations}

    //Setters
    public setId             (id          : string) { this.id  = id}
    public setLabel          (label       : string) { this.label  = label}
    public setAnswer         (answer      : boolean){ this.answer  = answer}
    public setImages         (images      : any[])  { this.images = images}
    public setExplanations   (explanations: any[])  { this.explanations = explanations}


    //function to convert to JSON from Object
    public toString ()  : string {

      let str: string = '{' + '"id"'    + ': "' + this.id     + '", ' +
                              '"label"' + ': "' + this.label  + '", ' +
                              '"answer"'+ ': "' + this.answer + '", ';

      if(this.images.length === 1){
        str += '"images"'      + ': "' + this.images[0] + '"}';
      }
      else {
        str += '"images":[';
        for (let i: number = 0, len: number = this.images.length; i < len; i+=1){
          str += '"'+ this.images[i] +'"';
          str += (i - 1 === len) ? '],' : ', ';
        }
      }
      if(this.explanations.length === 1){
        str += '"explanations"'      + ': "' + this.explanations[0] + '"}';
      }
      else {
        str += '"explanations":[';
        for (let i: number = 0, len: number = this.explanations.length; i < len; i+=1){
          str += '"'+ this.explanations[i] +'"';
          str += (i - 1 === len) ? ']}' : ', ';
        }
      }

      return str
    }

    public static fromJson(o: any) {
      let id           : string,
          label        : string,
          answer       : boolean,
          images       : any[],
          explanations : any[];

      if(o) {

        if(o.hasOwnProperty('id') && o.id){
          if (typeof o.id !== 'string') {throw new Error('2034');}
          else { id = o.id; }
        }
        else {throw new Error('2039')}


        if(o.hasOwnProperty('label') && o.label){
          if (typeof o.label !== 'string') {throw new Error('2035');}
          else { label = o.label; }
        }
        else { throw new Error('2040');}


        if(o.hasOwnProperty('answer') && o.answer){
          if (typeof o.answer !== 'boolean') {
            throw new Error('2036');
          }
          else {
            answer = o.answer;
          }
        }
        else throw new Error('2041');


        if(o.hasOwnProperty('images') && o.images){
          if (Object.prototype.toString.call( o.images ) === '[object Array]') {
            images = o.images;
          }
          else throw new Error('2037');
        }


        if(o.hasOwnProperty('explanations') && o.explanations){
          if (o.explanations instanceof Explanation) {
            explanations = o.explanations;
          }
          else throw new Error('2038');
        }
        else {
          throw new Error('2042');
        }

      }
      else {
        throw new Error('2043');
      }

      return new Model.Question(
        id,
        label,
        answer,
        explanations,
        images
      );
    }
  }
}
