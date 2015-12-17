/// <reference path="Model.ts" />s
'use strict';
var Model;
(function (Model) {
    var ServiceError = (function () {
        //private context : Model.Bits;
        function ServiceError(code, message /*, context?:Model.Bits*/) {
            this.code = code;
            this.message = message;
            //this.context = context;
        }
        ServiceError.prototype.getCode = function () { return this.code; };
        ServiceError.prototype.getMessage = function () { return this.message; };
        //public getContext() : Model.Bits { return this.context; }
        ServiceError.fromJson = function (o) {
            var code, message;
            if (o) {
                if (o.hasOwnProperty('code')) {
                    code = o.code;
                }
                else {
                    throw new Error('Expected Property "code"');
                }
                if (o.hasOwnProperty('message')) {
                    message = o.message;
                }
                else {
                    throw new Error('Expected Property "message"');
                }
            }
            return new Model.ServiceError(code, message /*,
            context*/);
        };
        return ServiceError;
    })();
    Model.ServiceError = ServiceError;
})(Model || (Model = {}));
//# sourceMappingURL=ServiceError.js.map