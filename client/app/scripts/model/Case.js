/// <reference path='Model.ts' />
'use strict';
var Model;
(function (Model) {
    var Case = (function () {
        //Constructor
        function Case(id, status, updated, cases) {
            //Required
            this.id = id;
            this.status = status;
            this.updated = updated;
            this.cases = cases;
        }
        //Getters
        Case.prototype.getId = function () { return this.id; };
        Case.prototype.getStatus = function () { return this.status; };
        Case.prototype.getUpdated = function () { return this.updated; };
        Case.prototype.getCases = function () { return this.cases; };
        //Setters
        Case.prototype.setId = function (id) { return this.id; };
        Case.prototype.setStatus = function (status) { return this.status; };
        Case.prototype.setUpdated = function (updated) { return this.updated; };
        Case.prototype.setCases = function (cases) { return this.cases; };
        //function to convert to JSON from Object
        Case.prototype.toString = function () {
            var str = '{' +
                '"id"' + ': "' + this.id + '", ' +
                '"status"' + ': "' + this.status + '", ' +
                '"updated"' + ': "' + this.updated + '", ' +
                '"cases"' + ': "' + this.cases + '", ';
            return str;
        };
        Case.fromJson = function (o) {
            var id, status, updated, cases;
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
                if (o.hasOwnProperty('status') && o.status) {
                    if (typeof o.status !== 'boolean') {
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
                //Needs work
                if (o.hasOwnProperty('cases') && o.cases) {
                    if (o.cases.constructor !== 'Array') {
                        throw new Error('2021');
                    }
                    else {
                        cases = o.cases;
                    }
                }
            }
            else {
                throw new Error('2026');
            }
            return new Model.Case(id, status, updated, cases);
        };
        return Case;
    })();
    Model.Case = Case;
})(Model || (Model = {}));
//# sourceMappingURL=Case.js.map