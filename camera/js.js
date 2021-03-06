
//// Elements for taking the snapshot  
var canvasPreview = document.getElementById('canvasPreview');
var canvasUpload = document.getElementById('canvasUpload');
var contextPreview = canvasPreview.getContext('2d');
var contextUpload = canvasUpload.getContext('2d');




//#################### Video Source #######################3  
var videoElement = document.querySelector('video');
var videoSelect = document.querySelector('select#videoSource');


navigator.mediaDevices.enumerateDevices()
    .then(gotDevices).then(getStream).catch(handleError);


videoSelect.onchange = getStream;




function gotDevices(deviceInfos) {
    for (var i = 0; i < deviceInfos.length; ++i) {
        var deviceInfo = deviceInfos[i];
        var option = document.createElement('option');
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === 'videoinput') {
            option.text = deviceInfo.label ||
                'camera ' +
                (videoSelect.length + 1);
            videoSelect.appendChild(option);
        } else {
            console.log('Found ome other kind of source/device: ', deviceInfo);
        }
    }
}


var _streamCopy = null;
function getStream() {
    if (_streamCopy != null) {
        try {
            _streamCopy.stop(); // if this method doesn't exist, the catch will be executed.  
        } catch (e) {
            _streamCopy.getVideoTracks()[0].stop(); // then stop the first video track of the stream  
        }
    }

    var constraints = {
        audio:false,
        video: {
            optional: [
                {
                    sourceId: videoSelect.value
                }
            ]
        }
    };

    navigator.mediaDevices.getUserMedia(constraints).then(gotStream).catch(handleError);
}


function gotStream(stream) {
    _streamCopy = stream; // make stream available to console  
    videoElement.srcObject = stream;
}


function handleError(error) {
    alert(error.name + ": " + error.message);
}


//######################## End Video Source #################  




// Get access to the camera!  
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        videoElement.src = window.URL.createObjectURL(stream);
        videoElement.play();


    });
} else {
    document.getElementById("pnlVideo1").style.display = "none";
}




//// Trigger photo take  
document.getElementById("snap").addEventListener("click",
    function() {
        contextPreview.drawImage(videoElement, 0, 0, 300, 224);
        contextUpload.drawImage(videoElement, 0, 0, 300, 224);
        document.getElementById("video").style.display = "none";
        document.getElementById("snap").style.display = "none";
        document.getElementById("canvasPreview").style.display = "block";


        var image = document.getElementById("canvasUpload").toDataURL("image/jpeg");
        image = image.replace('data:image/jpeg;base64,', '');
        $("#imgValue").val(image);

        alert("image value :" + image);
    });


//// Trigger photo take  




document.getElementById("btnOpen1").addEventListener("click",
    function() {
        document.getElementById("vdoOne").style.display = "block";
        document.getElementById("video").style.display = "block";
        document.getElementById("snap").style.display = "block";
        document.getElementById("canvasPreview").style.display = "none";
    });
