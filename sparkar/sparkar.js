// created by vivekcse for augmented reality developersfor creating instagram facebook filters
// basic imports
const Scene = require('Scene');
const d = require('Diagnostics');
const Time = require('Time');
const Animation = require('Animation');
const MS = require('Materials');
const TS = require('Textures');
const TG = require('TouchGestures');
const FT = require('FaceTracking');
const FG = require('FaceGestures');
const INS = require('Instruction');
const Audio = require('Audio');
const CameraInfo = require('CameraInfo');
const Reactive = require('Reactive');
const NativeUI = require('NativeUI');

//es module import
import { root } from 'Scene';
import d from 'Diagnostics';
import { setInterval, clearInterval } from 'Time';
import Animation from 'Animation';
import { findFirst } from 'Materials';
import { findFirst as _findFirst } from 'Textures';
import { onTap } from 'TouchGestures';
import { face as _face } from 'FaceTracking';
import FG from 'FaceGestures';
import { bind } from 'Instruction';
import { getAudioPlaybackController } from 'Audio';
import { captureDevicePosition } from 'CameraInfo';
import Reactive from 'Reactive';
import NativeUI from 'NativeUI';

// face 
const face = FT.face(0);

// flag variables
// for required front camera or back camera
// user tap on screen 
// game is running or not
// loading starting ui on filter
// if game is running second time or more in repeat mode
// input from user blink have to receive or not
let screenON = false;
let tapON = false;
let gameON = false;
let StartUION = false;
let RepeatModeON = false;
let blinkModeON = false;
let mouthOpenON = false;

// camera position hold
// defualt is front facing
// change for the back camera usage
//remove ! from isBackCam to make back camera usage
CameraInfo.captureDevicePosition.monitor().subscribe(function (e) {
    if (e.newValue !== "BACK") {
        // if (e.newValue === "BACK") {
    } else {
        camerapos();
    }
});
camerapos();
function camerapos() {
    let cameraflip = Time.setInterval(() => {
        let isBackCam = CameraInfo.captureDevicePosition.eq("BACK").pinLastValue();
        //remove ! from isBackCam to make back camera usage
        if (!isBackCam) {
            Time.clearInterval(cameraflip);
            screenON = true;
            INS.bind(false, "flip_camera");
            // INS.bind(true, 'tap_to_start');
            // Time.setTimeout(() => {
            //   INS.bind(false, 'tap_to_start');
            // }, 4000);
        } else {
            screenON = false;
            INS.bind(true, "flip_camera");
        }
    }, 100);
}

// basic asynchronus function
(async function () {

})();

//lets use
(async function () {

    //load assets either using promise.all method or direct async await
    const itemList = await Promise.all([
        Scene.root.findFirst('item01'),
        Scene.root.findFirst('item02'),
        Scene.root.findFirst('item03'),
    ]);

    const receiver = await Scene.root.findFirst('receiver');

    // load material from scene assets
    const ItemMat = await MS.findFirst("ItemMaterial");

    //load 2d texturefrom scene assets
    const ItemTexture = await TS.findFirst("ItemTexture");

    //Plane Appear/disapper on tap
    let count = 1;
    TG.onTap().subscribe(function (gesture) {
        count++;
        if (count % 2 == 0) count = 0;
        receiver.hidden = count;
    });

    // audio
    Audio.getAudioPlaybackController('audio').then((playbackController) => {
        playbackController.reset();
        playbackController.setPlaying(true);
        playbackController.setLooping(true);
    });

})();


