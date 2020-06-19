﻿// var points = [];
// var userinfoAry = [];
// var userinfoIndex = 0;

// TODO————————————跟踪状态全局
var Trackstate = true
function ChangeStatus(){
    Trackstate=true
}
// 语音
function Voice(a, b, c, d) {
    let obj = {
        strLongitude: a,
        strLatitude: b,
        strNum: c,
        strName: d
    };
    G5BrowserFeatures.VoiceCall(JSON.stringify(obj));
}

// 视频
function Video(a, b, c, d) {
    let obj = {
        strLongitude: a,
        strLatitude: b,
        strNum: c,
        strName: d
    };
    G5BrowserFeatures.VideoCall(JSON.stringify(obj));
}

// 监控
function Monitor(a, b, c, d) {
    let obj = {
        strLongitude: a,
        strLatitude: b,
        strNum: c,
        strName: d
    };
    G5BrowserFeatures.Monitor(JSON.stringify(obj));
}

// 跟踪
var index = 0
function Track(a, b, c, d) {
    if (Trackstate) { //判断当前跟踪状态
        var obj = {
            strLongitude: a,
            strLatitude: b,
            strNum: c,
            strName: d
        };
        map.closeInfoWindow(); //关闭信息窗口
        var line = map.getOverlays()
        for (var i = 0; i < line.length; i++) {
            if (line[i].toString().indexOf("Polyline") > 0) { //删除折线
                map.removeOverlay(line[i]);
            }
        }
        var promise = new Promise((resolve, reject) => {
            var allOverlay = map.getOverlays();
            for (let i = 0; i < allOverlay.length - 1; i++) {
                if (allOverlay[i] instanceof BMap.Marker) {
                    if (allOverlay[i].getPosition().lng == a && allOverlay[i].getPosition().lat == b) {
                        setTimeout(() => {
                            map.removeOverlay(allOverlay[i]); //删除指定坐标
                        }, 100);
                    }
                    if (allOverlay[i].getLabel() != null) {
                        if (allOverlay[i].getLabel().content == c) { //通过id删除
                            map.removeOverlay(allOverlay[i]);
                        }
                    }
                }
                resolve()
            }
        })
        promise.then(() => {
            let allOverlay = map.getOverlays();
            for (let i = 0; i < allOverlay.length; i++) {
                if (allOverlay[i] instanceof BMap.Marker) {
                    if (allOverlay[i].getLabel() != null) {
                        if (allOverlay[i].getLabel().content == c) { //通过id删除
                            map.removeOverlay(allOverlay[i]);
                        }
                    }
                    if (allOverlay[i].getPosition().lng == a && allOverlay[i].getPosition().lat == b) {
                        setTimeout(() => {
                            map.removeOverlay(allOverlay[i]); //删除指定坐标
                        }, 100);
                    }
                }
            }
            Trackstate = false
            G5BrowserFeatures.Track(JSON.stringify(obj));
        })
    } else {
        layer.msg("请先结束当前跟踪状态后再操作", {
            icon: 2
        });
    }
}
// 监听
function Information(a, b, c, d) {
    let obj = {
        strLongitude: a,
        strLatitude: b,
        strNum: c,
        strMobileNum: d
    };
    G5BrowserFeatures.MonitorListen(JSON.stringify(obj));
}
//公告
function Notice(a, b, c, d) {
    let obj = {
        strLongitude: a,
        strLatitude: b,
        strNum: c,
        strName: d
    };
    G5BrowserFeatures.MessageNotification(JSON.stringify(obj));
}


// TODO 普通描点模拟数据
var newGis = {
    "strNum": "735106",
    "strName": "阿布都热西提皮皮买买提阿布都热西提皮皮买买提阿布都热西提皮皮买买提阿布都热西提皮皮买买提阿布都热西提皮皮买买提",
    "strPosition": "123asdasd阿斯达四大所大所大所大所大所多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多",
    "strMobileNum": "阿斯达四大所大所大所大所大所多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多",
    "strHomeNum": "230987",
    "strCompanyNum": "789",
    "id": "735106",
    "strLongitude": " 106.552",
    "strLatitude": "29.554666",
    "strHigh": null,
    "lastDate": "2020-04-22 10:48:56",
    "state": true,
    "deptName": "ssssaaaa"
}
var oldGis1 = {
    "strNum": "735106",
    "strName": "阿布都热西提皮皮买买提阿布都热西提皮皮买买提阿布都热西提皮皮买买提阿布都热西提皮皮买买提阿布都热西提皮皮买买提",
    "strPosition": "123asdasd阿斯达四大所大所大所大所大所多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多",
    "strMobileNum": "阿斯达四大所大所大所大所大所多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多",
    "strHomeNum": "230987",
    "strCompanyNum": "789",
    "id": "735106",
    "strLongitude": " 106.552",
    "strLatitude": "29.554666",
    "strHigh": null,
    "lastDate": "2020-04-22 10:48:56",
    "state": false,
    "deptName": "ssssaaaa"
}
var oldGis = {
    // strLongitude: " 106.520",
    // strLatitude: "29.550",
    // strNum: "123465789",
    // strName: "张三",
    // strPosition: "所长",
    // strMobileNum: "18111184268",
    // strHomeNum: 4247488,
    // strCompanyNum: 4247488,
    // lastDate: "2019年12月23日16:41:05",
    // state: 0,
    // label: 0,
    // "deptName":"辣鸡"

}
var clear = false
var showMarker = true
var newGis2 = {
    "strNum": "000000",
    "strName": "asdasd123",
    "strPosition": "123",
    "strMobileNum": "123",
    "strHomeNum": "123",
    "strCompanyNum": "123",
    "id": "735106",
    "strLongitude": " 106.555",
    "strLatitude": "29.555",
    "strHigh": null,
    "lastDate": "2020-04-22 10:48:56",
    "state": true,
    "deptName": "ssssaaaa"
}



