/// <reference path='Model.ts' />
/// <reference path='Question.ts' />
'use strict';
var Model;
(function (Model) {
    var Case = (function () {
        //Constructor
        function Case(id, quizId, name, description, status, images, questions, tags) {
            //Required
            this.id = id || null;
            //Not Required
            this.quizId = quizId;
            this.name = name;
            this.description = description;
            this.status = status;
            this.images = images || [];
            this.questions = questions || [];
            this.tags = tags || [];
        }
        //Getters
        Case.prototype.getId = function () { return this.id; };
        Case.prototype.getQuizId = function () { return this.quizId; };
        Case.prototype.getName = function () { return this.name; };
        Case.prototype.getDescription = function () { return this.description; };
        Case.prototype.getStatus = function () { return this.status; };
        Case.prototype.getImages = function () { return this.images; };
        Case.prototype.getQuestions = function () { return this.questions; };
        Case.prototype.getTags = function () { return this.tags; };
        //Setters
        Case.prototype.setId = function (id) { this.id = id; };
        Case.prototype.setQuizId = function (quizId) { this.quizId = quizId; };
        Case.prototype.setName = function (name) { this.name = name; };
        Case.prototype.setDescription = function (description) { this.description = description; };
        Case.prototype.setStatus = function (status) { this.status = status; };
        Case.prototype.setImages = function (images) { this.images = images; };
        Case.prototype.setQuestions = function (questions) { this.questions = questions; };
        Case.prototype.setTags = function (tags) { this.tags = tags; };
        //function to convert to JSON from Object
        Case.prototype.toString = function () {
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
            if (this.quizId) {
                str += ', "quizId"' + ': ';
                if (this.quizId === null || this.quizId === undefined) {
                    str += this.quizId;
                }
                else {
                    str += '"' + this.quizId + '"';
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
            if (this.description) {
                str += ', "description"' + ': ';
                if (this.description === null || this.description === undefined) {
                    str += this.description;
                }
                else {
                    str += '"' + this.description + '"';
                }
            }
            if (this.status) {
                str += ', "status"' + ': ';
                if (this.status === null || this.status === undefined) {
                    str += this.status;
                }
                else {
                    str += '"' + this.status + '"';
                }
            }
            if (this.images) {
                if (this.images.length === 1) {
                    str += ', "images"' + ': "' + this.images[0] + '"';
                }
                else {
                    str += ', "images":[';
                    for (var i = 0, len = this.images.length; i < len; i += 1) {
                        str += '"' + this.images[i] + '"';
                        //if(i - 1 != len) str+= ', ';
                        str += (i - 1 === len) ? ']' : ', ';
                    }
                }
            }
            if (this.questions) {
                if (this.questions.length === 1) {
                    str += ', "questions"' + ': "' + this.questions[0] + '"';
                }
                else {
                    str += ', "questions":[';
                    for (var i = 0, len = this.questions.length; i < len; i += 1) {
                        str += '"' + this.questions[i] + '"';
                        //if(i - 1 != len) str+= ', ';
                        str += (i - 1 === len) ? ']' : ', ';
                    }
                }
            }
            if (this.tags) {
                if (this.tags.length === 1) {
                    str += ', "tags"' + ': "' + this.tags[0] + '"';
                }
                else {
                    str += ', "tags":[';
                    for (var i = 0, len = this.tags.length; i < len; i += 1) {
                        str += '"' + this.tags[i] + '"';
                        //if(i - 1 != len) str+= ', ';
                        str += (i - 1 === len) ? ']' : ', ';
                    }
                }
            }
            str += '}';
            return str;
        };
        Case.fromJson = function (o) {
            var id = null, quizId, name, description, status, images, questions, tags;
            if (o) {
                if (o.hasOwnProperty('id') && o.id) {
                    if (typeof o.id !== 'string') {
                        throw new Error('2027');
                    }
                    else {
                        id = o.id;
                    }
                }
                if (o.hasOwnProperty('quizId') && o.quizId) {
                    if (typeof o.quizId !== 'string') {
                        throw new Error('2024');
                    }
                    else {
                        quizId = o.quizId;
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
                if (o.hasOwnProperty('description') && o.description) {
                    if (typeof o.description !== 'string') {
                        throw new Error('2047');
                    }
                    else {
                        description = o.description;
                    }
                }
                if (o.hasOwnProperty('status') && o.status) {
                    if (typeof o.status !== 'string') {
                        throw new Error('2028');
                    }
                    else {
                        status = o.status;
                    }
                }
                else {
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
                if (o.hasOwnProperty('tags') && o.tags) {
                    if (Object.prototype.toString.call(o.tags) !== '[object Array]') {
                        throw new Error('2049');
                    }
                    else {
                        tags = o.tags;
                    }
                }
            }
            else {
                throw new Error('2033');
            }
            return new Model.Case(id, quizId, name, description, status, images, questions, tags);
        };
        return Case;
    })();
    Model.Case = Case;
})(Model || (Model = {}));
//# sourceMappingURL=Case.js.map