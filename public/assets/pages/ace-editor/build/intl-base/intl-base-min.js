/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("intl-base",function(b){var a=/[, ]/;b.mix(b.namespace("Intl"),{lookupBestLang:function(g,h){var f,j,c,e;function d(l){var k;for(k=0;k<h.length;k+=1){if(l.toLowerCase()===h[k].toLowerCase()){return h[k];}}}if(b.Lang.isString(g)){g=g.split(a);}for(f=0;f<g.length;f+=1){j=g[f];if(!j||j==="*"){continue;}while(j.length>0){c=d(j);if(c){return c;}else{e=j.lastIndexOf("-");if(e>=0){j=j.substring(0,e);if(e>=2&&j.charAt(e-2)==="-"){j=j.substring(0,e-2);}}else{break;}}}}return"";}});},"3.4.0",{requires:["yui-base"]});