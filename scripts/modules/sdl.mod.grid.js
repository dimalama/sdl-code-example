/**
 * @fileoverview This is grid module
 *
 * @author  Dmitry.Lukyanenko (dmitry.lukianenko@gmail.com)
 *
 * @preserve Copyright © 2013 All rights reserved.
 *
 */

;(function( sdl ) {
    /**
     * Grid module
     * @param {object} $container Module container
     * @returns {{init: Function}} The public function to initialize module
     */
    sdl.modules.grid = function( $container ) {

        /**
         * Module scope
         * @private
         * @type {{colorChangeInterval: number, colorChangeTime: number, amountColumns: number, amountRows: number}}
         */
        var _scope = {
            colorChangeInterval: 0,
            colorChangeTime: 0,
            amountColumns: 0,
            amountRows: 0
        };

        /**
         * Create grid
         * @private
         */
        function _createGrid() {
            /**
             * grid cell params
             * @type {{divWidth: number, divHeight: number, $div: object}}
             */
            var divWidth = Math.floor( window.innerWidth / _scope.amountColumns );
            var divHeight = Math.floor( window.innerHeight / _scope.amountRows );
            var $div = null;

            $container.innerHTML = '';
             if ( _scope.colorChangeInterval ) {
                 clearInterval( _scope.colorChangeInterval );
             }

            //fill out the module container with the divs which make structure of the grid
            for ( var column = 0; column < _scope.amountColumns; column++ ) {
                for ( var row = 0; row < _scope.amountRows; row++ ) {
                    $div = document.createElement( 'div' );
                    $div.style.width = divWidth + 'px';
                    $div.style.height = divHeight + 'px';
                    $div.style.backgroundColor = _generateColor();
                    $container.appendChild( $div );
                }
            }
            _updateColor();
        }

        /**
         * Generate random color
         * @returns {string} The hex representation of the color
         * @private
         */
        function _generateColor() {
            return '#' + ( ( 1 << 24 ) * Math.random() | 0 ).toString( 16 );
        }

        /**
         * Change a color the cells of the grid
         * @private
         */
        function _updateColor() {
            var $divs = $container.getElementsByTagName( 'div' );
            _scope.colorChangeInterval = setInterval(function() {
                for ( var index = 0; index < $divs.length; index++ ) {
                    $divs[ index ].style.backgroundColor = _generateColor();
                }
            }, _scope.colorChangeTime );
        }

        /**
         * Initialize module
         * @public
         */
        var init = function() {

            //we use this IE9 check to organize simple custom input fields validation
            //because IE9 doesn't have support of new HTML5 input fields types/attributes
            if ( helpers.isIE() == 9 ) {

                //check user's entered data
                function inputCheck() {
                    if ( !helpers.isInt( this.value ) ) {
                        this.value = '';
                    }
                }

                $container.querySelector( 'input[name="column"' ).addEventListener( 'focusout', inputCheck);
                $container.querySelector( 'input[name="row"' ).addEventListener( 'focusout', inputCheck);
                $container.querySelector( 'input[name="time"' ).addEventListener( 'focusout', inputCheck);
            }

            $container.querySelector( 'form' ).addEventListener( 'submit', function( evt ) {
                evt.preventDefault();

                //set values of input form fields to the module scope variables
                _scope.amountColumns = this.querySelector( 'input[name="column"]' ).value;
                _scope.amountRows = this.querySelector( 'input[name="row"]' ).value;
                _scope.colorChangeTime = this.querySelector( 'input[name="time"]' ).value;

                //check to see if we had value in the form's fields variables if no to set our default random one
                if ( !_scope.amountColumns ) {
                    _scope.amountColumns = helpers.random( 20 );
                }
                if ( !_scope.amountRows ) {
                    _scope.amountRows = helpers.random( 20 );
                }
                if ( !_scope.colorChangeTime ) {
                    _scope.colorChangeTime = 2000;
                }

                window.addEventListener( 'resize', function(){
                    _scope.amountColumns = helpers.random( 20 );
                    _scope.amountRows = helpers.random( 20 );
                    _createGrid();
                });

                _createGrid();

            });
        };

        return {
            init: init
        };
    };

})( sdl );

