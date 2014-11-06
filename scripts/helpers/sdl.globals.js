/**
 * @fileoverview This is global helper
 *
 * @author  Dmitry.Lukyanenko (dmitry.lukianenko@gmail.com)
 *
 * @preserve Copyright © 2013 All rights reserved.
 *
 */

;(function( helpers ) {

    /**
     * Check if current user browser is IE and version of it
     * @returns {Number} version of IE {false} if not IE
     */
    helpers.isIE = function() {
        var myNav = navigator.userAgent.toLowerCase();
        return ( myNav.indexOf( 'msie' ) != -1 ) ? parseInt( myNav.split( 'msie' )[1] ) : false;
    };

    /**
     * Check if number is positive integer
     * @param {string|number} str
     * @returns {boolean}
     */
    helpers.isInt = function( str ) {
        return /^\+?\d+$/.test( str );
    };

    /**
     * Generate random number
     * @param {string|number} range
     * @return {number} random number from 1 to range
     */
    helpers.random = function( range ) {
        return Math.floor( ( Math.random() * range ) + 1 );
    };

})( helpers );