/**
 * TODO  地图普通描点
 * @param {Object} newGis 新的Gis对象
 * @param {Object} oldGis 原来的Gis对象
 * @param {boolean} clear 是否清除该执法仪的坐标点，注意当为 true 时，newGis为null, 只需要删除 oldGis 地图描点即可
 * @param {boolean} showMarker 绘制完坐标点后，是否显示 marker 详细信息
 */
var Api_TracePoint = function (newGis, oldGis, clear, showMarker) {
    if (TrackingID == newGis.id) {
        return false
    } else {
        if (clear) {
            var allOverlay = map.getOverlays();
            for (var i = 0; i < allOverlay.length; i++) {
                if (allOverlay[i] instanceof BMap.Marker) {
                    if (allOverlay[i].getLabel() != null) { //通过id删除
                        if (allOverlay[i].getLabel().content == newGis.id) {
                            map.removeOverlay(allOverlay[i]);
                            map.closeInfoWindow(); //关闭信息窗口
                        }
                    }
                    if (allOverlay[i].getPosition() != null) {
                        if (allOverlay[i].getPosition().lng == newGis.strLongitude) {
                            map.removeOverlay(allOverlay[i]);
                            map.closeInfoWindow(); //关闭信息窗口
                        }
                    }
                }
            }
            return false
        } else {
            if (oldGis) {
                var promise = new Promise(function (resolve, reject) {
                    var allOverlay = map.getOverlays();
                    for (var i = 0; i < allOverlay.length; i++) {
                        if (allOverlay[i] instanceof BMap.Marker) {
                            if (allOverlay[i].getLabel() != null) { //通过id删除
                                if (allOverlay[i].getLabel().content == oldGis.id) {
                                    map.removeOverlay(allOverlay[i]);
                                    map.closeInfoWindow(); //关闭信息窗口
                                }
                            }
                            if (allOverlay[i].getPosition() != null) {
                                if (allOverlay[i].getPosition().lng == oldGis.strLongitude) {
                                    map.removeOverlay(allOverlay[i]);
                                    map.closeInfoWindow(); //关闭信息窗口
                                }
                            }
                        }
                    }
                    resolve()
                })
                promise.then(() => {
                    var point = new BMap.Point(newGis.strLongitude, newGis.strLatitude);
                    let state = newGis.state
                    if (state == 0) {
                        var myIcon = new BMap.Icon("image/lx.png",
                            new BMap.Size(30, 30), {
                                offset: new BMap.Size(100, 100),
                            });
                    } else if (state == 1) {
                        var myIcon = new BMap.Icon("image/zx.png",
                            new BMap.Size(40, 40), {
                                offset: new BMap.Size(30, 50),
                            });
                    }
                 
                    var markerArr = new BMap.Marker(point, {
                        icon: myIcon
                    });
                    var label = new BMap.Label(newGis.strNum, {
                        offset: new BMap.Size(20, -10)
                    }); //新建声明label对象
                    label.setStyle({
                        display: "none"
                    })

                    markerArr.setLabel(label);
                    map.addOverlay(markerArr); //将标注添加到地图中
                    markerArr.addEventListener("click", function (e) {
                        normalInfoWindow(newGis, markerArr, point, showMarker);
                    });
                    normalInfoWindow(newGis, markerArr, point, showMarker)
                    function normalInfoWindow(newGis, sosmarker, point, showMarker) {
                        let opts = {
                            width: 320, // 信息窗口宽度
                            height: 222, // 信息窗口高度
                            title: "<h1 title=" + '  ' + newGis.strName + ' ' + ">" + newGis.strName + "</h1>", // 信息窗口标题
                        };
                        $.ajax({
                            url: 'http://api.map.baidu.com/geocoder/v2/?ak=N1FRhUpF6M0lcGGY8K5MzSa0WoGhoGpO&location=' + point.lat + ',' + point.lng + '&output=json',
                            dataType: 'jsonp',
                            callback: 'BMap._rd._cbk43398',
                            success: function (res) {
                                let dw = res.result.formatted_address
                                var html = [];
                                // 内层文字
                                html.push('<ul>');
                                html.push('<li class="content">');
                                html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">通讯号:</h1> <h2 style="vertical-align:top;">' + newGis.strNum + ' </h2></div>');
                                html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">部门:</h1> <h2 style="vertical-align:top;overflow:hidden;white-space:nowrap;text-overflow:ellipsis"  title="' + newGis.deptName + '">' + newGis.deptName + ' </h2></div>');
                                html.push('</li>');
                                html.push('<li class="content">');
                                html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">职位:</h1> <h2 style="vertical-align:top;"  title="' + newGis.strPosition + '">' + newGis.strPosition + ' </h2></div>');
                                html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">手机:</h1> <h2 style="vertical-align:top;"  title="' + newGis.strMobileNum + '">' + newGis.strMobileNum + ' </h2></div>');
                                html.push('</li>');
                                html.push('<li class="content">');
                                html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">经度:</h1> <h2 style="vertical-align:top;">' + newGis.strLongitude + ' </h2></div>');
                                html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">纬度:</h1> <h2 style="vertical-align:top;">' + newGis.strLatitude + ' </h2></div>');
                                html.push('</li>');
                                html.push('<li class="content">');
                                html.push('<div class="content_left" style="width:100%"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all;width:30%">位置:</h1> <h2 style="vertical-align:top;width:70%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap"  title="' + dw + '">' + dw + ' </h2></div>');
                                html.push('</li>');
                                html.push('<li class="content">');
                                html.push('<div class="content_left" style="width:100%"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all;width:30%">上报时间:</h1> <h2 style="vertical-align:top; width:70%;color:#ff6600;">' + newGis.lastDate + ' </h2></div>');
                                html.push('<li class="content">');
                                html.push('<button class="Voice" onclick="Voice(' + newGis.strLongitude + ',' + newGis.strLatitude + ',' + newGis.strNum + ',\'' + newGis.strName + '\')">语音</button>');
                                html.push('<button class="Video" onclick="Video(' + newGis.strLongitude + ',' + newGis.strLatitude + ',' + newGis.strNum + ',\'' + newGis.strName + '\')">视频</button>');
                                html.push('<button class="Monitor" onclick="Monitor(' + newGis.strLongitude + ',' + newGis.strLatitude + ',' + newGis.strNum + ',\'' + newGis.strName + '\')">监控</button>');
                                html.push('<button class="Track" onclick="Track(' + newGis.strLongitude + ',' + newGis.strLatitude + ',' + newGis.strNum + ',\'' + newGis.strName + '\')">跟踪</button>');
                                html.push('<button class="Information" onclick="Information(' + newGis.strLongitude + ',' + newGis.strLatitude + ',' + newGis.strNum + ',\'' + newGis.strName + '\')">监听</button>');
                                html.push('<button class="Information" onclick="Notice(' + newGis.strLongitude + ',' + newGis.strLatitude + ',' + newGis.strNum + ',\'' + newGis.strName + '\')">公告</button>');
                                html.push('</li>');
                                html.push('</ul>');
                                var infoWindow = new BMap.InfoWindow(html.join(""), opts); // 创建信息窗口对象
                                sosmarker.addEventListener("click", function () {
                                    map.openInfoWindow(infoWindow, point); //自动开启信息窗口
                                    map.centerAndZoom(point, 19) //描点自动居中
                                });
                                // map.centerAndZoom(point, 19) //描点自动居中
                                if (showMarker) {
                                    map.openInfoWindow(infoWindow, point); //开启信息窗口
                                    map.centerAndZoom(point, 19); //描点自动居中
                                }
                            }
                        })
                    }
                })
            }else{
                setTimeout(() => {
                    var point = new BMap.Point(newGis.strLongitude, newGis.strLatitude);
                    // map.centerAndZoom(point, 19); //描点自动居中
                    let state = newGis.state
                    if (state == 0) {
                        var myIcon = new BMap.Icon("image/lx.png",
                            new BMap.Size(30, 30), {
                                offset: new BMap.Size(100, 100),
                            });
                    } else if (state == 1) {
                        var myIcon = new BMap.Icon("image/zx.png",
                            new BMap.Size(40, 40), {
                                offset: new BMap.Size(30, 50),
                            });
                    }
                    var markerArr = new BMap.Marker(point, {
                        icon: myIcon
                    });
                    var label = new BMap.Label(newGis.strNum, {
                        offset: new BMap.Size(20, -10)
                    }); //新建声明label对象
                    label.setStyle({
                        display: "none"
                    })

                    markerArr.setLabel(label);

                    map.addOverlay(markerArr); //将标注添加到地图中

                    markerArr.addEventListener("click", function () {
                        normalInfoWindow(newGis, markerArr, point,showMarker);
                        // map.centerAndZoom(point, 19); //描点自动居中
                    });
                    function normalInfoWindow(newGis, sosmarker, point, showMarker) {
                        let opts = {
                            width: 320, // 信息窗口宽度
                            height: 222, // 信息窗口高度
                            title: "<h1 title=" + '  ' + newGis.strName + ' ' + ">" + newGis.strName + "</h1>", // 信息窗口标题
                        };
                        $.ajax({
                            url: 'http://api.map.baidu.com/geocoder/v2/?ak=N1FRhUpF6M0lcGGY8K5MzSa0WoGhoGpO&location=' + point.lat + ',' + point.lng + '&output=json',
                            dataType: 'jsonp',
                            callback: 'BMap._rd._cbk43398',
                            success: function (res) {
                                let dw = res.result.formatted_address
                                var html = [];
                                // 内层文字
                                html.push('<ul>');
                                html.push('<li class="content">');
                                html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">通讯号:</h1> <h2 style="vertical-align:top;">' + newGis.strNum + ' </h2></div>');
                                html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">部门:</h1> <h2 style="vertical-align:top;overflow:hidden;white-space:nowrap;text-overflow:ellipsis"  title="' + newGis.deptName + '">' + newGis.deptName + ' </h2></div>');
                                html.push('</li>');
                                html.push('<li class="content">');
                                html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">职位:</h1> <h2 style="vertical-align:top;"  title="' + newGis.strPosition + '">' + newGis.strPosition + ' </h2></div>');
                                html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">手机:</h1> <h2 style="vertical-align:top;"  title="' + newGis.strMobileNum + '">' + newGis.strMobileNum + ' </h2></div>');
                                html.push('</li>');
                                html.push('<li class="content">');
                                html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">经度:</h1> <h2 style="vertical-align:top;">' + newGis.strLongitude + ' </h2></div>');
                                html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">纬度:</h1> <h2 style="vertical-align:top;">' + newGis.strLatitude + ' </h2></div>');
                                html.push('</li>');
                                html.push('<li class="content">');
                                html.push('<div class="content_left" style="width:100%"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all;width:30%">位置:</h1> <h2 style="vertical-align:top;width:70%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap"  title="' + dw + '">' + dw + ' </h2></div>');
                                html.push('</li>');
                                html.push('<li class="content">');
                                html.push('<div class="content_left" style="width:100%"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all;width:30%">上报时间:</h1> <h2 style="vertical-align:top; width:70%;color:#ff6600;">' + newGis.lastDate + ' </h2></div>');
                                html.push('<li class="content">');
                                html.push('<button class="Voice" onclick="Voice(' + newGis.strLongitude + ',' + newGis.strLatitude + ',' + newGis.strNum + ',\'' + newGis.strName + '\')">语音</button>');
                                html.push('<button class="Video" onclick="Video(' + newGis.strLongitude + ',' + newGis.strLatitude + ',' + newGis.strNum + ',\'' + newGis.strName + '\')">视频</button>');
                                html.push('<button class="Monitor" onclick="Monitor(' + newGis.strLongitude + ',' + newGis.strLatitude + ',' + newGis.strNum + ',\'' + newGis.strName + '\')">监控</button>');
                                html.push('<button class="Track" onclick="Track(' + newGis.strLongitude + ',' + newGis.strLatitude + ',' + newGis.strNum + ',\'' + newGis.strName + '\')">跟踪</button>');
                                html.push('<button class="Information" onclick="Information(' + newGis.strLongitude + ',' + newGis.strLatitude + ',' + newGis.strNum + ',\'' + newGis.strName + '\')">监听</button>');
                                html.push('<button class="Information" onclick="Notice(' + newGis.strLongitude + ',' + newGis.strLatitude + ',' + newGis.strNum + ',\'' + newGis.strName + '\')">公告</button>');
                                html.push('</li>');
                                html.push('</ul>');
                                sosmarker.addEventListener("click", function () {
                                    map.openInfoWindow(infoWindow, point); //自动开启信息窗口
                                });
                                var infoWindow = new BMap.InfoWindow(html.join(""), opts); // 创建信息窗口对象
                                if (showMarker == true) {
                                    map.openInfoWindow(infoWindow, point); //开启信息窗口
                                    map.centerAndZoom(point, 19); //描点自动居中
                                }
                            }
                        })
                    }
                    normalInfoWindow(newGis, markerArr, point, showMarker)
                }, 50);
            }
        }
    }
}


