/// <reference path='Model.ts' />
/// <reference path='Explanation.ts' />
'use strict';
var Model;
(function (Model) {
    var Question = (function () {
        //Constructors
        function Question(id, label, answer, images, explanations) {
            this.id = id;
            this.label = label;
            this.answer = answer;
            this.images = images;
            this.explanations = explanations;
        }
        //Getters
        Question.prototype.getId = function () { return this.id; };
        Question.prototype.getLabel = function () { return this.label; };
        Question.prototype.getAnswer = function () { return this.answer; };
        Question.prototype.getImages = function () { return this.images; };
        Question.prototype.getExplanations = function () { return this.explanations; };
        //Setters
        Question.prototype.setId = function (id) { this.id = id; };
        Question.prototype.setLabel = function (label) { this.label = label; };
        Question.prototype.setAnswer = function (answer) { this.answer = answer; };
        Question.prototype.setImages = function (images) { this.images = images; };
        Question.prototype.setExplanations = function (explanations) { this.explanations = explanations; };
        //function to convert to JSON from Object
        Question.prototype.toString = function () {
            var str = '{' + '"id"' + ': "' + this.id + '", ' +
                '"label"' + ': "' + this.label + '", ' +
                '"answer"' + ': "' + this.answer + '", ';
            if (this.images.length === 1) {
                str += '"images"' + ': "' + this.images[0] + '"}';
            }
            else {
                str += '"images":[';
                for (var i = 0, len = this.images.length; i < len; i += 1) {
                    str += '"' + this.images[i] + '"';
                    str += (i - 1 === len) ? '],' : ', ';
                }
            }
            if (this.explanations.length === 1) {
                str += '"explanations"' + ': "' + this.explanations[0] + '"}';
            }
            else {
                str += '"explanations":[';
                for (var i = 0, len = this.explanations.length; i < len; i += 1) {
                    str += '"' + this.explanations[i] + '"';
                    str += (i - 1 === len) ? ']}' : ', ';
                }
            }
            return str;
        };
        Question.fromJson = function (o) {
            var id, label, answer, images, explanations;
            if (o) {
                if (o.hasOwnProperty('id') && o.id) {
                    if (typeof o.id !== 'string') {
                        throw new Error('2034');
                    }
                    else {
                        id = o.id;
                    }
                }
                else {
                    throw new Error('2039');
                }
                if (o.hasOwnProperty('label') && o.label) {
                    if (typeof o.label !== 'string') {
                        throw new Error('2035');
                    }
                    else {
                        label = o.label;
                    }
                }
                else {
                    throw new Error('2040');
                }
                if (o.hasOwnProperty('answer')) {
                    if (typeof o.answer !== 'boolean') {
                        throw new Error('2036');
                    }
                    else {
                        answer = o.answer;
                    }
                }
                else
                    throw new Error('2041');
                if (o.hasOwnProperty('images') && o.images) {
                    if (Object.prototype.toString.call(o.images) === '[object Array]') {
                        images = o.images;
                    }
                    else
                        throw new Error('2037');
                }
                if (o.hasOwnProperty('explanations') && o.explanations) {
                    if (o.explanations instanceof Model.Explanation) {
                        explanations = o.explanations;
                    }
                    else
                        throw new Error('2038');
                }
            }
            else {
                throw new Error('2043');
            }
            return new Model.Question(id, label, answer, images, explanations);
        };
        return Question;
    })();
    Model.Question = Question;
})(Model || (Model = {}));
//# sourceMappingURL=Question.js.map