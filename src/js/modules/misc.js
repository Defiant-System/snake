
let Util = {
	rand( min, max ) {
		return m.random() * ( max - min ) + min;
	},
	randInt( min, max ) {
		return m.floor( m.random() * ( max - min + 1) ) + min;
	},
	isset( prop ) {
		return typeof prop != 'undefined';
	},
	log() {
		if( Util.isset( Util.config ) && Util.config.debug && window.console ){
			console.log( Array.prototype.slice.call( arguments ) );
		}
	},
};

// Math
Util.m = Math;
Util.mathProps = 'E LN10 LN2 LOG2E LOG10E PI SQRT1_2 SQRT2 abs acos asin atan ceil cos exp floor log round sin sqrt tan atan2 pow max min'.split( ' ' );
for ( var i = 0; i < Util.mathProps.length; i++ ) {
	Util[ Util.mathProps[ i ] ] = Util.m[ Util.mathProps[ i ] ];
}
Util.m.TWO_PI = Util.m.PI * 2;