// 跟踪模拟数据
var onOff = true;
var gis = {
    strNum: "735106",
    strName: "阿萨德啧啧啧",
    strPosition: "按时大大",
    strMobileNum: "1asdasd",
    strHomeNum: "230987",
    strCompanyNum: "789",
    id: "735106",
    strLongitude: 106.552,
    strLatitude: 29.554666,
    strHigh: null,
    lastDate: "2020-05-22 10:48:56",
    state: 1

};
var GisTrackingData = null;
var timer = null;

var show = setInterval(() => {
    gis.strLongitude = gis.strLongitude + 0.005;
    gis.strLatitude = gis.strLatitude + 0.005;
}, 2000);
var trackobj = {
    strNum: "",
    point: []
};
var index = 0;
var Linearr = [];
var TrackingID = null;
var name = null;
// TODO 跟踪
var Api_MapTracking = function (gis, onOff) {
    name = gis.strNum
    if (onOff) {
        GisTrackingData = gis
        trackobj.strNum = gis.strNum
        TrackingID = gis.strNum
        if (trackobj.strNum == gis.strNum) {
            let myIcon = new BMap.Icon("image/thz.png", new BMap.Size(50, 50));
            let point = new BMap.Point(gis.strLongitude, gis.strLatitude);
            let trackmarker = new BMap.Marker(point, {
                icon: myIcon
            }); // 创建起点标注
            // map.centerAndZoom(point, 13);
            let label = new BMap.Label(gis.strNum, {
                offset: new BMap.Size(20, -10)
            }); //新建声明label对象
            label.setStyle({
                display: "none"
            })
            trackmarker.setLabel(label);
            map.closeInfoWindow(); //关闭信息窗口
            map.addOverlay(trackmarker); // 将标注添加到地图中
            trackmarker.addEventListener("click", function () {
                lInfoWindow(gis, trackmarker, point);
            });

            function lInfoWindow(gis, trackmarker, point){
                let opts = {
                    width: 320, // 信息窗口宽度
                    height: 222, // 信息窗口高度
                    title: "<h1 title=" + '  ' + gis.strName + ' ' + ">" + gis.strName + "</h1>", // 信息窗口标题
                };
                $.ajax({
                    url: 'http://api.map.baidu.com/geocoder/v2/?ak=N1FRhUpF6M0lcGGY8K5MzSa0WoGhoGpO&location=' + point.lat + ',' + point.lng + '&output=json',
                    dataType: 'jsonp',
                    callback: 'BMap._rd._cbk43398',
                    success: function (res) {
                        var dw = res.result.formatted_address
                        var html = [];
                        html.push('<ul>');
                        html.push('<li class="content">');
                        html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">通讯号:</h1> <h2 style="vertical-align:top;">' + gis.strNum + ' </h2></div>');
                        html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">部门:</h1> <h2 style="vertical-align:top;overflow:hidden;white-space:nowrap;text-overflow:ellipsis"  title="' + gis.deptName + '">' + gis.deptName + ' </h2></div>');
                        html.push('</li>');

                        html.push('<li class="content">');
                        html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">职位:</h1> <h2 style="vertical-align:top;"  title="' + gis.strPosition + '">' + gis.strPosition + ' </h2></div>');
                        html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">手机:</h1> <h2 style="vertical-align:top;"  title="' + gis.strMobileNum + '">' + gis.strMobileNum + ' </h2></div>');
                        html.push('</li>');

                        html.push('<li class="content">');
                        html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">经度:</h1> <h2 style="vertical-align:top;">' + gis.strLongitude + ' </h2></div>');
                        html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">纬度:</h1> <h2 style="vertical-align:top;">' + gis.strLatitude + ' </h2></div>');
                        html.push('</li>');

                        html.push('<li class="content">');
                        html.push('<div class="content_left" style="width:100%"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all;width:30%">位置:</h1> <h2 style="vertical-align:top;width:70%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap"  title="' + dw + '">' + dw + ' </h2></div>');

                        html.push('</li>');

                        html.push('<li class="content">');
                        html.push('<div class="content_left" style="width:100%"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all;width:30%">上报时间:</h1> <h2 style="vertical-align:top; width:70%;color:#ff6600;">' + gis.lastDate + ' </h2></div>');
                        html.push('<li class="content">');
                        html.push('<button class="Voice" onclick="Voice(' + gis.strLongitude + ',' + gis.strLatitude + ',' + gis.strNum + ',\'' + gis.strName + '\')">语音</button>');
                        html.push('<button class="Video" onclick="Video(' + gis.strLongitude + ',' + gis.strLatitude + ',' + gis.strNum + ',\'' + gis.strName + '\')">视频</button>');
                        html.push('<button class="Monitor" onclick="Monitor(' + gis.strLongitude + ',' + gis.strLatitude + ',' + gis.strNum + ',\'' + gis.strName + '\')">监控</button>');
                        html.push('<button class="cancelMonitor" style="width: 24%" onclick="cancelMonitor(' + gis.strLongitude + ',' + gis.strLatitude + ',' + gis.strNum + ',\'' + gis.strName + '\')">取消跟踪</button>');
                        html.push('<button class="Information" onclick="Information(' + gis.strLongitude + ',' + gis.strLatitude + ',' + gis.strNum + ',\'' + gis.strName + '\')">监听</button>');
                        html.push('<button class="Information" onclick="Notice(' + gis.strLongitude + ',' + gis.strLatitude + ',' + gis.strNum + ',\'' + gis.strName + '\')">公告</button>');

                        html.push('</li>');
                        html.push('</ul>');
                        let infoWindow = new BMap.InfoWindow(html.join(""), opts); // 创建信息窗口对象
                        map.openInfoWindow(infoWindow, point);
                    }
                })
            }
            if (trackobj.point.length == 1) {
                var polyline = new BMap.Polyline([
                    new BMap.Point(gis.strLongitude, gis.strLatitude),
                    new BMap.Point(trackobj.point[0].point.lng, trackobj.point[0].point.lat)
                ], {
                    strokeColor: "red",
                    strokeWeight: 3,
                    strokeOpacity: 3
                }); //创建折线
                Linearr.push(polyline)
            } else if (trackobj.point.length >= 2) {
                if (index == 0) {
                    let promise = new Promise((resolve, reject) => {
                        var line = map.getOverlays();
                        for (let i = 0; i < line.length; i++) {
                            if (line[i].toString().indexOf("Polyline") > 0) { //删除折线
                                map.removeOverlay(line[i]);
                            }
                            if (line[i].toString() == "[object Polyline]") {
                                map.removeOverlay(line[i]);
                            }
                        }
                        resolve()
                    })
                    promise.then(() => {
                        var polyline = new BMap.Polyline([
                            new BMap.Point(GisTrackingData.strLongitude, GisTrackingData.strLatitude),
                            new BMap.Point(trackobj.point[trackobj.point.length - 1].point.lng, trackobj.point[trackobj.point.length - 1].point.lat)
                        ], {
                            strokeColor: "red",
                            strokeWeight: 3,
                            strokeOpacity: 3
                        }); //创建折线
                        Linearr.push(polyline)
                    })
                } else {
                    var polyline = new BMap.Polyline([
                        new BMap.Point(GisTrackingData.strLongitude, GisTrackingData.strLatitude),
                        new BMap.Point(trackobj.point[trackobj.point.length - 1].point.lng, trackobj.point[trackobj.point.length - 1].point.lat)
                    ], {
                        strokeColor: "red",
                        strokeWeight: 3,
                        strokeOpacity: 3
                    }); //创建折线
                    Linearr.push(polyline)
                }

            }
            map.addOverlay(polyline); //添加线条到地图
            if (trackobj.point.length >= 1) { //删除跟踪的上一个点
                for (let i = 0; i < trackobj.point.length; i++) {
                    map.removeOverlay(trackobj.point[i])
                }
            }
            timer = setTimeout(() => {
                if (GisTrackingData) {
                    G5BrowserFeatures.GetMemberGisById(name).then(res => {
                        res = JSON.parse(res)
                        Api_MapTracking(res, true);
                    })
                }
            }, 5000)
            trackobj.point.push(trackmarker)
            index++
        } else {
            // 删除所有的线段
            for (let i = 0; i < Linearr.length; i++) {
                map.removeOverlay(Linearr[i])
            }
            let promise = new Promise((resolve, reject) => {
                var Polyline = map.getOverlays();
                for (let i = 0; i < Polyline.length; i++) {
                    if (Polyline[i].toString().indexOf("Polyline") > 0) { //删除折线
                        map.removeOverlay(Polyline[i]);
                    }
                    if (Polyline[i].toString() == "[object Polyline]") {
                        map.removeOverlay(Polyline[i]);
                    }
                }
                resolve()
            })
            promise.then(() => {
                // 清空定时器
                clearInterval(timer);
                map.removeOverlay(trackobj.point[trackobj.point.length - 1]) // 清除最后一个点
                var Polyline = map.getOverlays();
                for (let i = 0; i < Polyline.length; i++) {
                    if (Polyline[i].toString().indexOf("Polyline") > 0) { //删除折线
                        map.removeOverlay(Polyline[i]);
                    }
                    if (Polyline[i].toString() == "[object Polyline]") {
                        map.removeOverlay(Polyline[i]);
                    }
                }
                // 清空数据
                trackobj.strNum = ""
                trackobj.point = []
                trackobj.point.length = 0
                Linearr = []
            })
        }
    } else {
        index == 0
        TrackingID = null
        name = null
        clearInterval(timer);
        for (let i = 0; i < Linearr.length; i++) {
            map.removeOverlay(Linearr[i])
        }
        let promise = new Promise((resolve, reject) => {
            for (let i = 0; i < Linearr.length; i++) {
                map.removeOverlay(Linearr[i])
            }
            Linearr = []
            map.closeInfoWindow(); //关闭信息窗口
            map.removeOverlay(trackobj.point[trackobj.point.length - 1])
            GisTrackingData = null;
            map.closeInfoWindow(); //关闭信息窗口
            resolve()
        })
        promise.then(() => {
            gis = gis + ""
            var mardata = null
            G5BrowserFeatures.GetMemberGisById(gis).then(res => {
                mardata = JSON.parse(res)
                let lng = parseFloat(mardata.strLongitude)
                let lat = parseFloat(mardata.strLatitude)
                var zb = new BMap.Point(lng, lat);
                var tb = new BMap.Icon("image/zx.png",
                    new BMap.Size(40, 40), {
                        offset: new BMap.Size(30, 50),
                    });
                var ptmarkerArr = new BMap.Marker(zb, {
                    icon: tb
                });
                var ts = new BMap.Label(mardata.strNum, {
                    offset: new BMap.Size(20, -10)
                }); //新建声明label对象
                ts.setStyle({
                    display: "none"
                })
                ptmarkerArr.setLabel(ts);
                ptmarkerArr.addEventListener("click", () => {
                    normalInfoWindow(mardata, ptmarkerArr, new BMap.Point(lng, lat));
                });
                normalInfoWindow(mardata, ptmarkerArr, new BMap.Point(lng, lat))
                function normalInfoWindow(gis, ptmarkerArr, point) {
                    let opts = {
                        width: 320, // 信息窗口宽度
                        height: 222, // 信息窗口高度
                        title: "<h1 title=" + '  ' + gis.strName + ' ' + ">" + gis.strName + "</h1>", // 信息窗口标题
                    };
                    $.ajax({
                        url: 'http://api.map.baidu.com/geocoder/v2/?ak=N1FRhUpF6M0lcGGY8K5MzSa0WoGhoGpO&location=' + point.lat + ',' + point.lng + '&output=json',
                        dataType: 'jsonp',
                        callback: 'BMap._rd._cbk43398',
                        success: function (res) {
                            let dw = res.result.formatted_address
                            let html = [];
                            // 内层文字
                            html.push('<ul>');
                            html.push('<li class="content">');
                            html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">通讯号:</h1> <h2 style="vertical-align:top;">' + newGis.strNum + ' </h2></div>');
                            html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">部门:</h1> <h2 style="vertical-align:top;overflow:hidden;white-space:nowrap;text-overflow:ellipsis"  title="' + gis.deptName + '">' + gis.deptName + ' </h2></div>');
                            html.push('</li>');
                            html.push('<li class="content">');
                            html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">职位:</h1> <h2 style="vertical-align:top;"  title="' + gis.strPosition + '">' + gis.strPosition + ' </h2></div>');
                            html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">手机:</h1> <h2 style="vertical-align:top;"  title="' + gis.strMobileNum + '">' + gis.strMobileNum + ' </h2></div>');
                            html.push('</li>');
                            html.push('<li class="content">');
                            html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">经度:</h1> <h2 style="vertical-align:top;">' + gis.strLongitude + ' </h2></div>');
                            html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">纬度:</h1> <h2 style="vertical-align:top;">' + gis.strLatitude + ' </h2></div>');
                            html.push('</li>');
                            html.push('<li class="content">');
                            html.push('<div class="content_left" style="width:100%"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all;width:30%">位置:</h1> <h2 style="vertical-align:top;width:70%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap"  title="' + dw + '">' + dw + ' </h2></div>');
                            html.push('</li>');
                            html.push('<li class="content">');
                            html.push('<div class="content_left" style="width:100%"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all;width:30%">上报时间:</h1> <h2 style="vertical-align:top; width:70%;color:#ff6600;">' + gis.lastDate + ' </h2></div>');
                            html.push('<li class="content">');
                            html.push('<button class="Voice" onclick="Voice(' + gis.strLongitude + ',' + gis.strLatitude + ',' + gis.strNum + ',\'' + gis.strName + '\')">语音</button>');
                            html.push('<button class="Video" onclick="Video(' + gis.strLongitude + ',' + gis.strLatitude + ',' + gis.strNum + ',\'' + gis.strName + '\')">视频</button>');
                            html.push('<button class="Monitor" onclick="Monitor(' + gis.strLongitude + ',' + gis.strLatitude + ',' + gis.strNum + ',\'' + gis.strName + '\')">监控</button>');
                            html.push('<button class="Track" onclick="Track(' + gis.strLongitude + ',' + gis.strLatitude + ',' + gis.strNum + ',\'' + gis.strName + '\')">跟踪</button>');
                            html.push('<button class="Information" onclick="Information(' + gis.strLongitude + ',' + gis.strLatitude + ',' + gis.strNum + ',\'' + gis.strName + '\')">监听</button>');
                            html.push('<button class="Information" onclick="Notice(' + gis.strLongitude + ',' + gis.strLatitude + ',' + gis.strNum + ',\'' + gis.strName + '\')">公告</button>');
                            html.push('</li>');
                            html.push('</ul>');
                            let infoWindow = new BMap.InfoWindow(html.join(""), opts); // 创建信息窗口对象
                            map.openInfoWindow(infoWindow, point); //自动开启信息窗口
                            map.centerAndZoom(point, 19) //描点自动居中
                            ptmarkerArr.addEventListener("click", () => {
                                defaultInfoWindow(mardata, ptmarkerArr, point);
                            });
                            if (showMarker) {
                                map.openInfoWindow(infoWindow, point); //开启信息窗口
                                map.centerAndZoom(point, 19); //描点自动居中
                            }
                        }
                    })
                }
                map.addOverlay(ptmarkerArr);
            })
        })
        trackobj: {
            strNum = "",
            point = []
        }
        Linearr = []
    }
}

