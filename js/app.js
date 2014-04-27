(function(){

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Notifications
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
notify.area = PUBNUB.$('notification');

function notify( icon, text ) {
    animate( notify.area, [
        { 'd' : 0.5, 'opacity' : 1.0 },
        { 'd' : 0.1, 'color'   : '#fff' },
        { 'd' : 0.1, 'color'   : '#000' },
        { 'd' : 0.2, 'color'   : '#fff' },
        { 'd' : 0.1, 'color'   : '#000' },
        { 'd' : 0.1, 'color'   : '#fff' },
        { 'd' : 0.1, 'color'   : '#000' },
        { 'd' : 0.1, 'color'   : '#fff' },
        { 'd' : 1.0, 'opacity' : 1.0 }
    ] );
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Circle Meters
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function meter( id, value ) {
    PUBNUB.css( PUBNUB.$(id), {
        '-webkit-transform' : 'rotateZ('+value+'deg)'
    } );
}

function rnd(n) {
    return Math.random()*n;
}

setInterval( function() { meter( 'circle-meter-1', 90+rnd(70) ) }, 1000 );
setInterval( function() { meter( 'circle-meter-2', 90+rnd(70) ) }, 2000 );
setInterval( function() { meter( 'circle-meter-3', 90+rnd(70) ) }, 1000 );
setInterval( function() { meter( 'circle-meter-4', 90+rnd(70) ) }, 1000 );
setInterval( function() { meter( 'circle-meter-5', 90+rnd(70) ) }, 1000 );


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Watch Receiver
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
PUBNUB.subscribe({
    channel : 'alljoyn-pub,alljoyn',
    message : watch_receiver
});


watch_receiver.watch = PUBNUB.$('watch-out');
function watch_receiver(data) {
    watch_receiver.watch.innerHTML = data;
    notify();
    sounds.play('media/notify');
}

watch_receiver.num = 0;
PUBNUB.bind( 'mousedown,touchstart', PUBNUB.$('watch-button'), function() {
    var message = ' PubNub AllJoyn - ' + ++watch_receiver.num;

    PUBNUB.publish({ channel : 'a', message : message });
    PUBNUB.publish({ channel : 'alljoyn-pub', message : message });

} );


})();
