
'use strict';



Blaze.TemplateInstance.prototype.replace = function( templateName, data ){

    let newTemplate;

    if( typeof templateName === 'string' ){
        newTemplate = Template[ templateName ];
    }else if( templateName instanceof Blaze.Template
                || templateName instanceof Blaze.View ){
        newTemplate = templateName;
    }else{
        throw new Error( 'templateName has to be String, Template or View' );
    }

    let $parent = this.firstNode.parentNode;

    let $first = this.firstNode;
    let $prev = $first.previousSibling;

    let $last = this.lastNode;
    let $next = $last.nextSibling;

    let view = this.view;
    let parentView = view.parentView;

    Blaze.remove( view );

    // NOTE: cleaning up the DOM, because of 'bug' in Blaze which seems to prevent it some how
    //       or doesnt do it by itself
    let $node = $first;
    while( $node !== $last ){
        let $current = $node;
        $node = $current.nextSibling;
        $current.remove();
    }
    $last.remove();


    if( typeof data === 'undefined' ){
        return Blaze.render( newTemplate, $parent, $next, parentView );
    }else{
        return Blaze.renderWithData( newTemplate, data, $parent, $next, parentView );
    }
};



if( typeof Blaze.replace !== 'undefined' ){
    console.warn( 'Blaze.replace already natively defined. Wont overwrite.' );
}else{

    Blaze.replace = function( originTemplateName, targetTemplateName, data ){

        let oldTemplate;

        if( typeof originTemplateName === 'string' ){
            oldTemplate = Template[ originTemplateName ];
        }else if( originTemplateName instanceof Blaze.Template
            || originTemplateName instanceof Blaze.View ){
            oldTemplate = originTemplateName;
        }else{
            throw new Error('templateName has to be String, Template or View');
        }

        return oldTemplate.replace( targetTemplateName, data );
    };

}
