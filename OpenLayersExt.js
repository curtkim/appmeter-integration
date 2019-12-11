
OpenLayers.Layer.Daum = OpenLayers.Class(OpenLayers.Layer.TMS, {

  typeUrlMap : {
    'SKYVIEW' : ["http://s0.maps.daum-img.net/","http://s1.maps.daum-img.net/","http://s2.maps.daum-img.net/","http://s3.maps.daum-img.net/"],
    'SKYVIEW2009' : "http://10.10.216.107/air09_50_last/",
    'SKYVIEW2008' : "http://10.10.216.107/",
    'IMG' : ["http://map0.daumcdn.net/map_2d/","http://map1.daumcdn.net/map_2d/","http://map2.daumcdn.net/map_2d/","http://map3.daumcdn.net/map_2d/"],
    'HYBRID' : ["http://h0.maps.daum-img.net/map/image/G03/h/","http://h1.maps.daum-img.net/map/image/G03/h/","http://h2.maps.daum-img.net/map/image/G03/h/","http://h3.maps.daum-img.net/map/image/G03/h/"],
    'ROADVIEW' : ["http://t0.maps.daum-img.net/map/image/G03/t/","http://t1.maps.daum-img.net/map/image/G03/t/","http://t2.maps.daum-img.net/map/image/G03/t/","http://t3.maps.daum-img.net/map/image/G03/t/"],
    "TRAFFIC" : ["http://r0.maps.daum-img.net/map/mapdata/","http://r1.maps.daum-img.net/map/mapdata/","http://r2.maps.daum-img.net/map/mapdata/","http://r3.maps.daum-img.net/map/mapdata/"],
    "HILLSHADE" : ["http://sr0.maps.daum-img.net/map/image/G03/sr/","http://sr1.maps.daum-img.net/map/image/G03/sr/","http://sr2.maps.daum-img.net/map/image/G03/sr/","http://sr3.maps.daum-img.net/map/image/G03/sr/"]
  },
  typeExtMap : {
    'SKYVIEW' : "jpg",
    'SKYVIEW2009' : "jpg",
    'SKYVIEW2008' : "jpg",
    'IMG' : "png",
    'HYBRID' : "png",
    'ROADVIEW' : "png",
    'TRAFFIC' : "png",
    'HILLSHADE' : "png"
  },

  getTILEVERSION: function() {
    return "1904fls";
  },

    initialize: function(name, url, options) {
        var newArguments = [];
        newArguments.push(name, url, {}, options);
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, newArguments);
    },

    destroy: function() {
        // for now, nothing special to do here.
        OpenLayers.Layer.Grid.prototype.destroy.apply(this, arguments);
    },

    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.Daum(this.name,
                                           this.url,
                                           this.getOptions());
        }

        //get all additions from superclasses
        obj = OpenLayers.Layer.Grid.prototype.clone.apply(this, [obj]);

        // copy/set any non-init, non-simple values here
        return obj;
    },
    getURL: function (bounds) {
    var res = this.map.getResolution();
    var x = Math.round ((bounds.left - (-30000)) / (res * this.tileSize.w));
    var y = Math.round ((bounds.bottom - (-60000)) / (res * this.tileSize.h));
    var z = this.map.getNumZoomLevels() - this.map.getZoom()-1;

    var prefix = this.getOptions().excludeL ? "" : "L";

    var path = prefix + z + "/" + y + "/" + x + "." + (this.typeExtMap[this.TYPE]?this.typeExtMap[this.TYPE]:this.type);
    var url = this.typeUrlMap[this.TYPE] ? this.typeUrlMap[this.TYPE] : this.url;

    /*
    if( this.name =='ndm_static' && z == 1)
      url = "http://10.10.216.57/staticmap_ndm_i_lv1/1.02/";
    */

    if (url instanceof Array) {
      //url = this.selectUrl(path, url);
      var idx = Math.abs(x%4);
      url = url[idx];
    }
    if( this.TYPE == "IMG" || this.TYPE == "HYBRID" || this.TYPE == "HILLSHADE" || this.TYPE == "ROADVIEW") {
      url +=  this.getTILEVERSION() + "/";
      }
    //console.debug(this.getTILEVERSION());

    var fullUrl = url + path;

    if( this.version)
      fullUrl += "?v=" + this.version;
    return fullUrl;
    },

    CLASS_NAME: "OpenLayers.Layer.Daum"
});
OpenLayers.Layer.Daum.SKYVIEW = "SKYVIEW";
OpenLayers.Layer.Daum.SKYVIEW2009 = "SKYVIEW2009";
OpenLayers.Layer.Daum.SKYVIEW2008 = "SKYVIEW2008";
OpenLayers.Layer.Daum.IMG = "IMG";
OpenLayers.Layer.Daum.HYBRID = "HYBRID";
OpenLayers.Layer.Daum.ROADVIEW = "ROADVIEW";
OpenLayers.Layer.Daum.TRAFFIC = "TRAFFIC";
OpenLayers.Layer.Daum.HILLSHADE = "HILLSHADE";


