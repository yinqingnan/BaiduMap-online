"use strict";

// 定义默认的经度，维度
var strLongitude, strLatitude;
var map = new BMap.Map("allmap", {
  enableMapClick: true //是否开启底图可点功能

}); // TODO 本地请求数据接口
// var axios = {
// 请求地址
// var url = 'http://api.map.baidu.com/location/ip'
// var data = {
//     ak: "N1FRhUpF6M0lcGGY8K5MzSa0WoGhoGpO",
//     coor: "bd09ll",
//     callback: 'jsonpcallback' //对应值为自定义回调函数名
// };
// // // // 路径拼装
// var buffer = [];
// for (var key in data) {
//     buffer.push(key + '=' + encodeURIComponent(data[key]));
// }
// var fullpath = url + '?' + buffer.join('&');
// CreateScript(fullpath);
// // //生成script标签
// function CreateScript(src) {
//     var el = document.createElement('script');
//     el.src = src;
//     el.async = true;
//     el.defer = true;
//     document.body.appendChild(el);
// }
// // //请求数据 进行定位
// function jsonpcallback(res) {
//     if (res.status == 0) {
//         strLongitude = res.content.point.x
//         strLatitude = res.content.point.y
//         var point = new BMap.Point(res.content.point.x, res.content.point.y);
//         map.centerAndZoom(point, 13); //地图位置和地图放大等级
//     } else {
//         strLongitude = latitude
//         strLatitude = accuracy
//         var point = new BMap.Point(res.content.point.x, res.content.point.y);
//         map.centerAndZoom(point, 13); //地图位置和地图放大等级
//     }
// }
// }

G5BrowserFeatures.GetSystemGis().then(function (res) {
  if (res != "" && res != null && res != undefined) {
    var obj = JSON.parse(res);
    strLongitude = obj.x;
    strLatitude = obj.y;
    var point = new BMap.Point(strLongitude, strLatitude);
    map.centerAndZoom(point, 13); //地图位置和地图放大等级
  } else {
    strLongitude = 116.403119;
    strLatitude = 39.914714;
    var point = new BMap.Point(strLongitude, strLatitude);
    map.centerAndZoom(point, 13); //地图位置和地图放大等级
  }
});
map.enableScrollWheelZoom(); //启动鼠标滚轮缩放地图
// map.addControl(new BMap.MapTypeControl());          //添加地图类型控件

var top_left_control = new BMap.ScaleControl({
  anchor: BMAP_ANCHOR_BOTTOM_RIGHT
}); // 左上角，添加比例尺

map.addControl(top_left_control); // 添加带有定位的导航控件

var navigationControl = new BMap.NavigationControl({
  // 靠左上角位置
  anchor: BMAP_ANCHOR_TOP_LEFT,
  // LARGE类型
  type: BMAP_NAVIGATION_CONTROL_LARGE,
  // 是否启用显示定位
  enableGeolocation: false
});
map.addControl(navigationControl); // 添加定位控件

var geolocationControl = new BMap.GeolocationControl();
geolocationControl.addEventListener("locationSuccess", function (e) {
  // 定位成功事件
  var address = '';
  address += e.addressComponent.province;
  address += e.addressComponent.city;
  address += e.addressComponent.district;
  address += e.addressComponent.street;
  address += e.addressComponent.streetNumber;
  layer.alert("当前定位地址为：" + address, {
    title: '提示'
  });
});
geolocationControl.addEventListener("locationError", function (e) {
  // 定位失败事件
  layer.alert(e.message, {
    title: '提示'
  });
});
map.addControl(geolocationControl);
var CurrentLocation = null; // 当前定位的坐标
//地图加载完时关闭预加载模态框

map.addEventListener("tilesloaded", function () {
  $(".module").hide();
  strLatitude = Number(strLatitude);
  strLongitude = Number(strLongitude);
  $.ajax({
    url: 'http://api.map.baidu.com/geocoder/v2/?ak=N1FRhUpF6M0lcGGY8K5MzSa0WoGhoGpO&location=' + strLatitude + ',' + strLongitude + '&output=json',
    dataType: 'jsonp',
    callback: 'BMap._rd._cbk43398',
    success: function success(res) {
      CurrentLocation = res.result.location;
      var Locationinner = res.result.addressComponent.city;
      $(".Location")[0].innerHTML = Locationinner;
      $(".Location")[1].innerHTML = Locationinner;
    },
    error: function error(res) {// console.log(res)
    }
  });
}); // 当前位置按钮点击事件

$(".positioning>i").click(function (e) {
  var point = new BMap.Point(CurrentLocation.lng, CurrentLocation.lat);
  map.centerAndZoom(point, 13); //地图位置和地图放大等级
}); // 点击按钮关闭预加载模态框

$(".close")[0].onclick = function () {
  $(".module").hide();
}; //  搜索功能板块


function G(id) {
  return document.getElementById(id);
}

