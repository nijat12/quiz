/* global Model */

'use strict';

/**
 * Created by nijat on 8/27/15.
 */
app.factory('errorCode', [function () {

  var errorList = {
    // Error codes between 2000 and 2999 are Server related Errors...
    2000: 'Expected String for property "id" in User Model',
    2001: 'Expected String for property "firstName" in User Model',
    2002: 'Expected String for property "lastName" in User Model',
    2003: 'Expected String for property "userName" in User Model',
    2004: 'Expected String for property "institutions" in User Model',
    2005: 'Expected String for property "address" in User Model',
    2006: 'Expected String for property "state" in User Model',
    2007: 'Expected String for property "zip" in User Model',
    2008: 'Expected Array[] for property "roles" in User Model',
    2009: 'Expected Test Model for property "tests" in User Model',
    2010: 'id is missing in User Model',
    2011: 'firstName is missing in User Model',
    2012: 'lastName is missing in User Model',
    2013: 'userName is missing in User Model',
    2014: 'roles is missing in User Model',
    2015: 'object came in empty fromJson > User Model',
    2016: 'Expected String for property "id" in Test Model',
    2017: 'Expected String for property "name" in Test Model',
    2018: 'Expected String for property "created" in Test Model',
    2019: 'Expected String for property "status" in Test Model',
    2020: 'Expected String for property "updated" in Test Model',
    2021: 'Expected Case Model for property "cases" in Test Model',
    2022: 'id is missing in Test Model',
    2023: 'name is missing in Test Model',
    2024: 'created is missing in Test Model',
    2025: 'status is missing in Test Model',
    2026: 'object came in empty fromJson > Test Model',
    2027: 'Expected String for property "id" in Case Model',
    2028: 'Expected Boolean for property "status" in Case Model',
    2029: 'Expected Array for property "images" in Case Model',
    2030: 'Expected Question Model for property "questions" in Case Model',
    2031: 'id is missing in Case Model',
    2032: 'status is missing in Case Model',
    2033: 'object came in empty fromJson > Case Model',
    2034: 'Expected String for property "id" in Question Model',
    2035: 'Expected String for property "label" in Question Model',
    2036: 'Expected Boolean for property "answer" in Question Model',
    2037: 'Expected Array for property "images" in Question Model',
    2038: 'Expected Explanation model for property "explanations" in Question Model',
    2039: 'id is missing in Question Model',
    2040: 'label is missing in Question Model',
    2041: 'answer is missing in Question Model',
    2042: 'explanations are missing in Question Model',
    2043: 'object came in empty fromJson > Question Model',
    2044: '',
    2045: '',
    2046: '',
    2047: '',
    2048: '',
    2049: '',
    2050: '',

    // Error codes between 3000 and 4999 are Front End related Errors...
    3000: '',

    // Error code  5000 is for generic Error message
    END: ''
  };

  var getError = function (id, serverCode){
        var errorCodeAsString = errorList[id];

        if (errorCodeAsString && errorCodeAsString !== undefined){
          if (serverCode) {
            return new Model.ServiceError(serverCode, errorCodeAsString);
          } else {
            return new Model.ServiceError(id, errorCodeAsString);
          }
        } else {
          return new Model.ServiceError(5000, 'Error');
        }
  };

  return {
    get:       getError,
    errorList: errorList
  };
}]);
