/**
 * È¸»ç¸í : (ÁÖ) Æ®À©Å¬¸®Æ² ½ºÅ¸
 * ºÎ¼­¸í : R&D ¼¾ÅÍ
 * All rights reserved.
 */

/**
 * 9°¡ÁöÀÇ ÁÂÇ¥°è°¡ °¢°¢ ¼­·Î º¯È¯ÇÒ ¼ö ÀÖ°Ô ¸¸µé¾îÁÖ´Â ÁÂÇ¥º¯È¯ ±â´É Å¬·¡½º
 * Bessel ±â¹ÝÀÇ UTM, GRS80 ±âÁØÀÇ UTM-K ÁÂÇ¥°è Ãß°¡ : 2009-11-16
 * Bessel ±â¹ÝÀÇ UTMK ÁÂÇ¥°è Ãß°¡, UTM-K ÁÂÇ¥°è º¯È¯ ¸ðµâ ¼öÁ¤ : 2010-03-05
 * @author Triumph0825
 */


function TransCoordinator () {

  this.COORD_TM     = 1;
  this.COORD_KTM      = 2;
  this.COORD_UTM      = 3;
  this.COORD_CONGNAMUL  = 4;
  this.COORD_WGS84    = 5;
  this.COORD_BESSEL   = 6;
  this.COORD_WTM      = 7;
  this.COORD_WKTM     = 8;
  this.COORD_BUTM     = 9;
  this.COORD_WCONGNAMUL = 10;
  this.COORD_UTMK     = 11;
  this.COORD_BUTMK    = 12;

  this.BASE_TM_LON = 127.0;
  this.BASE_TM_LAT = 38.0;
  this.BASE_KTM_LON = 128.0;
  this.BASE_KTM_LAT = 38.0;
  this.BASE_UTM_LON = 129.0;
  this.BASE_UTM_LAT = 0.0;
  this.BASE_UTMK_LON = 127.5;
  this.BASE_UTMK_LAT = 38.0;

  this.m_AW  = 6378137.0; //6377397.155
  this.m_FW = 1.0 / 298.257223563; //299.1528128;

  this.m_AB = 6377397.155 ;
  this.m_FB = 1.0 / 299.152813 ;

  this.m_OKKTM = 1.0000;
  this.m_OKUTM = 0.9996;
  this.m_OKGTM = 0.9999;

  this.m_TX = 115.8;
  this.m_TY = -474.99;
  this.m_TZ = -674.11;
  this.m_TOMEGA = 1.16;
  this.m_TPHI = -2.31;
  this.m_TKAPPA = -1.63;
  this.m_TS = -6.43;
  this.m_TMODE = 1;

  this.m_ux0 = 0.0;
  this.m_uy0 = 500000.0;

  this.m_ukx0 = 2000000.0;
  this.m_uky0 = 1000000.0;

  this.m_x0 = 500000.0;
  this.m_y0 = 200000.0;

  this.m_x1 = 600000.0;
  this.m_y1 = 400000.0;

    this.m_dx = 0.0;
  this.m_dy = 0.0;
  this.m_dz = 0.0;
  this.m_omega = 0.0;
  this.m_phi = 0.0;
  this.m_kappa = 0.0;
  this.m_ds = 0.0;
  this.m_imode = 0.0;

  this.rectArray1 = new Array(new Object(), new Object(), new Object(), new Object(), new Object(), new Object(), new Object(), new Object() );
  this.rectArray2 = new Array(new Object(), new Object(), new Object(), new Object(), new Object(), new Object(), new Object(), new Object() );

  this.x =0;
  this.y =0;
  this.w =0;
  this.h =0;

  this.deltaValue1 = new Array(new Array(0, 50000), new Array(0, 50000), new Array(0, 10000), new Array(-70378, -136), new Array(-144738, -2161), new Array(23510, -111), new Array(0, 50000), new Array(0, 50000));  //toCong
  this.deltaValue2 = new Array(new Array(0,-50000), new Array(0, -50000), new Array(0, -10000), new Array(70378, 136), new Array(144738, 2161), new Array(-23510, 111), new Array(0,-50000), new Array(0, -50000));    //fromCong

  this.rectArray1[0].x = 112500;
  this.rectArray1[0].y = -50000;
  this.rectArray1[0].w = 146000-112500;
  this.rectArray1[0].h = 3000+50000;

  this.rectArray1[1].x = 146000;
  this.rectArray1[1].y = -50000;
  this.rectArray1[1].w = 191600-146000;
  this.rectArray1[1].h = 8600+50000;

  this.rectArray1[2].x = 130000;
  this.rectArray1[2].y = 44000;
  this.rectArray1[2].w = 145000-130000;
  this.rectArray1[2].h = 58000-44000 ;

  this.rectArray1[3].x = 532500;
  this.rectArray1[3].y = 437500;
  this.rectArray1[3].w = 557500-532500 ;
  this.rectArray1[3].h = 462500-437500 ;

  this.rectArray1[4].x = 625000;
  this.rectArray1[4].y = 412500;
  this.rectArray1[4].w = 650000-625000;
  this.rectArray1[4].h = 437500-412500;

  this.rectArray1[5].x = -12500;
  this.rectArray1[5].y = 462500;
  this.rectArray1[5].w = 5000+12500;
  this.rectArray1[5].h = 512500-462500;

  this.rectArray1[6].x = 191600;
  this.rectArray1[6].y = -50000;
  this.rectArray1[6].w = 194200-191600;
  this.rectArray1[6].h = 2700+50000;

  this.rectArray1[7].x = 194200;
  this.rectArray1[7].y = -50000;
  this.rectArray1[7].w = 200000-194200;
  this.rectArray1[7].h = 8600+50000;


  this.rectArray2[0].x = 112500;
  this.rectArray2[0].y = -50000;
  this.rectArray2[0].w = 146000-112500;
  this.rectArray2[0].h = 3000+50000;

  this.rectArray2[1].x = 146000;
  this.rectArray2[1].y = -50000;
  this.rectArray2[1].w = 191600-146000;
  this.rectArray2[1].h = 8600+50000;

  this.rectArray2[2].x = 130000;
  this.rectArray2[2].y = 44000;
  this.rectArray2[2].w = 145000-130000;
  this.rectArray2[2].h = 58000-44000 ;

  this.rectArray2[3].x = 532500;
  this.rectArray2[3].y = 437500;
  this.rectArray2[3].w = 557500-532500 ;
  this.rectArray2[3].h = 462500-437500 ;

  this.rectArray2[4].x = 625000;
  this.rectArray2[4].y = 412500;
  this.rectArray2[4].w = 650000-625000;
  this.rectArray2[4].h = 437500-412500;

  this.rectArray2[5].x = -12500;
  this.rectArray2[5].y = 462500;
  this.rectArray2[5].w = 5000+12500;
  this.rectArray2[5].h = 512500-462500;

  this.rectArray2[6].x = 191600;
  this.rectArray2[6].y = -50000;
  this.rectArray2[6].w = 194200-191600;
  this.rectArray2[6].h = 2700+50000;

  this.rectArray2[7].x = 194200;
  this.rectArray2[7].y = -50000;
  this.rectArray2[7].w = 200000-194200;
  this.rectArray2[7].h = 8600+50000;


  for(var i=0;i<this.rectArray1.length;i++) {
    this.rectArray2[i].x += this.deltaValue1[i][0];
    this.rectArray2[i].y += this.deltaValue1[i][1];
  }
}

/**
 *  ÁÂÇ¥º¯È¯ Å¬·¡½ºÀÇ ±¸Á¶È­µÈ ÇÔ¼ö
 */