OpenLayers.Layer.DaumHD = OpenLayers.Class(OpenLayers.Layer.TMS, {

  tileSize : new OpenLayers.Size(512, 512),

  typeUrlMap : {
    'SKYVIEW' : "http://ms512.maps.daum-img.net/",
    'IMG' : "http://mi512.maps.daum-img.net/map/mobile512/G03/hdi/",
    'HYBRID' : "http://mh512.maps.daum-img.net/map/mobile512/G03/hdh/"
  },
  typeExtMap : {
    'SKYVIEW' : "jpg",
    'IMG' : "png",
    'HYBRID' : "png"
  },

  getTILEVERSION: function() {
    return "1.04";
  },

    initialize: function(name, url, options) {
        var newArguments = [];
        newArguments.push(name, url, {}, options);
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, newArguments);
    },

    destroy: function() {
        // for now, nothing special to do here.
        OpenLayers.Layer.Grid.prototype.destroy.apply(this, arguments);
    },

    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.DaumHD(this.name,
                                           this.url,
                                           this.getOptions());
        }

        //get all additions from superclasses
        obj = OpenLayers.Layer.Grid.prototype.clone.apply(this, [obj]);

        // copy/set any non-init, non-simple values here
        return obj;
    },
    getURL: function (bounds) {
    var res = this.map.getResolution();
    var x = Math.round ((bounds.left - (-30000)) / (res * this.tileSize.w));
    var y = Math.round ((bounds.bottom - (-60000)) / (res * this.tileSize.h));
    var z = this.map.getNumZoomLevels() - this.map.getZoom();

    var prefix = this.getOptions().excludeL ? "" : "L";

    var path = prefix + z + "/" + y + "/" + x + "." + (this.typeExtMap[this.TYPE]?this.typeExtMap[this.TYPE]:this.type);
    var url = this.typeUrlMap[this.TYPE] ? this.typeUrlMap[this.TYPE] : this.url;

    /*
    if( this.name =='ndm_static' && z == 1)
      url = "http://10.10.216.57/staticmap_ndm_i_lv1/1.02/";
    */

    if (url instanceof Array) {
      //url = this.selectUrl(path, url);
      var idx = Math.abs(x%4);
      url = url[idx];
    }
    if( this.TYPE == "IMG" || this.TYPE == "HYBRID" ) {
      url +=  this.getTILEVERSION() + "/";
      }
    //console.debug(this.getTILEVERSION());

    var fullUrl = url + path;

    if( this.version)
      fullUrl += "?v=" + this.version;
    return fullUrl;
    },

    CLASS_NAME: "OpenLayers.Layer.DaumHD"
});
OpenLayers.Layer.DaumHD.SKYVIEW = "SKYVIEW";
OpenLayers.Layer.DaumHD.IMG = "IMG";
OpenLayers.Layer.DaumHD.HYBRID = "HYBRID";


