
'use strict';


Blaze.TemplateInstance.prototype.helperVars = function reactiveVar( vars, initValue ){
    if( typeof vars !== 'object' ){
        if( typeof vars === 'string' && vars.trim().length > 0 ){
            vars = { [ vars ]: initValue };
        }else{
            throw new Error( 'name has to be a string or object literal' );
        }
    }
    
    const self = this;
    const { name, template } = self.view;
    const templateName = name.substr( name.indexOf( '.' ) + 1 );
    
    
    Object.keys( vars ).forEach(( varName )=>{
        const varInitValue = vars[ varName ];
        if( typeof varInitValue === 'function' ){
            throw new Error( `invalid initial value of: ${ varName }` );
        }
        
        if( typeof self[ varName ] !== 'undefined' ){
            return;
        }
        
        self[ varName ] = new ReactiveVar( varInitValue );
        
        
        if( template.__helpers.has( varName ) === true ){
            return;
        }
        
        template.helpers({
            [ varName ](){
                const instance = Template.instance();
                return instance[ varName ].get(); 
            } 
        });
    });
};
