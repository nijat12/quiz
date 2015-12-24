/// <reference path="Model.ts" />s

'use strict';

module Model {
  export class Explanation {
    private label  : string;
    private images : any[];

    constructor(label:string, images?:any[]) {
      this.label    = label;
      this.images   = images;
    }

    public getLabel()  : string { return this.label;}
    public getImages() : any[]  { return this.images;}


    public setLabel  (label  : string) { this.label  = label}
    public setImages (images : any[])  { this.images = images}

    public static fromJson(o:any) {
      let label   : string,
          images  : any[];

      if (o) {
        if (o.hasOwnProperty('label') && o.label) {
          if (typeof o.label !== 'string') {throw new Error('2044');}
          else label    = o.label;
        }
        else {
          throw new Error('2046');
        }

        if (o.hasOwnProperty('images') && o.images) {
          if (Object.prototype.toString.call( o.images ) === '[object Array]') {
            images = o.images;
          }
          else throw new Error('2045');
        }
      }

      return new Model.Explanation(
        label,
        images
      );
    }
  }
}
