(function () {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};
        /**
         * @desc Sets current album globally
         * @param {Object}
         */
        var currentAlbum = Fixtures.getAlbum()


        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;

        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function (song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;

            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function () {
                $rootScope.$apply(function () {
                    SongPlayer.currentTime = currentBuzzObject.getTime();

                });
            });

            SongPlayer.currentSong = song;
        };
        /**
         * @function playSong
         * @desc play the currentBuzzObject and set the playing property of song to true
         * @param {Object} song
         */
        var playSong = function (song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        /**
         * @function stopSong
         * @desc stop the currentBuzzObject and set the playing property of song to false
         * @param {Object} song
         */
        var stopSong = function (song) {
            currentBuzzObject.stop();
            song.playing = false;
        };
        /**
         * @desc Get index of current song
         * @type {Object}
         */
        var getSongIndex = function (song) {
            return currentAlbum.songs.indexOf(song)
        }

        /**
         * @desc Active song object from list of songs
         * @type {Object}
         */
        SongPlayer.currentSong = null;

        /**
         * @desc current playback time in seconds of currently playing song
         * @type {Number}
         */
        SongPlayer.currentTime = null;

        /**
         * @desc current playback volume
         * @type {Number}
         */
        // SongPlayer.volume = 80


        /**
         * @function SongPlayer.play
         * @desc public method to test the state of currentSong and play song
         * @param {Object} song
         */

        SongPlayer.play = function (song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song){
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        /**
         * @function SongPlayer.play
         * @desc public method to test the state of currentSong and pause song
         * @param {Object} song
         */
        SongPlayer.pause = function (song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        /**
         * @function SongPlayer.previous
         * @desc public method to to switch to previous song
         * @param {Object} song
         */
        SongPlayer.previous = function () {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);

            currentSongIndex = (currentAlbum.songs.length + currentSongIndex - 1)%currentAlbum.songs.length;
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);

        };
        /**
         * @function SongPlayer.next
         * @desc public method to to switch to the next song
         * @param {Object} song
         */
        SongPlayer.next = function () {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex = (currentAlbum.songs.length + currentSongIndex + 1)%currentAlbum.songs.length;
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song)
        };
        /**
         * @function setCurrentTime
         * @desc Set current time (in seconds) of currently playing song
         * @param {Number} time
         */
        SongPlayer.setCurrentTime = function (time) {
            if (currentBuzzObject){
                currentBuzzObject.setTime(time);
            }
        };

        /**
         * @function SongPlayer.setVolume
         * @desc public method to set the volume
         * @param {Object}
         */
        SongPlayer.setVolume = function (volume) {
            if (currentBuzzObject){
                currentBuzzObject.setVolume(volume);
            }
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();