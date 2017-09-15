var app = angular.module('AngularJS UI-Router', ['ui.router']),
    url = 'http://www.filltext.com/?rows=30&pretty=true&add={firstName}&company=[%22Apple%22,%22Microsoft%22,%22Samsung%22,%22Tai%22,%22Aselsan%22,%22Hacettepe%22,%22Odt%C3%BC%22]&about={lorem|10}&address={addressObject}';




app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'Partials/home.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'Partials/about.html'
        })
        .state('projects', {
            url: '/projects',
            templateUrl: 'Partials/projects.html'
        })
        .state('downloads', {
            url: '/downloads',
            templateUrl: 'Partials/downloads.html'
        })
        .state('details', {
            url: '/details/{id}',
            templateUrl: 'Partials/details.html',
            controller: 'PostController'
        })
        .state('newblog', {
            url: '/newblog',
            templateUrl: 'Partials/newblog.html',
            controller: 'BlogController'
        })
        .state('users', {
            url: '/users',
            templateUrl: 'Partials/users.html',
            controller: 'userController'
        });
});

app.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

app.controller('BlogController', function ($scope, PostFactory, $timeout) {
    $scope.alert_success = false;

    $scope.postBlog = PostFactory.posts;

    $scope.NewBlog = function () {
        $scope.postBlog.push({
            'title': $scope.title,
            'text': $scope.text,
            'author': $scope.author,
            'like': 0,
            'comments': []
        });
        $scope.title = "";
        $scope.text = "";
        $scope.author = "";

        $scope.alert_success = true;
        $timeout(function () {
            $scope.alert_success = false;
        },3000);
    }

});

app.controller('PostController', function ($scope, PostFactory, $stateParams) {
    $scope.postControl = PostFactory.posts[$stateParams.id];

    $scope.postComment = function () {
        $scope.postControl.comments.push({
            'comment': $scope.comment,
            'like': 0
        });
        $scope.comment = "";
    }
    $scope.likeComment = function (item) {
        item.like += 1;
    }

        var value = 0;
    $scope.likeBlog = function (event) {

        if (value % 2 == 0) {
            $scope.active = 'active';
            $scope.postControl.like += 1;
        }
            
        if (value % 2 == 1) {
            $scope.active = 'disactive'
            $scope.postControl.like -= 1;
        }
        value += 1;
        
    }

});


app.controller('userController', function ($scope, $http) {
    $http.get(url).then(function (response) {
        $scope.lists = response.data;
    });
});

app.directive ('userInfo', function () {
    return {
        restrict: 'E',
        templateUrl: 'Partials/directive.html',
        transclude: true
    };
});

app.factory('PostFactory', function () {
    var object = {
        posts: [
            {
                'title': 'Blog - 1',
                'text': 'Lorem 1',
                'like': 10,
                'author': 'Burak Aykanat',
                'comments': [
                    {
                        'comment': 'Comment 1', 'like': 1
                    },
                    {
                        'comment': 'Comment 2', 'like': 2
                    },
                    {
                        'comment': 'Comment 3', 'like': 3
                    }

                ]
            },
            {
                'title': 'Blog - 2',
                'text': 'Lorem 2',
                'like': 100,
                'author': 'Bill Gates',
                'comments': [
                    {
                        'comment': 'Comment 4', 'like': 10
                    },
                    {
                        'comment': 'Comment 5', 'like': 20
                    },
                    {
                        'comment': 'Comment 6', 'like': 30
                    }

                ]
            },
            {
                'title': 'Blog - 3',
                'text': 'Lorem 3',
                'like': 1000,
                'author': 'Büşra Özyurt',
                'comments': [
                    {
                        'comment': 'Comment 7', 'like': 100
                    },
                    {
                        'comment': 'Comment 8', 'like': 200
                    },
                    {
                        'comment': 'Comment 9', 'like': 300
                    }

                ]
            }
        ]
    }
    return object;
});