OpenLayers.Layer.NDM = OpenLayers.Class(OpenLayers.Layer.TMS, {

    initialize: function(name, url, options) {
        var newArguments = [];
        newArguments.push(name, url, {}, options);
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, newArguments);
    },

    destroy: function() {
        // for now, nothing special to do here.
        OpenLayers.Layer.Grid.prototype.destroy.apply(this, arguments);
    },

    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.NDM(this.name,
                                           this.url,
                                           this.getOptions());
        }

        //get all additions from superclasses
        obj = OpenLayers.Layer.Grid.prototype.clone.apply(this, [obj]);

        // copy/set any non-init, non-simple values here
        return obj;
    },

  getLAYERS: function() {
    return "D0_test";
  },
  getVERSION: function() {
    return "1310964260289";
  },
  getSEARCHERTYPE:function() {
    return "1";
  },
    getRENDERTYPE:function() {
    return "0";
  },
    getURL: function (bounds) {
    var res = this.map.getResolution();
    var bbox = bounds.left + "," + bounds.bottom + "," + bounds.right + "," + bounds.top;

    var path = "wms?REQUEST=GetMap"
          +"&LAYERS=" + this.getLAYERS()
          +"&BBOX=" + bbox
          +"&WIDTH=" + this.tileSize.w +"&HEIGHT=" +this.tileSize.h
          +"&v=" + this.getVERSION()
          +"&SEARCHERTYPE=" + this.getSEARCHERTYPE()
          +"&RENDERTYPE=" + this.getRENDERTYPE()
          +"&FORMAT=image/png&TRANSPARENT=true";
    var url = this.url;
    if (url instanceof Array) {
      url = this.selectUrl(path, url);
    }
    return url + path;
    },

    CLASS_NAME: "OpenLayers.Layer.NDM"
});