var ac = new BMap.Autocomplete( //建立一个自动完成的对象
{
  "input": "suggestId",
  "location": map
});
ac.addEventListener("onhighlight", function (e) {
  //鼠标放在下拉列表上的事件
  var str = "";
  var _value = e.fromitem.value;
  var value = "";

  if (e.fromitem.index > -1) {
    value = _value.province + _value.city + _value.district + _value.street + _value.business;
  }

  str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
  value = "";

  if (e.toitem.index > -1) {
    _value = e.toitem.value;
    value = _value.province + _value.city + _value.district + _value.street + _value.business;
  }

  str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
  G("searchResultPanel").innerHTML = str;
});
var myValue; // 搜索下拉菜单触发

ac.addEventListener("onconfirm", function (e) {
  //鼠标点击下拉列表后的事件
  var _value = e.item.value;
  myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
  G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
  map.clearOverlays();
  setPlace();
  $(".tc").hide(); //关闭模态框

  ii = 0;
}); // 搜索功能

function setPlace() {
  map.clearOverlays(); //清除地图上所有覆盖物

  function myFun() {
    var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果

    var Zoomlevel = map.getZoom(); //获取到当前界面缩放等级

    map.centerAndZoom(pp, Zoomlevel);
    map.addOverlay(new BMap.Marker(pp)); //添加标注
  }

  var local = new BMap.LocalSearch(map, {
    //智能搜索
    onSearchComplete: myFun
  });
  local.search(myValue);
} // 搜索按钮触发


function search(num) {
  var serachParam = document.getElementById("suggestId").value;
  searchMap(num, serachParam); // map.clearOverlays(); //清除地图上所有覆盖物
  // $(".tc").hide(); //关闭模态框

  ii = 0;
} //num 1:本地搜索 2:可视地图范围内搜索


function searchMap(num, mykey) {
  var local = new BMap.LocalSearch(map, {
    renderOptions: {
      map: map,
      panel: "r-result"
    },
    pageCapacity: 5
  });

  if (num == '1') {
    local.search(mykey);
  } else {
    local.searchInBounds(mykey, map.getBounds());
  }
} // 定义清除地图上所有覆盖物的方法


function clearAll() {
  //清空覆盖物数组与地图上的覆盖物
  publicDrawingManager.clearStoreAndMap(map); //清除绘制的覆盖物列表

  var drawlist = document.getElementById('drawlist');

  while (drawlist.lastChild) {
    drawlist.removeChild(drawlist.lastChild);
  }
}

;
$(".search").click(function () {
  var str = $("#suggestId").val();
  $(".nameList").empty();
  G5BrowserFeatures.GetGisAreaList(str).then(function (res) {
    var Str = JSON.parse(res);

    for (var i in Str) {
      $(".nameList").append($("<li class='Listbtn'></li>").text(Str[i].Name));

      for (var _i = 0; _i < $(".Listbtn").length; _i++) {
        $($(".Listbtn")[_i]).attr('title', Str[_i].Name);
      }
    }

    $(".Listbtn").click(function () {
      var index = $(".nameList li").index(this);
      var data = Str[index];
      map.removeOverlay(Coverings);
      var str = JSON.parse(data.Coordinate);
      var Zoomlevel = JSON.parse(data.ZoomLevel);
      var arr = [];

      for (var item in str) {
        arr.push(new BMap.Point(str[item].lng, str[item].lat));
      }

      var polygon = new BMap.Polygon(arr, {
        strokeColor: "blue",
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: "" //填充颜色。当参数为空时，圆形将没有填充效果。

      }); //创建多边形

      Coverings = polygon;
      var x = 0;
      var y = 0;

      for (var k = 0; k < str.length; k++) {
        x = x + parseFloat(str[k].lng);
        y = y + parseFloat(str[k].lat);
      }

      x = x / arr.length;
      y = y / arr.length;
      var posi = new BMap.Point(x, y); // 覆盖物居中

      map.centerAndZoom(posi, Zoomlevel); //描点自动居中

      map.addOverlay(polygon); //添加覆盖物

      setTimeout(function () {
        map.removeOverlay(polygon);
      }, 5000);
    });
  });
});
var Str = null; //TODO  模拟数据

Str = [{
  "Id": "5a05225a-4a53-4de6-8fe6-48a97881f71a",
  "Name": "郭德纲阿斯达四大所大所大所大所大所多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多",
  "Coordinate": "[{\"lng\":106.423701,\"lat\":29.557174},{\"lng\":106.45992,\"lat\":29.535054},{\"lng\":106.39783,\"lat\":29.506642}]"
}, {
  "Id": "5a05225a-4a53-4de6-8fe6-48a97881f71a",
  "Name": "郭麒麟",
  "Coordinate": "[{\"lng\":106.430,\"lat\":29.542},{\"lng\":106.45992,\"lat\":29.535054},{\"lng\":106.39783,\"lat\":29.506642}]"
}]; // 全局覆盖物

