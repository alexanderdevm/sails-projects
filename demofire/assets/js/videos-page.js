angular.module('brushfire_videosPage', [])
    .config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            '*://www.youtube.com/**'
        ]);
    });

angular.module('brushfire_videosPage')
    .service('$scope', '$timeout', function() { /* ... */ })
    .controller('PageCtrl', [
        '$scope', '$timeout',
        function($scope, $timeout) {
            $scope.videosLoading = true;

            $timeout(function afterRetrievingVideos() {
                var _videos = [{
                    title: 'Funny Baby Videos',
                    src: 'https://www.youtube.com/embed/_FvTVWjLiHM'
                }, {
                    title: 'Bieber',
                    src: 'https://www.youtube.com/embed/kffacxfA7G4'
                }, {
                    title: 'Charlie',
                    src: 'https://www.youtube.com/embed/_OBlgSz8sSM'
                }];

                $scope.videosLoading = false;
                $scope.videos = _videos;
            }, 750);

            $scope.submitNewVideo = function() {
                if ($scope.busySubmittingVideo) {
                    return;
                }
                var _newVideo = {
                    title: $scope.newVideoTitle,
                    src: $scope.newVideoSrc
                };

                var parser = document.createElement('a');

                parser.href = _newVideo.src;

                var youtubeID = parser.search.substring(parser.search.indexOf("=") + 1, parser.search.length);

                _newVideo.src = 'https://www.youtube.com/embed/' + youtubeID;

                $scope.busySubmittingVideo = true;

                $timeout(function() {
                    $scope.videos.unshift(_newVideo);

                    $scope.busySubmittingVideo = false;

                    $scope.newVideoTitle = '';
                    $scope.newVideoSrc = '';
                }, 750);
            }
        }
    ]);



// $(function whenDomIsReady() {
//     $('.the-submit-video-form').submit(function(e) {
//         e.preventDefault();
//         var newVideo = {
//             title: $('.the-submit-video-form input[name="title"]').val(),
//             src: $('.the-submit-video-form input[name="src"]').val()
//         };

//         $('.the-submit-video-form input').val('');
//         $('.the-submit-video-form button').text('Submitting...');
//         $('.the-submit-video-form button').prop('disabled', true);

//         var parser = document.createElement('a');

//         parser.href = newVideo.src;

//         var youtubeID = parser.search.substring(parser.search.indexOf("=") + 1,
//             parser.search.length);

//         newVideo.src = 'https://youtube.com/embed/' + youtubeID;

//         setTimeout(function() {
//             var newVideoHtml = '<li class="video">' +
//                 '   <h2>' + newVideo.title + '<h2>' +
//                 '   <iframe width="640" height="390" src="' + newVideo.src + '" frameborder="0" allowfullscreen></iframe>' +
//                 '</li>';

//             $('.the-list-of-videos').prepend(newVideoHtml);
//             $('.the-submit-video-form button').text('Submit Video');
//             $('.the-submit-video-form button').prop('disabled', false);
//         }, 750)
//     })
// });