OpenLayers.Layer.Naver = OpenLayers.Class(OpenLayers.Layer.TMS, {

  typeUrlMap : {
    'SKYVIEW' : ["http://satimg1.map.naver.net/base/","http://satimg2.map.naver.net/base/","http://satimg3.map.naver.net/base/","http://satimg4.map.naver.net/base/"],
    'IMG' : ["http://img1.map.naver.com/eclipse/image/","http://img2.map.naver.com/eclipse/image/","http://img3.map.naver.com/eclipse/image/","http://img4.map.naver.com/eclipse/image/"],
    'HYBRID' : ["http://satimg1.map.naver.net/overlay/","http://satimg2.map.naver.net/overlay/","http://satimg3.map.naver.net/overlay/","http://satimg4.map.naver.net/overlay/"]
  },
  typeExtMap : {
    'SKYVIEW' : "jpg",
    'IMG' : "png",
    'HYBRID' : "png"
  },
  typeVersionMap: {
    "SKYVIEW":"1.35",
    "IMG":"2.39",
    "HYBRID":"1.43"
  },

    initialize: function(name, url, options) {
        var newArguments = [];
        newArguments.push(name, url, {}, options);
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, newArguments);

        this.maxExtent = new OpenLayers.Bounds(-90112, -1192893, 2184493, 2763508);
    },

    destroy: function() {
        // for now, nothing special to do here.
        OpenLayers.Layer.Grid.prototype.destroy.apply(this, arguments);
    },

    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.Naver(this.name,
                                           this.url,
                                           this.getOptions());
        }

        //get all additions from superclasses
        obj = OpenLayers.Layer.Grid.prototype.clone.apply(this, [obj]);

        // copy/set any non-init, non-simple values here
        return obj;
    },
    getURL: function (bounds) {
      var res = this.map.getResolution();
      var col = Math.round ((bounds.left -90112) / (res * this.tileSize.w));
      var row = Math.round ((bounds.bottom -1192893) / (res * this.tileSize.h));

      idx1 = parseInt(row / 64);
      idx2 = parseInt(idx1 / 16);
      row = this.lpad("0", 5, ""+row);
      idx1 = this.lpad("0", 5, ""+idx1);
      idx2 = this.lpad("0", 5, ""+idx2);

      idx3 = parseInt(col / 64);
      idx4 = parseInt(idx3 / 16);
      col = this.lpad("0", 5, ""+col);
      idx3 = this.lpad("0", 5, ""+idx3);
      idx4 = this.lpad("0", 5, ""+idx4);

      var type = (this.typeExtMap[this.TYPE]?this.typeExtMap[this.TYPE]:this.type);
      var url = this.typeUrlMap[this.TYPE] ? this.typeUrlMap[this.TYPE] : this.url;

      b =  this.lpad("0", 2, "" + (this.map.getZoom() + 1)) +"/"+idx4+"-"+idx2+"/"+idx3+"-"+idx1+"/"+col+"-"+row+"." + type;

      if (url instanceof Array) c = this.selectUrl(b, url);

    return c + this.typeVersionMap[this.TYPE] + "/" + b;
    },

    calculateGridLayout: function (bounds,origin,resolution) {

      var baseX = 90112;
      var baseY = 1192893;

      var transService = new TransCoordinator();

      var utmLB = transService.convertWTM2(bounds.left, bounds.bottom, transService.COORD_UTMK, 127.0, 38.0, -1, -1);
      var utmRT = transService.convertWTM2(bounds.right, bounds.top, transService.COORD_UTMK, 127.0, 38.0, -1, -1);
      var utmkBounds = new OpenLayers.Bounds(utmLB[0], utmLB[1], utmRT[0], utmRT[1]);
      bounds.left = utmkBounds.left;
      bounds.bottom = utmkBounds.bottom;
      bounds.right = utmkBounds.right;
      bounds.top = utmkBounds.top;


      var tilelon = resolution * this.tileSize.w;
      var tilelat = resolution * this.tileSize.h;

      var col = Math.floor((origin.lon - baseX ) / (tilelat));
      var row = Math.floor((origin.lat - baseY ) / (tilelon));
      var newOrigin = new OpenLayers.LonLat(col * tilelat + baseX, row * tilelon + baseY);


      var offsetlon = utmkBounds.left - newOrigin.lon
      var tilecol = Math.floor(offsetlon / tilelon) - this.buffer;
      var offsetlat = utmkBounds.top - (newOrigin.lat + tilelat);
      var tilerow = Math.ceil(offsetlat / tilelat) + this.buffer;

      return {
        tilelon: tilelon,
        tilelat: tilelat,
        tileoffsetlon: newOrigin.lon + tilecol * tilelon,
        tileoffsetlat: newOrigin.lat + tilerow * tilelat,
        tileoffsetx: -(offsetlon / tilelon - tilecol) * this.tileSize.w,
        tileoffsety: -(tilerow - offsetlat / tilelat) * this.tileSize.h
      }
    },

  lpad: function (fchar, totallen, str) {
    var retValue = str;
    for (var i=0;i<totallen-str.length;i++) {
      retValue = fchar+retValue;
    }
    return retValue;
  },

    CLASS_NAME: "OpenLayers.Layer.Naver"
});

OpenLayers.Layer.Naver.SKYVIEW = "SKYVIEW";
OpenLayers.Layer.Naver.IMG = "IMG";
OpenLayers.Layer.Naver.HYBRID = "HYBRID";

