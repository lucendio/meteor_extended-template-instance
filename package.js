Package.describe({
    name: 'lucendio:extended-instance',
    summary: 'extends Template prototype with the ability to traverse template hierarchy up to a given template',
    version: '0.3.0',
    git: 'TODO',
    documentation: 'README.md'
});




Package.onUse(function( api ){

    api.versionsFrom('METEOR@1.2.1');


    api.use([
        'blaze-html-templates',

        'reactive-var',
        
        'ecmascript'
    ], 'client');


    api.addFiles([
        'client/lib/templateinstance.parentinstance.js',
        'client/lib/blaze.findinstance.js',
        'client/lib/templateinstance.replace.js',
        'client/lib/templateinstance.attachvars.js'
    ], 'client');

});




Package.onTest( function( api ){
    // TODO write some tests
});
