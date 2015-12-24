/// <reference path='Model.ts' />
/// <reference path='Case.ts' />
'use strict';
var Model;
(function (Model) {
    var Test = (function () {
        //Constructor
        function Test(id, name, created, status, updated, cases) {
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
        Test.prototype.getId = function () { return this.id; };
        Test.prototype.getName = function () { return this.name; };
        Test.prototype.getCreated = function () { return this.created; };
        Test.prototype.getStatus = function () { return this.status; };
        Test.prototype.getUpdated = function () { return this.updated; };
        Test.prototype.getCases = function () { return this.cases; };
        //Setters
        Test.prototype.setId = function (id) { return this.id; };
        Test.prototype.setName = function (name) { return this.name; };
        Test.prototype.setCreated = function (created) { return this.created; };
        Test.prototype.setStatus = function (status) { return this.status; };
        Test.prototype.setUpdated = function (updated) { return this.updated; };
        Test.prototype.setCases = function (cases) { return this.cases; };
        //function to convert to JSON from Object
        Test.prototype.toString = function () {
            var str = '{' +
                '"id"' + ': "' + this.id + '", ' +
                '"name"' + ': "' + this.name + '", ' +
                '"created"' + ': "' + this.created + '", ' +
                '"status"' + ': "' + this.status + '", ' +
                '"updated"' + ': "' + this.updated + '", ';
            if (this.cases.length === 1) {
                str += '"cases"' + ': "' + this.cases[0] + '"}';
            }
            else {
                str += '"cases":[';
                for (var i = 0, len = this.cases.length; i < len; i += 1) {
                    str += '"' + this.cases[i] + '"';
                    str += (i - 1 === len) ? ']}' : ', ';
                }
            }
            return str;
        };
        Test.fromJson = function (o) {
            var id, name, created, status, updated, cases;
            if (o) {
                if (o.hasOwnProperty('id') && o.id) {
                    if (typeof o.id !== 'string') {
                        throw new Error('2016');
                    }
                    else {
                        id = o.id;
                    }
                }
                else {
                    throw new Error('2022');
                }
                if (o.hasOwnProperty('name') && o.name) {
                    if (typeof o.name !== 'string') {
                        throw new Error('2017');
                    }
                    else {
                        name = o.name;
                    }
                }
                else {
                    throw new Error('2023');
                }
                if (o.hasOwnProperty('created') && o.created) {
                    if (typeof o.created !== 'string') {
                        throw new Error('2018');
                    }
                    else {
                        created = o.created;
                    }
                }
                else {
                    throw new Error('2024');
                }
                if (o.hasOwnProperty('status') && o.status) {
                    if (typeof o.status !== 'string') {
                        throw new Error('2019');
                    }
                    else {
                        status = o.status;
                    }
                }
                else {
                    throw new Error('2025');
                }
                if (o.hasOwnProperty('updated') && o.updated) {
                    if (typeof o.updated !== 'string') {
                        throw new Error('2020');
                    }
                    else {
                        updated = o.updated;
                    }
                }
                if (o.hasOwnProperty('cases') && o.cases) {
                    if (Object.prototype.toString.call(o.cases) === '[object Array]') {
                        //if (o.cases instanceof Case) {
                        cases = o.cases;
                    }
                    else {
                        throw new Error('2021');
                    }
                }
            }
            else {
                throw new Error('2026');
            }
            return new Model.Test(id, name, created, status, updated, cases);
        };
        return Test;
    })();
    Model.Test = Test;
})(Model || (Model = {}));
//# sourceMappingURL=Test.js.map