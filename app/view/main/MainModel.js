/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Financiera.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: 'Modelo Financiero',

        loremIpsum: 'En proceso',
        lorem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper pellentesque arcu non rutrum. Etiam velit elit, sodales eget porta ac, convallis eu sem. Aenean sagittis rutrum consequat. Mauris erat nisi, ultrices ut ex ut, fermentum lacinia quam. Donec quis magna metus. Fusce neque ipsum, finibus vel magna non, mollis condimentum metus. Cras mattis metus eget mauris ultricies, sit amet condimentum leo laoreet. Quisque eget iaculis sapien, vitae maximus leo. Aliquam ultrices justo in euismod maximus. Nunc eleifend imperdiet nisi, quis cursus tellus placerat sed. Pellentesque iaculis non metus quis porttitor. Donec convallis a risus sed euismod.",
        apalancamiento: false,
        valorApalancamiento: 0.0,
        estadoExiste: false,
        balanceExiste: false
    },
    stores: {
        estadosStore: {

        },
        balanceStore: {},
        razonesStore: {}
    }

    //TODO - add data, formulas and/or methods to support your view
});
