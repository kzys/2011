(function () {
    var OrangeJuice = function (height) {
        this.height = height;

        this._canvas = document.createElement('canvas');
        this._canvas.height = this.height;

        var instance = this;
        window.onresize = function () {
            instance._resize();
        };
        setInterval(function () {
            instance._resize();
        }, 1000);

        this._resize();
    };

    OrangeJuice.prototype = {
        canvasElement: function () {
            return this._canvas;
        },

        _resize: function () {
            var c = this._canvas;
            var w = document.body.offsetWidth;
            if (c.width != w) {
                c.width = w;
                this._draw(c);
            }
        },

        _draw: function (canvas) {
            var ctx = canvas.getContext('2d');
            var w = canvas.width;

            this._drawWithContext(ctx, w, 1);

            var i;
            for (i = 0; i < 10; i++) {
                this._drawWithContext(ctx, w, 0.2);
            }
        },

        _drawWithContext: function (ctx, width, alpha) {
            ctx.fillStyle = 'rgba(255, 255, 255, ' + alpha + ')';

            ctx.beginPath();
            ctx.moveTo(0, this.height * Math.random());

            var x = 0;
            var y;
            while (x < width) {
                x += (width * 0.4) * Math.random();
                y = this.height * Math.random();
                ctx.lineTo(x, y);
            }

            ctx.lineTo(width, 0);
            ctx.lineTo(0, 0);
            ctx.fill();
        }
    }

    function setup() {
        var juice = new OrangeJuice(50);

        var footer = document.getElementsByTagName('footer')[0];
        document.body.insertBefore(juice.canvasElement(), footer);
        footer.style.paddingTop = 0;

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
