/// <reference path='Model.ts' />
/// <reference path='Question.ts' />

'use strict';

module Model {
  export class Tag {
    private id:string;
    private name:string;

    //Constructor
    constructor(id:string, name?:string) {
      //Required
      this.id = id || null;
      //Not Required
      this.name = name;
    }

    //Getters
    public getId ():           string   {return this.id}
    public getName ():         string   {return this.name}

    //Setters
    public setId          (id           : string)  { this.id = id}
    public setName        (name         : string)  { this.name = name}

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

      if(this.name){
        str+=', "name"'+ ': ';
        if(this.name === null || this.name === undefined){
          str+=this.name;
        } else {
          str+= '"'+ this.name + '"';
        }
      }

      str+='}';

      return str
    }

    public static fromJson(o: any) {
      let id:string = null,
          name:string;


      if(o){
        if (o.hasOwnProperty('id') && o.id) {
          if (typeof o.id !== 'string') {
            throw new Error('2050');
          } else {
            id = o.id;
          }
        }


        if (o.hasOwnProperty('name') && o.name) {
          if (typeof o.name !== 'string') {
            throw new Error('2042');
          } else {
            name = o.name;
          }
        }

      } else {throw new Error('2033')}

      return new Model.Tag(
        id,
        name)
    }
  }
}
