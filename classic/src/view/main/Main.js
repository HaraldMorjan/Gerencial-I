/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Financiera.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'Financiera.view.main.MainController',
        'Financiera.view.main.MainModel',
        'Financiera.view.main.List'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [
        {
            title: 'Balance General',
            iconCls: 'fa fa-sliders',
            items: [
                {
                    xtpye: "panel",
                    layout: "hbox",
                    //height: Ext.getBody().getSize().height,
                    defaults: {
                        width: "50%",
                        frame: true,
                        layout: "fit",
                        xtype: "panel"
                    },
                    items: [
                        {
                            //height:700,
                            //height: 300,
                            title: "Balance General",
                            items: [
                                {
                                    xtype: "form",
                                    layout: "anchor",
                                    autoScroll: 'true',
                                    height: 700,
                                    bodyStyle: 'padding:10px 10px 0',
                                    defaults: {
                                        xtype: "fieldset",
                                        defaults: {
                                            anchor: "95%",
                                            allowBlank: false,
                                            xtype: "numberfield",
                                            hideTrigger: true,
                                            labelAlign: "right",
                                            labelWidth: 200
                                            //labelAlign: "top"
                                            // listeners:{
                                            //     change:"numberFieldChange"
                                            // }
                                        }
                                    },
                                    items: [
                                        {
                                            anchor: "100%",
                                            allowBlank: false,
                                            fieldLabel: "Periodo Finalizado",
                                            xtype: "datefield",
                                            labelAlign: "right",
                                            labelWidth: 200,
                                            name: "periodoFinalizado"
                                        },
                                        {
                                            title: "Activo Circulante",
                                            items: [
                                                {
                                                    fieldLabel: "Caja y Bancos",
                                                    name: "cajaBancos",
                                                    listeners: {
                                                        change: "activoCirculanteChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Inversiones a Corto Plazo",
                                                    name: "inversionesCortoPlazo",
                                                    listeners: {
                                                        change: "activoCirculanteChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Cuentas por Cobrar",
                                                    name: "cuentasPorCobrar",
                                                    listeners: {
                                                        change: "activoCirculanteChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Inventario",
                                                    name: "inventario",
                                                    listeners: {
                                                        change: "activoCirculanteChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Otro Activos",
                                                    name: "otroActivos",
                                                    listeners: {
                                                        change: "activoCirculanteChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Total Activo Circulante",
                                                    xtype: "displayfield",
                                                    reference: "totalActivoCirculante",
                                                    listeners: {
                                                        change: "utilidadBrutaChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Inversiones a Largo Plazo",
                                                    name: "inversionesLargoPlazo",
                                                    listeners: {
                                                        change: "activosChanage"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Maquinaria y Equipo",
                                                    name: "maquinariaEquipo",
                                                    listeners: {
                                                        change: "activosChanage"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Fondo de Comercio",
                                                    name: "fondoComercio",
                                                    listeners: {
                                                        change: "activosChanage"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Activos Intangibles",
                                                    name: "activosIntangibles",
                                                    listeners: {
                                                        change: "activosChanage"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Amortización Acumulada",
                                                    name: "amortizacionAcumulada",
                                                    listeners: {
                                                        change: "activosChanage"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Otro Activo",
                                                    name: "otroActivo",
                                                    listeners: {
                                                        change: "activosChanage"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Cargos Diferidos de Activo a Largo Plazo",
                                                    name: "cargosDiferidosActivoLargoPlazo",
                                                    listeners: {
                                                        change: "activosChanage"
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: "displayfield",
                                            fieldLabel: "Total Activos",
                                            reference: "totalActivos",
                                            anchor: "100%",
                                            labelAlign: "right",
                                            labelWidth: 200,
                                            listeners: {
                                                change: "utilidadBrutaChange"
                                            }
                                        },
                                        {
                                            title: "Pasivo Corriente",
                                            items: [
                                                {
                                                    fieldLabel: "Cuentas por Pagar",
                                                    name: "cuentasPagables",
                                                    listeners: {
                                                        change: "pasivoCorrienteChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Deudas a Largo Plazo",
                                                    name: "deudasLargoPlazo",
                                                    listeners: {
                                                        change: "pasivoCorrienteChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Otros Pasivos Corrientes",
                                                    name: "otrosPasivosCorrientes",
                                                    listeners: {
                                                        change: "pasivoCorrienteChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Total Pasivo Corriente",
                                                    xtype: "displayfield",
                                                    reference: "totalPasivoCorriente",
                                                    listeners: {
                                                        change: "utilidadBrutaChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Deuda a Largo Plazo",
                                                    name: "deudaLargoPlazo",
                                                    listeners: {
                                                        change: "pasivosChanage"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Otros Pasivos",
                                                    name: "otrosPasivos",
                                                    listeners: {
                                                        change: "pasivosChanage"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Cargos Diferidos de Pasivo a Largo Plazo",
                                                    name: "cargosDiferidosPasivoLargoPlazo",
                                                    listeners: {
                                                        change: "pasivosChanage"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Interés Minotario",
                                                    name: "interesMinotario",
                                                    listeners: {
                                                        change: "pasivosChanage"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Fondo Comercio Negtivo",
                                                    name: "fondoComercioNegativo",
                                                    listeners: {
                                                        change: "pasivosChanage"
                                                    }
                                                },

                                            ]
                                        },
                                        {
                                            xtype: "displayfield",
                                            fieldLabel: "Total Pasivos",
                                            reference: "totalPasivos",
                                            anchor: "100%",
                                            labelAlign: "right",
                                            labelWidth: 200,
                                            listeners: {
                                                change: "utilidadBrutaChange"
                                            }
                                        },
                                        {
                                            title: "Capital Social",
                                            items: [
                                                {
                                                    fieldLabel: "Garantias Reembolsables",
                                                    name: "garantiasReembolsables",
                                                    listeners: {
                                                        change: "capitalSocialChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Acción Preferente Redimible",
                                                    name: "accionPreferenteRedimible",
                                                    listeners: {
                                                        change: "capitalSocialChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Acciones Preferentes",
                                                    name: "accionesPreferentes",
                                                    listeners: {
                                                        change: "capitalSocialChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Acciones Ordinarias",
                                                    name: "accionesOrdinarias",
                                                    listeners: {
                                                        change: "capitalSocialChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Beneficios Retenidos",
                                                    name: "beneficiosRetenidos",
                                                    listeners: {
                                                        change: "capitalSocialChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Acciones Compradas",
                                                    name: "accionesCompradas",
                                                    listeners: {
                                                        change: "capitalSocialChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Excedente Capital",
                                                    name: "excedenteCapital",
                                                    listeners: {
                                                        change: "capitalSocialChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Otro Capital Social",
                                                    name: "otroCapitalSocial",
                                                    listeners: {
                                                        change: "capitalSocialChange"
                                                    }
                                                },

                                            ]
                                        },
                                        {
                                            xtype: "displayfield",
                                            fieldLabel: "Total Capital Social",
                                            reference: "totalCapitalSocial",
                                            anchor: "100%",
                                            labelAlign: "right",
                                            labelWidth: 200,
                                            listeners: {
                                                change: "utilidadBrutaChange"
                                            }
                                        },
                                        {
                                            xtype: "displayfield",
                                            fieldLabel: "Activos Tangibles Netos",
                                            reference: "activosTangiblesNetos",
                                            anchor: "100%",
                                            labelAlign: "right",
                                            labelWidth: 200,
                                            listeners: {
                                                change: "utilidadBrutaChange"
                                            }
                                        }
                                    ],
                                    buttons: [
                                        {
                                            text: "Generar",
                                            formBind: true,
                                            iconCls: "fa fa-gear",
                                            scale: 'medium',
                                            handler: "ingresarBalanceGenenalHandler"
                                        },
                                        // {
                                        //     text: "Generar",
                                        //     formBind: true,
                                        //     iconCls: "fa fa-gear",
                                        //     scale: 'medium',
                                        //     handler: "estadoDeResultadosHandler"
                                        // }
                                    ]
                                }
                            ]
                        },
                        {
                            title: "Balances ingresados",
                            xtype: "grid",
                            columns: [
                                {
                                    xtype: 'actioncolumn',
                                    width: 50,
                                    items: [{
                                        iconCls: 'fa fa-remove',
                                        tooltip: 'Borrar',
                                        handler: function (grid, rowIndex, colIndex) {
                                            var rec = grid.getStore().getAt(rowIndex);
                                            rec.drop();
                                            grid.getStore().sync();
                                        }
                                    }]
                                },
                                {
                                    text: "Periodo Finalizado",
                                    dataIndex: "periodoFinalizado",
                                    flex: 1
                                },
                                {
                                    text: "Total Activos",
                                    dataIndex: "totalActivos",
                                    flex: 1,
                                    renderer: "currencyColumnRenderer"
                                },
                                {
                                    text: "Total Pasivos",
                                    dataIndex: "totalPasivos",
                                    flex: 1,
                                    renderer: "currencyColumnRenderer"
                                },
                                {
                                    text: "Activos Tangibles Netos",
                                    dataIndex: "activosTangiblesNetos",
                                    flex: 1,
                                    renderer: "currencyColumnRenderer"
                                }
                            ],
                            bind: {
                                store: "{balanceStore}"
                            }
                        }
                    ]
                }
            ]
        },
        {
            title: 'Estado de Resultados',
            iconCls: 'fa fa-align-center',
            items: [
                {
                    xtpye: "panel",
                    layout: "hbox",
                    //height: Ext.getBody().getSize().height,
                    defaults: {
                        width: "50%",
                        frame: true,
                        layout: "fit",
                        xtype: "panel"
                    },
                    items: [
                        {
                            //height:700,
                            //height: 300,
                            title: "Estado de resultados",
                            items: [
                                {
                                    xtype: "form",
                                    layout: "anchor",
                                    autoScroll: 'true',
                                    height: 700,
                                    bodyStyle: 'padding:10px 10px 0',
                                    defaults: {
                                        xtype: "fieldset",

                                        defaults: {
                                            anchor: "95%",
                                            allowBlank: false,
                                            xtype: "numberfield",
                                            hideTrigger: true,
                                            labelAlign: "right",
                                            labelWidth: 200
                                            //labelAlign: "top"
                                            // listeners:{
                                            //     change:"numberFieldChange"
                                            // }
                                        }
                                    },
                                    items: [
                                        {
                                            anchor: "100%",
                                            allowBlank: false,
                                            fieldLabel: "Periodo Finalizado",
                                            xtype: "datefield",
                                            labelAlign: "right",
                                            labelWidth: 200,
                                            name: "periodoFinalizado"
                                        },
                                        {
                                            title: "Ingresos y Costos",
                                            items: [
                                                {
                                                    fieldLabel: "Total de ingresos",
                                                    name: "totalIngresos",
                                                    listeners: {
                                                        change: "costoIngresosChange"
                                                    }

                                                },
                                                {
                                                    fieldLabel: "Costo de ingresos",
                                                    name: "costoIngresos",
                                                    listeners: {
                                                        change: "costoIngresosChange"
                                                    }

                                                },
                                                {
                                                    xtype: "displayfield",
                                                    fieldLabel: "Utilidad Bruta",
                                                    name: "utilidadBruta",
                                                    reference: "utlidadBruta",
                                                    editable: false,
                                                    listeners: {
                                                        change: "utilidadBrutaChange"
                                                    }

                                                }
                                            ]
                                        },
                                        {
                                            title: "Gastos Operativos",
                                            items: [
                                                {
                                                    fieldLabel: "Desarrollo e Investigación",
                                                    name: "desarrolloInvestigacion",
                                                    listeners: {
                                                        change: "gastosOperativosChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Ventas Generales y Administrativas",
                                                    name: "ventasGeneralesAdministrativas",
                                                    listeners: {
                                                        change: "gastosOperativosChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "No Recurrente",
                                                    name: "noRecurrentes",
                                                    listeners: {
                                                        change: "gastosOperativosChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Otros",
                                                    name: "otrosGastosOperacion",
                                                    listeners: {
                                                        change: "gastosOperativosChange"
                                                    }
                                                },
                                                {
                                                    xtype: "displayfield",
                                                    fieldLabel: "Total Gastos Operacion",
                                                    name: "totalGastosOperacion",
                                                    style: "background-color:lightcoral",
                                                    hidden: true
                                                    // editable: false,
                                                    // listeners: {
                                                    //     change: "totalgastosOperacionChange"
                                                    // }

                                                }
                                            ]
                                        },
                                        {
                                            xtype: "displayfield",
                                            fieldLabel: "Beneficio o Pérdida de Explotación",
                                            name: "beneficioPerdidaExplotacion",
                                            reference: "beneficioPerdidaExplotacion",
                                            listeners: {
                                                change: "utilidadBrutaChange"
                                            },
                                            anchor: "100%",
                                            allowBlank: false,
                                            labelAlign: "right",
                                            labelWidth: 200

                                        },
                                        {
                                            title: "Ingreso por Operaciones Continuas",
                                            items: [
                                                {
                                                    fieldLabel: "Total otros ingresos/ Gastos netos",
                                                    name: "totalOtrosIngresosGastosNetos",
                                                    listeners: {
                                                        change: "totalOtrosIngresosGastosNetosChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Ganancia antes de interes e Impuestos",
                                                    name: "gananciaAntesInteresImpuestos",
                                                    editable: false,
                                                    disabled: true
                                                },
                                                {
                                                    fieldLabel: "Gastos de interes",
                                                    name: "gastosDeInteres",
                                                    listeners: {
                                                        change: "gastosDeInteresChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Ingreso antes de Impuestos",
                                                    name: "ingresoAntesImpuestos",
                                                    editable: false,
                                                    disabled: true,
                                                    listeners: {
                                                        change: "ingresoAntesImpuestosChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Impuesto a los Ingresos",
                                                    name: "impuestoALosIngersos",
                                                    listeners: {
                                                        change: "ingresoAntesImpuestosChange"
                                                    }
                                                },
                                                {
                                                    fieldLabel: "Interés Minoritario",
                                                    name: "interesMinoritario",
                                                    listeners: {
                                                        change: "ingresoAntesImpuestosChange"
                                                    }
                                                },
                                                {
                                                    xtype: "displayfield",
                                                    fieldLabel: "Ingresos Netos de Operaciones Continuas",
                                                    reference: "ingresosNetosDeOperacionContinuas",
                                                    listeners: {
                                                        change: "utilidadBrutaChange"
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            title: "Eventos no ocurrentes",
                                            items: [
                                                {
                                                    fieldLabel: "Operaciones descontinuadas",
                                                    name: "operacionesDescontinuadas",
                                                    //listeners
                                                },
                                                {
                                                    fieldLabel: "Elementos Extraordinarios",
                                                    name: "elementosExtraordinarios"
                                                },
                                                {
                                                    fieldLabel: "Efecto de cambios en la contabilidad",
                                                    name: "efectosCambiosContabilidad"
                                                },
                                                {
                                                    fieldLabel: "Otro elemento",
                                                    name: "operacionesContinuasOtroElemento"
                                                }
                                            ]
                                        },
                                        {
                                            fieldLabel: "Utilidad Neta",
                                            xtype: "displayfield",
                                            reference: "utilidadNeta",
                                            labelAlign: "right",
                                            labelWidth: 200,
                                            anchor: "100%",
                                            listeners: {
                                                change: "utilidadBrutaChange"
                                            }
                                        },
                                        {
                                            xtype: "numberfield",
                                            hideTrigger: true,
                                            labelAlign: "right",
                                            labelWidth: 200,
                                            anchor: "95%",
                                            allowBlank: false,
                                            fieldLabel: "Acciones Preferentes y Otros Ajustes",
                                            name: "accionesPreferentesOtrosAjustes",
                                            listeners: {
                                                change: "accionesPreferentesOtrosAjustesChange"
                                            }
                                        },
                                        {
                                            fieldLabel: "Ingreso Neto Aplicable a Acciones Ordinarias",
                                            xtype: "displayfield",
                                            anchor: "100%",
                                            allowBlank: false,
                                            labelAlign: "right",
                                            labelWidth: 200,
                                            reference: "ingresoNetoAplicableAccionesOrdinarias",
                                            listeners: {
                                                change: "utilidadBrutaChange"
                                            }
                                        }
                                    ],
                                    buttons: [
                                        {
                                            text: "Generar",
                                            formBind: true,
                                            iconCls: "fa fa-gear",
                                            scale: 'medium',
                                            handler: "ingresarEstadoResultadoHandler"
                                        },
                                        // {
                                        //     text: "Generar",
                                        //     formBind: true,
                                        //     iconCls: "fa fa-gear",
                                        //     scale: 'medium',
                                        //     handler: "estadoDeResultadosHandler"
                                        // }
                                    ]
                                }
                            ]
                        },
                        {
                            title: "Estados ingresados",
                            xtype: "grid",
                            columns: [
                                {
                                    text: "Periodo Finalizado",
                                    dataIndex: "periodoFinalizado",
                                    flex: 1
                                },
                                {
                                    text: "Beneficio Bruto",
                                    dataIndex: "beneficioBruto",
                                    flex: 1
                                },
                                {
                                    text: "Utilidad de Operación",
                                    dataIndex: "utilidadOperacion",
                                    flex: 1
                                },
                                {
                                    text: "Utilidad Neta",
                                    dataIndex: "utilidadNeta",
                                    flex: 1
                                },
                                {
                                    text: "Ingreso Neto Aplicable",
                                    dataIndex: "ingresoNetoAplicable",
                                    flex: 1
                                }
                            ],
                            bind: {
                                store: "{estadosStore}"
                            }
                        }
                    ]
                }
            ],
            bind: {
                //html: '{loremIpsum}'
            }
        },
        {
            title: 'Gráficas',
            iconCls: 'fa-bar-chart',
            bind: {
                disabled: "{!estadoExiste}"
            },
            // The following grid shares a store with the classic version's grid as well!
            // items: [{
            //     xtype: 'mainlist'
            // }]
            items: [
                {
                    xtype: "panel",
                    layout: "fit",
                    title: "Razones Financieras",
                    items: [
                        {
                            xtype: 'cartesian',
                            reference: 'razonesChart',
                            width: '100%',
                            height: 500,
                            // interactions: {
                            //     type: 'panzoom',
                            //     zoomOnPanGesture: true
                            // },
                            animation: {
                                duration: 200
                            },
                            bind: {
                                store: "{razonesStore}"
                            },
                            // store: {

                            // },
                            insetPadding: 40,
                            innerPadding: {
                                left: 40,
                                right: 40
                            },

                            axes: [{
                                type: 'numeric',
                                position: 'left',
                                grid: true,
                                minimum: 0,
                                maximum: 24,
                                //renderer: 'onAxisLabelRender'
                            }, {
                                type: 'category',
                                position: 'bottom',
                                grid: true,
                                label: {
                                    rotate: {
                                        degrees: -45
                                    }
                                }
                            }],
                            series: [{
                                type: 'line',
                                xField: 'razon',
                                yField: 'valor',
                                style: {
                                    lineWidth: 2
                                },
                                marker: {
                                    radius: 4,
                                    lineWidth: 2
                                },
                                label: {
                                    field: 'valor',
                                    display: 'over'
                                },
                                highlight: {
                                    fillStyle: '#000',
                                    radius: 5,
                                    lineWidth: 2,
                                    strokeStyle: '#fff'
                                },
                                tooltip: {
                                    trackMouse: true,
                                    showDelay: 0,
                                    dismissDelay: 0,
                                    hideDelay: 0,
                                    renderer: function (tooltip, record, item) {
                                        tooltip.setHtml(record.get('razon') + ': ' + record.get('valor'));
                                    },

                                    //renderer: 'onSeriesTooltipRender'
                                }
                            }],
                            // listeners: {
                            //     itemhighlightchange: 'onItemHighlightChange'
                            // }
                        }
                    ]
                }
            ]
        },
        {
            title: 'Posición de Crédito Neto',
            iconCls: 'fa fa-line-chart',
            bind: {
                disabled: "{!estadoExiste}",
                html: '{creditoNeto}'
            }
            // bind: {
            //     html: '{loremIpsum}'
            // }
        },
        // {
        //     title: 'Proyección Balance General',
        //     iconCls: 'fa-cog',
        //     bind: {
        //         html: '{loremIpsum}'
        //     }
        // },
        {
            title: 'Pólitica de Descuento Pronto Pago',
            iconCls: 'fa fa-money',
            bind: {
                disabled: "{!estadoExiste}",
            },
            items: [
                {
                    xtype: "fieldset",
                    title: "Ingrese los datos",
                    bodyStyle: 'padding:10px 10px 0',
                    items: [
                        {

                            xtype: "form",
                            layut: "anchor",
                            defaults: {
                                anchor: "95%",
                                allowBlank: false,
                                xtype: "numberfield",
                                hideTrigger: true,
                                labelAlign: "right",
                                labelWidth: 200

                            },
                            items: [
                                {
                                    fieldLabel: "Porcentaje de Descuento",
                                    name: "porcentajeDescuento"
                                },
                                {
                                    fieldLabel: "Días Crédito",
                                    name: "diasCredito"
                                },
                                {
                                    fieldLabel: "Periodo de Pago",
                                    name: "periodoPago"
                                },

                            ],
                            buttons: [
                                {
                                    text: "Calcular",
                                    formBind: true,
                                    iconCls: "fa fa-gear",
                                    scale: 'medium',
                                    handler: "prontoPagoHandler"
                                }
                            ]
                        }
                    ]
                },
                {
                    xtpye: "displayfield",
                    fieldLabel: "Tasa de Pronto Pago",
                    bind: {
                        html: "{prontoPago}"
                    }
                }
            ]
        },
        {
            title: 'Razones Financieras',
            iconCls: 'fa fa-institution',
            bind: {
                disabled: "{!estadoExiste}",
            },
            items: [
                {
                    xtype: "panel",
                    layout: "fit",
                    autoScroll: 'true',
                    height: 700,

                    items: [
                        {
                            xtype: "fieldset",
                            title: "Razones de Rentabilidad",
                            defaults: {
                                xtype: "displayfield",
                                // bind: {
                                //     html: "{lorem}"
                                // }
                            },
                            items: [
                                {
                                    bind: {
                                        html: "{margenUtilidad}"

                                    }
                                },
                                {
                                    bind: {
                                        html: "{rendimientosSobreActivos}"

                                    }
                                },
                                {
                                    bind: {
                                        html: "{rendimientosSobreCapitalContable}"
                                    }
                                }
                            ]
                        },
                        {
                            xtype: "fieldset",
                            title: "Razones de Utilización de los Activos",
                            defaults: {
                                xtype: "displayfield",
                                // bind: {
                                //     html: "{lorem}"
                                // }
                            },
                            items: [
                                {
                                    bind: {
                                        html: "{rotacionCuentasPorCobrar}"
                                    }
                                },
                                {
                                    bind: {
                                        html: "{periodoPromedioDeCobranza}"
                                    }
                                },
                                {
                                    bind: {
                                        html: "{rotacionDeInventarios}"
                                    }
                                },
                                {
                                    bind: {
                                        html: "{rotacionDeActivosFijos}"
                                    }
                                },
                                {
                                    bind: {
                                        html: "{rotacionDeActivosTotales}"
                                    }
                                }
                            ]
                        },
                        {
                            xtype: "fieldset",
                            title: "Razones de Liquidez",
                            defaults: {
                                xtype: "displayfield",
                                // bind: {
                                //     html: "{lorem}"
                                // }
                            },
                            items: [
                                {
                                    bind: {
                                        html: "{activosCirculantes}"
                                    }
                                },
                                {
                                    bind: {
                                        html: "{razonRapida}"
                                    }
                                }
                            ]
                        },
                        {
                            xtype: "fieldset",
                            title: "Razones de Utilización de Deudas",
                            defaults: {
                                xtype: "displayfield",
                                // bind: {
                                //     html: "{lorem}"
                                // }
                            },
                            items: [
                                {
                                    bind: {
                                        html: "{deudaActivosTotales}"
                                    }
                                },
                                {
                                    bind: {
                                        html: "{rotacionInteresGanado}"
                                    }
                                },
                                // {
                                //     bind:{
                                //         html:"{coberturaCargosFijos}"
                                //     }
                                // }
                            ]
                        }
                    ]
                }

            ]
        },
        {
            title: 'Apalancamiento',
            iconCls: 'fa fa-sellsy',
            hidden: true,
            items: [
                {
                    xtype: "fieldset",
                    layout: "anchor",
                    title: "Razón de apalancamiento",
                    height: 300,
                    width: 300,
                    defaults: {
                        anchor: "100%"
                    },
                    items: [
                        {
                            xtype: "form",
                            layout: "anchor",
                            defaults: {
                                xtype: "numberfield",
                                step: 0.1,
                                anchor: "100%"
                            },
                            items: [
                                {
                                    step: 1,
                                    fieldLabel: "Año",
                                    name: "anio",
                                    value: 2016

                                },
                                {
                                    fieldLabel: "Deuda total",
                                    name: "deudaTotal"
                                },
                                {
                                    fieldLabel: "Activo total",
                                    name: "activoTotal"
                                },
                                {
                                    fieldLabel: "Razón",
                                    xtype: "displayfield",
                                    style: "background-color:lightgreen",
                                    bind: {
                                        visible: "{apalancamiento}",
                                        value: "{valorApalancamiento}"
                                    }
                                }
                            ],
                            buttons: [
                                {
                                    //ui: "soft-green",
                                    text: "Calcular",
                                    handler: "apalancamientoHandler"
                                }
                            ]
                        }
                    ]
                }
            ],
            bind: {
                disabled: "{!estadoExiste}"
            }
        }
    ]
});