var ii = 0;
var Coverings = null;
$(".menuone").click(function (e) {
  $(".nameList").empty(); //每一次都优先清空一次所有子集

  G5BrowserFeatures.GetGisAreaList("").then(function (res) {
    if (res != "") {
      var Str = JSON.parse(res);

      for (var i in Str) {
        if (i <= 11) {
          $(".nameList").append($("<li class='Listbtn'></li>").text(Str[i].Name));

          for (var _i2 = 0; _i2 < $(".Listbtn").length; _i2++) {
            $($(".Listbtn")[_i2]).attr('title', Str[_i2].Name);
          }
        }
      }

      $(".Listbtn").click(function () {
        var index = $(".nameList li").index(this);
        var data = Str[index];
        map.removeOverlay(Coverings);
        var str = JSON.parse(data.Coordinate);
        var Zoomlevel = JSON.parse(data.ZoomLevel);
        var arr = [];

        for (var item in str) {
          arr.push(new BMap.Point(str[item].lng, str[item].lat));
        }

        var polygon = new BMap.Polygon(arr, {
          strokeColor: "blue",
          strokeWeight: 2,
          strokeOpacity: 1,
          fillColor: "" //填充颜色。当参数为空时，圆形将没有填充效果。  

        }); //创建多边形

        Coverings = polygon;
        var x = 0;
        var y = 0;

        for (var k = 0; k < str.length; k++) {
          x = x + parseFloat(str[k].lng);
          y = y + parseFloat(str[k].lat);
        }

        x = x / arr.length;
        y = y / arr.length;
        var posi = new BMap.Point(x, y); // 覆盖物居中

        map.centerAndZoom(posi, Zoomlevel); //描点自动居中

        map.addOverlay(polygon); //添加覆盖物  

        setTimeout(function () {
          map.removeOverlay(polygon);
        }, 3000);
      });
    }
  });
  ii++;

  if (ii % 2 == 1) {
    $(".tc").show();
    $(".Enclosure").hide();
    $('.Tool').hide;
  } else {
    $(".tc").hide();
  }

  ii = 0;
  Enclosurenum = 0;
  Toolnum = 0;
  stopPropagation(e);
}); // 给所有元素绑定事件

$(document).bind('click', function () {
  $(".tc").hide();
  $(".Enclosure").hide();
  $(".Tool").hide();
  ii = 0;
  Enclosurenum = 0;
  Toolnum = 0;
});
$(".tc").click(function (e) {
  stopPropagation(e);
});
var Enclosurenum = 0;
$($(".menu>ul>li")[2]).click(function (e) {
  Enclosurenum++;

  if (Enclosurenum % 2 == 1) {
    $(".Enclosure").show();
    $(".Tool").hide();
  } else {
    $(".Enclosure").hide();
  }

  $(".tc").hide(); //关闭模态框

  ii = 0;
  Enclosurenum = 0;
  Toolnum = 0;
  stopPropagation(e);
});
var Toolnum = 0;
$($(".menu>ul>li")[3]).click(function (e) {
  Toolnum++;

  if (Toolnum % 2 == 1) {
    $(".Enclosure").hide();
    $(".Tool").show();
  } else {
    $(".Tool").hide();
  }

  $(".tc").hide(); //关闭模态框

  ii = 0;
  Enclosurenum = 0;
  Toolnum = 0;
  stopPropagation(e);
}); // 阻止冒泡功能

function stopPropagation(e) {
  var ev = e || window.event;

  if (ev.stopPropagation) {
    ev.stopPropagation();
  } else if (window.event) {
    window.event.cancelBubble = true; //兼容IE
  }
} // 电子围栏管理


function Administration() {
  if (state) {
    G5BrowserFeatures.ShowElectricfence();
  } else {
    layer.alert('请先结束本次绘制。<br>双击鼠标左键后，取消或者编辑内容后保存。', {
      title: '提示'
    });
  }
} // 区域管理


function ShowGisAreaMgtList() {
  if (state) {
    G5BrowserFeatures.ShowGisAreaMgtList();
  } else {
    layer.alert('请先结束本次绘制。<br>双击鼠标左键后，取消或者编辑内容后保存。', {
      title: '提示'
    });
  }
} // 绘制保存的覆盖物（区域管理）


var Api_RailDrawcoverings = function Api_RailDrawcoverings(res) {
  Api_RailDltcoverings();
  var arr = [];
  var str = JSON.parse(res);

  for (var item in str) {
    arr.push(new BMap.Point(str[item].lng, str[item].lat));
  }

  var dbx = new BMap.Polygon(arr, {
    strokeColor: "red",
    strokeWeight: 2,
    strokeOpacity: 0.5,
    fillColor: ""
  }); //创建多边形

  var x = 0;
  var y = 0;

  for (var k = 0; k < str.length; k++) {
    x = x + parseFloat(str[k].lng);
    y = y + parseFloat(str[k].lat);
  }

  x = x / arr.length;
  y = y / arr.length;
  var dw = new BMap.Point(x, y);
  var el = map.getZoom(); //获取到当前界面缩放等级

  map.centerAndZoom(dw, el);
  map.addOverlay(dbx); //添加覆盖物  
}; // 删除多边形覆盖物（区域管理）


var Api_RailDltcoverings = function Api_RailDltcoverings() {
  var allOverlay = map.getOverlays();

  for (var i = 0; i < allOverlay.length; i++) {
    if (allOverlay[i].toString() == "[object Polygon]") {
      map.removeOverlay(allOverlay[i]);
    }
  }
};