/// <reference path='Model.ts' />
/// <reference path='Question.ts' />

'use strict';

module Model {
  export class Case {
    private id:string;
    private status:boolean;
    private images:any[];
    private questions:any[];

    //Constructor
    constructor(id:string, status:boolean, images?:any[], questions?:any[]) {
      //Required
      this.id = id;
      this.status = status;
      //Not Required
      this.images = images;
      this.questions = questions;
    }

    //Getters
    public getId ():           string   {return this.id}
    public getStatus ():       boolean  {return this.status}
    public getImages ():       any[]    {return this.images}
    public getQuestions ():    any[]    {return this.questions}

    //Setters
    public setId       (id       : string) : string {return this.id}
    public setStatus   (status   : boolean): boolean{return this.status}
    public setImages   (images   : any[])  : any[]  {return this.images}
    public setQuestions(questions: any[])  : any[]  {return this.questions}

    //function to convert to JSON from Object
    public toString ()  : string {

      let str: string = '{' +
        '"id"'        + ': "' + this.id       + '", ' +
        '"status"'    + ': "' + this.status   + '", ';

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
      if(this.questions.length === 1){
        str += '"questions"'      + ': "' + this.questions[0] + '"}';
      }
      else {
        str += '"questions":[';
        for (let i: number = 0, len: number = this.questions.length; i < len; i+=1){
          str += '"'+ this.questions[i] +'"';
          str += (i - 1 === len) ? ']}' : ', ';
        }
      }

      return str
    }

    public static fromJson(o: any) {
      let id:string,
          status:boolean,
          images:any[],
          questions:any[];


      if(o){
        if (o.hasOwnProperty('id') && o.id) {
          if (typeof o.id !== 'string') {
            throw new Error('2027');
          } else {
            id = o.id;
          }
        } else {throw new Error('2031')}


        if (o.hasOwnProperty('status')) {
          if (typeof o.status !== 'boolean') {
            throw new Error('2028');
          } else {
            status = o.status;
          }
        } else {throw new Error('2032')}


        if (o.hasOwnProperty('images') && o.images) {
          if (Object.prototype.toString.call( o.images ) !== '[object Array]') {
            throw new Error('2029');
          } else {
            images = o.images;
          }
        }

        if (o.hasOwnProperty('questions') && o.questions) {
          if (o.questions instanceof Question) {
            throw new Error('2030');
          } else {
            questions = o.questions;
          }
        }

      } else {throw new Error('2033')}

      return new Model.Case(
        id,
        status,
        images,
        questions)
    }
  }
}
