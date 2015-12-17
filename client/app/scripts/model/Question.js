/// <reference path='Model.ts' />
'use strict';
var Model;
(function (Model) {
    var Question = (function () {
        //Constructors
        function Question(label, description, type, configuration, id, date) {
            this.id = id;
            this.label = label;
            this.description = description;
            this.date = date;
            this.type = type;
            this.configuration = configuration;
        }
        //Getters
        Question.prototype.getId = function () { return this.id; };
        Question.prototype.getLabel = function () { return this.label; };
        Question.prototype.getDescription = function () { return this.description; };
        Question.prototype.getDate = function () { return this.date; };
        Question.prototype.getType = function () { return this.type; };
        Question.prototype.getConfiguration = function () { return this.configuration; };
        //Setters
        Question.prototype.setLabel = function (label) { this.label = label; };
        Question.prototype.setDescription = function (description) { this.description = description; };
        Question.prototype.setType = function (type) { this.type = type; };
        Question.prototype.setConfiguration = function (configuration) { this.configuration = configuration; };
        //function to convert to JSON from Object
        Question.prototype.toString = function () {
            var str = '{' + '"id"' + ': "' + this.id + '", ' +
                '"label"' + ': "' + this.label + '", ' +
                '"description"' + ': "' + this.description + '", ' +
                '"date"' + ': "' + this.date + '", ' +
                '"type"' + ': "' + this.type + '", ';
            if (this.configuration.length === 1) {
                str += '"configuration"' + ': "' + this.configuration[0] + '"}';
            }
            else {
                str += '"configuration":[';
                for (var i = 0, len = this.configuration.length; i < len; i += 1) {
                    str += '"' + this.configuration[i] + '"';
                    //if(i - 1 === len){
                    //  str += ']}';
                    //}
                    //else {
                    //  str += ', ';
                    //}
                    str += (i - 1 === len) ? ']}' : ', ';
                }
            }
            return str;
        };
        Question.fromJson = function (o) {
            var id, label, description, date, type, configuration;
            if (o) {
                if (o.hasOwnProperty('id') && o.id) {
                    if (typeof o.id !== 'string') {
                        throw new Error('id from JSON has to be a String');
                    }
                    else {
                        id = o.id;
                    }
                }
                if (o.hasOwnProperty('label') && o.label) {
                    if (typeof o.label !== 'string') {
                        throw new Error('label from JSON has to be a String');
                    }
                    else {
                        label = o.label;
                    }
                }
                else {
                    throw new Error('Missing label from JSON');
                }
                if (o.hasOwnProperty('description') && o.description) {
                    if (typeof o.description !== 'string') {
                        throw new Error('description from JSON has to be a String');
                    }
                    else {
                        description = o.description;
                    }
                }
                else {
                    throw new Error('Missing description from JSON');
                }
                if (o.hasOwnProperty('date') && o.date) {
                    if (o.date instanceof Date) {
                        date = o.date;
                    }
                    else {
                        throw new Error('date from JSON has to be a Date');
                    }
                }
                if (o.hasOwnProperty('type') && o.type) {
                    if (typeof o.type !== 'string') {
                        throw new Error('type from JSON has to be a String');
                    }
                    else {
                        type = o.type;
                    }
                }
                else {
                    throw new Error('Missing type from JSON');
                }
                //Need to figure out a better way of checking if it is a string[]
                if (o.hasOwnProperty('configuration') && o.configuration) {
                    //if (typeof o.configuration != 'string') {new Model.ServiceError('0001', 'label from Json has to be a String');}
                    configuration = o.configuration;
                }
                else {
                    throw new Error('Missing configuration from JSON');
                }
            }
            else {
                throw new Error('missing the object form JSON');
            }
            return new Model.Question(label, description, type, configuration, id, date);
        };
        return Question;
    })();
    Model.Question = Question;
})(Model || (Model = {}));
//# sourceMappingURL=Question.js.map