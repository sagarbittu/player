angular.module('player.module', [])

.controller('playerCtrl', function($scope, $http, $uibModal, $timeout, $window) {


  // Wavesurfer class
  const WaveSurferClass = {
    // configure options
    wavesurferOptions: {
      container: '#waveForm',
      waveColor: 'violet',
      progressColor: 'purple',
    },
    timelineOptions: {
      container: '#timeLine'
    },
    // end configure options
    init: function (file) {
      // load files
      // const WaveSurfer = require('wavesurfer.js');
      // const timelinePlugin = require('wavesurfer.js/dist/plugin/wavesurfer.timeline');
      // const regionPlugin = require('wavesurfer.js/dist/plugin/wavesurfer.regions');
      this.WaveSurfer = $window.WaveSurfer;
      this.TimelinePlugin = $window.WaveSurfer.timeline;
      this.RegionsPlugin = $window.WaveSurfer.regions;
      console.log(this.TimelinePlugin);
      // end load files
      this.wavesurferOptions.plugins = [
        this.WaveSurfer.timeline.create({
          container: '#timeLine'
        })
      ];
      this.file = file;
      this.drawWaveSurfer();
    },
    drawWaveSurfer: function () {
      // create wavesurfer
      this.wsInstance = this.WaveSurfer.create(this.wavesurferOptions);
      this.wsInstance.load('./Kalimba.mp3');
    }
  }

  $scope.myplayer = () => {
    var modalInstance = $uibModal.open({
      animation: false,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: function ($uibModalInstance) {
        var pc = this;
        
        console.log('here')
        pc.ok = function () {
          $uibModalInstance.close();
        };

        pc.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      },
      size: 'lg',
      // resolve: {
      //   data: function () {
      //     return pc.data;
      //   }
      // }
    });
    modalInstance.result.then(function () {
      alert("now I'll close the modal");
    });
    modalInstance.opened.then(
      $timeout(function() {
        WaveSurferClass.init();
    }, 1000));
  }

  

});