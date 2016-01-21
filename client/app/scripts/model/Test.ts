/// <reference path='Model.ts' />
/// <reference path='Case.ts' />

'use strict';

module Model {
  export class Test {
    private id:string;
    private name:string;
    private created:Date;
    private status:string;
    private owner:string;
    private updated:string;
    private description:string;
    private cases:any[];

    //Constructor
    constructor(name:string, status:string, created?:Date, description?:string, updated?:string, cases?:any[], id?:string, owner?:string) {
      //Required
      this.name = name;
      this.status = status;
      //Not Required
      this.id = id;
      this.owner = owner;
      this.created = created;
      this.description = description;
      this.updated = updated;
      this.cases = cases;
    }

    //Getters
    public getId ():           string   {return this.id}
    public getName ():         string   {return this.name}
    public getCreated ():      Date     {return this.created}
    public getStatus ():       string   {return this.status}
    public getOwner ():        string   {return this.owner}
    public getUpdated ():      string   {return this.updated}
    public getDescription ():  string   {return this.description}
    public getCases ():        any[]    {return this.cases}

    //Setters
    public setId          (id          : string) {this.id = id;}
    public setName        (name        : string) {this.name = name;}
    public setCreated     (created     : Date)   {this.created = created;}
    public setStatus      (status      : string) {this.status = status;}
    public setOwner       (owner       : string) {this.owner = owner;}
    public setUpdated     (updated     : string) {this.updated = updated;}
    public setDescription (description : string) {this.description = description;}
    public setCases       (cases       : any[])  {this.cases = cases;}

    //function to convert to JSON from Object
    public toString ()  : string {

      let str: string = '{';


      if(this.name){
        str+='"name"'+ ': ';
        if(this.name === null || this.name === undefined){
          str+=this.name;
        } else {
          str+= '"'+ this.name + '"';
        }
      }
      if(this.id){
        str+=', "id"'+ ': ';
        if(this.id === null || this.id === undefined){
          str+=this.id;
        } else {
          str+= '"'+ this.id + '"';
        }
      }
      if(this.status){
        str+=', "status"'+ ': ';
        if(this.status === null || this.status === undefined){
          str+=this.status;
        } else {
          str+= '"'+ this.status + '"';
        }
      }
      if(this.created){
        str+=', "created"'+ ': ';
        if(this.created === null || this.created === undefined){
          str+=this.created;
        } else {
          str+= '"'+ this.created + '"';
        }
      }
      if(this.description){
        str+=', "description"'+ ': ';
        if(this.description === null || this.description === undefined){
          str+=this.description;
        } else {
          str+= '"'+ this.description + '"';
        }
      }
      if(this.owner){
        str+=', "owner"'+ ': ';
        if(this.owner === null || this.owner === undefined){
          str+=this.owner;
        } else {
          str+= '"'+ this.owner + '"';
        }
      }
      if(this.updated){
        str+=', "updated"'+ ': ';
        if(this.updated === null || this.updated === undefined){
          str+=this.updated;
        } else {
          str+= '"'+ this.updated + '"';
        }
      }
      if (this.cases) {
        if (this.cases.length === 1) {
          str += ', "cases"' + ': "' + this.cases[0] + '"';
        }
        else {
          str += ', "cases":[';
          for (let i:number = 0, len:number = this.cases.length; i < len; i += 1) {
            str += '"' + this.cases[i] + '"';
            if(i - 1 != len) str+= ', ';
            //str += (i - 1 === len) ? ']' : ', ';
          }
          str+=']';
        }
      }

      str+='}';

      return str
    }

    private dateFormatter(d): string {
      function pad(n){
        return n < 10 ? '0'+n : n
      }
      var result: string = d.getUTCFullYear()+'-'
        + pad(d.getUTCMonth()+1)+'-'
        + pad(d.getUTCDate())+'T'
        + pad(d.getUTCHours())+':'
        + pad(d.getUTCMinutes())+':'
        + pad(d.getUTCSeconds());

      return result
    }

    public static fromJson(o: any) {
      let id:string = null,
          name:string,
          created:Date,
          status:string,
          updated:string,
          description:string,
          owner:string,
          cases:any[];


      if(o){
        if (o.hasOwnProperty('id') && o.id) {
          if (typeof o.id !== 'string') {
            throw new Error('2016');
          } else {
            id = o.id;
          }
        } //else {throw new Error('2022')}


        if (o.hasOwnProperty('name') && o.name) {
          if (typeof o.name !== 'string') {
            throw new Error('2017');
          } else {
            name = o.name;
          }
        } else {
          throw new Error('2023');
        }


        if (o.hasOwnProperty('created') && o.created) {
          if (Object.prototype.toString.call(o.created) === '[object Number]') {
            created = new Date(o.created);
          } else {
            throw new Error('2018');
          }
        } //else {throw new Error('2024')}


        if (o.hasOwnProperty('status') && o.status) {
          if (typeof o.status !== 'string') {
            throw new Error('2019');
          } else {
            status = o.status;
          }
        } else {
          throw new Error('2025')
        }


        if (o.hasOwnProperty('updated') && o.updated) {
          if (typeof o.updated !== 'string') {
            throw new Error('2020');
          } else {
            updated = o.updated;
          }
        }


        if (o.hasOwnProperty('description') && o.description) {
          if (typeof o.description !== 'string') {
            throw new Error('2022');
          } else {
            description = o.description;
          }
        }


        if (o.hasOwnProperty('owner') && o.owner) {
          if (typeof o.owner !== 'string') {
            throw new Error('2048');
          } else {
            owner = o.owner;
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
        name,
        status,
        created,
        description,
        updated,
        cases,
        id,
        owner)
    }
  }
}
