/// <reference path='Model.ts' />
'use strict';
var Model;
(function (Model) {
    var Question = (function () {
        function Question(label, type, values) {
            this.label = label;
            this.type = type;
            this.values = values;
        }
        //Getters
        Question.prototype.getLabel = function () { return this.label; };
        ;
        Question.prototype.getType = function () { return this.type; };
        ;
        Question.prototype.getValues = function () { return this.values; };
        ;
        //Setters
        Question.prototype.setLabel = function (label) { this.label = label; };
        ;
        Question.prototype.setType = function (type) { this.type = type; };
        ;
        Question.prototype.setValues = function (values) { this.values = values; };
        ;
        Question.prototype.toString = function () {
            var str = '{' + '"label"' + ': "' + this.label + '", ' +
                '"type"' + ': "' + this.type + '", ';
            if (this.values.length === 1) {
                str += '"values"' + ': "' + this.values[0] + '"}';
            }
            else {
                str += '"values":[';
                for (var i = 0, len = this.values.length; i < len; i += 1) {
                    str += '"' + this.values[i] + '"';
                    if (i - 1 === len) {
                        str += ']}';
                    }
                    else {
                        str += ', ';
                    }
                }
            }
            return str;
        };
        Question.fromJson = function (o) {
            var label, type, values;
            if (o) {
                if (o.hasOwnProperty('label') && o.label) {
                    if (typeof o.label != 'string') {
                        throw new Error('label from JSON has to be a String');
                    }
                    else {
                        label = o.label;
                    }
                }
                else {
                    throw new Error('Missing label from JSON');
                }
                if (o.hasOwnProperty('type') && o.type) {
                    if (typeof o.type != 'string') {
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
                if (o.hasOwnProperty('values') && o.values) {
                    //if (typeof o.values != 'string') {new Model.ServiceError('0001', 'label from Json has to be a String');}
                    values = o.values;
                }
            }
            else {
                throw new Error('missing the object form JSON');
            }
            return new Model.Question(label, type, values);
        };
        return Question;
    })();
    Model.Question = Question;
})(Model || (Model = {}));
//# sourceMappingURL=Question.js.map