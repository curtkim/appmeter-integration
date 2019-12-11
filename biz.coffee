setTimeout2 = (t,f)-> setTimeout f, t
levelToZoom = (level)-> 14- level
millisecond2minute = (val)->
  q = parseInt(val/1000/60)
  r = parseInt((val - q*60*1000)/1000)
  "#{q}분 #{r}초"
second2minute = (val)->
  q = parseInt(val / 60)
  r = parseInt(val - q * 60)
  "#{q}분 #{r}초"
millisecond2minuteDecimal = (millisec)-> millisec / 1000 / 60

transCoordinator = new TransCoordinator()
wgs2wtm = (x,y)-> transCoordinator.convertWGS2WTM(x, y, 127, 38)
wtm2wgs = (x,y)-> transCoordinator.convertWTM2(x, y, transCoordinator.COORD_WGS84, 127, 38, -1, -1 )
dist = (p1, p2)-> Math.sqrt ((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y))
percent = (val)-> parseInt(val*100) + "%"
lpad = (value, length)->
  if (value.toString().length < length) then lpad("0"+value, length) else value

formatTime = (time)->
  if time
    date = new Date(time)
    lpad(date.getHours(),2) + ":" + lpad(date.getMinutes(),2) + ":" + lpad(date.getSeconds(),2) + "." + lpad(date.getMilliseconds(),3)
  else
    '-'

formatDateTime = (date)->
  if date
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + lpad(date.getHours(),2) + ":" + lpad(date.getMinutes(),2) + ":" + lpad(date.getSeconds(),2)
  else
    '-'

formatLatLng = (line)->
  arr = line.split(',')
  arr[2]+","+arr[1]


newStyle = (graphic, fillColor, radius=5)->
  new OpenLayers.Style({
    graphicName: graphic
    stroke: false
    fill: true
    fillColor: fillColor
    pointRadius: radius
    fillOpacity: 1
  })

LINE_STYLE_RAW = new OpenLayers.StyleMap({
  default: new OpenLayers.Style({
    strokeColor: "red"
    strokeWidth: 2
  })
})
LINE_STYLE_RESULT = new OpenLayers.StyleMap({
  default: new OpenLayers.Style({
    strokeColor: "blue"
    strokeWidth: 8
    strokeOpacity: 0.5
  })
})
LINE_STYLE_EXPECTED = new OpenLayers.StyleMap({
  default: new OpenLayers.Style({
    strokeColor: "black"
    strokeWidth: 2
    strokeDashstyle: 'dash'
  })
})

MARKER_SIZE = new OpenLayers.Size(50, 45)
MARKER_OFFSET = new OpenLayers.Pixel(-15, -45)
START_ICON = new OpenLayers.Icon("http://i1.daumcdn.net/localimg/localimages/07/2013/img/red_b.png", MARKER_SIZE, MARKER_OFFSET)
END_ICON = new OpenLayers.Icon("http://i1.daumcdn.net/localimg/localimages/07/2013/img/blue_b.png", MARKER_SIZE, MARKER_OFFSET)


INFO_TEMPLATE = '''
  <table class="table-condensed">
  <tr>
    <th>거리</th>
    <td>${meter.distance}m
    </td>
  </tr>
  </table>
'''

POINTS_TEMPLATE = '''
  <table>
  <tr>
    <th>idx</th>
    <th>시간</th>
    <th>단위거리<br/>(m)</th>
    <th>단위시간<br/>(ms)</th>    
    <th>단위속도<br/>(km/h)</th>
    <th>심야</th>
    <th>시계</th>
    <th>remainDist</th>
    <th>remainSec</th>
    <th>payType</th>
    <th>단위요금</th>
    <th>누적요금</th>
  </tr>
  {for unit in units}
  <tr onmouseover='moveMarker(${unit_index})' onclick='setCenter(${unit.longitude}, ${unit.latitude})'>
    <td>${unit_index}</td>
    <td>${unit.time|formatTime}</td>
    <td>${unit.dist}</td>
    <td>${unit.timeDiff}</td>
    <td>${unit.spd}</td>
    <td>${unit.isNight}</td>
    <td>${unit.isOutside}</td>
    <td>${unit.remainDist}</td>
    <td>${unit.remainSec}</td>
    <td>${unit.payType}</td>
    <td>${unit.addedPay}</td>
    <td>${unit.sumPay}</td>
  </tr>
  {/for}
  </table>
'''

# global variable
map = null
rawLineLayer = null
resultLineLayer = null
rawPointLayer = null
resultPointLayer = null
expectedLineLayer = null
markerLayer = null

biz = null
path = null
raw = null

