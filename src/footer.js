(function () {
    var HEIGHT = 50;

    function drawWithContext(ctx, width, alpha) {
        ctx.fillStyle = 'rgba(255, 255, 255, ' + alpha + ')';

        ctx.beginPath();
        ctx.moveTo(0, HEIGHT * Math.random());

        var x = 0;
        var y;
        while (x < width) {
            x += (width * 0.4) * Math.random();
            y = HEIGHT * Math.random();
            ctx.lineTo(x, y);
        }

        ctx.lineTo(width, 0);
        ctx.lineTo(0, 0);
        ctx.fill();
    }

    function draw(canvas) {
        var width = document.body.offsetWidth;
        canvas.width = width;

        var ctx = canvas.getContext('2d');
        drawWithContext(ctx, width, 1);

        var i;
        for (i = 0; i < 10; i++) {
            drawWithContext(ctx, width, 0.2);
        }

        return width;
    }

    function setup() {
        var canvas = document.createElement('canvas');
        canvas.height = HEIGHT;

        var footer = document.getElementsByTagName('footer')[0];
        document.body.insertBefore(canvas, footer);

        var prev = 0;
        setInterval(function () {
            if (prev != document.body.offsetWidth) {
                prev = draw(canvas);
            }
        }, 1000);

        window.onresize = function () {
            prev = draw(canvas);
        };

        google.load('search', '1', {language : 'en'});
        google.setOnLoadCallback(function() {
            var control = new google.search.CustomSearchControl('004063301607934681022:zhzzal-4a8y');
            control.setResultSetSize(google.search.Search.SMALL_RESULTSET);

            var options = new google.search.DrawOptions();
            options.setAutoComplete(true);

            control.draw('cse', options);
        }, true);
    }

    if (Modernizr.canvas) {
        setup();
    }
})();