// TODO 结束跟踪
function cancelMonitor(a, b, c, d) {
    if (Trackstate == false) {
        index = 0;
        Trackstate = true;
        Api_MapTracking(c, false);
    }
}


// 跟踪
$(".Tracks").click(function () {
    Api_MapTracking(gis, onOff);
});

$(".load").click(() => {
    location.reload();
});

// 右下角刷新功能
$(".shuaxin").click(() => {
    location.reload();
});

//普通描点
$(".normal").click(function () {
    Api_TracePoint(newGis, oldGis, false, showMarker)
})
$(".normal2").click(function () {
    Api_TracePoint(newGis2, null, false, showMarker) //测试删除第一个描点后绘制新点
})
$(".normal3").click(function () {
    Api_TracePoint(newGis2, null, true, false) //测试缩小比例尺后再次定位
})








// TODO超界描点


// 超界描点模拟数据
var RingPointnewGis = {
    strLongitude: " 106.553141",
    strLatitude: "29.444555",
    strNum: "123465789",
    strName: "李四",
    strPosition: "所长",
    strMobileNum: "18111184268",
    strHomeNum: 4247488,
    strCompanyNum: 4247488,
    lastDate: "2019年12月23日16:41:05",
    state: 0,
    label: 0,
    CallLine: 123,
    deptName: "王者荣耀"
};
var RingPointoldGis = {    
    strLongitude: " 106.553141",
    strLatitude: "29.444555",
    strNum: "123465789",
    strName: "李四",
    strPosition: "所长",
    strMobileNum: "18111184268",
    strHomeNum: 4247488,
    strCompanyNum: 4247488,
    lastDate: "2019年12月23日16:41:05",
    state: 0,
    label: 0,
    CallLine: 123,
    deptName: "王者荣耀"
};
var RingPointclear = false;
var RingPointcomeIn = false;

