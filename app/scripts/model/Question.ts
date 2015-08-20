/// <reference path='Model.ts' />

'use strict';

module Model{
  export class Question {
    private label:   string;
    private type:    string;
    private values:  string[];


      constructor(label:string, type:string, values?:string[]) {
        this.label = label;
        this.type = type;
        this.values = values;
      }

    //Getters
    public getLabel   (): string   { return this.label}
    public getType    (): string   { return this.type}
    public getValues  (): string[] { return this.values}

    //Setters
    public setLabel   (label:  string )   { this.label  = label}
    public setType    (type:   string)    { this.type   = type}
    public setValues  (values: string[])  { this.values = values}


    //function to convert to JSON from Object
    public toString ()  : string {
      let str: string = '{' + '"label"'     + ': "' + this.label    + '", ' +
        '"type"'     + ': "' + this.type     + '", ';

      if(this.values.length === 1){
        str += '"values"'      + ': "' + this.values[0] + '"}';
      }
      else {
        str += '"values":[';
        for (let i: number = 0, len: number = this.values.length; i < len; i+=1){
          str += '"'+ this.values[i] +'"';
          if(i - 1 === len){
            str += ']}';
          }
          else {
            str += ', ';
          }
        }
      }

      return str
    }

    public static fromJson(o: any) {
      let label  : string,
          type   : string,
          values : string[];

      if(o) {

        if(o.hasOwnProperty('label') && o.label){
          if (typeof o.label !== 'string') {throw new Error('label from JSON has to be a String');}
          else { label = o.label; }
        }
        else { throw new Error('Missing label from JSON');}


        if(o.hasOwnProperty('type') && o.type){
          if (typeof o.type !== 'string') {throw new Error('type from JSON has to be a String')}
          else { type = o.type; }
        }
        else { throw new Error('Missing type from JSON');}


        //Need to figure out a better way of checking if it is a string[]
        if(o.hasOwnProperty('values') && o.values){
          //if (typeof o.values != 'string') {new Model.ServiceError('0001', 'label from Json has to be a String');}
          values = o.values;
        }

      }
      else {
        throw new Error('missing the object form JSON');
      }

      return new Model.Question(
        label,
        type,
        values
      );
    }
  }
}
