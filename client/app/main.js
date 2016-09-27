'use strict'

angular
  .module('todolist', ['ngRoute'])
  .config($routeProvider =>
    $routeProvider
      .when('/', {
        controller: 'MainCtrl',
        templateUrl: 'partials/main.html',
      })
  )
  .controller('MainCtrl', function ($scope, $http, $q) {
    $scope.newTask = () => {
      const newtask = {
        content: $scope.task,
      }

    $http
        .post('/api/todo', newtask)
        .then(() => $scope.data.push(newtask))
        .catch(console.error)
    }

    $http
      .get('/api/title')
      .then(({ data: { title }}) =>
        $scope.title = title
      )
    $http
      .get('/api/todo')
      // .then(({ data: { title }}) =>
      .then( data =>
        $scope.data = data.data.tasks
      )
  })
