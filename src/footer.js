(function () {
    var OrangeJuice = function (height) {
        this.height = height;

        this._canvas = document.createElement('canvas');
        this._canvas.height = this.height;
        this._canvas.style.display = 'block';

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

    function getTime(article) {
        var time = article.getElementsByTagName('time')[0];
        var ary = time.getAttribute('datetime').split(/-/);
        return new Date(ary[0], parseInt(ary[1], 10)-1, ary[2]).getTime();
    }

    function createMarginElement(delta) {
        var result = document.createElement('div');
        result.style.marginTop = (delta * 10) + 'ex';
        return result;
    }

    function insertMaginElements() {
        var articles = document.getElementsByTagName('article');
        var i;
        var delta;
        for (i = 0; i < articles.length-1; i++) {
            delta = getTime(articles[i]) - getTime(articles[i+1]);
            delta /= (60 * 60 * 24 * 2000);

            articles[i].parentNode.insertBefore(createMarginElement(delta),
                                                articles[i+1])
        }
    }

    function setup() {
        insertMaginElements();

        google.load('search', '1', {language : 'en'});
        google.setOnLoadCallback(function() {
            var control = new google.search.CustomSearchControl('004063301607934681022:zhzzal-4a8y');
            control.setResultSetSize(google.search.Search.SMALL_RESULTSET);

            var options = new google.search.DrawOptions();
            options.setAutoComplete(true);

            control.draw('cse', options);
        }, true);
    }

    setup();
})();
