var PAGE_SIZE = 15;
var TOKEN_KEY = 'lextracking-web-token';

var Imm = Imm || {};

(function (ng) {

    'use strict';

    ng.module('Imm', [
        'ngRoute',
        'ngSanitize',
        'ngMessages',
        'ui.router',
        'chart.js',
        'ngProgress',
        'ngDialog',
        'ui.select',
        'bw.paging',
        'jkuri.datepicker',
        'nsPopover',
        'highcharts-ng',
        'pascalprecht.translate',
        'ui.bootstrap',
        'ui.ace',
        'moment-picker',
        'textAngular',
        'angularTrix',
        'ckeditor',
        'as.sortable',
        'naif.base64',
        'mgo-angular-wizard',
        'ui.calendar',
        'toastr'
    ]).config(['$httpProvider', '$translateProvider', function ($httpProvider, $translateProvider) {

        $httpProvider.useApplyAsync(true);
        $translateProvider
            .useStaticFilesLoader({
                prefix: 'assets/languages/',
                suffix: '.json'
            })
            .preferredLanguage('es')
            .useMissingTranslationHandler('CustomTranslateErrorHandlerFactory');

        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

        $httpProvider.interceptors.push('myHttpInterceptor');

    }]).config(['momentPickerProvider', function (momentPickerProvider) {
        momentPickerProvider.options({
            /* Picker properties */
            locale: 'es',
            format: 'DD/MM/YYYY',
            minutesStep:   1
        });
    }]);

}(angular));