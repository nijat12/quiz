'use strict';
/**
 * Created by nijat on 8/20/15.
 */

app.service('endPointDefinitionService' ,[function () {

  //this.apiURL = 'http://10.9.25.192:8080';
  this.apiURL = 'http://localhost:8080';
  this.s3URL    = '';


  //Get all tests or create one
  this.testURL = this.apiURL + '/api/quiz';
  this.tagsURL = this.apiURL + '/api/tags';

  //get endpoints
  this.getTestURL = this.testURL + '/:id';
  this.getCaseURL = this.testURL + '/cases/:id';
  this.getCasesURL = this.testURL + '/:id/cases';
  this.getQuestionUrl = this.testURL + '/cases/questions/:id';
  this.getQuestionsUrl = this.testURL + '/cases/:id/questions';

  //update endpoints
  this.updateCaseURL = this.testURL + '/cases';
  this.updateQuestionUrl = this.testURL + '/cases/questions';

  //add endpoints
  this.addQuestionUrl = this.testURL + '/cases/:id/questions/add';
  this.addCaseURL = this.testURL + '/:id/cases';

  //delete endpoints
  this.deleteTestURL = this.testURL + '/:id/';

}]);
