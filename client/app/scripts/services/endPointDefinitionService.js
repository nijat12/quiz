'use strict';
/**
 * Created by nijat on 8/20/15.
 */

app.service('endPointDefinitionService' ,[function () {

  //this.apiURL = 'http://10.9.25.192:8080';
  this.apiURL = 'http://localhost:8080';


  //Get all tests or create onew
  this.quizURL = this.apiURL + '/api/quiz';
  this.tagsURL = this.apiURL + '/api/tags';

  //get endpoints
  this.getTestURL = this.quizURL + '/:id';
  this.getCaseURL = this.quizURL + '/cases/:id';
  this.getCasesURL = this.quizURL + '/:id/cases';
  this.getQuestionUrl = this.quizURL + '/cases/questions/:id';
  this.getQuestionsUrl = this.quizURL + '/cases/:id/questions';

  //update endpoints
  this.updateCaseURL = this.quizURL + '/cases';
  this.updateQuestionUrl = this.quizURL + '/cases/questions/update';

  //add endpoints
  this.addQuestionUrl = this.quizURL + '/cases/:id/questions/add';
  this.addCaseURL = this.quizURL + '/:id/cases';
  this.addImage = this.quizURL + '/image/upload';

  //delete endpoints
  this.deleteTestURL = this.quizURL + '/:id/';

}]);
