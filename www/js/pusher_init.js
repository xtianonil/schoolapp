var pusher = new Pusher('d13c29fea61746c0bf48', {
    cluster: 'ap1',
    encrypted: true
    });
var channel = pusher.subscribe('my-channel');