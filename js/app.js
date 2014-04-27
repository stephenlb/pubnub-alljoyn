(function(){

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Notifications
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
notify.area = PUBNUB.$('notification');

function notify( icon, text ) {
    animate( notify.area, [
        { 'd' : 0.5, 'opacity' : 1.0 },
        { 'd' : 2.0, 'opacity' : 1.0 },
        { 'd' : 1.0, 'opacity' : 0.0 }
    ] );
}

// setTimeout( notify, 3000 );

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


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Watch Receiver
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
PUBNUB.subscribe({
    channel : 'a',
    message : watch_receiver
});


watch_receiver.watch = PUBNUB.$('watch-out');
function watch_receiver(data) {
    watch_receiver.watch.innerHTML = data;
}

PUBNUB.bind( 'mousedown,touchstart', watch_receiver.watch, function() {
    PUBNUB.publish({
        channel : 'alljoyn-pubnub',
        message : 'HHhahahahaha'
    });
} );


})();
