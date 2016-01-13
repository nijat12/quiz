/// <reference path="Model.ts" />s
'use strict';
var Model;
(function (Model) {
    var Explanation = (function () {
        function Explanation(label, images) {
            this.label = label;
            this.images = images;
        }
        Explanation.prototype.getLabel = function () { return this.label; };
        Explanation.prototype.getImages = function () { return this.images; };
        Explanation.prototype.setLabel = function (label) { this.label = label; };
        Explanation.prototype.setImages = function (images) { this.images = images; };
        Explanation.fromJson = function (o) {
            var label = null, images;
            if (o) {
                if (o.hasOwnProperty('label') && o.label) {
                    if (typeof o.label !== 'string') {
                        throw new Error('2044');
                    }
                    else
                        label = o.label;
                }
                else {
                    throw new Error('2046');
                }
                if (o.hasOwnProperty('images') && o.images) {
                    if (Object.prototype.toString.call(o.images) === '[object Array]') {
                        images = o.images;
                    }
                    else
                        throw new Error('2045');
                }
            }
            return new Model.Explanation(label, images);
        };
        return Explanation;
    })();
    Model.Explanation = Explanation;
})(Model || (Model = {}));
//# sourceMappingURL=Explanation.js.map