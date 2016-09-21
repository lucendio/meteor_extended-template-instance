
'use strict';



Blaze.findInstance = function( domSelector ){

    let domNode = null;

    if( typeof domSelector === 'string' ){
        domNode = document.querySelector( domSelector );
    }else if( domSelector instanceof Element ){
        domNode = domSelector;
    }else{
        throw new Error( 'domSelector has to be a string' );
    }

    if( domNode === null ){
        return null;
    }

    let view = Blaze.getView( domNode );
    return view.templateInstance();
};
