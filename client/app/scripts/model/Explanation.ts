/// <reference path="Model.ts" />s

'use strict';

module Model {
  export class Explanation {
    private code    : string;
    private message : string;
    //private context : Model.Bits;

    constructor(code:string, message:string/*, context?:Model.Bits*/) {
      this.code    = code;
      this.message = message;
      //this.context = context;
    }

    public getCode()    : string     { return this.code;    }
    public getMessage() : string     { return this.message; }
    //public getContext() : Model.Bits { return this.context; }

    public static fromJson(o:any) : Model.ServiceError {
      let code    : string,
        message : string/*,
        context : Model.Bits*/;

      if (o) {
        if (o.hasOwnProperty('code'))    { code    = o.code;    } else { throw new Error('Expected Property "code"'); }
        if (o.hasOwnProperty('message')) { message = o.message; } else { throw new Error('Expected Property "message"'); }
        //if (o.hasOwnProperty('context')) { context = o.context; }
      }

      return new Model.ServiceError(
        code,
        message/*,
        context*/
      );
    }
  }
}
