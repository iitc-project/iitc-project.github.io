// ==UserScript==
// @id             iitc-plugin-basemap-opencyclepam@jonatkins
// @name           IITC plugin: OpenCycleMap.org map tiles
// @category       Map Tiles
// @version        0.1.1.20161003.4740
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      https://static.iitc.me/build/release/plugins/basemap-opencyclemap.meta.js
// @downloadURL    https://static.iitc.me/build/release/plugins/basemap-opencyclemap.user.js
// @description    [iitc-2016-10-03-004740] Add the OpenCycleMap.org map tiles as an optional layer.
// @include        https://*.ingress.com/intel*
// @include        http://*.ingress.com/intel*
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @include        https://*.ingress.com/mission/*
// @include        http://*.ingress.com/mission/*
// @match          https://*.ingress.com/mission/*
// @match          http://*.ingress.com/mission/*
// @grant          none
// ==/UserScript==


function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

//PLUGIN AUTHORS: writing a plugin outside of the IITC build environment? if so, delete these lines!!
//(leaving them in place might break the 'About IITC' page or break update checks)
plugin_info.buildName = 'iitc';
plugin_info.dateTimeVersion = '20161003.4740';
plugin_info.pluginId = 'basemap-opencyclemap';
//END PLUGIN AUTHORS NOTE



// PLUGIN START ////////////////////////////////////////////////////////


// use own namespace for plugin
window.plugin.mapTileOpenCycleMap = function() {};

window.plugin.mapTileOpenCycleMap.addLayer = function() {

  //the Thunderforest (OpenCycleMap) tiles are free to use - http://www.thunderforest.com/terms/

  osmAttribution = 'Map data © OpenStreetMap';
  var ocmOpt = {attribution: 'Tiles © OpenCycleMap, '+osmAttribution, maxNativeZoom: 18, maxZoom: 21};
  var ocmCycle = new L.TileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', ocmOpt);
  var ocmTransport = new L.TileLayer('http://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png', ocmOpt);
  var ocmLandscape = new L.TileLayer('http://{s}.tile3.opencyclemap.org/landscape/{z}/{x}/{y}.png', ocmOpt);

  layerChooser.addBaseLayer(ocmCycle, "Thunderforest OpenCycleMap");
  layerChooser.addBaseLayer(ocmTransport, "Thunderforest Transport");
  layerChooser.addBaseLayer(ocmLandscape, "Thunderforest Landscape");
};

var setup =  window.plugin.mapTileOpenCycleMap.addLayer;

// PLUGIN END //////////////////////////////////////////////////////////


setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);


