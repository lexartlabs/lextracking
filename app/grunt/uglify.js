module.exports = {

    dev: {
        options: {
            mangle: false,
            compress: false,
            beautify: true
        },
        files: {
            'dist/app.js': [

                // modules
                'src/js/**/*.module.js',
                // services
                'src/js/**/*.service.js',
                // filters
                'src/js/**/*.filter.js',
                // directives
                'src/js/**/*.directive.js',
                // controller
                'src/js/**/*.controller.js',

                'src/js/**/restClient.js',

                // routing
                'src/**/routing.js'

            ]
        }

    },

    prod: {
        options: {
            mangle: false
        },
        files: {
            'dist/app.js': [

                // deps
                'bower_components/jquery/dist/jquery.min.js',
                'bower_components/angular/angular.js',
                'bower_components/angular-ui-router/release/angular-ui-router.js',
                'bower_components/angular-route/angular-route.js',
                'bower_components/angular-messages/angular-messages.js',
                'bower_components/angular-sanitize/angular-sanitize.js',
                'bower_components/angular-ui-select/dist/select.min.js',
                'bower_components/lodash/dist/lodash.min.js',
                'bower_components/moment/min/moment.min.js',
                'bower_components/ngprogress/build/ngprogress.min.js',
                'bower_components/ng-dialog/js/ngDialog.min.js',
                'bower_components/moment/locale/es.js',
                'bower_components/angular-translate/angular-translate.js',
                'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                'bower_components/angular-i18n/angular-locale_es-uy.js',
                'bower_components/ngDatepicker/src/js/ngDatepicker.js',
                'bower_components/underscore/underscore.js',
                'bower_components/angular-moment-picker/dist/angular-moment-picker.min.js',
                'bower_components/nsPopover/src/nsPopover.js',
                'bower_components/highcharts/highcharts.js',
                'bower_components/highcharts-ng/dist/highcharts-ng.js',
                'bower_components/angular-bootstrap/ui-bootstrap.tpls.js',
                'bower_components/ng-sortable/dist/ng-sortable.min.js',
                'bower_components/angular-wizard/dist/angular-wizard.min.js',

                'lib/dhtmlxgantt.js',
                
                // modules
                'src/js/**/*.module.js',
                // services
                'src/js/**/*.service.js',
                // filters
                'src/js/**/*.filter.js',
                // directives
                'src/js/**/*.directive.js',
                // controller
                'src/js/**/*.controller.js',

                'src/js/**/restClient.js',

                // routing
                'src/**/routing.js'


            ]
        }

    }


};