OpenLayers.Layer.Naver2 = OpenLayers.Class(OpenLayers.Layer.TMS, {

  // ${host}/get/${version}/${temperal}/${imageFormat}/${level}/${row}/${col}/${layers....}
    getTILEVERSION: function() {
        return "15";
    },

  hosts : ["http://onetile1.map.naver.net", "http://onetile2.map.naver.net", "http://onetile3.map.naver.net", "http://onetile3.map.naver.net"],

  // jpg : 1, png : 0
  imageFormatMap : {
    'SKYVIEW' : "1",
    'IMG' : "0",
    'HYBRID' : "0",
    'BICYCLE' : "0",
    'PARCEL' : "0"
  },

  layerTypeMap : {
    'SKYVIEW' : "bl_st_bg",
    'IMG' : "bl_vc_bg/ol_vc_an",
    'HYBRID' : "empty/ol_st_rd/ol_st_an",
    'BICYCLE' : "empty/ol_bc_hb",
    'PARCEL' : "empty/ol_lp_cn"
  },

  getTEMPERAL : function() {
    return "0";
  },


    initialize: function(name, url, options) {
        var newArguments = [];
        newArguments.push(name, url, {}, options);
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, newArguments);

        this.maxExtent = new OpenLayers.Bounds(-90112, -1192893, 2184493, 2763508);
    },

    destroy: function() {
        // for now, nothing special to do here.
        OpenLayers.Layer.Grid.prototype.destroy.apply(this, arguments);
    },

    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.Naver2(this.name,
                                           this.url,
                                           this.getOptions());
        }

        //get all additions from superclasses
        obj = OpenLayers.Layer.Grid.prototype.clone.apply(this, [obj]);

        // copy/set any non-init, non-simple values here
        return obj;
    },

    getURL: function (bounds) {
      var res = this.map.getResolution();
      var col = Math.round ((bounds.left -90112) / (res * this.tileSize.w));
      var row = Math.round ((bounds.bottom -1192893) / (res * this.tileSize.h));

      var type = (this.layerTypeMap[this.TYPE]?this.layerTypeMap[this.TYPE]:this.type);

      var path = "/get/" + this.getTILEVERSION() + "/" + this.getTEMPERAL() + "/" + this.imageFormatMap[this.TYPE] + "/" + (this.map.getZoom() + 1) + "/" + col +"/"+ row + "/" + type;

      var fullUrl = this.hosts[Math.abs(row%4)] + path;

      return fullUrl;
    },

    calculateGridLayout: function (bounds,origin,resolution) {

      var baseX = 90112;
      var baseY = 1192893;

      var transService = new TransCoordinator();

      var utmLB = transService.convertWTM2(bounds.left, bounds.bottom, transService.COORD_UTMK, 127.0, 38.0, -1, -1);
      var utmRT = transService.convertWTM2(bounds.right, bounds.top, transService.COORD_UTMK, 127.0, 38.0, -1, -1);
      var utmkBounds = new OpenLayers.Bounds(utmLB[0], utmLB[1], utmRT[0], utmRT[1]);
      bounds.left = utmkBounds.left;
      bounds.bottom = utmkBounds.bottom;
      bounds.right = utmkBounds.right;
      bounds.top = utmkBounds.top;


      var tilelon = resolution * this.tileSize.w;
      var tilelat = resolution * this.tileSize.h;

      var col = Math.floor((origin.lon - baseX ) / (tilelat));
      var row = Math.floor((origin.lat - baseY ) / (tilelon));
      var newOrigin = new OpenLayers.LonLat(col * tilelat + baseX, row * tilelon + baseY);


      var offsetlon = utmkBounds.left - newOrigin.lon
      var tilecol = Math.floor(offsetlon / tilelon) - this.buffer;
      var offsetlat = utmkBounds.top - (newOrigin.lat + tilelat);
      var tilerow = Math.ceil(offsetlat / tilelat) + this.buffer;

      return {
        tilelon: tilelon,
        tilelat: tilelat,
        tileoffsetlon: newOrigin.lon + tilecol * tilelon,
        tileoffsetlat: newOrigin.lat + tilerow * tilelat,
        tileoffsetx: -(offsetlon / tilelon - tilecol) * this.tileSize.w,
        tileoffsety: -(tilerow - offsetlat / tilelat) * this.tileSize.h
      }
    },

  lpad: function (fchar, totallen, str) {
    var retValue = str;
    for (var i=0;i<totallen-str.length;i++) {
      retValue = fchar+retValue;
    }
    return retValue;
  },

    CLASS_NAME: "OpenLayers.Layer.Naver2"
});

