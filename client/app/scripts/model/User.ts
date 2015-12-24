/// <reference path='Model.ts' />
/// <reference path='Test.ts' />

'use strict';

module Model {
  export class User {
    private id:string;
    private firstName:string;
    private lastName:string;
    private userName:string;
    private institutions:string;
    private address:string;
    private state:string;
    private zip:string;
    private roles:string[];
    private tests:any[];

    //Constructor
    constructor(id:string, firstName:string, lastName:string, userName:string, roles:string[], institutions?:string, address?:string, state?:string, zip?:string, tests?:any[]) {
      // Required
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.userName = userName;
      this.roles = roles;
      // Not Required
      this.institutions = institutions;
      this.address = address;
      this.state = state;
      this.zip = zip;
      this.tests = tests;
    }

    //Getters
    public getId ():           string   {return this.id}
    public getFirstName ():    string   {return this.firstName}
    public getLastName ():     string   {return this.lastName}
    public getUserName ():     string   {return this.userName}
    public getRoles ():        string[] {return this.roles}
    public getInstitutions (): string   {return this.institutions}
    public getAddress ():      string   {return this.address}
    public getState ():        string   {return this.state}
    public getZip ():          string   {return this.zip}
    public getTests ():        any[]    {return this.tests}

    //Setters
    public setId           (id          : string)   : string   {return this.id}
    public setFirstName    (firstName   : string)   : string   {return this.firstName}
    public setLastName     (lastName    : string)   : string   {return this.lastName}
    public setUserName     (userName    : string)   : string   {return this.userName}
    public setRoles        (roles       : string[]) : string[] {return this.roles}
    public setInstitutions (institutions: string)   : string   {return this.institutions}
    public setAddress      (address     : string)   : string   {return this.address}
    public setState        (state       : string)   : string   {return this.state}
    public setZip          (zip         : string)   : string   {return this.zip}
    public setTests        (tests       : any[])    : any[]    {return this.tests}

    //function to convert to JSON from Object
    public toString ()  : string {

      let str: string = '{' +
        '"id"'             + ': "' + this.id           + '", ' +
        '"firstName"'      + ': "' + this.firstName    + '", ' +
        '"lastName"'       + ': "' + this.lastName     + '", ' +
        '"userName"'       + ': "' + this.userName     + '", ' ;

      if(this.roles.length === 1){
        str += '"roles"'      + ': "' + this.roles[0] + '"}';
      }
      else {
        str += '"roles":[';
        for (let i: number = 0, len: number = this.roles.length; i < len; i+=1){
          str += '"'+ this.roles[i] +'", ';
          str += (i - 1 === len) ? '],' : ', ';
        }
      }

      str += '"institutions"'   + ': "' + this.institutions + '", ' +
        '"address"'        + ': "' + this.address      + '", ' +
        '"state"'          + ': "' + this.state        + '", ' +
        '"zip"'            + ': "' + this.zip          + '", ';

      if(this.tests.length === 1){
        str += '"tests"'      + ': "' + this.tests[0] + '"}';
      }
      else {
        str += '"tests":[';
        for (let i: number = 0, len: number = this.tests.length; i < len; i+=1){
          str += '"'+ this.tests[i] +'"';
          str += (i - 1 === len) ? ']}' : ', ';
        }
      }

      return str
    }

    public static fromJson(o: any) {
      let id:string,
          firstName:string,
          lastName:string,
          userName:string,
          institutions:string,
          address:string,
          state:string,
          zip:string,
          roles:string[],
          tests:any[];


      if(o){
        if (o.hasOwnProperty('id') && o.id) {
          if (typeof o.id !== 'string') {
            throw new Error('2000');
          } else {
            id = o.id;
          }
        } else {throw new Error('2010')}


        if (o.hasOwnProperty('firstName') && o.firstName) {
          if (typeof o.firstName !== 'string') {
            throw new Error('2001');
          } else {
            firstName = o.firstName;
          }
        } else {throw new Error('2011')}


        if (o.hasOwnProperty('lastName') && o.lastName) {
          if (typeof o.lastName !== 'string') {
            throw new Error('2002');
          } else {
            lastName = o.lastName;
          }
        } else {throw new Error('2012')}


        if (o.hasOwnProperty('userName') && o.userName) {
          if (typeof o.userName !== 'string') {
            throw new Error('2003');
          } else {
            userName = o.userName;
          }
        } else {throw new Error('2013')}


        if (o.hasOwnProperty('roles') && o.roles) {
          if (Object.prototype.toString.call( o.roles ) !== '[object Array]') {
            throw new Error('2008');
          } else {
            roles = o.roles;
          }
        } else {throw new Error('2014')}


        if (o.hasOwnProperty('institutions') && o.institutions) {
          if (typeof o.institutions !== 'string') {
            throw new Error('2004');
          } else {
            institutions = o.institutions;
          }
        }


        if (o.hasOwnProperty('address') && o.address) {
          if (typeof o.address !== 'string') {
            throw new Error('2005');
          } else {
            address = o.address;
          }
        }


        if (o.hasOwnProperty('state') && o.state) {
          if (typeof o.state !== 'string') {
            throw new Error('2006');
          } else {
            state = o.state;
          }
        }


        if (o.hasOwnProperty('zip') && o.zip) {
          if (typeof o.zip !== 'string') {
            throw new Error('2007');
          } else {
            zip = o.zip;
          }
        }

        if (o.hasOwnProperty('tests') && o.tests) {
          if (Object.prototype.toString.call( o.tests ) === '[object Array]') {
          //if (o.tests instanceof Test) {
            tests = o.tests;
          } else {
            throw new Error('2009');
          }
        }

      } else {throw new Error('2015')}

      return new Model.User(
        id,
        firstName,
        lastName,
        userName,
        roles,
        institutions,
        address,
        state,
        zip,
        tests)
    }
  }
}
