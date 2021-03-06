angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    })

.controller('AgendaCtrl', function ($scope, $http) {

    $scope.agendas = [];
    $http.get(agendaServiceUrl + 'agenda/getagenda').success(function (retValues) {
        $.each(retValues, function (key, value) {
            console.log(value.Date);
            $scope.agendas.push({
                id: value.Id,
                title: value.Name,
                date: value.Date,
                imageUrl: value.FlyerUrl,
                description: value.Description,
                externalEvent: value.ExtrenalEvent,
                listToolsToken: value.ListToolsToken,
                preSellingUrl: value.PreSellingUrl,
                music: value.Music,
                facebookUrl: value.FacebookUrl
            });
        });
    });

})

.controller('AgendaDetailsCtrl', function ($scope, $stateParams, $http) {

    $http.get(agendaServiceUrl + 'agenda/getevent?id=' + $stateParams.agendaId).success(function (retValues) {
        $scope.agenda = {
            id: retValues.Id,
            title: retValues.Name,
            date: retValues.Date,
            imageUrl: retValues.FlyerUrl,
            description: retValues.Description,
            externalEvent: retValues.ExtrenalEvent,
            listToolsToken: retValues.ListToolsToken,
            preSellingUrl: retValues.PreSellingUrl,
            music: retValues.Music,
            facebookUrl: retValues.FacebookUrl
        };
    });

})

.controller('ClubTextCtrl', function($scope, $http) {
    
    $http.get(agendaServiceUrl + 'textpage/getclubtext').success(function (value) {
        $scope.club = {
            id: value.Id,
            title: value.BodyTitle,
            text: value.BodyText
        };
    });

})

.controller('hausordnungTextCtrl', function ($scope, $http) {

    $http.get(agendaServiceUrl + 'textpage/gethausordnung').success(function (value) {
        $scope.content = {
            id: value.Id,
            title: value.BodyTitle,
            text: value.BodyText
        };
    });

})

.controller('ContactCtrl', function ($scope, $http) {

    $scope.sendForm = function () {
        
        $scope.loading = true;
        $scope.addMode = true;

        $scope.formModel = {
            Name: $('#name').val(),
            Email: $('#email').val(),
            Subject: $('#thema').val(),
            Message: $('#message').val()
        };

        $http.post(agendaServiceUrl + 'contact/postcontact', JSON.stringify(this.formModel)).success(function (data) {
            $scope.addMode = true;
            $scope.apiData = data;
            $scope.loading = true;

        }).error(function (data) {
                $scope.message = {
                    status: data.Status,
                    text: 'An Error has occured while Searching References! Error message: ' + data.Message
                };
                $scope.loading = true;
            });
    }
    })

.controller('ResidenceCtrl', function($scope, $http) {
    
    $scope.artists = [];
    $http.get(agendaServiceUrl + 'artist/getresidence').success(function (retValues) {
        $.each(retValues, function (key, value) {
            $scope.artists.push({
                id: value.Id,
                name: value.Name,
                artistImage: value.ArtistImage,
                country: value.Country,
                musicStyles: value.MusicStyles
            });
        });
    });

});