OpenLayers.Layer.Naver2.SKYVIEW = "SKYVIEW";
OpenLayers.Layer.Naver2.IMG = "IMG";
OpenLayers.Layer.Naver2.HYBRID = "HYBRID";
OpenLayers.Layer.Naver2.BICYCLE = "BICYCLE";
OpenLayers.Layer.Naver2.PARCEL = "PARCEL";

OpenLayers.Control.DaumLevel = OpenLayers.Class(OpenLayers.Control, {

    autoActivate: true,
    element: null,
    emptyString:null,

    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
    },
  destroy: function() {
         this.deactivate();
         OpenLayers.Control.prototype.destroy.apply(this, arguments);
  },
    activate: function() {
        if (OpenLayers.Control.prototype.activate.apply(this, arguments)) {
            this.map.events.register('zoomend', this, this.redraw);
            this.redraw();
            return true;
        } else {
            return false;
        }
    },
    deactivate: function() {
        if (OpenLayers.Control.prototype.deactivate.apply(this, arguments)) {
            this.map.events.unregister('zoomend', this, this.redraw);
            this.element.innerHTML = "";
            return true;
        } else {
            return false;
        }
    },
    draw: function() {
        OpenLayers.Control.prototype.draw.apply(this, arguments);

        if (!this.element) {
            this.div.left = "";
            this.div.top = "";
            this.element = this.div;
        }

        return this.div;
    },
    redraw: function(evt) {
        var newHtml = this.getDaumLevel( this.map.getZoom());

        if (newHtml != this.element.innerHTML) {
            this.element.innerHTML = newHtml;
        }
    },
    reset: function(evt) {
        if (this.emptyString != null) {
            this.element.innerHTML = this.emptyString;
        }
    },
  getDaumLevel: function(olZoom) {
    return 14- olZoom;
  },
    CLASS_NAME: "OpenLayers.Control.DaumLevel"
});

OpenLayers.Control.Address = OpenLayers.Class(OpenLayers.Control, {

    autoActivate: true,
    element: null,
    emptyString:null,
    addressInfo:{},

    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
    },
  destroy: function() {
         this.deactivate();
         OpenLayers.Control.prototype.destroy.apply(this, arguments);
  },
    activate: function() {
        if (OpenLayers.Control.prototype.activate.apply(this, arguments)) {
            this.map.events.register('moveend', this, this.requestAddress);
            this.redraw();
            return true;
        } else {
            return false;
        }
    },
    deactivate: function() {
        if (OpenLayers.Control.prototype.deactivate.apply(this, arguments)) {
            this.map.events.unregister('moveend', this, this.requestAddress);
            this.element.innerHTML = "";
            return true;
        } else {
            return false;
        }
    },
    requestAddress: function() {
      var pt = this.map.getCenter();
      var url = "http://rapi.daum.net/regioncode/getHCode.json?format=simple&inputCoordSystem=wtm&service=localplatform-dev&x=" + pt.lon + "&y=" + pt.lat;

      var _self = this;
      _getJSONP(url, function(info){
        _self._callback(info);
      });
    },

    _callback: function(info) {
      this.addressInfo = info;
      this.redraw();
    },
    _makeHtml : function() {
      var html = "";
      html += this.addressInfo.name1 + "<br/>";
      html += this.addressInfo.name2 + "<br/>";
      html += this.addressInfo.name3;
      return html;
    },

    draw: function() {
        OpenLayers.Control.prototype.draw.apply(this, arguments);

        if (!this.element) {
            this.div.left = "";
            this.div.top = "";
            this.element = this.div;
        }

        return this.div;
    },
    redraw: function(evt) {
        var newHtml = this._makeHtml();

        if (newHtml != this.element.innerHTML) {
            this.element.innerHTML = newHtml;
        }
    },
    reset: function(evt) {
        if (this.emptyString != null) {
            this.element.innerHTML = this.emptyString;
        }
    },
    CLASS_NAME: "OpenLayers.Control.Address"
});

