/*
 * Simple Metadata - jQuery plugin for parsing metadata from elements
 *
 * Copyright (c) 2009 Jared Grippe
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * inspired by Metadata http://docs.jquery.com/Plugins/Metadata
 *
 */
 
 /**
  * The first time you access the data store of an element simple metadata
  * imports any json found in the data attribute of the element
  *
  * example:
  *   <p id="user" data="{username: 'freakloser35'}">...</p>
  *   $('#user').data('username') == 'freakloser35';
  *
  * simple =)
  */
(function() {
  
  var jdata = jQuery.data, imported = [];
  
  function importData(elem, id){
    imported[id] = true;
    jQuery.cache[id] || (jQuery.cache[id] = {});
    var jelem = $(elem),
        data = jelem.attr('data'),
        cache = jQuery.cache[id];
        
    jelem.removeAttr('data');
    if (!data) return;
    
    try{
      data = eval('('+data+'); //importing data');
    }catch(e){
      var error = new SyntaxError("invalid json in data attribute");
      error.element = elem;
      error.json = data;
      throw error;
    }
    
    for (name in data)
      cache[name] = data[name];
  }

  jQuery.data = function(elem, name, data) {
    var id = jdata(elem);
    if (!imported[id]) importData(elem, id);
    return name ? jQuery.cache[ id ][ name ] : id;
  };

})();