TransCoordinator.prototype ={

  /**
   *  Base°¡ 0º¸´Ù ÀÛ°Å³ª °°À¸¸é ±âº» Base ¸¦ °¡Áø´Ù°í Á¤ÀÇÇÔ
   *  ÇöÀç ÁÂÇ¥°è¿¡¼­ º¯È¯µÉ ÁÂÇ¥°è ÇÔ¼ö¸¦ È£ÃâÇÏ´Â ±â´ÉÇÔ¼ö
   */

  convertCoord : function(dwX, dwY, fromCoord, toCoord, fromBaseX,  fromBaseY,  toBaseX,  toBaseY) {

    var retValue = new Array(dwX, dwY);
    var baseX = fromBaseX, baseY = fromBaseY;
    switch (fromCoord) {
      case this.COORD_TM:
        if (fromBaseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertTM2(dwX, dwY, toCoord, baseX, baseY, toBaseX, toBaseY);
        break;
      case this.COORD_KTM:
        if (fromBaseX <= 0) { baseX = this.BASE_KTM_LON;  baseY = this.BASE_KTM_LAT;  }
        retValue = this.convertKTM2(dwX, dwY, toCoord, baseX, baseY, toBaseX, toBaseY);
        break;
      case this.COORD_UTM:
        if (fromBaseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertUTM2(dwX, dwY, toCoord, baseX, baseY, toBaseX, toBaseY);
        break;
      case this.COORD_CONGNAMUL:
        if (fromBaseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertCONGNAMUL2(dwX, dwY, toCoord, baseX, baseY, toBaseX, toBaseY);
        break;
      case this.COORD_WGS84:
        retValue = this.convertWGS2(dwX, dwY, toCoord, baseX, baseY, toBaseX, toBaseY);
        break;
      case this.COORD_BESSEL:
        retValue = this.convertBESSEL2(dwX, dwY, toCoord, baseX, baseY, toBaseX, toBaseY);
        break;
      case this.COORD_WTM:
        if (fromBaseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertWTM2(dwX, dwY, toCoord, baseX, baseY, toBaseX, toBaseY);
        break;
      case this.COORD_WKTM:
        if (fromBaseX <= 0) { baseX = this.BASE_KTM_LON;  baseY = this.BASE_KTM_LAT;  }
        retValue = this.convertWKTM2(dwX, dwY, toCoord, baseX, baseY, toBaseX, toBaseY);
        break;
      case this.COORD_BUTM:
        if (fromBaseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertBUTM2(dwX, dwY, toCoord, baseX, baseY, toBaseX, toBaseY);
        break;
      case this.COORD_WCONGNAMUL:
        if (fromBaseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertWCONGNAMUL2(dwX, dwY, toCoord, baseX, baseY, toBaseX, toBaseY);
        break;
      case this.COORD_UTMK:
        if (fromBaseX <= 0) { baseX = this.BASE_UTMK_LON; baseY = this.BASE_UTMK_LAT; }
        retValue = this.convertUTMK2(dwX, dwY, toCoord, baseX, baseY, toBaseX, toBaseY);
        break;
      case this.COORD_BUTMK:
        if (fromBaseX <= 0) { baseX = this.BASE_UTMK_LON; baseY = this.BASE_UTMK_LAT; }
        retValue = this.convertBUTMK2(dwX, dwY, toCoord, baseX, baseY, toBaseX, toBaseY);
        break;
    }

    return retValue;
  },


  /**
   *  TM ÁÂÇ¥¿¡¼­ ´Ù¸¥ ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */

  convertTM2 : function( dwX,  dwY,  toCoord,  fromBaseX,  fromBaseY,  toBaseX,  toBaseY ) {
    var retValue = new Array(dwX, dwY);
    var baseX = toBaseX, baseY = toBaseY;

    switch (toCoord) {
      case this.COORD_TM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertBESSEL2TM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_KTM:
        retValue = this.convertTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertBESSEL2KTM(retValue[0], retValue[1]);
        break;
      case this.COORD_UTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2UTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_CONGNAMUL:
        retValue = this.convertTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertBESSEL2CONG(retValue[0], retValue[1]);
        break;
      case this.COORD_WGS84:
        retValue = this.convertTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        break;
      case this.COORD_BESSEL:
        retValue = this.convertTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        break;
      case this.COORD_WTM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2WTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_WKTM:
        retValue = this.convertTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2WKTM(retValue[0], retValue[1]);
        break;
      case this.COORD_BUTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertBESSEL2BUTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_WCONGNAMUL:
        retValue = this.convertTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2WCONG(retValue[0], retValue[1]);
        break;
      case this.COORD_UTMK:
        retValue = this.convertTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2UTMK(retValue[0], retValue[1]);
        break;
      case this.COORD_BUTMK:
        retValue = this.convertTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertBESSEL2BUTMK(retValue[0], retValue[1]);
        break;
    }
    return retValue;
  },

  /**
   *  KTM ÁÂÇ¥¿¡¼­ ´Ù¸¥ ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertKTM2 : function( dwX,  dwY,  toCoord,  fromBaseX,  fromBaseY,  toBaseX,  toBaseY) {
    var retValue = new Array(dwX, dwY);
    var baseX = toBaseX, baseY = toBaseY;

    switch (toCoord) {
      case this.COORD_TM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertKTM2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2TM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_KTM:
        break;
      case this.COORD_UTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertKTM2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2UTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_CONGNAMUL:
        retValue = this.convertKTM2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2CONG(retValue[0], retValue[1]);
        break;
      case this.COORD_WGS84:
        retValue = this.convertKTM2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        break;
      case this.COORD_BESSEL:
        retValue = this.convertKTM2BESSEL(dwX, dwY);
        break;
      case this.COORD_WTM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertKTM2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2WTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_WKTM:
        retValue = this.convertKTM2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2WKTM(retValue[0], retValue[1]);
        break;
      case this.COORD_BUTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertKTM2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2BUTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_WCONGNAMUL:
        retValue = this.convertKTM2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2WCONG(retValue[0], retValue[1]);
        break;
      case this.COORD_UTMK:
        retValue = this.convertKTM2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2UTMK(retValue[0], retValue[1]);
        break;
      case this.COORD_BUTMK:
        retValue = this.convertKTM2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2BUTMK(retValue[0], retValue[1]);
        break;
    }
    return retValue;
  },


  /**
   *  UTM ÁÂÇ¥¿¡¼­ ´Ù¸¥ ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertUTM2 : function ( dwX,  dwY,  toCoord,  fromBaseX,  fromBaseY,  toBaseX,  toBaseY) {
    var retValue = new Array(dwX, dwY);
    var baseX = toBaseX, baseY = toBaseY;

    switch (toCoord) {
      case this.COORD_TM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertUTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2TM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_KTM:
        retValue = this.convertUTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2KTM(retValue[0], retValue[1]);
        break;
      case this.COORD_UTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertUTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2UTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_CONGNAMUL:
        retValue = this.convertUTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2CONG(retValue[0], retValue[1]);
        break;
      case this.COORD_WGS84:
        retValue = this.convertUTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        break;
      case this.COORD_BESSEL:
        retValue = this.convertUTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        break;
      case this.COORD_WTM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertUTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2WTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_WKTM:
        retValue = this.convertUTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2WKTM(retValue[0], retValue[1]);
        break;
      case this.COORD_BUTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertUTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2BUTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_WCONGNAMUL:
        retValue = this.convertUTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2WCONG(retValue[0], retValue[1]);
        break;
      case this.COORD_UTMK:
        retValue = this.convertUTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2UTMK(retValue[0], retValue[1]);
        break;
      case this.COORD_BUTMK:
        retValue = this.convertUTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2BUTMK(retValue[0], retValue[1]);
        break;
    }
    return retValue;
  },


  /**
   *  CONGNAMUL ÁÂÇ¥¿¡¼­ ´Ù¸¥ ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertCONGNAMUL2 : function ( dwX,  dwY,  toCoord,  fromBaseX,  fromBaseY,  toBaseX,  toBaseY) {
    var retValue = new Array(dwX, dwY);
    var baseX = toBaseX, baseY = toBaseY;

    switch (toCoord) {
      case this.COORD_TM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertCONG2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2TM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_KTM:
        retValue = this.convertCONG2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2KTM(retValue[0], retValue[1]);
        break;
      case this.COORD_UTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertCONG2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2UTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_CONGNAMUL:
        break;
      case this.COORD_WGS84:
        retValue = this.convertCONG2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        break;
      case this.COORD_BESSEL:
        retValue = this.convertCONG2BESSEL(dwX, dwY);
        break;
      case this.COORD_WTM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertCONG2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2WTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_WKTM:
        retValue = this.convertCONG2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2WKTM(retValue[0], retValue[1]);
        break;
      case this.COORD_BUTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertCONG2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2BUTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_WCONGNAMUL:
        retValue = this.convertCONG2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2WCONG(retValue[0], retValue[1]);
        break;
      case this.COORD_UTMK:
        retValue = this.convertCONG2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2UTMK(retValue[0], retValue[1]);
        break;
      case this.COORD_BUTMK:
        retValue = this.convertCONG2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2BUTMK(retValue[0], retValue[1]);
        break;
    }
    return retValue;
  },

  /**
   *  WGS ÁÂÇ¥¿¡¼­ ´Ù¸¥ ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertWGS2 : function ( dwX,  dwY,  toCoord,  fromBaseX,  fromBaseY,  toBaseX,  toBaseY) {
    var retValue = new Array(dwX, dwY);
    var baseX = toBaseX, baseY = toBaseY;

    switch (toCoord) {
      case this.COORD_TM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertWGS2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2TM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_KTM:
        retValue = this.convertWGS2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2KTM(retValue[0], retValue[1]);
        break;
      case this.COORD_UTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertWGS2UTM(dwX, dwY, baseX, baseY);
        break;
      case this.COORD_CONGNAMUL:
        retValue = this.convertWGS2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2CONG(retValue[0], retValue[1]);
        break;
      case this.COORD_WGS84:
        break;
      case this.COORD_BESSEL:
        retValue = this.convertWGS2BESSEL(dwX, dwY);
        break;
      case this.COORD_WTM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertWGS2WTM(dwX, dwY, baseX, baseY);
        break;
      case this.COORD_WKTM:
        retValue = this.convertWGS2WKTM(dwX, dwY);
        break;
      case this.COORD_BUTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertWGS2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2BUTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_WCONGNAMUL:
        retValue = this.convertWGS2WCONG(dwX, dwY);
        break;
      case this.COORD_UTMK:
        retValue = this.convertWGS2UTMK(retValue[0], retValue[1]);
        break;
      case this.COORD_BUTMK:
        retValue = this.convertWGS2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2BUTMK(retValue[0], retValue[1]);
        break;
    }
    return retValue;
  },


  /**
   *  BESSEL ÁÂÇ¥¿¡¼­ ´Ù¸¥ ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertBESSEL2 : function ( dwX,  dwY,  toCoord,  fromBaseX,  fromBaseY,  toBaseX,  toBaseY) {
    var retValue = new Array(dwX, dwY);
    var baseX = toBaseX, baseY = toBaseY;

    switch (toCoord) {
      case this.COORD_TM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertBESSEL2TM(dwX, dwY, baseX, baseY);
        break;
      case this.COORD_KTM:
        retValue = this.convertBESSEL2KTM(dwX, dwY);
        break;
      case this.COORD_UTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertBESSEL2WGS(dwX, dwY);
        retValue = this.convertWGS2UTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_CONGNAMUL:
        retValue = this.convertBESSEL2CONG(dwX, dwY);
        break;
      case this.COORD_WGS84:
        retValue = this.convertBESSEL2WGS(dwX, dwY);
        break;
      case this.COORD_BESSEL:
        break;
      case this.COORD_WTM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertBESSEL2WGS(dwX, dwY);
        retValue = this.convertWGS2WTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_WKTM:
        retValue = this.convertBESSEL2WGS(dwX, dwY);
        retValue = this.convertWGS2WKTM(retValue[0], retValue[1]);
        break;
      case this.COORD_BUTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertBESSEL2BUTM(dwX, dwY, baseX, baseY);
        break;
      case this.COORD_WCONGNAMUL:
        retValue = this.convertBESSEL2WGS(dwX, dwY);
        retValue = this.convertWGS2WCONG(retValue[0], retValue[1]);
        break;
      case this.COORD_UTMK:
        retValue = this.convertBESSEL2WGS(dwX, dwY);
        retValue = this.convertWGS2UTMK(retValue[0], retValue[1]);
        break;
      case this.COORD_BUTMK:
        retValue = this.convertBESSEL2BUTMK(dwX, dwY);
        break;
    }
    return retValue;
  },

  /**
   *  WTM ÁÂÇ¥¿¡¼­ ´Ù¸¥ ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertWTM2 : function ( dwX,  dwY,  toCoord,  fromBaseX,  fromBaseY,  toBaseX,  toBaseY) {
    var retValue = new Array(dwX, dwY);
    var baseX = toBaseX, baseY = toBaseY;

    switch (toCoord) {
      case this.COORD_TM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertWTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2TM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_KTM:
        retValue = this.convertWTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2KTM(retValue[0], retValue[1]);
        break;
      case this.COORD_UTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertWTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2UTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_CONGNAMUL:
        retValue = this.convertWTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2CONG(retValue[0], retValue[1]);
        break;
      case this.COORD_WGS84:
        retValue = this.convertWTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        break;
      case this.COORD_BESSEL:
        retValue = this.convertWTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        break;
      case this.COORD_WTM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertWTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2WTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_WKTM:
        retValue = this.convertWTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2WKTM(retValue[0], retValue[1]);
        break;
      case this.COORD_BUTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertWTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2BUTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_WCONGNAMUL:
        retValue = this.convertWTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2WCONG(retValue[0], retValue[1]);
        break;
      case this.COORD_UTMK:
        retValue = this.convertWTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2UTMK(retValue[0], retValue[1]);
        break;
      case this.COORD_BUTMK:
        retValue = this.convertWTM2WGS(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2BUTMK(retValue[0], retValue[1]);
        break;
    }
    return retValue;
  },

  /**
   *  WKTM ÁÂÇ¥¿¡¼­ ´Ù¸¥ ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertWKTM2 : function ( dwX,  dwY,  toCoord,  fromBaseX,  fromBaseY,  toBaseX,  toBaseY) {
    var retValue = new Array(dwX, dwY);
    var baseX = toBaseX, baseY = toBaseY;

    switch (toCoord) {
      case this.COORD_TM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertWKTM2WGS(dwX, dwY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2TM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_KTM:
        break;
      case this.COORD_UTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertWKTM2WGS(dwX, dwY);
        retValue = this.convertWGS2UTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_CONGNAMUL:
        retValue = this.convertWKTM2WGS(dwX, dwY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2CONG(retValue[0], retValue[1]);
        break;
      case this.COORD_WGS84:
        retValue = this.convertWKTM2WGS(dwX, dwY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        break;
      case this.COORD_BESSEL:
        retValue = this.convertWKTM2WGS(dwX, dwY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        break;
      case this.COORD_WTM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertWKTM2WGS(dwX, dwY);
        retValue = this.convertWGS2WTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_WKTM:
        break;
      case this.COORD_BUTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertWKTM2WGS(dwX, dwY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2BUTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_WCONGNAMUL:
        retValue = this.convertWKTM2WGS(dwX, dwY);
        retValue = this.convertWGS2WCONG(retValue[0], retValue[1]);
        break;
      case this.COORD_UTMK:
        retValue = this.convertWKTM2WGS(dwX, dwY);
        retValue = this.convertWGS2UTMK(retValue[0], retValue[1]);
        break;
      case this.COORD_BUTMK:
        retValue = this.convertWKTM2WGS(dwX, dwY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2BUTMK(retValue[0], retValue[1]);
        break;
    }
    return retValue;
  },

  /**
   *  BUTM ÁÂÇ¥¿¡¼­ ´Ù¸¥ ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */

  convertBUTM2 : function( dwX,  dwY,  toCoord,  fromBaseX,  fromBaseY,  toBaseX,  toBaseY ) {
    var retValue = new Array(dwX, dwY);
    var baseX = toBaseX, baseY = toBaseY;

    switch (toCoord) {
      case this.COORD_TM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertBUTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertBESSEL2TM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_KTM:
        retValue = this.convertBUTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertBESSEL2KTM(retValue[0], retValue[1]);
        break;
      case this.COORD_UTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertBUTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2UTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_CONGNAMUL:
        retValue = this.convertBUTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertBESSEL2CONG(retValue[0], retValue[1]);
        break;
      case this.COORD_WGS84:
        retValue = this.convertBUTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        break;
      case this.COORD_BESSEL:
        retValue = this.convertBUTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        break;
      case this.COORD_WTM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertBUTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2WTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_WKTM:
        retValue = this.convertBUTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2WKTM(retValue[0], retValue[1]);
        break;
      case this.COORD_BUTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertBUTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertBESSEL2BUTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_WCONGNAMUL:
        retValue = this.convertBUTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2WCONG(retValue[0], retValue[1]);
        break;
      case this.COORD_UTMK:
        retValue = this.convertBUTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2UTMK(retValue[0], retValue[1]);
        break;
      case this.COORD_BUTMK:
        retValue = this.convertBUTM2BESSEL(dwX, dwY, fromBaseX, fromBaseY);
        retValue = this.convertBESSEL2BUTMK(retValue[0], retValue[1]);
        break;
    }
    return retValue;
  },

  /**
   *  WCONGNAMUL ÁÂÇ¥¿¡¼­ ´Ù¸¥ ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertWCONGNAMUL2 : function ( dwX,  dwY,  toCoord,  fromBaseX,  fromBaseY,  toBaseX,  toBaseY) {
    var retValue = new Array(dwX, dwY);
    var baseX = toBaseX, baseY = toBaseY;

    switch (toCoord) {
      case this.COORD_TM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertWCONG2WGS(dwX, dwY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2TM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_KTM:
        retValue = this.convertWCONG2WGS(dwX, dwY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2KTM(retValue[0], retValue[1]);
        break;
      case this.COORD_UTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertWCONG2WGS(dwX, dwY);
        retValue = this.convertWGS2UTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_CONGNAMUL:
        retValue = this.convertWCONG2WGS(dwX, dwY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2CONG(retValue[0], retValue[1]);
        break;
      case this.COORD_WGS84:
        retValue = this.convertWCONG2WGS(dwX, dwY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        break;
      case this.COORD_BESSEL:
        retValue = this.convertWCONG2WGS(dwX, dwY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        break;
      case this.COORD_WTM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertWCONG2WGS(dwX, dwY);
        retValue = this.convertWGS2WTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_WKTM:
        retValue = this.convertWCONG2WGS(dwX, dwY);
        retValue = this.convertWGS2WKTM(retValue[0], retValue[1]);
        break;
      case this.COORD_BUTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertWCONG2WGS(dwX, dwY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2BUTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_WCONGNAMUL:
        break;
      case this.COORD_UTMK:
        retValue = this.convertWCONG2WGS(dwX, dwY);
        retValue = this.convertWGS2UTMK(retValue[0], retValue[1]);
        break;
      case this.COORD_BUTMK:
        retValue = this.convertWCONG2WGS(dwX, dwY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2BUTMK(retValue[0], retValue[1]);
        break;
    }
    return retValue;
  },

  /**
   *  UTM-K ÁÂÇ¥¿¡¼­ ´Ù¸¥ ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertUTMK2 : function ( dwX,  dwY,  toCoord,  fromBaseX,  fromBaseY,  toBaseX,  toBaseY) {
    var retValue = new Array(dwX, dwY);
    var baseX = toBaseX, baseY = toBaseY;

    switch (toCoord) {
      case this.COORD_TM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertUTMK2WGS(dwX, dwY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2TM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_KTM:
        retValue = this.convertUTMK2WGS(dwX, dwY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2KTM(retValue[0], retValue[1]);
        break;
      case this.COORD_UTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertUTMK2WGS(dwX, dwY);
        retValue = this.convertWGS2UTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_CONGNAMUL:
        retValue = this.convertUTMK2WGS(dwX, dwY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2CONG(retValue[0], retValue[1]);
        break;
      case this.COORD_WGS84:
        retValue = this.convertUTMK2WGS(dwX, dwY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        break;
      case this.COORD_BESSEL:
        retValue = this.convertUTMK2WGS(dwX, dwY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        break;
      case this.COORD_WTM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertUTMK2WGS(dwX, dwY);
        retValue = this.convertWGS2WTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_WKTM:
        retValue = this.convertUTMK2WGS(dwX, dwY);
        retValue = this.convertWGS2WKTM(retValue[0], retValue[1]);
        break;
      case this.COORD_BUTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertUTMK2WGS(dwX, dwY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2BUTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_WCONGNAMUL:
        retValue = this.convertUTMK2WGS(dwX, dwY);
        retValue = this.convertWGS2WCONG(retValue[0], retValue[1]);
        break;
      case this.COORD_UTMK:
        break;
      case this.COORD_BUTMK:
        retValue = this.convertUTMK2WGS(dwX, dwY);
        retValue = this.convertWGS2BESSEL(retValue[0], retValue[1]);
        retValue = this.convertBESSEL2BUTMK(retValue[0], retValue[1]);
        break;
    }
    return retValue;
  },

  /**
   *  BUTM-K ÁÂÇ¥¿¡¼­ ´Ù¸¥ ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertBUTMK2 : function ( dwX,  dwY,  toCoord,  fromBaseX,  fromBaseY,  toBaseX,  toBaseY) {
    var retValue = new Array(dwX, dwY);
    var baseX = toBaseX, baseY = toBaseY;

    switch (toCoord) {
      case this.COORD_TM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertBUTMK2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2TM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_KTM:
        retValue = this.convertBUTMK2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2KTM(retValue[0], retValue[1]);
        break;
      case this.COORD_UTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertBUTMK2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2UTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_CONGNAMUL:
        retValue = this.convertBUTMK2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2CONG(retValue[0], retValue[1]);
        break;
      case this.COORD_WGS84:
        retValue = this.convertBUTMK2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        break;
      case this.COORD_BESSEL:
        retValue = this.convertBUTMK2BESSEL(dwX, dwY);
        break;
      case this.COORD_WTM:
        if (baseX <= 0) { baseX = this.BASE_TM_LON; baseY = this.BASE_TM_LAT; }
        retValue = this.convertBUTMK2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2WTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_WKTM:
        retValue = this.convertBUTMK2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2WKTM(retValue[0], retValue[1]);
        break;
      case this.COORD_BUTM:
        if (baseX <= 0) { baseX = this.BASE_UTM_LON;  baseY = this.BASE_UTM_LAT;  }
        retValue = this.convertBUTMK2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2BUTM(retValue[0], retValue[1], baseX, baseY);
        break;
      case this.COORD_WCONGNAMUL:
        retValue = this.convertBUTMK2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2WCONG(retValue[0], retValue[1]);
        break;
      case this.COORD_UTMK:
        retValue = this.convertBUTMK2BESSEL(dwX, dwY);
        retValue = this.convertBESSEL2WGS(retValue[0], retValue[1]);
        retValue = this.convertWGS2UTMK(retValue[0], retValue[1]);
        break;
      case this.COORD_BUTMK:
        break;
    }
    return retValue;
  },

  /**
   *  BESSEL ÁÂÇ¥¿¡¼­ TM ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertBESSEL2TM : function( longitude,  latitude,  tmBaseLong,  tmBaseLat) {

    return this.changeXY(this.GP2TM(latitude, longitude, this.m_AB, this.m_FB, this.m_x0, this.m_y0,
              this.m_OKKTM, tmBaseLat, tmBaseLong + 10.405 / 3600.0));
  },


  /**
   *  BESSEL ÁÂÇ¥¿¡¼­ KTM ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertBESSEL2KTM : function ( longitude,  latitude) {
    return this.changeXY(this.GP2TM(latitude, longitude, this.m_AB, this.m_FB, this.m_x1, this.m_y1,
              this.m_OKGTM, this.BASE_KTM_LAT, this.BASE_KTM_LON));
  },


  /**
   *  BESSEL ÁÂÇ¥¿¡¼­ CONG ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertBESSEL2CONG : function( longitude,  latitude) {

      var xy = new Array();

      xy = this.GP2TM(latitude, longitude, this.m_AB, this.m_FB, this.m_x0, this.m_y0, this.m_OKKTM,
                this.BASE_TM_LAT, this.BASE_TM_LON + 10.405 / 3600.0);
    xy = this.changeXY(xy);

    return this.shiftIsland(xy[0], xy[1], true);
  },

  /**
   *  BESSEL ÁÂÇ¥¿¡¼­ BESSEL ±â¹ÝÀÇ UTM ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertBESSEL2BUTM : function( longitude,  latitude,  utmBaseLong,  utmBaseLat) {

      return this.changeXY(this.GP2TM(latitude, longitude, this.m_AB, this.m_FB, this.m_ux0, this.m_uy0, this.m_OKUTM,
                      utmBaseLat, utmBaseLong));
  },

  /**
   *  BESSEL ÁÂÇ¥¿¡¼­ BESSEL ±â¹ÝÀÇ UTMK ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertBESSEL2BUTMK : function( longitude,  latitude) {

      return this.changeXY(this.GP2TM(latitude, longitude, this.m_AB, this.m_FB, this.m_ukx0, this.m_uky0, this.m_OKUTM,
                      this.BASE_UTMK_LAT, this.BASE_UTMK_LON + 10.405 / 3600.0));
  },

  /**
   *  BESSEL ÁÂÇ¥¿¡¼­ WGS ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertBESSEL2WGS : function ( longitude,  latitude) {


      var xy = new Array();

      this.setParameter(this.m_TX,this.m_TY,this.m_TZ,this.m_TOMEGA,this.m_TPHI,this.m_TKAPPA,this.m_TS,this.m_TMODE);
              xy = this.GP2WGP(latitude, longitude, 0 ,this.m_AB, this.m_FB);
      return this.changeXY(xy);
  },

  /**
   *  WGS ÁÂÇ¥¿¡¼­ UTM ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertWGS2UTM : function ( longitude,  latitude,  utmBaseLong,  utmBaseLat) {


      this.setParameter(this.m_TX,this.m_TY,this.m_TZ,this.m_TOMEGA,this.m_TPHI,this.m_TKAPPA,this.m_TS,this.m_TMODE);

      return this.changeXY(this.GP2TM(latitude, longitude, this.m_AW, this.m_FW, this.m_ux0, this.m_uy0, this.m_OKUTM,
                      utmBaseLat, utmBaseLong));
  },

  /**
   *  WGS ÁÂÇ¥¿¡¼­ BESSEL ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertWGS2BESSEL : function( longitude,  latitude) {


      var xy = new Array();

      this.setParameter(this.m_TX,this.m_TY,this.m_TZ,this.m_TOMEGA,this.m_TPHI,this.m_TKAPPA,this.m_TS,this.m_TMODE);
      xy = this.WGP2GP(latitude, longitude, 0 ,this.m_AB, this.m_FB);

      return this.changeXY(xy);
  },


  /**
   *  WGS ÁÂÇ¥¿¡¼­ WTM ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertWGS2WTM : function ( longitude,  latitude,  tmBaseLong,  tmBaseLat) {
    return this.changeXY(this.GP2TM(latitude, longitude, this.m_AW, this.m_FW, this.m_x0, this.m_y0, this.m_OKKTM,
                  tmBaseLat, tmBaseLong));
  },


  /**
   *  WGS ÁÂÇ¥¿¡¼­  WKTM ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertWGS2WKTM : function ( longitude,  latitude) {
    return this.changeXY(this.GP2TM(latitude, longitude, this.m_AW, this.m_FW, this.m_x1, this.m_y1, this.m_OKGTM,
                  this.BASE_KTM_LAT, this.BASE_KTM_LON));
  },


  /**
   *  WGS ÁÂÇ¥¿¡¼­ WCONGNAMUL  ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertWGS2WCONG : function( longitude,  latitude) {
      var xy = new Array();

      xy = this.GP2TM(latitude, longitude, this.m_AW, this.m_FW, this.m_x0, this.m_y0, this.m_OKKTM, this.BASE_TM_LAT,
              this.BASE_TM_LON);
    xy = this.changeXY(xy);

    xy[0] = Math.round(xy[0] * 2.5);
    xy[1] = Math.round(xy[1] * 2.5);

    return xy;
  },

  /**
   *  WGS ÁÂÇ¥¿¡¼­ UTM ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertWGS2UTMK : function ( longitude,  latitude) {
      this.setParameter(this.m_TX,this.m_TY,this.m_TZ,this.m_TOMEGA,this.m_TPHI,this.m_TKAPPA,this.m_TS,this.m_TMODE);

      return this.changeXY(this.GP2TM(latitude, longitude, this.m_AW, this.m_FW, this.m_ukx0, this.m_uky0, this.m_OKUTM,
                      this.BASE_UTMK_LAT, this.BASE_UTMK_LON));
  },

  /**
   *  TM ÁÂÇ¥¿¡¼­  BESSEL  ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertTM2BESSEL : function( tmx,  tmy,  tmBaseLong,  tmBaseLat) {
    return this.changeXY(this.TM2GP(tmy, tmx, this.m_AB, this.m_FB, this.m_x0, this.m_y0, this.m_OKKTM,
               tmBaseLat, tmBaseLong + 10.405 / 3600.0));
  },


  /**
   *  UTM ÁÂÇ¥¿¡¼­ WGS  ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertUTM2WGS : function( tmx,  tmy,  utmBaseLong,  utmBaseLat) {
      this.setParameter(this.m_TX,this.m_TY,this.m_TZ,this.m_TOMEGA,this.m_TPHI,this.m_TKAPPA,this.m_TS,this.m_TMODE);

      return this.changeXY(this.TM2GP(tmy, tmx, this.m_AW, this.m_FW, this.m_ux0, this.m_uy0, this.m_OKUTM,
                      utmBaseLat, utmBaseLong));
  },

  /**
   *  UTM-K ÁÂÇ¥¿¡¼­ WGS  ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertUTMK2WGS : function( tmx,  tmy) {
      this.setParameter(this.m_TX,this.m_TY,this.m_TZ,this.m_TOMEGA,this.m_TPHI,this.m_TKAPPA,this.m_TS,this.m_TMODE);

      return this.changeXY(this.TM2GP(tmy, tmx, this.m_AW, this.m_FW, this.m_ukx0, this.m_uky0, this.m_OKUTM,
                      this.BASE_UTMK_LAT, this.BASE_UTMK_LON));
  },

  /**
   *  KTM ÁÂÇ¥¿¡¼­ BESSEL  ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertKTM2BESSEL : function( tmx,  tmy) {
    return this.changeXY(this.TM2GP(tmy, tmx, this.m_AB, this.m_FB, this.m_x1, this.m_y1, this.m_OKGTM,
                  this.BASE_KTM_LAT, this.BASE_KTM_LON));
  },

  /**
   *  BESSEL ±â¹ÝÀÇ UTM ÁÂÇ¥¿¡¼­ BESSEL ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertBUTM2BESSEL : function( tmx,  tmy,  utmBaseLong,  utmBaseLat) {
    return this.changeXY(this.TM2GP(tmy, tmx, this.m_AB, this.m_FB, this.m_ux0, this.m_uy0, this.m_OKUTM,
                  utmBaseLat, utmBaseLong));
  },

  /**
   *  BESSEL ±â¹ÝÀÇ UTMK ÁÂÇ¥¿¡¼­ BESSEL ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertBUTMK2BESSEL : function( tmx,  tmy) {
    return this.changeXY(this.TM2GP(tmy, tmx, this.m_AB, this.m_FB, this.m_ukx0, this.m_uky0, this.m_OKUTM,
                  this.BASE_UTMK_LAT, this.BASE_UTMK_LON + 10.405 / 3600.0));
  },

  /**
   *  CONGNAMUL  ÁÂÇ¥¿¡¼­ BESSEL  ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertCONG2BESSEL : function( congx,  congy) {
    var xy = new Array();

    xy = this.shiftIsland(congx, congy, false);
    return this.changeXY(this.TM2GP(xy[1], xy[0], this.m_AB, this.m_FB, this.m_x0, this.m_y0, this.m_OKKTM,
                  this.BASE_TM_LAT, this.BASE_TM_LON + 10.405 / 3600.0));
  },


  /**
   *  WTM  ÁÂÇ¥¿¡¼­  WGS  ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertWTM2WGS : function( tmx,  tmy,  tmBaseLong,  tmBaseLat) {

    return this.changeXY(this.TM2GP(tmy, tmx, this.m_AW, this.m_FW, this.m_x0, this.m_y0, this.m_OKKTM,
                  tmBaseLat, tmBaseLong));
  },


  /**
   *  WKTM  ÁÂÇ¥¿¡¼­  WGS  ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertWKTM2WGS : function( tmx,  tmy) {
    return this.changeXY(this.TM2GP(tmy, tmx, this.m_AW, this.m_FW, this.m_x1, this.m_y1, this.m_OKGTM,
                  this.BASE_KTM_LAT, this.BASE_KTM_LON));
  },


  /**
   *  WCONGNAMUL  ÁÂÇ¥¿¡¼­ WGS  ÁÂÇ¥°è·Î º¯È¯µÇ´Â ÇÔ¼ö
   */
  convertWCONG2WGS : function( congx,  congy) {
    var xy = new Array();

    xy[0] = congx / 2.5;
    xy[1] = congy / 2.5;

    return this.changeXY(this.TM2GP(xy[1], xy[0], this.m_AW, this.m_FW, this.m_x0, this.m_y0,
                  this.m_OKKTM, this.BASE_TM_LAT, this.BASE_TM_LON));
  },

  /**
   *  X, Y °ªÀ» ¹Ù²ãÁØ´Ù.
   */
  changeXY : function (xy) {

    this.tmp = xy[0];
    xy[0] = xy[1];
    xy[1] = this.tmp;
    return xy;
  },



  /**
   *  TM ÁÂÇ¥ »óÅÂ¼­ Äá³ª¹°ÁÂÇ¥·Î º¯È¯ÇÒ °æ¿ì Á¦ÁÖµµ Áö¿ªÀ» SHIFT ÇÑ´Ù.
   */
  shiftIsland : function (dwX, dwY, bToCong){
    var deltaX = 0 , deltaY = 0;
    var convValue = new Object();

    if(bToCong){
      for(var i=0;i<this.rectArray1.length;i++){
        if( ((dwX - this.rectArray1[i].x) >= 0) && ((dwX-this.rectArray1[i].x) <= this.rectArray1[i].w) &&
          ((dwY - this.rectArray1[i].y) >= 0) && ((dwY-this.rectArray1[i].y) <= this.rectArray1[i].h) ) {
          deltaX += this.deltaValue1[i][0];
          deltaY += this.deltaValue1[i][1];
          break;
        }
      }
      convValue[0] = parseInt((dwX + deltaX)*2.5+0.5);
      convValue[1] = parseInt((dwY + deltaY)*2.5+0.5);

    }else{
      convValue[0] = dwX / 2.5;
      convValue[1] = dwY / 2.5;
      for(var i=0;i<this.rectArray2.length;i++) {
        if( ((convValue[0]-this.rectArray2[i].x) >= 0) && ((convValue[0]-this.rectArray2[i].x) <= this.rectArray2[i].w) &&
        ((convValue[1] - this.rectArray2[i].y) >= 0) && ((convValue[1] - this.rectArray2[i].y) <= this.rectArray2[i].h)) {
          convValue[0] += this.deltaValue2[i][0];
          convValue[1] += this.deltaValue2[i][1];
          break;
        }
      }
    }
    return convValue;
  },


  /**
   *  º¯È¯ ¸Å°³ º¯¼öµéÀÇ PARAM ¼³Á¤
   */
  setParameter : function ( dx,  dy,  dz,  omega,  phi,  kappa,  ds,  imode){
    var degrad = 0.0;
    degrad = Math.atan(1) / 45.0;

    this.m_dx = dx;
    this.m_dy = dy;
    this.m_dz = dz;
    this.m_omega = omega / 3600.0 * degrad;
    this.m_phi = phi / 3600.0 * degrad;
    this.m_kappa = kappa / 3600.0 * degrad;
    this.m_ds = ds * 0.000001;
    this.m_imode = imode;
  },



  /**
   *  WGS Áö½ÉÁÂÇ¥¸¦ »ç¿ëÀÚ Áö½ÉÁÂÇ¥·Î º¯È¯ÇÑ´Ù. Molodensky ¹ý
   *  ÀÔ·Â -> xw, yw, zw  wgs Áö½ÉÁÂÇ¥
   *  Ãâ·Â -> x[0], y[1], z[2]  : »ç¿ëÀÚ Áö½ÉÁÂÇ¥
   */
  TransMolod : function ( xw,  yw,  zw){

    var xyz = new Array(3);

    xyz[0] = xw + (1 + this.m_ds) * (this.m_kappa * yw - this.m_phi * zw) + this.m_dx;
    xyz[1] = yw + (1 + this.m_ds) * (-this.m_kappa * xw + this.m_omega * zw) + this.m_dy;
    xyz[2] = zw + (1 + this.m_ds) * (this.m_phi * xw - this.m_omega * yw) + this.m_dz;

    return xyz;
  },

  /**
   *  Áö½ÉÁÂÇ¥¸¦ »ç¿ëÀÚ wgs Áö½ÉÁÂÇ¥·Î ¿ª º¯È¯ÇÒ Molodensky ¹ý
   */
  InverseMolod : function( xb,  yb,  zb){

    var xt = 0.0, yt = 0.0, zt = 0.0;
    xt = (xb - this.m_dx) * (1 + this.m_ds);
    yt = (yb - this.m_dy) * (1 + this.m_ds);
    zt = (zb - this.m_dz) * (1 + this.m_ds);

    var xyz_w = new Array(3);
    xyz_w[0] = 1.0 / (1.0 + this.m_ds) * (xt - this.m_kappa * yt + this.m_phi * zt);
    xyz_w[1] = 1.0 / (1.0 + this.m_ds) * (this.m_kappa * xt + yt - this.m_omega * zt);
    xyz_w[2] = 1.0 / (1.0 + this.m_ds) * (-this.m_phi * xt + this.m_omega * yt + zt);

    return xyz_w;
  },

  /**
   *  WGS Áö½ÉÁÂÇ¥¸¦ »ç¿ëÀÚ ÀÚ½ÉÁÂÇ¥·Î º¯È¯ÇÑ´Ù. Bursa ¹ý
   *  ÀÔ·Â -> xw, yw, zw  wgs Áö½ÉÁÂÇ¥
   *  Ãâ·Â -> x[0], y[1], z[2]  : »ç¿ëÀÚ Áö½ÉÁÂÇ¥
   */
  TransBursa : function( xw,  yw,  zw){

    var xyz  = new Array(3);

    xyz[0] = (1 + this.m_ds) * (xw + this.m_kappa * yw - this.m_phi * zw) + this.m_dx;
    xyz[1] = (1 + this.m_ds) * (-this.m_kappa * xw + yw + this.m_omega * zw) + this.m_dy;
    xyz[2] = (1 + this.m_ds) * (this.m_phi * xw - this.m_omega * yw + zw) + this.m_dz;

    return xyz;
  },

  /**
   *  Áö½ÉÁÂÇ¥¸¦ »ç¿ëÀÚ WGS Áö½ÉÁÂÇ¥·Î ¿ª º¯È¯ÇÒ , Burse ¹ý
   */
  InverseBursa : function( xb,  yb,  zb){

    var xt = 0.0, yt = 0.0, zt = 0.0;
    xt = xb - this.m_dx;
    yt = yb - this.m_dy;
    zt = zb - this.m_dz;

    var xyz_w = new Array(3);
    xyz_w[0] = 1.0 / (1.0 + this.m_ds) * (xt - this.m_kappa * yt + this.m_phi * zt);
    xyz_w[1] = 1.0 / (1.0 + this.m_ds) * (this.m_kappa * xt + yt - this.m_omega * zt);
    xyz_w[2] = 1.0 / (1.0 + this.m_ds) * (-this.m_phi * xt + this.m_omega * yt + zt);

    return xyz_w;
  },


  WGP2GP : function ( latitude,  longitude,  hw,  a,  f){
    var xyz = new Array(3);



    xyz = this.WGP2WCTR(latitude, longitude, hw);

    if (this.m_imode == 1) {
      xyz = this.TransMolod(xyz[0], xyz[1], xyz[2]);

    } else {
      xyz = this.TransBursa(xyz[0], xyz[1], xyz[2]);


    }

    var xy  = new Array(2);
    xy = this.CTR2GP(xyz[0], xyz[1], xyz[2], a, f);

    xy[0] = xy[0] + 0.0 / 3600.0;
    xy[1] = xy[1] + 0.0 / 3600.0;

    return xy;
  },


  /**
   *  WGS °æÀ§µµ¸¦ WGS Áö½ÉÁÂÇ¥·Î ¹Ù²Þ
   *  ÀÔ·Â -> latitude  : À§µµ (°¢µµ´ÜÀ§), longitude : °æµµ, h : Å¸¿øÃ¼°í
   *  Ãâ·Â -> x[0], y[1], z[2] : Áö½ÉÁÂÇ¥
   */
  WGP2WCTR : function ( latitude,  longitude,  h){

    return this.GP2CTR(latitude, longitude, h, this.m_AW, this.m_FW);
  },

  /**
   *  WGS Áö½ÉÁÂÇ¥¸¦ WGS °æÀ§µµ·Î ¹Ù²Þ
   */
  WCTR2WGP : function( x,  y,  z){

    return this.CTR2GP(x, y, z, this.m_AW, this.m_FW);
  },

  /**
   *  ÀÓÀÇÀÇ Å¸¿øÃ¼ÀÇ °æÀ§µµ¸¦ WGS °æÀ§µµ·Î º¯È¯ÇÑ´Ù.
   */
  GP2WGP : function ( latitude,  longitude,  hu,  a,  f){

    var xyz = new Array(3);
    xyz = this.GP2CTR(latitude, longitude, hu, a, f);

    if (this.m_imode == 1) {
      xyz = this.InverseMolod(xyz[0], xyz[1], xyz[2]);
    } else {
      xyz = this.InverseBursa(xyz[0], xyz[1], xyz[2]);
    }
    return this.WCTR2WGP(xyz[0], xyz[1], xyz[2]);
  },

  /**
   *  °æÀ§µµ ÁÂÇ¥¸¦ Áö½ÉÁÂÇ¥·Î º¯È¯ÇÑ´Ù.
   *  ÀÔ·Â -> À§µµ, °æµµ, Å¸¿øÃ¼°í, Å¸¿øÃ¼Àå¹Ý°æ, ÆíÆòµµ
   */
   GP2CTR : function ( latitude,  longitude,  h,  a,  f1){

    var xyz = new Array(3);
    var degrad = 0.0, sphi = 0.0, slam = 0.0, recf = 0.0, b = 0.0, es = 0.0, n = 0.0, f = 0.0;

    f = f1;
    if(f > 1) f = 1.0 / f;

    degrad = Math.atan(1.0) / 45.0;
    sphi = latitude * degrad;
    slam = longitude * degrad;





    recf = 1.0 / f;
    b = a * (recf - 1) / recf;
    es = (Math.pow(a,2) - Math.pow(b,2)) / Math.pow(a,2);


    n = a / Math.sqrt(1 - es * Math.pow(Math.sin(sphi),2));




    xyz[0] = (n + h) * Math.cos(sphi) * Math.cos(slam);
    xyz[1] = (n + h) * Math.cos(sphi) * Math.sin(slam);
    xyz[2] = ((Math.pow(b,2) / Math.pow(a,2)) * n + h) * Math.sin(sphi);

    return xyz;
  },


  /**
   *  Áö½ÉÁÂÇ¥¸¦ °æÀ§µµ ÁÂÇ¥·Î ¹Ù²Þ
   *  ÀÔ·Â -> x, y, z Áö½ÉÁÂÇ¥ x(north), y(east), z, a -> Àå¹Ý°æ, f1  : ÆíÆòÀ² (1/299.....)
   *  Ãâ·Â -> x[0] À§µµ, y[1] °æµµ
   */
   CTR2GP : function( x,  y,  z,  a,  f1){

    var degrad = 0.0, sphiold = 0.0, sphinew = 0.0, slam = 0.0, recf = 0.0, b = 0.0, es = 0.0, n = 0.0;
    var p = 0.0, t1 = 0.0, f = 0.0, h = 0.0;

    f = f1;
    if(f > 1) f = 1.0 / f;

    degrad = Math.atan(1.0) / 45.0;



    recf = 1.0 / f;
    b = a * (recf - 1) / recf;
    es = (Math.pow(a,2) - Math.pow(b,2)) / Math.pow(a,2);


    slam = Math.atan(y / x);


    p = Math.sqrt(x * x + y * y);



    n = a;

    var i = 0;

    do{
      i = i + 1;
      t1 = Math.pow(Math.pow(b,2) / Math.pow(a,2) * n + h,2) - Math.pow(z,2);
      t1 = z / Math.sqrt(t1);
      sphinew = Math.atan(t1);

      if(Math.abs(sphinew - sphiold) < 1E-18) break;

      n = a / Math.sqrt(1 - es * Math.pow(Math.sin(sphinew),2));

      h = p / Math.cos(sphinew) - n;
      sphiold = sphinew;

      if(i > 30) break;

    } while(true);

    var xy  = new Array(2);

    xy[0] = sphinew / degrad;
    xy[1] = slam / degrad;
    if(x < 0) xy[1] = 180 + xy[1];
    if(xy[1] < 0) xy[1] = 360 + xy[1];

    return xy;
  },


  /**
   *  ÀÔ·Â -> À§µµ, °æµµ, Å¸¿øÃ¼ Àå¹Ý°æ, ÆíÆòµµ, ¿øÁ¡Á÷±³ÁÂÇ¥( x=ºÏ, y=µ¿),
   *      ÃàÃ»°è¼ö(ÇÑ±¹ : 1.0000, UTM : 0.996), À§µµ¿øÁ¡, °æµµ¿øÁ¡
   *  Ãâ·Â -> X = À§µµ, Y = °æµµ
   */
   GP2TM : function ( latitude,  longitude,  a,  f1,  x0,  y0,  ok,  base1,  base2){

    var sphi = 0.0, slam = 0.0, sphi0 = 0.0, slam0 = 0.0, f = 0.0;
    var fe = 0.0, degrad = 0.0, recf = 0.0, b = 0.0, es = 0.0, ebs = 0.0, tn = 0.0;
    var ap = 0.0, bp = 0.0, cp = 0.0, dp = 0.0, ep = 0.0;
    var dlam= 0.0, s = 0.0,  c = 0.0, t = 0.0, eta = 0.0, sn = 0.0, tmd = 0.0, tmd1 = 0.0, nfn = 0.0, xn1 = 0.0;
    var t1 = 0.0, t2 = 0.0, t3 = 0.0, t4 = 0.0, t5 = 0.0, t6 = 0.0, t7 = 0.0, t8 = 0.0, t9 = 0.0;


    var phi0 = base1;

    var lam0 = base2;

    fe = y0;
    f = f1;
    if(f > 1) f = 1.0 / f;

    degrad = Math.atan(1.0) / 45.0;

    sphi = latitude * degrad;
    slam = longitude * degrad;
    sphi0 = phi0 * degrad;
    slam0 = lam0 * degrad;


    recf = 1.0 / f;
    b = a * (recf - 1) / recf;


    es = (Math.pow(a,2) - Math.pow(b,2)) / Math.pow(a,2);


    ebs = (Math.pow(a,2) - Math.pow(b,2)) / Math.pow(b,2);


    tn = (a - b) / (a + b);
    ap = a * (1 - tn + 5 * (Math.pow(tn,2) - Math.pow(tn,3)) / 4 + 81 * (Math.pow(tn,4) - Math.pow(tn,5)) / 64);
    bp = 3 * a * (tn - Math.pow(tn,2) + 7 * (Math.pow(tn,3) - Math.pow(tn,4)) / 8 + 55 * Math.pow(tn,5) / 64) / 2;
    cp = 15 * a * (Math.pow(tn,2) - Math.pow(tn,3) + 3 * (Math.pow(tn,4) - Math.pow(tn,5)) / 4) / 16;
    dp = 35 * a * (Math.pow(tn,3) - Math.pow(tn,4) + 11 * Math.pow(tn,5) / 16) / 48;
    ep = 315 * a * (Math.pow(tn,4) - Math.pow(tn,5)) / 512;

    dlam = slam - slam0;


    tmd1 = ap * sphi0 - bp * Math.sin(2 * sphi0) + cp * Math.sin(4 * sphi0) - dp * Math.sin(6 * sphi0) + ep *
         Math.sin(8 * sphi0);
    nfn = tmd1 * ok;


    s = Math.sin(sphi);
    c = Math.cos(sphi);

    t = s / c;
    eta = ebs * Math.pow(c,2);


    sn = a / Math.sqrt(1 - es * Math.pow(Math.sin(sphi),2));


    tmd = ap * sphi - bp * Math.sin(2 * sphi) + cp * Math.sin(4 * sphi) - dp * Math.sin(6 * sphi) + ep * Math.sin(8 * sphi);

    var xy = new Array(2);

    t1 = tmd * ok;
    t2 = sn * s * c * ok / 2;
    t3 = sn * s * Math.pow(c,3) * ok * (5 - Math.pow(t,2) + 9 * eta + 4 * Math.pow(eta,2)) / 24;

    t4 = sn * s * Math.pow(c,5) * ok * (61 - 58 * Math.pow(t,2) + Math.pow(t,4) + 270 * eta - 330 * Math.pow(t,2) * eta + 445 *
          Math.pow(eta,2) + 324 * Math.pow(eta,3) - 680 * Math.pow(t,2) * Math.pow(eta,2) + 88 * Math.pow(eta,4) - 600 *
          Math.pow(t,2) * Math.pow(eta,3) - 192 * Math.pow(t,2) * Math.pow(eta,4)) / 720;
    t5 = sn  * s * Math.pow(c,7) * ok * (1385 - 3111 * Math.pow(t,2) + 543 * Math.pow(t,4) - Math.pow(t,6)) / 40320;
    xn1 = t1 + Math.pow(dlam,2) * t2 + Math.pow(dlam,4) * t3 + Math.pow(dlam,6) * t4 + Math.pow(dlam,8) * t5;
    xy[0] = xn1 - nfn + x0;

    t6 = sn * c * ok;
    t7 = sn * Math.pow(c,3) * ok * (1 - Math.pow(t,2) + eta) / 6;
    t8 = sn * Math.pow(c,5) * ok * (5 - 18 * Math.pow(t,2) + Math.pow(t,4) + 14 * eta - 58 * Math.pow(t,2) * eta + 13 *
          Math.pow(eta,2) + 4 * Math.pow(eta,3) - 64 * Math.pow(t,2) * Math.pow(eta,2) - 25 * Math.pow(t,2) *
          Math.pow(eta,3)) / 120;
    t9 = sn * Math.pow(c,7) * ok * (61 - 479 * Math.pow(t,2) + 179 * Math.pow(t,4) - Math.pow(t,6)) / 5040;
    xy[1] = fe + dlam * t6 + Math.pow(dlam,3) * t7 + Math.pow(dlam,5) * t8 + Math.pow(dlam,7) * t9;


    return xy;
  },


  /**
   *  Á÷±³ÁÂÇ¥¸¦ °æÀ§µµ ÁÂÇ¥·Î º¯È¯ÇÑ´Ù.
   */
  TM2GP : function ( xn,  ye,  a,  f1,  x0,  y0,  ok,  base1,  base2){

    var sphi = 0.0, slam = 0.0, sphi0 = 0.0, slam0 = 0.0, f = 0.0;
    var fe = 0.0, degrad = 0.0, recf = 0.0, b = 0.0, es = 0.0, ebs = 0.0, tn = 0.0;
    var ap = 0.0, bp = 0.0, cp = 0.0, dp = 0.0, ep = 0.0;
    var dLam = 0.0, s = 0.0, c = 0.0, t = 0.0, eta = 0.0, sn = 0.0, tmd = 0.0, tmd1 = 0.0, nfn = 0.0, xn1 = 0.0;
    var t10 = 0.0, t11 = 0.0, t12 = 0.0, t13 = 0.0, t14 = 0.0, t15 = 0.0, t16 = 0.0, t17 = 0.0;
    var de = 0.0, sr = 0.0, ftphi = 0.0;

    f = f1;
    if(f > 1) f = 1.0 / f;

    fe = y0;

    degrad = Math.atan(1.0) / 45.0;
    sphi0 = base1 * degrad;
    slam0 = base2 * degrad;


    recf = 1.0 / f;

    b = a * (recf - 1) / recf;


    es = (Math.pow(a,2) - Math.pow(b,2)) / Math.pow(a,2);


    ebs = (Math.pow(a,2) - Math.pow(b,2)) / Math.pow(b,2);




    tn = (a - b) / (a + b);
    ap = a * (1 - tn + 5 * (Math.pow(tn,2) - Math.pow(tn,3)) / 4 + 81 * (Math.pow(tn,4) - Math.pow(tn,5)) / 64);
    bp = 3 * a * (tn - Math.pow(tn,2) + 7 * (Math.pow(tn,3) - Math.pow(tn,4)) / 8 + 55 * Math.pow(tn,5) / 64) / 2;
    cp = 15 * a * (Math.pow(tn,2) - Math.pow(tn,3) + 3 * (Math.pow(tn,4) - Math.pow(tn,5)) / 4) / 16;
    dp = 35 * a * (Math.pow(tn,3) - Math.pow(tn,4) + 11 * Math.pow(tn,5) / 16) / 48;
    ep = 315 * a * (Math.pow(tn,4) - Math.pow(tn,5)) / 512;





    tmd1 = ap * sphi0 - bp * Math.sin(2 * sphi0) + cp * Math.sin(4 * sphi0) - dp * Math.sin(6 * sphi0) + ep *
               Math.sin(8 * sphi0);
    nfn = tmd1 * ok;


    xn1 = xn + nfn - x0;

    tmd = xn1 / ok;


    sr = a * (1 - es) / Math.pow(Math.sqrt(1 - es * Math.pow(Math.sin(0),2)),3);
    ftphi = tmd / sr;


    for(var i=1;i<=5;i++){


      t10 = ap * ftphi - bp * Math.sin(2 * ftphi) + cp * Math.sin(4 * ftphi) - dp * Math.sin(6 * ftphi) + ep *
              Math.sin(8 * ftphi);


      sr = a * (1 - es) / Math.pow(Math.sqrt(1 - es * Math.pow(Math.sin(ftphi),2)),3);



      ftphi = ftphi + (tmd - t10) / sr;
    }




    sr = a * (1 - es) / Math.pow(Math.sqrt(1 - es * Math.pow(Math.sin(ftphi),2)),3);


    sn = a / Math.sqrt(1 - es * Math.pow(Math.sin(ftphi),2));


    s = Math.sin(ftphi);
    c = Math.cos(ftphi);
    t = s / c;
    eta = ebs * Math.pow(c,2);


    de = ye - fe;


    t10 = t / (2 * sr * sn * Math.pow(ok,2));
    t11 = t * (5 + 3 * Math.pow(t,2) + eta - 4 * Math.pow(eta,2) - 9 * Math.pow(t,2) * eta) /
            (24 * sr * Math.pow(sn,3) * Math.pow(ok,4));
    t12 = t * (61 + 90 * Math.pow(t,2) + 46 * eta + 45 * Math.pow(t,4) - 252 * Math.pow(t,2) * eta - 3 *
            Math.pow(eta,2) + 100 * Math.pow(eta,3) - 66 * Math.pow(t,2) * Math.pow(eta,2) - 90 * Math.pow(t,4) *
            eta + 88 * Math.pow(eta,4) + 225 * Math.pow(t,4) * Math.pow(eta,2) + 84 * Math.pow(t,2) * Math.pow(eta,3) - 192 *
            Math.pow(t,2) * Math.pow(eta,4)) / (720 * sr * Math.pow(sn,5) * Math.pow(ok,6));
    t13 = t * (1385 + 3633 * Math.pow(t,2) + 4095 * Math.pow(t,4) + 1575 * Math.pow(t,6)) / (40320.0 * sr * Math.pow(sn,7) *
            Math.pow(ok,8));


    sphi = ftphi - Math.pow(de,2) * t10 + Math.pow(de,4) * t11 - Math.pow(de,6) * t12 + Math.pow(de,8) * t13;


    t14 = 1.0 / (sn * c * ok);
    t15 = (1 + 2 * Math.pow(t,2) + eta) / (6 * Math.pow(sn,3) * c * Math.pow(ok,3));
    t16 = (5 + 6 * eta + 28 * Math.pow(t,2) - 3 * Math.pow(eta,2) + 8 * Math.pow(t,2) * eta + 24 * Math.pow(t,4) - 4 *
            Math.pow(eta,3) + 4 * Math.pow(t,2) * Math.pow(eta,2) + 24 * Math.pow(t,2) * Math.pow(eta,3)) /
            (120 * Math.pow(sn,5) * c * Math.pow(ok,5));
    t17 = (61 + 662 * Math.pow(t,2) + 1320 * Math.pow(t,4) + 720 * Math.pow(t,6)) / (5040.0 * Math.pow(sn,7) * c *
            Math.pow(ok,7));


    dLam = de * t14 - Math.pow(de,3) * t15 + Math.pow(de,5) * t16 - Math.pow(de,7) * t17;


    slam = slam0 + dLam;

    var xy = new Array(2);


    xy[0] = sphi / degrad;
    xy[1] = slam / degrad;


    return xy;
  }
}

// Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TransCoordinator;
}
// included directly via <script> tag
else {
    window.TransCoordinator = TransCoordinator;
}
