/*!
 * jQuery SelectGo
 * Author: @jsweazy at @oxiem
 * Licensed under the MIT license
 */
(function($){
  $.fn.extend({ 
    selectGo: function(options) {
      //Set defaults all are optional
      var defaults = {
        newWindow: false, //set true to open items in new window. Popup will be blocked by most browsers.
        addWWW: true, // set false if you wont want to have it add www to all links
        secureLinks: false, //makes all links https:// instead of http://
        popupBlockedText: "The popup was blocked, please make an exception for this site in your popup blocker and try again"
      }
      
      var options =  $.extend(defaults, options);
            
      return this.each(function() {
        var o = options;
        var $el = $(this);
        $el.change(function(){
          var si = $el.val().toLowerCase();
          if (si != '') {
            //remove http or https if there
            si = si.replace(/http:\/\//i, "").replace(/https:\/\//i, "");
            //add www.
            if(o.addWWW) {
              si = si.replace(/www\./i, "");
              si = "www." + si;
            }
            //add http://
            if (o.secureLinks) {
              si = "https://" + si;
            } else {
              si = "http://" + si;
            }
            if(o.newWindow) {
              var pu = window.open(si, "_blank");
              if(pu == null || typeof(pu) == "undefined") {
                alert(o.popupBlockedText);
              }
            } else {
              window.location = si;
            }
          }
        });        
      });
    }
  });
})(jQuery);