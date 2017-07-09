/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Financiera.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },
    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },
    estadoDeResultadosHandler: function (btn) {
        var view = this.getView(),
            form = btn.up("form"),
            values = form.getValues();
        //console.log("values", values);
        view.getViewModel().set("estadoExiste", true);
    },
    costoIngresosChange: function (numberfield, newValue, oldValue, eOpts) {
        var form = numberfield.up("form").getForm(),
            values = form.getValues(),
            value = values.totalIngresos - values.costoIngresos;
        var utilidadBrutaField = form.findField("utilidadBruta");
        utilidadBrutaField.setValue(value);
        //debugger;
    },
    utilidadBrutaChange: function (numberField, newValue, oldValue, eOpts) {
        var value = newValue ? newValue.toString().replace("Q", "").replace(",", "") : 0;
        var stateColor = value >= 0 ? "lightgreen" : "lightcoral";
        numberField.setStyle('backgroundColor', stateColor);
    },
    gastosOperativosChange: function (numberField, newValue, oldValue, eOpts) {
        var form = numberField.up("form").getForm(),
            values = form.getValues(),
            value =
                (parseFloat(values.desarrolloInvestigacion) ? parseFloat(values.desarrolloInvestigacion) : 0) +
                (parseFloat(values.ventasGeneralesAdministrativas) ? parseFloat(values.ventasGeneralesAdministrativas) : 0) +
                (parseFloat(values.noRecurrentes) ? parseFloat(values.noRecurrentes) : 0) +
                (parseFloat(values.otrosGastosOperacion) ? parseFloat(values.otrosGastosOperacion) : 0);
        //debugger;
        var totalGastosOperacion = form.findField("totalGastosOperacion");
        var beneficioPerdidaExplotacion = form.findField("beneficioPerdidaExplotacion");
        //debugger;
        var beneficioPerdidaExplotacionValue = form.findField("utilidadBruta").getValue() - value;
        beneficioPerdidaExplotacion.setValue(beneficioPerdidaExplotacionValue);
        totalGastosOperacion.setValue(value);
        totalGastosOperacion.setVisible(true);
    },
    totalOtrosIngresosGastosNetosChange: function (numberField, newValue, oldValue, eOpts) {
        var view = this.getView(),
            form = numberField.up("form").getForm(),
            values = form.getValues(),
            value = newValue + parseFloat(view.lookupReference("beneficioPerdidaExplotacion").getValue());
        form.findField("gananciaAntesInteresImpuestos").setValue(value)

    },
    gastosDeInteresChange: function (numberField, newValue, oldValue, eOpts) {
        var view = this.getView(),
            form = numberField.up("form").getForm(),
            values = form.getValues(),
            value = parseFloat(form.findField("gananciaAntesInteresImpuestos").getValue()) - newValue;
        form.findField("ingresoAntesImpuestos").setValue(value)
    },
    ingresoAntesImpuestosChange: function (numberField, newValue, oldValue, eOpts) {
        var view = this.getView(),
            form = numberField.up("form").getForm(),
            values = form.getValues(),
            value = parseFloat(form.findField("ingresoAntesImpuestos").getValue()) - ((parseFloat(values.impuestoALosIngersos) ? parseFloat(values.impuestoALosIngersos) : 0) + (parseFloat(values.interesMinoritario) ? parseFloat(values.interesMinoritario) : 0));

        view.lookupReference("ingresosNetosDeOperacionContinuas").setValue(value);
        view.lookupReference("utilidadNeta").setValue(value);
    },
    accionesPreferentesOtrosAjustesChange: function (numberField, newValue, oldValue, eOpts) {
        var view = this.getView(),
            form = numberField.up("form").getForm(),
            values = form.getValues(),
            value = parseFloat(view.lookupReference("utilidadNeta").getValue()) - (values.accionesPreferentesOtrosAjustes);

        view.lookupReference("ingresoNetoAplicableAccionesOrdinarias").setValue(value);
    },
    numberFieldChange: function (numberfield, newValue, oldValaue, eOpts) {
        // debugger;
        // if (newValue) {
        //     var value = Ext.util.Format.currency(newValue, "Q", 2, false, " ");
        //     numberfield.setValue(value);
        // }
        //Ext.util.Format.currency(value,sign,decimals,end,currencySpacer)
    },
    ingresarEstadoResultadoHandler: function (btn) {
        var view = this.getView();
        var form = btn.up("form"),
            values = form.getValues(),
            totales = {
                periodoFinalizado: values.periodoFinalizado,
                beneficioBruto: view.lookupReference("utlidadBruta").getValue(),
                utilidadOperacion: view.lookupReference("beneficioPerdidaExplotacion").getValue(),
                utilidadNeta: view.lookupReference("utilidadNeta").getValue(),
                ingresoNetoAplicable: view.lookupReference("ingresoNetoAplicableAccionesOrdinarias").getValue(),
                formValues: values
            };
        //1
        var margen = parseFloat(view.lookupReference("utilidadNeta").getValue()) / parseFloat(values.ventasGeneralesAdministrativas);
        view.getViewModel().set("margenUtilidad", "<h1>El margen de utilidad es de: " + margen + "%</<h1>")

        var rendimientosSobreActivos = parseFloat(view.lookupReference("utilidadNeta").getValue()) / parseFloat(view.lookupReference("totalActivos").getValue().replace("Q", "").replace(",", ""));
        view.getViewModel().set("rendimientosSobreActivos", "<h1>El rendimiento sobre activo es de: " + rendimientosSobreActivos + "</<h1>")

        var rendimientosSobreCapitalContable = parseFloat(view.lookupReference("utilidadNeta").getValue()) / parseFloat(view.lookupReference("beneficioPerdidaExplotacion").getValue());
        view.getViewModel().set("rendimientosSobreCapitalContable", "<h1>El rendimiento sobre capital contable es de: " + rendimientosSobreCapitalContable + "</<h1>")
        //debugger;
        //2
        var rotacionCuentasPorCobrar = parseFloat(values.ventasGeneralesAdministrativas) / parseFloat(values.cuentasPorCobrar);
        view.getViewModel().set("rotacionCuentasPorCobrar", "<h1>la rotación de Cuentas por Cobrar es de: " + rotacionCuentasPorCobrar + "</<h1>");

        var periodoPromedioDeCobranza = parseFloat(values.cuentasPorCobrar) / (parseFloat(values.ventasGeneralesAdministrativas) / 365);
        view.getViewModel().set("periodoPromedioDeCobranza", "<h1>El periodo promedio de cobranza es de: " + periodoPromedioDeCobranza + " dias</<h1>");

        var rotacionDeInventarios = parseFloat(values.ventasGeneralesAdministrativas) / parseFloat(values.inventario);
        view.getViewModel().set("rotacionDeInventarios", "<h1>La rotación de inventarios es de: " + rotacionDeInventarios + "</<h1>");

        var rotacionDeActivosFijos = parseFloat(values.ventasGeneralesAdministrativas) / parseFloat(view.lookupReference("totalActivoCirculante").getValue().replace("Q", "").replace(",", ""));
        view.getViewModel().set("rotacionDeActivosFijos", "<h1>La rotación de Activos Fijos es de: " + rotacionDeActivosFijos + "</<h1>");

        var rotacionDeActivosTotales = parseFloat(values.ventasGeneralesAdministrativas) / parseFloat(view.lookupReference("totalActivos").getValue().replace("Q", "").replace(",", ""));
        view.getViewModel().set("rotacionDeActivosTotales", "<h1>La rotación de Activos Fijos es de: " + rotacionDeActivosTotales + "</<h1>");

        //3
        var activosCirculantes = parseFloat(view.lookupReference("totalActivos").getValue().replace("Q", "").replace(",", "")) / parseFloat(view.lookupReference("totalPasivos").getValue().replace("Q", "").replace(",", ""));
        view.getViewModel().set("activosCirculantes", "<h1>La razón circulante es de: " + activosCirculantes + "</<h1>");

        var razonRapida = (parseFloat(view.lookupReference("totalActivos").getValue().replace("Q", "").replace(",", "")) - values.inventario) / parseFloat(view.lookupReference("totalPasivos").getValue().replace("Q", "").replace(",", ""));
        view.getViewModel().set("razonRapida", "<h1>La razón circulante es de: " + razonRapida + "</<h1>");

        //4
        var deudaActivosTotales = parseFloat(values.deudaTotal) / parseFloat(values.activoTotal);
        view.getViewModel().set("deudaActivosTotales", "<h1>La Deuda a Activos Totales es de: " + deudaActivosTotales + "</<h1>");

        var rotacionInteresGanado = parseFloat(values.gananciaAntesInteresImpuestos) / parseFloat(values.gastosDeInteres);
        view.getViewModel().set("rotacionInteresGanado", "<h1>Rotación del Interes Ganado es de: " + rotacionInteresGanado + "</<h1>");

        view.getViewModel().get("razonesStore").add([
            {
                razon:"Margen Utilidad",
                valor:margen
            },
            {
                razon:"Rendimiento sobre Activo",
                valor:rendimientosSobreActivos
            },
            {
                razon:"Rendimiento sobre Capital",
                valor:rendimientosSobreCapitalContable
            },
            {
                razon:"Rotación Cuentas por Cobrar",
                valor:rotacionCuentasPorCobrar
            },
            {
                razon:"Periodo Promedio Cobranza",
                valor:periodoPromedioDeCobranza
            },
            {
                razon:"Rotación de Inventarion",
                valor:rotacionDeInventarios
            },
            {
                razon:"Rotación de Activos Fijos",
                valor:rotacionDeActivosFijos
            },
            {
                razon:"Rotación Activos Totales",
                valor:rotacionDeActivosTotales
            },
            {
                razon:"Activos Circulantes",
                valor:activosCirculantes
            },
            {
                razon:"Razón Rápida",
                valor:razonRapida
            },
            {
                razon:"Deuda Activos Totales",
                valor:deudaActivosTotales
            },
            {
                razon:"Rotación Interes Ganado",
                valor:rotacionInteresGanado
            }
        ]);
        // var coberturaCargosFijos = (parseFloat(values.gananciaAntesInteresImpuestos)+parseFloat()) / parseFloat(values.gastosDeInteres);
        // view.getViewModel().set("coberturaCargosFijos", "<h1>Rotación del Interes Ganado es de: " + coberturaCargosFijos + "</<h1>");

        view.getViewModel().get("estadosStore").add(totales);
        view.getViewModel().get("estadosStore").sync();
        var view = this.getView(),
            form = btn.up("form"),
            values = form.getValues();
        //console.log("values", values);
        view.getViewModel().set("estadoExiste", true);
        //form.reset();
    },
    ingresarBalanceGenenalHandler: function (btn) {
        var view = this.getView();
        var form = btn.up("form"),
            values = form.getValues(),
            totales = {
                periodoFinalizado: values.periodoFinalizado,
                totalActivos: view.lookupReference("totalActivos").getValue().replace("Q", "").replace(",", ""),
                totalPasivos: view.lookupReference("totalPasivos").getValue().replace("Q", "").replace(",", ""),
                activosTangiblesNetos: view.lookupReference("activosTangiblesNetos").getValue().replace("Q", "").replace(",", ""),
                formValues: values
            };
        var posiscionPositiva = values.cuentasPorCobrar > values.cuentasPagables,
            creditoNetoText = "<h1>La posición de crédito neto es";
        if (posiscionPositiva) {
            creditoNetoText = creditoNetoText + ' <span style="background-color:lightgreen">POSITIVA</span>, ya que las cuentas por cobrar son mayores que las cuentas por pagar';
        } else {
            creditoNetoText = creditoNetoText + ' <span style="background-color:lightcoral">NEGATIVA </span>, ya que las cuentas por cobrar son menores que las cuentas por pagar';
        }
        creditoNetoText = creditoNetoText + "</h1>"
        view.getViewModel().set("creditoNeto", creditoNetoText);
        //view.getViewModel().set("balanceExiste", true);
        view.getViewModel().get("balanceStore").add(totales);
        view.getViewModel().get("balanceStore").sync();
        //form.reset();
    },
    currencyColumnRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = value >= 0 ? "lightgreen" : "lightcoral";
        metaData.tdStyle = "background-color:" + color
        return Ext.util.Format.currency(value, "Q", 2, false);
    },
    activoCirculanteChange: function (numberField, newValue, oldValue, eOpts) {
        var view = this.getView(),
            form = numberField.up("form").getForm(),
            values = form.getValues(),
            value =
                (values.cajaBancos ? parseFloat(values.cajaBancos) : 0) +
                (values.inversionesCortoPlazo ? parseFloat(values.inversionesCortoPlazo) : 0) +
                (values.cuentasPorCobrar ? parseFloat(values.cuentasPorCobrar) : 0) +
                (values.inventario ? parseFloat(values.inventario) : 0) +
                (values.otroActivos ? parseFloat(values.otroActivos) : 0)
            ;
        view.lookupReference("totalActivoCirculante").setValue(Ext.util.Format.currency(value, "Q", 2, false));
    },
    activosChanage: function (numberField, newValue, oldValue, eOPts) {
        var view = this.getView(),
            form = numberField.up("form").getForm(),
            values = form.getValues(),
            value =
                (view.lookupReference("totalActivoCirculante").getValue() ? parseFloat(view.lookupReference("totalActivoCirculante").getValue().replace("Q", "").replace(",", "")) : 0) +
                (values.inversionesLargoPlazo ? parseFloat(values.inversionesLargoPlazo) : 0) +
                (values.maquinariaEquipo ? parseFloat(values.maquinariaEquipo) : 0) +
                (values.fondoComercio ? parseFloat(values.fondoComercio) : 0) +
                (values.activosIntangibles ? parseFloat(values.activosIntangibles) : 0) +
                (values.amortizacionAcumulada ? parseFloat(values.amortizacionAcumulada) : 0) +
                (values.otroActivo ? parseFloat(values.otroActivo) : 0) +
                (values.cargosDiferidosActivoLargoPlazo ? parseFloat(values.cargosDiferidosActivoLargoPlazo) : 0)
            ;
        //debugger;
        view.lookupReference("totalActivos").setValue(Ext.util.Format.currency(value, "Q", 2, false));
    },
    pasivoCorrienteChange: function (numberField, newValue, oldValue, eoPts) {
        var view = this.getView(),
            form = numberField.up("form").getForm(),
            values = form.getValues(),
            value =
                (values.cuentasPagables ? parseFloat(values.cuentasPagables) : 0) +
                (values.deudasLargoPlazo ? parseFloat(values.deudasLargoPlazo) : 0) +
                (values.otrosPasivosCorrientes ? parseFloat(values.otrosPasivosCorrientes) : 0)
            ;
        view.lookupReference("totalPasivoCorriente").setValue(Ext.util.Format.currency(value, "Q", 2, false));
    },
    pasivosChanage: function (numberField, newValue, oldValue, eOpts) {
        var view = this.getView(),
            form = numberField.up("form").getForm(),
            values = form.getValues(),
            value =
                (view.lookupReference("totalPasivoCorriente").getValue() ? parseFloat(view.lookupReference("totalPasivoCorriente").getValue().replace("Q", "").replace(",", "")) : 0) +
                (values.deudaLargoPlazo ? parseFloat(values.deudaLargoPlazo) : 0) +
                (values.otrosPasivos ? parseFloat(values.otrosPasivos) : 0) +
                (values.cargosDiferidosPasivoLargoPlazo ? parseFloat(values.cargosDiferidosPasivoLargoPlazo) : 0) +
                (values.interesMinotario ? parseFloat(values.interesMinotario) : 0) +
                (values.fondoComercioNegativo ? parseFloat(values.fondoComercioNegativo) : 0)
            ;
        view.lookupReference("totalPasivos").setValue(Ext.util.Format.currency(value, "Q", 2, false));
    },
    capitalSocialChange: function (numberField, newValue, oldValue, eOpts) {
        var view = this.getView(),
            form = numberField.up("form").getForm(),
            values = form.getValues(),
            value =
                (values.garantiasReembolsables ? parseFloat(values.garantiasReembolsables) : 0) +
                (values.accionPreferenteRedimible ? parseFloat(values.accionPreferenteRedimible) : 0) +
                (values.accionesPreferentes ? parseFloat(values.accionesPreferentes) : 0) +
                (values.accionesOrdinarias ? parseFloat(values.accionesOrdinarias) : 0) +
                (values.beneficiosRetenidos ? parseFloat(values.beneficiosRetenidos) : 0) -
                (values.accionesCompradas ? parseFloat(values.accionesCompradas) : 0) -
                (values.excedenteCapital ? parseFloat(values.excedenteCapital) : 0) -
                (values.otroCapitalSocial ? parseFloat(values.otroCapitalSocial) : 0)
            ;
        var activoNetoValue = view.lookupReference("totalActivos").getValue() ? parseFloat(view.lookupReference("totalActivos").getValue().replace("Q", "").replace(",", "")) - parseFloat(view.lookupReference("totalPasivos").getValue().replace("Q", "").replace(",", "")) : 0;
        view.lookupReference("totalCapitalSocial").setValue(Ext.util.Format.currency(value, "Q", 2, false));
        view.lookupReference("activosTangiblesNetos").setValue(Ext.util.Format.currency(activoNetoValue, "Q", 2, false));

    },
    prontoPagoHandler: function (btn) {
        var form = btn.up("form"),
            view = this.getView(),
            values = form.getValues(),
            value = (values.porcentajeDescuento / (.1 - values.porcentajeDescuento)) * (360 / (values.diasCredito - values.periodoPago));
        view.getViewModel().set("prontoPago", "<h1> Tasa de: " + value + "%</h1>");

    },
    apalancamientoHandler: function (btn) {
        var view = this.getView(),
            form = btn.up("form"),
            values = form.getValues(),
            razon = values.deudaTotal / values.activoTotal;
        view.getViewModel().set("apalancamiento", true);
        view.getViewModel().set("valorApalancamiento", (razon * 100).toFixed(2) + "%");
    }
});
