
'use strict';


const INTERNAL_BLAZE_TEMPLATES = {
    'if': true,
    'Spacebars_if': true,
    'with': true,
    'Spacebars_with': true,
    'Spacebars.include': true,
    'Template.__dynamicWithDataContext': true,
    'Template.__dynamic': true
};



Blaze.TemplateInstance.prototype.parentInstance = function( templateName ){

    let view = this.view;

    if( typeof templateName === 'undefined' ){

        view = view.parentView;

        while( typeof INTERNAL_BLAZE_TEMPLATES[ view.name ] !== 'undefined' ){
            view = view.parentView;

            if( view.name === 'Template.body' ){
                break;
            }
        }

    }else if( typeof templateName === 'string' ){

        templateName = 'Template.' + templateName;

        while( view.name !== templateName ){
            view = view.parentView;

            if( view.name === 'Template.body' ){
                break;
            }
        }

    }else{
        throw new Error( 'templateName has to be a string' );
    }

    return view.templateInstance();
};
