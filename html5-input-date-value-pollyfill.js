/*
    html5 input date value pollyfill

    @author Jesse Baird<jebaird@gmail.com>

    allows you in markup use common date formats as the default value of date inputs

        <input type="date" value="12/25/1900">

    try to guess the format of the date turn it into the format that the date input understands
    
    valid format = 2015-05-11

    */
function html5InputDateValueParse( dateString ){

    var year, month, day,
        dateString = dateString
                    .replace( /[\/\.]/ig , '-' )
                    .split( '-' )
                    // pad with leading 0 for date format
                    .map( function( s ){

                        if( s.length == 1 ){
                            s = '0' + s;
                        }
                        
                        return s;
                    });


    // try to guess the year
    if ( dateString[ 0 ].length > 3 ){
        
        year = dateString.shift();

        // might be in this format yyyy-mm-dd


        if ( parseInt( dateString[ 0 ] ) > 12 ){
            // what we think is month is really the day
            day = dateString.pop();
            month = dateString.pop();
        }else {
            month = dateString.shift();
            day = dateString.pop();
        }


    }else {

        //  mm-dd-yyyy
        year =  dateString.pop();

        if ( parseInt( dateString[ 1 ] ) > 12 ){
            // what we think is month is really the day
            day = dateString.pop();
            month = dateString.pop();
        }else {
            month = dateString.shift();
            day = dateString.pop();
        }
    }

    return [ year, month, day ].join( '-' );

}
(function(){
    if ( !document.registerElement ) {
        return;
    }
        var _proto = Object.create( HTMLInputElement.prototype );

        _proto.createdCallback = function(){
            this.readAttributes();
        }

        _proto._parseDate = html5InputDateValueParse;

        _proto.readAttributes = function(){
            
            this.value = html5InputDateValueParse( this.getAttribute("value") );
        }

        _proto.attributeChangedCallback = function( attrName, oldVal, newVal ){

            if( /^(value)$/.test( attrName ) == false ){
                return;
            }

            this.readAttributes()

        }

        document.registerElement( 'date-parse-value', {

        prototype: _proto,
        extends: 'input'
    });

})();
