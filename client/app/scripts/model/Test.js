/// <reference path='Model.ts' />
/// <reference path='Case.ts' />
'use strict';
var Model;
(function (Model) {
    var Test = (function () {
        //Constructor
        function Test(name, status, created, description, updated, cases, id, owner) {
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
        Test.prototype.getId = function () { return this.id; };
        Test.prototype.getName = function () { return this.name; };
        Test.prototype.getCreated = function () { return this.created; };
        Test.prototype.getStatus = function () { return this.status; };
        Test.prototype.getOwner = function () { return this.owner; };
        Test.prototype.getUpdated = function () { return this.updated; };
        Test.prototype.getDescription = function () { return this.description; };
        Test.prototype.getCases = function () { return this.cases; };
        //Setters
        Test.prototype.setId = function (id) { this.id = id; };
        Test.prototype.setName = function (name) { this.name = name; };
        Test.prototype.setCreated = function (created) { this.created = created; };
        Test.prototype.setStatus = function (status) { this.status = status; };
        Test.prototype.setOwner = function (owner) { this.owner = owner; };
        Test.prototype.setUpdated = function (updated) { this.updated = updated; };
        Test.prototype.setDescription = function (description) { this.description = description; };
        Test.prototype.setCases = function (cases) { this.cases = cases; };
        //function to convert to JSON from Object
        Test.prototype.toString = function () {
            var str = '{' +
                '"id"' + ': "' + this.id + '", ' +
                '"name"' + ': "' + this.name + '", ' +
                '"created"' + ': "' + this.created + '", ' +
                '"status"' + ': "' + this.status + '", ' +
                '"description"' + ': "' + this.description + '", ' +
                '"owner"' + ': "' + this.owner + '", ' +
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
        Test.prototype.dateFormatter = function (d) {
            function pad(n) {
                return n < 10 ? '0' + n : n;
            }
            var result = d.getUTCFullYear() + '-'
                + pad(d.getUTCMonth() + 1) + '-'
                + pad(d.getUTCDate()) + 'T'
                + pad(d.getUTCHours()) + ':'
                + pad(d.getUTCMinutes()) + ':'
                + pad(d.getUTCSeconds());
            return result;
        };
        Test.fromJson = function (o) {
            var id = null, name, created, status, updated, description, owner, cases;
            if (o) {
                if (o.hasOwnProperty('id') && o.id) {
                    if (typeof o.id !== 'string') {
                        throw new Error('2016');
                    }
                    else {
                        id = o.id;
                    }
                } //else {throw new Error('2022')}
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
                    if (Object.prototype.toString.call(o.created) === '[object Number]') {
                        created = new Date(o.created);
                    }
                    else {
                        throw new Error('2018');
                    }
                } //else {throw new Error('2024')}
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
                if (o.hasOwnProperty('description') && o.description) {
                    if (typeof o.description !== 'string') {
                        throw new Error('2022');
                    }
                    else {
                        description = o.description;
                    }
                }
                if (o.hasOwnProperty('owner') && o.owner) {
                    if (typeof o.owner !== 'string') {
                        throw new Error('2048');
                    }
                    else {
                        owner = o.owner;
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
            return new Model.Test(name, status, created, description, updated, cases, id, owner);
        };
        return Test;
    })();
    Model.Test = Test;
})(Model || (Model = {}));
//# sourceMappingURL=Test.js.map