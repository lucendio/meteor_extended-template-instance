Extended Template Instance
============================

## Howto use:


### Discover template instance


#### traverse up to the root (aka. parent instance)

    const instance = Template.instance();
    const parentInstance = instance.parentInstance( 'myTemplateName' );


#### find by included DOM selector

    // @arg     domeNode: {String} or {DOM Element}
    // @return          {Blaze.TemplateInstance} or {null} 
    const instance = Blaze.findInstance( domNode );


__NOTE:__

1.  It might not be the case that the parent is the direct parent. It bubbles up until the
    given template is found
2.  If no template is found, it returns the instance of ``Template.body``



### Replace template instance


#### replaces a given template instance with a new template or view

    const templateName = 'myTemplateName';
    const data = {
        field: 'foo',
        bar: 345
    };
    
    // @arg     templateName:   {String}
    // @arg                     {Blaze.Template} or {Blaze.View}
    // @arg     data:   {anything}
    // @return  inserted {Blaze.TemplateInstance} of templateName
    instance.replace( templateName [, data ] );


#### replaces a given template (or view or template name) with a new template or view

    const originTemplateName = 'myFirstTemplate';
    const targetTemplateName = 'mySecondTemplate';
    const data = {
        field: 'foo',
        bar: 345
    };
    
    // @arg     originTemplateName:     {String}
    // @arg                             {Blaze.Template} or {Blaze.View}
    // @arg     targetTemplateName:     {String}
    // @arg                             {Blaze.Template} or {Blaze.View}
    // @arg     data:                   {anything}
    // @return  inserted {Blaze.TemplateInstance} of targetTemplateName
    Blaze.replace( originTemplateName, targetTemplateName [, data ] );



### Using ReactiveVars conveniently


#### setting ReactiveVars on template instance and defining simple getter helper

    const template = Template[ 'myComponent' ];
    
    template.onCreated( function(){
        const instance = this;
        
        instance.attachVars( 'state', 'enabled' );
        // OR
        instance.attachVars({
            title: 'ready'
            counter: 0
        });
    });
    
    template.events({
        'click button': function( e, instance ){
            const count = instance.counter.get();
            instance.counter.set( count += 1 );
        }
    });
    
    <template name="myComponent">
        <h1>{{ title }}</h1>
        <button data-state="{{ state }}">{{ counter }</button>
    </template>
    
    
    // @arg     vars    {String}
    // @arg             {Object} 
    // @arg     initValue   {anything but a function} (optional)
    instance.attachVars( vars [, initValue ] );
    
    
__NOTE:__
1.  the `instance.attachVars` should be used only in the `onCreated` callback
2.  already existing helpers or *ReactiveVars* on the current instance wont get
    overwritten, if they already exist
3.  If you want to have a more complex helper then just a getter, it is recommended 
    to do the steps hidden by this function manually rather and using this method
