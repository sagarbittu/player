angular.module('player.module', [])

.controller('playerCtrl', function($scope, $http, $uibModal, $timeout, $window) {


  // Wavesurfer class
  $scope.WaveSurferClass = {
    // configure options
    wavesurferOptions: {
      container: '#waveForm',
      waveColor: 'violet',
      progressColor: 'purple',
      barWidth: 3,
      backend: 'MediaElement',
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
      console.log(this.RegionsPlugin);
      // end load files
      this.wavesurferOptions.plugins = [
        this.TimelinePlugin.create(this.timelineOptions),
        this.RegionsPlugin.create()
      ];
      this.file = file;
      this.drawWaveSurfer();
    },
    drawWaveSurfer: function () {
      // create wavesurfer
      this.wsInstance = this.WaveSurfer.create(this.wavesurferOptions);
      this.wsInstance.load('./audio.wav');
      //this.wsInstance.on('ready', this.wsInstance.play.bind(this.wsInstance));
      //this.wsInstance.on('ready', this.wsInstance.clearRegions());
      this.wsInstance.on('ready', this.wsInstance.enableDragSelection({
        color: 'rgba(149, 246, 162, 0.35)'//randomColor(0.1)
      }));
      document.querySelector(
        '[data-action="play"]'
      ).addEventListener('click', this.wsInstance.playPause.bind(this.wsInstance));
      document.querySelector(
        '[data-action="stop"]'
      ).addEventListener('click', this.wsInstance.stop.bind(this.wsInstance));
      
    }
  }

 

  $scope.myplayer = function () {
    var modalInstance = $uibModal.open({
      animation: false,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: function ($uibModalInstance) {
        var pc = $scope;
        
        console.log('here')
        pc.ok = function () {
          $uibModalInstance.close();
        };

        pc.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };


        $scope.playit = () => { console.log(121)
          // $scope.WaveSurferClass.playWaveSurfer();
         }
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
    modalInstance.opened.then(function () {
      $timeout(function() {
        $scope.WaveSurferClass.init();
      }, 1000);
    });
  }

  

});