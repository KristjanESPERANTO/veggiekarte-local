((e,t)=>{"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(((e="undefined"!=typeof globalThis?globalThis:e||self).Leaflet=e.Leaflet||{},e.Leaflet.markercluster={}))})(this,function(e){var t=L.MarkerClusterGroup=L.FeatureGroup.extend({options:{maxClusterRadius:80,iconCreateFunction:null,clusterPane:L.Marker.prototype.options.pane,spiderfyOnEveryZoom:!1,spiderfyOnMaxZoom:!0,showCoverageOnHover:!0,zoomToBoundsOnClick:!0,singleMarkerMode:!1,disableClusteringAtZoom:null,removeOutsideVisibleBounds:!0,animate:!0,animateAddingMarkers:!1,spiderfyShapePositions:null,spiderfyDistanceMultiplier:1,spiderLegPolylineOptions:{weight:1.5,color:"#222",opacity:.5},chunkedLoading:!1,chunkInterval:200,chunkDelay:50,chunkProgress:null,polygonOptions:{}},initialize:function(e){L.Util.setOptions(this,e),this.options.iconCreateFunction||(this.options.iconCreateFunction=this._defaultIconCreateFunction),this._featureGroup=L.featureGroup(),this._featureGroup.addEventParent(this),this._nonPointGroup=L.featureGroup(),this._nonPointGroup.addEventParent(this),this._inZoomAnimation=0,this._needsClustering=[],this._needsRemoving=[],this._currentShownBounds=null,this._queue=[],this._childMarkerEventHandlers={dragstart:this._childMarkerDragStart,move:this._childMarkerMoved,dragend:this._childMarkerDragEnd};e=L.DomUtil.TRANSITION&&this.options.animate;L.extend(this,e?this._withAnimation:this._noAnimation),this._markerCluster=e?L.MarkerCluster:L.MarkerClusterNonAnimated},addLayer:function(e){if(e instanceof L.LayerGroup)return this.addLayers([e]);if(e.getLatLng)if(this._map){if(!this.hasLayer(e)){this._unspiderfy&&this._unspiderfy(),this._addLayer(e,this._maxZoom),this.fire("layeradd",{layer:e}),this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons();var t=e,i=this._zoom;if(e.__parent)for(;t.__parent._zoom>=i&&void 0!==t.__parent;)t=t.__parent;this._currentShownBounds.contains(t.getLatLng())&&(this.options.animateAddingMarkers?this._animationAddLayer(e,t):this._animationAddLayerNonAnimated(e,t))}}else this._needsClustering.push(e),this.fire("layeradd",{layer:e});else this._nonPointGroup.addLayer(e),this.fire("layeradd",{layer:e});return this},removeLayer:function(e){return e instanceof L.LayerGroup?this.removeLayers([e]):(e.getLatLng?this._map?e.__parent&&(this._unspiderfy&&(this._unspiderfy(),this._unspiderfyLayer(e)),this._removeLayer(e,!0),this.fire("layerremove",{layer:e}),this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),e.off(this._childMarkerEventHandlers,this),this._featureGroup.hasLayer(e))&&(this._featureGroup.removeLayer(e),e.clusterShow)&&e.clusterShow():(!this._arraySplice(this._needsClustering,e)&&this.hasLayer(e)&&this._needsRemoving.push({layer:e,latlng:e._latlng}),this.fire("layerremove",{layer:e})):(this._nonPointGroup.removeLayer(e),this.fire("layerremove",{layer:e})),this)},addLayers:function(n,r){if(!L.Util.isArray(n))return this.addLayer(n);var s,o=this._featureGroup,a=this._nonPointGroup,h=this.options.chunkedLoading,l=this.options.chunkInterval,u=this.options.chunkProgress,_=n.length,d=0,p=!0;if(this._map){var c=(new Date).getTime(),f=L.bind(function(){var e,t=(new Date).getTime();for(this._map&&this._unspiderfy&&this._unspiderfy();d<_;d++){if(h&&d%200==0){var i=(new Date).getTime()-t;if(l<i)break}(s=n[d])instanceof L.LayerGroup?(p&&(n=n.slice(),p=!1),this._extractNonGroupLayers(s,n),_=n.length):s.getLatLng?this.hasLayer(s)||(this._addLayer(s,this._maxZoom),r||this.fire("layeradd",{layer:s}),s.__parent&&2===s.__parent.getChildCount()&&(e=(i=s.__parent.getAllChildMarkers())[0]===s?i[1]:i[0],o.removeLayer(e))):(a.addLayer(s),r||this.fire("layeradd",{layer:s}))}u&&u(d,_,(new Date).getTime()-c),d===_?(this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds)):setTimeout(f,this.options.chunkDelay)},this);f()}else{for(var e=new Array(_-d),t=0;d<_;d++)(s=n[d])instanceof L.LayerGroup?(p&&(n=n.slice(),p=!1),this._extractNonGroupLayers(s,n),_=n.length):s.getLatLng?this.hasLayer(s)||(e[t++]=s):a.addLayer(s);e=e.slice(0,t),this._needsClustering=this._needsClustering.concat(e)}return this},removeLayers:function(e){var t,i=e.length,n=this._featureGroup,r=this._nonPointGroup,s=!0;if(this._map){if(this._unspiderfy){this._unspiderfy();for(var o=e.slice(),a=i,h=0;h<a;h++)(t=o[h])instanceof L.LayerGroup?(this._extractNonGroupLayers(t,o),a=o.length):this._unspiderfyLayer(t)}for(h=0;h<i;h++)(t=e[h])instanceof L.LayerGroup?(s&&(e=e.slice(),s=!1),this._extractNonGroupLayers(t,e),i=e.length):t.__parent?(this._removeLayer(t,!0,!0),this.fire("layerremove",{layer:t}),n.hasLayer(t)&&(n.removeLayer(t),t.clusterShow)&&t.clusterShow()):(r.removeLayer(t),this.fire("layerremove",{layer:t}));this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds)}else for(h=0;h<i;h++)(t=e[h])instanceof L.LayerGroup?(s&&(e=e.slice(),s=!1),this._extractNonGroupLayers(t,e),i=e.length):(this._arraySplice(this._needsClustering,t),r.removeLayer(t),this.hasLayer(t)&&this._needsRemoving.push({layer:t,latlng:t._latlng}),this.fire("layerremove",{layer:t}));return this},clearLayers:function(){return this._map||(this._needsClustering=[],this._needsRemoving=[],delete this._gridClusters,delete this._gridUnclustered),this._noanimationUnspiderfy&&this._noanimationUnspiderfy(),this._featureGroup.clearLayers(),this._nonPointGroup.clearLayers(),this.eachLayer(function(e){e.off(this._childMarkerEventHandlers,this),delete e.__parent},this),this._map&&this._generateInitialClusters(),this},getBounds:function(){var e=new L.LatLngBounds;this._topClusterLevel&&e.extend(this._topClusterLevel._bounds);for(var t=this._needsClustering.length-1;0<=t;t--)e.extend(this._needsClustering[t].getLatLng());return e.extend(this._nonPointGroup.getBounds()),e},eachLayer:function(e,t){var i,n,r,s=this._needsClustering.slice(),o=this._needsRemoving;for(this._topClusterLevel&&this._topClusterLevel.getAllChildMarkers(s),n=s.length-1;0<=n;n--){for(i=!0,r=o.length-1;0<=r;r--)if(o[r].layer===s[n]){i=!1;break}i&&e.call(t,s[n])}this._nonPointGroup.eachLayer(e,t)},getLayers:function(){var t=[];return this.eachLayer(function(e){t.push(e)}),t},getLayer:function(t){var i=null;return t=parseInt(t,10),this.eachLayer(function(e){L.stamp(e)===t&&(i=e)}),i},hasLayer:function(e){if(!e)return!1;for(var t=this._needsClustering,i=t.length-1;0<=i;i--)if(t[i]===e)return!0;for(i=(t=this._needsRemoving).length-1;0<=i;i--)if(t[i].layer===e)return!1;return!(!e.__parent||e.__parent._group!==this)||this._nonPointGroup.hasLayer(e)},zoomToShowLayer:function(e,t){var i=this._map,n=("function"!=typeof t&&(t=function(){}),function(){!i.hasLayer(e)&&!i.hasLayer(e.__parent)||this._inZoomAnimation||(this._map.off("moveend",n,this),this.off("animationend",n,this),i.hasLayer(e)?t():e.__parent._icon&&(this.once("spiderfied",t,this),e.__parent.spiderfy()))});e._icon&&this._map.getBounds().contains(e.getLatLng())?t():e.__parent._zoom<Math.round(this._map._zoom)?(this._map.on("moveend",n,this),this._map.panTo(e.getLatLng())):(this._map.on("moveend",n,this),this.on("animationend",n,this),e.__parent.zoomToBounds())},onAdd:function(e){var t,i,n;if(this._map=e,!isFinite(this._map.getMaxZoom()))throw"Map has no maxZoom specified";for(this._featureGroup.addTo(e),this._nonPointGroup.addTo(e),this._gridClusters||this._generateInitialClusters(),this._maxLat=e.options.crs.projection.MAX_LATITUDE,t=0,i=this._needsRemoving.length;t<i;t++)(n=this._needsRemoving[t]).newlatlng=n.layer._latlng,n.layer._latlng=n.latlng;for(t=0,i=this._needsRemoving.length;t<i;t++)n=this._needsRemoving[t],this._removeLayer(n.layer,!0),n.layer._latlng=n.newlatlng;this._needsRemoving=[],this._zoom=Math.round(this._map._zoom),this._currentShownBounds=this._getExpandedVisibleBounds(),this._map.on("zoomend",this._zoomEnd,this),this._map.on("moveend",this._moveEnd,this),this._spiderfierOnAdd&&this._spiderfierOnAdd(),this._bindEvents(),i=this._needsClustering,this._needsClustering=[],this.addLayers(i,!0)},onRemove:function(e){e.off("zoomend",this._zoomEnd,this),e.off("moveend",this._moveEnd,this),this._unbindEvents(),this._map._mapPane.className=this._map._mapPane.className.replace(" leaflet-cluster-anim",""),this._spiderfierOnRemove&&this._spiderfierOnRemove(),delete this._maxLat,this._hideCoverage(),this._featureGroup.remove(),this._nonPointGroup.remove(),this._featureGroup.clearLayers(),this._map=null},getVisibleParent:function(e){for(var t=e;t&&!t._icon;)t=t.__parent;return t||null},_arraySplice:function(e,t){for(var i=e.length-1;0<=i;i--)if(e[i]===t)return e.splice(i,1),!0},_removeFromGridUnclustered:function(e,t){for(var i=this._map,n=this._gridUnclustered,r=Math.floor(this._map.getMinZoom());r<=t&&n[t].removeObject(e,i.project(e.getLatLng(),t));t--);},_childMarkerDragStart:function(e){e.target.__dragStart=e.target._latlng},_childMarkerMoved:function(e){var t;this._ignoreMove||e.target.__dragStart||(t=e.target._popup&&e.target._popup.isOpen(),this._moveChild(e.target,e.oldLatLng,e.latlng),t&&e.target.openPopup())},_moveChild:function(e,t,i){e._latlng=t,this.removeLayer(e),e._latlng=i,this.addLayer(e)},_childMarkerDragEnd:function(e){var t=e.target.__dragStart;delete e.target.__dragStart,t&&this._moveChild(e.target,t,e.target._latlng)},_removeLayer:function(e,t,i){var n,r=this._gridClusters,s=this._gridUnclustered,o=this._featureGroup,a=this._map,h=Math.floor(this._map.getMinZoom()),l=(t&&this._removeFromGridUnclustered(e,this._maxZoom),e.__parent),u=l._markers;for(this._arraySplice(u,e);l&&(l._childCount--,l._boundsNeedUpdate=!0,!(l._zoom<h));)t&&l._childCount<=1?(n=l._markers[0]===e?l._markers[1]:l._markers[0],r[l._zoom].removeObject(l,a.project(l._cLatLng,l._zoom)),s[l._zoom].addObject(n,a.project(n.getLatLng(),l._zoom)),this._arraySplice(l.__parent._childClusters,l),l.__parent._markers.push(n),n.__parent=l.__parent,l._icon&&(o.removeLayer(l),i||o.addLayer(n))):l._iconNeedsUpdate=!0,l=l.__parent;delete e.__parent},_isOrIsParent:function(e,t){for(;t;){if(e===t)return!0;t=t.parentNode}return!1},fire:function(e,t,i){if(t&&t.layer instanceof L.MarkerCluster){if(t.originalEvent&&this._isOrIsParent(t.layer._icon,t.originalEvent.relatedTarget))return;e="cluster"+e}L.FeatureGroup.prototype.fire.call(this,e,t,i)},listens:function(e,t){return L.FeatureGroup.prototype.listens.call(this,e,t)||L.FeatureGroup.prototype.listens.call(this,"cluster"+e,t)},_defaultIconCreateFunction:function(e){var e=e.getChildCount(),t=" marker-cluster-";return t+=e<10?"small":e<100?"medium":"large",new L.DivIcon({html:"<div><span>"+e+' <span aria-label="markers"></span></span></div>',className:"marker-cluster"+t,iconSize:new L.Point(40,40)})},_bindEvents:function(){var e=this._map,t=this.options.spiderfyOnMaxZoom,i=this.options.showCoverageOnHover,n=this.options.zoomToBoundsOnClick,r=this.options.spiderfyOnEveryZoom;(t||n||r)&&this.on("clusterclick clusterkeypress",this._zoomOrSpiderfy,this),i&&(this.on("clustermouseover",this._showCoverage,this),this.on("clustermouseout",this._hideCoverage,this),e.on("zoomend",this._hideCoverage,this))},_zoomOrSpiderfy:function(e){var t=e.layer,i=t;if(!("clusterkeypress"===e.type&&e.originalEvent&&13!==e.originalEvent.keyCode||e.originalEvent.defaultPrevented)){for(;1===i._childClusters.length;)i=i._childClusters[0];i._zoom===this._maxZoom&&i._childCount===t._childCount&&this.options.spiderfyOnMaxZoom?t.spiderfy():this.options.zoomToBoundsOnClick&&t.zoomToBounds(),this.options.spiderfyOnEveryZoom&&t.spiderfy(),e.originalEvent&&13===e.originalEvent.keyCode&&this._map._container.focus()}},_showCoverage:function(e){var t=this._map;this._inZoomAnimation||(this._shownPolygon&&t.removeLayer(this._shownPolygon),2<e.layer.getChildCount()&&e.layer!==this._spiderfied&&(this._shownPolygon=new L.Polygon(e.layer.getConvexHull(),this.options.polygonOptions),t.addLayer(this._shownPolygon)))},_hideCoverage:function(){this._shownPolygon&&(this._map.removeLayer(this._shownPolygon),this._shownPolygon=null)},_unbindEvents:function(){var e=this.options.spiderfyOnMaxZoom,t=this.options.showCoverageOnHover,i=this.options.zoomToBoundsOnClick,n=this.options.spiderfyOnEveryZoom,r=this._map;(e||i||n)&&this.off("clusterclick clusterkeypress",this._zoomOrSpiderfy,this),t&&(this.off("clustermouseover",this._showCoverage,this),this.off("clustermouseout",this._hideCoverage,this),r.off("zoomend",this._hideCoverage,this))},_zoomEnd:function(){this._map&&(this._mergeSplitClusters(),this._zoom=Math.round(this._map._zoom),this._currentShownBounds=this._getExpandedVisibleBounds())},_moveEnd:function(){var e;this._inZoomAnimation||(e=this._getExpandedVisibleBounds(),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),this._zoom,e),this._topClusterLevel._recursivelyAddChildrenToMap(null,Math.round(this._map._zoom),e),this._currentShownBounds=e)},_generateInitialClusters:function(){var e=Math.ceil(this._map.getMaxZoom()),t=Math.floor(this._map.getMinZoom()),i=this.options.maxClusterRadius,n="function"!=typeof i?function(){return i}:i;if(null!==this.options.disableClusteringAtZoom&&(e=this.options.disableClusteringAtZoom-1),this._maxZoom=e,this._gridClusters={},this._gridUnclustered={},!isFinite(e))throw"Map has no maxZoom specified";if(!isFinite(t))throw"Map has no minZoom specified";for(var r=e;t<=r;r--)this._gridClusters[r]=new L.DistanceGrid(n(r)),this._gridUnclustered[r]=new L.DistanceGrid(n(r));this._topClusterLevel=new this._markerCluster(this,t-1)},_addLayer:function(e,t){var i=this._gridClusters,n=this._gridUnclustered,r=Math.floor(this._map.getMinZoom());for(this.options.singleMarkerMode&&this._overrideMarkerIcon(e),e.on(this._childMarkerEventHandlers,this);r<=t;t--){var s=this._map.project(e.getLatLng(),t),o=i[t].getNearObject(s);if(o)return o._addChild(e),void(e.__parent=o);if(o=n[t].getNearObject(s)){for(var a=o.__parent,h=(a&&this._removeLayer(o,!1),new this._markerCluster(this,t,o,e)),l=(i[t].addObject(h,this._map.project(h._cLatLng,t)),o.__parent=h,e.__parent=h),u=t-1;u>a._zoom;u--)l=new this._markerCluster(this,u,l),i[u].addObject(l,this._map.project(o.getLatLng(),u));return a._addChild(l),void this._removeFromGridUnclustered(o,t)}n[t].addObject(e,s)}this._topClusterLevel._addChild(e),e.__parent=this._topClusterLevel},_refreshClustersIcons:function(){this._featureGroup.eachLayer(function(e){e instanceof L.MarkerCluster&&e._iconNeedsUpdate&&e._updateIcon()})},_enqueue:function(e){this._queue.push(e),this._queueTimeout||(this._queueTimeout=setTimeout(L.bind(this._processQueue,this),300))},_processQueue:function(){for(var e=0;e<this._queue.length;e++)this._queue[e].call(this);this._queue.length=0,clearTimeout(this._queueTimeout),this._queueTimeout=null},_mergeSplitClusters:function(){var e=Math.round(this._map._zoom);this._processQueue(),this._zoom<e&&this._currentShownBounds.intersects(this._getExpandedVisibleBounds())?(this._animationStart(),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),this._zoom,this._getExpandedVisibleBounds()),this._animationZoomIn(this._zoom,e)):this._zoom>e?(this._animationStart(),this._animationZoomOut(this._zoom,e)):this._moveEnd()},_getExpandedVisibleBounds:function(){return this.options.removeOutsideVisibleBounds?L.Browser.mobile?this._checkBoundsMaxLat(this._map.getBounds()):this._checkBoundsMaxLat(this._map.getBounds().pad(1)):this._mapBoundsInfinite},_checkBoundsMaxLat:function(e){var t=this._maxLat;return void 0!==t&&(e.getNorth()>=t&&(e._northEast.lat=1/0),e.getSouth()<=-t)&&(e._southWest.lat=-1/0),e},_animationAddLayerNonAnimated:function(e,t){t===e?this._featureGroup.addLayer(e):2===t._childCount?(t._addToMap(),e=t.getAllChildMarkers(),this._featureGroup.removeLayer(e[0]),this._featureGroup.removeLayer(e[1])):t._updateIcon()},_extractNonGroupLayers:function(e,t){var i,n=e.getLayers(),r=0;for(t=t||[];r<n.length;r++)(i=n[r])instanceof L.LayerGroup?this._extractNonGroupLayers(i,t):t.push(i);return t},_overrideMarkerIcon:function(e){return e.options.icon=this.options.iconCreateFunction({getChildCount:function(){return 1},getAllChildMarkers:function(){return[e]}})}}),i=(L.MarkerClusterGroup.include({_mapBoundsInfinite:new L.LatLngBounds(new L.LatLng(-1/0,-1/0),new L.LatLng(1/0,1/0))}),L.MarkerClusterGroup.include({_noAnimation:{_animationStart:function(){},_animationZoomIn:function(e,t){this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),e),this._topClusterLevel._recursivelyAddChildrenToMap(null,t,this._getExpandedVisibleBounds()),this.fire("animationend")},_animationZoomOut:function(e,t){this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),e),this._topClusterLevel._recursivelyAddChildrenToMap(null,t,this._getExpandedVisibleBounds()),this.fire("animationend")},_animationAddLayer:function(e,t){this._animationAddLayerNonAnimated(e,t)}},_withAnimation:{_animationStart:function(){this._map._mapPane.className+=" leaflet-cluster-anim",this._inZoomAnimation++},_animationZoomIn:function(r,s){var o,a=this._getExpandedVisibleBounds(),h=this._featureGroup,e=Math.floor(this._map.getMinZoom());this._ignoreMove=!0,this._topClusterLevel._recursively(a,r,e,function(e){var t,i=e._latlng,n=e._markers;for(a.contains(i)||(i=null),e._isSingleParent()&&r+1===s?(h.removeLayer(e),e._recursivelyAddChildrenToMap(null,s,a)):(e.clusterHide(),e._recursivelyAddChildrenToMap(i,s,a)),o=n.length-1;0<=o;o--)t=n[o],a.contains(t._latlng)||h.removeLayer(t)}),this._forceLayout(),this._topClusterLevel._recursivelyBecomeVisible(a,s),h.eachLayer(function(e){e instanceof L.MarkerCluster||!e._icon||e.clusterShow()}),this._topClusterLevel._recursively(a,r,s,function(e){e._recursivelyRestoreChildPositions(s)}),this._ignoreMove=!1,this._enqueue(function(){this._topClusterLevel._recursively(a,r,e,function(e){h.removeLayer(e),e.clusterShow()}),this._animationEnd()})},_animationZoomOut:function(e,t){this._animationZoomOutSingle(this._topClusterLevel,e-1,t),this._topClusterLevel._recursivelyAddChildrenToMap(null,t,this._getExpandedVisibleBounds()),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),e,this._getExpandedVisibleBounds())},_animationAddLayer:function(e,t){var i=this,n=this._featureGroup;n.addLayer(e),t!==e&&(2<t._childCount?(t._updateIcon(),this._forceLayout(),this._animationStart(),e._setPos(this._map.latLngToLayerPoint(t.getLatLng())),e.clusterHide(),this._enqueue(function(){n.removeLayer(e),e.clusterShow(),i._animationEnd()})):(this._forceLayout(),i._animationStart(),i._animationZoomOutSingle(t,this._map.getMaxZoom(),this._zoom)))}},_animationZoomOutSingle:function(t,i,n){var r=this._getExpandedVisibleBounds(),s=Math.floor(this._map.getMinZoom()),o=(t._recursivelyAnimateChildrenInAndAddSelfToMap(r,s,i+1,n),this);this._forceLayout(),t._recursivelyBecomeVisible(r,n),this._enqueue(function(){var e;1===t._childCount?(e=t._markers[0],this._ignoreMove=!0,e.setLatLng(e.getLatLng()),this._ignoreMove=!1,e.clusterShow&&e.clusterShow()):t._recursively(r,n,s,function(e){e._recursivelyRemoveChildrenFromMap(r,s,i+1)}),o._animationEnd()})},_animationEnd:function(){this._map&&(this._map._mapPane.className=this._map._mapPane.className.replace(" leaflet-cluster-anim","")),this._inZoomAnimation--,this.fire("animationend")},_forceLayout:function(){L.Util.falseFn(document.body.offsetWidth)}}),L.markerClusterGroup=function(e){return new L.MarkerClusterGroup(e)},L.MarkerCluster=L.Marker.extend({options:L.Icon.prototype.options,initialize:function(e,t,i,n){L.Marker.prototype.initialize.call(this,i?i._cLatLng||i.getLatLng():new L.LatLng(0,0),{icon:this,pane:e.options.clusterPane}),this._group=e,this._zoom=t,this._markers=[],this._childClusters=[],this._childCount=0,this._iconNeedsUpdate=!0,this._boundsNeedUpdate=!0,this._bounds=new L.LatLngBounds,i&&this._addChild(i),n&&this._addChild(n)},getAllChildMarkers:function(e,t){e=e||[];for(var i=this._childClusters.length-1;0<=i;i--)this._childClusters[i].getAllChildMarkers(e,t);for(var n=this._markers.length-1;0<=n;n--)t&&this._markers[n].__dragStart||e.push(this._markers[n]);return e},getChildCount:function(){return this._childCount},zoomToBounds:function(e){for(var t=this._childClusters.slice(),i=this._group._map,n=i.getBoundsZoom(this._bounds),r=this._zoom+1,i=i.getZoom();0<t.length&&r<n;){r++;for(var s=[],o=0;o<t.length;o++)s=s.concat(t[o]._childClusters);t=s}r<n?this._group._map.setView(this._latlng,r):n<=i?this._group._map.setView(this._latlng,i+1):this._group._map.fitBounds(this._bounds,e)},getBounds:function(){var e=new L.LatLngBounds;return e.extend(this._bounds),e},_updateIcon:function(){this._iconNeedsUpdate=!0,this._icon&&this.setIcon(this)},createIcon:function(){return this._iconNeedsUpdate&&(this._iconObj=this._group.options.iconCreateFunction(this),this._iconNeedsUpdate=!1),this._iconObj.createIcon()},createShadow:function(){return this._iconObj.createShadow()},_addChild:function(e,t){this._iconNeedsUpdate=!0,this._boundsNeedUpdate=!0,this._setClusterCenter(e),e instanceof L.MarkerCluster?(t||(this._childClusters.push(e),e.__parent=this),this._childCount+=e._childCount):(t||this._markers.push(e),this._childCount++),this.__parent&&this.__parent._addChild(e,!0)},_setClusterCenter:function(e){this._cLatLng||(this._cLatLng=e._cLatLng||e._latlng)},_resetBounds:function(){var e=this._bounds;e._southWest&&(e._southWest.lat=1/0,e._southWest.lng=1/0),e._northEast&&(e._northEast.lat=-1/0,e._northEast.lng=-1/0)},_recalculateBounds:function(){var e,t,i,n=this._markers,r=this._childClusters,s=0,o=0,a=this._childCount;if(0!==a){for(this._resetBounds(),e=0;e<n.length;e++)t=n[e]._latlng,this._bounds.extend(t),s+=t.lat,o+=t.lng;for(e=0;e<r.length;e++)(i=r[e])._boundsNeedUpdate&&i._recalculateBounds(),this._bounds.extend(i._bounds),t=i._wLatLng,i=i._childCount,s+=t.lat*i,o+=t.lng*i;this._latlng=this._wLatLng=new L.LatLng(s/a,o/a),this._boundsNeedUpdate=!1}},_addToMap:function(e){e&&(this._backupLatlng=this._latlng,this.setLatLng(e)),this._group._featureGroup.addLayer(this)},_recursivelyAnimateChildrenIn:function(e,r,t){this._recursively(e,this._group._map.getMinZoom(),t-1,function(e){for(var t,i=e._markers,n=i.length-1;0<=n;n--)(t=i[n])._icon&&(t._setPos(r),t.clusterHide())},function(e){for(var t,i=e._childClusters,n=i.length-1;0<=n;n--)(t=i[n])._icon&&(t._setPos(r),t.clusterHide())})},_recursivelyAnimateChildrenInAndAddSelfToMap:function(t,i,n,r){this._recursively(t,r,i,function(e){e._recursivelyAnimateChildrenIn(t,e._group._map.latLngToLayerPoint(e.getLatLng()).round(),n),e._isSingleParent()&&n-1===r?(e.clusterShow(),e._recursivelyRemoveChildrenFromMap(t,i,n)):e.clusterHide(),e._addToMap()})},_recursivelyBecomeVisible:function(e,t){this._recursively(e,this._group._map.getMinZoom(),t,null,function(e){e.clusterShow()})},_recursivelyAddChildrenToMap:function(n,r,s){this._recursively(s,this._group._map.getMinZoom()-1,r,function(e){if(r!==e._zoom)for(var t=e._markers.length-1;0<=t;t--){var i=e._markers[t];s.contains(i._latlng)&&(n&&(i._backupLatlng=i.getLatLng(),i.setLatLng(n),i.clusterHide)&&i.clusterHide(),e._group._featureGroup.addLayer(i))}},function(e){e._addToMap(n)})},_recursivelyRestoreChildPositions:function(e){for(var t=this._markers.length-1;0<=t;t--){var i=this._markers[t];i._backupLatlng&&(i.setLatLng(i._backupLatlng),delete i._backupLatlng)}if(e-1===this._zoom)for(var n=this._childClusters.length-1;0<=n;n--)this._childClusters[n]._restorePosition();else for(var r=this._childClusters.length-1;0<=r;r--)this._childClusters[r]._recursivelyRestoreChildPositions(e)},_restorePosition:function(){this._backupLatlng&&(this.setLatLng(this._backupLatlng),delete this._backupLatlng)},_recursivelyRemoveChildrenFromMap:function(e,t,i,n){var r,s;this._recursively(e,t-1,i-1,function(e){for(s=e._markers.length-1;0<=s;s--)r=e._markers[s],n&&n.contains(r._latlng)||(e._group._featureGroup.removeLayer(r),r.clusterShow&&r.clusterShow())},function(e){for(s=e._childClusters.length-1;0<=s;s--)r=e._childClusters[s],n&&n.contains(r._latlng)||(e._group._featureGroup.removeLayer(r),r.clusterShow&&r.clusterShow())})},_recursively:function(e,t,i,n,r){var s,o,a=this._childClusters,h=this._zoom;if(t<=h&&(n&&n(this),r)&&h===i&&r(this),h<t||h<i)for(s=a.length-1;0<=s;s--)(o=a[s])._boundsNeedUpdate&&o._recalculateBounds(),e.intersects(o._bounds)&&o._recursively(e,t,i,n,r)},_isSingleParent:function(){return 0<this._childClusters.length&&this._childClusters[0]._childCount===this._childCount}}));L.Marker.include({clusterHide:function(){var e=this.options.opacity;return this.setOpacity(0),this.options.opacity=e,this},clusterShow:function(){return this.setOpacity(this.options.opacity)}}),L.DistanceGrid=function(e){this._cellSize=e,this._sqCellSize=e*e,this._grid={},this._objectPoint={}},L.DistanceGrid.prototype={addObject:function(e,t){var i=this._getCoord(t.x),n=this._getCoord(t.y),r=this._grid,r=r[n]=r[n]||{},n=r[i]=r[i]||[],r=L.Util.stamp(e);this._objectPoint[r]=t,n.push(e)},updateObject:function(e,t){this.removeObject(e),this.addObject(e,t)},removeObject:function(e,t){var i,n,r=this._getCoord(t.x),t=this._getCoord(t.y),s=this._grid,o=s[t]=s[t]||{},a=o[r]=o[r]||[];for(delete this._objectPoint[L.Util.stamp(e)],i=0,n=a.length;i<n;i++)if(a[i]===e)return a.splice(i,1),1===n&&delete o[r],!0},eachObject:function(e,t){var i,n,r,s,o,a,h=this._grid;for(i in h)for(n in o=h[i])for(r=0,s=(a=o[n]).length;r<s;r++)e.call(t,a[r])&&(r--,s--)},getNearObject:function(e){for(var t,i,n,r,s,o,a,h=this._getCoord(e.x),l=this._getCoord(e.y),u=this._objectPoint,_=this._sqCellSize,d=null,p=l-1;p<=l+1;p++)if(n=this._grid[p])for(t=h-1;t<=h+1;t++)if(r=n[t])for(i=0,s=r.length;i<s;i++)o=r[i],((a=this._sqDist(u[L.Util.stamp(o)],e))<_||a<=_&&null===d)&&(_=a,d=o);return d},_getCoord:function(e){var t=Math.floor(e/this._cellSize);return isFinite(t)?t:e},_sqDist:function(e,t){var i=t.x-e.x,t=t.y-e.y;return i*i+t*t}},L.QuickHull={getDistant:function(e,t){var i=t[1].lat-t[0].lat;return(t[0].lng-t[1].lng)*(e.lat-t[0].lat)+i*(e.lng-t[0].lng)},findMostDistantPointFromBaseLine:function(e,t){for(var i,n,r=0,s=null,o=[],a=t.length-1;0<=a;a--)i=t[a],0<(n=this.getDistant(i,e))&&(o.push(i),r<n)&&(r=n,s=i);return{maxPoint:s,newPoints:o}},buildConvexHull:function(e,t){var i=[],t=this.findMostDistantPointFromBaseLine(e,t);return t.maxPoint?(i=i.concat(this.buildConvexHull([e[0],t.maxPoint],t.newPoints))).concat(this.buildConvexHull([t.maxPoint,e[1]],t.newPoints)):[e[0]]},getConvexHull:function(e){for(var t=!1,i=!1,n=!1,r=!1,s=null,o=null,a=null,h=null,l=null,u=null,_=e.length-1;0<=_;_--){var d=e[_];(!1===t||d.lat>t)&&(t=(s=d).lat),(!1===i||d.lat<i)&&(i=(o=d).lat),(!1===n||d.lng>n)&&(n=(a=d).lng),(!1===r||d.lng<r)&&(r=(h=d).lng)}l=i!==t?(u=o,s):(u=h,a);return[].concat(this.buildConvexHull([u,l],e),this.buildConvexHull([l,u],e))}},L.MarkerCluster.include({getConvexHull:function(){for(var e,t=this.getAllChildMarkers(),i=[],n=t.length-1;0<=n;n--)e=t[n].getLatLng(),i.push(e);return L.QuickHull.getConvexHull(i)}}),L.MarkerCluster.include({_2PI:2*Math.PI,_circleFootSeparation:25,_circleStartAngle:0,_spiralFootSeparation:28,_spiralLengthStart:11,_spiralLengthFactor:5,_circleSpiralSwitchover:9,spiderfy:function(){var e,t;this._group._spiderfied===this||this._group._inZoomAnimation||(e=this.getAllChildMarkers(null,!0),t=this._group._map.latLngToLayerPoint(this._latlng),this._group._unspiderfy(),t=(this._group._spiderfied=this)._group.options.spiderfyShapePositions?this._group.options.spiderfyShapePositions(e.length,t):e.length>=this._circleSpiralSwitchover?this._generatePointsSpiral(e.length,t):(t.y+=10,this._generatePointsCircle(e.length,t)),this._animationSpiderfy(e,t))},unspiderfy:function(e){this._group._inZoomAnimation||(this._animationUnspiderfy(e),this._group._spiderfied=null)},_generatePointsCircle:function(e,t){var i,n,r=this._group.options.spiderfyDistanceMultiplier*this._circleFootSeparation*(2+e)/this._2PI,s=this._2PI/e,o=[],r=Math.max(r,35);for(o.length=e,i=0;i<e;i++)n=this._circleStartAngle+i*s,o[i]=new L.Point(t.x+r*Math.cos(n),t.y+r*Math.sin(n))._round();return o},_generatePointsSpiral:function(e,t){for(var i=this._group.options.spiderfyDistanceMultiplier,n=i*this._spiralLengthStart,r=i*this._spiralFootSeparation,s=i*this._spiralLengthFactor*this._2PI,o=0,a=[],h=a.length=e;0<=h;h--)h<e&&(a[h]=new L.Point(t.x+n*Math.cos(o),t.y+n*Math.sin(o))._round()),n+=s/(o+=r/n+5e-4*h);return a},_noanimationUnspiderfy:function(){var e,t,i=this._group,n=i._map,r=i._featureGroup,s=this.getAllChildMarkers(null,!0);for(i._ignoreMove=!0,this.setOpacity(1),t=s.length-1;0<=t;t--)e=s[t],r.removeLayer(e),e._preSpiderfyLatlng&&(e.setLatLng(e._preSpiderfyLatlng),delete e._preSpiderfyLatlng),e.setZIndexOffset&&e.setZIndexOffset(0),e._spiderLeg&&(n.removeLayer(e._spiderLeg),delete e._spiderLeg);i.fire("unspiderfied",{cluster:this,markers:s}),i._ignoreMove=!1,i._spiderfied=null}}),L.MarkerClusterNonAnimated=L.MarkerCluster.extend({_animationSpiderfy:function(e,t){var i,n,r,s,o=this._group,a=o._map,h=o._featureGroup,l=this._group.options.spiderLegPolylineOptions;for(o._ignoreMove=!0,i=0;i<e.length;i++)s=a.layerPointToLatLng(t[i]),n=e[i],r=new L.Polyline([this._latlng,s],l),a.addLayer(r),n._spiderLeg=r,n._preSpiderfyLatlng=n._latlng,n.setLatLng(s),n.setZIndexOffset&&n.setZIndexOffset(1e6),h.addLayer(n);this.setOpacity(.3),o._ignoreMove=!1,o.fire("spiderfied",{cluster:this,markers:e})},_animationUnspiderfy:function(){this._noanimationUnspiderfy()}}),L.MarkerCluster.include({_animationSpiderfy:function(e,t){var i,n,r,s,o,a,h=this,l=this._group,u=l._map,_=l._featureGroup,d=this._latlng,p=u.latLngToLayerPoint(d),c=L.Path.SVG,f=L.extend({},this._group.options.spiderLegPolylineOptions),m=f.opacity;for(void 0===m&&(m=L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity),c?(f.opacity=0,f.className=(f.className||"")+" leaflet-cluster-spider-leg"):f.opacity=m,l._ignoreMove=!0,i=0;i<e.length;i++)n=e[i],a=u.layerPointToLatLng(t[i]),r=new L.Polyline([d,a],f),u.addLayer(r),n._spiderLeg=r,c&&(o=(s=r._path).getTotalLength()+.1,s.style.strokeDasharray=o,s.style.strokeDashoffset=o),n.setZIndexOffset&&n.setZIndexOffset(1e6),n.clusterHide&&n.clusterHide(),_.addLayer(n),n._setPos&&n._setPos(p);for(l._forceLayout(),l._animationStart(),i=e.length-1;0<=i;i--)a=u.layerPointToLatLng(t[i]),(n=e[i])._preSpiderfyLatlng=n._latlng,n.setLatLng(a),n.clusterShow&&n.clusterShow(),c&&((s=(r=n._spiderLeg)._path).style.strokeDashoffset=0,r.setStyle({opacity:m}));this.setOpacity(.3),l._ignoreMove=!1,setTimeout(function(){l._animationEnd(),l.fire("spiderfied",{cluster:h,markers:e})},200)},_animationUnspiderfy:function(e){var t,i,n,r,s,o=this,a=this._group,h=a._map,l=a._featureGroup,u=e?h._latLngToNewLayerPoint(this._latlng,e.zoom,e.center):h.latLngToLayerPoint(this._latlng),_=this.getAllChildMarkers(null,!0),d=L.Path.SVG;for(a._ignoreMove=!0,a._animationStart(),this.setOpacity(1),i=_.length-1;0<=i;i--)(t=_[i])._preSpiderfyLatlng&&(t.closePopup(),t.setLatLng(t._preSpiderfyLatlng),delete t._preSpiderfyLatlng,s=!0,t._setPos&&(t._setPos(u),s=!1),t.clusterHide&&(t.clusterHide(),s=!1),s&&l.removeLayer(t),d)&&(r=(n=(s=t._spiderLeg)._path).getTotalLength()+.1,n.style.strokeDashoffset=r,s.setStyle({opacity:0}));a._ignoreMove=!1,setTimeout(function(){var e=0;for(i=_.length-1;0<=i;i--)(t=_[i])._spiderLeg&&e++;for(i=_.length-1;0<=i;i--)(t=_[i])._spiderLeg&&(t.clusterShow&&t.clusterShow(),t.setZIndexOffset&&t.setZIndexOffset(0),1<e&&l.removeLayer(t),h.removeLayer(t._spiderLeg),delete t._spiderLeg);a._animationEnd(),a.fire("unspiderfied",{cluster:o,markers:_})},200)}}),L.MarkerClusterGroup.include({_spiderfied:null,unspiderfy:function(){this._unspiderfy.apply(this,arguments)},_spiderfierOnAdd:function(){this._map.on("click",this._unspiderfyWrapper,this),this._map.options.zoomAnimation&&this._map.on("zoomstart",this._unspiderfyZoomStart,this),this._map.on("zoomend",this._noanimationUnspiderfy,this),L.Browser.touch||this._map.getRenderer(this)},_spiderfierOnRemove:function(){this._map.off("click",this._unspiderfyWrapper,this),this._map.off("zoomstart",this._unspiderfyZoomStart,this),this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._map.off("zoomend",this._noanimationUnspiderfy,this),this._noanimationUnspiderfy()},_unspiderfyZoomStart:function(){this._map&&this._map.on("zoomanim",this._unspiderfyZoomAnim,this)},_unspiderfyZoomAnim:function(e){L.DomUtil.hasClass(this._map._mapPane,"leaflet-touching")||(this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._unspiderfy(e))},_unspiderfyWrapper:function(){this._unspiderfy()},_unspiderfy:function(e){this._spiderfied&&this._spiderfied.unspiderfy(e)},_noanimationUnspiderfy:function(){this._spiderfied&&this._spiderfied._noanimationUnspiderfy()},_unspiderfyLayer:function(e){e._spiderLeg&&(this._featureGroup.removeLayer(e),e.clusterShow&&e.clusterShow(),e.setZIndexOffset&&e.setZIndexOffset(0),this._map.removeLayer(e._spiderLeg),delete e._spiderLeg)}}),L.MarkerClusterGroup.include({refreshClusters:function(e){return e?e instanceof L.MarkerClusterGroup?e=e._topClusterLevel.getAllChildMarkers():e instanceof L.LayerGroup?e=e._layers:e instanceof L.MarkerCluster?e=e.getAllChildMarkers():e instanceof L.Marker&&(e=[e]):e=this._topClusterLevel.getAllChildMarkers(),this._flagParentsIconsNeedUpdate(e),this._refreshClustersIcons(),this.options.singleMarkerMode&&this._refreshSingleMarkerModeMarkers(e),this},_flagParentsIconsNeedUpdate:function(e){var t,i;for(t in e)for(i=e[t].__parent;i;)i._iconNeedsUpdate=!0,i=i.__parent},_refreshSingleMarkerModeMarkers:function(e){var t,i;for(t in e)i=e[t],this.hasLayer(i)&&i.setIcon(this._overrideMarkerIcon(i))}}),L.Marker.include({refreshIconOptions:function(e,t){var i=this.options.icon;return L.setOptions(i,e),this.setIcon(i),t&&this.__parent&&this.__parent._group.refreshClusters(this),this}}),e.MarkerCluster=i,e.MarkerClusterGroup=t});
//# sourceMappingURL=leaflet.markercluster.js.map