var RingPointcomeIntext= ""


function Api_RailPoint(newGis, oldGis, clear, RingPointcomeIn) {
    if (clear) {

        Delete_Coordinate(oldGis.strLongitude)
    } else {
        if (oldGis) { //判断旧的值是否为空
            Delete_Coordinate(oldGis.strLongitude)
        }
        setTimeout(function () {
            let myIcon = new BMap.Icon("image/trigger.png", new BMap.Size(50, 50));
            let point = new BMap.Point(newGis.strLongitude, newGis.strLatitude);
            let RingPointmarker = new BMap.Marker(point, {
                icon: myIcon
            }); // 创建起点标注
            map.centerAndZoom(point, 16);
            RingPointmarker.setAnimation(BMAP_ANIMATION_BOUNCE); //让标点跳动的动画
            map.addOverlay(RingPointmarker); // 将标注添加到地图中
            setTimeout(() => {
                map.closeInfoWindow(); //关闭信息窗口
                map.removeOverlay(RingPointmarker)
            }, 5000);
            RingPointInfoWindow(newGis, RingPointmarker, point, RingPointcomeIn)

            function RingPointInfoWindow(newGis, sosmarker, point, RingPointcomeIn) {
                let opts = {
                    width: 300, // 信息窗口宽度
                    height: 180, // 信息窗口高度
                };
                let html = [];
                $.ajax({
                    url: 'http://api.map.baidu.com/geocoder/v2/?ak=N1FRhUpF6M0lcGGY8K5MzSa0WoGhoGpO&location=' + point.lat + ',' + point.lng + '&output=json',
                    dataType: 'jsonp',
                    callback: 'BMap._rd._cbk43398',
                    success: function (res) {
                        if (RingPointcomeIn) {
                            RingPointcomeIntext = "禁入"
                        } else {
                            RingPointcomeIntext = "禁出"
                        }
                        let dw = res.result.formatted_address
                        html.push('<ul>');
                        html.push('<li class="content">');
                        html.push('<div class="content_left" style="width:100%"> <h1 style="font-weight:800;vertical-align:top;white-space:nowrap;word-break:keep-all;width:100%;font-size: 18px;"><span  style="color:#ff0000;font-weight:800">[' + RingPointcomeIntext + ']</span> ' + newGis.strName + '</h1></div>');
                        html.push('</li>');
                        html.push('<li class="content">');
                        html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">通讯号:</h1> <h2 style="vertical-align:top;">' + newGis.strNum + ' </h2></div>');
                        html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">部门:</h1> <h2 style="vertical-align:top;">' + newGis.deptName + ' </h2></div>');
                        html.push('</li>');
                        html.push('<li class="content">');
                        html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">职位:</h1> <h2 style="vertical-align:top;">' + newGis.strPosition + ' </h2></div>');
                        html.push('<div class="content_left"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all">手机:</h1> <h2 style="vertical-align:top;">' + newGis.strMobileNum + ' </h2></div>');
                        html.push('</li>');
                        html.push('<li class="content">');
                        html.push('<div class="content_left" style="width:100%"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all;width:30%">位置:</h1> <h2 style="vertical-align:top;width:70%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap"  title="' + dw + '">' + dw + ' </h2></div>');
                        html.push('</li>');
                        html.push('<li class="content">');
                        html.push('<div class="content_left" style="width:100%"> <h1 style="vertical-align:top;white-space:nowrap;word-break:keep-all;width:30%">警告时间:</h1> <h2 style="vertical-align:top; width:70%;color:#ff6600;">' + newGis.lastDate + ' </h2></div>');
                        html.push('<li class="content">');
                        html.push('</ul>');
                        var infoWindow = new BMap.InfoWindow(html.join(""), opts); // 创建信息窗口对象
                        sosmarker.addEventListener("click", function () {
                            map.openInfoWindow(infoWindow, point); //开启信息窗口
                        });
                        sosmarker.setAnimation(BMAP_ANIMATION_BOUNCE); //让标点跳动的动画
                        map.openInfoWindow(infoWindow, point)
                    }
                })
            }
            RingPointcomeIntext = null;
        }, 500);
    }
};

// 根据坐标进行删除
function Delete_Coordinate(params) {
    const allCoordinate = map.getOverlays()
    for (let i = 0; i < allCoordinate.length; i++) {
        if (allCoordinate[i] instanceof BMap.Marker) {
            if (allCoordinate[i].getPosition().lng == params) {
                map.removeOverlay(allCoordinate[i]); //清除当前的sos点
                map.closeInfoWindow(); //关闭信息窗口
                return false;
            }
        }
    }
}

$(".RingPoint").click(function () {
    Api_RailPoint(RingPointnewGis, RingPointoldGis, RingPointclear, RingPointcomeIn);
});





