OpenLayers.Control.StaticReleaseDate = OpenLayers.Class(OpenLayers.Control, {

    autoActivate: false,
    element: null,
    emptyString:null,
    targetLayers:[],

    cache:{},
    targetLayer:null,

    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);

        for(var i = 0; i < this.targetLayers.length; i++) {
          var layer = this.targetLayers[i];
          this.cache[layer.name] = [];
        }
    },
  destroy: function() {
         this.deactivate();
         OpenLayers.Control.prototype.destroy.apply(this, arguments);
  },
  onChangeLayer:function() {
        for(var i = 0; i < this.targetLayers.length; i++) {
          var layer = this.targetLayers[i];
          if( layer.getVisibility()) {
            this.targetLayer = layer;
            break;
          }
        }
  },
  getDate: function() {
    // http://10.10.216.57/staticmap_ndm_i/L5/date.json
    var level = this.getDaumLevel( this.map.getZoom());;
    _getJSONP(this.targetLayer.url+"L"+level+"/date.json", function(date){}, null, null, "_C");
  },
  callback:function(layerName, level, date) {
    this.cache[layerName][level] = date;
    this.redraw();
  },
    activate: function() {
        if (OpenLayers.Control.prototype.activate.apply(this, arguments)) {
            this.map.events.register('zoomend', this, this.redraw);
            this.map.events.register('changelayer', this, this.onChangeLayer);
            this.redraw();
            return true;
        } else {
            return false;
        }
    },
    deactivate: function() {
        if (OpenLayers.Control.prototype.deactivate.apply(this, arguments)) {
            this.map.events.unregister('zoomend', this, this.redraw);
            this.map.events.unregister('changelayer', this, this.onChangeLayer);
            this.element.innerHTML = "";
            return true;
        } else {
            return false;
        }
    },
    draw: function() {
        OpenLayers.Control.prototype.draw.apply(this, arguments);

        if (!this.element) {
            this.div.left = "";
            this.div.top = "";
            this.element = this.div;
        }

        return this.div;
    },
    redraw: function(evt) {

      var level = this.getDaumLevel( this.map.getZoom());
        var newHtml = this.cache[this.targetLayer.name][level];

        if (newHtml != this.element.innerHTML) {
            this.element.innerHTML = newHtml;
        }
    },
    reset: function(evt) {
        if (this.emptyString != null) {
            this.element.innerHTML = this.emptyString;
        }
    },
  getDaumLevel: function(olZoom) {
    return 14- olZoom;
  },
    CLASS_NAME: "OpenLayers.Control.StaticReleaseDate"
});

