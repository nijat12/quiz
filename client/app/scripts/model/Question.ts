/// <reference path='Model.ts' />

'use strict';

module Model{
  export class Question {
    private id           : string;
    private label        : string;
    private description  : string;
    private date         : Date;
    private type         : string;
    private configuration: any[];

    //Constructors
    constructor(label:string, description:string, type:string, configuration:any[], id?:string, date?:Date) {
      this.id            = id;
      this.label         = label;
      this.description   = description;
      this.date          = date;
      this.type          = type;
      this.configuration = configuration;
    }

    //Getters
    public getId             (): string   { return this.id}
    public getLabel          (): string   { return this.label}
    public getDescription    (): string   { return this.description}
    public getDate           (): Date     { return this.date}
    public getType           (): string   { return this.type}
    public getConfiguration  (): any[]    { return this.configuration}

    //Setters
    public setLabel          (label        : string)      { this.label  = label}
    public setDescription    (description  : string)      { this.description  = description}
    public setType           (type         : string)      { this.type   = type}
    public setConfiguration  (configuration: any[] )      { this.configuration = configuration}


    //function to convert to JSON from Object
    public toString ()  : string {

      let str: string = '{' + '"id"'         + ': "' + this.id          + '", ' +
                              '"label"'      + ': "' + this.label       + '", ' +
                              '"description"'+ ': "' + this.description + '", ' +
                              '"date"'       + ': "' + this.date        + '", ' +
                              '"type"'       + ': "' + this.type        + '", ';

      if(this.configuration.length === 1){
        str += '"configuration"'      + ': "' + this.configuration[0] + '"}';
      }
      else {
        str += '"configuration":[';
        for (let i: number = 0, len: number = this.configuration.length; i < len; i+=1){
          str += '"'+ this.configuration[i] +'"';
          //if(i - 1 === len){
          //  str += ']}';
          //}
          //else {
          //  str += ', ';
          //}

          str += (i - 1 === len) ? ']}' : ', ';
        }
      }

      return str
    }

    public static fromJson(o: any) {
      let id            : string,
          label         : string,
          description   : string,
          date          : Date,
          type          : string,
          configuration : any[];

      if(o) {

        if(o.hasOwnProperty('id') && o.id){
          if (typeof o.id !== 'string') {throw new Error('id from JSON has to be a String');}
          else { id = o.id; }
        }


        if(o.hasOwnProperty('label') && o.label){
          if (typeof o.label !== 'string') {throw new Error('label from JSON has to be a String');}
          else { label = o.label; }
        }
        else { throw new Error('Missing label from JSON');}


        if(o.hasOwnProperty('description') && o.description){
          if (typeof o.description !== 'string') {throw new Error('description from JSON has to be a String');}
          else { description = o.description; }
        }
        else { throw new Error('Missing description from JSON');}


        if(o.hasOwnProperty('date') && o.date){
          if (o.date instanceof Date) {date = o.date;}
          else { throw new Error('date from JSON has to be a Date'); }
        }


        if(o.hasOwnProperty('type') && o.type){
          if (typeof o.type !== 'string') {throw new Error('type from JSON has to be a String')}
          else { type = o.type; }
        }
        else { throw new Error('Missing type from JSON');}


        //Need to figure out a better way of checking if it is a string[]
        if(o.hasOwnProperty('configuration') && o.configuration){
          //if (typeof o.configuration != 'string') {new Model.ServiceError('0001', 'label from Json has to be a String');}
          configuration = o.configuration;
        }
        else { throw new Error('Missing configuration from JSON');}

      }
      else {
        throw new Error('missing the object form JSON');
      }

      return new Model.Question(
        label,
        description,
        type,
        configuration,
        id,
        date
      );
    }
  }
}
