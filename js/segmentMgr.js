/**
 * @Author gman park
 * @version 0.0.1
 *
 * @class segmentMgr
 */

var segmentMgr = function(){this.$init.apply(this,arguments)}

segmentMgr.prototype = {
    /**
     * 소켓 통신을 위한 객체
     * @private
     */
    socket:{},

    /**
     * @ignore
     * @constructs
     * @param {array | aSegment}
     */
    $init: function(aSegment){
        this.aSeg = aSegment;
        this._initAnimation();
    },

    /**
     * 최초 세그먼트들이 정상 동작하는지 체크하기 위한 애니메이션
     * @private
     */
    _initAnimation: function(){
        function isSegmentOn(arr) {
            var bool = true;
            for (sIndex in arr) {
                if ( arr[sIndex].status == false ) {
                    bool = false;
                }
            }
            return bool;
        }

        var interval = setInterval(function () {
            this.aSeg[Math.floor((Math.random() * 6))].drawNumber(Math.floor((Math.random() * 9) + 1));
            if (isSegmentOn(this.aSeg)) {
                clearInterval(interval);
            }
        }.bind(this), 300);
    },

    /**
     * 소켓 설정
     * @public
     */
    setSocket: function(socket){
        this.socket = socket;
        this._attachedSocketEvent();
    },

    /**
     * 소켓 이벤트 리스너 설정
     * @private
     */
    _attachedSocketEvent: function(){
        var clock = {};

        this.socket.on('welcome', function (data) {
            console.log(data.msg);
        }.bind(this))

        this.socket.on('actUp', function (data) {
            this.aSeg[data.sid].drawNumber(this.aSeg[data.sid].readVal()+1);
        }.bind(this))

        this.socket.on('actDn', function (data) {
            this.aSeg[data.sid].drawNumber(this.aSeg[data.sid].readVal()-1);
        }.bind(this))

        this.socket.on('startClock', function(){

            clock = setInterval(function(){
                var currentTime = new Date();
                this.aSeg[0].drawNumber(Math.floor(currentTime.getHours()/10));
                this.aSeg[1].drawNumber(currentTime.getHours()%10);
                this.aSeg[2].drawNumber(Math.floor(currentTime.getMinutes()/10));
                this.aSeg[3].drawNumber(currentTime.getMinutes()%10);
                this.aSeg[4].drawNumber(Math.floor(currentTime.getSeconds()/10));
                this.aSeg[5].drawNumber(currentTime.getSeconds()%10);
            }.bind(this),1000);

        }.bind(this))

        this.socket.on('stopClock', function() {
            clearInterval(clock);
        }.bind(this))
    }
}