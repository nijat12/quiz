/// <reference path='Model.ts' />
/// <reference path='Test.ts' />
'use strict';
var Model;
(function (Model) {
    var User = (function () {
        //Constructor
        function User(id, firstName, lastName, userName, roles, institutions, address, state, zip, tests) {
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
        User.prototype.getId = function () { return this.id; };
        User.prototype.getFirstName = function () { return this.firstName; };
        User.prototype.getLastName = function () { return this.lastName; };
        User.prototype.getUserName = function () { return this.userName; };
        User.prototype.getRoles = function () { return this.roles; };
        User.prototype.getInstitutions = function () { return this.institutions; };
        User.prototype.getAddress = function () { return this.address; };
        User.prototype.getState = function () { return this.state; };
        User.prototype.getZip = function () { return this.zip; };
        User.prototype.getTests = function () { return this.tests; };
        //Setters
        User.prototype.setId = function (id) { return this.id; };
        User.prototype.setFirstName = function (firstName) { return this.firstName; };
        User.prototype.setLastName = function (lastName) { return this.lastName; };
        User.prototype.setUserName = function (userName) { return this.userName; };
        User.prototype.setRoles = function (roles) { return this.roles; };
        User.prototype.setInstitutions = function (institutions) { return this.institutions; };
        User.prototype.setAddress = function (address) { return this.address; };
        User.prototype.setState = function (state) { return this.state; };
        User.prototype.setZip = function (zip) { return this.zip; };
        User.prototype.setTests = function (tests) { return this.tests; };
        //function to convert to JSON from Object
        User.prototype.toString = function () {
            var str = '{' +
                '"id"' + ': "' + this.id + '", ' +
                '"firstName"' + ': "' + this.firstName + '", ' +
                '"lastName"' + ': "' + this.lastName + '", ' +
                '"userName"' + ': "' + this.userName + '", ';
            if (this.roles.length === 1) {
                str += '"roles"' + ': "' + this.roles[0] + '"}';
            }
            else {
                str += '"roles":[';
                for (var i = 0, len = this.roles.length; i < len; i += 1) {
                    str += '"' + this.roles[i] + '", ';
                    str += (i - 1 === len) ? '],' : ', ';
                }
            }
            str += '"institutions"' + ': "' + this.institutions + '", ' +
                '"address"' + ': "' + this.address + '", ' +
                '"state"' + ': "' + this.state + '", ' +
                '"zip"' + ': "' + this.zip + '", ';
            if (this.tests.length === 1) {
                str += '"tests"' + ': "' + this.tests[0] + '"}';
            }
            else {
                str += '"tests":[';
                for (var i = 0, len = this.tests.length; i < len; i += 1) {
                    str += '"' + this.tests[i] + '"';
                    str += (i - 1 === len) ? ']}' : ', ';
                }
            }
            return str;
        };
        User.fromJson = function (o) {
            var id, firstName, lastName, userName, institutions, address, state, zip, roles, tests;
            if (o) {
                if (o.hasOwnProperty('id') && o.id) {
                    if (typeof o.id !== 'string') {
                        throw new Error('2000');
                    }
                    else {
                        id = o.id;
                    }
                }
                else {
                    throw new Error('2010');
                }
                if (o.hasOwnProperty('firstName') && o.firstName) {
                    if (typeof o.firstName !== 'string') {
                        throw new Error('2001');
                    }
                    else {
                        firstName = o.firstName;
                    }
                }
                else {
                    throw new Error('2011');
                }
                if (o.hasOwnProperty('lastName') && o.lastName) {
                    if (typeof o.lastName !== 'string') {
                        throw new Error('2002');
                    }
                    else {
                        lastName = o.lastName;
                    }
                }
                else {
                    throw new Error('2012');
                }
                if (o.hasOwnProperty('userName') && o.userName) {
                    if (typeof o.userName !== 'string') {
                        throw new Error('2003');
                    }
                    else {
                        userName = o.userName;
                    }
                }
                else {
                    throw new Error('2013');
                }
                if (o.hasOwnProperty('roles') && o.roles) {
                    if (Object.prototype.toString.call(o.roles) !== '[object Array]') {
                        throw new Error('2008');
                    }
                    else {
                        roles = o.roles;
                    }
                }
                else {
                    throw new Error('2014');
                }
                if (o.hasOwnProperty('institutions') && o.institutions) {
                    if (typeof o.institutions !== 'string') {
                        throw new Error('2004');
                    }
                    else {
                        institutions = o.institutions;
                    }
                }
                if (o.hasOwnProperty('address') && o.address) {
                    if (typeof o.address !== 'string') {
                        throw new Error('2005');
                    }
                    else {
                        address = o.address;
                    }
                }
                if (o.hasOwnProperty('state') && o.state) {
                    if (typeof o.state !== 'string') {
                        throw new Error('2006');
                    }
                    else {
                        state = o.state;
                    }
                }
                if (o.hasOwnProperty('zip') && o.zip) {
                    if (typeof o.zip !== 'string') {
                        throw new Error('2007');
                    }
                    else {
                        zip = o.zip;
                    }
                }
                if (o.hasOwnProperty('tests') && o.tests) {
                    if (Object.prototype.toString.call(o.tests) === '[object Array]') {
                        //if (o.tests instanceof Test) {
                        tests = o.tests;
                    }
                    else {
                        throw new Error('2009');
                    }
                }
            }
            else {
                throw new Error('2015');
            }
            return new Model.User(id, firstName, lastName, userName, roles, institutions, address, state, zip, tests);
        };
        return User;
    })();
    Model.User = User;
})(Model || (Model = {}));
//# sourceMappingURL=User.js.map