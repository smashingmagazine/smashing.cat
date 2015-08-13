/* A wonderful script that makes IE 10 behave when it comes to viewport
scaling and snap-mode and what not */

// Yes, it is a check for the user-agent and this is bad but this is IE...
if( navigator.userAgent.match(/IEMobile\/10\.0/)) {

  // if you are an IE10 than you get an extra style-tag
  var msViewportStyle=document.createElement("style");

  // then add something specific to IE
  msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));

  // put it just before the ending head-tag
  document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
};

/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT / GPLv2 License.
*/
(function(w){

  // This fix addresses an iOS bug, so return early if the UA claims it's something else.
  var ua = navigator.userAgent;
  if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf( "AppleWebKit" ) > -1 ) ){
    return;
  }

  var doc = w.document;

  if( !doc.querySelector ){ return; }

  var meta = doc.querySelector( "meta[name=viewport]" ),
    initialContent = meta && meta.getAttribute( "content" ),
    disabledZoom = initialContent + ",maximum-scale=1",
    enabledZoom = initialContent + ",maximum-scale=10",
    enabled = true,
  x, y, z, aig;

  if( !meta ){ return; }

  function restoreZoom(){
    meta.setAttribute( "content", enabledZoom );
    enabled = true;
  }

  function disableZoom(){
    meta.setAttribute( "content", disabledZoom );
    enabled = false;
  }

  function checkTilt( e ){
    aig = e.accelerationIncludingGravity;
    x = Math.abs( aig.x );
    y = Math.abs( aig.y );
    z = Math.abs( aig.z );

    // If portrait orientation and in one of the danger zones
    if( (!w.orientation || w.orientation === 180) && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
      if( enabled ){
        disableZoom();
      }
    }
    else if( !enabled ){
      restoreZoom();
    }
  }

  w.addEventListener( "orientationchange", restoreZoom, false );
  w.addEventListener( "devicemotion", checkTilt, false );

})( this );