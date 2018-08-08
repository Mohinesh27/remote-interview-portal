var AWS = require('aws-sdk');
var Speaker = require('speaker');
var Stream = require('stream');
const Fs = require('fs')

//Warning: Don't hardcode your AWS Keys
//Read more at http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
var Polly = new AWS.Polly({
    region: 'us-east-1',
    accessKeyId: '',
    secretAccessKey: ''
});

var getPlayer = function() {
    return new Speaker({
        channels: 1,
        bitDepth: 16,
        sampleRate: 16000
    });
}

var params = { OutputFormat: 'mp3', VoiceId: 'Raveena' }
var speak = function(text) {
    params.Text = text;
    Polly.synthesizeSpeech(params, function(err, res) {
        if (err) {
            console.log('err', err)
        } else if (res && res.AudioStream instanceof Buffer) {
            var bufferStream = new Stream.PassThrough()
            bufferStream.end(res.AudioStream)
            bufferStream.pipe(getPlayer());

            Fs.writeFile("./questions/speech.mp3", res.AudioStream, function(er) {
                if (er) {
                    return console.log(er)
                }
                console.log("The file was saved!")
            })
        }
    })
}
module.exports = { Speak: speak };
