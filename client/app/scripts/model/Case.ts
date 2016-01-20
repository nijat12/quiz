/// <reference path='Model.ts' />
/// <reference path='Question.ts' />

'use strict';

module Model {
  export class Case {
    private id:string;
    private quizId:string;
    private name:string;
    private description:string;
    private status:string;
    public images:any[];
    public questions:any[];
    public tags:any[];

    //Constructor
    constructor(id:string, quizId?:string, name?:string, description?:string, status?:string, images?:any[], questions?:any[], tags?:any[]) {
      //Required
      this.id = id || null;
      //Not Required
      this.quizId = quizId;
      this.name = name;
      this.description = description;
      this.status = status;
      this.images = images || [];
      this.questions = questions || [];
      this.tags = tags || [];
    }

    //Getters
    public getId ():           string   {return this.id}
    public getQuizId ():       string   {return this.quizId}
    public getName ():         string   {return this.name}
    public getDescription ():  string   {return this.description}
    public getStatus ():       string   {return this.status}
    public getImages ():       any[]    {return this.images}
    public getQuestions ():    any[]    {return this.questions}
    public getTags ():         any[]    {return this.tags}

    //Setters
    public setId          (id           : string)  { this.id = id}
    public setQuizId      (quizId       : string)  { this.quizId = quizId}
    public setName        (name         : string)  { this.name = name}
    public setDescription (description  : string)  { this.description = description}
    public setStatus      (status       : string)  { this.status = status}
    public setImages      (images       : any[])   { this.images = images}
    public setQuestions   (questions    : any[])   { this.questions = questions}
    public setTags        (tags         : any[])   { this.tags = tags}

    //function to convert to JSON from Object
    public toString ()  : string {

      let str: string = '{' +
        '"id"'        + ': "' + this.id       + '", ' +
        '"quizId"'        + ': "' + this.quizId  + '", ' +
        '"name"'        + ': "' + this.name       + '", ' +
        '"description"' + ': "' + this.description+ '", ' +
        '"status"'    + ': "' + this.status   + '"';

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
      if (this.questions) {
        if (this.questions.length === 1) {
          str += ', "questions"' + ': "' + this.questions[0] + '"';
        }
        else {
          str += ', "questions":[';
          for (let i:number = 0, len:number = this.questions.length; i < len; i += 1) {
            str += '"' + this.questions[i] + '"';
            if(i - 1 != len) str+= ', ';
          }
          str+=']';
        }
      }
      if (this.tags) {
        if (this.tags.length === 1) {
          str += ', "tags"' + ': "' + this.tags[0] + '"';
        }
        else {
          str += ', "tags":[';
          for (let i:number = 0, len:number = this.tags.length; i < len; i += 1) {
            str += '"' + this.tags[i] + '"';
            if(i - 1 != len) str+= ', ';
            //str += (i - 1 === len) ? ']' : ', ';
          }
          str+=']';
        }
      }

      str+='}';

      return str
    }

    public static fromJson(o: any) {
      let id:string = null,
          quizId:string,
          name:string,
          description:string,
          status:string,
          images:any[],
          questions:any[],
          tags:any[];


      if(o){
        if (o.hasOwnProperty('id') && o.id) {
          if (typeof o.id !== 'string') {
            throw new Error('2027');
          } else {
            id = o.id;
          }
        }


        if (o.hasOwnProperty('quizId') && o.quizId) {
          if (typeof o.quizId !== 'string') {
            throw new Error('2024');
          } else {
            quizId = o.quizId;
          }
        }

        if (o.hasOwnProperty('name') && o.name) {
          if (typeof o.name !== 'string') {
            throw new Error('2042');
          } else {
            name = o.name;
          }
        }

        if (o.hasOwnProperty('description') && o.description) {
          if (typeof o.description !== 'string') {
            throw new Error('2047');
          } else {
            description = o.description;
          }
        }


        if (o.hasOwnProperty('status') && o.status) {
          if (typeof o.status !== 'string') {
            throw new Error('2028');
          } else {
            status = o.status;
          }
        } else {
          //throw new Error('2032')
        }


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

        if (o.hasOwnProperty('tags') && o.tags) {
          if (Object.prototype.toString.call( o.tags ) !== '[object Array]') {
            throw new Error('2049');
          } else {
            tags = o.tags;
          }
        }

      } else {throw new Error('2033')}

      return new Model.Case(
        id,
        quizId,
        name,
        description,
        status,
        images,
        questions,
        tags)
    }
  }
}
