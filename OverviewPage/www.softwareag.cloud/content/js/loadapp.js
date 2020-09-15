function loadFile(path, type) {
    if (type == 'js') {
        $('head').append('<script type="text/javascript" src="' + path + '"></script>');
    } else if (type == 'css') {
        $('head').append('<link href="' + path + '" rel="stylesheet" type="text/css">');
    }
}
// Scripts
$.get('/hash.txt', function(data, status) {
    if (status === 'success') {
        var hashString = data.substring('SCI_MYCLOUD_HASH='.length);
        if (hashString === 'debug') {
            hashString = '';
        } else {
            hashString = '.' + hashString;


        }
        var timeStamp = Math.floor(Date.now());
        loadFile('/app/polyfills' + hashString + '.bundle.js?timeStamp='+timeStamp, 'js');
        loadFile('/app/main' + hashString + '.bundle.js?timeStamp='+timeStamp, 'js');
        loadFile('/app/global' + hashString + '.bundle.js?timeStamp='+timeStamp, 'js');
        loadFile('/app/0' + hashString + '.chunk.js?timeStamp='+timeStamp, 'js');

    }
});

