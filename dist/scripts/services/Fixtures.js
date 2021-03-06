(function () {
    function Fixtures() {
        var Fixtures = {};

        var albumPicasso = {
            title: 'The Colors',
            artist: 'Pablo Picasso',
            label: 'Cubism',
            year: '1881',
            albumArtUrl: '/assets/images/album_covers/01.png',
            songs: [
                {title: 'Blue', duration: 161.71, audioUrl: '/assets/music/blue'},
                {title: 'Green', duration: 103.96, audioUrl: '/assets/music/green'},
                {title: 'Red', duration: 268.45, audioUrl: '/assets/music/red'},
                {title: 'Pink', duration: 153.14, audioUrl: '/assets/music/pink'},
                {title: 'Magenta', duration: 374.22, audioUrl: '/assets/music/magenta'},
            ]
        };

        var albumMarconi = {
            title: 'The Telephone',
            artist: 'Guglielmo Marconi',
            label: 'EM',
            year: '1909',
            albumArtUrl: '/assets/images/album_covers/20.png',
            songs: [
                { title: 'Hello, Operator?', duration: '1:01' },
                { title: 'Ring, ring, ring', duration: '5:01' },
                { title: 'Fits in your pocket', duration: '3:21'},
                { title: 'Can you hear me now?', duration: '3:14' },
                { title: 'Wrong phone number', duration: '2:15'}
            ]
        };

        var albumBloc = {
            title: 'The Programmer',
            artist: 'Bloc',
            label: 'JS',
            year: '2016',
            albumArtUrl: '/assets/images/album_covers/07.png',
            songs: [
                { title: 'if/else', duration: '3:01' },
                { title: 'For loop', duration: '5:41' },
                { title: 'Brackets', duration: '2:41'},
                { title: 'Nodes', duration: '4:32' },
                { title: 'Git', duration: '2:15'},
                { title: 'Switch', duration: '3:15'}
            ]
        };

        Fixtures.getAlbum = function () {
            return albumPicasso
        };

        Fixtures.getCollection = function(numberOfAlbums){
            albums = [];
            for (var i=0; i < numberOfAlbums; i++) {
                albums.push(angular.copy(Fixtures.getAlbum()))
            }
            return albums
        };


        return Fixtures;
    }

    angular
        .module('blocJams')
        .factory('Fixtures', Fixtures)
})();