window.moveMarker = (idx)->
  #rawPt = rawPts[idx]
  #rawPointLayer.removeAllFeatures()
  #feature = new OpenLayers.Feature.Vector(rawPt, {})
  #rawPointLayer.addFeatures(feature)

  resultPointLayer.removeAllFeatures()
  unit = biz.units[idx]
  if unit
    coord = wgs2wtm(unit.longitude, unit.latitude)    
    pt = new OpenLayers.Geometry.Point( coord[0], coord[1] )
    feature = new OpenLayers.Feature.Vector(pt, {})
    resultPointLayer.addFeatures(feature)

window.setCenter = (lng,lat)-> 
  coord = wgs2wtm(lng, lat)
  console.log(lng, lat, coord)
  map.setCenter( new OpenLayers.LonLat(coord[0],coord[1]))


$(document).ready ()->
  maxExtent = new OpenLayers.Bounds(-30000-Math.pow(2,19)*2,-60000-Math.pow(2,19),-30000+Math.pow(2,19)*3, -60000+Math.pow(2, 19)*3);

  mapOpt =
    maxExtent: maxExtent
    numZoomLevels:15
    maxResolution:2048
    units:'m'
    projection: new OpenLayers.Projection("WTM")
    controls: [
      new OpenLayers.Control.PanZoomBar()
      new OpenLayers.Control.Navigation()
    ]

  map = new OpenLayers.Map('map', mapOpt )

  daumImgLayer = new OpenLayers.Layer.Daum( "base", null, {TYPE:OpenLayers.Layer.Daum.IMG} )
  map.addLayers([daumImgLayer])
  map.setCenter( new OpenLayers.LonLat(195063,441898), levelToZoom(8))

  layerSwitch = new OpenLayers.Control.LayerSwitcher()
  map.addControl(layerSwitch)
  layerSwitch.maximizeControl()

  rawLineLayer = new OpenLayers.Layer.Vector("GPS raw",{styleMap: LINE_STYLE_RAW})
  map.addLayer(rawLineLayer)
  resultLineLayer = new OpenLayers.Layer.Vector("결과 라인",{styleMap: LINE_STYLE_RESULT})
  map.addLayer(resultLineLayer)


  rawPointLayer = new OpenLayers.Layer.Vector( "GPS Point", {styleMap: newStyle('triangle', 'red'), displayInLayerSwitcher:false})
  map.addLayer(rawPointLayer)
  resultPointLayer = new OpenLayers.Layer.Vector( "결과 Point", {styleMap: newStyle('circle', 'black'), displayInLayerSwitcher:false})
  map.addLayer(resultPointLayer)

  markerLayer = new OpenLayers.Layer.Markers( "Markers", {displayInLayerSwitcher:false} )
  map.addLayer(markerLayer)

  #id = location.pathname.split('/')[2]
  id = "1"
  load(id)

  $( window ).keydown (e)->
    if( e.which == 187)
      map.zoomIn()
    else if( e.which == 189 )
      map.zoomOut()


load = (id)->
  async.series [
    (cb)-> $.ajax({url: "data/#{id}_biz.json"}).done(( data )-> cb null, data).fail( ()-> cb null, null)
    (cb)-> $.ajax({url: "data/#{id}_path.json"}).done(( data )-> cb null, data).fail( ()-> cb null, null)
    (cb)-> $.ajax({url: "data/#{id}_raw.json"}).done(( data )-> cb null, data).fail( ()-> cb null, null)
  ], (err, results)->
    biz = results[0]
    path = results[1]
    raw = results[2]

    # decorate 
    for pt,idx in path 
      biz.units[idx].time = pt.time
      if idx > 0
        biz.units[idx].timeDiff = pt.time - path[idx-1].time      

    html = TrimPath.parseTemplate(POINTS_TEMPLATE).process {
      units: biz.units,
      _MODIFIERS: {formatTime, millisecond2minute, percent}}
    $('#points').html(html)

    rawPts = []
    for pt in raw
      coord = wgs2wtm(pt.lng, pt.lat)
      rawPts.push new OpenLayers.Geometry.Point( coord[0], coord[1] )

    rawLine = new OpenLayers.Geometry.LineString(rawPts)
    rawFeature = new OpenLayers.Feature.Vector(rawLine, {})
    rawLineLayer.addFeatures(rawFeature)
    map.zoomToExtent( rawLine.getBounds() )
    map.zoomTo(13) if map.getZoom() == 14

    fullPts = []
    for pt in path
      coord = wgs2wtm(pt.lng, pt.lat)
      if pt.points
        for p in parseMiddlePoints(pt.points)
          fullPts.push(p)
      fullPts.push new OpenLayers.Geometry.Point( coord[0], coord[1] )

    resultLine = new OpenLayers.Geometry.LineString(fullPts)
    resultFeature = new OpenLayers.Feature.Vector(resultLine, {})
    resultLineLayer.addFeatures(resultFeature)

    startPt = fullPts[0]
    endPt = fullPts[fullPts.length-1]
    markerLayer.clearMarkers()
    if fullPts.length > 0
      markerLayer.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(startPt.x, startPt.y), START_ICON))
      markerLayer.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(endPt.x, endPt.y), END_ICON))

    ###
    if data.createdAt
      data.createdAt = new Date(data.createdAt)
    if data.endedAt
      data.endedAt = new Date(data.endedAt)

    data._MODIFIERS = {formatDateTime, formatTime, second2minute, formatLatLng}
    totalInterval = data.endedAt - data.createdAt
    data.averageGpsInterval = (totalInterval / data.raw.length / 1000).toFixed(2)
    data.tollgateList =  if data.tollgates then (JSON.stringify(toll) for toll in data.tollgates) else []


    [rawPts, rawInfos] = parseRawData(data.raw)
    rawLine = new OpenLayers.Geometry.LineString(rawPts)
    rawFeature = new OpenLayers.Feature.Vector(rawLine, {})
    rawLineLayer.addFeatures(rawFeature)
    map.zoomToExtent( rawLine.getBounds() )
    map.zoomTo(13) if map.getZoom() == 14

    [resultPts, resultInfos, fullPts] = parseRawData(data.path)
    for info in resultInfos
      info.approximated_velocity = parseInt(info.length * 60*60 / info.rtime)
    resultLine = new OpenLayers.Geometry.LineString(fullPts)
    resultFeature = new OpenLayers.Feature.Vector(resultLine, {})
    resultLineLayer.addFeatures(resultFeature)


    resultInfoMap = {}
    for info, idx in resultInfos
      info.pt = resultPts[idx]
      resultInfoMap[info.time] = info


    data.driveStartTime = new Date(rawInfos[0].time)
    data.driveEndTime = new Date(rawInfos[rawInfos.length-1].time)
    data.startPoint = startPt
    data.endPoint = endPt
    $('#info').html( TrimPath.parseTemplate(INFO_TEMPLATE).process data)
    #console.log(data)
    #setTimeout2 1000, ()-> drawVelocityChart(rawInfos, resultInfoMap)
  ###

