/**
 * @fileoverview Initializer for grid module sdl.mod.grid.js
 *
 * @author  Dmitry.Lukyanenko (dmity.lukianenko@gmail.com)
 *
 * @preserve Copyright © 2013 All rights reserved.
 *
 */

;(function( sdl ) {
    document.addEventListener( 'DOMContentLoaded', function() {
        var selector = '.mod-grid';
        var $elements = document.querySelectorAll( selector );
        //go through all where we need grid module
        for ( var index = 0; index < $elements.length; index++ ){
            var target = $elements[ index ];
            //if it has been already initialized
            if ( target.getAttribute( 'data-mod-grid' ) ) {
                return;
            }
            var module = sdl.modules.grid( target );
            module.init();
            //save module instance in the data attribute
            target.setAttribute( 'data-mod-grid', module );
        }
    });
})( sdl );
