/**
 * @Author gman park
 * @version 0.0.1
 *
 * @class gSegment
 *
 * */
var gSegment = function(){this.$init.apply(this, arguments)};

gSegment.prototype = {
    /**
     * svg 좌표 주소 [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
     * @private
     */
    aCord: [[15, 3], [6, 0], [11, 5], [15, 4], [6, 6], [13, 6], [13, 7], [7, 0], [15, 7], [15, 6]],

    /**
     * 현재 segment 값
     * @private
     */
    value: 0,

    /**
     * 현재 segment on / off 상태
     * @private
     */
    status: false,

    /**
     * @ignore
     * @constructs
     * @param {string | sCanvasID}
     * @param {number | nDisplayPositionX}
     * @param {number | nDisplayPositionY}
     */
    $init: function (sCanvasID, nDisPositionX, nDisPositionY) {
        this._setSVG('img/7segment.svg');
        this.canvas = document.getElementById(sCanvasID);
        this.ctx = this.canvas.getContext('2d');
        this.nDisPosX = nDisPositionX;
        this.nDisPosY = nDisPositionY;
    },
    /**
     * svg image onload
     * @private
     * @param {string | sImageName}
     */
    _setSVG: function (sImageName) {
        this.sprite = new Image();
        this.sprite.src = sImageName;
    },
    /**
     * 캔버스에 value 값을 표시
     * @private
     * @param {number | val}
     */
    drawNumber: function (val) {
        if (val < 0) {
            val = 9;
        }else if(val > 9){
            val = 0;
        }
        this.value = val;
        this.status = true;
        this.ctx.drawImage(this.sprite, this.aCord[val][0] * 60, this.aCord[val][1] * 100, 60, 100, this.nDisPosX, this.nDisPosY, 60, 100);
    },
    /**
     * 해당 segment 영역 canvas 삭제
     * @private
     */
    clear: function () {
        this.ctx.clearRect(this.nDisPosX, this.nDisPosY, 60, 100);
    },
    /**
     * getter : 현재 segment value 값
     * @private
     */
    readVal: function(){
        return this.value;
    }
}