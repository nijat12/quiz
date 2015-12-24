/// <reference path='Model.ts' />
/// <reference path='Case.ts' />

'use strict';

module Model {
  export class Test {
    private id:string;
    private name:string;
    private created:string;
    private status:string;
    private updated:string;
    private cases:any[];

    //Constructor
    constructor(id:string, name:string, created:string, status:string, updated?:string, cases?:any[]) {
      //Required
      this.id = id;
      this.name = name;
      this.created = created;
      this.status = status;
      //Not Required
      this.updated = updated;
      this.cases = cases;
    }

    //Getters
    public getId ():           string   {return this.id}
    public getName ():         string   {return this.name}
    public getCreated ():      string   {return this.created}
    public getStatus ():       string   {return this.status}
    public getUpdated ():      string   {return this.updated}
    public getCases ():        any[]    {return this.cases}

    //Setters
    public setId       (id       : string) : string {return this.id}
    public setName     (name     : string) : string {return this.name}
    public setCreated  (created  : string) : string {return this.created}
    public setStatus   (status   : string) : string {return this.status}
    public setUpdated  (updated  : string) : string {return this.updated}
    public setCases    (cases    : any[])  : any[]  {return this.cases}

    //function to convert to JSON from Object
    public toString ()  : string {

      let str: string = '{' +
        '"id"'        + ': "' + this.id      + '", ' +
        '"name"'      + ': "' + this.name    + '", ' +
        '"created"'   + ': "' + this.created + '", ' +
        '"status"'    + ': "' + this.status  + '", ' +
        '"updated"'   + ': "' + this.updated + '", ';

      if(this.cases.length === 1){
        str += '"cases"'      + ': "' + this.cases[0] + '"}';
      }
      else {
        str += '"cases":[';
        for (let i: number = 0, len: number = this.cases.length; i < len; i+=1){
          str += '"'+ this.cases[i] +'"';
          str += (i - 1 === len) ? ']}' : ', ';
        }
      }

      return str
    }

    public static fromJson(o: any) {
      let id:string,
          name:string,
          created:string,
          status:string,
          updated:string,
          cases:any[];


      if(o){
        if (o.hasOwnProperty('id') && o.id) {
          if (typeof o.id !== 'string') {
            throw new Error('2016');
          } else {
            id = o.id;
          }
        } else {throw new Error('2022')}


        if (o.hasOwnProperty('name') && o.name) {
          if (typeof o.name !== 'string') {
            throw new Error('2017');
          } else {
            name = o.name;
          }
        } else {throw new Error('2023')}


        if (o.hasOwnProperty('created') && o.created) {
          if (typeof o.created !== 'string') {
            throw new Error('2018');
          } else {
            created = o.created;
          }
        } else {throw new Error('2024')}


        if (o.hasOwnProperty('status') && o.status) {
          if (typeof o.status !== 'string') {
            throw new Error('2019');
          } else {
            status = o.status;
          }
        } else {throw new Error('2025')}


        if (o.hasOwnProperty('updated') && o.updated) {
          if (typeof o.updated !== 'string') {
            throw new Error('2020');
          } else {
            updated = o.updated;
          }
        }

        if (o.hasOwnProperty('cases') && o.cases) {
          if (Object.prototype.toString.call( o.cases ) === '[object Array]') {
          //if (o.cases instanceof Case) {
            cases = o.cases;
          } else {
            throw new Error('2021');
          }
        }

      } else {throw new Error('2026')}

      return new Model.Test(
        id,
        name,
        created,
        status,
        updated,
        cases)
    }
  }
}