OpenLayers.Control.LayerLoadingTimer = OpenLayers.Class(OpenLayers.Control, {

    autoActivate: true,
    element: null,
    emptyString:null,

    targetLayer:null,

    startTime:null,
    timeSum:0,
    count:0,

    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
    },
  destroy: function() {
         this.deactivate();
         OpenLayers.Control.prototype.destroy.apply(this, arguments);
  },

  loadstart:function() {
    this.startTime = new Date();
    this.timeSum = 0;
    this.count = 0;
    this.redraw();
  },
  tileloaded:function() {
    if( this.startTime == null)
      this.startTime = new Date();

    this.timeSum += (new Date() - this.startTime);
    this.count++;
    this.redraw();
  },
  loaded:function() {
    this.redraw();
  },

    activate: function() {
        if (OpenLayers.Control.prototype.activate.apply(this, arguments)) {
            this.targetLayer.events.register('loadstart', this, this.loadstart);
            this.targetLayer.events.register('tileloaded', this, this.tileloaded);
            this.targetLayer.events.register('loaded', this, this.loaded);
            this.redraw();
            return true;
        } else {
            return false;
        }
    },
    deactivate: function() {
        if (OpenLayers.Control.prototype.deactivate.apply(this, arguments)) {
            this.targetLayer.events.unregister('loadstart', this, this.loadstart);
            this.targetLayer.events.unregister('tileloaded', this, this.tileloaded);
            this.targetLayer.events.unregister('loaded', this, this.loaded);
            this.element.innerHTML = "";
            return true;
        } else {
            return false;
        }
    },
    draw: function() {
        OpenLayers.Control.prototype.draw.apply(this, arguments);

        if (!this.element) {
            this.div.left = "";
            this.div.top = "";
            this.element = this.div;
        }

        return this.div;
    },
    redraw: function(evt) {

      var totalTime = parseInt(this.timeSum / 1000 * 10)/10;
      var averageTime = parseInt(this.timeSum / (this.count != 0 ? this.count : 1) / 1000 * 10)/10;

      var totalTileCount = (this.count + this.targetLayer.numLoadingTiles); //this.targetLayer.grid.length * this.targetLayer.grid[0].length;

      var newHtml = "";
        newHtml += "濡쒕뵫��쇨컻�� : " + this.count + " / " + totalTileCount + "<br/>";
        newHtml += "珥앸줈�⑹떆媛� : " + totalTime + "珥�<br/>";
        newHtml += "�됯퇏濡쒕뵫�쒓컙 : " + averageTime + "珥�<br/>";

        if (newHtml != this.element.innerHTML) {
            this.element.innerHTML = newHtml;
        }
    },
    reset: function(evt) {
        if (this.emptyString != null) {
            this.element.innerHTML = this.emptyString;
        }
    },
    changeTagetLayer: function(layer) {
      this.deactivate();
      this.targetLayer = layer;
      this.activate();
    },
    CLASS_NAME: "OpenLayers.Control.LayerLoadingTimer"
});


OpenLayers.Layer.Daum2 = OpenLayers.Class(OpenLayers.Layer.TMS, {

    initialize: function(name, url, options) {
        var newArguments = [];
        newArguments.push(name, url, {}, options);
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, newArguments);
    },

    destroy: function() {
        // for now, nothing special to do here.
        OpenLayers.Layer.Grid.prototype.destroy.apply(this, arguments);
    },

    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.Daum(this.name,
                                           this.url,
                                           this.getOptions());
        }

        //get all additions from superclasses
        obj = OpenLayers.Layer.Grid.prototype.clone.apply(this, [obj]);

        // copy/set any non-init, non-simple values here
        return obj;
    },

    getURL: function (bounds) {
      var res = this.map.getResolution();
      var x = Math.round ((bounds.left - (-30000)) / (res * this.tileSize.w));
      var y = Math.round ((bounds.bottom - (-60000)) / (res * this.tileSize.h));
      var z = this.map.getNumZoomLevels() - this.map.getZoom()-1;
      return "http://taxi-map.krane.iwilab.com/tile/" + this.idx + "/" + z + "_" + y + "_" + x;
    },

    CLASS_NAME: "OpenLayers.Layer.Daum2"
});

OpenLayers.Layer.RoadNetwork = OpenLayers.Class(OpenLayers.Layer.TMS, {

    initialize: function(name, options) {
        var newArguments = [];
        newArguments.push(name, {}, options);
        console.log(newArguments)
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, newArguments);
    },

    destroy: function() {
        // for now, nothing special to do here.
        OpenLayers.Layer.Grid.prototype.destroy.apply(this, arguments);
    },

    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.RoadNetwork(this.name, this.getOptions());
        }

        //get all additions from superclasses
        obj = OpenLayers.Layer.Grid.prototype.clone.apply(this, [obj]);

        // copy/set any non-init, non-simple values here
        return obj;
    },

    getURL: function (bounds) {
      var res = this.map.getResolution();
      var x = Math.round ((bounds.left - (-30000)) / (res * this.tileSize.w));
      var y = Math.round ((bounds.bottom - (-60000)) / (res * this.tileSize.h));
      var z = this.map.getNumZoomLevels() - this.map.getZoom()-1;
      return "/demo/tile/" + z + "_" + y + "_" + x;
    },

    CLASS_NAME: "OpenLayers.Layer.RoadNetwork"
});

