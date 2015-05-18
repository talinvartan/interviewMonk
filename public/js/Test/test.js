
angular.module('test', []).service('IndividualTest', function($http){

    return {
        submit: function(testid, title, tags, questions, userAnswers){
            var testObject = {
                title: title,
                tags: tags,
                questions: questions,
                userAnswers: userAnswers

            };
            return $http.put('/tests/' + testid, testObject);
        }

    }
}).controller('TestIndividualController', function ($scope, Test, IndividualTest, $routeParams) {

    Test.getTest($routeParams.id).success(function(data) {
        $scope.index = 0;
        $scope.test = data;
        $scope.title = data.title;
        $scope.tags = data.tags;
        $scope.questions = data.questions;
        console.log(data.userAnswers);
        $scope.userAnswers = data.userAnswers;
       // $scope.userAnswers = [];
        if($scope.userAnswers[$scope.index]){
            $scope.answer = $scope.userAnswers[$scope.index];
        }
        $scope.testid = data._id;
    });

    $scope.getEachQuestion = function(question, index){
        $scope.question = question;
        $scope.index = index;
        var answer = $scope.questions[$scope.index].answer;
        console.log("The true answer for this question is", $scope.questions[$scope.index].answer);
        if($scope.userAnswers[$scope.index]){
            $scope.answer = $scope.userAnswers[$scope.index];
        }
    };

    $scope.updateAnswer = function(){
        $scope.userAnswers[$scope.index] = $scope.answer;
    };

    $scope.next = function() {
        if ($scope.index >= $scope.questions.length - 1) {
            $scope.index = 0;
            if($scope.userAnswers[$scope.index] === undefined){
                $scope.answer = ''
            } else {
                $scope.answer = $scope.userAnswers[$scope.index];
            }
        } else {
            $scope.index++;
            if($scope.userAnswers[$scope.index] === undefined){
                $scope.answer = ''
            } else {
                $scope.answer = $scope.userAnswers[$scope.index];
            }
        }
    };

    $scope.previous = function() {

       if($scope.index <= 0){
           $scope.index = $scope.questions.length - 1;
           if($scope.userAnswers[$scope.index] === undefined){
               $scope.answer = ''
           } else {
               $scope.answer = $scope.userAnswers[$scope.index];
           }
       }
       else {
           $scope.index--;
           if($scope.userAnswers[$scope.index] === undefined){
               $scope.answer = ''
           } else {
               $scope.answer = $scope.userAnswers[$scope.index];
           }
       }
    };

    $('[data-toggle=confirmation]').confirmation($scope.submitTest);

    $scope.submitTest = function() {

        IndividualTest.submit($scope.testid, $scope.title, $scope.tags, $scope.questions, $scope.userAnswers).then(function(data){
            console.log("here is the final result");
            console.log(data);
        });
    };


});
