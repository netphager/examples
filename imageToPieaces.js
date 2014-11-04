// var stage = new PIXI.Stage(0xFFFFFF);
var ImageToPeaces = (function () {
    function ImageToPeaces(imageSrc, PIXIinstance) {
        this.image = new Image();
        this.widthOfOnePiece = 30;
        this.heightOfOnePiece = 30;
        this.canvasWidth = 640;
        this.canvasHeight = 360;
        this.effectStarted = [];
        this.effectFinished = [];
        this.parts = [];
        var that = this;
        that.PIXI = PIXIinstance;
        // create an image with imageSrc from parameter
        that.image.src = imageSrc;
        that.image.onload = that.cutImage.bind(this);
        // render empty PIXI stage
        that.renderStage();
    }
    ImageToPeaces.prototype.renderStage = function () {
        var that = this;
        that.stage = new that.PIXI.Stage(0xFFFFFF);
        that.renderer = that.PIXI.autoDetectRenderer(that.canvasWidth, that.canvasHeight);
        document.body.appendChild(that.renderer.view);
    };
    ImageToPeaces.prototype.cutImage = function () {
        var that = this;
        var imagePieces = [];
        for (var x = 0; x < 960 / that.widthOfOnePiece; ++x) {
            imagePieces[x] = [];
            for (var y = 0; y < that.canvasHeight / that.heightOfOnePiece; ++y) {
                var canvas = document.createElement('canvas');
                canvas.width = that.widthOfOnePiece;
                canvas.height = that.heightOfOnePiece;
                var context = canvas.getContext('2d');
                context.drawImage(that.image, x * that.widthOfOnePiece, y * that.heightOfOnePiece, that.widthOfOnePiece, that.heightOfOnePiece, 0, 0, canvas.width, canvas.height);
                imagePieces[x][y] = canvas.toDataURL();
            }
        }
        var i = 0;
        for (var x = 0; x < imagePieces.length; x++) {
            for (var y = 0; y < imagePieces[x].length; y++) {
                var texture = that.PIXI.Texture.fromImage(imagePieces[x][y]);
                // create a new Sprite using the texture
                var part = new that.PIXI.Sprite(texture);
                // move the sprite t the center of the screen
                part.position.x = x * that.widthOfOnePiece;
                part.position.y = y * that.widthOfOnePiece;
                i++;
                that.stage.addChild(part);
                that.parts.push(part);
            }
        }
    };
    ImageToPeaces.prototype.startEffect = function () {
        var that = this;
        for (var i = 0; i < that.parts.length; i++) {
            if (that.effectStarted.length < that.parts.length) {
                that.parts[i].alpha = 0;
                that.effectStarted[i] = 1;
            }
            else {
                if (that.effectFinished[i - 1] == 1 || i == 0) {
                    setTimeout(function (b) {
                        if (that.parts[b].alpha < 1) {
                            that.parts[b].alpha += Math.random() * 0.1;
                        }
                        else {
                            that.parts[b].alpha = 1;
                        }
                        that.effectFinished[b] = 1;
                    }, 100, i);
                }
                else {
                    break;
                }
            }
        }
        // render the stage
        that.renderer.render(that.stage);
    };
    return ImageToPeaces;
})();
