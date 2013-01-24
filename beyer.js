    Beyer = {};
    Beyer.Playlist = {
        audio: null,
        trackList: [],
        addTrack: function(track) {
            this.trackList = this.trackList.concat(track);
        },
        play: function(index) {
            var reader = new FileReader(),
                track = this.trackList[index || 0],
                url = window.URL || window.webkitURL,
                src = url.createObjectURL(track);

            this.audio = new Audio();
            this.audio.src = src;
            this.audio.load();
            this.audio.play();
        },
        pause: function() {
            this.audio.pause();
        }
    };

    // AngularJS
    Beyer.app = angular.module('beyer', []).config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/artist-list.html',
                controller: Shiva.Controllers.ArtistList
            })
            .otherwise({redirectTo: '/'});
    }]);

    document.addEventListener('DOMContentLoaded', function() {
        var dropzone = document.getElementById('dropzone');

        dropzone.addEventListener('drop', function (e) {
            e.target.classList.remove('over');
            e.stopPropagation();
            e.preventDefault();

            var tracks = e.dataTransfer.files;
            for (var i = 0, track; track = tracks[i]; i++) {
                Beyer.Playlist.addTrack(track);
            }
            Beyer.Playlist.play();
        }, false);

        dropzone.addEventListener('dragend', function (e) {
            e.target.classList.remove('over');
        }, false);

        dropzone.addEventListener('dragenter', function (e) {
            e.target.classList.add('over');
        }, false);

        dropzone.addEventListener('dragover', function (e) {
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        }, false)

        dropzone.addEventListener('dragleave', function (e) {
            e.target.classList.remove('over');
        }, false);
    }, false);