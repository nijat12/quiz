/// <reference path='Model.ts' />
/// <reference path='Question.ts' />
'use strict';
var Model;
(function (Model) {
    var Tag = (function () {
        //Constructor
        function Tag(id, name) {
            //Required
            this.id = id || null;
            //Not Required
            this.name = name;
        }
        //Getters
        Tag.prototype.getId = function () { return this.id; };
        Tag.prototype.getName = function () { return this.name; };
        //Setters
        Tag.prototype.setId = function (id) { this.id = id; };
        Tag.prototype.setName = function (name) { this.name = name; };
        //function to convert to JSON from Object
        Tag.prototype.toString = function () {
            var str = '{';
            if (this.id) {
                str += '"id"' + ': ';
                if (this.id === null || this.id === undefined) {
                    str += this.id;
                }
                else {
                    str += '"' + this.id + '"';
                }
            }
            if (this.name) {
                str += ', "name"' + ': ';
                if (this.name === null || this.name === undefined) {
                    str += this.name;
                }
                else {
                    str += '"' + this.name + '"';
                }
            }
            str += '}';
            return str;
        };
        Tag.fromJson = function (o) {
            var id = null, name;
            if (o) {
                if (o.hasOwnProperty('id') && o.id) {
                    if (typeof o.id !== 'string') {
                        throw new Error('2050');
                    }
                    else {
                        id = o.id;
                    }
                }
                if (o.hasOwnProperty('name') && o.name) {
                    if (typeof o.name !== 'string') {
                        throw new Error('2042');
                    }
                    else {
                        name = o.name;
                    }
                }
            }
            else {
                throw new Error('2033');
            }
            return new Model.Tag(id, name);
        };
        return Tag;
    })();
    Model.Tag = Tag;
})(Model || (Model = {}));
//# sourceMappingURL=Tags.js.map