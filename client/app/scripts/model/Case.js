/// <reference path='Model.ts' />
/// <reference path='Question.ts' />
'use strict';
var Model;
(function (Model) {
    var Case = (function () {
        //Constructor
        function Case(id, status, images, questions) {
            //Required
            this.id = id;
            this.status = status;
            //Not Required
            this.images = images;
            this.questions = questions;
        }
        //Getters
        Case.prototype.getId = function () { return this.id; };
        Case.prototype.getStatus = function () { return this.status; };
        Case.prototype.getImages = function () { return this.images; };
        Case.prototype.getQuestions = function () { return this.questions; };
        //Setters
        Case.prototype.setId = function (id) { return this.id; };
        Case.prototype.setStatus = function (status) { return this.status; };
        Case.prototype.setImages = function (images) { return this.images; };
        Case.prototype.setQuestions = function (questions) { return this.questions; };
        //function to convert to JSON from Object
        Case.prototype.toString = function () {
            var str = '{' +
                '"id"' + ': "' + this.id + '", ' +
                '"status"' + ': "' + this.status + '", ';
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
            if (this.questions.length === 1) {
                str += '"questions"' + ': "' + this.questions[0] + '"}';
            }
            else {
                str += '"questions":[';
                for (var i = 0, len = this.questions.length; i < len; i += 1) {
                    str += '"' + this.questions[i] + '"';
                    str += (i - 1 === len) ? ']}' : ', ';
                }
            }
            return str;
        };
        Case.fromJson = function (o) {
            var id, status, images, questions;
            if (o) {
                if (o.hasOwnProperty('id') && o.id) {
                    if (typeof o.id !== 'string') {
                        throw new Error('2027');
                    }
                    else {
                        id = o.id;
                    }
                }
                else {
                    throw new Error('2031');
                }
                if (o.hasOwnProperty('status')) {
                    if (typeof o.status !== 'boolean') {
                        throw new Error('2028');
                    }
                    else {
                        status = o.status;
                    }
                }
                else {
                    throw new Error('2032');
                }
                if (o.hasOwnProperty('images') && o.images) {
                    if (Object.prototype.toString.call(o.images) !== '[object Array]') {
                        throw new Error('2029');
                    }
                    else {
                        images = o.images;
                    }
                }
                if (o.hasOwnProperty('questions') && o.questions) {
                    if (o.questions instanceof Model.Question) {
                        throw new Error('2030');
                    }
                    else {
                        questions = o.questions;
                    }
                }
            }
            else {
                throw new Error('2033');
            }
            return new Model.Case(id, status, images, questions);
        };
        return Case;
    })();
    Model.Case = Case;
})(Model || (Model = {}));
//# sourceMappingURL=Case.js.map