parseExpecedNewLine = (links)->
  pts = []
  for link in links
    for pt in link.pt_list
      coord = wgs2wtm(pt.lon, pt.lat)
      pts.push new OpenLayers.Geometry.Point( coord[0], coord[1] )
  pts

parseExpecedLine = (links)->
  pts = []
  for link in links
    arr = link.points.split(' ')
    for strCoord in arr
      pair = strCoord.split(',')
      if pair.length >= 2
        pts.push new OpenLayers.Geometry.Point( parseInt(pair[0])/2.5, parseInt(pair[1]/2.5) )
  pts

parseMiddlePoints = (str)->
  pts = []
  strPts = str.split(',')
  for strPt in strPts
    arr = strPt.split(' ')
    coord = wgs2wtm(arr[0], arr[1])
    pts.push new OpenLayers.Geometry.Point( coord[0], coord[1] )
  pts

###
parseRawData = (lines)->
  pts = []
  fullPts = []
  #infos = []
  for line, idx in lines when line
    #arr = line.split(',')
    coord = wgs2wtm(line.lng, line.lat)
    pts.push new OpenLayers.Geometry.Point( coord[0], coord[1] )

    if line.points
      for p in parseMiddlePoints(line.points)
        fullPts.push(p)
    fullPts.push new OpenLayers.Geometry.Point( coord[0], coord[1] )

    #accuracy = if arr[3] then parseFloat(arr[3]) else null
    #speed = if arr[4] then parseFloat(arr[4]) else null
    #bearing = if arr[5] then parseFloat(arr[5]) else null
    #extraTime = if arr.length > 6 then arr[6] else null
    #extraRegion = if arr.length > 7 then arr[7] else null
    #fare = if arr[arr.length-2] then parseFloat(arr[arr.length-2]) else null
    #extraFare = if arr[arr.length-1] then parseFloat(arr[arr.length-1]) else null
    line.x = coord[0]
    line.y = coord[1]

    if idx == 0
      line.rtime = 0
      line.distance = 0
      line.velocity = 0
      line.interval = 0
      #infos[idx] = {x: coord[0], y: coord[1], time:parseInt(arr[0]), rtime:0, distance:0, velocity:0, interval:0, accuracy, speed, bearing, fare, extraFare, extraTime, extraRegion }
    else
      #time = parseInt(arr[0])
      line.rtime = line.time-lines[idx-1].time
      line.distance = parseInt(dist(pts[idx], pts[idx-1])*100)/100.0
      line.velocity = parseInt(line.distance * 60*60 / line.rtime)
      line.interval = (line.rtime- lines[idx-1].rtime)/1000 #sec
      #infos[idx] = {x: coord[0], y: coord[1], time, rtime, distance, velocity, interval, accuracy, speed, bearing, fare, extraFare, extraTime, extraRegion}
  # console.log infos
  [pts, lines, fullPts]
###