# html5-input-date-value-pollyfill


Allows you to set the value of `<input type="date" is="date-parse-value" value="hello world" value="12/1/2015">`

by default the browser will render.

![](http://i.imgur.com/oRmClG4.png)

It will render the desired value

![](http://i.imgur.com/K0EQDp2.png)

Click [here](https://rawgit.com/jebaird/html5-input-date-value-pollyfill/master/demo.html) to see it in action.


### Getting setup

Include `<script type="text/javascript" src="html5-input-date-value-pollyfill.js"></script>` on your page. And add the following script

    (function(){
         var dateInputs = document.querySelectorAll('[type=date]'),
            input,
            i = dateInputs.length;

        while ( i-- ){
            input = dateInputs[ i ];
            input.value = html5InputDateValueParse( input.getAttribute('value') )
        }
    })()

or, if your browser supports custom elements the following will work too

     <input type="date" is="date-parse-value" value="12/25/2000">

The function ` html5InputDateValueParse()` can be called at any time if you add an input after the dom as been loaded.