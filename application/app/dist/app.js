var PAGE_SIZE = 15;

var TOKEN_KEY = "lextracking-web-token";

var LexTracking = LexTracking || {};

(function(ng) {
    "use strict";
    ng.module("LexTracking", [ "ngRoute", "ngSanitize", "ngMessages", "ui.router", "chart.js", "ngProgress", "ngDialog", "ui.select", "bw.paging", "jkuri.datepicker", "nsPopover", "highcharts-ng", "pascalprecht.translate", "ui.bootstrap", "ui.ace", "moment-picker", "textAngular", "angularTrix", "ckeditor", "as.sortable", "naif.base64", "mgo-angular-wizard", "ui.calendar", "toastr" ]).config([ "$httpProvider", "$translateProvider", function($httpProvider, $translateProvider) {
        $httpProvider.useApplyAsync(true);
        $translateProvider.useStaticFilesLoader({
            prefix: "assets/languages/",
            suffix: ".json"
        }).preferredLanguage("es").useMissingTranslationHandler("CustomTranslateErrorHandlerFactory");
        $translateProvider.useSanitizeValueStrategy("sanitizeParameters");
        $httpProvider.interceptors.push("myHttpInterceptor");
    } ]).config([ "momentPickerProvider", function(momentPickerProvider) {
        momentPickerProvider.options({
            locale: "es",
            format: "DD/MM/YYYY",
            minutesStep: 1
        });
    } ]).config(function(toastrConfig) {
        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: "toast-container",
            maxOpened: 0,
            newestOnTop: true,
            positionClass: "toast-bottom-center",
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: "body",
            timeOut: 1e7,
            closeButton: true,
            extendedTimeOut: 1e7,
            tapToDismiss: true,
            toastClass: "toast"
        });
    });
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("BotsServices", [ "RestClient", function(RestClient) {
        var model = "bots";
        var factory = {
            find: function(page, q, cb) {
                RestClient.get("bots/all", function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findById: function(id, cb) {
                RestClient.get(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findAll: function(page, q, cb) {
                RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
                    cb(err, result);
                });
            },
            save: function(obj, cb) {
                if (obj.id) {
                    RestClient.post(model + "/update", obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model + "/new", obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            remove: function(id, cb) {
                RestClient.delete(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("EasywebsServices", [ "RestClient", function(RestClient) {
        var model = "apps/easy-web";
        var factory = {
            find: function(page, q, cb) {
                RestClient.get("apps/easy-web/all", function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findById: function(id, cb) {
                RestClient.get(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findAll: function(page, q, cb) {
                RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
                    cb(err, result);
                });
            },
            save: function(obj, cb) {
                if (obj.id) {
                    RestClient.post(model + "/update", obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model + "/new", obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            remove: function(id, cb) {
                RestClient.delete(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("HostingServices", [ "RestClient", function(RestClient) {
        var model = "hosting";
        var factory = {
            find: function(page, q, cb) {
                RestClient.get(model + "/all", function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findById: function(id, cb) {
                RestClient.get(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findAll: function(page, q, cb) {
                RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
                    cb(err, result);
                });
            },
            save: function(obj, cb) {
                if (obj.id) {
                    RestClient.put(model + "/update", obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model + "/new", obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            remove: function(id, cb) {
                RestClient.post(model + "/delete", id, function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("MailSenderServices", [ "RestClient", function(RestClient) {
        var model = "mailsender";
        var factory = {
            find: function(page, q, cb) {
                RestClient.get("mailsender/all", function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findById: function(id, cb) {
                RestClient.get(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findAll: function(page, q, cb) {
                RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
                    cb(err, result);
                });
            },
            save: function(obj, cb) {
                if (obj.id) {
                    RestClient.post(model + "/update", obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model + "/new", obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            remove: function(id, cb) {
                RestClient.delete(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("MinSoftwaresServices", [ "RestClient", function(RestClient) {
        var model = "minSoftwares";
        var factory = {
            find: function(page, q, cb) {
                RestClient.get("minSoftwares/all", function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findById: function(id, cb) {
                RestClient.get(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findAll: function(page, q, cb) {
                RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
                    cb(err, result);
                });
            },
            save: function(obj, cb) {
                if (obj.id) {
                    RestClient.post(model + "/update", obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model + "/new", obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            remove: function(id, cb) {
                RestClient.delete(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("ProductServices", [ "RestClient", function(RestClient) {
        var model = "product";
        var factory = {
            find: function(page, q, cb) {
                RestClient.get("products/all", function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findById: function(id, cb) {
                RestClient.get(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findAll: function(page, q, cb) {
                RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
                    cb(err, result);
                });
            },
            save: function(obj, cb) {
                if (obj.id) {
                    RestClient.post(model + "/update", obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model + "/new", obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            remove: function(id, cb) {
                RestClient.delete(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("SmartHouseServices", [ "RestClient", function(RestClient) {
        var model = "smarthouse";
        var factory = {
            find: function(page, q, cb) {
                RestClient.get("smarthouse/all", function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findById: function(id, cb) {
                RestClient.get(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findAll: function(page, q, cb) {
                RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
                    cb(err, result);
                });
            },
            save: function(obj, cb) {
                if (obj.id) {
                    RestClient.post(model + "/update", obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model + "/new", obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            remove: function(id, cb) {
                RestClient.delete(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("BankServices", [ "RestClient", function(RestClient) {
        var model = "banks";
        var factory = {
            find: function(page, q, cb) {
                RestClient.get("banks/all", function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findById: function(id, cb) {
                RestClient.get(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findAll: function(page, q, cb) {
                RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
                    cb(err, result);
                });
            },
            save: function(obj, cb) {
                if (obj.id) {
                    RestClient.post(model + "/update", obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model + "/new", obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            remove: function(id, cb) {
                RestClient.delete(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("BillServices", [ "RestClient", function(RestClient) {
        var model = "bill";
        var factory = {
            find: function(page, q, cb) {
                RestClient.get("bills/all", function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findById: function(id, cb) {
                RestClient.get(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findAll: function(page, q, cb) {
                RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
                    cb(err, result);
                });
            },
            save: function(obj, cb) {
                if (obj.id) {
                    RestClient.post(model + "/update", obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model + "/new", obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            remove: function(id, cb) {
                RestClient.delete(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("BudgetServices", [ "RestClient", function(RestClient) {
        var model = "budget";
        var factory = {
            find: function(page, q, cb) {
                RestClient.get("budgets/all", function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findById: function(id, cb) {
                RestClient.get(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findAll: function(page, q, cb) {
                RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
                    cb(err, result);
                });
            },
            findByMonth: function(page, q, cb) {
                RestClient.get(model + "/all/by-date/" + q, function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findByUserMonth: function(page, q, cb) {
                RestClient.get(model + "/all/by-user-date/" + q, function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            allStatus: function(cb) {
                RestClient.get("budgets/status/all", function(err, result) {
                    cb(err, result);
                });
            },
            allConcepts: function(cb) {
                RestClient.get("budgets/concept/all", function(err, result) {
                    cb(err, result);
                });
            },
            save: function(obj, cb) {
                if (obj.id) {
                    RestClient.post(model + "/update", obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model + "/new", obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            remove: function(id, cb) {
                RestClient.delete(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("CalendarServices", [ "RestClient", function(RestClient) {
        var model = "user";
        var USER_ID = window.localStorage.getItem("userId");
        var factory = {
            getUserEvents: function(id, cb) {
                var authUserId = window.localStorage.userId;
                var path = authUserId == id ? "/current/hours" : "/" + id + "/hours";
                RestClient.get(model + path, function(err, result) {
                    cb(err, result);
                });
            },
            getUserExceptions: function(id, fecha, cb) {
                var authUserId = window.localStorage.userId;
                var path = authUserId == id ? "/current/exceptions/" : "/" + id + "/exceptions/";
                RestClient.get(model + path + fecha, function(err, result) {
                    cb(err, result);
                });
            },
            postUserEvents: function(obj, cb) {
                RestClient.post(model + "/fixeds/" + USER_ID, obj, function(err, result) {
                    cb(err, result);
                });
            },
            postUserExceptions: function(obj, id, fecha, cb) {
                RestClient.post(model + "/exceptions" + "/" + id + "/" + fecha, obj, function(err, result) {
                    cb(err, result);
                });
            },
            removeEvents: function(obj, cb) {
                RestClient.delete(model + "/delete-fixed-hours/" + obj.id, obj, function(err, result) {
                    cb(err, result);
                });
            },
            getTrackedHours: function(id, fecha, cb) {
                var authUserId = window.localStorage.userId;
                var path = authUserId == id ? "tracks/user/current" : "tracks/user/" + id;
                RestClient.get(path + "/calendar/" + fecha, function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("ClientServices", [ "RestClient", function(RestClient) {
        var model = "clients";
        var factory = {
            find: function(page, q, cb) {
                var user = window.localStorage;
                var role = user.userRole;
                var path = role == "developer" ? "current" : "all";
                RestClient.get(model + "/" + path, function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findById: function(id, cb) {
                RestClient.get(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findAll: function(page, q, cb) {
                RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
                    cb(err, result);
                });
            },
            save: function(obj, cb) {
                if (obj.id) {
                    RestClient.put(model + "/update/" + obj.id, obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model + "/new", obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            remove: function(id, cb) {
                RestClient.delete(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("EvaluateServices", [ "RestClient", function(RestClient) {
        var model = "evaluate";
        var factory = {
            save: function(obj, cb) {
                if (obj.id) {
                    RestClient.post(model + "/update", obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model + "/new", obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            find: function(id, cb) {
                RestClient.get(model + "/user/" + id, function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("FinanceServices", [ "RestClient", function(RestClient) {
        var model = "finance";
        var factory = {
            find: function(page, q, cb) {
                RestClient.get("finances/all", function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findByMonth: function(page, q, cb) {
                RestClient.get("finances/all/date/" + q, function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findById: function(id, cb) {
                RestClient.get(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            allStatus: function(cb) {
                RestClient.get("finances/status/all", function(err, result) {
                    cb(err, result);
                });
            },
            allTypes: function(cb) {
                RestClient.get("finances/types/all", function(err, result) {
                    cb(err, result);
                });
            },
            allConcepts: function(cb) {
                RestClient.get("finances/concepts/all", function(err, result) {
                    cb(err, result);
                });
            },
            findAll: function(page, q, cb) {
                RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
                    cb(err, result);
                });
            },
            save: function(obj, cb) {
                if (obj.id) {
                    RestClient.post(model + "/update", obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model + "/new", obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            remove: function(id, cb) {
                RestClient.delete(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("HourCostServices", [ "RestClient", function(RestClient) {
        var model = "hour/cost";
        var factory = {
            find: function(page, q, cb) {
                RestClient.get("hours/cost/all", function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findById: function(id, cb) {
                RestClient.get(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findAll: function(page, q, cb) {
                RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
                    cb(err, result);
                });
            },
            save: function(obj, cb) {
                if (obj.id) {
                    RestClient.post(model + "/update", obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model + "/new", obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            remove: function(id, cb) {
                RestClient.delete(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("ProjectsServices", [ "RestClient", function(RestClient) {
        var model = "projects";
        var factory = {
            find: function(page, q, cb) {
                RestClient.get(model + "/all", function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findById: function(id, cb) {
                RestClient.get(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findAll: function(page, q, cb) {
                RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
                    cb(err, result);
                });
            },
            getProjectTasks: function(idProject, cb) {
                RestClient.get(model + "/tasks/project/" + idProject, function(err, result) {
                    cb(err, result);
                });
            },
            getProjectsByClient: function(idClient, cb) {
                RestClient.get(model + "/client/" + idClient, function(err, result) {
                    cb(err, result);
                });
            },
            getProjectsByUser: function(idUser, cb) {
                RestClient.get(model + "/task/dev/" + idUser, function(err, result) {
                    cb(err, result);
                });
            },
            getProjectTasksbyUser: function(idProject, idUser, cb) {
                RestClient.get(model + "/task/" + idProject + "/" + idUser, function(err, result) {
                    cb(err, result);
                });
            },
            getProjectsByDev: function(idUser, cb) {
                RestClient.get(model + "/task/dev/" + idUser, function(err, result) {
                    cb(err, result);
                });
            },
            saveProjectTask: function(obj, cb) {
                obj.idProject = Number(obj.idProject);
                console.log(obj);
                if (obj.users && obj.users.length) {
                    if (!obj.users[0].idUser) {
                        obj.users = JSON.parse(obj.users);
                    }
                }
                obj.status = !obj.status ? "To-do" : obj.status;
                if (obj.id) {
                    RestClient.put(model + "/tasks/update", obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model + "/tasks/new", obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            save: function(obj, cb) {
                if (obj.id) {
                    console.log("OBJ SAVE UPDATE", obj);
                    RestClient.put(model + "/update", obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model + "/new", obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            remove: function(id, cb) {
                RestClient.delete(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            deleteTask: function(id, cb) {
                RestClient.delete(model + "/delete-task/" + id, function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("SaleServices", [ "RestClient", function(RestClient) {
        var model = "sales";
        var factory = {
            find: function(page, q, cb) {
                RestClient.get("sales/all", function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findByMonth: function(page, q, cb) {
                RestClient.get("sales/all/by-date/" + q, function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findByUserMonth: function(page, q, id, cb) {
                RestClient.get("sales/all/by-date/" + q + "/" + id, function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findById: function(id, cb) {
                RestClient.get(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            allTypes: function(cb) {
                RestClient.get("sales/types", function(err, result) {
                    cb(err, result);
                });
            },
            allConcepts: function(cb) {
                RestClient.get("sales/concepts", function(err, result) {
                    cb(err, result);
                });
            },
            findAll: function(page, q, cb) {
                RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
                    cb(err, result);
                });
            },
            save: function(obj, cb) {
                if (obj.id) {
                    RestClient.put(model + "/update", obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model + "/new", obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            remove: function(id, cb) {
                RestClient.delete(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            getAllClientBudgets: function(q, cb) {
                RestClient.get("sales/budgets/by-date/" + q, function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("JiraServices", [ "RestClient", function(RestClient) {
        var model = "jira";
        var factory = {
            getAllDashboardsCloud: function(obj, cb) {
                RestClient.post(model + "/all-dashboards", obj, function(err, result) {
                    console.log("result boards", result, err);
                    cb(err, result);
                });
            },
            getIssuesByBoardCloud: function(obj, cb) {
                RestClient.post(model + "/dashboard-issues", obj, function(err, result) {
                    cb(err, result);
                });
            },
            saveDashboard: function(obj, cb) {
                RestClient.post(model + "/save-dashboards", obj, function(err, result) {
                    cb(err, result);
                });
            },
            getIssueById: function(obj, cb) {
                RestClient.post(model + "/issue", obj, function(err, task, comment) {
                    cb(err, task, comment);
                });
            },
            addComment: function(obj, cb) {
                RestClient.post(model + "/add-comment", obj, function(err, result) {
                    cb(err, result);
                });
            },
            save: function(obj, cb) {
                if (obj.task.id) {
                    RestClient.post(model + "/update-issue", obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model + "/save-issue", obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            delete: function(obj, cb) {
                RestClient.post(model + "/delete-issues", obj, function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("tasks_automaticServices", [ "RestClient", function(RestClient) {
        var model = "taskAutomatic";
        var factory = {
            find: function(page, q, cb) {
                RestClient.get(model + "/all", function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findById: function(id, cb) {
                RestClient.get(model + "/" + id, function(err, result) {
                    cb(err, result[0]);
                });
            },
            findByIdClient: function(id, cb) {
                RestClient.get(model + "/id-client/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findByIdUser: function(id, cb) {
                RestClient.get(model + "/id-user/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findAll: function(page, q, cb) {
                RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
                    cb(err, result);
                });
            },
            save: function(obj, cb) {
                if (obj.id) {
                    RestClient.put(model + "/" + obj.id, obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model, obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            remove: function(id, cb) {
                RestClient.get(model + "/delete/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            saveTask_Automatic: function(obj, cb) {
                if (obj.id) {
                    RestClient.post(model + "/update/" + obj.id, obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model + "/new", obj, function(err, result) {
                        cb(err, result);
                    });
                }
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("TasksServices", [ "RestClient", function(RestClient) {
        var model = "projects/tasks";
        var factory = {
            find: function(page, q, cb) {
                RestClient.get(model + "/all", function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findByFilter: function(obj, cb) {
                RestClient.post(model + "/all", obj, function(err, result) {
                    console.log("result", result, err);
                    var countItems = result.count;
                    cb(err, result.task, countItems);
                });
            },
            findById: function(id, cb) {
                RestClient.get(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findByIdClient: function(id, cb) {
                RestClient.get(model + "/id-client/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findByIdUser: function(id, obj, cb) {
                RestClient.post(model + "/user/current", obj, function(err, result) {
                    var countItems = result.count;
                    cb(err, result.task, countItems);
                });
            },
            findByUserEval: function(id, cb) {
                RestClient.get(model + "/user-eval/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findAll: function(page, q, cb) {
                RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
                    cb(err, result);
                });
            },
            save: function(obj, cb) {
                console.log("Update Status::", obj);
                if (obj.id) {
                    console.log("Update Status::", obj);
                    RestClient.post(model + "/" + obj.id, obj, function(err, result) {
                        console.log("Update Status::", err, result);
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model, obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            remove: function(id, cb) {
                RestClient.get(model + "/delete/" + id, function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("tasks_trelloServices", [ "RestClient", function(RestClient) {
        var model = "projects/tasks/trello";
        var key = "2f132aeb2a02c90e0966cbcfd9f45329";
        var token = "c9e22df4e936322b7949cc9b98c0e972f8991099f8bbb5733e70956abcd06ff4";
        var factory = {
            find: function(page, q, cb) {
                RestClient.get(model + "/all", function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findById: function(id, cb) {
                RestClient.get(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findByIdCard: function(page, q, cb) {
                RestClient.get(model + "/allOld", function(err, result, countItems) {
                    cb(err, result);
                });
            },
            findByIdClient: function(id, cb) {
                RestClient.get(model + "/id-client/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findByIdUser: function(id, cb) {
                RestClient.get(model + "/id-user/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findAll: function(page, q, cb) {
                RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
                    cb(err, result);
                });
            },
            save: function(obj, cb) {
                if (obj.id) {
                    RestClient.put(model + "/" + obj.id, obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model, obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            remove: function(id, cb) {
                RestClient.get(model + "/remove-trello-task/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            deleteBoardTrello: function(id, cb) {
                RestClient.get(model + "/remove-board/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            saveTask_trello: function(obj, cb) {
                if (obj.id) {
                    RestClient.post(model + "/update", obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model + "/new", obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            saveTaskTrello: function(obj, cb) {
                RestClient.post(model + "/newOld", obj, function(err, result) {
                    cb(err, result);
                });
            },
            getCards: function(obj, cb) {
                var data = null;
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = JSON.parse(this.responseText);
                        cb(resp);
                    }
                });
                xhr.open("GET", "https://api.trello.com/1/cards/" + obj + "?attachments=false&attachment_fields=all&members=false&membersVoted=false&checkItemStates=false&checklists=none&checklist_fields=all&board=false&list=false&pluginData=false&stickers=false&sticker_fields=all&customFieldItems=false&key=" + key + "&token=" + token);
                xhr.send(data);
            },
            getBoardsId: function(obj, cb) {
                var data = null;
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = JSON.parse(this.responseText);
                        cb(resp);
                    }
                });
                xhr.open("GET", "https://api.trello.com/1/boards/" + obj + "/cards/?limit=1000&fields=name&members=true&member_fields=fullName&key=" + key + "&token=" + token);
                xhr.send(data);
            },
            getLists: function(obj, cb) {
                var data = null;
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = JSON.parse(this.responseText);
                        cb(resp);
                    }
                });
                xhr.open("GET", "https://api.trello.com/1/boards/" + obj + "/lists/?limit=1000&fields=name&members=true&member_fields=fullName&key=" + key + "&token=" + token);
                xhr.send(data);
            },
            getListByCard: function(obj, cb) {
                var data = null;
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = JSON.parse(this.responseText);
                        cb(resp);
                    }
                });
                xhr.open("GET", "https://api.trello.com/1/cards/" + obj + "/list/?limit=1000&fields=name&members=true&member_fields=fullName&key=" + key + "&token=" + token);
                xhr.send(data);
            },
            getCardByLists: function(obj, cb) {
                var data = null;
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = JSON.parse(this.responseText);
                        cb(resp);
                    }
                });
                xhr.open("GET", "https://api.trello.com/1/lists/" + obj + "/cards/?limit=1000&fields=name&members=true&member_fields=fullName&key=" + key + "&token=" + token);
                xhr.send(data);
            },
            getLabels: function(obj, cb) {
                var data = null;
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = JSON.parse(this.responseText);
                        cb(resp);
                    }
                });
                xhr.open("GET", "https://api.trello.com/1/boards/" + obj + "/labels?fields=all&limit=50&key=" + key + "&token=" + token);
                xhr.send(data);
            },
            deleteLabel: function(obj, cb) {
                var data = null;
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = JSON.parse(this.responseText);
                        cb(resp);
                    }
                });
                xhr.open("DELETE", "https://api.trello.com/1/labels/" + obj + "?key=" + key + "&token=" + token);
                xhr.send(data);
            },
            activateLabel: function(label, cb) {
                var data = null;
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = JSON.parse(this.responseText);
                        cb(resp);
                    }
                });
                xhr.open("POST", "https://api.trello.com/1/cards/" + label.id + "/labels?color=" + label.color + "&name=" + label.name + "&key=" + key + "&token=" + token);
                xhr.send(data);
            },
            createLabel: function(id, color, name, cb) {
                var data = null;
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = JSON.parse(this.responseText);
                        cb(resp);
                    }
                });
                xhr.open("POST", "https://api.trello.com/1/boards/" + id + "/labels?name=" + name + "&color=" + color + "&key=" + key + "&token=" + token);
                xhr.send(data);
            },
            getLabelsByCard: function(obj, cb) {
                var data = null;
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = JSON.parse(this.responseText);
                        cb(resp);
                    }
                });
                xhr.open("GET", "https://api.trello.com/1/cards/" + obj + "/labels?key=" + key + "&token=" + token);
                xhr.send(data);
            },
            desactiveLabel: function(idCard, idLabel, cb) {
                var data = null;
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = JSON.parse(this.responseText);
                        cb(resp);
                    }
                });
                xhr.open("DELETE", "https://api.trello.com/1/cards/" + idCard + "/idLabels/" + idLabel + "?key=" + key + "&token=" + token);
                xhr.send(data);
            },
            selectLabel: function(idCard, idLabel, cb) {
                var data = null;
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = JSON.parse(this.responseText);
                        cb(resp);
                    }
                });
                xhr.open("POST", "https://api.trello.com/1/cards/" + idCard + "/idLabels?value=" + idLabel + "&key=" + key + "&token=" + token);
                xhr.send(data);
            },
            getBoards: function(cb) {
                var data = {};
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = JSON.parse(this.responseText);
                        cb(resp);
                    }
                });
                xhr.open("GET", "https://api.trello.com/1/members/lexartbrain/boards?filter=all&fields=all&lists=none&memberships=none&organization=false&organization_fields=name%2CdisplayName&key=" + key + "&token=" + token);
                xhr.send(data);
            },
            saveBoards: function(obj, cb) {
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = this.responseText;
                        cb(resp);
                    }
                });
                console.log("ObjBoard::", obj);
                xhr.open("POST", BASE_URL + "projects/tasks/trello/boards/new", true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", window.localStorage["lextracking-web-token"]);
                xhr.send(JSON.stringify(obj));
            },
            updateLabelTask: function(idCard, data, cb) {
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = this.responseText;
                        cb(resp);
                    }
                });
                xhr.open("POST", "https://api.trello.com/1/cards/" + idCard + "/idLabels?value=" + data + "&key=" + key + "&token=" + token, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify({
                    value: data
                }));
            },
            addComment: function(card, cb) {
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = this.responseText;
                        cb(resp);
                    }
                });
                xhr.open("POST", "https://api.trello.com/1/cards/" + card.card_id + "/actions/comments&key=" + key + "&token=" + token, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify(card.description));
            },
            updateCard: function(card, cb) {
                var xhr = new XMLHttpRequest();
                var toSend = {
                    key: key,
                    token: token,
                    name: card.name
                };
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = this.responseText;
                        cb(resp);
                    }
                });
                xhr.open("PUT", "https://api.trello.com/1/cards/" + card.card_id, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify(toSend));
            },
            getMembers: function(board, cb) {
                console.log(board);
                var data = null;
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = JSON.parse(this.responseText);
                        cb(resp);
                    }
                });
                xhr.open("GET", "https://api.trello.com/1/boards/" + board + "/members/?limit=1000&fields=name&members=true&member_fields=fullName&key=" + key + "&token=" + token);
                xhr.send(data);
            },
            getMemberById: function(member, cb) {
                var data = null;
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = JSON.parse(this.responseText);
                        cb(resp);
                    }
                });
                xhr.open("GET", "https://api.trello.com/1/members/" + member + "?key=" + key + "&token=" + token);
                xhr.send(data);
            },
            getCardMembers: function(card, cb) {
                var data = null;
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = JSON.parse(this.responseText);
                        cb(resp);
                    }
                });
                xhr.open("GET", "https://api.trello.com/1/cards/" + card + "/members?key=" + key + "&token=" + token);
                xhr.send(data);
            },
            assignMember: function(obj, cb) {
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = this.responseText;
                        cb(resp);
                    }
                });
                xhr.open("POST", "https://api.trello.com/1/cards/" + obj.idCard + "/idMembers?key=" + key + "&token=" + token, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify({
                    value: obj.idMember
                }));
            },
            unassignMember: function(obj, cb) {
                var data = null;
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = JSON.parse(this.responseText);
                        cb(resp);
                    }
                });
                xhr.open("DELETE", "https://api.trello.com/1/cards/" + obj.idCard + "/idMembers/" + obj.idMember + "?key=" + key + "&token=" + token);
                xhr.send(obj);
            },
            getChecklistCard: function(idCard, cb) {
                var data = null;
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = JSON.parse(this.responseText);
                        cb(resp);
                    }
                });
                xhr.open("GET", "https://api.trello.com/1/cards/" + idCard + "/checklists?checkItems=all&key=" + key + "&token=" + token);
                xhr.send(data);
            },
            updateChecklistCard: function(itemChecklist, cb) {
                var xhr = new XMLHttpRequest();
                var toSend = {
                    key: key,
                    token: token,
                    state: itemChecklist.state
                };
                xhr.addEventListener("readystatechange", function(resp) {
                    if (this.readyState === this.DONE) {
                        var resp = this.responseText;
                        cb(resp);
                    }
                });
                xhr.open("PUT", "https://api.trello.com/1/cards/" + itemChecklist.card_id + "/checkItem/" + itemChecklist.id, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify(toSend));
            },
            updateBoard: function(obj, cb) {
                RestClient.post(model + "/update-board", obj, function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("TracksServices", [ "RestClient", function(RestClient) {
        var model = "tracks";
        var factory = {
            find: function(page, q, cb) {
                RestClient.get(model + "/all", function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findById: function(id, cb) {
                RestClient.get(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findActives: function(cb) {
                RestClient.get(model + "/tracking", function(err, result) {
                    cb(err, result);
                });
            },
            findHistory: function(cb) {
                RestClient.get(model + "/user/history", function(err, result) {
                    cb(err, result);
                });
            },
            findAll: function(page, q, cb) {
                RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
                    cb(err, result);
                });
            },
            getTracks: function(filters, cb) {
                var role = window.localStorage.userRole;
                var ids = filters.idUser && (role == "admin" || role == "pm") ? filters.idUser : "";
                var path = role == "admin" || role == "pm" ? ids == "" ? "all" : ids : "current";
                RestClient.post(model + "/user/" + path, filters, function(err, result) {
                    cb(err, result);
                });
            },
            getAutoTracks: function(filters, cb) {
                RestClient.post("tracks-auto", filters, function(err, result) {
                    cb(err, result);
                });
            },
            getTrelloTrack: function(filters, cb) {
                var user = window.localStorage;
                var role = user.userRole;
                var ids = filters.idUser && (role == "admin" || role == "pm") ? filters.idUser : "";
                var path = role == "admin" || role == "pm" ? ids == "" ? "trello/all" : "trello/" + ids : "current/trello";
                RestClient.post(model + "/user/" + path, filters, function(err, result) {
                    cb(err, result);
                });
            },
            getJiraTrack: function(filters, cb) {
                RestClient.post("tracks-jira", filters, function(err, result) {
                    cb(err, result);
                });
            },
            getUserTracks: function(idUser, cb) {
                var user = window.localStorage;
                var role = user.userRole;
                var ids = idUser;
                var path = "";
                path = role == "admin" || role == "pm" ? ids == "" ? "trello/all" : "trello/" + ids : "current/trello";
                RestClient.get(model + "/user/" + idUser, function(err, result) {
                    cb(err, result);
                });
            },
            getLastUserTrack: function(idUser, cb) {
                RestClient.get(model + "/user/" + idUser + "/last", function(err, result) {
                    cb(err, result);
                });
            },
            getCurrentUserLastTrack: function(idUser, cb) {
                RestClient.get(model + "/user/current/last", function(err, result) {
                    cb(err, result);
                });
            },
            create: function(obj, cb) {
                var track = {
                    idTask: obj.idTask,
                    idUser: obj.idUser,
                    name: obj.taskName,
                    startTime: obj.startTime,
                    endTime: obj.endTime,
                    typeTrack: obj.typeTrack,
                    idProyecto: obj.idProyecto,
                    currency: obj.currency
                };
                RestClient.post(model + "/new", track, function(err, result) {
                    console.log("result::", result);
                    cb(err, result);
                });
            },
            createAutoTask: function(obj, cb) {
                var track = {
                    idTask: obj.idTask,
                    idUser: obj.idUser,
                    idProyecto: obj.idProyecto,
                    name: obj.taskName,
                    startTime: obj.startTime,
                    endTime: obj.endTime,
                    typeTrack: obj.typeTrack
                };
                RestClient.post(model + "/auto-new", track, function(err, result) {
                    console.log("result2::", err, result);
                    cb(err, result);
                });
            },
            createTrelloTask: function(obj, cb) {
                console.log(obj);
                var track = {
                    idTask: obj.idTask,
                    idUser: obj.idUser,
                    idProyecto: obj.idProyecto,
                    name: obj.taskName,
                    startTime: obj.startTime,
                    endTime: obj.endTime,
                    typeTrack: obj.typeTrack,
                    currency: obj.currency
                };
                RestClient.post(model + "/new", track, function(err, result) {
                    console.log("resultTrello::", err, result);
                    cb(err, result);
                });
            },
            createJiraTask: function(obj, cb) {
                var track = {
                    idTask: obj.idTask,
                    idUser: obj.idUser,
                    idProyecto: obj.idProyecto,
                    name: obj.taskName,
                    startTime: obj.startTime,
                    endTime: obj.endTime,
                    typeTrack: obj.typeTrack
                };
                console.log(track);
                RestClient.post(model + "/track-jira-new", track, function(err, result) {
                    console.log("result Jira Service::", err, result);
                    cb(err, result);
                });
            },
            update: function(obj, cb) {
                console.log("OBJ::", obj);
                var path = window.localStorage.isDeveloper == "true" ? model + "/user/current" : model;
                if (obj.typeTrack == "manual") {
                    var track = {
                        id: obj.id,
                        idTask: obj.idTask,
                        idUser: obj.idUser,
                        name: obj.taskName + " - " + obj.projectName,
                        startTime: obj.startTime,
                        endTime: obj.endTime,
                        trackCost: obj.trackCost,
                        idProyecto: obj.idProyecto,
                        duracion: obj.duracion,
                        totalTrack: obj.totalTrack,
                        projCost: obj.projCost,
                        currency: obj.currency
                    };
                    console.log("track to update", track);
                    RestClient.put(path + "/update", track, function(err, result) {
                        cb(err, result);
                    });
                } else if (obj.typeTrack == "trello") {
                    console.log("TrelloObj", obj);
                    var track = {
                        id: obj.id,
                        idTask: obj.idTask,
                        idUser: obj.idUser,
                        trackCost: obj.trackCost,
                        name: obj.taskName,
                        startTime: obj.startTime,
                        endTime: obj.endTime,
                        currency: obj.currency
                    };
                    console.log("track trelloTrack to update", track);
                    RestClient.put(path + "/update", track, function(err, result) {
                        console.log("updateTrello:: ", result);
                        cb(err, result);
                    });
                } else {
                    var track = {
                        id: obj.id,
                        idTask: obj.idTask,
                        idUser: obj.idUser,
                        trackCost: obj.trackCost,
                        name: obj.taskName,
                        startTime: obj.startTime,
                        endTime: obj.endTime,
                        currency: obj.currency
                    };
                    console.log("track autoTask to update", track);
                    RestClient.post(model + "/update-auto", track, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            remove: function(id, cb) {
                RestClient.delete(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            projectByHour: function(id, cb) {
                console.log("ID PROJECT GET", id);
                RestClient.get(model + "/projectByHour/" + id, function(err, result) {
                    console.log("PROJECT BY HOUR", result, err);
                    cb(result, err);
                });
            },
            findByMonth: function(obj, id, cb) {
                console.log(id);
                RestClient.post(model + "/" + id + "/month", obj, function(err, result) {
                    cb(err, result);
                });
            },
            findCurrentByMonth: function(obj, cb) {
                RestClient.post(model + "/user/current/month", obj, function(err, result) {
                    console.log(result);
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("UserServices", [ "RestClient", "$window", function(RestClient, $window) {
        var model = "user";
        var factory = {
            find: function(page, q, cb) {
                var user = window.localStorage;
                var role = user.userRole == "admin" || user.userRole == "pm" ? true : false;
                var path = role == true ? "/all-admin" : "/all";
                RestClient.get(model + path, function(err, result) {
                    cb(err, result);
                });
            },
            currentUser: function(cb) {
                RestClient.get(model + "/current", function(err, result) {
                    cb(err, result);
                });
            },
            findById: function(id, cb) {
                console.log(id);
                RestClient.get(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            findAll: function(page, q, cb) {
                RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
                    cb(err, result);
                });
            },
            save: function(obj, cb) {
                if (obj.id) {
                    RestClient.put(model + "/update/" + obj.id, obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model + "/register", obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            remove: function(id, cb) {
                RestClient.delete(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            savePerformance: function(obj, id, cb) {
                RestClient.post(model + "/performance/" + id + "/save", obj, function(err, result) {
                    cb(err, result);
                });
            },
            saveCurrentPerformance: function(obj, cb) {
                RestClient.post(model + "/performance/current/save", obj, function(err, result) {
                    cb(err, result);
                });
            },
            getPerformanceById: function(obj, id, cb) {
                console.log(obj);
                RestClient.post(model + "/" + id + "/performance", obj, function(err, result) {
                    cb(err, result);
                });
            },
            getPerformanceCurrent: function(obj, cb) {
                RestClient.post(model + "/performance/current", obj, function(err, result) {
                    cb(err, result);
                });
            },
            allPerformances: function(obj, cb) {
                RestClient.post(model + "/all-performance", obj, function(err, result) {
                    cb(err, result);
                });
            },
            persistence: function(cb) {
                RestClient.get("user/current", function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("WeeklyHourServices", [ "RestClient", function(RestClient) {
        var model = "weeklyhours";
        var factory = {
            find: function(page, q, cb) {
                var user = window.localStorage;
                var role = user.userRole;
                var path = role == "developer" ? "user/current" : "all";
                RestClient.get("weeklyhours/" + path, function(err, result, countItems) {
                    cb(err, result, countItems);
                });
            },
            findById: function(id, cb) {
                RestClient.get(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            },
            verifyUSer: function(user, cb) {
                RestClient.get(model + "/user/" + user, function(err, result) {
                    cb(err, result);
                });
            },
            findByIdUser: function(user, cb) {
                RestClient.get(model + "/user/" + user, function(err, result) {
                    cb(err, result);
                });
            },
            currentUser: function(user, cb) {
                RestClient.get(model + "/user/current", function(err, result) {
                    cb(err, result);
                });
            },
            findAll: function(page, q, cb) {
                RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
                    cb(err, result);
                });
            },
            save: function(obj, cb) {
                if (obj.id) {
                    RestClient.post(model + "/update", obj, function(err, result) {
                        cb(err, result);
                    });
                } else {
                    RestClient.post(model + "/new", obj, function(err, result) {
                        cb(err, result);
                    });
                }
            },
            remove: function(id, cb) {
                RestClient.delete(model + "/" + id, function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("MenuEntriesServices", [ "RestClient", function(RestClient) {
        var model = "menuEntries";
        var factory = {
            findAll: function(cb) {
                RestClient.get(model + "/all?sort[id]=1", function(err, result) {
                    cb(err, result);
                });
            },
            findByProfile: function(id, cb) {
                RestClient.get(model + "/query?profileId=" + id, function(err, result) {
                    cb(err, result);
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("DateTimeUtilService", [ "RestClient", function(RestClient) {
        var factory = {
            getMonths: function(cb) {
                var months = [ {
                    index: "1",
                    name: "Enero"
                }, {
                    index: "2",
                    name: "Febrero"
                }, {
                    index: "3",
                    name: "Marzo"
                }, {
                    index: "4",
                    name: "Abril"
                }, {
                    index: "5",
                    name: "Mayo"
                }, {
                    index: "6",
                    name: "Junio"
                }, {
                    index: "7",
                    name: "Julio"
                }, {
                    index: "8",
                    name: "Agosto"
                }, {
                    index: "9",
                    name: "Septiembre"
                }, {
                    index: "10",
                    name: "Octubre"
                }, {
                    index: "11",
                    name: "Noviembre"
                }, {
                    index: "12",
                    name: "Diciembre"
                } ];
                return months;
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("CustomTranslateErrorHandlerFactory", function() {
        var factory = function(translationID, uses) {
            console.log("Missing: " + translationID);
            return "NO DEFAULT KEY";
        };
        return factory;
    });
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("myHttpInterceptor", [ "$injector", "$window", "$rootScope", function($injector, $window, $rootScope, $q) {
        return {
            response: function(response) {
                var state = $injector.get("$state");
                if (state && state.current && state.current.name == "app.tasks_trelloEdit") {
                    response.isTrello = true;
                }
                $rootScope.$watch("state", function(newState, oldState) {
                    if ($window.localStorage["userId"] != $rootScope.userId || $window.localStorage["userName"] != $rootScope.userName || $window.localStorage["userEmail"] != $rootScope.userEmail || $window.localStorage["userRole"] != $rootScope.userRole || $window.localStorage["isAdmin"] != $rootScope.isAdmin || $window.localStorage["isClient"] != $rootScope.isClient || $window.localStorage["isDeveloper"] != $rootScope.isDeveloper) {}
                }, true);
                if (response.headers()["content-type"] == "application/json") {
                    if (response.status == 200) {
                        if (response && typeof response.data !== "undefined") {
                            if (response && response.data && response.data.response && !response.data.response.token && !response.data.response.email) {
                                if (response.isTrello) {
                                    return response;
                                } else {
                                    var rest = $injector.get("UserServices");
                                    if (!$window.localStorage[TOKEN_KEY]) {
                                        rest.persistence(function(error, response) {
                                            var user = angular.copy(response);
                                            $window.localStorage[TOKEN_KEY] = user.token;
                                            $window.localStorage["userId"] = user.id;
                                            $window.localStorage["userName"] = user.name;
                                            $window.localStorage["userEmail"] = user.email;
                                            $window.localStorage["userRole"] = user.role;
                                            $window.localStorage["isAdmin"] = user.role == "admin";
                                            $window.localStorage["isClient"] = user.role == "client";
                                            $window.localStorage["isDeveloper"] = user.role == "developer";
                                            $window.localStorage["idUserClient"] = user.idClient;
                                            return;
                                        });
                                    }
                                }
                            } else if (response && response.data && response.data.code === 401 || response && response.data && response.data.code === 403) {
                                $window.localStorage.clear();
                                state.go("login");
                            }
                        }
                    }
                }
                return response;
            },
            responseError: function(response) {
                if (typeof $q !== "undefined") {
                    return $q.reject(response);
                }
            }
        };
    } ]);
})(angular);

console.log("Reading BASE URL", BASE_URL);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.factory("RestClient", [ "$http", "$state", "ngProgressFactory", "$window", "$rootScope", function($http, $state, ngProgressFactory, $window, $rootScope) {
        var K = {}, progressbar = ngProgressFactory.createInstance(), progressFlag = true, PRIMARY_COLOR = "#66f", factory;
        function getConfig() {
            var config = {
                headers: {
                    Authorization: "Bearer " + $window.localStorage[TOKEN_KEY]
                }
            };
            return config;
        }
        K.URL = BASE_URL;
        progressbar.setHeight("2px");
        progressbar.setColor(PRIMARY_COLOR);
        factory = {
            get: function(url, callback, options) {
                var progressFlag = options && options.disableProgressFlag;
                if (!progressFlag) progressbar.start();
                $http.get(K.URL + url, getConfig()).success(function(data, status, headers, config) {
                    if (!progressFlag) progressbar.complete();
                    var countItems = headers()["x-count-items"];
                    callback(null, data.response, countItems);
                }).error(function(data, status, headers, config) {
                    if (!progressFlag) progressbar.complete();
                    if (status == 401 && $state.current.name != "login" && $state.current.name != "recovery") {
                        $state.go("login", {
                            reload: true
                        });
                        console.log($state.go("login"), status, $state.current.name);
                    } else {
                        callback(data);
                    }
                });
            },
            post: function(url, data, callback) {
                progressbar.start();
                $http.post(K.URL + url, data, getConfig()).then(function(response) {
                    progressbar.complete();
                    if (response && response.data) {
                        callback(null, response.data.response);
                    } else {
                        callback(null, response);
                    }
                });
            },
            put: function(url, data, callback) {
                if (K.progressFlag) {
                    progressbar.start();
                }
                $http.put(K.URL + url, data, getConfig()).success(function(data, status, headers, config) {
                    if (K.progressFlag) {
                        progressbar.complete();
                    }
                    callback(null, data.response);
                }).error(function(data, status, headers, config) {
                    if (K.progressFlag) {
                        progressbar.complete();
                    }
                    if (status == 401 && $state.current.name != "login" && $state.current.name != "recovery") {
                        $state.go("login");
                    } else {
                        callback(data);
                    }
                });
            },
            delete: function(url, callback) {
                progressbar.start();
                $http.delete(K.URL + url, getConfig()).success(function(data, status, headers, config) {
                    progressbar.complete();
                    callback(null, data);
                }).error(function(data, status, headers, config) {
                    progressbar.complete();
                    if (status == 401 && $state.current.name != "login" && $state.current.name != "recovery") {
                        $state.go("login");
                    } else {
                        callback(data);
                    }
                });
            }
        };
        return factory;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.filter("truncateTail", function() {
        return function(value, wordwise, max, tail) {
            if (!value) return "";
            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;
            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(" ");
                if (lastspace != -1) {
                    if (value.charAt(lastspace - 1) == "." || value.charAt(lastspace - 1) == ",") {
                        lastspace = lastspace - 1;
                    }
                    value = value.substr(0, lastspace);
                }
            }
            return value + (tail || "…");
        };
    });
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.directive("fileModel", [ "$parse", function($parse) {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                element.bind("change", function() {
                    scope.$apply(function() {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    } ]);
})(angular);

(function(ng, _) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.directive("lexartLoader", function() {
        var directive;
        directive = {
            restrict: "E",
            scope: {
                visible: "="
            },
            templateUrl: "/app/shared/directives/loader.view.html",
            link: function(scope, element, attrs) {}
        };
        return directive;
    });
    Module.directive("dhxGantt", function() {
        return {
            restrict: "A",
            scope: false,
            transclude: true,
            template: "<div ng-transclude></div>",
            link: function($scope, $element, $attrs, $controller) {
                $scope.$watch($attrs.data, function(collection) {
                    gantt.clearAll();
                    gantt.parse(collection, "json");
                }, true);
                $scope.$watch(function() {
                    return $element[0].offsetWidth + "." + $element[0].offsetHeight;
                }, function() {
                    gantt.setSizes();
                });
                gantt.templates.task_class = function(start, end, task) {
                    console.log(task);
                    if (task.styleclass) {
                        return task.styleclass;
                    }
                };
                if ($attrs.dxhStartDate && $attrs.dxhEndDate) {
                    console.log("Init with dates", new Date($attrs.dxhStartDate), new Date($attrs.dxhEndDate));
                    gantt.init($element[0], new Date($attrs.dxhStartDate), new Date($attrs.dxhEndDate));
                } else gantt.init($element[0]);
            }
        };
    });
    function templateHelper($element) {
        var template = $element[0].innerHTML;
        return template.replace(/[\r\n]/g, "").replace(/"/g, '\\"').replace(/\{\{task\.([^\}]+)\}\}/g, function(match, prop) {
            if (prop.indexOf("|") != -1) {
                var parts = prop.split("|");
                return "\"+gantt.aFilter('" + parts[1].trim() + "')(task." + parts[0].trim() + ')+"';
            }
            return '"+task.' + prop + '+"';
        });
    }
    Module.directive("ganttColumnAdd", [ "$filter", function($filter) {
        return {
            restrict: "AE",
            terminal: true,
            link: function() {
                gantt.config.columns.push({
                    width: 45,
                    name: "add"
                });
            }
        };
    } ]);
})(angular, _);

(function(ng, _) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.directive("fileInput", function() {
        var directive;
        directive = {
            restrict: "E",
            scope: {
                multiple: "@",
                for: "@",
                title: "@",
                fileread: "=",
                filesprovided: "="
            },
            templateUrl: "/app/shared/directives/multipleFileInput.view.html",
            link: function(scope, element, attrs) {
                var input = element.find("input");
                scope.removeFile = function(index) {
                    console.log("Llama a la directiva remove!");
                    scope.files.splice(index, 1);
                    scope.fileread = scope.files;
                };
                scope.downloadFile = function(file) {
                    console.log("Llama a la directiva!");
                    scope.$root.download(file);
                };
                input.on("change", function(e) {
                    if (!scope.files) {
                        scope.files = [];
                    }
                    if (scope.multiple) {
                        _.each(e.target.files, function(item) {
                            scope.files.push(item);
                        });
                    } else {
                        _.each(e.target.files, function(item) {
                            scope.files[0] = item;
                        });
                    }
                    scope.$apply();
                });
                scope.$watch("filesprovided", function() {
                    console.log("DIRECTIVE scope.filesprovided ", scope.filesprovided);
                    if (scope.filesprovided) {
                        scope.files = [];
                        if (_.isArray(scope.filesprovided)) {
                            _.each(scope.filesprovided, function(item) {
                                scope.files.push(item);
                            });
                        } else {
                            scope.files.push(scope.filesprovided);
                        }
                    }
                });
                if (scope.multiple) {
                    element.find("input").attr("multiple", "multiple");
                } else {
                    scope.multiple = false;
                }
                input.bind("change", function(changeEvent) {
                    scope.$apply(function() {
                        scope.fileread = scope.files;
                    });
                });
            }
        };
        return directive;
    });
})(angular, _);

angular.module("bw.paging", []).directive("paging", function() {
    var regex = /\{page\}/g;
    return {
        restrict: "EA",
        link: fieldLink,
        template: fieldTemplate,
        scope: {
            page: "=",
            pageSize: "=",
            total: "=",
            disabled: "@",
            dots: "@",
            ulClass: "@",
            activeClass: "@",
            disabledClass: "@",
            adjacent: "@",
            pagingAction: "&",
            pgHref: "@",
            textFirst: "@",
            textLast: "@",
            textNext: "@",
            textPrev: "@",
            textFirstClass: "@",
            textLastClass: "@",
            textNextClass: "@",
            textPrevClass: "@",
            textTitlePage: "@",
            textTitleFirst: "@",
            textTitleLast: "@",
            textTitleNext: "@",
            textTitlePrev: "@"
        }
    };
    function fieldLink(scope, el, attrs) {
        scope.$watchCollection("[page,pageSize,total,disabled]", function() {
            build(scope, attrs);
        });
    }
    function fieldTemplate(el, attrs) {
        return '<ul data-ng-hide="Hide" data-ng-class="ulClass"> ' + "<li " + 'title="{{Item.title}}" ' + 'data-ng-class="Item.liClass" ' + 'data-ng-repeat="Item in List"> ' + "<a " + (attrs.pgHref ? 'data-ng-href="{{Item.pgHref}}" ' : "href ") + 'data-ng-class="Item.aClass" ' + 'data-ng-click="Item.action()" ' + 'data-ng-bind="Item.value">' + "</a> " + "</li>" + "</ul>";
    }
    function setScopeValues(scope, attrs) {
        scope.List = [];
        scope.Hide = false;
        scope.page = parseInt(scope.page) || 1;
        scope.total = parseInt(scope.total) || 0;
        scope.adjacent = parseInt(scope.adjacent) || 2;
        scope.pgHref = scope.pgHref || "";
        scope.dots = scope.dots || "...";
        scope.ulClass = scope.ulClass || "pagination";
        scope.activeClass = scope.activeClass || "active";
        scope.disabledClass = scope.disabledClass || "disabled";
        scope.textFirst = scope.textFirst || "<<";
        scope.textLast = scope.textLast || ">>";
        scope.textNext = scope.textNext || ">";
        scope.textPrev = scope.textPrev || "<";
        scope.textFirstClass = scope.textFirstClass || "";
        scope.textLastClass = scope.textLastClass || "";
        scope.textNextClass = scope.textNextClass || "";
        scope.textPrevClass = scope.textPrevClass || "";
        scope.textTitlePage = scope.textTitlePage || "Page {page}";
        scope.textTitleFirst = scope.textTitleFirst || "First Page";
        scope.textTitleLast = scope.textTitleLast || "Last Page";
        scope.textTitleNext = scope.textTitleNext || "Next Page";
        scope.textTitlePrev = scope.textTitlePrev || "Previous Page";
        scope.hideIfEmpty = evalBoolAttribute(scope, attrs.hideIfEmpty);
        scope.showPrevNext = evalBoolAttribute(scope, attrs.showPrevNext);
        scope.showFirstLast = evalBoolAttribute(scope, attrs.showFirstLast);
        scope.scrollTop = evalBoolAttribute(scope, attrs.scrollTop);
        scope.isDisabled = evalBoolAttribute(scope, attrs.disabled);
    }
    function evalBoolAttribute(scope, value) {
        return angular.isDefined(value) ? !!scope.$parent.$eval(value) : false;
    }
    function validateScopeValues(scope, pageCount) {
        if (scope.page > pageCount) {
            scope.page = pageCount;
        }
        if (scope.page <= 0) {
            scope.page = 1;
        }
        if (scope.adjacent <= 0) {
            scope.adjacent = 2;
        }
        if (pageCount <= 1) {
            scope.Hide = scope.hideIfEmpty;
        }
    }
    function internalAction(scope, page) {
        if (scope.page == page) {
            return;
        }
        if (scope.isDisabled) {
            return;
        }
        scope.page = page;
        scope.pagingAction({
            page: scope.page,
            pageSize: scope.pageSize,
            total: scope.total
        });
        if (scope.scrollTop) {
            scrollTo(0, 0);
        }
    }
    function addPrevNext(scope, pageCount, mode) {
        if (!scope.showPrevNext && !scope.showFirstLast || pageCount < 1) {
            return;
        }
        var disabled, alpha, beta;
        if (mode === "prev") {
            disabled = scope.page - 1 <= 0;
            var prevPage = scope.page - 1 <= 0 ? 1 : scope.page - 1;
            if (scope.showFirstLast) {
                alpha = {
                    value: scope.textFirst,
                    title: scope.textTitleFirst,
                    aClass: scope.textFirstClass,
                    page: 1
                };
            }
            if (scope.showPrevNext) {
                beta = {
                    value: scope.textPrev,
                    title: scope.textTitlePrev,
                    aClass: scope.textPrevClass,
                    page: prevPage
                };
            }
        } else {
            disabled = scope.page + 1 > pageCount;
            var nextPage = scope.page + 1 >= pageCount ? pageCount : scope.page + 1;
            if (scope.showPrevNext) {
                alpha = {
                    value: scope.textNext,
                    title: scope.textTitleNext,
                    aClass: scope.textNextClass,
                    page: nextPage
                };
            }
            if (scope.showFirstLast) {
                beta = {
                    value: scope.textLast,
                    title: scope.textTitleLast,
                    aClass: scope.textLastClass,
                    page: pageCount
                };
            }
        }
        var buildItem = function(item, disabled) {
            return {
                title: item.title,
                aClass: item.aClass,
                value: item.aClass ? "" : item.value,
                liClass: disabled ? scope.disabledClass : "",
                pgHref: disabled ? "" : scope.pgHref.replace(regex, item.page),
                action: function() {
                    if (!disabled) {
                        internalAction(scope, item.page);
                    }
                }
            };
        };
        if (scope.isDisabled) {
            disabled = true;
        }
        if (alpha) {
            var alphaItem = buildItem(alpha, disabled);
            scope.List.push(alphaItem);
        }
        if (beta) {
            var betaItem = buildItem(beta, disabled);
            scope.List.push(betaItem);
        }
    }
    function addRange(start, finish, scope) {
        var i = 0;
        for (i = start; i <= finish; i++) {
            var pgHref = scope.pgHref.replace(regex, i);
            var liClass = scope.page == i ? scope.activeClass : "";
            if (scope.isDisabled) {
                pgHref = "";
                liClass = scope.disabledClass;
            }
            scope.List.push({
                value: i,
                title: scope.textTitlePage.replace(regex, i),
                liClass: liClass,
                pgHref: pgHref,
                action: function() {
                    internalAction(scope, this.value);
                }
            });
        }
    }
    function addDots(scope) {
        scope.List.push({
            value: scope.dots,
            liClass: scope.disabledClass
        });
    }
    function addFirst(scope, next) {
        addRange(1, 2, scope);
        if (next != 3) {
            addDots(scope);
        }
    }
    function addLast(pageCount, scope, prev) {
        if (prev != pageCount - 2) {
            addDots(scope);
        }
        addRange(pageCount - 1, pageCount, scope);
    }
    function build(scope, attrs) {
        if (!scope.pageSize || scope.pageSize <= 0) {
            scope.pageSize = 1;
        }
        var pageCount = Math.ceil(scope.total / scope.pageSize);
        setScopeValues(scope, attrs);
        validateScopeValues(scope, pageCount);
        var start, finish;
        var fullAdjacentSize = scope.adjacent * 2 + 2;
        addPrevNext(scope, pageCount, "prev");
        if (pageCount <= fullAdjacentSize + 2) {
            start = 1;
            addRange(start, pageCount, scope);
        } else {
            if (scope.page - scope.adjacent <= 2) {
                start = 1;
                finish = 1 + fullAdjacentSize;
                addRange(start, finish, scope);
                addLast(pageCount, scope, finish);
            } else if (scope.page < pageCount - (scope.adjacent + 2)) {
                start = scope.page - scope.adjacent;
                finish = scope.page + scope.adjacent;
                addFirst(scope, start);
                addRange(start, finish, scope);
                addLast(pageCount, scope, finish);
            } else {
                start = pageCount - fullAdjacentSize;
                finish = pageCount;
                addFirst(scope, start);
                addRange(start, finish, scope);
            }
        }
        addPrevNext(scope, pageCount, "next");
    }
});

(function(ng, _) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.directive("lexartProjectChart", function() {
        var directive;
        directive = {
            restrict: "E",
            scope: {
                items: "="
            },
            templateUrl: "/app/shared/directives/projectChart.view.html",
            link: function(scope, element, attrs) {}
        };
        return directive;
    });
    Module.directive("mwConfirmClick", [ function() {
        return {
            priority: -1,
            restrict: "A",
            scope: {
                confirmFunction: "&mwConfirmClick"
            },
            link: function(scope, element, attrs) {
                element.bind("click", function(e) {
                    var message = attrs.mwConfirmClickMessage ? attrs.mwConfirmClickMessage : "Are you sure?";
                    if (confirm(message)) {
                        scope.confirmFunction();
                    }
                });
            }
        };
    } ]);
})(angular, _);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.directive("status", function() {
        var directive = {
            restrict: "E",
            scope: {
                value: "=",
                showLabels: "=",
                showIcon: "="
            },
            templateUrl: "/app/shared/directives/status.view.html"
        };
        return directive;
    });
})(angular);

(function(ng, _) {
    "use strict";
    var Module = ng.module("LexTracking");
    console.log("budgetStatus");
    Module.directive("budgetStatus", [ function() {
        return {
            restrict: "E",
            scope: {
                pass: "=",
                some: "@",
                budget: "="
            },
            templateUrl: "app/components/budget/components/versions/views/versionStatusView.html",
            controller: [ "$scope", function($scope) {
                console.log("budget directive", $scope);
            } ]
        };
    } ]);
})(angular, _);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.directive("statusSelect", function() {
        var directive = {
            restrict: "E",
            scope: {
                model: "="
            },
            templateUrl: "/app/shared/directives/statusSelect.view.html",
            link: function(scope, elem) {
                scope.active = false;
                elem.attr("tabindex", "0");
                elem.on("focus", function() {
                    elem.addClass("focus");
                });
                elem.on("blur", function() {
                    elem.removeClass("focus");
                });
                scope.setValue = function(val) {
                    console.log(val);
                    scope.model = val;
                };
                scope.setActive = function() {
                    scope.active = !scope.active;
                };
            }
        };
        return directive;
    });
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("AppCtrl", [ "$scope", "$log", "$window", "$rootScope", "$state", "$translate", "$timeout", "RestClient", "ngDialog", "toastr", function($scope, $log, $window, $rootScope, $state, $translate, $timeout, RestClient, ngDialog, toastr) {
        $log.info("%cLEXTRACKING %cAPP STARTUP ", "background: #203678; color: #F9F9F9; font-weight:bold; padding: 4px;", "background: #666; color: #F9F9F9; padding: 4px;");
        $scope.$evalAsync(function() {
            $log.info("Async calls..");
        });
        $rootScope.darkMode = $window.sessionStorage["darkMode"] || 0;
        $rootScope.userPhoto = window.localStorage.getItem("photo");
        $rootScope.FILES_BASE = FILES_BASE;
        $rootScope.darkMode == 1 ? $rootScope.darkModeBool = true : $rootScope.darkModeBool = false;
        $rootScope.shohSwitchTooltip = true;
        $rootScope.showToast = function(title, subTitle, type) {
            toastr[type](subTitle, title, {
                timeOut: 0
            });
        };
        $rootScope.showToaster = function(title, type, subtitle) {
            $timeout(function() {
                var count = jQuery("#toast-container > div").length;
                if (count > 1) {
                    for (var index = 1; index < count; index++) {
                        if (jQuery("#toast-container > div")[index]) {
                            jQuery("#toast-container > div")[index].remove();
                        }
                    }
                }
                jQuery("div[toast]").css("bottom", "0");
            }, 50);
            switch (type) {
              case "info":
                toastr.info(subtitle, title);
                break;

              case "error":
                toastr.error(subtitle, title);
                break;

              case "warning":
                toastr.warning(subtitle, title);
                break;

              case "success":
                toastr.success(subtitle, title);
                break;

              default:
                toastr.info(subtitle, title);
                break;
            }
        };
        $rootScope.closeToaster = function() {
            toastr.clear();
        };
        $rootScope.logout = function() {
            $window.localStorage.clear();
            $rootScope.userName = "";
            $rootScope.token = "";
            $rootScope.darkModeSwitch = 0;
            $rootScope.darkMode = 0;
            $window.sessionStorage["darkMode"] = 0;
            $state.go("login");
        };
        $rootScope.toggleMode = function() {
            $rootScope.darkMode == 0 ? $rootScope.darkMode = 1 : $rootScope.darkMode = 0;
            $rootScope.darkModeBool = !$rootScope.darkModeBool;
            $window.sessionStorage["darkMode"] == "0" ? $window.sessionStorage["darkMode"] = "1" : $window.sessionStorage["darkMode"] = "0";
        };
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            ngDialog.closeAll();
        });
        $scope.$on("$routeChangeSuccess", function(e, currentRoute) {
            if (currentRoute && currentRoute.title) {
                $window.title = currentRoute.title;
            }
        });
        $scope.changeLanguage = function(langKey) {
            $translate.use(langKey);
        };
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("BotCtrl", [ "$scope", "$state", "$stateParams", "$rootScope", "$filter", "$timeout", "BotsServices", "ngDialog", function($scope, $state, $stateParams, $rootScope, $filter, $timeout, BotsServices, ngDialog) {} ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("BotsCtrl", [ "$scope", "$interval", "$rootScope", "$filter", "$timeout", "BotsServices", "ngDialog", function($scope, $interval, $rootScope, $filter, $timeout, BotsServices, ngDialog) {} ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("EasyWebCtrl", [ "$scope", "$state", "$stateParams", "$rootScope", "$filter", "$timeout", "EasywebsServices", "ngDialog", "$window", "$http", function($scope, $state, $stateParams, $rootScope, $filter, $timeout, EasywebsServices, ngDialog, $window, $http) {
        $scope.web = {};
        $scope.menuTable = [];
        $scope.menu = [];
        $scope.section = [];
        $scope.sectionTable = [];
        $scope.sliderTable = [];
        $scope.slider = [];
        $scope.contact = [];
        $scope.contactEmail = {};
        $scope.contactTable = [];
        $scope.footer = [];
        $scope.footerTable = [];
        $scope.web.idUser = $window.localStorage["userId"];
        var API_POOL = "http://pool.lexartlabs.uy/alltypes.php";
        $scope.imagen = [];
        $scope.imagenBase64_slider = undefined;
        $scope.img_slider = {};
        $scope.img_section = {};
        $scope.img_footer = {};
        $scope.img_slider_show = false;
        $scope.img_section_show = false;
        $scope.img_footer_show = false;
        $scope.slider_img_loading = false;
        $scope.section_img_loading = false;
        $scope.footer_img_loading = false;
        $scope.isEdit = false;
        $scope.addMenu = function(menu) {
            var link = "";
            var attr = "";
            if (!menu.name) {
                return;
            }
            if (menu.link) {
                link = menu.link;
            }
            if (menu.attr) {
                attr = menu.attr;
            }
            var newMenu = {
                name: menu.name,
                link: link,
                attr: attr
            };
            $scope.menuTable.push(newMenu);
            this.menu = [];
        };
        $scope.addSection = function(section) {
            var img = "";
            var html = "";
            if (!section.name) {
                return;
            }
            if ($scope.img_section) {
                img = $scope.img_section;
            }
            if (section.html) {
                html = section.html;
            }
            var newSection = {
                name: section.name,
                img: img,
                html: html
            };
            $scope.sectionTable.push(newSection);
            this.section = [];
        };
        $scope.addSlider = function(slider) {
            var img = "";
            var html = "";
            if (!slider.name) {
                return;
            }
            if ($scope.img_slider) {
                img = $scope.img_slider;
            }
            if (slider.html) {
                html = slider.html;
            }
            var newSlider = {
                name: slider.name,
                img: img,
                html: html
            };
            $scope.sliderTable.push(newSlider);
            this.slider = [];
        };
        $scope.addFooter = function(footer) {
            var img = "";
            var html = "";
            if ($scope.footerTable == null) {
                $scope.footerTable = [];
            }
            if (!footer.name) {
                return;
            }
            if ($scope.img_footer) {
                img = $scope.img_footer;
            }
            if (footer.html) {
                html = footer.html;
            }
            var newFooter = {
                name: footer.name,
                img: img,
                html: html
            };
            $scope.footerTable.push(newFooter);
            this.footer = [];
        };
        $scope.agregarImgSlider = function(imagen) {
            if (imagen) {
                $scope.slider_img_loading = true;
                $scope.img_slider = {};
                var aux = imagen.filename.split(".");
                $scope.img_slider.img_type = aux[aux.length - 1];
                $scope.img_slider.img_encoded = "data:" + imagen.filetype + ";base64," + imagen.base64;
                $http.post(API_POOL, $scope.img_slider).then(function(res) {
                    $scope.img_slider = res.data.url;
                    $scope.img_slider_show = true;
                    $scope.slider_img_loading = false;
                    console.log(res.data.url);
                });
            }
        };
        $scope.agregarImgSection = function(imagen) {
            if (imagen) {
                $scope.section_img_loading = true;
                $scope.img_section = {};
                var aux = imagen.filename.split(".");
                $scope.img_section.img_type = aux[aux.length - 1];
                $scope.img_section.img_encoded = "data:" + imagen.filetype + ";base64," + imagen.base64;
                $http.post(API_POOL, $scope.img_section).then(function(res) {
                    $scope.img_section = res.data.url;
                    $scope.img_section_show = true;
                    $scope.section_img_loading = false;
                    console.log(res.data.url);
                });
            }
        };
        $scope.agregarImgFooter = function(imagen) {
            if (imagen) {
                $scope.footer_img_loading = true;
                $scope.img_footer = {};
                var aux = imagen.filename.split(".");
                $scope.img_footer.img_type = aux[aux.length - 1];
                $scope.img_footer.img_encoded = "data:" + imagen.filetype + ";base64," + imagen.base64;
                $http.post(API_POOL, $scope.img_footer).then(function(res) {
                    $scope.img_footer = res.data.url;
                    $scope.img_footer_show = true;
                    $scope.footer_img_loading = false;
                    console.log(res.data.url);
                });
            }
        };
        var newContactEmail = {
            formFields: []
        };
        $scope.contactEmail = newContactEmail;
        $scope.addContact = function(contact) {
            $scope.contactEmail = {};
            var email_to = "";
            var email_from = "";
            var email_bbc = "";
            if (contact.email_to) {
                email_to = contact.email_to;
            }
            if (contact.email_from) {
                email_from = contact.email_from;
            }
            if (contact.email_bbc) {
                email_bbc = contact.email_bbc;
            }
            var name = "";
            var type = "";
            var validation = "";
            var id = contact.name.toLowerCase().split(" ").join("_") + "_form";
            if (contact.validation == "SI") {
                validation = true;
            } else {
                validation = false;
            }
            if (contact.name) {
                name = contact.name;
            }
            if (contact.type) {
                type = contact.type;
            }
            console.log(validation);
            var newContact = {
                name: name,
                type: type,
                validate: validation,
                id: id
            };
            $scope.contactTable.push(newContact);
            this.contact = [];
        };
        $scope.save = function() {
            $scope.error = "";
            $scope.contactEmail.formFields = $scope.contactTable;
            $scope.web.jsonForm = $scope.contactEmail;
            $scope.web.jsonMenu = $scope.menuTable;
            $scope.web.jsonSections = $scope.sectionTable;
            $scope.web.jsonSliders = $scope.sliderTable;
            $scope.web.jsonFooter = $scope.footerTable;
            console.log("web to save", JSON.stringify($scope.web));
            EasywebsServices.save($scope.web, function(err, result) {
                if (err) {
                    console.log("error", err);
                    $scope.error = err.message || err.error.message || err.error || err;
                    $sendingData = false;
                } else {
                    $state.go("app.easyWebs");
                }
            });
        };
        if ($stateParams.id) {
            EasywebsServices.findById($stateParams.id, function(err, easywebs) {
                if (!err) {
                    console.log("easyweb: ", easywebs);
                    $scope.isEdit = true;
                    $scope.web = easywebs;
                    $scope.contactTable = $scope.web.jsonForm.formFields;
                    $scope.contactEmail = $scope.web.jsonForm;
                    $scope.menuTable = $scope.web.jsonMenu;
                    $scope.sectionTable = $scope.web.jsonSections;
                    $scope.sliderTable = $scope.web.jsonSliders;
                    $scope.footerTable = $scope.web.jsonFooter;
                }
            });
        }
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("EasyWebsCtrl", [ "$scope", "$interval", "$rootScope", "$filter", "$timeout", "EasywebsServices", "ngDialog", function($scope, $interval, $rootScope, $filter, $timeout, EasywebsServices, ngDialog) {
        $scope.easywebs = [];
        EasywebsServices.find($scope.currentPage, $scope.query, function(err, easywebs, countItems) {
            if (!err) {
                console.log(easywebs);
                $scope.easywebs = easywebs;
                $scope.total = countItems;
            }
        });
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("HostingCtrl", [ "$scope", "$state", "$stateParams", "$rootScope", "$filter", "$timeout", "HostingServices", "ProductServices", "ngDialog", function($scope, $state, $stateParams, $rootScope, $filter, $timeout, HostingServices, ProductServices, ngDialog) {
        $scope.clients = [];
        $scope.client = {};
        $scope.users = [];
        $scope.user = {};
        $scope.select = {};
        $scope.accountStatus = [ {
            name: "ACTIVO"
        }, {
            name: "INACTIVO"
        }, {
            name: "SUSPENDIDO"
        } ];
        $scope.productState = [ {
            name: "ACTIVO"
        }, {
            name: "INACTIVO"
        }, {
            name: "SUSPENDIDO"
        } ];
        $scope.clientType = [ {
            name: "Cliente fijo"
        }, {
            name: "Empresa"
        } ];
        $scope.contractType = [ {
            name: "ANUAL"
        }, {
            name: "MENSUAL"
        } ];
        $scope.contactType = [ {
            name: "FINANZAS"
        }, {
            name: "ADMINISTRATIVO"
        }, {
            name: "TÉCNICO"
        } ];
        $scope.productsType = [];
        $scope.products = [];
        $scope.modelProduct = {};
        $scope.allProducts = [];
        $scope.productDescription = "";
        $scope.hosting = {};
        $scope.hosting.contact = [];
        $scope.hosting.products = [];
        $scope.tableProducts = [];
        $scope.contact = {};
        $scope.error = "";
        $scope.timeRemaining = "";
        $scope.query = "";
        $scope.currentPage = 0;
        var aux_price = 0;
        $scope.modelProduct.state = {
            name: "ACTIVO"
        };
        var idHosting = $stateParams.id;
        ProductServices.find($scope.currentPage, $scope.query, function(err, product, countItems) {
            if (!err) {
                $scope.allProducts = product;
                $scope.total = countItems;
                angular.forEach(product, function(element, index) {
                    var exist = false;
                    angular.forEach($scope.productsType, function(e, index) {
                        if (element.type == e.name) {
                            exist = true;
                        }
                    });
                    if (exist == false) {
                        $scope.productsType.push({
                            name: element.type
                        });
                    }
                });
            }
        });
        if (idHosting) {
            HostingServices.findById(idHosting, function(err, response) {
                if (!err) {
                    var hosting = angular.copy(response);
                    console.log(hosting);
                    hosting.accountStatus = {
                        name: hosting.accountStatus
                    };
                    if (hosting.company == "1") {
                        $scope.client = {
                            name: "Empresa"
                        };
                        hosting.finalClient = 0;
                        hosting.company = 1;
                    } else if (hosting.company === "0") {
                        console.log("test");
                        $scope.client = {
                            name: "Cliente fijo"
                        };
                        hosting.finalClient = 1;
                        hosting.company = 0;
                    }
                    $scope.hosting = angular.copy(hosting);
                }
            });
        } else {
            $scope.hosting.startDate = moment().format("YYYY-MM-DD");
        }
        $scope.clientSelect = function(select) {
            if (select.name == "Empresa") {
                $scope.hosting.company = 1;
                $scope.hosting.finalClient = 0;
            } else if (select.name == "Cliente fijo") {
                $scope.hosting.company = 0;
                $scope.hosting.finalClient = 1;
            }
        };
        $scope.changeSelect = function() {
            if (!$scope.edit_product) {
                if ($scope.modelProduct.contractType.name == "ANUAL") {
                    $scope.modelProduct.nextExpiration = moment($scope.modelProduct.hireDate, "DD/MM/YYYY").add(1, "years").format("DD/MM/YYYY");
                    console.log($scope.modelProduct);
                    var now = moment().format("DD/MM/YYYY");
                    var then = $scope.modelProduct.nextExpiration;
                    $scope.modelProduct.timeRemaining = moment(then, "DD/MM/YYYY").diff(moment(now, "DD/MM/YYYY"), "days") + 1;
                } else if ($scope.modelProduct.contractType.name == "MENSUAL") {
                    $scope.modelProduct.nextExpiration = moment($scope.modelProduct.hireDate, "DD/MM/YYYY").add(1, "month").format("DD/MM/YYYY");
                    var now = moment().format("DD/MM/YYYY");
                    var then = $scope.modelProduct.nextExpiration;
                    $scope.modelProduct.timeRemaining = moment(then, "DD/MM/YYYY").diff(moment(now, "DD/MM/YYYY"), "days") + 1;
                }
                $scope.error = "";
            } else {
                if ($scope.edit_product.contractType.name == "ANUAL") {
                    $scope.edit_product.nextExpiration = moment($scope.edit_product.hireDate, "DD/MM/YYYY").add(1, "years").format("DD/MM/YYYY");
                    console.log($scope.edit_product);
                    var now = moment().format("DD/MM/YYYY");
                    var then = $scope.edit_product.nextExpiration;
                    $scope.edit_product.timeRemaining = moment(then, "DD/MM/YYYY").diff(moment(now, "DD/MM/YYYY"), "days") + 1;
                } else if ($scope.edit_product.contractType.name == "MENSUAL") {
                    $scope.edit_product.nextExpiration = moment($scope.edit_product.hireDate, "DD/MM/YYYY").add(1, "month").format("DD/MM/YYYY");
                    var now = moment().format("DD/MM/YYYY");
                    var then = $scope.edit_product.nextExpiration;
                    $scope.edit_product.timeRemaining = moment(then, "DD/MM/YYYY").diff(moment(now, "DD/MM/YYYY"), "days") + 1;
                }
            }
        };
        $scope.contractSelect = function(select) {
            if ($scope.modelProduct.contractType.name == "ANUAL") {
                $scope.modelProduct.price = aux_price * 12;
            } else if ($scope.modelProduct.contractType.name == "MENSUAL") {
                $scope.modelProduct.price = aux_price;
            }
            if ($scope.edit_product) {
                if ($scope.edit_product.contractType) {
                    if ($scope.edit_product.contractType.name == "ANUAL") {
                        $scope.edit_product.price = aux_price * 12;
                    } else if ($scope.edit_product.contractType.name == "MENSUAL") {
                        $scope.edit_product.price = aux_price;
                    }
                }
            }
            if ($scope.modelProduct.hireDate) {
                if ($scope.modelProduct.contractType.name == "ANUAL") {
                    $scope.modelProduct.nextExpiration = moment($scope.modelProduct.hireDate, "DD/MM/YYYY").add("years", 1).format("DD/MM/YYYY");
                    var now = moment().format("DD/MM/YYYY");
                    var then = $scope.modelProduct.nextExpiration;
                    $scope.modelProduct.timeRemaining = moment(then, "DD/MM/YYYY").diff(moment(now, "DD/MM/YYYY"), "days") + 1;
                } else if ($scope.modelProduct.contractType.name == "MENSUAL") {
                    $scope.modelProduct.nextExpiration = moment($scope.modelProduct.hireDate, "DD/MM/YYYY").add("month", 1).format("DD/MM/YYYY");
                    var now = moment().format("DD/MM/YYYY");
                    var then = $scope.modelProduct.nextExpiration;
                    $scope.modelProduct.timeRemaining = moment(then, "DD/MM/YYYY").diff(moment(now, "DD/MM/YYYY"), "days") + 1;
                }
            }
            if ($scope.edit_product && $scope.edit_product.hireDate) {
                if ($scope.edit_product.contractType.name == "ANUAL") {
                    $scope.edit_product.nextExpiration = moment($scope.edit_product.hireDate, "DD/MM/YYYY").add("years", 1).format("DD/MM/YYYY");
                    var now = moment().format("DD/MM/YYYY");
                    var then = $scope.edit_product.nextExpiration;
                    $scope.edit_product.timeRemaining = moment(then, "DD/MM/YYYY").diff(moment(now, "DD/MM/YYYY"), "days") + 1;
                } else if ($scope.edit_product.contractType.name == "MENSUAL") {
                    $scope.edit_product.nextExpiration = moment($scope.edit_product.hireDate, "DD/MM/YYYY").add("month", 1).format("DD/MM/YYYY");
                    var now = moment().format("DD/MM/YYYY");
                    var then = $scope.edit_product.nextExpiration;
                    $scope.edit_product.timeRemaining = moment(then, "DD/MM/YYYY").diff(moment(now, "DD/MM/YYYY"), "days") + 1;
                }
            }
            $scope.error = "";
        };
        $scope.typeProductSelect = function(select) {
            console.log("productSelect", select);
            $scope.tableProducts = [];
            $scope.products = [];
            $scope.productDescription = "";
            angular.forEach($scope.allProducts, function(element, index) {
                if (select.name == element.type) {
                    $scope.products.push(element);
                }
            });
        };
        $scope.ProductDescription = function(select) {
            console.log(select);
            $scope.productDescription = "";
            if (select.name) {
                $scope.productDescription += " Nombre: " + select.name + "\n";
            }
            if (select.status) {
                $scope.productDescription += " Estado: " + select.status + "\n";
            }
            if (select.accessData) {
                $scope.productDescription += " Datos de acceso: " + select.accessData + "\n";
            }
            if (select.amountDataBase) {
                $scope.productDescription += " Cantidad de bases de datos: " + select.amountDataBase + "\n";
            }
            if (select.amountEmails) {
                $scope.productDescription += " Cantidad de correos: " + select.amountEmails + "\n";
            }
            if (select.cpu) {
                $scope.productDescription += " CPU: " + select.cpu + "\n";
            }
            if (select.databaseAccess) {
                $scope.productDescription += " Acceso a base de dato: " + select.databaseAccess + "\n";
            }
            if (select.diskSpace) {
                $scope.productDescription += " Espacio de disco: " + select.diskSpace + "\n";
            }
            if (select.domain) {
                $scope.productDescription += " Dominio: " + select.domain + "\n";
            }
            if (select.expiration) {
                $scope.productDescription += " Vencimiento: " + select.expiration + "\n";
            }
            if (select.hdd) {
                $scope.productDescription += " HDD: " + select.hdd + "\n";
            }
            if (select.ip) {
                $scope.productDescription += " IP: " + select.ip + "\n";
            }
            if (select.link) {
                $scope.productDescription += " LINK: " + select.link + "\n";
            }
            if (select.memory) {
                $scope.productDescription += " Memoria: " + select.memory + "\n";
            }
            if (select.placeAccommodation) {
                $scope.productDescription += " Lugar acomodado:" + select.placeAccommodation + "\n";
            }
            if (select.provider) {
                $scope.productDescription += " Proveedor: " + select.provider + "\n";
            }
            if (select.transfer) {
                $scope.productDescription += " Transeferncia: " + select.transfer + "\n";
            }
            if (select.type) {
                $scope.productDescription += " Tipo: " + select.type;
            }
            aux_price = parseFloat(select.price);
            $scope.modelProduct.price = parseFloat(select.price);
        };
        $scope.addProduct = function() {
            if (!$scope.modelProduct.type) {
                $scope.error = "Seleccione el tipo de producto";
                return;
            }
            if (!$scope.modelProduct.description) {
                $scope.error = "Seleccione un producto";
                return;
            }
            if (!$scope.modelProduct.contractType) {
                $scope.error = "Seleccione el tipo de contrato";
                return;
            }
            if (!$scope.modelProduct.price) {
                $scope.error = "Ingrese un monto";
                return;
            }
            if (!$scope.modelProduct.hireDate) {
                $scope.error = "Seleccione fecha de contratación";
                return;
            }
            $scope.error = "";
            $scope.hosting.products.push($scope.modelProduct);
            var price = 0;
            angular.forEach($scope.hosting.products, function(element, index) {
                price += element.price;
            });
            $scope.hosting.serviceCost = price;
            $scope.modelProduct = {};
            $scope.modelProduct.state = {
                name: "ACTIVO"
            };
            $scope.productDescription = "";
        };
        $scope.discountPrice = function() {
            var price = 0;
            angular.forEach($scope.hosting.products, function(element, index) {
                price += element.price;
            });
            $scope.hosting.serviceCost = price;
        };
        $scope.addContact = function() {
            if (!$scope.contact.name) {
                $scope.error = "Ingrese nombre del contacto";
                return;
            }
            if (!$scope.contact.email) {
                $scope.error = "Ingrese email del contacto";
                return;
            }
            if (!$scope.contact.phone) {
                $scope.error = "Ingrese numero del contacto";
                return;
            }
            $scope.hosting.contact.push($scope.contact);
            $scope.contact = {};
            $scope.error = "";
        };
        $scope.save = function() {
            if (!$scope.hosting.fullName) {
                $scope.error = "Ingrese nombre completo";
                return;
            }
            if (!$scope.hosting.accountStatus) {
                $scope.error = "Ingrese estado de la cuenta";
                return;
            }
            if ($scope.hosting.company === undefined) {
                $scope.error = "Seleccionar tipo de facturacion.";
                return;
            }
            if ($scope.hosting.company === 1) {
                if (!$scope.hosting.businessName) {
                    $scope.error = "Seleccionar nombre de empresa.";
                    return;
                }
                if ($scope.hosting.contact.length == 0) {
                    $scope.error = "Agregue uno o mas contactos.";
                    return;
                }
            } else if ($scope.hosting.company === 0) {
                if (!$scope.hosting.document) {
                    $scope.error = "Ingrese documento.";
                    return;
                }
                if (!$scope.hosting.phone) {
                    $scope.error = "Ingrese numero de contacto.";
                    return;
                }
                if (!$scope.hosting.email) {
                    $scope.error = "Ingrese email de contacto.";
                    return;
                }
            }
            if (!$scope.hosting.serviceDescription) {
                $scope.error = "Ingrese descripción del servicio.";
                return;
            }
            if (!$scope.hosting.billingAddress) {
                $scope.error = "Ingrese dirección de facturación.";
                return;
            }
            if ($scope.hosting.products.length < 1) {
                $scope.error = "Ingrese uno o mas productos.";
                return;
            }
            $scope.hosting.accountStatus = $scope.hosting.accountStatus.name;
            $scope.hosting.borrado = 0;
            console.log("save", $scope.hosting);
            HostingServices.save($scope.hosting, function(err, result) {
                if (!err) {
                    $state.go("app.hosting");
                }
            });
        };
        $scope.openModal = function(product, index) {
            $scope.edit_product = product;
            ngDialog.open({
                template: "/app/components/Apps/catalogs/hosting/views/product.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        $scope.hosting.serviceCost = 0;
                        angular.forEach($scope.hosting.products, function(element, index) {
                            $scope.hosting.serviceCost += parseFloat(element.price);
                        });
                    },
                    cancel: function() {
                        ngDialog.close();
                        $scope.edit_product = undefined;
                    }
                }
            });
        };
        $scope.deleteModal = function() {
            ngDialog.open({
                template: "/app/components/Apps/catalogs/hosting/views/delete.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        HostingServices.remove({
                            id: idHosting
                        }, function(err, result) {
                            if (!err) {
                                $state.go("app.hosting");
                            } else {
                                $scope.error = err;
                            }
                        });
                    },
                    cancel: function() {
                        ngDialog.close();
                    }
                }
            });
        };
        function changeFormatDate(date) {
            if (date != null && typeof date == "object") {
                date = date.getUTCFullYear() + "-" + ("00" + (date.getUTCMonth() + 1)).slice(-2) + "-" + ("00" + date.getUTCDate()).slice(-2) + " " + ("00" + date.getUTCHours()).slice(-2) + ":" + ("00" + date.getUTCMinutes()).slice(-2) + ":" + ("00" + date.getUTCSeconds()).slice(-2);
                return date;
            }
        }
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("HostingsCtrl", [ "$scope", "$interval", "$rootScope", "$filter", "$timeout", "HostingServices", "ngDialog", function($scope, $interval, $rootScope, $filter, $timeout, HostingServices, ngDialog) {
        $scope.hostings = [];
        $scope.query = "";
        $scope.currentPage = 0;
        HostingServices.find($scope.currentPage, $scope.query, function(err, result, countItems) {
            if (!err) {
                $scope.hostings = result;
                $scope.total = countItems;
                console.log(result);
                angular.forEach(result, function(element, index) {
                    angular.forEach(element.products, function(e, i) {
                        e.hireDate = moment(e.hireDate, "DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY");
                        if (e.contractType.name == "ANUAL") {
                            e.nextExpiration = moment(e.hireDate, "DD/MM/YYYY").add("years", 1).format("DD/MM/YYYY");
                            var now = moment().format("DD/MM/YYYY");
                            var then = e.nextExpiration;
                            e.timeRemaining = moment(then, "DD/MM/YYYY").diff(moment(now, "DD/MM/YYYY"), "days") + 1;
                        } else if (e.contractType.name == "MENSUAL") {
                            e.nextExpiration = moment(e.hireDate, "DD/MM/YYYY").add("month", 1).format("DD/MM/YYYY");
                            var now = moment().format("DD/MM/YYYY");
                            var then = e.nextExpiration;
                            e.timeRemaining = moment(then, "DD/MM/YYYY").diff(moment(now, "DD/MM/YYYY"), "days") + 1;
                        }
                    });
                });
            }
        });
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("MailSenderCtrl", [ "$scope", "$state", "$stateParams", "$rootScope", "$filter", "$timeout", "MailSenderServices", "ngDialog", function($scope, $state, $stateParams, $rootScope, $filter, $timeout, MailSenderServices, ngDialog) {} ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("MailSendersCtrl", [ "$scope", "$interval", "$rootScope", "$filter", "$timeout", "MailSenderServices", "ngDialog", function($scope, $interval, $rootScope, $filter, $timeout, MailSenderServices, ngDialog) {} ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("MinSoftwareCtrl", [ "$scope", "$state", "$stateParams", "$rootScope", "$filter", "$timeout", "MinSoftwaresServices", "ngDialog", function($scope, $state, $stateParams, $rootScope, $filter, $timeout, MinSoftwaresServices, ngDialog) {} ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("MinSoftwaresCtrl", [ "$scope", "$interval", "$rootScope", "$filter", "$timeout", "MinSoftwaresServices", "ngDialog", function($scope, $interval, $rootScope, $filter, $timeout, MinSoftwaresServices, ngDialog) {} ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("ProductCtrl", [ "$scope", "$state", "$stateParams", "$rootScope", "$filter", "$timeout", "ProductServices", "ngDialog", function($scope, $state, $stateParams, $rootScope, $filter, $timeout, ProductServices, ngDialog) {
        $scope.data = {};
        $scope.access = [];
        $scope.product = {};
        $scope.selectStatus = [ "ACTIVO", "INACTIVO" ];
        $scope.query = "";
        $scope.currentPage = 0;
        var idProduct = $stateParams.id;
        if (idProduct) {
            ProductServices.findById(idProduct, function(err, response) {
                if (!err) {
                    var product = angular.copy(response);
                    console.log(product);
                    $scope.access = angular.copy(product.accessData);
                    $scope.product = angular.copy(product);
                }
            });
        }
        $scope.agregarAcceso = function() {
            $scope.access.push($scope.data);
            $scope.data = {};
        };
        $scope.deleteModal = function() {
            ngDialog.open({
                template: "/app/components/Apps/catalogs/products/views/delete.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        var product = angular.copy($scope.product);
                        if (!product.amountEmails) {
                            product.amountEmails = 0;
                        }
                        if (!product.amountDataBase) {
                            product.amountDataBase = 0;
                        }
                        if (!product.expiration) {
                            product.expiration = "2019-01-10 03:00:00";
                        }
                        if (product.type == "Administracion productos externos") {
                            product.accessData = angular.copy($scope.access);
                        }
                        product.borrado = 1;
                        ProductServices.save(product, function(err, result) {
                            if (!err) {
                                $state.go("app.products");
                            }
                        });
                    },
                    cancel: function() {
                        ngDialog.close();
                    }
                }
            });
        };
        $scope.save = function() {
            var product = angular.copy($scope.product);
            if (!product.amountEmails) {
                product.amountEmails = 0;
            }
            if (!product.amountDataBase) {
                product.amountDataBase = 0;
            }
            if (!product.expiration) {
                product.expiration = "2019-01-10 03:00:00";
            }
            if (product.type == "Administracion productos externos") {
                product.accessData = angular.copy($scope.access);
            }
            product.borrado = 0;
            ProductServices.save(product, function(err, result) {
                if (!err) {
                    $state.go("app.products");
                }
            });
        };
        function changeFormatDate(date) {
            if (date != null && typeof date == "object") {
                date = date.getUTCFullYear() + "-" + ("00" + (date.getUTCMonth() + 1)).slice(-2) + "-" + ("00" + date.getUTCDate()).slice(-2) + " " + ("00" + date.getUTCHours()).slice(-2) + ":" + ("00" + date.getUTCMinutes()).slice(-2) + ":" + ("00" + date.getUTCSeconds()).slice(-2);
                return date;
            }
        }
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("ProductsCtrl", [ "$scope", "$interval", "$rootScope", "$filter", "$timeout", "ProductServices", "ngDialog", function($scope, $interval, $rootScope, $filter, $timeout, ProductServices, ngDialog) {
        $scope.products = [];
        $scope.query = "";
        $scope.currentPage = 0;
        ProductServices.find($scope.currentPage, $scope.query, function(err, product, countItems) {
            if (!err) {
                $scope.products = product;
                $scope.total = countItems;
            }
        });
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("SmartHouseCtrl", [ "$scope", "$state", "$stateParams", "$rootScope", "$filter", "$timeout", "SmartHouseServices", "ngDialog", function($scope, $state, $stateParams, $rootScope, $filter, $timeout, SmartHouseServices, ngDialog) {} ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("SmartHousesCtrl", [ "$scope", "$interval", "$rootScope", "$filter", "$timeout", "SmartHouseServices", "ngDialog", function($scope, $interval, $rootScope, $filter, $timeout, SmartHouseServices, ngDialog) {} ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("BankCtrl", [ "$scope", "$state", "$stateParams", "$rootScope", "$filter", "$timeout", "BankServices", "ngDialog", function($scope, $state, $stateParams, $rootScope, $filter, $timeout, BankServices, ngDialog) {
        $scope.clients = [];
        $scope.client = {};
        $scope.users = [];
        $scope.user = {};
        $scope.select = {};
        $scope.bank = {};
        $scope.query = "";
        $scope.currentPage = 0;
        var idBank = $stateParams.id;
        if (idBank) {
            BankServices.findById(idBank, function(err, response) {
                if (!err) {
                    var bank = angular.copy(response);
                    console.log(bank);
                    if (bank.priceUsd && bank.priceUsd != "") {
                        bank.priceUsd = parseFloat(bank.priceUsd);
                    }
                    $scope.bank = angular.copy(bank);
                }
            });
        }
        $scope.save = function() {
            var bank = angular.copy($scope.bank);
            bank.borrado = 0;
            BankServices.save(bank, function(err, result) {
                if (!err) {
                    $state.go("app.banks");
                }
            });
        };
        function changeFormatDate(date) {
            if (date != null && typeof date == "object") {
                date = date.getUTCFullYear() + "-" + ("00" + (date.getUTCMonth() + 1)).slice(-2) + "-" + ("00" + date.getUTCDate()).slice(-2) + " " + ("00" + date.getUTCHours()).slice(-2) + ":" + ("00" + date.getUTCMinutes()).slice(-2) + ":" + ("00" + date.getUTCSeconds()).slice(-2);
                return date;
            }
        }
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("BanksCtrl", [ "$scope", "$interval", "$rootScope", "$filter", "$timeout", "BankServices", "ngDialog", function($scope, $interval, $rootScope, $filter, $timeout, BankServices, ngDialog) {
        $scope.banks = [];
        $scope.query = "";
        $scope.currentPage = 0;
        BankServices.find($scope.currentPage, $scope.query, function(err, bank, countItems) {
            if (!err) {
                $scope.banks = bank;
                $scope.total = countItems;
            }
        });
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("BillCtrl", [ "$scope", "$state", "$stateParams", "$rootScope", "$filter", "$timeout", "BillServices", "ngDialog", function($scope, $state, $stateParams, $rootScope, $filter, $timeout, BillServices, ngDialog) {
        $scope.bill = {};
        $scope.query = "";
        $scope.currentPage = 0;
        var idBill = $stateParams.id;
        if (idBill) {
            BillServices.findById(idBill, function(err, response) {
                if (!err) {
                    var bill = angular.copy(response);
                    console.log(bill);
                    if (bill.price && bill.price != "") {
                        bill.price = parseFloat(bill.price);
                    }
                    if (bill.date && bill.date != "") {
                        bill.date = new Date(bill.date);
                    }
                    $scope.bill = angular.copy(bill);
                }
            });
        }
        $scope.save = function() {
            var bill = angular.copy($scope.bill);
            bill.borrado = 0;
            bill.date = changeFormatDate(bill.date);
            bill.expirationTime = changeFormatDate(bill.date);
            BillServices.save(bill, function(err, result) {
                if (!err) {
                    $state.go("app.bills");
                }
            });
        };
        $scope.print = function(printpage) {
            var printContents = document.getElementById(printpage).innerHTML;
            var popupWin = window.open();
            popupWin.document.open();
            var styles = "<style>#bill-form{height:auto!important;width:110%!important ;margin:0!important;display: block; width:100%!important}.box{display:block;  height: 1000px;margin-left: 9%; margin-right: 5%;padding-top: 5%!important}.bill-input{border:0!important; height:35px;margin-left:2%}.billNumber{padding-left:21.5%!important;padding-top:4%!important}.rut-print{padding-top:1%!important;}.rut-print{padding-top:1%!important;}.date-print{padding-top:3.5%!important;padding-left:20%!important;}.text-print{padding-top:2%!important;}.price-print{padding-left:26%!important;padding-top:6.5%!important;height:25px!important}.factura{position:absolute!important;}.parte-izquierda{padding-left:26%!important}.first{padding-top:19%!important}.second{padding-top:1%!important}.third{padding-top:2.2%!important}.third input{height:20px!important}.date-text-print{display:block!important; }.date-bill{display:none!important;}.rut-input{width:50%!important;}</style>";
            var html = "<html><head>" + styles + '</head><body  onload="window.print()">' + printContents + "</body></html>";
            popupWin.focus();
            popupWin.document.write(html);
            popupWin.document.close();
        };
        function changeFormatDate(date) {
            if (date != null && typeof date == "object") {
                date = date.getUTCFullYear() + "-" + ("00" + (date.getUTCMonth() + 1)).slice(-2) + "-" + ("00" + date.getUTCDate()).slice(-2) + " " + ("00" + date.getUTCHours()).slice(-2) + ":" + ("00" + date.getUTCMinutes()).slice(-2) + ":" + ("00" + date.getUTCSeconds()).slice(-2);
                return date;
            }
        }
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("BillsCtrl", [ "$scope", "$interval", "$rootScope", "$filter", "$timeout", "BillServices", "ngDialog", function($scope, $interval, $rootScope, $filter, $timeout, BillServices, ngDialog) {
        $scope.bills = [];
        $scope.query = "";
        $scope.currentPage = 0;
        BillServices.find($scope.currentPage, $scope.query, function(err, bill, countItems) {
            if (!err) {
                console.log(bill);
                $scope.bills = bill;
                $scope.total = countItems;
            }
        });
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("BudgetCtrl", [ "$scope", "$state", "$stateParams", "$rootScope", "$filter", "$timeout", "BudgetServices", "ClientServices", "ngDialog", "$window", function($scope, $state, $stateParams, $rootScope, $filter, $timeout, BudgetServices, ClientServices, ngDialog, $window) {
        $scope.clients = [];
        $scope.client = {};
        $scope.select = {};
        $scope.statuses = [];
        $scope.concepts = [];
        $scope.budget = {};
        $scope.query = "";
        $scope.currentPage = 0;
        var idBudget = $stateParams.id;
        if (idBudget) {
            BudgetServices.findById(idBudget, function(err, response) {
                if (!err) {
                    var budget = angular.copy(response);
                    if (budget.date && budget.date != "") {
                        budget.date = new Date(budget.date);
                    }
                    if (budget.amount && budget.amount != "") {
                        budget.amount = parseFloat(budget.amount);
                    }
                    if (budget.hoursPayable && budget.hoursPayable != "") {
                        budget.hoursPayable = parseFloat(budget.hoursPayable);
                    }
                    if (budget.hoursTotal && budget.hoursTotal != "") {
                        budget.hoursTotal = parseFloat(budget.hoursTotal);
                    }
                    if (budget.idClient && budget.idClient != "") {
                        ClientServices.findById(budget.idClient, function(err, client) {
                            if (!err) {
                                $scope.select.client = client;
                            }
                        });
                    }
                    $scope.budget = angular.copy(budget);
                    console.log(budget);
                }
            });
        }
        ClientServices.find($scope.currentPage, $scope.query, function(err, clients, countItems) {
            if (!err) {
                $scope.clients = clients;
                $scope.total = countItems;
            }
        });
        BudgetServices.allStatus(function(err, status) {
            if (!err) {
                $scope.statuses = status;
            }
        });
        BudgetServices.allConcepts(function(err, concepts) {
            console.log(concepts);
            if (!err) {
                $scope.concepts = concepts;
            }
        });
        $scope.save = function() {
            var budget = angular.copy($scope.budget);
            if ($scope.select.client) {
                budget.idClient = $scope.select.client.id;
            }
            budget.active = 1;
            budget.date = changeFormatDate($scope.budget.date);
            budget.idUser = $window.localStorage["userId"];
            console.log("budget to save", budget);
            BudgetServices.save(budget, function(err, result) {
                if (!err) {
                    console.log(result);
                    $state.go("app.budgets");
                }
            });
        };
        function changeFormatDate(date) {
            if (date != null && typeof date == "object") {
                date = date.getUTCFullYear() + "-" + ("00" + (date.getUTCMonth() + 1)).slice(-2) + "-" + ("00" + date.getUTCDate()).slice(-2) + " " + ("00" + date.getUTCHours()).slice(-2) + ":" + ("00" + date.getUTCMinutes()).slice(-2) + ":" + ("00" + date.getUTCSeconds()).slice(-2);
                return date;
            }
        }
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("BudgetsCtrl", [ "$scope", "$interval", "$rootScope", "$filter", "$timeout", "BudgetServices", "ngDialog", "$http", "UserServices", function($scope, $interval, $rootScope, $filter, $timeout, BudgetServices, ngDialog, $http, UserServices) {
        $scope.budgets = [];
        $scope.query = "";
        $scope.currentPage = 0;
        $scope.filter = {};
        $scope.fill = {};
        $scope.users = [];
        $scope.select = {};
        $scope.totalAmount = {
            pesos: 0,
            usd: 0
        };
        var date = new Date();
        $scope.convToDate = function(date) {
            return new Date(date);
        };
        $scope.months = [ {
            id: 0,
            month: "ENE",
            dateIni: "01-01",
            dateEnd: "01-31"
        }, {
            id: 1,
            month: "FEB",
            dateIni: "02-01",
            dateEnd: "02-28"
        }, {
            id: 2,
            month: "MAR",
            dateIni: "03-01",
            dateEnd: "03-31"
        }, {
            id: 3,
            month: "APR",
            dateIni: "04-01",
            dateEnd: "04-30"
        }, {
            id: 4,
            month: "MAY",
            dateIni: "05-01",
            dateEnd: "05-31"
        }, {
            id: 5,
            month: "JUN",
            dateIni: "06-01",
            dateEnd: "06-30"
        }, {
            id: 6,
            month: "JUL",
            dateIni: "07-01",
            dateEnd: "07-31"
        }, {
            id: 7,
            month: "AGO",
            dateIni: "08-01",
            dateEnd: "08-31"
        }, {
            id: 8,
            month: "SEP",
            dateIni: "09-01",
            dateEnd: "09-30"
        }, {
            id: 9,
            month: "OCT",
            dateIni: "10-01",
            dateEnd: "10-31"
        }, {
            id: 10,
            month: "NOV",
            dateIni: "11-01",
            dateEnd: "11-30"
        }, {
            id: 11,
            month: "DEC",
            dateIni: "12-01",
            dateEnd: "12-31"
        } ];
        $scope.years = [ {
            id: 0,
            year: date.getFullYear()
        }, {
            id: 1,
            year: date.getFullYear() - 1
        }, {
            id: 2,
            year: date.getFullYear() - 2
        } ];
        $scope.getCotizacion = function() {
            $http({
                method: "GET",
                url: "https://api.lexart.com.uy/gp-beta/algorithm/scrap/ine.php"
            }).then(function successCallback(res) {
                var result = res.data;
                $scope.cotizacion = (result.dolar.buy + result.dolar.sell) / 2;
            });
        };
        $scope.getCotizacion();
        UserServices.find($scope.currentPage, $scope.query, function(err, users, countItems) {
            if (!err) {
                $scope.users = users;
                console.log(users);
                $scope.total = countItems;
            }
        });
        $scope.humanDate = function(date) {
            return new Date(date);
        };
        $scope.fill.month = $scope.months.find(function(month) {
            if (month.id == date.getMonth()) {
                return month;
            }
        });
        $scope.fill.year = $scope.years.find(function(year) {
            if (year.year == date.getFullYear()) {
                return year;
            }
        });
        $scope.query = $scope.fill.year.year + "-" + $scope.fill.month.dateIni + "/" + $scope.fill.year.year + "-" + $scope.fill.month.dateEnd;
        console.log($scope.query);
        $scope.changeMonth = function() {
            $scope.query = $scope.fill.year.year + "-" + $scope.fill.month.dateIni + "/" + $scope.fill.year.year + "-" + $scope.fill.month.dateEnd;
            console.log("fill: ", $scope.fill);
            search();
        };
        $scope.changeYear = function() {
            $scope.query = $scope.fill.year.year + "-" + $scope.fill.month.dateIni + "/" + $scope.fill.year.year + "-" + $scope.fill.month.dateEnd;
            console.log("fill: ", $scope.fill);
            search();
        };
        $scope.filterUsuario = function() {
            search();
        };
        var search = function() {
            console.log($scope.query);
            $scope.budgets = [];
            $scope.totalAmount.pesos = 0;
            $scope.totalAmount.usd = 0;
            console.log("SELECT::", $scope.select.user, $scope.query);
            if (!$scope.select.user) {
                BudgetServices.findByMonth($scope.currentPage, $scope.query, function(err, budgets, countItems) {
                    if (!err) {
                        console.log("budgets", budgets, countItems);
                        if (!budgets) {
                            return;
                        }
                        $scope.budgets = angular.copy(budgets.budgets);
                        if (budgets) {
                            if (!budgets.totalBudgets.totalPesos) {
                                $scope.totalAmount.pesos = 0;
                            } else {
                                $scope.totalAmount.pesos = budgets.totalBudgets.totalPesos;
                            }
                            if (!budgets.totalBudgets.totalDolares) {
                                $scope.totalAmount.usd = 0;
                            } else {
                                $scope.totalAmount.usd = budgets.totalBudgets.totalDolares;
                            }
                        } else {
                            $scope.totalAmount.pesos = 0;
                            $scope.totalAmount.usd = 0;
                        }
                        $scope.total = countItems;
                    }
                });
            } else {
                $scope.query += "/" + $scope.select.user.id;
                console.log($scope.query);
                BudgetServices.findByUserMonth($scope.currentPage, $scope.query, function(err, budgets, countItems) {
                    if (!err) {
                        console.log("budgets", budgets, countItems);
                        if (!budgets.budgets) {
                            return;
                        }
                        $scope.budgets = angular.copy(budgets.budgets);
                        if (budgets) {
                            if (!budgets.totalBudgets.totalPesos) {
                                $scope.totalAmount.pesos = 0;
                            } else {
                                $scope.totalAmount.pesos = budgets.totalBudgets.totalPesos;
                            }
                            if (!budgets.totalBudgets.totalDolares) {
                                $scope.totalAmount.usd = 0;
                            } else {
                                $scope.totalAmount.usd = budgets.totalBudgets.totalDolares;
                            }
                        } else {
                            $scope.totalAmount.pesos = 0;
                            $scope.totalAmount.usd = 0;
                        }
                        $scope.total = countItems;
                    }
                });
            }
        };
        search();
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("CalendarCtrl", [ "$scope", "CalendarServices", "$timeout", "uiCalendarConfig", "ngDialog", "UserServices", "$rootScope", "$filter", function($scope, CalendarServices, $timeout, uiCalendarConfig, ngDialog, UserServices, $rootScope, $filter) {
        var id = $rootScope.userId;
        var userRole = $rootScope.userRole;
        var eventosFijos = [];
        var eventoFijo = {};
        var horarioFijoAux = {};
        var horarioFijoExc = {};
        var diasAgregados = [];
        $scope.horariosFijosAux = [];
        $scope.arrayAux = [];
        $scope.selectedEvent = null;
        $scope.isFirstTime = true;
        $scope.events = [];
        $scope.startTime = [];
        $scope.endTime = [];
        $scope.filter = {
            user: id
        };
        $scope.users = [];
        $scope.startTimeFijo = {};
        $scope.endTimeFijo = {};
        $scope.eventsAux = {};
        $scope.startEnd = {};
        $scope.mostrarHorariosModal = [];
        var endMonthViewDate = {};
        $scope.horariosFijosAux = [];
        $scope.date = moment();
        $scope.eventSources = [ $scope.events ];
        var fechaActual = moment().format("MM-YYYY");
        var parseDate = moment($scope.date).toDate();
        $scope.fechaActualCompleta = moment().toDate();
        $scope.exceptions = [];
        $scope.todayIs = moment().format("DD/MM/YYYY");
        $scope.exceptionsAux = [];
        $scope.eventDeleted = [];
        $scope.filters = [];
        $scope.indexDeleted = null;
        $scope.currentMonthText = "";
        $scope.trackedEvents = [];
        $scope.diaAnterior = "";
        var count = 0;
        $scope.error = "";
        $scope.diaSeleccionado = {
            selected: {
                name: "Lunes",
                horarios: []
            }
        };
        $scope.mostrarInfo = [ {
            name: "",
            horarios: ""
        } ];
        $scope.horariosFijos = [ {
            name: "Lunes",
            horarios: []
        }, {
            name: "Martes",
            horarios: []
        }, {
            name: "Miercoles",
            horarios: []
        }, {
            name: "Jueves",
            horarios: []
        }, {
            name: "Viernes",
            horarios: []
        }, {
            name: "Sabado",
            horarios: []
        }, {
            name: "Domingo",
            horarios: []
        } ];
        function getUserEvents(id, fecha, cb) {
            var excepciones = [];
            var horariosFijos = [];
            var tracks = [];
            $scope.loading = true;
            CalendarServices.getUserEvents(id, function(err, result) {
                if (result) {
                    if (id != 0) {
                        angular.forEach(result, function(e) {
                            if (e.title == "Horario Fijo") {
                                e.dayCheck = moment(e.start).format("DD");
                                $scope.mostrarInfo.push({
                                    name: e.day,
                                    desde: moment(e.start).format("HH:mm"),
                                    hasta: moment(e.end).format("HH:mm")
                                });
                            }
                        });
                        horariosFijos = result;
                    }
                    CalendarServices.getUserExceptions(id, fecha, function(err, res) {
                        $scope.exceptions = res;
                        if ($scope.exceptions && res != "No hay excepciones para este mes") {
                            angular.forEach($scope.exceptions, function(e) {
                                $scope.mostrarInfo.push({
                                    name: e.day,
                                    desde: moment(e.start).format("HH:mm"),
                                    hasta: moment(e.end).format("HH:mm"),
                                    exception: true
                                });
                                e.hourStart = moment(e.start).format("HH:mm");
                                e.hourEnd = moment(e.end).format("HH:mm");
                            });
                        }
                        excepciones = res;
                        $scope.fechaTracking = $scope.currentMonth.split("-");
                        CalendarServices.getTrackedHours(id, $scope.fechaTracking[1] + "-" + $scope.fechaTracking[0] + "-" + "01", function(err, resultado) {
                            if (typeof resultado != "string") {
                                angular.forEach(resultado, function(t, index) {
                                    t.day = normalize(moment(t.start).format("dddd").toLowerCase());
                                    $scope.mostrarInfo.push({
                                        name: t.day,
                                        desde: moment(t.start).format("HH:mm"),
                                        hasta: moment(t.end).format("HH:mm"),
                                        trackedEvent: true
                                    });
                                    $scope.trackedEvents.push(t);
                                });
                            }
                            tracks = resultado;
                            cb(excepciones, horariosFijos, tracks);
                            $scope.loading = false;
                        });
                    });
                }
            });
        }
        $scope.uiConfig = {
            calendar: {
                timeZone: "UTC",
                defaultDate: moment().toDate(),
                buttonText: {
                    today: "Hoy",
                    month: "Mes"
                },
                customButtons: {
                    agregarHorario: {
                        text: "Horarios Fijos",
                        click: function() {
                            $scope.modalHorarioFijo();
                        }
                    },
                    semana: {
                        text: "Semana",
                        click: function() {
                            uiCalendarConfig.calendars["calendar"].fullCalendar("changeView", "agendaWeek");
                        }
                    },
                    hoy: {
                        text: "Hoy",
                        click: function() {
                            $scope.uiConfig.calendar.viewRender({
                                intervalEnd: {
                                    _d: moment($scope.fechaActualCompleta)
                                }
                            }, {});
                        }
                    }
                },
                locale: "es",
                height: 540,
                editable: false,
                selectable: true,
                nowIndicator: true,
                header: {
                    left: "today prev,next",
                    center: "title",
                    right: "agregarHorario month semana"
                },
                viewRender: function(view, element, prev, next) {
                    $scope.currentMonth = view.intervalEnd._d;
                    endMonthViewDate = view.intervalEnd._d;
                    $scope.currentMonth = moment($scope.currentMonth).format("MM-YYYY");
                    $scope.currentMonthText = moment(view.intervalEnd._d).format("MMMM YYYY");
                    diasAgregados = [];
                    $scope.refreshEventos($scope.filter.user, function(bool) {
                        if (bool) {
                            $scope.actualizarHorariosFijos();
                            $scope.changeView();
                        }
                    });
                },
                dayClick: function(selectedDate) {
                    $scope.date = angular.copy(selectedDate._d);
                    $scope.checkDate = $scope.date.getDate() + 1;
                    $scope.selectedDay = angular.copy(selectedDate.format("DD/MM/YYYY"));
                    var fechaClick = moment($scope.date).add(1, "days");
                    var fechaDeHoy = moment();
                    if (moment().diff(fechaClick) < 0) {
                        $scope.diaAnterior = true;
                    }
                    $scope.modalEventos();
                },
                eventClick: function(event) {
                    var auxDate = moment(event.start).toDate();
                    $scope.date = angular.copy(auxDate);
                    $scope.checkDate = $scope.date.getDate();
                    $scope.selectedDay = angular.copy(event.start.format("DD/MM/YYYY"));
                    $scope.modalEventos();
                },
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: function(event, element) {
                    if (event.user_exceptions_id) {
                        element.css("background-color", "#f95c33");
                        element.css("border-color", "#f95c33");
                    } else if (event.id_track) {
                        element.css("background-color", "#32AA2C");
                        element.css("border-color", "#32AA2C");
                    } else {
                        element.css("background-color", "rgb(3, 155, 229)");
                        element.css("border-color", "rgb(3, 155, 229)");
                    }
                }
            }
        };
        $scope.addEvent = function() {
            $scope.parseDate = moment($scope.date).toDate();
            $scope.parseDate.setDate($scope.parseDate.getDate() + 1);
            $scope.eventsAux = {
                dayCheck: angular.copy($scope.checkDate),
                day: moment($scope.date).format("DD"),
                dayDescription: moment($scope.date).format("dddd"),
                title: "",
                start: $scope.parseDate,
                end: $scope.parseDate,
                hourStart: null,
                hourEnd: null,
                allDay: false,
                user_id: $scope.filter.user,
                momentStart: moment($scope.eventsAux.start)
            };
            $scope.events.push($scope.eventsAux);
        };
        var dateView = moment();
        $scope.crearArrayPostExceptions = function() {
            $scope.exceptionsAux = [];
            angular.forEach($scope.events, function(e) {
                if (e.dayCheck == $scope.checkDate) {
                    e.start = moment(e.start).format("YYYY-MM-DD") + " " + e.hourStart + ":00";
                    e.end = moment(e.end).format("YYYY-MM-DD") + " " + e.hourEnd + ":00";
                    dateView = moment(e.start).format("YYYY-MM-DD");
                    if (e.dayDescription) {
                        e.day = e.dayDescription;
                    }
                    $scope.exceptionsAux.push(e);
                }
            });
            $scope.f = $scope.currentMonth.split("-");
            CalendarServices.postUserExceptions($scope.exceptionsAux, $scope.filter.user, $scope.f[1] + "-" + $scope.f[0] + "-" + $scope.checkDate, function(err, result) {
                $scope.uiConfig.calendar.viewRender({
                    intervalEnd: {
                        _d: dateView
                    }
                }, {});
            });
        };
        $scope.btwDatesH = function(day, desde, hasta, type) {
            var verify = 0;
            $scope.error = "";
            if (type == "hf") {
                angular.forEach($scope.horariosFijos, function(hF, index) {
                    if (hF.name.toLowerCase() == day) {
                        angular.forEach(hF.horarios, function(h, index) {
                            var start = moment(h.desde + ":00", "HH:mm:ss");
                            var end = moment(h.hasta + ":00", "HH:mm:ss");
                            if (moment(desde + ":00", "HH:mm:ss").isBetween(start, end) || moment(hasta + ":00", "HH:mm:ss").isBetween(start, end)) {
                                verify = verify + 1;
                            }
                            if (start.isBetween(moment(desde + ":00", "HH:mm:ss"), moment(hasta + ":00", "HH:mm:ss")) || end.isBetween(moment(desde + ":00", "HH:mm:ss"), moment(hasta + ":00", "HH:mm:ss"))) {
                                verify = verify + 1;
                            }
                        });
                    }
                    if (verify > 0) {
                        $scope.error = "Los horarios no se pueden superponer";
                    } else {
                        $scope.error = "";
                    }
                });
            }
        };
        $scope.callCalendar = function() {
            $scope.uiConfig.calendar.viewRender({
                intervalEnd: {
                    _d: moment($scope.currentMonth, "MM-YYYY") || dateView
                }
            }, {});
        };
        $scope.btwDatesE = function(day, desde, hasta, index) {
            var verify = 0;
            $scope.error = "";
            day = day.getDate();
            if (!desde || !hasta) {
                setTimeout(function() {
                    $scope.error = "Debes ingresar hora inicial y final para poder continuar";
                    return;
                }, 1e3);
            }
            angular.forEach($scope.events, function(e, ind) {
                if (e.dayCheck == $scope.checkDate && e.title != "Horario Fijo" && e.dayCheck == day) {
                    var start = moment(e.hourStart + ":00", "HH:mm:ss");
                    var end = moment(e.hourEnd + ":00", "HH:mm:ss");
                    if (moment(desde + ":00", "HH:mm:ss").isBetween(start, end) || moment(hasta + ":00", "HH:mm:ss").isBetween(start, end)) {
                        verify = verify + 1;
                    }
                    if (start.isBetween(moment(desde + ":00", "HH:mm:ss"), moment(hasta + ":00", "HH:mm:ss")) || end.isBetween(moment(desde + ":00", "HH:mm:ss"), moment(hasta + ":00", "HH:mm:ss"))) {
                        verify = verify + 1;
                    }
                    if (verify > 0) {
                        if (index == ind) {
                            e.error = true;
                            $scope.indexDeleted = index;
                        }
                        $scope.error = "Los horarios no se pueden superponer";
                    } else {
                        $scope.error = "";
                    }
                }
            });
        };
        $scope.changeView = function() {
            uiCalendarConfig.calendars["calendar"].fullCalendar("refetchEvents");
        };
        $scope.selectedDates = function(evento, fechaMonth, fechaDiaAnio) {
            if (typeof fechaMonth == "string") {
                fechaMonth = new Date(fechaMonth);
            }
            if (!moment.isMoment(fechaDiaAnio)) {
                fechaDiaAnio = moment(fechaDiaAnio);
            }
            var month = fechaMonth.getMonth();
            var dateStr = fechaDiaAnio.get("date") + "-" + (month + 1) + "-" + fechaDiaAnio.get("year");
            $scope.newDateStart = dateStr + " " + evento.hourStart;
            $scope.newDateEnd = dateStr + " " + evento.hourEnd;
            var dateParsedStart = moment($scope.newDateStart, "DD-MM-YYYY hh:mm:ss");
            var dateParsedEnd = moment($scope.newDateEnd, "DD-MM-YYYY hh:mm:ss");
            evento.start = moment(dateParsedStart).toDate();
            evento.end = moment(dateParsedEnd).toDate();
            return evento;
        };
        $scope.remove = function(index) {
            $scope.events.splice(index, 1);
            angular.forEach($scope.events, function(e, index) {
                if (e.error) {
                    $scope.error = "Los horarios no se pueden superponer";
                    return;
                } else {
                    $scope.error = "";
                }
            });
        };
        if (userRole == "admin" || userRole == "pm") {
            UserServices.find(0, "", function(err, users) {
                if (!err) {
                    $scope.users = users.sort(function(a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (a.name < b.name) {
                            return -1;
                        }
                        return 0;
                    });
                    $scope.users.unshift({
                        id: 0,
                        name: "Todos"
                    });
                }
            });
        }
        $scope.cleanEvents = function(cb) {
            $scope.trackedEvents = [];
            $scope.events = [];
            $scope.mostrarInfo = [];
            $scope.eventSources[0] = [];
            $scope.horariosFijos = [ {
                name: "Lunes",
                horarios: []
            }, {
                name: "Martes",
                horarios: []
            }, {
                name: "Miercoles",
                horarios: []
            }, {
                name: "Jueves",
                horarios: []
            }, {
                name: "Viernes",
                horarios: []
            }, {
                name: "Sabado",
                horarios: []
            }, {
                name: "Domingo",
                horarios: []
            } ];
            cb(true);
        };
        $scope.refreshEventos = function(id, cb) {
            $scope.cleanEvents(function(bool) {
                if (bool) {
                    getUserEvents(id, $scope.currentMonth, function(exc, hF, tracks) {
                        if (exc || hF || tracks) {
                            $scope.eventSources[0] = $scope.events;
                            cb(bool);
                        }
                    });
                }
            });
        };
        $scope.armarHorarioFijoPost = function() {
            $scope.horariosFijosAux = angular.copy($scope.horariosFijos);
            angular.forEach($scope.horariosFijosAux, function(hF, index) {
                hF.name = hF.name.toLowerCase();
                angular.forEach(hF.horarios, function(h) {
                    hF.user_id = $scope.filter.user;
                    hF.start = moment().format("YYYY-MM-DD") + " " + h.desde + ":00";
                    hF.end = moment().format("YYYY-MM-DD") + " " + h.hasta + ":00";
                    h.desde = moment().format("YYYY-MM-DD") + " " + h.desde + ":00";
                    h.hasta = moment().format("YYYY-MM-DD") + " " + h.hasta + ":00";
                });
            });
        };
        $scope.modalHorarioFijo = function(event) {
            setTimeout(function() {
                document.activeElement.blur();
            }, 100);
            $scope.error = "";
            ngDialog.open({
                name: "modalHorarioFijo",
                template: "/app/components/calendar/views/definirHorarioFijo.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        $scope.actualizarHorariosFijos();
                        $scope.armarHorarioFijoPost();
                        $scope.cleanEvents(function(bool) {
                            if (bool) {
                                $scope.horariosFijosAux.push({
                                    id: $scope.filter.user
                                });
                                CalendarServices.postUserEvents($scope.horariosFijosAux, function(err, result) {
                                    $scope.uiConfig.calendar.viewRender({
                                        intervalEnd: {
                                            _d: dateView
                                        }
                                    }, {});
                                });
                                $scope.horariosFijosAux = [];
                            }
                        });
                        ngDialog.close();
                    },
                    cancel: function() {
                        ngDialog.close();
                    }
                }
            });
        };
        $scope.modalEventos = function() {
            console.log($scope.events);
            $scope.error = "";
            ngDialog.open({
                template: "/app/components/calendar/views/editarEventosDia.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        if ($scope.error == "") {
                            $scope.crearArrayPostExceptions();
                            ngDialog.close();
                        }
                        $scope.diaAnterior = false;
                    },
                    cancel: function() {
                        if ($scope.indexDeleted) {
                            $scope.events.splice($scope.indexDeleted, 1);
                        }
                        $scope.diaAnterior = false;
                        ngDialog.close();
                    }
                }
            });
        }, $scope.addHorarioFijo = function(day, t) {
            $scope.error = "";
            if (t == undefined || t.hourStart == undefined || t.hourEnd == undefined) {
                $scope.error = "Nos has ingresado los horarios correctamente";
            } else {
                $scope.btwDatesH(day.toLowerCase(), t.hourStart, t.hourEnd, "hf");
                if ($scope.error == "") {
                    $scope.mostrarInfo.push({
                        name: day.toLowerCase(),
                        desde: t.hourStart,
                        hasta: t.hourEnd
                    });
                }
            }
        };
        $scope.actualizarHorariosFijos = function() {
            angular.forEach($scope.horariosFijos, function(day, index) {
                angular.forEach($scope.mostrarInfo, function(dayInfo, indexInfo) {
                    if (dayInfo.name.toLowerCase() == day.name.toLowerCase() && !dayInfo.exception && !dayInfo.trackedEvent) {
                        $scope.arrayAux.push({
                            desde: dayInfo.desde,
                            hasta: dayInfo.hasta
                        });
                        day.horarios = $scope.arrayAux;
                    }
                });
                setHorariosFijos($scope.currentMonth, function(bool) {});
                $scope.arrayAux = [];
            });
        };
        $scope.eliminarRegistro = function(index) {
            $scope.mostrarInfo.splice(index, 1);
            $scope.horariosFijos = [ {
                name: "Lunes",
                horarios: []
            }, {
                name: "Martes",
                horarios: []
            }, {
                name: "Miercoles",
                horarios: []
            }, {
                name: "Jueves",
                horarios: []
            }, {
                name: "Viernes",
                horarios: []
            }, {
                name: "Sabado",
                horarios: []
            }, {
                name: "Domingo",
                horarios: []
            } ];
            $scope.actualizarHorariosFijos();
        };
        var eventoAux = {
            title: "Activo",
            start: null,
            end: null,
            hourStart: null,
            hourEnd: null,
            allDay: false
        };
        function createUserExceptionTitle(r) {
            var result = r.title;
            if (userRole == "admin" || userRole == "pm") {
                var usrName = $filter("filter")($scope.users, {
                    id: r.user_id
                })[0].name;
                result = usrName.toUpperCase() + " - " + r.title;
            }
            return result;
        }
        function setHorariosFijos(mesActual, callback) {
            var cant = moment(mesActual, "YYYY-MM").daysInMonth();
            eventosFijos = [];
            for (var i = 1; i <= cant; i++) {
                var dia = angular.copy(i);
                var weekDayName = moment(dia + "-" + mesActual, "DD-MM-YYYY").format("dddd").toLowerCase();
                var check = moment(dia + "-" + $scope.currentMonth, "DD-MM-YYYY");
                if (moment().diff(check) > 0) {
                    if ($scope.trackedEvents.length > 0) {
                        angular.forEach($scope.trackedEvents, function(t, index) {
                            if (t.start && t.end && !t.trackedEvent) {
                                if (moment(t.start).toDate() < moment($scope.fechaActualCompleta).add(-1, "days").toDate()) {
                                    t.dayCheck = moment(t.start).format("DD");
                                    t.hourStart = moment(t.start).format("HH:mm");
                                    t.hourEnd = moment(t.end).format("HH:mm");
                                    t.trackedEvent = true;
                                    $scope.eventSources[0].push(t);
                                }
                            }
                        });
                    }
                }
                angular.forEach($scope.horariosFijos, function(hF, index) {
                    angular.forEach($scope.exceptions, function(r, index) {
                        if (r.start) {
                            r.dayCheck = moment(r.start).format("DD");
                            if (i == r.dayCheck && !r.added) {
                                r.title = createUserExceptionTitle(r);
                                $scope.eventSources[0].push(r);
                                r.added = true;
                                diasAgregados.push(i);
                            }
                        }
                    });
                    if (hF.horarios.length > 0 && hF.name.toLowerCase() == normalize(weekDayName)) {
                        if (diasAgregados.includes(i)) {
                            return;
                        } else {
                            angular.forEach(hF.horarios, function(h, index) {
                                eventoAux.day = i;
                                eventoAux.title = "Horario Fijo";
                                eventoAux.hourStart = angular.copy(h.desde);
                                eventoAux.hourEnd = angular.copy(h.hasta);
                                var fecha = moment(dia + "-" + mesActual, "DD-MM-YYYY");
                                eventoFijo = angular.copy($scope.selectedDates(eventoAux, fecha.toDate(), fecha));
                                if (eventoFijo.start >= moment().add(-1, "days").toDate()) {
                                    $scope.eventSources[0].push(eventoFijo);
                                    eventoFijo = {};
                                }
                            });
                            diasAgregados.push(i);
                        }
                    }
                });
            }
            callback(true);
        }
        var normalize = function() {
            var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc", mapping = {};
            for (var i = 0, j = from.length; i < j; i++) mapping[from.charAt(i)] = to.charAt(i);
            return function(str) {
                var ret = [];
                for (var i = 0, j = str.length; i < j; i++) {
                    var c = str.charAt(i);
                    if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]); else ret.push(c);
                }
                return ret.join("");
            };
        }();
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("ClientCtrl", [ "$scope", "$state", "$stateParams", "$filter", "ClientServices", "ngDialog", "$rootScope", function($scope, $state, $stateParams, $filter, ClientServices, ngDialog, $rootScope) {
        $scope.client = {};
        $scope.visits = [];
        $scope.sendingData = false;
        var idClient = $stateParams.id;
        if (idClient) {
            ClientServices.findById(idClient, function(err, client) {
                if (!err) {
                    console.log("client:", client);
                    $scope.client = client;
                }
            });
        }
        $scope.save = function() {
            $scope.error = "";
            console.log("client to save", $scope.client);
            $scope.sendingData = true;
            if (!$scope.client.company || !$scope.client.name) {
                $rootScope.showToaster("Please fill all fields", "error");
                $scope.sendingData = false;
                return;
            }
            ClientServices.save($scope.client, function(err, result) {
                if (err) {
                    console.log("error", err);
                    $rootScope.showToaster(err.message || err.error.message || err.error || err, "error");
                    $sendingData = false;
                } else {
                    $state.go("app.clients");
                }
            });
        };
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("ClientsCtrl", [ "$scope", "$timeout", "ClientServices", "ngDialog", function($scope, $timeout, ClientServices, ngDialog) {
        $scope.clients = [];
        $scope.filter = {};
        $scope.query = "";
        $scope.currentPage = 0;
        ClientServices.find($scope.currentPage, $scope.query, function(err, clients, countItems) {
            if (!err) {
                console.log("clients", clients, countItems);
                $scope.clients = clients;
                $scope.total = countItems;
            }
        });
        $scope.pager = function(page) {
            var offset = PAGE_SIZE * (page - 1);
            ClientServices.find(offset, $scope.query, function(err, clients, countItems) {
                console.log("clients", clients);
                $scope.clients = clients;
            });
        };
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("DashboardCtrl", [ "$scope", "$rootScope", "$state", "$stateParams", "$filter", "TracksServices", "TasksServices", "ngDialog", function($scope, $rootScope, $state, $stateParams, $filter, TracksServices, TasksServices, ngDialog) {
        $scope.tracks = [];
        $scope.allTasks = [];
        $scope.developerTracks = [];
        $scope.total = "";
        $scope.loading = false;
        $scope.trackDates = {
            start: moment(),
            end: moment()
        };
        var userId = $rootScope.userId;
        var userRole = $rootScope.userRole;
        function checkTime(i) {
            i = i < 1 ? 0 : i;
            if (i < 10) i = "0" + i;
            return i;
        }
        function getTotalTime(ms) {
            var h = checkTime(Math.floor(ms / 3600));
            ms = Math.floor(ms % 3600);
            var m = checkTime(Math.floor(ms / 60));
            ms = Math.floor(ms % 60);
            var s = checkTime(Math.floor(ms));
            return h + ":" + m + ":" + s;
        }
        function toSQLFormat(d) {
            return moment(d, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
        }
        $scope.findHistory = function() {
            TracksServices.findHistory(function(err, tracks) {
                if (!err) {
                    $scope.loading = false;
                    $scope.history = tracks;
                    $scope.history.forEach(function(item) {
                        item.startTimeDisplay = moment(item.startTime).format("ddd DD MMMM YYYY HH:mm");
                        item.endTimeDisplay = moment(item.endTime).format("HH:mm");
                        item.timeTracked = moment.duration(moment(item.endTime).diff(moment(item.startTime))).asHours().toFixed(2);
                    });
                }
            });
        };
        $rootScope.handleTrack = async function(item, fromDashboard = false) {
            $scope.loading = true;
            if ($rootScope.timerRunning) {
                $scope.stopTrack();
            } else {
                await $scope.startTrack(item, fromDashboard);
            }
            $scope.findHistory();
        };
        $scope.createTrackDirectly = function(task) {
            if (!$scope.trackDates.start || !$scope.trackDates.end) return $rootScope.showToaster("Please, set a start and an ending date", "error");
            const start = moment($scope.trackDates.start, "DD/MM/YYYY HH:mm:ss");
            const end = moment($scope.trackDates.end, "DD/MM/YYYY HH:mm:ss");
            if (end.diff(start) < 0) return $rootScope.showToaster("Ending date must be bigger than start date", "error");
            const payload = {
                idUser: $rootScope.userId,
                idTask: task.idTask,
                taskName: task.name,
                projectName: task.projectName,
                startTime: toSQLFormat($scope.trackDates.start),
                endTime: toSQLFormat($scope.trackDates.end),
                idProyecto: task.projectId,
                typeTrack: task.typeTrack,
                currency: task.currency
            };
            TracksServices.create(payload, function(err, result) {
                if (!err) {
                    console.log("🚀 --\x3e result", result);
                    $rootScope.showToaster("Track created succesfully", "success");
                    $scope.findHistory();
                }
            });
        };
        if (userRole == "client") {
            TasksServices.findByIdClient($rootScope.userIdClient, function(err, tasks) {
                if (!err) {
                    $scope.history = tracks;
                    $scope.history.forEach(function(item) {
                        item.startTimeDisplay = moment(item.startTime).format("ddd DD MMMM YYYY HH:mm");
                        item.endTimeDisplay = moment(item.endTime).format("HH:mm");
                        item.timeTracked = moment.duration(moment(item.endTime).diff(moment(item.startTime))).asHours().toFixed(2);
                    });
                }
            });
        }
        $scope.findDataForAdmin = (() => {
            TracksServices.findActives(function(err, tracks) {
                if (!err) {
                    console.log("tracks", tracks);
                    $scope.tracks = tracks;
                    _.each(tracks, function(track) {
                        track.startTime = new Date(track.startTime).getTime();
                    });
                }
            });
        });
        $scope.findDataForClient = (() => {
            TasksServices.findByIdClient($rootScope.userIdClient, function(err, tasks) {
                if (!err) {
                    $scope.allTasks = angular.copy(tasks);
                    console.log("tasksClient", $scope.allTasks);
                }
            });
            TracksServices.findActives(function(err, tracks) {
                if (!err) {
                    console.log("tracks", tracks);
                    $scope.tracks = [];
                    _.each(tracks, function(track, index) {
                        console.log(track);
                        track.startTime = new Date(track.startTime).getTime();
                        $scope.allTasks.forEach(function(task, index) {
                            if (task.id == track.idTask) {
                                $scope.tracks.push(track);
                                return false;
                            }
                        });
                    });
                }
            });
        });
        $scope.findDataForUser = (() => {
            TracksServices.getUserTracks(userId, function(err, tracks) {
                if (!err) {
                    console.log("tracks", tracks);
                    $scope.tracks = tracks;
                    var ms = 0;
                    _.each(tracks, function(track) {
                        track.startTime = new Date(track.startTime).getTime();
                        track.endTime = new Date(track.endTime).getTime();
                        if (track.duration.indexOf("-") !== -1) {
                            track.duration = "";
                        } else {
                            ms += track.endTime - track.startTime;
                            console.log("ms: " + ms);
                        }
                    });
                    $scope.total = getTotalTime(ms / 1e3);
                }
            });
        });
        if (userRole == "admin" || userRole == "pm") {
            $scope.findHistory();
            $scope.findDataForAdmin();
        } else if (userRole == "client") {
            $scope.findDataForClient();
        } else if (userRole == "developer") {
            $scope.findHistory();
        } else {
            findDataForUser();
        }
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("EvalCtrl", [ "$scope", "$interval", "$state", "$rootScope", "$filter", "$timeout", "UserServices", "ClientServices", "ProjectsServices", "TracksServices", "ngDialog", "WeeklyHourServices", "TasksServices", function($scope, $interval, $state, $rootScope, $filter, $timeout, UserServices, ClientServices, ProjectsServices, TracksServices, ngDialog, WeeklyHourServices, TasksServices) {
        $scope.developers = [];
        UserServices.find($scope.currentPage, $scope.query, function(err, users, countItems) {
            if (!err) {
                $scope.users = users;
                for (var i = 0; i < $scope.users.length; i++) {
                    if ($scope.users[i].role == "developer") {
                        $scope.developers.push($scope.users[i]);
                        $scope.total = countItems;
                        console.log("role users::", $scope.developers);
                    }
                }
            }
        });
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("EvalFormCtrl", [ "$scope", "$state", "$rootScope", "UserServices", "$stateParams", "TasksServices", "EvaluateServices", "ngDialog", function($scope, $state, $rootScope, UserServices, $stateParams, TasksServices, EvaluateServices, ngDialog) {
        var user = $stateParams.id;
        $scope.userEval = {};
        $scope.userTask = {};
        $scope.evaluacion = {};
        UserServices.findById(user, function(err, result) {
            $scope.userEval = result;
        });
        TasksServices.findByUserEval(user, function(err, result) {
            console.log("Task user", err, result);
            $scope.userTask = result;
            $scope.selected = {
                value: $scope.userTask
            };
            console.log("Projects select::", $scope.userTask, $scope.selected);
        });
        $scope.save = function(userEval) {
            userEval.idAdmin = $rootScope.userId;
            if (userEval.fecha) {
                var month = Number(moment(userEval.fecha).month()) + 1;
                userEval.fecha = moment(userEval.fecha).year() + "/" + month + "/" + moment(userEval.fecha).date();
                console.log(userEval.fecha);
            }
            console.log("userEval", userEval);
            EvaluateServices.save(userEval, function(err, result) {
                console.log("Evaluacion guardada", err, result);
            });
        };
        EvaluateServices.find(user, function(err, result) {
            $scope.evaluacion = result;
            for (var i = 0; i < $scope.evaluacion.length; i++) {
                if ($scope.evaluacion[i].mes < 10) {
                    $scope.evaluacion[i].mes = "0" + $scope.evaluacion[i].mes;
                }
                if ($scope.evaluacion[i].dia < 10) {
                    $scope.evaluacion[i].dia = "0" + $scope.evaluacion[i].dia;
                }
            }
        });
        $scope.evalEdit = function(value) {
            console.log("$scope.fecha1", value);
            $scope.eval = value;
            ngDialog.open({
                template: "/app/components/evaluate/views/evaluateEdit.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        $scope.eval.dia = moment($scope.eval.fecha).date();
                        if ($scope.eval.dia < 10) {
                            $scope.eval.dia = "0" + $scope.eval.dia;
                        }
                        $scope.eval.mes = moment($scope.eval.fecha).month() + 1;
                        if ($scope.eval.mes < 10) {
                            $scope.eval.mes = "0" + $scope.eval.mes;
                        }
                        $scope.eval.year = moment($scope.eval.fecha).year();
                        console.log("$scope.fecha1", $scope.eval);
                        EvaluateServices.save($scope.eval, function(err, result) {
                            console.log(err, result);
                            ngDialog.close();
                        });
                    },
                    cancel: function() {
                        ngDialog.close();
                        $scope.sendingData = false;
                    }
                }
            });
        };
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("FinanceCtrl", [ "$scope", "$state", "$stateParams", "$rootScope", "$filter", "$timeout", "FinanceServices", "UserServices", "ngDialog", function($scope, $state, $stateParams, $rootScope, $filter, $timeout, FinanceServices, UserServices, ngDialog) {
        $scope.users = [];
        $scope.user = {};
        $scope.select = {};
        $scope.statuses = [];
        $scope.concepts = [];
        $scope.types = [];
        $scope.finance = {};
        $scope.query = "";
        $scope.currentPage = 0;
        FinanceServices.allTypes(function(err, types) {
            if (!err) {
                $scope.types = types;
                console.log(types);
            }
        });
        FinanceServices.allConcepts(function(err, concepts) {
            console.log("concepts  ", concepts);
            if (!err) {
                $scope.concepts = concepts;
                console.log("concepts", $scope.concepts);
            }
        });
        var idFinance = $stateParams.id;
        if (idFinance) {
            console.log(idFinance);
            FinanceServices.findById(idFinance, function(err, response) {
                if (!err) {
                    var finance = angular.copy(response);
                    if (finance.date && finance.date != "") {
                        finance.date = new Date(finance.date);
                    }
                    if (finance.amount && finance.amount != "") {
                        finance.amount = parseFloat(finance.amount);
                    }
                    if (finance.idUser && finance.idUser != "") {
                        UserServices.findById(finance.idUser, function(err, user) {
                            if (!err) {
                                $scope.select.user = user;
                            }
                        });
                    }
                    if (finance.type && finance.type != "") {
                        $scope.types.forEach(function(type) {
                            if (type.type == finance.type) {
                                $scope.select.type = type;
                            }
                        });
                    }
                    $scope.finance = angular.copy(finance);
                    console.log("finanza", finance);
                }
            });
        }
        UserServices.find($scope.currentPage, $scope.query, function(err, users, countItems) {
            if (!err) {
                $scope.users = users;
                $scope.total = countItems;
                $scope.select.user = $scope.users[2];
            }
        });
        FinanceServices.allStatus(function(err, status) {
            console.log("status  ", status);
            if (!err) {
                $scope.statuses = status;
                console.log($scope.statuses);
            }
        });
        $scope.save = function() {
            var finance = angular.copy($scope.finance);
            console.log("select", $scope.select);
            if ($scope.select.user) {
                finance.idUser = $scope.select.user.id;
            }
            if ($scope.select.type) {
                finance.type = $scope.select.type.type;
            }
            finance.active = 1;
            finance.date = changeFormatDate($scope.finance.date);
            finance.concept = finance.concept.concept;
            console.log("finance to save ", finance);
            FinanceServices.save(finance, function(err, result) {
                if (!err) {
                    console.log(result);
                    $state.go("app.finances");
                }
            });
        };
        function changeFormatDate(date) {
            if (date != null && typeof date == "object") {
                date = date.getUTCFullYear() + "-" + ("00" + (date.getUTCMonth() + 1)).slice(-2) + "-" + ("00" + date.getUTCDate()).slice(-2) + " " + ("00" + date.getUTCHours()).slice(-2) + ":" + ("00" + date.getUTCMinutes()).slice(-2) + ":" + ("00" + date.getUTCSeconds()).slice(-2);
                return date;
            }
        }
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("FinancesCtrl", [ "$scope", "$interval", "$rootScope", "$filter", "$timeout", "FinanceServices", "ngDialog", function($scope, $interval, $rootScope, $filter, $timeout, FinanceServices, ngDialog) {
        $scope.finances = [];
        $scope.query = "";
        $scope.currentPage = 0;
        $scope.filter = {};
        $scope.fill = {};
        $scope.convToDate = function(date) {
            return new Date(date);
        };
        $scope.months = [ {
            id: 0,
            month: "ENE",
            dateIni: "01-01",
            dateEnd: "01-31"
        }, {
            id: 1,
            month: "FEB",
            dateIni: "02-01",
            dateEnd: "02-28"
        }, {
            id: 2,
            month: "MAR",
            dateIni: "03-01",
            dateEnd: "03-31"
        }, {
            id: 3,
            month: "APR",
            dateIni: "04-01",
            dateEnd: "04-30"
        }, {
            id: 4,
            month: "MAY",
            dateIni: "05-01",
            dateEnd: "05-31"
        }, {
            id: 5,
            month: "JUN",
            dateIni: "06-01",
            dateEnd: "06-30"
        }, {
            id: 6,
            month: "JUL",
            dateIni: "07-01",
            dateEnd: "07-31"
        }, {
            id: 7,
            month: "AGO",
            dateIni: "08-01",
            dateEnd: "08-31"
        }, {
            id: 8,
            month: "SEP",
            dateIni: "09-01",
            dateEnd: "09-30"
        }, {
            id: 9,
            month: "OCT",
            dateIni: "10-01",
            dateEnd: "10-31"
        }, {
            id: 10,
            month: "NOV",
            dateIni: "11-01",
            dateEnd: "11-30"
        }, {
            id: 11,
            month: "DEC",
            dateIni: "12-01",
            dateEnd: "12-31"
        } ];
        $scope.years = [ {
            id: 0
        } ];
        var date = new Date();
        $scope.years = [ {
            id: 0,
            year: date.getFullYear()
        }, {
            id: 1,
            year: date.getFullYear() - 1
        }, {
            id: 2,
            year: date.getFullYear() - 2
        } ];
        $scope.fill.month = $scope.months.find(function(month) {
            if (month.id == date.getMonth()) {
                return month;
            }
        });
        $scope.fill.year = $scope.years.find(function(year) {
            if (year.year == date.getFullYear()) {
                return year;
            }
        });
        $scope.query = $scope.fill.year.year + "-" + $scope.fill.month.dateIni + "/" + $scope.fill.year.year + "-" + $scope.fill.month.dateEnd;
        console.log($scope.query);
        $scope.changeMonth = function() {
            $scope.query = $scope.fill.year.year + "-" + $scope.fill.month.dateIni + "/" + $scope.fill.year.year + "-" + $scope.fill.month.dateEnd;
            console.log("fill: ", $scope.fill);
            search();
        };
        $scope.changeYear = function() {
            $scope.query = $scope.fill.year.year + "-" + $scope.fill.month.dateIni + "/" + $scope.fill.year.year + "-" + $scope.fill.month.dateEnd;
            console.log("fill: ", $scope.fill);
            search();
        };
        var search = function() {
            console.log("query", $scope.query);
            FinanceServices.findByMonth($scope.currentPage, $scope.query, function(err, finances, countItems) {
                if (!err) {
                    console.log("finances", finances, countItems);
                    $scope.finances = finances;
                    $scope.total = countItems;
                }
            });
        };
        search();
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("HourCostCtrl", [ "$scope", "$state", "$stateParams", "$rootScope", "$filter", "$timeout", "HourCostServices", "ClientServices", "UserServices", "ngDialog", function($scope, $state, $stateParams, $rootScope, $filter, $timeout, HourCostServices, ClientServices, UserServices, ngDialog) {
        $scope.clients = [];
        $scope.client = {};
        $scope.users = [];
        $scope.user = {};
        $scope.select = {};
        $scope.hourCost = {};
        $scope.query = "";
        $scope.currentPage = 0;
        var idHourCost = $stateParams.id;
        if (idHourCost) {
            HourCostServices.findById(idHourCost, function(err, response) {
                if (!err) {
                    var hourCost = angular.copy(response);
                    console.log(hourCost);
                    if (hourCost.date && hourCost.date != "") {
                        hourCost.date = new Date(hourCost.date);
                    }
                    if (hourCost.costClient && hourCost.costClient != "") {
                        hourCost.costClient = parseFloat(hourCost.costClient);
                    }
                    if (hourCost.costUser && hourCost.costUser != "") {
                        hourCost.costUser = parseFloat(hourCost.costUser);
                    }
                    if (hourCost.idClient && hourCost.idClient != "") {
                        ClientServices.findById(hourCost.idClient, function(err, client) {
                            if (!err) {
                                $scope.select.client = client;
                            }
                        });
                    }
                    if (hourCost.idUser && hourCost.idUser != "") {
                        UserServices.findById(hourCost.idUser, function(err, user) {
                            if (!err) {
                                $scope.select.user = user;
                            }
                        });
                    }
                    $scope.hourCost = angular.copy(hourCost);
                }
            });
        }
        ClientServices.find($scope.currentPage, $scope.query, function(err, clients, countItems) {
            if (!err) {
                $scope.clients = clients;
                $scope.total = countItems;
            }
        });
        UserServices.find($scope.currentPage, $scope.query, function(err, users, countItems) {
            if (!err) {
                $scope.users = users;
                $scope.total = countItems;
            }
        });
        $scope.save = function() {
            var hourCost = angular.copy($scope.hourCost);
            console.log($scope.select);
            if ($scope.select.client) {
                hourCost.idClient = $scope.select.client.id;
            }
            if ($scope.select.user) {
                hourCost.idUser = $scope.select.user.id;
            }
            hourCost.active = 1;
            hourCost.date = changeFormatDate($scope.hourCost.date);
            HourCostServices.save(hourCost, function(err, result) {
                if (!err) {
                    console.log(result);
                    $state.go("app.hoursCost");
                }
            });
        };
        function changeFormatDate(date) {
            if (date != null && typeof date == "object") {
                date = date.getUTCFullYear() + "-" + ("00" + (date.getUTCMonth() + 1)).slice(-2) + "-" + ("00" + date.getUTCDate()).slice(-2) + " " + ("00" + date.getUTCHours()).slice(-2) + ":" + ("00" + date.getUTCMinutes()).slice(-2) + ":" + ("00" + date.getUTCSeconds()).slice(-2);
                return date;
            }
        }
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("HoursCostCtrl", [ "$scope", "$interval", "$rootScope", "$filter", "$timeout", "HourCostServices", "ngDialog", function($scope, $interval, $rootScope, $filter, $timeout, HourCostServices, ngDialog) {
        $scope.hoursCost = [];
        $scope.query = "";
        $scope.currentPage = 0;
        HourCostServices.find($scope.currentPage, $scope.query, function(err, hoursCost, countItems) {
            if (!err) {
                console.log(hoursCost);
                $scope.hoursCost = hoursCost;
                $scope.total = countItems;
            }
        });
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("ProjectCtrl", [ "$scope", "$rootScope", "$state", "$stateParams", "$filter", "$http", "ProjectsServices", "ClientServices", "UserServices", "ngDialog", "TasksServices", function($scope, $rootScope, $state, $stateParams, $filter, $http, ProjectsServices, ClientServices, UserServices, ngDialog, TasksServices) {
        $scope.project = {
            active: {
                name: "Active",
                value: 1
            }
        };
        $scope.task = {};
        $scope.duration = {};
        $scope.tasks = [];
        $scope.clients = [];
        $scope.users = [];
        $scope.comments = [];
        $scope.comment = {};
        $scope.usersAux = {};
        $scope.review = {};
        $scope.sendingData = false;
        var idProject = $stateParams.id;
        $scope.allStatus = [ "To-do", "Done", "In-Progress", "In-Review" ];
        $scope.state = "";
        var convertTime = function(value) {
            var h = moment.duration(value).hours();
            var m = moment.duration(value).minutes();
            var s = moment.duration(value).seconds();
            var d = moment.duration(value).days();
            if (d > 0) {
                d = d * 24;
                console.log("DIAS A HORAS", d);
            }
            if (h <= 9) {
                h = "0" + h;
            }
            if (m <= 9) {
                m = "0" + m;
            }
            if (s <= 9) {
                s = "0" + s;
            }
            if (d > 0) {
                h = Number(d) + Number(h);
            }
            var finalTracked = h + ":" + m + ":" + s;
            console.log("finaltracked", finalTracked);
            return finalTracked;
        };
        ClientServices.find(0, "", function(err, clients) {
            if (!err) {
                console.log("clients:", clients);
                $scope.clients = clients;
            }
        });
        if (idProject) {
            ProjectsServices.findById(idProject, function(err, project) {
                if (!err) {
                    console.log("project:", project);
                    $scope.project = project;
                    if ($scope.project.active === "1") {
                        $scope.project.active = {
                            name: "Active",
                            value: 1
                        };
                    } else {
                        $scope.project.active = {
                            name: "Inactive",
                            value: 0
                        };
                    }
                    if ($scope.project.duration) {
                        var newDate = $scope.project.duration.split(":", 3);
                        $scope.duration["hours"] = parseInt(newDate[0], 10);
                        $scope.duration["minutes"] = parseInt(newDate[1], 10);
                        $scope.duration["seconds"] = parseInt(newDate[2], 10);
                        console.log("duracion proyecto", $scope.duration);
                    }
                    ProjectsServices.getProjectTasks(idProject, function(err, tasks) {
                        if (!err) {
                            console.log("tasks:", tasks);
                            $scope.tasks = tasks;
                        }
                    });
                }
            });
        }
        UserServices.find(0, "", function(err, users) {
            if (!err) {
                console.log("users", users);
                $scope.users = users;
            }
        });
        $scope.addTask = function() {
            $scope.task = {};
            $scope.comments = [];
            $scope.state = "";
            $scope.usersAux = {};
            $scope.task.hour = 0;
            $scope.task.mins = 0;
            $scope.task.secs = 0;
            $scope.task.startDate = moment();
            $scope.task.endDate = moment().add(1, "month");
            console.log("addtask", $scope.task);
            ngDialog.open({
                template: "/app/components/projects/views/project.task.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        console.log("undefined task", $scope.task);
                        if ($scope.task.name === undefined) {
                            var msg = "El campo Nombre no puede estar vacio.";
                            ngDialog.open({
                                template: "/app/shared/views/alert.modal.html",
                                showClose: true,
                                scope: $scope,
                                disableAnimation: true,
                                data: {
                                    msg: msg,
                                    titleRequired: "Alerta"
                                }
                            });
                        } else {
                            console.log("push task");
                            if (idProject) {
                                $scope.task.idProject = idProject;
                                $scope.task.comments = JSON.stringify($scope.comments);
                                if ($scope.task.startDate) {
                                    var arrStart = $scope.task.startDate.split("/");
                                    $scope.task.startDate = new Date(arrStart[2], arrStart[1] - 1, arrStart[0]);
                                }
                                if ($scope.task.endDate) {
                                    var arrStart = $scope.task.endDate.split("/");
                                    $scope.task.endDate = new Date(arrStart[2], arrStart[1] - 1, arrStart[0]);
                                }
                                if (!$scope.task.status) {
                                    $scope.task.status = $scope.allStatus[0];
                                }
                                $scope.task.users = [];
                                console.log($scope.usersAux);
                                for (var user in $scope.usersAux) {
                                    console.log(user);
                                    if ($scope.usersAux[user]) {
                                        $scope.task.users.push({
                                            idUser: user
                                        });
                                    }
                                }
                                if ($scope.task.hour == undefined || $scope.task.hour == null) {
                                    $scope.task.hour = "00";
                                }
                                if ($scope.task.mins == undefined || $scope.task.mins == null) {
                                    $scope.task.mins = "00";
                                }
                                if ($scope.task.secs == undefined || $scope.task.secs == null) {
                                    $scope.task.secs = "00";
                                }
                                $scope.emailUsers = angular.copy($scope.task.users);
                                $scope.task.users = JSON.stringify($scope.task.users);
                                $scope.task.duration = ($scope.task.hour < 10 ? "0" + $scope.task.hour : $scope.task.hour) + ":" + ($scope.task.mins < 10 ? "0" + $scope.task.mins : $scope.task.mins) + ":" + ($scope.task.secs < 10 ? "0" + $scope.task.secs : $scope.task.secs);
                                console.log("Tarea guardada", $scope.task);
                                ProjectsServices.saveProjectTask($scope.task, function(err, result) {
                                    if (!err) {
                                        ProjectsServices.getProjectTasks(idProject, function(err, tasks) {
                                            if (!err) {
                                                console.log("tasks:", tasks);
                                                $scope.tasks = tasks;
                                            }
                                        });
                                    }
                                });
                            } else {
                                console.log("else");
                                $scope.task.users = [];
                                console.log($scope.usersAux);
                                for (var user in $scope.usersAux) {
                                    console.log(user);
                                    if ($scope.usersAux[user]) {
                                        $scope.task.users.push({
                                            idUser: user
                                        });
                                    }
                                }
                                if ($scope.task.hour == undefined || $scope.task.hour == null) {
                                    $scope.task.hour = "00";
                                }
                                if ($scope.task.mins == undefined || $scope.task.mins == null) {
                                    $scope.task.mins = "00";
                                }
                                if ($scope.task.secs == undefined || $scope.task.secs == null) {
                                    $scope.task.secs = "00";
                                }
                                $scope.emailUsers = angular.copy($scope.task.users);
                                $scope.task.users = JSON.stringify($scope.task.users);
                                $scope.task.duration = $scope.task.hour + ":" + $scope.task.mins + ":" + $scope.task.secs;
                                $scope.tasks.push($scope.task);
                                $scope.task = {};
                            }
                            ngDialog.close();
                        }
                    },
                    cancel: function() {
                        ngDialog.close();
                    }
                }
            });
            $scope.error = "";
        };
        $scope.editTask = function(index, task) {
            $scope.task = angular.copy(task);
            console.log("start date find", $scope.task);
            var arrDuracion = $scope.task.duration.split(":");
            console.log("Array duracion", arrDuracion);
            $scope.task.hour = parseInt(arrDuracion[0]);
            $scope.task.mins = parseInt(arrDuracion[1]);
            $scope.task.secs = parseInt(arrDuracion[2]);
            if ($scope.task.startDate) {
                $scope.task.startDate = moment($scope.task.startDate).format("DD/MM/YYYY");
            }
            if ($scope.task.endDate) {
                $scope.task.endDate = moment($scope.task.endDate).format("DD/MM/YYYY");
            }
            $scope.state = $scope.task.status;
            if ($scope.task.comments) {
                var arr = $scope.task.comments.split('"comment":');
                var arr = $scope.task.comments ? $scope.task.comments.split('"comment":') : Array();
                if (arr[0] == "[{") {
                    $scope.comments = JSON.parse($scope.task.comments);
                } else {
                    $scope.comments = [];
                }
            }
            console.log("$scope.task", $scope.task);
            if ($scope.task.users) {
                $scope.task.users = JSON.parse($scope.task.users);
                _.each($scope.task.users, function(user) {
                    $scope.usersAux[user.idUser] = true;
                });
            } else {
                $scope.task.users = [];
            }
            ngDialog.open({
                template: "/app/components/projects/views/project.task.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        if ($scope.task.name === undefined) {
                            var msg = "El campo Nombre no puede estar vacio.";
                            ngDialog.open({
                                template: "/app/shared/views/alert.modal.html",
                                showClose: true,
                                scope: $scope,
                                disableAnimation: true,
                                data: {
                                    msg: msg,
                                    titleRequired: "Alerta"
                                }
                            });
                        } else {
                            if ($scope.task.hour == undefined || $scope.task.hour == null) {
                                $scope.task.hour = "00";
                            }
                            if ($scope.task.mins == undefined || $scope.task.mins == null) {
                                $scope.task.mins = "00";
                            }
                            if ($scope.task.secs == undefined || $scope.task.secs == null) {
                                $scope.task.secs = "00";
                            }
                            $scope.task.duration = ($scope.task.hour < 10 ? "0" + $scope.task.hour : $scope.task.hour) + ":" + ($scope.task.mins < 10 ? "0" + $scope.task.mins : $scope.task.mins) + ":" + ($scope.task.secs < 10 ? "0" + $scope.task.secs : $scope.task.secs);
                            console.log("push task");
                            $scope.task.users = [];
                            console.log($scope.usersAux);
                            for (var user in $scope.usersAux) {
                                console.log(user);
                                if ($scope.usersAux[user]) {
                                    $scope.task.users.push({
                                        idUser: user
                                    });
                                }
                            }
                            $scope.emailUsers = angular.copy($scope.task.users);
                            $scope.task.users = JSON.stringify($scope.task.users);
                            $scope.task.comments = JSON.stringify($scope.comments);
                            if ($scope.task.id) {
                                if ($scope.task.startDate) {
                                    var arrStart = $scope.task.startDate.split("/");
                                    $scope.task.startDate = new Date(arrStart[2], arrStart[1] - 1, arrStart[0]);
                                }
                                if ($scope.task.endDate) {
                                    var arrStart = $scope.task.endDate.split("/");
                                    $scope.task.endDate = new Date(arrStart[2], arrStart[1] - 1, arrStart[0]);
                                }
                                console.log($scope.emailUsers);
                                console.log("TASK TO UPDATE", $scope.task);
                                ProjectsServices.saveProjectTask($scope.task, function(err, result) {
                                    console.log("result:: ", result);
                                    if (!err) {
                                        $scope.tasks[index] = angular.copy($scope.task);
                                        $scope.task = {};
                                    }
                                });
                            } else {
                                if ($scope.task.idProject) {
                                    if ($scope.task.startDate) {
                                        var arrStart = $scope.task.startDate.split("/");
                                        $scope.task.startDate = new Date(arrStart[2], arrStart[1] - 1, arrStart[0]);
                                    }
                                    if ($scope.task.endDate) {
                                        var arrStart = $scope.task.endDate.split("/");
                                        $scope.task.endDate = new Date(arrStart[2], arrStart[1] - 1, arrStart[0]);
                                    }
                                    console.log("TASK TO UPDATE else", $scope.task);
                                    ProjectsServices.saveProjectTask($scope.task, function(err, result) {
                                        console.log("result:: ", result);
                                        if (!err) {
                                            $scope.tasks[index] = angular.copy($scope.task);
                                            $scope.task = {};
                                        }
                                    });
                                } else {
                                    if ($scope.task.startDate) {
                                        var arrStart = $scope.task.startDate.split("/");
                                        $scope.task.startDate = new Date(arrStart[2], arrStart[1] - 1, arrStart[0]);
                                    }
                                    if ($scope.task.endDate) {
                                        var arrStart = $scope.task.endDate.split("/");
                                        $scope.task.endDate = new Date(arrStart[2], arrStart[1] - 1, arrStart[0]);
                                    }
                                    console.log("TASK TO UPDATE else", $scope.task);
                                    ProjectsServices.saveProjectTask($scope.task, function(err, result) {
                                        console.log("result:: ", result);
                                        if (!err) {
                                            $scope.tasks[index] = angular.copy($scope.task);
                                            $scope.task = {};
                                        }
                                    });
                                }
                            }
                            ngDialog.close();
                        }
                    },
                    cancel: function() {
                        $scope.task = {};
                        ngDialog.close();
                    }
                }
            });
            $scope.error = "";
        };
        $scope.changeStatus = function() {
            console.log($scope.task.status, $scope.state);
            if ($scope.state == "In-Progress" && $scope.task.status == "In-Review") {
                console.log("OPEN MODAL");
                ngDialog.open({
                    template: "/app/components/projects/views/project.task-review.modal.html",
                    showClose: true,
                    scope: $scope,
                    disableAnimation: true,
                    data: {
                        confirm: function() {
                            console.log($scope.review);
                            var windowIDs = ngDialog.getOpenDialogs();
                            sendEmail($scope.task, $scope.review.user);
                            ngDialog.close(windowIDs[1]);
                        },
                        cancel: function() {
                            var windowIDs = ngDialog.getOpenDialogs();
                            ngDialog.close(windowIDs[1]);
                        }
                    }
                });
            }
            $scope.state = $scope.task.status;
        };
        $scope.agregarComentario = function() {
            if ($scope.comment.comment) {
                $scope.comment.userName = $rootScope.userName;
                console.log($scope.comment);
                $scope.comments.push($scope.comment);
                $scope.comment = {};
            }
        };
        $scope.editComments = function(index, comment) {
            $scope.oldComment = angular.copy(comment);
            $scope.comment.comment = angular.copy(comment.comment);
            $scope.comments.splice(index, 1);
            ngDialog.open({
                template: "/app/components/projects/views/project.task-comment.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        console.log($scope.review);
                        var windowIDs = ngDialog.getOpenDialogs();
                        $scope.agregarComentario();
                        ngDialog.close(windowIDs[1]);
                    },
                    cancel: function() {
                        $scope.comments.splice(index, 0, $scope.oldComment);
                        var windowIDs = ngDialog.getOpenDialogs();
                        ngDialog.close(windowIDs[1]);
                    }
                }
            });
        };
        $scope.openModalComentario = function() {
            $scope.comment = {};
            ngDialog.open({
                template: "/app/components/projects/views/project.task-comment.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        console.log($scope.review);
                        var windowIDs = ngDialog.getOpenDialogs();
                        $scope.agregarComentario();
                        ngDialog.close(windowIDs[1]);
                    },
                    cancel: function() {
                        var windowIDs = ngDialog.getOpenDialogs();
                        ngDialog.close(windowIDs[1]);
                    }
                }
            });
        };
        $scope.save = function() {
            $scope.error = "";
            console.log("project to save", $scope.project);
            if ($scope.project.name === undefined || $scope.project.idClient === undefined || $scope.project.presupuesto === undefined || $scope.project.description === undefined) {
                if ($scope.project.name === undefined) {
                    var msg = "El campo Nombre no puede estar vacio.";
                } else if ($scope.project.idClient === undefined) {
                    var msg = "El campo Cliente no puede estar vacio.";
                } else if ($scope.project.presupuesto === undefined) {
                    var msg = "El campo Budget no puede estar vacio.";
                } else if ($scope.project.description === undefined) {
                    var msg = "El campo Description no puede estar vacio.";
                }
                $rootScope.showToaster(msg, "error");
            } else {
                if ($scope.duration.hours == undefined || $scope.duration.hours == null) {
                    $scope.duration.hours = parseInt("00");
                }
                if ($scope.duration.minutes == undefined || $scope.duration.minutes == null) {
                    $scope.duration.minutes = parseInt("00");
                }
                if ($scope.duration.seconds == undefined || $scope.duration.seconds == null) {
                    $scope.duration.seconds = parseInt("00");
                }
                $scope.project.duration = $scope.duration.hours + ":" + $scope.duration.minutes + ":" + $scope.duration.seconds;
                console.log("project to save", $scope.project);
                $scope.sendingData = true;
                if (typeof $scope.project.active !== "number") {
                    $scope.project.active = $scope.project.active.value;
                }
                if (idProject) {
                    ProjectsServices.save($scope.project, function(err, result) {
                        if (err) {
                            console.log("error", err);
                            $sendingData = false;
                        } else {
                            console.log("TASKs", $scope.tasks);
                            angular.forEach($scope.tasks, function(task, index) {
                                if (task.users) {
                                    var usersEmail = JSON.parse(task.users);
                                }
                                task.comments = JSON.stringify(task.comments);
                                angular.forEach(usersEmail, function(userEmail) {
                                    console.log(userEmail);
                                    task.projectName = $scope.project.name;
                                    angular.forEach($scope.users, function(user) {
                                        if (userEmail.idUser == user.id) {
                                            console.log("MANDAR MAIL", task);
                                            sendEmail(task, user);
                                        }
                                    });
                                });
                            });
                            $state.go("app.projects");
                        }
                    });
                } else {
                    ProjectsServices.save($scope.project, function(err, result) {
                        if (err) {
                            console.log("error", err);
                            $sendingData = false;
                        } else {
                            var waiting = $scope.tasks.length;
                            var idProject = result.id;
                            _.each($scope.tasks, function(task) {
                                if (task.users) {
                                    var usersEmail = JSON.parse(task.users);
                                    angular.forEach(usersEmail, function(userEmail) {
                                        console.log(usersEmail);
                                        angular.forEach($scope.users, function(user) {
                                            if (userEmail.idUser == user.id) {
                                                console.log("MANDAR MAIL", userEmail, user);
                                                sendEmail(task, user);
                                            }
                                        });
                                    });
                                }
                                task.idProject = idProject;
                                console.log("TASK", task);
                                ProjectsServices.saveProjectTask(task, function(err, result) {
                                    if (!err) {
                                        finish();
                                    }
                                });
                            });
                            function finish() {
                                waiting--;
                                if (waiting == 0) {
                                    $state.go("app.projects");
                                }
                            }
                        }
                        $state.go("app.projects");
                    });
                }
            }
        };
        $scope.deleteTask = function(index, id) {
            console.log("id delete task", id, index);
            ngDialog.open({
                template: "/app/shared/views/delete.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    msg: "Esta seguro que desea eliminar la tarea?",
                    confirm: function() {
                        TasksServices.remove(id, function(err, result) {
                            console.log("Tarea eliminada::", err, result);
                            $scope.tasks = $scope.tasks.slice(0, index).concat($scope.tasks.slice(index + 1));
                            console.log("Tasks delete", $scope.tasks);
                        });
                    },
                    cancel: function() {
                        ngDialog.close(windowIDs[1]);
                    }
                }
            });
        };
        function sendEmail(task, user) {
            console.log("task email", task);
            var html = "<style>.container {width: 100%;display: flex;flex-direction: column;text-align: left;}.container ul .email_list {list-style: none;font-size: 14px;font-weight: bold;padding-bottom: 8px;}.container .message{padding-left: 40px;}.email_link{font-size: 14px;color: #42acc5;font-weight: bold;text-decoration: none;}</style>";
            html += "<div class='container'>";
            html += "<div>";
            html += "<h4>" + task.name + "-" + task.projectName + "</h4>";
            html += "<ul>";
            html += "<li class='email_list' >Proyecto: " + task.projectName + "</li>";
            html += "<li class='email_list'>Tarea: " + task.name + "</li>";
            html += "<li class='email_list'>Descripcion: " + task.description ? task.description : "Sin descripción" + "</li>";
            html += "</ul>";
            html += "</div>";
            html += "<div class='message'>";
            html += "</div></div>";
            var current_host = window.location.origin + "/#/app/tasks";
            var mailSend = {
                site_title: "Lexartlabs",
                topic: task.projectName + " - " + task.name,
                to_email: user.email,
                headers: {
                    from_email: "lextracking@lexartlabs.com",
                    bcc_emails: "facundo.torterola@lexartlabs.com"
                },
                body: {
                    big_logo: "https://lextracking.lexartlabs.com/assets/images/lextracking-logo.svg",
                    little_logo: "https://lextracking.lexartlabs.com/assets/images/lextracking-logo.svg",
                    html_body: html,
                    footer_color: "#F9F9F9;color:#F95C33 !important;font-size: 10px",
                    footer_one: "Lexartlabs",
                    footer_two: "<a class='email_link' href='" + current_host + "'>Ir a Lextracking<a/>"
                }
            };
            console.log("TO AQUI");
            console.log("MAIL TO SEND", mailSend);
            $http({
                method: "POST",
                url: "https://mail-api.lexartlabs.com/mail/smtp/new",
                data: mailSend,
                contentType: "application/json;charset=utf-8"
            }).then(function(response) {
                if (response.data.response == "email_sent_correct") {
                    console.log("Sent");
                }
            });
        }
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("ProjectsCtrl", [ "$scope", "$rootScope", "$timeout", "$filter", "ProjectsServices", "TracksServices", "ngDialog", function($scope, $rootScope, $timeout, $filter, ProjectsServices, ngDialog, TracksServices) {
        $scope.projects = [];
        $scope.allProjects = [];
        $scope.filter = {};
        $scope.query = "";
        $scope.currentPage = 0;
        var timeout;
        $scope.$watch("filter", function() {
            $timeout.cancel(timeout);
            timeout = $timeout(function() {
                $scope.filterProjects();
            }, 250);
        }, true);
        if ($rootScope.isAdmin == "true") {
            ProjectsServices.find($scope.currentPage, $scope.query, function(err, projects, countItems) {
                if (!err) {
                    console.log("projects", projects, countItems);
                    $scope.allProjects = projects;
                    $scope.projects = projects.slice(0, PAGE_SIZE - 1);
                    $scope.total = projects.length;
                }
            });
        } else if ($rootScope.isClient == "true") {
            ProjectsServices.getProjectsByClient($rootScope.userIdClient, function(err, projects) {
                console.log(err, projects);
                if (!err) {
                    console.log("projects", projects);
                    $scope.allProjects = projects;
                    $scope.projects = angular.copy($scope.allProjects);
                }
            });
        } else {
            ProjectsServices.find($scope.currentPage, $scope.query, function(err, projects, countItems) {
                if (!err) {
                    console.log("projects", projects, countItems);
                    $scope.allProjects = projects;
                    $scope.projects = projects.slice(0, PAGE_SIZE - 1);
                    $scope.total = projects.length;
                }
            });
        }
        $scope.filterProjects = function() {
            $scope.currentPage = 0;
            $scope.projects = $filter("filter")($scope.allProjects, $scope.filter);
            if ($scope.projects) {
                $scope.total = $scope.projects.length;
                $scope.projects = $scope.projects.slice(0, PAGE_SIZE - 1);
            }
        };
        $scope.pager = function(page) {
            var offset = PAGE_SIZE * (page - 1);
            $scope.projects = $scope.allProjects.slice(offset, offset + PAGE_SIZE - 1);
        };
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("ReportsCtrl", [ "$scope", "$interval", "$state", "$rootScope", "$filter", "$timeout", "UserServices", "ClientServices", "ProjectsServices", "TracksServices", "ngDialog", "WeeklyHourServices", "TasksServices", "SaleServices", function($scope, $interval, $state, $rootScope, $filter, $timeout, UserServices, ClientServices, ProjectsServices, TracksServices, ngDialog, WeeklyHourServices, TasksServices, SaleServices) {
        $scope.users = [];
        $scope.clients = [];
        $scope.client = {};
        $scope.duration = {};
        $scope.projects = [];
        $scope.tracks = [];
        $scope.total = 0;
        $scope.subtotals = {};
        $scope.filter = {};
        $scope.filtername = {};
        $scope.userName = [];
        $scope.clientName = [];
        $scope.userDuration = [];
        $scope.clientDuration = [];
        $scope.totalHours = [];
        $scope.totalHours2 = [];
        $scope.totalHoursTrello = [];
        $scope.excelName;
        $scope.totalcost = 0;
        $scope.totalcost2 = 0;
        $scope.totalcost3 = 0;
        $scope.totalcost4 = 0;
        $scope.sumAll = 0;
        $scope.finalHour = "00:00:00";
        $scope.finalTotal = 0;
        var cost = [];
        var res = [];
        $scope.sumHours = [];
        $scope.sumHoursAuto = [];
        $scope.sumHoursTrelo = [];
        $scope.allProjectsTab = [];
        $scope.arrSubtotal = [];
        $scope.subTotalCost = [];
        $scope.costSubtotal = {};
        $scope.hoursArr = [];
        $scope.mssArr = [];
        $scope.verifyMss = [];
        $scope.arrCost = [];
        $scope.filter.idTask = 0;
        $scope.totalCostTrelloPesos = 0;
        $scope.totalCostTrelloReales = 0;
        $scope.totalCostTrelloDolares = 0;
        $scope.totalCostManualPesos = 0;
        $scope.totalCostManualReales = 0;
        $scope.totalCostManualDolares = 0;
        $scope.totalCostPesos = 0;
        $scope.totalCostReales = 0;
        $scope.totalCostDolares = 0;
        $scope.totalDuration = 0;
        $scope.CurrTotalCost = "";
        $scope.clientTotalDev = {};
        $scope.clientTotals = {};
        var userId = $rootScope.userId;
        var userRole = $rootScope.userRole;
        function createExcel() {
            var date = moment().format();
            var newDate = date.split("T");
            var day = newDate[0];
            var splitDate = newDate[1].split("-");
            var time = splitDate[0];
            var name = $rootScope.userName;
            var end = name + "_" + day + "_" + time;
            return end;
        }
        $scope.excelName = createExcel();
        function checkTime(i) {
            i = i < 1 ? 0 : i;
            if (i < 10) i = "0" + i;
            return i;
        }
        $scope.cleanTotals = function() {
            $scope.totalCostTrelloPesos = 0;
            $scope.totalCostTrelloReales = 0;
            $scope.totalCostTrelloDolares = 0;
            $scope.totalCostManualPesos = 0;
            $scope.totalCostManualReales = 0;
            $scope.totalCostManualDolares = 0;
            $scope.totalCostPesos = 0;
            $scope.totalCostReales = 0;
            $scope.totalCostDolares = 0;
            $scope.totalDuration = 0;
        };
        $scope.getTotalHours = function() {
            setTimeout(function() {
                $scope.totalDuration = convertTime(moment.duration($scope.total).add($scope.total3));
            }, 1500);
        };
        var convertTime = function(value) {
            var h = moment.duration(value).hours();
            var m = moment.duration(value).minutes();
            var s = moment.duration(value).seconds();
            var d = moment.duration(value).days();
            if (d > 0) {
                d = d * 24;
            }
            if (h <= 9) {
                h = "0" + h;
            }
            if (m <= 9) {
                m = "0" + m;
            }
            if (s <= 9) {
                s = "0" + s;
            }
            if (d > 0) {
                h = Number(d) + Number(h);
            }
            var finalTracked = h + ":" + m + ":" + s;
            return finalTracked;
        };
        function getHours(value) {
            if (userRole != "client") {
                $scope.finalHour = convertTime(moment.duration($scope.finalHour).add(value));
            } else {
                ProjectsServices.getProjectsByUser(userId, function(err, res) {
                    $scope.userCost = Object.entries(res);
                    $scope.finalHour = $scope.userCost[0][1]["tracked"];
                });
            }
        }
        function getTotalCost(ms) {
            if (userRole == "admin" || userRole == "pm") {
                var idHourCost = $rootScope.trackId;
            } else {
                var idHourCost = $rootScope.userId;
            }
        }
        function getSubTotalCost(mss) {
            $scope.mssArr.push(mss.mss);
        }
        function getTotalTime(ms, cost) {
            var h = checkTime(Math.floor(ms / 3600));
            ms = Math.floor(ms % 3600);
            var m = checkTime(Math.floor(ms / 60));
            ms = Math.floor(ms % 60);
            var s = checkTime(Math.floor(ms));
            return h + ":" + m + ":" + s;
        }
        function getTotalAutoCost(msc) {
            if (userRole == "admin" || userRole == "pm") {
                var idHourCost = $rootScope.trackId;
            } else {
                var idHourCost = $rootScope.userId;
            }
        }
        function getTotalTimeAuto(msc, cost) {
            var h = checkTime(Math.floor(msc / 3600));
            msc = Math.floor(msc % 3600);
            var m = checkTime(Math.floor(msc / 60));
            msc = Math.floor(msc % 60);
            var s = checkTime(Math.floor(msc));
            return h + ":" + m + ":" + s;
        }
        function getTotalTrelloCost(mst) {
            if (userRole == "admin" || userRole == "pm") {
                var idHourCost = $rootScope.trackId;
            } else {
                var idHourCost = $rootScope.userId;
            }
        }
        function getTotalTimeTrello(mst, cost) {
            var h = checkTime(Math.floor(mst / 3600));
            mst = Math.floor(mst % 3600);
            var m = checkTime(Math.floor(mst / 60));
            mst = Math.floor(mst % 60);
            var s = checkTime(Math.floor(mst));
            return h + ":" + m + ":" + s;
        }
        function parseDate(date) {
            if (date) {
                var arrDate = String(date).split("/");
                return arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0];
            } else {
                return "";
            }
        }
        $scope.filter = {
            startTime: moment().startOf("day"),
            endTime: moment().endOf("day")
        };
        var timeout;
        $timeout.cancel(timeout);
        timeout = $timeout(function() {
            $scope.search();
        }, 250);
        if ($rootScope.isClient == "false") {
            ClientServices.find(0, "", function(err, clients) {
                if (!err) {
                    clients.unshift({
                        id: 0,
                        name: $filter("translate")("reports.all")
                    });
                    $scope.clients = clients;
                    $scope.filter.idClient = 0;
                    $scope.getProjects();
                }
            });
        } else {
            ClientServices.findById($rootScope.userIdClient, function(err, clients) {
                if (!err) {
                    $scope.client = angular.copy(clients);
                    $scope.filter.idClient = clients.id;
                    $scope.getProjects($scope.filter.idClient);
                }
            });
        }
        if (userRole == "admin" || userRole == "pm") {
            UserServices.find(0, "", function(err, users) {
                if (!err) {
                    users.unshift({
                        id: 0,
                        name: $filter("translate")("reports.all")
                    });
                    $scope.users = users;
                    $scope.filter.idUser = 0;
                }
            });
        } else if (userRole == "client") {
            $scope.filter.idUser = 0;
        } else {
            $scope.filter.idUser = userId;
        }
        $scope.getProjects = function(idClient) {
            if (idClient) {
                ProjectsServices.getProjectsByClient(idClient, function(err, projects) {
                    if (!err) {
                        projects.unshift({
                            id: 0,
                            name: $filter("translate")("reports.all")
                        });
                        $scope.projects = projects;
                        $scope.filter.idProject = 0;
                    }
                });
            } else {
                ProjectsServices.find(0, "", function(err, projects) {
                    if (!err) {
                        projects.unshift({
                            id: 0,
                            name: $filter("translate")("reports.all")
                        });
                        $scope.projects = projects;
                    }
                });
            }
        };
        ProjectsServices.find(0, "", function(err, projects) {
            if (!err) {
                $scope.allProjectsTab = projects;
                $scope.projectsTab = projects.slice(0, PAGE_SIZE - 1);
                $scope.totalTab = projects.length;
            }
        });
        var startTime = $scope.filter.startTime;
        $scope.filter.startDate = {};
        $scope.filter.endDate = {};
        $scope.$watch("filter.startTime", function(newValue, oldValue) {
            $scope.filter.startDate.maxDate = moment();
            if (moment($scope.filter.startTime, "DD/MM/YYYY").diff(moment(), "month") == 0) {
                $scope.filter.endDate.maxDate = moment().add(0, "days");
            } else {
                $scope.filter.endDate.maxDate = moment(newValue, "DD/MM/YYYY").add(1, "month");
            }
        });
        function deshabilitar_btnBuscar() {
            setTimeout(function() {
                document.getElementById("buscar").disabled = false;
            }, 3e3);
            document.getElementById("buscar").disabled = true;
        }
        function groupBudgetsByClient(budgets, currency) {
            angular.forEach(budgets, function(v, k) {
                if (!$scope.clientTotals[v.Client]) {
                    $scope.clientTotals[v.Client] = {};
                }
                $scope.clientTotals[v.Client]["total" + currency] = v.total;
            });
        }
        $scope.search = function() {
            deshabilitar_btnBuscar();
            var filters = {
                startTime: parseDate($scope.filter.startTime) + " 00:00:00",
                endTime: parseDate($scope.filter.endTime) + " 23:59:59"
            };
            if ($scope.filter.idUser) {
                filters.idUser = $scope.filter.idUser;
            }
            if ($scope.filter.idClient) {
                filters.idClient = $scope.filter.idClient;
            }
            if ($scope.filter.idProject) {
                filters.idProject = $scope.filter.idProject;
            }
            if ($scope.filter.idTask) {
                filters.idTask = $scope.filter.idTask;
            }
            $scope.total = 0;
            $scope.total2 = 0;
            $scope.total3 = 0;
            $scope.total4 = 0;
            $scope.subtotals = {};
            $scope.subtotals2 = {};
            $scope.subtotals3 = {};
            $scope.subtotals4 = {};
            $scope.tableTrack = [];
            $scope.tableTrackTrello = [];
            $scope.tableTrackAuto = [];
            $scope.tableTrackJira = [];
            $scope.finalHour = "00:00:00";
            $scope.clientTotalDev = {};
            $scope.clientTotals = {};
            $scope.cleanTotals();
            if (userRole == "admin") {}
            var calculeTotalHrDesarollo = function(array, clientKeyName) {
                var totalName = {
                    R$: "totalReales",
                    $: "totalPesos",
                    USD: "totalDolares"
                };
                angular.forEach(array, function(el, key) {
                    if (!$scope.clientTotalDev[el[clientKeyName]]) {
                        $scope.clientTotalDev[el[clientKeyName]] = {
                            totalReales: 0,
                            totalPesos: 0,
                            totalDolares: 0
                        };
                    }
                    $scope.clientTotalDev[el[clientKeyName]][totalName[el.currency]] += el.trackCost;
                });
            };
            TracksServices.getTracks(filters, function(err, tracks) {
                if (!err && tracks) {
                    $scope.tracks = tracks;
                    calculeTotalHrDesarollo(tracks, "clientName");
                    var tempTotal = 0;
                    tracks.forEach(function(track) {
                        if (!track.currency) {
                            track.currency == "$";
                        }
                        tempTotal += track.trackCost ? track.trackCost : 0;
                        $scope.totalcost = tempTotal;
                        sumTotalcost(tempTotal);
                        if (userRole == "admin" || userRole == "pm") {
                            if ($scope.tableTrack.length < 1) {
                                $scope.tableTrack.push({
                                    idUser: track.idUser,
                                    duration: track.duration,
                                    subTotalCost: track.trackCost ? track.trackCost : 0,
                                    currency: track.currency,
                                    tracks: [ track ]
                                });
                            } else {
                                var exist = false;
                                $scope.tableTrack.forEach(function(element, index) {
                                    if (element.idUser == track.idUser && exist == false) {
                                        exist = true;
                                        element.subTotalCost += track.trackCost ? track.trackCost : 0;
                                        element.tracks.push(track);
                                        element.duration = convertTime(moment.duration(element.duration).add(track.duration));
                                    }
                                });
                                if (exist === false) {
                                    $scope.tableTrack.push({
                                        idUser: track.idUser,
                                        duration: track.duration,
                                        subTotalCost: track.trackCost ? track.trackCost : 0,
                                        tracks: [ track ]
                                    });
                                }
                            }
                        } else {
                            if ($scope.tableTrack.length < 1) {
                                $scope.tableTrack.push({
                                    idProyecto: track.idProyecto,
                                    duration: track.duration,
                                    subTotalCost: track.trackCost ? track.trackCost : 0,
                                    tracks: [ track ]
                                });
                            } else {
                                var exist = false;
                                $scope.tableTrack.forEach(function(element) {
                                    if (element.idProyecto == track.idProyecto && exist == false) {
                                        exist = true;
                                        element.subTotalCost += track.trackCost ? track.trackCost : 0;
                                        element.tracks.push(track);
                                        element.duration = convertTime(moment.duration(element.duration).add(track.duration));
                                    }
                                });
                                if (exist === false) {
                                    $scope.tableTrack.push({
                                        idProyecto: track.idProyecto,
                                        duration: track.duration,
                                        subTotalCost: track.trackCost ? track.trackCost : 0,
                                        tracks: [ track ]
                                    });
                                }
                            }
                        }
                        if (track.currency == null || track.currency == "") {
                            track.currency == "$";
                        }
                        if (track.currency == "$") {
                            $scope.totalCostManualPesos += track.trackCost;
                            $scope.totalCostPesos += track.trackCost;
                        }
                        if (track.currency == "R$") {
                            $scope.totalCostManualReales += track.trackCost;
                            $scope.totalCostReales += track.trackCost;
                        }
                        if (track.currency == "USD") {
                            $scope.totalCostManualDolares += track.trackCost;
                            $scope.totalCostDolares += track.trackCost;
                        }
                    });
                    $scope.tableTrack.forEach(function(el) {
                        el.byProject = [];
                        el.byTask = [];
                        el.tracks.forEach(function(track, index) {
                            if (el.byProject.length < 1) {
                                el.byProject.push({
                                    idProyecto: track.idProyecto,
                                    projectName: track.projectName,
                                    duration: track.duration,
                                    subTotalCost: track.trackCost ? track.trackCost : 0,
                                    tracks: [ track ]
                                });
                            } else {
                                var exist = false;
                                el.byProject.forEach(function(element) {
                                    if (element.idProyecto == track.idProyecto && exist == false) {
                                        exist = true;
                                        element.subTotalCost += track.trackCost ? track.trackCost : 0;
                                        element.tracks.push(track);
                                        element.duration = convertTime(moment.duration(element.duration).add(track.duration));
                                    }
                                });
                                if (exist === false) {
                                    el.byProject.push({
                                        idProyecto: track.idProyecto,
                                        projectName: track.projectName,
                                        duration: track.duration,
                                        subTotalCost: track.trackCost ? track.trackCost : 0,
                                        tracks: [ track ]
                                    });
                                }
                            }
                            if (el.byTask.length < 1) {
                                el.byTask.push({
                                    idTask: track.idTask,
                                    taskName: track.taskName,
                                    duration: track.duration,
                                    idProyecto: track.idProyecto,
                                    subTotalCost: track.trackCost ? track.trackCost : 0,
                                    tracks: [ track ]
                                });
                            } else {
                                var exist2 = false;
                                el.byTask.forEach(function(element) {
                                    if (element.idTask == track.idTask && exist2 == false) {
                                        exist2 = true;
                                        element.subTotalCost += track.trackCost ? track.trackCost : 0;
                                        element.tracks.push(track);
                                        element.duration = convertTime(moment.duration(element.duration).add(track.duration));
                                    }
                                });
                                if (exist2 === false) {
                                    el.byTask.push({
                                        idTask: track.idTask,
                                        taskName: track.taskName,
                                        duration: track.duration,
                                        idProyecto: track.idProyecto,
                                        subTotalCost: track.trackCost ? track.trackCost : 0,
                                        tracks: [ track ]
                                    });
                                }
                            }
                        });
                    });
                    bargraphUsers();
                    bargraphClients();
                    var ms = 0;
                    var now = new Date().getTime();
                    _.each(tracks, function(track) {
                        $rootScope.trackId = track.idUser;
                        if (userRole == "admin" || userRole == "pm") {
                            if (!$scope.subtotals[track.idUser]) {
                                $scope.subtotals[track.idUser] = 0;
                            }
                            track.startTime = new Date(track.startTime).getTime();
                            track.endTime = new Date(track.endTime).getTime();
                            if (track.duration.indexOf("-") !== -1) {
                                track.duration = getTotalTime((now - track.startTime) / 1e3);
                                ms += now - track.startTime;
                                $scope.subtotals[track.idUser] += now - track.startTime;
                            } else {
                                ms += track.endTime - track.startTime;
                                $scope.subtotals[track.idUser] += track.endTime - track.startTime;
                            }
                            $scope.arrSubtotal.push(track.trackCost);
                        } else {
                            if (!$scope.subtotals[track.idProject]) {
                                $scope.subtotals[track.idProject] = 0;
                            }
                            track.startTime = new Date(track.startTime).getTime();
                            track.endTime = new Date(track.endTime).getTime();
                            if (track.duration.indexOf("-") !== -1) {
                                track.duration = getTotalTime((now - track.startTime) / 1e3);
                                ms += now - track.startTime;
                                $scope.subtotals[track.idProject] += now - track.startTime;
                            } else {
                                ms += track.endTime - track.startTime;
                                $scope.subtotals[track.idProject] += track.endTime - track.startTime;
                            }
                            $scope.arrSubtotal.push(track.trackCost);
                        }
                    });
                    for (var k in $scope.subtotals) {
                        if ($scope.subtotals.hasOwnProperty(k)) {
                            $scope.subtotals[k] = getTotalTime($scope.subtotals[k] / 1e3);
                            $scope.sumHours.push({
                                idUser: k,
                                duration: $scope.subtotals[k]
                            });
                        }
                    }
                    var mss = 0;
                    for (var i = 0; i < $scope.sumHours.length; i++) {
                        var th = moment.duration(th).add($scope.sumHours[i].duration);
                        var subcost = moment.duration($scope.sumHours[i].duration);
                        mss = {
                            idUser: $scope.sumHours[i].idUser,
                            mss: subcost._milliseconds
                        };
                        getSubTotalCost(mss);
                    }
                    $scope.total = convertTime(th);
                    $scope.sumHours = [];
                    getTotalCost(ms);
                    getHours($scope.total);
                    roundgraphUser();
                    roundgraphClient();
                }
            });
            TracksServices.getTrelloTrack(filters, function(err, tracks) {
                if (!err && tracks) {
                    $scope.trelloTracks = tracks;
                    calculeTotalHrDesarollo(tracks, "client");
                    var tempTotal = 0;
                    tracks.forEach(function(track) {
                        tempTotal += parseInt(track.trackCost ? track.trackCost : 0);
                        $scope.totalcost3 = tempTotal;
                        sumTotalcost(tempTotal);
                        if (userRole == "admin" || userRole == "pm") {
                            if ($scope.tableTrackTrello.length < 1) {
                                $scope.tableTrackTrello.push({
                                    idUser: track.idUser,
                                    idProyecto: track.idProyecto,
                                    clientName: track.client,
                                    duration: track.durations,
                                    currency: track.currency,
                                    subTotalCost: parseInt(track.trackCost ? track.trackCost : 0),
                                    tracks: [ track ]
                                });
                            } else {
                                var exist = false;
                                $scope.tableTrackTrello.forEach(function(element) {
                                    if (element.idUser == track.idUser && exist == false) {
                                        exist = true;
                                        element.subTotalCost += parseInt(track.trackCost ? track.trackCost : 0);
                                        element.tracks.push(track);
                                        element.duration = convertTime(moment.duration(element.duration).add(track.durations));
                                    }
                                });
                                if (exist === false) {
                                    $scope.tableTrackTrello.push({
                                        idUser: track.idUser,
                                        idProyecto: track.idProyecto,
                                        clientName: track.client,
                                        duration: track.durations,
                                        currency: track.currency,
                                        subTotalCost: parseInt(track.trackCost ? track.trackCost : 0),
                                        tracks: [ track ]
                                    });
                                }
                            }
                        } else {
                            if ($scope.tableTrackTrello.length < 1) {
                                $scope.tableTrackTrello.push({
                                    idProyecto: track.idUser,
                                    idProyecto: track.idProyecto,
                                    clientName: track.client,
                                    duration: track.duration,
                                    currency: track.currency,
                                    subTotalCost: parseInt(track.trackCost ? track.trackCost : 0),
                                    tracks: [ track ]
                                });
                            } else {
                                var exist = false;
                                $scope.tableTrackTrello.forEach(function(element) {
                                    if (element.idProyecto == track.idProyecto && exist == false) {
                                        exist = true;
                                        element.subTotalCost += parseInt(track.trackCost ? track.trackCost : 0);
                                        element.tracks.push(track);
                                        element.duration = convertTime(moment.duration(element.duration).add(track.duration));
                                    }
                                });
                                if (exist === false) {
                                    $scope.tableTrackTrello.push({
                                        idProyecto: track.idProyecto,
                                        clientName: track.client,
                                        duration: track.durations,
                                        currency: track.currency,
                                        subTotalCost: parseInt(track.trackCost ? track.trackCost : 0),
                                        tracks: [ track ]
                                    });
                                }
                            }
                        }
                    });
                    $scope.tableTrackTrello.forEach(function(el) {
                        el.byProject = [];
                        el.tracks.forEach(function(track, index) {
                            if (el.byProject.length < 1) {
                                el.byProject.push({
                                    idProyecto: track.idProyecto,
                                    projectName: track.projectName,
                                    duration: track.durations,
                                    currency: track.currency,
                                    client: track.client,
                                    subTotalCost: parseInt(track.trackCost ? track.trackCost : 0),
                                    tracks: [ track ]
                                });
                            } else {
                                var exist = false;
                                el.byProject.forEach(function(element) {
                                    if (element.idProyecto == track.idProyecto && exist == false) {
                                        exist = true;
                                        element.subTotalCost += parseInt(track.trackCost ? track.trackCost : 0);
                                        element.tracks.push(track);
                                        element.duration = convertTime(moment.duration(element.duration).add(track.durations));
                                    }
                                });
                                if (exist === false) {
                                    el.byProject.push({
                                        idProyecto: track.idProyecto,
                                        projectName: track.projectName,
                                        duration: track.durations,
                                        currency: track.currency,
                                        client: track.client,
                                        subTotalCost: parseInt(track.trackCost ? track.trackCost : 0),
                                        tracks: [ track ]
                                    });
                                }
                            }
                            if (track.currency == "$") {
                                $scope.totalCostTrelloPesos += track.trackCost;
                                $scope.totalCostPesos += track.trackCost;
                            }
                            if (track.currency == "R$") {
                                $scope.totalCostTrelloReales += track.trackCost;
                                $scope.totalCostReales += track.trackCost;
                            }
                            if (track.currency == "USD") {
                                $scope.totalCostTrelloDolares += track.trackCost;
                                $scope.totalCostDolares += track.trackCost;
                            }
                        });
                    });
                    bargraphUsers();
                    bargraphClients();
                    var mst = 0;
                    var now = new Date().getTime();
                    _.each(tracks, function(track) {
                        if (!$scope.subtotals3[track.projectName]) {
                            $scope.subtotals3[track.projectName] = 0;
                        }
                        track.startTime = new Date(track.startTime).getTime();
                        track.endTime = new Date(track.endTime).getTime();
                        if (track.durations.indexOf("-") !== -1) {
                            track.durations = getTotalTimeTrello((now - track.startTime) / 1e3);
                            mst += now - track.startTime;
                            $scope.subtotals3[track.projectName] += now - track.startTime;
                        } else {
                            mst += track.endTime - track.startTime;
                            $scope.subtotals3[track.projectName] += track.endTime - track.startTime;
                        }
                    });
                    for (var k in $scope.subtotals3) {
                        if ($scope.subtotals3.hasOwnProperty(k)) {
                            $scope.subtotals3[k] = getTotalTimeTrello($scope.subtotals3[k] / 1e3);
                            $scope.sumHoursTrelo.push($scope.subtotals3[k]);
                        }
                    }
                    for (var i = 0; i < $scope.sumHoursTrelo.length; i++) {
                        var th = moment.duration(th).add($scope.sumHoursTrelo[i]);
                    }
                    $scope.total3 = convertTime(th);
                    $scope.sumHoursTrelo = [];
                    getTotalTrelloCost(mst);
                    getHours($scope.total3);
                    roundgraphUser();
                    roundgraphClient();
                }
                $scope.getTotalHours();
            });
        };
        var sumTotalcost = function(value) {
            $scope.arrCost += value;
        };
        function parseTrackTime(date) {
            var arrDate = date.split(" ");
            var date = parseDate(arrDate[0]);
            var hour = arrDate[1] + ":00";
            return date + " " + hour;
        }
        $scope.updateTrackDuration = function(track) {
            if (typeof track.startTime === "string" && typeof track.endTime === "string") {
                var startTime = parseTrackTime(track.startTime);
                startTime = new Date(startTime).getTime();
                var endTime = parseTrackTime(track.endTime);
                endTime = new Date(endTime).getTime();
                track.trackDuration = getTotalTime((endTime - startTime) / 1e3);
            }
        };
        $scope.updateAutoTrackDuration = function(autoTrack) {
            if (typeof autoTrack.startTime === "string" && typeof autoTrack.endTime === "string") {
                var startTime = parseTrackTime(autoTrack.startTime);
                startTime = new Date(startTime).getTime();
                var endTime = parseTrackTime(autoTrack.endTime);
                endTime = new Date(endTime).getTime();
                autoTrack.durations = getTotalTimeAuto((endTime - startTime) / 1e3);
            }
        };
        var timeoutb;
        $scope.$watch("filtername", function() {
            $timeout.cancel(timeoutb);
            timeoutb = $timeout(function() {
                $scope.filterProjects();
            }, 250);
        }, true);
        $scope.filterProjects = function() {
            $scope.currentPage = 0;
            $scope.projectsTab = $filter("filter")($scope.allProjectsTab, $scope.filtername);
            if ($scope.projectsTab) {
                $scope.totalTab = $scope.projectsTab.length;
                $scope.projectsTab = $scope.projectsTab.slice(0, PAGE_SIZE - 1);
            }
        };
        $scope.pager = function(page) {
            var offset = PAGE_SIZE * (page - 1);
            $scope.projectsTab = $scope.allProjectsTab.slice(offset, offset + PAGE_SIZE - 1);
        };
        $scope.editTrack = function(track) {
            $scope.error = "";
            $scope.track = angular.copy(track);
            $scope.track.startTime = moment($scope.track.startTime);
            $scope.track.endTime = moment($scope.track.endTime);
            $scope.track.trackDuration = $scope.track.duration;
            ngDialog.open({
                template: "/app/components/reports/views/report.task.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        var objTrack = angular.copy($scope.track);
                        objTrack.duracion = objTrack.duration;
                        objTrack.endTime = parseTrackTime(objTrack.endTime);
                        objTrack.startTime = parseTrackTime(objTrack.startTime);
                        var newDuration = moment.duration($scope.track.trackDuration);
                        var msc = newDuration._milliseconds;
                        getNewTotalCost(msc);
                        function getNewTotalCost(msc) {
                            if (userRole == "admin" || userRole == "pm") {
                                var idHourCost = $rootScope.trackId;
                            } else {
                                var idHourCost = $rootScope.userId;
                            }
                            WeeklyHourServices.find($scope.currentPage, $scope.query, function(err, weeklyHours, countItems) {
                                if (!err) {
                                    if (weeklyHours.length > 0) {
                                        var exist = false;
                                        angular.forEach(weeklyHours, function(value, key) {
                                            if (value.idUser == idHourCost) {
                                                exist = true;
                                                var costo = parseInt(value.costHour);
                                                var result2 = msc / 3600 / 1e3 * costo;
                                                result2 = Math.ceil(result2);
                                                newCostTracked(result2);
                                            }
                                        });
                                        if (exist === false) {
                                            TracksServices.update(objTrack, function(err, result) {
                                                if (!err) {
                                                    $scope.search();
                                                    ngDialog.close();
                                                } else {
                                                    $scope.error = err;
                                                }
                                            });
                                        }
                                    } else {
                                        TracksServices.update(objTrack, function(err, result) {
                                            if (!err) {
                                                $scope.search();
                                                ngDialog.close();
                                            } else {
                                                $scope.error = err;
                                            }
                                        });
                                    }
                                }
                            });
                        }
                        var newCostTracked = function(value) {
                            objTrack.trackCost = value;
                            ProjectsServices.findById(objTrack.idProyecto, function(err, result) {
                                var project = result;
                                var oldTime = moment.duration(objTrack.duration);
                                var newTime = moment.duration(objTrack.trackDuration);
                                objTrack.duracion = objTrack.trackDuration;
                                if (oldTime < newTime) {
                                    var totalTime = moment.duration(newTime).subtract(oldTime);
                                    var a = moment.duration(totalTime);
                                    var b = moment.duration(project.tracked);
                                    objTrack.totalTrack = moment.duration(a).add(b);
                                    objTrack.totalTrack = convertTime(objTrack.totalTrack);
                                    objTrack.projCost = Number(objTrack.trackCost) - Number($scope.track.trackCost);
                                    objTrack.projCost += Number(project.totalCost);
                                } else if (oldTime > newTime) {
                                    var totalTime = moment.duration(oldTime).subtract(newTime);
                                    var a = moment.duration(totalTime);
                                    var b = moment.duration(project.tracked);
                                    objTrack.totalTrack = moment.duration(b).subtract(a);
                                    objTrack.totalTrack = convertTime(objTrack.totalTrack);
                                    objTrack.projCost = Number(project.totalCost) - Number($scope.track.trackCost);
                                    objTrack.projCost += Number(objTrack.trackCost);
                                }
                                TracksServices.update(objTrack, function(err, result) {
                                    if (!err) {
                                        ngDialog.close();
                                        $scope.search();
                                    } else {
                                        $scope.error = err;
                                    }
                                });
                            });
                        };
                    },
                    cancel: function() {
                        ngDialog.close();
                    }
                }
            });
        };
        $scope.editAutoTrack = function(autoTrack) {
            $scope.error = "";
            $scope.autoTrack = angular.copy(autoTrack);
            $scope.autoTrack.startTime = moment($scope.autoTrack.startTime);
            $scope.autoTrack.endTime = moment($scope.autoTrack.endTime);
            $scope.autoTrack.trackDuration = $scope.autoTrack.durations;
            ngDialog.open({
                template: "/app/components/reports/views/report.auto-task.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        var objTrack = angular.copy($scope.autoTrack);
                        objTrack.startTime = parseTrackTime(objTrack.startTime);
                        objTrack.endTime = parseTrackTime(objTrack.endTime);
                        TracksServices.update(objTrack, function(err, result) {
                            if (!err) {
                                $scope.search();
                                ngDialog.close();
                            } else {
                                $scope.error = err;
                            }
                        });
                    },
                    cancel: function() {
                        ngDialog.close();
                    }
                }
            });
        };
        $scope.editTrelloTrack = function(trelloTrack) {
            $scope.error = "";
            $scope.trelloTrack = angular.copy(trelloTrack);
            $scope.trelloTrack.startTime = moment($scope.trelloTrack.startTime);
            $scope.trelloTrack.endTime = moment($scope.trelloTrack.endTime);
            $scope.trelloTrack.trackDuration = $scope.trelloTrack.durations;
            ngDialog.open({
                template: "/app/components/reports/views/report.trello-task.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        var objTrack = angular.copy($scope.trelloTrack);
                        objTrack.startTime = parseTrackTime(objTrack.startTime);
                        objTrack.endTime = parseTrackTime(objTrack.endTime);
                        TracksServices.update(objTrack, function(err, result) {
                            if (!err) {
                                $scope.search();
                                ngDialog.close();
                            } else {
                                $scope.error = err;
                            }
                        });
                    },
                    cancel: function() {
                        ngDialog.close();
                    }
                }
            });
        };
        $scope.editJiraTrack = function(jira) {
            $scope.error = "";
            $scope.jiraTrack = angular.copy(jira);
            $scope.jiraTrack.startTime = moment($scope.jiraTrack.startTime);
            $scope.jiraTrack.endTime = moment($scope.jiraTrack.endTime);
            $scope.jiraTrack.trackDuration = $scope.jiraTrack.durations;
            ngDialog.open({
                template: "/app/components/reports/views/report.jira-task.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        var objTrack = angular.copy($scope.jiraTrack);
                        objTrack.startTime = parseTrackTime(objTrack.startTime);
                        objTrack.endTime = parseTrackTime(objTrack.endTime);
                        TracksServices.update(objTrack, function(err, result) {
                            if (!err) {
                                $scope.search();
                                ngDialog.close();
                            } else {
                                $scope.error = err;
                            }
                        });
                    },
                    cancel: function() {
                        ngDialog.close();
                    }
                }
            });
        };
        $scope.updateTrelloTrackDuration = function(trelloTrack) {
            if (typeof trelloTrack.startTime === "string" && typeof trelloTrack.endTime === "string") {
                var startTime = parseTrackTime(trelloTrack.startTime);
                startTime = new Date(startTime).getTime();
                var endTime = parseTrackTime(trelloTrack.endTime);
                endTime = new Date(endTime).getTime();
                trelloTrack.durations = getTotalTimeAuto((endTime - startTime) / 1e3);
            }
        };
        function bargraphUsers() {
            var graphUser = [];
            var durationUser = [];
            var nameUser = [];
            for (var i in $scope.tracks) {
                var durations = $scope.tracks[i]["duration"].split(":");
                var hour, min, sec;
                hour = parseFloat(durations[0]);
                min = parseFloat(durations[1] / 60);
                sec = parseFloat(durations[2] / 3600);
                var durationParse = parseFloat(hour + min + sec);
                var newDuration = parseFloat(Number(durationParse).toFixed(2));
                var name = $scope.tracks[i]["userName"];
                if (!graphUser[name] && newDuration > -1) {
                    graphUser[name] = newDuration;
                } else if (newDuration > -1) {
                    graphUser[name] += newDuration;
                }
            }
            for (var i in graphUser) {
                nameUser.push(i);
                durationUser.push(graphUser[i]);
                $scope.userName.push(i);
                $scope.userDuration.push(graphUser[i]);
            }
            $scope.labelsBarUsers = nameUser;
            $scope.dataBarUsers = durationUser;
            $scope.typeBarUser = "bar";
        }
        function bargraphClients() {
            var graphClient = [];
            var nameClient = [];
            var durationClient = [];
            for (var i in $scope.tracks) {
                var durations = $scope.tracks[i]["duration"].split(":");
                var durationParse = parseFloat(durations[0] + "." + durations[1]);
                var hour, min, sec;
                hour = parseFloat(durations[0]);
                min = parseFloat(durations[1] / 60);
                sec = parseFloat(durations[2] / 3600);
                var durationParse = parseFloat(hour + min + sec);
                var newDuration = parseFloat(Number(durationParse).toFixed(2));
                var name = $scope.tracks[i].clientName;
                if (!graphClient[name] && newDuration > 0) {
                    graphClient[name] = newDuration;
                } else if (newDuration > 0) {
                    graphClient[name] += newDuration;
                }
            }
            for (var i in graphClient) {
                nameClient.push(i);
                durationClient.push(graphClient[i]);
                $scope.clientName.push(i);
                $scope.clientDuration.push(graphClient[i]);
            }
            $scope.labelsBarClients = nameClient;
            $scope.dataBarClients = durationClient;
            $scope.typeBarClient = "bar";
        }
        function roundgraphUser() {
            try {
                var hourSplit = $scope.finalHour[0].split(":");
                var hourParse = parseFloat(hourSplit[0] + "." + hourSplit[0]);
                var newHour = [];
                for (var i = 0; i < $scope.userDuration.length; i++) {
                    var duration = $scope.userDuration[i];
                    var totalHour = duration;
                    var newDuration = parseFloat(Number(totalHour).toFixed(2));
                    newHour.push(parseFloat(newDuration));
                }
                $scope.labelsRoundUsers = $scope.userName;
                $scope.dataRoundUsers = newHour;
                $scope.typeUser = "pie";
            } catch (error) {}
        }
        function roundgraphClient() {
            try {
                var hourSplit = $scope.finalHour[0].split(":");
                var hourParse = parseFloat(hourSplit[0] + "." + hourSplit[0]);
                var newHour = [];
                for (var i = 0; i < $scope.clientDuration.length; i++) {
                    var duration = $scope.clientDuration[i];
                    var totalHour = duration;
                    var newDuration = parseFloat(Number(totalHour).toFixed(2));
                    newHour.push(parseFloat(newDuration));
                }
                $scope.labelsRoundClients = $scope.clientName;
                $scope.dataRoundClients = newHour;
                $scope.typeClient = "pie";
            } catch (error) {}
        }
        $scope.exportToCSV = function() {
            function convertToCSV(objArray) {
                var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
                var str = "";
                var header = Object.keys(array[0]);
                var headerLine = "";
                for (var index = 0; index < header.length; index++) {
                    if (index == header.length - 1) {
                        headerLine += header[index];
                    } else {
                        headerLine += header[index] + "|";
                    }
                }
                str += headerLine + "\r\n";
                for (var index2 = 0; index2 < array.length; index2++) {
                    var line = "";
                    for (var index3 in array[index2]) {
                        if (line != "") line += "|";
                        line += array[index2][index3];
                    }
                    str += line + "\r\n";
                }
                return str;
            }
            var text = convertToCSV($scope.tracks);
            var csvContent = "data:text/csv;charset=utf-8," + text + "\r\n";
            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "Report.csv");
            document.body.appendChild(link);
            link.click();
        };
        $scope.exportToExcel = function(tableId) {
            var uri = "data:application/vnd.ms-excel;base64,";
            var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e</head><body><table class="lexart-table">{table}</table></body></html>';
            var base64 = function(s) {
                return btoa(unescape(encodeURIComponent(s)));
            };
            var format = function(s, c) {
                return s.replace(/{(\w+)}/g, function(m, p) {
                    return c[p];
                });
            };
            var tableToExcel = function(tableId, worksheetName) {
                var table = $(tableId);
                var control = {
                    worksheet: worksheetName,
                    table: table.html()
                };
                var href = uri + base64(format(template, control));
                return href;
            };
            var encodedUri = tableToExcel(tableId, "DataSheet");
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "Report.xlsx");
            document.body.appendChild(link);
            link.click();
        };
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("SaleCtrl", [ "$scope", "$state", "$stateParams", "$rootScope", "$filter", "$timeout", "SaleServices", "UserServices", "ClientServices", "ngDialog", function($scope, $state, $stateParams, $rootScope, $filter, $timeout, SaleServices, UserServices, ClientServices, ngDialog) {
        $scope.users = [];
        $scope.clients = [];
        $scope.user = {};
        $scope.select = {};
        $scope.statuses = [];
        $scope.concepts = [];
        $scope.types = [];
        $scope.sale = {};
        $scope.query = "";
        $scope.currentPage = 0;
        SaleServices.allTypes(function(err, types) {
            if (!err) {
                $scope.types = types;
            }
        });
        SaleServices.allConcepts(function(err, concepts) {
            console.log("concepts  ", concepts);
            if (!err) {
                $scope.concepts = concepts;
            }
        });
        var idFinance = $stateParams.id;
        if (idFinance) {
            console.log(idFinance);
            SaleServices.findById(idFinance, function(err, response) {
                if (!err) {
                    var sale = angular.copy(response);
                    if (sale.date && sale.date != "") {
                        sale.date = new Date(sale.date);
                    }
                    if (sale.amount && sale.amount != "") {
                        sale.amount = parseFloat(sale.amount);
                    }
                    if (sale.idUser && sale.idUser != "") {
                        UserServices.findById(sale.idUser, function(err, user) {
                            if (!err) {
                                $scope.select.user = user;
                            }
                        });
                    }
                    if (sale.idClient && sale.idClient != "") {
                        ClientServices.findById(sale.idClient, function(err, client) {
                            if (!err) {
                                $scope.select.client = client;
                            }
                        });
                    }
                    if (sale.type && sale.type != "") {
                        $scope.types.forEach(function(type) {
                            if (type.type == sale.type) {
                                $scope.select.type = type;
                                return false;
                            }
                        });
                    }
                    if (sale.concept && sale.concept != "") {
                        $scope.concepts.forEach(function(concept) {
                            if (concept.concept == sale.concept) {
                                $scope.select.concept = concept;
                                return false;
                            }
                        });
                    }
                    $scope.sale = angular.copy(sale);
                    console.log("venta", sale);
                }
            });
        }
        UserServices.find($scope.currentPage, $scope.query, function(err, users, countItems) {
            if (!err) {
                $scope.users = users;
                $scope.total = countItems;
            }
        });
        ClientServices.find($scope.currentPage, $scope.query, function(err, clients, countItems) {
            if (!err) {
                $scope.clients = clients;
                $scope.total = countItems;
            }
        });
        $scope.save = function() {
            var sale = angular.copy($scope.sale);
            if ($scope.select.user) {
                sale.idUser = $scope.select.user.id;
                sale.seller = $scope.select.user.name;
            }
            if ($scope.select.type) {
                sale.type = $scope.select.type.type;
            }
            if ($scope.select.concept) {
                sale.concept = $scope.select.concept.concept;
            }
            if ($scope.select.client) {
                sale.idClient = $scope.select.client.id;
                sale.client = $scope.select.client.name;
            }
            if (sale.status == "PGO") {
                sale.payType = new Date().toISOString().slice(0, 19).replace("T", " ");
            }
            sale.active = 1;
            sale.date = changeFormatDate($scope.sale.date);
            SaleServices.save(sale, function(err, result) {
                if (!err) {
                    $state.go("app.sales");
                }
            });
        };
        function changeFormatDate(date) {
            if (date != null && typeof date == "object") {
                date = date.getUTCFullYear() + "-" + ("00" + (date.getUTCMonth() + 1)).slice(-2) + "-" + ("00" + date.getUTCDate()).slice(-2) + " " + ("00" + date.getUTCHours()).slice(-2) + ":" + ("00" + date.getUTCMinutes()).slice(-2) + ":" + ("00" + date.getUTCSeconds()).slice(-2);
                return date;
            }
        }
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("SalesCtrl", [ "$scope", "$interval", "$http", "$rootScope", "$filter", "$timeout", "SaleServices", "UserServices", "ngDialog", function($scope, $interval, $http, $rootScope, $filter, $timeout, SaleServices, UserServices, ngDialog) {
        $scope.sales = [];
        $scope.query = "";
        $scope.currentPage = 0;
        $scope.filter = {};
        $scope.fill = {};
        $scope.select = {};
        $scope.users = [];
        var date = new Date();
        $scope.convToDate = function(date) {
            return new Date(date);
        };
        $scope.months = [ {
            id: 0,
            month: "ENE",
            dateIni: "01-01",
            dateEnd: "01-31"
        }, {
            id: 1,
            month: "FEB",
            dateIni: "02-01",
            dateEnd: "02-28"
        }, {
            id: 2,
            month: "MAR",
            dateIni: "03-01",
            dateEnd: "03-31"
        }, {
            id: 3,
            month: "APR",
            dateIni: "04-01",
            dateEnd: "04-30"
        }, {
            id: 4,
            month: "MAY",
            dateIni: "05-01",
            dateEnd: "05-31"
        }, {
            id: 5,
            month: "JUN",
            dateIni: "06-01",
            dateEnd: "06-30"
        }, {
            id: 6,
            month: "JUL",
            dateIni: "07-01",
            dateEnd: "07-31"
        }, {
            id: 7,
            month: "AGO",
            dateIni: "08-01",
            dateEnd: "08-31"
        }, {
            id: 8,
            month: "SEP",
            dateIni: "09-01",
            dateEnd: "09-30"
        }, {
            id: 9,
            month: "OCT",
            dateIni: "10-01",
            dateEnd: "10-31"
        }, {
            id: 10,
            month: "NOV",
            dateIni: "11-01",
            dateEnd: "11-30"
        }, {
            id: 11,
            month: "DEC",
            dateIni: "12-01",
            dateEnd: "12-31"
        } ];
        $scope.years = [ {
            id: 0,
            year: date.getFullYear()
        }, {
            id: 1,
            year: date.getFullYear() - 1
        }, {
            id: 2,
            year: date.getFullYear() - 2
        } ];
        UserServices.find($scope.currentPage, $scope.query, function(err, users, countItems) {
            if (!err) {
                $scope.users = users;
                console.log(users);
                $scope.total = countItems;
            }
        });
        $scope.getCotizacion = function() {
            $http({
                method: "GET",
                url: "https://api.lexart.com.uy/gp-beta/algorithm/scrap/ine.php"
            }).then(function successCallback(res) {
                var result = res.data;
                $scope.cotizacion = (result.dolar.buy + result.dolar.sell) / 2;
            });
        };
        $scope.getCotizacion();
        $scope.fill.month = $scope.months.find(function(month) {
            if (month.id == date.getMonth()) {
                return month;
            }
        });
        $scope.fill.year = $scope.years.find(function(year) {
            if (year.year == date.getFullYear()) {
                return year;
            }
        });
        $scope.query = $scope.fill.year.year + "-" + $scope.fill.month.dateIni + "/" + $scope.fill.year.year + "-" + $scope.fill.month.dateEnd;
        $scope.changeMonth = function() {
            $scope.query = $scope.fill.year.year + "-" + $scope.fill.month.dateIni + "/" + $scope.fill.year.year + "-" + $scope.fill.month.dateEnd;
            search();
        };
        $scope.changeYear = function() {
            $scope.query = $scope.fill.year.year + "-" + $scope.fill.month.dateIni + "/" + $scope.fill.year.year + "-" + $scope.fill.month.dateEnd;
            search();
        };
        $scope.filterUsuario = function() {
            search();
        };
        var search = function() {
            if (!$scope.select.user) {
                SaleServices.findByMonth($scope.currentPage, $scope.query, function(err, sales, countItems) {
                    if (!err) {
                        $scope.sales = angular.copy(sales);
                        $scope.total = countItems;
                    }
                });
            } else {
                SaleServices.findByUserMonth($scope.currentPage, $scope.query, $scope.select.user.id, function(err, sales, countItems) {
                    if (!err) {
                        $scope.sales = angular.copy(sales);
                        $scope.total = countItems;
                    }
                });
            }
        };
        search();
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("AuthCtrl", [ "$scope", "$rootScope", "$window", "RestClient", "$log", "$state", "$filter", "WeeklyHourServices", function($scope, $rootScope, $window, RestClient, $log, $state, $filter, WeeklyHourServices) {
        $scope.user = {
            user: "",
            password: ""
        };
        $scope.sendingData = false;
        jQuery("input[type=email]").focus();
        $window.localStorage["userName"] = "";
        $window.localStorage["userRole"] = "";
        $window.localStorage["userId"] = "";
        $scope.isChecked = false;
        if ($window.localStorage[TOKEN_KEY]) {
            $state.go("app.dashboard");
        }
        $scope.authenticate = function() {
            $scope.sendingData = true;
            $scope.error = "";
            RestClient.post("user/login", $scope.user, function(err, result) {
                $scope.sendingData = false;
                if (result == null) {
                    if (typeof callback === "function") {
                        callback(err, result);
                    }
                    $rootScope.showToaster($filter("translate")("session.error_email_password"), "error");
                } else {
                    var user = result;
                    $window.localStorage[TOKEN_KEY] = user.token;
                    $window.localStorage["userId"] = user.id;
                    $window.localStorage["userName"] = user.name;
                    $window.localStorage["userEmail"] = user.email;
                    $window.localStorage["userRole"] = user.role;
                    $window.localStorage["isAdmin"] = user.role == "admin";
                    $window.localStorage["isClient"] = user.role == "client";
                    $window.localStorage["isDeveloper"] = user.role == "developer";
                    $window.localStorage["idUserClient"] = user.idClient;
                    $window.localStorage["photo"] = FILES_BASE + user.photo;
                    $rootScope.userId = $window.localStorage["userId"];
                    $rootScope.userName = $window.localStorage["userName"];
                    $rootScope.userEmail = $window.localStorage["userEmail"];
                    $rootScope.userRole = $window.localStorage["userRole"];
                    $rootScope.isAdmin = $window.localStorage["isAdmin"];
                    $rootScope.isClient = $window.localStorage["isClient"];
                    $rootScope.isDeveloper = $window.localStorage["isDeveloper"];
                    $rootScope.userPhoto = $window.localStorage["photo"];
                    if ($rootScope.isClient == "true") {
                        $rootScope.userIdClient = $window.localStorage["idUserClient"];
                    }
                    if (typeof callback === "function") {
                        callback(err, result);
                    }
                    $state.go("app.dashboard");
                }
            });
        };
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("JiraCtrl", [ "$scope", "$rootScope", "$timeout", "UserServices", "ngDialog", "JiraServices", "$stateParams", "ProjectsServices", function($scope, $rootScope, $timeout, UserServices, ngDialog, JiraServices, $stateParams, ProjectsServices) {
        $scope.jiraTask = {};
        $scope.jiraTask.user = {};
        $scope.jiraTask.boards = {};
        $scope.jiraTask.boards.params = {};
        UserServices.findById($rootScope.userId, function(err, result) {
            $scope.jiraTask.user.idUser = result.id;
            $scope.jiraTask.user.token = result.jiraToken;
            $scope.jiraTask.user.email = result.email;
            JiraServices.getAllDashboardsCloud($scope.jiraTask.user, function(err, result) {
                $scope.jiraTask.boards = result;
            });
        });
        $scope.vinculate = function(project, $index) {
            $scope.jiraTask.boards.params = $scope.jiraTask.boards[$index];
            if ($scope.jiraTask.boards.params.idProyecto != null) {} else {
                ngDialog.open({
                    template: "/app/components/tasks/jira/views/jiraProject.modal.html",
                    showClose: true,
                    scope: $scope,
                    disableAnimation: true,
                    data: {
                        msg: "Necesita vincular un proyecto a el tablero Jira",
                        prj: {
                            getProj: ProjectsServices.find($scope.currentPage, $scope.query, function(err, projects, countItems) {
                                if (!err) {
                                    $scope.getProjects = projects;
                                    $scope.selected = {
                                        value: $scope.getProjects
                                    };
                                }
                            })
                        },
                        confirm: function() {
                            $scope.jiraTask.boards.params.idProyecto = $scope.selected.value.id;
                            $scope.jiraTask.boards.params.projectName = $scope.selected.value.name;
                            console.log($scope.jiraTask.boards);
                            JiraServices.saveDashboard($scope.jiraTask.boards.params, function(err, result) {
                                $scope.jiraTask.boards.idProyecto = $scope.selected.value.id;
                                $scope.jiraTask.boards.projectName = $scope.selected.value.name;
                            });
                        },
                        cancel: function() {
                            ngDialog.close();
                            $scope.sendingData = false;
                        }
                    }
                });
            }
        };
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("JiraTaskFormCtrl", [ "$scope", "$rootScope", "$timeout", "UserServices", "ngDialog", "JiraServices", "$stateParams", "$state", function($scope, $rootScope, $timeout, UserServices, ngDialog, JiraServices, $stateParams, $state) {
        var jiraTask = $stateParams.id;
        var jiraBoard = $stateParams.idboard;
        $scope.jiraTask = {};
        $scope.jiraTask.params = {};
        $scope.jiraTask.task = {};
        $scope.jiraTask.task.comments = [];
        $scope.labels = [ {
            id: 31,
            status: "Done"
        }, {
            id: 11,
            status: "To Do"
        }, {
            id: 21,
            status: "In Progress"
        } ];
        $scope.priority = [ "Highest", "High", "Medium", "Low", "Lowest" ];
        $scope.comment = {};
        $scope.users = [];
        $scope.usersAux = {};
        UserServices.findById($rootScope.userId, function(err, result) {
            $scope.jiraTask.params.email = result.email;
            $scope.jiraTask.params.token = result.jiraToken;
            if (jiraTask) {
                $scope.jiraTask.params.keyTask = jiraTask;
                JiraServices.getIssueById($scope.jiraTask.params, function(err, result) {
                    console.log(result);
                    $scope.jiraTask.task = result[0];
                    $scope.jiraTask.task.comments = result[1];
                    $scope.jiraTask.task.status = $scope.labels.find(function(element) {
                        return element.status == $scope.jiraTask.task.status;
                    });
                    console.log($scope.jiraTask);
                });
            } else {
                $scope.jiraTask.task.idBoard = jiraBoard;
                $scope.jiraTask.task.status = {
                    id: 11,
                    status: "To Do"
                };
            }
        });
        $scope.openModalComentario = function() {
            ngDialog.open({
                template: "/app/components/projects/views/project.task-comment.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        $scope.jiraTask.params.comment = $scope.comment.comment;
                        console.log($scope.jiraTask.params);
                        JiraServices.addComment($scope.jiraTask.params, function(err, result) {
                            var windowIDs = ngDialog.getOpenDialogs();
                            ngDialog.close(windowIDs[1]);
                            $scope.jiraTask.task.comments.push({
                                author: $scope.jiraTask.params.email,
                                text: $scope.comment.comment
                            });
                        });
                    },
                    cancel: function() {
                        var windowIDs = ngDialog.getOpenDialogs();
                        ngDialog.close(windowIDs[1]);
                    }
                }
            });
        };
        $scope.editComments = function(idComm, comment) {
            $scope.comment.comment = comment;
            ngDialog.open({
                template: "/app/components/projects/views/project.task-comment.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        $scope.jiraTask.params.comment = $scope.comment.comment;
                        $scope.jiraTask.params.idComm = idComm;
                        console.log($scope.jiraTask.params);
                        JiraServices.addComment($scope.jiraTask.params, function(err, result) {
                            var windowIDs = ngDialog.getOpenDialogs();
                            ngDialog.close(windowIDs[1]);
                            $scope.jiraTask.task.comments.push({
                                author: $scope.jiraTask.params.email,
                                text: $scope.comment.comment
                            });
                        });
                    },
                    cancel: function() {
                        var windowIDs = ngDialog.getOpenDialogs();
                        ngDialog.close(windowIDs[1]);
                    }
                }
            });
        };
        $scope.openModalUsers = function() {
            UserServices.find("", "", function(err, result) {
                $scope.users = result;
                console.log($scope.users);
            });
            ngDialog.open({
                template: "/app/components/tasks/jira/views/jiraTaskUser.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function(user) {
                        console.log($scope.usersAux);
                        if ($scope.usersAux) {
                            $scope.jiraTask.users = Object.keys($scope.usersAux);
                        }
                    },
                    cancel: function() {
                        var windowIDs = ngDialog.getOpenDialogs();
                        ngDialog.close(windowIDs[1]);
                    }
                }
            });
        };
        $scope.save = function() {
            console.log($scope.jiraTask);
            console.log(Object.keys($scope.jiraTask.task.status).length);
            if (Object.keys($scope.jiraTask.task.status).length > 1) {
                $scope.jiraTask.task.status = $scope.jiraTask.task.status.id;
            }
            JiraServices.save($scope.jiraTask, function(err, result) {
                $state.go("app.jiraTasks", {
                    id: $scope.jiraTask.task.idBoard
                });
            });
        };
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("JiraTaskCtrl", [ "$scope", "$rootScope", "$timeout", "UserServices", "ngDialog", "JiraServices", "$stateParams", function($scope, $rootScope, $timeout, UserServices, ngDialog, JiraServices, $stateParams) {
        $scope.jiraTask = {};
        $scope.jiraTask.tasks = [];
        $scope.jiraTask.user = {};
        $scope.jiraTask.user.idBoard = $stateParams.id;
        UserServices.findById($rootScope.userId, function(err, result) {
            $scope.jiraTask.user.email = result.email;
            $scope.jiraTask.user.token = result.jiraToken;
            JiraServices.getIssuesByBoardCloud($scope.jiraTask.user, function(err, result) {
                $scope.jiraTask.tasks = result;
                console.log($scope.jiraTask);
            });
        });
        $scope.delete = function(id) {
            $scope.jiraTask.user.idTask = id;
            ngDialog.open({
                template: "/app/shared/views/delete.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    msg: "Esta seguro que desea eliminar la tarea?",
                    confirm: function() {
                        JiraServices.delete($scope.jiraTask.user, function(err, result) {
                            JiraServices.getIssuesByBoardCloud($scope.jiraTask.user, function(err, result) {
                                $scope.jiraTask.tasks = result;
                                console.log($scope.jiraTask);
                            });
                        });
                    },
                    cancel: function() {
                        ngDialog.close(windowIDs[1]);
                    }
                }
            });
        };
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("task_automaticCtrl", [ "$scope", "$state", "$stateParams", "$filter", "tasks_automaticServices", "ngDialog", function($scope, $state, $stateParams, $filter, tasks_automaticServices, ngDialog) {
        $scope.task_automatic = {};
        $scope.sendingData = false;
        var idTask_automatic = $stateParams.id;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("tasks_automaticCtrl", [ "$scope", "$rootScope", "$timeout", "$filter", "tasks_automaticServices", "ProjectsServices", "UserServices", "ngDialog", function($scope, $rootScope, $timeout, $filter, tasks_automaticServices, ProjectsServices, UserServices, ngDialog) {
        $scope.tasks_automatic = [];
        $scope.task_automatic = {};
        $scope.duration = {};
        $scope.users = [];
        $scope.usersAux = {};
        $scope.allTasks_automatic = [];
        $scope.filter = {};
        $scope.currentPage = 0;
        $scope.comments = [];
        $scope.comment = {};
        $scope.allStatus = [ "To-do", "Done", "In-Progress", "In-Review" ];
        $scope.state = "";
        var timeout;
        $scope.$watch("filter", function() {
            $timeout.cancel(timeout);
            timeout = $timeout(function() {
                $scope.filterTasks_automatic();
            }, 250);
        }, true);
        if ($rootScope.isAdmin == "true") {
            $scope.allStatus = [ "Done", "In-Progress", "In-Review" ];
            tasks_automaticServices.find($scope.currentPage, $scope.query, function(err, tasks_automatic, countItems) {
                if (!err) {
                    $scope.allTasks_automatic = tasks_automatic;
                    if (tasks_automatic) {
                        $scope.tasks_automatic = tasks_automatic.slice(0, PAGE_SIZE - 1);
                        $scope.total = tasks_automatic.length;
                    }
                }
            });
        } else if ($rootScope.isClient == "true") {
            $scope.allStatus = [ "In-Progress", "In-Review" ];
            tasks_automaticServices.findByIdClient($rootScope.userIdClient, function(err, tasks_automatic) {
                if (!err) {
                    $scope.allTasks_automatic = tasks_automatic;
                    $scope.tasks_automatic = tasks_automatic.slice(0, PAGE_SIZE - 1);
                    $scope.total = tasks_automatic.length;
                }
            });
        } else {
            $scope.allStatus = [ "Done", "In-Progress", "In-Review" ];
            tasks_automaticServices.find($scope.currentPage, $scope.query, function(err, tasks_automatic, countItems) {
                if (!err) {
                    $scope.allTasks_automatic = tasks_automatic;
                    if (tasks_automatic) {
                        $scope.tasks_automatic = tasks_automatic.slice(0, PAGE_SIZE - 1);
                        $scope.total = tasks_automatic.length;
                    }
                }
            });
        }
        UserServices.find(0, "", function(err, users) {
            if (!err) {
                $scope.users = users;
            }
        });
        $scope.editTask_automatic = function(index, task_automatic) {
            $scope.task_automatic = angular.copy(task_automatic);
            if ($scope.task_automatic.startDate) {
                $scope.task_automatic.startDate = moment($scope.task_automatic.startDate).format("DD/MM/YYYY");
            }
            if ($scope.task_automatic.endDate) {
                $scope.task_automatic.endDate = moment($scope.task_automatic.endDate).format("DD/MM/YYYY");
            }
            $scope.error = $scope.task_automatic.error;
            if ($scope.task_automatic.users) {
                $scope.task_automatic.users = JSON.parse($scope.task_automatic.users);
                _.each($scope.task_automatic.users, function(user) {
                    $scope.usersAux[user.idUser] = true;
                });
            } else {
                $scope.task_automatic.users = [];
            }
            ngDialog.open({
                template: "/app/components/task_automatic/views/task_automatic.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        console.log("push task_automatic");
                        $scope.task_automatic.users = [];
                        for (var user in $scope.usersAux) {
                            if ($scope.usersAux[user]) {
                                $scope.task_automatic.users.push({
                                    idUser: user
                                });
                            }
                        }
                        $scope.emailUsers = angular.copy($scope.task_automatic.users);
                        $scope.task_automatic.users = JSON.stringify($scope.task_automatic.users);
                        $scope.task_automatic.comments = JSON.stringify($scope.comments);
                        if ($scope.task_automatic.id) {
                            if ($scope.task_automatic.startDate) {
                                var arrStart = $scope.task_automatic.startDate.split("/");
                                $scope.task_automatic.startDate = new Date(arrStart[2], arrStart[1] - 1, arrStart[0]);
                            }
                            if ($scope.task_automatic.endDate) {
                                var arrStart = $scope.task_automatic.endDate.split("/");
                                $scope.task_automatic.endDate = new Date(arrStart[2], arrStart[1] - 1, arrStart[0]);
                            }
                            tasks_automaticServices.saveTask_Automatic($scope.task_automatic, function(err, result) {
                                if (!err) {
                                    $scope.tasks_automatic[index] = angular.copy($scope.task_automatic);
                                    $scope.task_automatic = {};
                                }
                            });
                        }
                        ngDialog.close();
                    },
                    cancel: function() {
                        $scope.task_automatic = {};
                        ngDialog.close();
                    }
                }
            });
            $scope.error = "";
        };
        $scope.showCode = function() {
            ngDialog.open({
                template: "/app/components/task_automatic/views/showCode.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    cancel: function() {
                        ngDialog.close();
                    }
                }
            });
            $scope.code = 'var lextrackingDebug = function() { window.onerror = function (msg, url, lineNo, columnNo, error) { var captureOrigin = document.title + " - " + window.location.origin; console.log("msg:: ", msg); console.log("url:: ", url); console.log("lineNo:: ", lineNo); console.log("columnNo:: ", columnNo); console.log("error:: ", error); console.log("Origin:: ", captureOrigin); var cfile = url.split("/"); var file = cfile[7]; console.log("file:: ", file); var obj = { error: msg, url: url, origin: captureOrigin, line: lineNo, column: columnNo, file: file }; Jobj = JSON.stringify(obj); console.log("xhr:: ", Jobj); var xhr = new XMLHttpRequest(); xhr.open("POST", "' + BASE_URL + 'taskAutomatic/new", true); xhr.setRequestHeader("Content-Type", "application/json"); xhr.send(Jobj); return false; } }; lextrackingDebug();';
            $scope.ecode = "Copiar codigo";
            $scope.copyCode = function() {
                var codes = document.getElementById("codes");
                codes.focus();
                codes.select();
                document.execCommand("copy");
                $scope.ecode = "Codigo copiado!";
            };
        };
        $scope.deleteTask = function(id) {
            tasks_automaticServices.remove(id, function(err, result) {
                console.log("Tarea automatica eliminada::", err, result);
            });
        };
        $scope.filterTasks_automatic = function() {
            $scope.currentPage = 0;
            $scope.tasks_automatic = $filter("filter")($scope.allTasks_automatic, $scope.filter);
            if ($scope.tasks_automatic) {
                $scope.total = $scope.tasks_automatic.length;
                $scope.tasks_automatic = $scope.tasks_automatic.slice(0, PAGE_SIZE - 1);
            }
        };
        $scope.pager = function(page) {
            var offset = PAGE_SIZE * (page - 1);
            $scope.tasks_automatic = $scope.allTasks_automatic.slice(offset, offset + PAGE_SIZE - 1);
        };
        $scope.agregarComentario = function() {
            if ($scope.comment.comment) {
                $scope.comment.userName = $rootScope.userName;
                $scope.comments.push($scope.comment);
                $scope.comment = {};
            }
        };
        $scope.editComments = function(index, comment) {
            $scope.oldComment = angular.copy(comment);
            $scope.comment.comment = angular.copy(comment.comment);
            $scope.comments.splice(index, 1);
            ngDialog.open({
                template: "/app/components/projects/views/project.task-comment.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        console.log($scope.review);
                        var windowIDs = ngDialog.getOpenDialogs();
                        $scope.agregarComentario();
                        ngDialog.close(windowIDs[1]);
                    },
                    cancel: function() {
                        $scope.comments.splice(index, 0, $scope.oldComment);
                        var windowIDs = ngDialog.getOpenDialogs();
                        ngDialog.close(windowIDs[1]);
                    }
                }
            });
        };
        $scope.openModalComentario = function() {
            $scope.comment = {};
            ngDialog.open({
                template: "/app/components/projects/views/project.task-comment.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        console.log($scope.review);
                        var windowIDs = ngDialog.getOpenDialogs();
                        $scope.agregarComentario();
                        ngDialog.close(windowIDs[1]);
                    },
                    cancel: function() {
                        var windowIDs = ngDialog.getOpenDialogs();
                        ngDialog.close(windowIDs[1]);
                    }
                }
            });
        };
        $scope.changeStatus = function() {
            if ($scope.state == "In-Progress" && $scope.task_automatic.status == "In-Review") {
                console.log("OPEN MODAL");
                ngDialog.open({
                    template: "/app/components/projects/views/project.task-review.modal.html",
                    showClose: true,
                    scope: $scope,
                    disableAnimation: true,
                    data: {
                        confirm: function() {
                            console.log($scope.review);
                            var windowIDs = ngDialog.getOpenDialogs();
                            sendEmail($scope.task_automatic, $scope.review.user);
                            error;
                            ngDialog.close(windowIDs[1]);
                        },
                        cancel: function() {
                            var windowIDs = ngDialog.getOpenDialogs();
                            ngDialog.close(windowIDs[1]);
                        }
                    }
                });
            }
            $scope.state = $scope.task_automatic.status;
        };
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("taskManagerCtrl", [ "$scope", "$rootScope", "$timeout", "$filter", "ProjectsServices", "ngDialog", "UserServices", function($scope, $rootScope, $timeout, $filter, ProjectsServices, ngDialog, UserServices) {
        $scope.labels = [];
        $scope.allLabels = [];
        $scope.series = [ "Total Tareas", "Total Completas" ];
        $scope.ColorBar = [ "#0059FF", "#F95C33" ];
        UserServices.find(0, "", function(err, users) {
            if (!err) {
                $scope.users = users;
            }
            console.log("users", $scope.users);
        });
        $scope.allData = [ [], [] ];
        $scope.data = [ [], [] ];
        $scope.options = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [ {
                    barPercentage: .5,
                    barThickness: 30,
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)"
                    }
                } ],
                yAxes: [ {
                    ticks: {
                        beginAtZero: true
                    }
                } ]
            }
        };
        $scope.taskManager = [];
        $scope.allProjects = [];
        $scope.filter = {};
        $scope.query = "";
        $scope.currentPage = 0;
        var timeout;
        ProjectsServices.getProjectsByDev($rootScope.userId, function(err, projects) {
            console.log(err, projects);
            if (!err) {
                console.log("projects", projects);
                $scope.allProjects = projects;
                angular.forEach($scope.allProjects, function(value, key) {
                    var tasknumber = value.tasknumber.split("/");
                    $scope.allLabels[key] = value.name;
                    if (!tasknumber[0]) {
                        tasknumber[0] = 0;
                    }
                    $scope.allData[0][key] = tasknumber[1];
                    $scope.allData[1][key] = tasknumber[0];
                    $scope.allProjects[key].tasknumber = tasknumber[0] + "/" + tasknumber[1];
                });
                $scope.projects = angular.copy($scope.allProjects);
                otherfunctions();
            }
        });
        function otherfunctions() {
            $scope.usersel = {};
            $scope.filterProjects = function() {
                $scope.currentPage = 0;
                $scope.projects = $filter("filter")($scope.allProjects, $scope.filter);
                console.log("filter", $scope.filter);
                if ($scope.projects) {
                    $scope.total = $scope.projects.length;
                    $scope.projects = $scope.projects.slice(0, PAGE_SIZE - 1);
                    $scope.labels = [];
                    $scope.data = [ [], [] ];
                    angular.forEach($scope.projects, function(value, key) {
                        var tasknumber = value.tasknumber.split("/");
                        $scope.labels[key] = value.name;
                        if (!tasknumber[0]) {
                            tasknumber[0] = 0;
                        }
                        $scope.data[0][key] = tasknumber[1];
                        $scope.data[1][key] = tasknumber[0];
                    });
                }
            };
            $scope.filterUsers = function() {
                $scope.currentPage = 0;
                var usuario = [];
                usuario.users = angular.copy('{"idUser":"' + $scope.usersel.id + '"}');
                $scope.filter.users = usuario.users;
                console.log("filter", usuario);
            };
            $scope.lista = false;
            $scope.filtro = true;
            $scope.filterall = false;
            $scope.filteractive = function(index) {
                if (index == "verdad") {
                    $scope.filter.users = undefined;
                    $scope.filterall = false;
                    $scope.lista = false;
                    $scope.filtro = true;
                } else if (index == "falso") {
                    $scope.lista = true;
                    $scope.filtro = false;
                    $scope.filterall = true;
                }
            };
            $scope.$watch("filter", function() {
                $timeout.cancel(timeout);
                timeout = $timeout(function() {
                    $scope.filterProjects();
                }, 250);
            }, true);
            $scope.pager = function(page) {
                var offset = PAGE_SIZE * (page - 1);
                $scope.projects = $scope.allProjects.slice(offset, offset + PAGE_SIZE - 1);
                angular.forEach($scope.projects, function(value, key) {
                    var tasknumber = value.tasknumber.split("/");
                    $scope.labels[key] = value.name;
                    if (!tasknumber[0]) {
                        tasknumber[0] = 0;
                    }
                    $scope.data[0][key] = tasknumber[1];
                    $scope.data[1][key] = tasknumber[0];
                });
            };
            $scope.editTaskManager = function(index, arrayindex) {
                var idProject = index.id;
                var idUser = angular.copy($rootScope.userId);
                ProjectsServices.findById(idProject, function(err, project) {
                    if (!err) {
                        console.log("project:", project);
                        $scope.project = project;
                        $scope.project.arrayindex = arrayindex;
                        if (project.description == "") {
                            $scope.project.description = "Sin Descripción";
                        }
                        if (project.comments == "" || !project.comments) {
                            $scope.project.comments = "Sin Comentarios";
                        }
                        ProjectsServices.getProjectTasksbyUser(idProject, idUser, function(err, tasks) {
                            if (!err) {
                                console.log("tasks:", tasks);
                                $scope.tasks = tasks;
                            }
                        });
                        ngDialog.open({
                            template: "/app/components/taskManager/views/TaskManagerView.modal.html",
                            showClose: true,
                            scope: $scope,
                            disableAnimation: true,
                            data: {
                                close: function() {
                                    $scope.tasks = {};
                                    $scope.project = {};
                                    ngDialog.close();
                                }
                            }
                        });
                        $scope.error = "";
                    }
                });
            };
            $scope.checktask = function(index) {
                var task = angular.copy($scope.tasks[index]);
                console.log("Change status", task);
                var counter = 0;
                ProjectsServices.saveProjectTask(task, function(err, result) {
                    if (!err) {
                        var changetasknumber = $scope.projects[$scope.project.arrayindex].tasknumber;
                        var changetasknumber = angular.copy(changetasknumber.split("/"));
                        angular.forEach($scope.tasks, function(value, key) {
                            if (value.status == "Done") {
                                counter = counter + 1;
                            }
                        });
                        changetasknumber = counter + "/" + changetasknumber[1];
                        $scope.projects[$scope.project.arrayindex].tasknumber = changetasknumber;
                    }
                });
            };
        }
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("taskManagerEditCtrl", [ "$scope", "$rootScope", "$state", "$stateParams", "$filter", "ProjectsServices", "UserServices", "ngDialog", "$timeout", "$http", function($scope, $rootScope, $state, $stateParams, $filter, ProjectsServices, UserServices, ngDialog, $timeout, $http) {
        var idProject = $stateParams.id;
        console.log(idProject);
        var idUser = angular.copy($rootScope.userId);
        $scope.count;
        console.log(idUser);
        $scope.chart = function() {
            $scope.labels = [];
            $scope.data = [];
            $scope.colours = [];
            angular.forEach($scope.allTasks, function(value, key) {
                $scope.labels[key] = value.name;
                $scope.data[key] = Math.floor(100 / $scope.allTasks.length);
                if (value.status == "Done") {
                    $scope.colours[key] = "#33BB00";
                } else if (value.status == "In-Review") {
                    $scope.colours[key] = "#f08b8b";
                } else if (value.status == "In-Progress") {
                    $scope.colours[key] = "#f2ecb8";
                } else {
                    $scope.colours[key] = "#1536A1";
                }
            });
        };
        ProjectsServices.findById(idProject, function(err, project) {
            if (!err) {
                console.log("project:", project);
                $scope.project = project;
                if (project.description == "") {
                    $scope.project.description = "Sin Descripción";
                }
                $scope.duration = [];
                if (project.duration) {
                    var newDate = $scope.project.duration.split(":", 3);
                    $scope.duration["hours"] = parseInt(newDate[0], 10);
                    $scope.duration["minutes"] = parseInt(newDate[1], 10);
                    $scope.duration["seconds"] = parseInt(newDate[2], 10);
                    console.log($scope.duration, "duracion");
                }
                if (project.comments == "" || !project.comments) {
                    $scope.project.comments = "Sin Comentarios";
                }
                $scope.filter = {};
                var timeout;
                $scope.allStatus = [ "To-do", "Done", "In-Progress", "In-Review" ];
                $scope.task = {};
                $scope.sendingData = false;
                function allinfo(tasks) {
                    if (!tasks) {
                        tasks = "";
                    }
                    console.log("tasks:", tasks);
                    $scope.allTasks = tasks;
                    $scope.tasks = tasks.slice(0, PAGE_SIZE - 1);
                    $scope.total = tasks.length;
                    $scope.chart();
                    var timeout;
                    $scope.$watch("filter", function() {
                        $timeout.cancel(timeout);
                        timeout = $timeout(function() {
                            $scope.filterTasks();
                        }, 250);
                    }, true);
                    $scope.filterTasks = function() {
                        $scope.currentPage = 0;
                        $scope.tasks = $filter("filter")($scope.allTasks, $scope.filter);
                        if ($scope.tasks) {
                            $scope.total = $scope.tasks.length;
                            $scope.tasks = $scope.tasks.slice(0, PAGE_SIZE - 1);
                        }
                    };
                    $scope.pager = function(page) {
                        var offset = PAGE_SIZE * (page - 1);
                        $scope.tasks = $scope.allTasks.slice(offset, offset + PAGE_SIZE - 1);
                        $scope.currentPage = page;
                    };
                    var counter = 0;
                    angular.forEach($scope.allTasks, function(value, key) {
                        if (value.status == "Done") {
                            counter = parseInt(counter) + parseInt(1);
                        }
                    });
                    $scope.project.count = counter + "/" + $scope.allTasks.length;
                    $scope.checktask = function(index) {
                        var task = angular.copy($scope.tasks[index]);
                        console.log("Change status", task);
                        angular.forEach($scope.allTasks, function(value, key) {
                            if (value.status == "Done") {
                                counter = counter + 1;
                            }
                        });
                        $scope.chart();
                        if (!task.startDate) {
                            delete task.startDate;
                        }
                        if (!task.endDate) {
                            delete task.endDate;
                        }
                        ProjectsServices.saveProjectTask(task, function(err, result) {
                            if (!err) {
                                var counter = 0;
                                angular.forEach($scope.allTasks, function(value, key) {
                                    if (value.status == "Done") {
                                        counter = parseInt(counter) + parseInt(1);
                                    }
                                });
                                var changetasknumber = counter + "/" + $scope.allTasks.length;
                                $scope.project.count = changetasknumber;
                                var users = task.users;
                                users = JSON.parse(users);
                                var usuarioresponsable = angular.copy($rootScope.userId);
                                var usertonotify;
                                var usersemail;
                                UserServices.findById(usuarioresponsable, function(err, result) {
                                    var responsable = result;
                                    angular.forEach(users, function(value, key) {
                                        usertonotify = users[key].idUser;
                                        UserServices.findById(usertonotify, function(err, result) {
                                            usertonotify = result;
                                            sendEmail(task, usertonotify, responsable);
                                        });
                                    });
                                });
                            }
                        });
                    };
                    $scope.actualizarComentario = function(index) {
                        ProjectsServices.save($scope.project, function(err, result) {
                            if (!err) {
                                alert("Comentario Actualizado");
                            }
                        });
                    };
                }
                if ($rootScope.userRole != "developer") {
                    ProjectsServices.getProjectTasks(idProject, function(err, tasks) {
                        if (!err) {
                            allinfo(tasks);
                        }
                    });
                } else {
                    ProjectsServices.getProjectTasksbyUser(idProject, idUser, function(err, tasks) {
                        if (!err) {
                            allinfo(tasks);
                        }
                    });
                }
            }
        });
        function sendEmailTask(task, user, userresponsable, update) {
            var colortask = "#a9e892";
            if (task.status == "Done") {
                colortask = "#a9e892";
            } else if (task.status == "In-Review") {
                colortask = "#f08b8b";
            } else if (task.status == "In-Progress") {
                colortask = "#f2ecb8";
            }
            console.log("manda mail");
            var colorproyect = "#F95C33";
            var html = "<style>.container {width: 100%;display: flex;flex-direction: column;text-align: left;}.container ul .email_list {list-style: none;font-size: 14px;font-weight: bold;padding-bottom: 8px;}.container .message{padding-left: 40px;}.email_link{font-size: 14px;color: #42acc5;font-weight: bold;text-decoration: none;}</style>";
            html += "<div class='container'>";
            html += "<div>";
            html += "<h4>" + task.name + "-" + angular.copy($scope.project.name) + "</h4>";
            html += "<ul>";
            html += "<li class='email_list' >El usuario <span style='color:#5692C7'>" + userresponsable.name + "</span><a href = 'mailto: " + userresponsable.email + "'> (" + userresponsable.email + ")</a>";
            if (update) {
                html += " a actualizado ";
            } else {
                html += " a creado ";
            }
            html += "la tarea <span style='color:" + colorproyect + "'>" + task.name + "</span> del proyecto <span style='color:" + colorproyect + "'>" + angular.copy($scope.project.name) + "</span></li>";
            html += "<li class='email_list' >Responsable: <span style='color:#5692C7'>" + userresponsable.name + "</span></li>";
            html += "<li class='email_list' >Proyecto: " + angular.copy($scope.project.name) + "</li>";
            html += "<li class='email_list'>Tarea: " + task.name + "</li>";
            html += "<li class='email_list'>Descripcion: " + task.description + "</li>";
            html += "<li class='email_list'>Status: <span style='color:" + colortask + "; text-transform: uppercase'>" + task.status + "</span></li>";
            html += "</ul>";
            html += "</div>";
            html += "<div class='message'>";
            html += "</div></div>";
            var current_host = window.location.protocol + "//" + window.location.host + "/";
            if (update) {
                var mailSend = {
                    site_title: "Lexartlabs",
                    topic: "Tarea Actualizada",
                    to_email: user.email,
                    headers: {
                        from_email: "lextracking@lexartlabs.com",
                        bcc_emails: "facundo.torterola@lexartlabs.com"
                    },
                    body: {
                        big_logo: "https://lextracking.lexartlabs.com/assets/images/lextracking-logo.svg",
                        little_logo: "https://lextracking.lexartlabs.com/assets/images/lextracking-logo.svg",
                        slogan: current_host,
                        html_body: html,
                        footer_color: "#F9F9F9;color:#F95C33 !important;font-size: 10px",
                        footer_one: "Lexartlabs",
                        footer_two: "<a class='email_link' href='" + current_host + "'>Ir a Lextracking<a/>"
                    }
                };
            } else {
                var mailSend = {
                    site_title: "Lexartlabs",
                    topic: "Tarea",
                    to_email: user.email,
                    headers: {
                        from_email: "lextracking@lexartlabs.com",
                        bcc_emails: "facundo.torterola@lexartlabs.com"
                    },
                    body: {
                        big_logo: "https://lextracking.lexartlabs.com/assets/images/lextracking-logo.svg",
                        little_logo: "https://lextracking.lexartlabs.com/assets/images/lextracking-logo.svg",
                        slogan: current_host,
                        html_body: html,
                        footer_color: "#F9F9F9;color:#F95C33 !important;font-size: 10px",
                        footer_one: "Lexartlabs",
                        footer_two: "<a class='email_link' href='" + current_host + "'>Ir a Lextracking<a/>"
                    }
                };
            }
            console.log("MAIL TO SEND", mailSend);
            $http({
                method: "POST",
                url: "https://mail-api.lexartlabs.com/mail/smtp/new",
                data: mailSend,
                contentType: "application/json;charset=utf-8"
            }).then(function(response) {
                if (response.data.response == "email_sent_correct") {
                    console.log("Sent");
                }
            });
        }
        function sendEmail(task, userdestino, userresponsable) {
            var current_host = window.location.protocol + "//" + window.location.host + "/";
            var url = current_host + "/#/app/taskManager/" + task.idProject;
            var colortask;
            if (task.status == "Done") {
                colortask = "#a9e892";
            } else if (task.status == "In-Review") {
                colortask = "#f08b8b";
            } else if (task.status == "In-Progress") {
                colortask = "#f2ecb8";
            }
            var colorproyect = "#F95C33";
            var html = "<style>.container {width: 100%;display: flex;flex-direction: column;text-align: left;}.container ul .email_list {list-style: none;font-size: 14px;font-weight: bold;padding-bottom: 8px;}.container .message{padding-left: 40px;}.email_link{font-size: 14px;color: #42acc5;font-weight: bold;text-decoration: none;}</style>";
            html += "<div class='container'>";
            html += "<div>";
            html += "<h4>" + task.name + "-" + task.projectName + "</h4>";
            html += "<ul>";
            html += "<li class='email_list' >El usuario <span style='color:#5692C7'>" + userresponsable.name + "</span><a href = 'mailto: " + userresponsable.email + "'> (" + userresponsable.email + ")</a> cambio de estado la tarea <span style='color:" + colorproyect + "'>" + task.name + "</span> del proyecto <span style='color:" + colorproyect + "'>" + task.projectName + "</span> a </span> <span style='color:" + colortask + "; text-transform: uppercase'>" + task.status + "</span></li>";
            html += "<li class='email_list'>Tarea: <span style='color:" + colorproyect + "'>" + task.name + "</span></li>";
            html += "<li class='email_list'>Descripcion: <span style='color:" + colorproyect + "'>" + task.description + "</span></li>";
            html += "</ul>";
            html += "</div>";
            html += "<div class='message'>";
            html += "<div class='lexart-wa__actions'><a href='" + url + "' class='lexart-btn lexart-btn--alt'>Ver Tarea</a></div>";
            html += "</div></div>";
            var mailSend = {
                site_title: "Lexartlabs",
                topic: "Cambio de estado en tarea " + task.name + " a " + task.status,
                to_email: userdestino.email,
                headers: {
                    from_email: "lextracking@lexartlabs.com",
                    bcc_emails: "facundo.torterola@lexartlabs.com"
                },
                body: {
                    big_logo: "https://lextracking.lexartlabs.com/assets/images/lextracking-logo.svg",
                    little_logo: "https://lextracking.lexartlabs.com/assets/images/lextracking-logo.svg",
                    slogan: current_host,
                    html_body: html,
                    footer_color: "#F9F9F9;color:" + colorproyect + " !important;font-size: 10px",
                    footer_one: "Lexartlabs",
                    footer_two: "<a class='email_link' href='" + current_host + "'>Ir a Lextracking<a/>"
                }
            };
            console.log("MAIL TO SEND", mailSend);
            $http({
                method: "POST",
                url: "https://mail-api.lexartlabs.com/mail/smtp/new",
                data: mailSend,
                contentType: "application/json;charset=utf-8"
            }).then(function(response) {
                if (response.data.response == "email_sent_correct") {
                    console.log("Sent");
                }
            });
        }
        $scope.addTask = function() {
            UserServices.find(0, "", function(err, users) {
                if (!err) {
                    console.log("users", users);
                    $scope.users = users;
                }
            });
            $scope.task = {};
            $scope.comments = [];
            $scope.state = "";
            $scope.usersAux = {};
            console.log("addtask", $scope.task);
            ngDialog.open({
                template: "/app/components/projects/views/project.task.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        console.log("push task");
                        if (!$scope.duration["hours"]) {
                            $scope.duration["hours"] = 0;
                        }
                        if (!$scope.duration["minutes"]) {
                            $scope.duration["minutes"] = 0;
                        }
                        if (!$scope.duration["seconds"]) {
                            $scope.duration["seconds"] = 0;
                        }
                        var fixHour = $scope.duration["hours"] < 10 ? "0" + $scope.duration["hours"] : $scope.duration["hours"];
                        var fixMinute = $scope.duration["minutes"] < 10 ? "0" + $scope.duration["minutes"] : $scope.duration["minutes"];
                        var fixSecond = $scope.duration["seconds"] < 10 ? "0" + $scope.duration["seconds"] : $scope.duration["seconds"];
                        var newTimer = fixHour + ":" + fixMinute + ":" + fixSecond;
                        $scope.task.duration = newTimer;
                        if (idProject) {
                            $scope.task.idProject = idProject;
                            $scope.task.comments = JSON.stringify($scope.comments);
                            if ($scope.task.startDate) {
                                var arrStart = $scope.task.startDate.split("/");
                                $scope.task.startDate = new Date(arrStart[2], arrStart[1] - 1, arrStart[0]).toJSON().slice(0, 10);
                            }
                            if ($scope.task.endDate) {
                                var arrStart = $scope.task.endDate.split("/");
                                $scope.task.endDate = new Date(arrStart[2], arrStart[1] - 1, arrStart[0]).toJSON().slice(0, 10);
                            }
                            if (!$scope.task.status) {
                                $scope.task.status = $scope.allStatus[0];
                            }
                            console.log($scope.task, "task to insert");
                            if ($scope.task.users) {
                                $scope.task.users = JSON.parse($scope.task.users);
                                _.each($scope.task.users, function(user) {
                                    $scope.usersAux[user.idUser] = true;
                                });
                            } else {
                                $scope.task.users = [];
                            }
                            for (var user in $scope.usersAux) {
                                console.log(user);
                                if ($scope.usersAux[user]) {
                                    if (user == angular.copy($rootScope.userId)) {
                                        var pushtask = 1;
                                    }
                                    $scope.task.users.push({
                                        idUser: user
                                    });
                                }
                            }
                            var users = angular.copy($scope.task.users);
                            $scope.task.users = JSON.stringify($scope.task.users);
                            ProjectsServices.saveProjectTask($scope.task, function(err, result) {
                                if (!err) {
                                    var usertonotify;
                                    var usuarioresponsable = angular.copy($rootScope.userId);
                                    UserServices.findById(usuarioresponsable, function(err, resultado) {
                                        var responsable = resultado;
                                        var usertonotify;
                                        angular.forEach(users, function(value, key) {
                                            usertonotify = users[key].idUser;
                                            UserServices.findById(usertonotify, function(err, result) {
                                                usertonotify = result;
                                                sendEmailTask($scope.task, usertonotify, responsable);
                                            });
                                        });
                                    });
                                    if ($rootScope.userRole != "developer") {
                                        ProjectsServices.getProjectTasks(idProject, function(err, tasks) {
                                            if (!err) {
                                                console.log("tasks:", tasks);
                                                $scope.allTasks = tasks;
                                                if ($scope.currentPage) {
                                                    $scope.pager($scope.currentPage);
                                                } else {
                                                    $scope.pager(1);
                                                }
                                                $scope.chart();
                                                var counter = 0;
                                                angular.forEach($scope.allTasks, function(value, key) {
                                                    if (value.status == "Done") {
                                                        counter = parseInt(counter) + parseInt(1);
                                                    }
                                                });
                                                var changetasknumber = counter + "/" + $scope.allTasks.length;
                                                $scope.project.count = changetasknumber;
                                            }
                                        });
                                    } else {
                                        ProjectsServices.getProjectTasksbyUser(idProject, idUser, function(err, tasks) {
                                            if (!err) {
                                                console.log("tasks:", tasks);
                                                $scope.allTasks = tasks;
                                                if ($scope.currentPage) {
                                                    $scope.pager($scope.currentPage);
                                                } else {
                                                    $scope.pager(1);
                                                }
                                                $scope.chart();
                                                var counter = 0;
                                                angular.forEach($scope.allTasks, function(value, key) {
                                                    if (value.status == "Done") {
                                                        counter = parseInt(counter) + parseInt(1);
                                                    }
                                                });
                                                changetasknumber = counter + "/" + changetasknumber[1];
                                                $scope.project.count = changetasknumber;
                                            }
                                        });
                                    }
                                }
                            });
                        } else {
                            $scope.tasks.push(angular.copy($scope.task));
                            $scope.task = {};
                        }
                        ngDialog.close();
                    },
                    cancel: function() {
                        ngDialog.close();
                    }
                }
            });
            $scope.error = "";
        };
        $scope.agregarComentario = function() {
            if ($scope.comment.comment) {
                $scope.comment.userName = $rootScope.userName;
                console.log($scope.comment);
                $scope.comments.push($scope.comment);
                $scope.comment = {};
            }
        };
        $scope.editComments = function(index, comment) {
            $scope.oldComment = angular.copy(comment);
            $scope.comment.comment = angular.copy(comment.comment);
            $scope.comments.splice(index, 1);
            ngDialog.open({
                template: "/app/components/projects/views/project.task-comment.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        console.log($scope.review);
                        var windowIDs = ngDialog.getOpenDialogs();
                        $scope.agregarComentario();
                        ngDialog.close(windowIDs[1]);
                    },
                    cancel: function() {
                        $scope.comments.splice(index, 0, $scope.oldComment);
                        var windowIDs = ngDialog.getOpenDialogs();
                        ngDialog.close(windowIDs[1]);
                    }
                }
            });
        };
        $scope.openModalComentario = function() {
            $scope.comment = {};
            ngDialog.open({
                template: "/app/components/projects/views/project.task-comment.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        console.log($scope.review);
                        var windowIDs = ngDialog.getOpenDialogs();
                        $scope.agregarComentario();
                        ngDialog.close(windowIDs[1]);
                    },
                    cancel: function() {
                        var windowIDs = ngDialog.getOpenDialogs();
                        ngDialog.close(windowIDs[1]);
                    }
                }
            });
        };
        $scope.editTask = function(index, task) {
            UserServices.find(0, "", function(err, users) {
                if (!err) {
                    console.log("users", users);
                    $scope.users = users;
                }
            });
            $scope.task = angular.copy(task);
            $scope.usersAux = [];
            if (task.duration) {
                var newDate = $scope.task.duration.split(":", 3);
                $scope.duration["hours"] = parseInt(newDate[0], 10);
                $scope.duration["minutes"] = parseInt(newDate[1], 10);
                $scope.duration["seconds"] = parseInt(newDate[2], 10);
                console.log($scope.duration, "duracion");
            }
            if ($scope.task.startDate) {
                $scope.task.startDate = moment($scope.task.startDate).format("DD/MM/YYYY");
            }
            if ($scope.task.endDate) {
                $scope.task.endDate = moment($scope.task.endDate).format("DD/MM/YYYY");
            }
            $scope.state = $scope.task.status;
            if (!$scope.task.comments) {
                $scope.task.comments = '"comment":';
            }
            var arr = $scope.task.comments.split('"comment":');
            var arr = $scope.task.comments ? $scope.task.comments.split('"comment":') : Array();
            if (arr[0] == "[{") {
                $scope.comments = JSON.parse($scope.task.comments);
            } else {
                $scope.comments = [];
            }
            console.log("$scope.task", $scope.task);
            if ($scope.task.users) {
                $scope.task.users = JSON.parse($scope.task.users);
                _.each($scope.task.users, function(user) {
                    $scope.usersAux[user.idUser] = true;
                });
            } else {
                $scope.task.users = [];
            }
            ngDialog.open({
                template: "/app/components/projects/views/project.task.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        console.log("push task");
                        if ($scope.duration) {
                            var fixHour = $scope.duration["hours"] < 10 ? "0" + $scope.duration["hours"] : $scope.duration["hours"];
                            var fixMinute = $scope.duration["minutes"] < 10 ? "0" + $scope.duration["minutes"] : $scope.duration["minutes"];
                            var fixSecond = $scope.duration["seconds"] < 10 ? "0" + $scope.duration["seconds"] : $scope.duration["seconds"];
                            var newTimer = fixHour + ":" + fixMinute + ":" + fixSecond;
                            $scope.task.duration = newTimer;
                        } else {
                            $scope.task.duration = null;
                        }
                        $scope.task.users = [];
                        console.log($scope.usersAux);
                        for (var user in $scope.usersAux) {
                            console.log(user);
                            if ($scope.usersAux[user]) {
                                $scope.task.users.push({
                                    idUser: user
                                });
                            }
                        }
                        var users = angular.copy($scope.task.users);
                        $scope.emailUsers = angular.copy($scope.task.users);
                        $scope.task.users = JSON.stringify($scope.task.users);
                        $scope.task.comments = JSON.stringify($scope.comments);
                        if ($scope.task.id) {
                            if ($scope.task.startDate) {
                                var arrStart = $scope.task.startDate.split("/");
                                $scope.task.startDate = new Date(arrStart[2], arrStart[1] - 1, arrStart[0]).toJSON().slice(0, 10);
                            } else {
                                delete $scope.task.startDate;
                            }
                            if ($scope.task.endDate) {
                                console.log("Yes", $scope.task.endDate);
                                var arrStart = $scope.task.endDate.split("/");
                                $scope.task.endDate = new Date(arrStart[2], arrStart[1] - 1, arrStart[0]).toJSON().slice(0, 10);
                            } else {
                                delete $scope.task.endDate;
                                console.log("No", $scope.task.endDate);
                            }
                            console.log($scope.emailUsers);
                            console.log("TASK TO UPDATE", $scope.task);
                            ProjectsServices.saveProjectTask($scope.task, function(err, result) {
                                var usertonotify;
                                if (!err) {
                                    var usuarioresponsable = angular.copy($rootScope.userId);
                                    UserServices.findById(usuarioresponsable, function(err, resultado) {
                                        var responsable = resultado;
                                        var usertonotify;
                                        angular.forEach(users, function(value, key) {
                                            usertonotify = users[key].idUser;
                                            UserServices.findById(usertonotify, function(err, result) {
                                                usertonotify = result;
                                                sendEmailTask($scope.task, usertonotify, responsable, "update");
                                            });
                                        });
                                    });
                                    if ($rootScope.userRole != "developer") {
                                        ProjectsServices.getProjectTasks(idProject, function(err, tasks) {
                                            if (!err) {
                                                console.log("tasks:", tasks);
                                                $scope.allTasks = tasks;
                                                if ($scope.currentPage) {
                                                    $scope.pager($scope.currentPage);
                                                } else {
                                                    $scope.pager(1);
                                                }
                                                $scope.chart();
                                                var counter = 0;
                                                angular.forEach($scope.allTasks, function(value, key) {
                                                    if (value.status == "Done") {
                                                        counter = parseInt(counter) + parseInt(1);
                                                    }
                                                });
                                                var changetasknumber = counter + "/" + $scope.allTasks.length;
                                                $scope.project.count = changetasknumber;
                                            }
                                        });
                                    } else {
                                        ProjectsServices.getProjectTasksbyUser(idProject, idUser, function(err, tasks) {
                                            if (!err) {
                                                console.log("tasks:", tasks);
                                                $scope.allTasks = tasks;
                                                if ($scope.currentPage) {
                                                    $scope.pager($scope.currentPage);
                                                } else {
                                                    $scope.pager(1);
                                                }
                                                $scope.chart();
                                                var counter = 0;
                                                angular.forEach($scope.allTasks, function(value, key) {
                                                    if (value.status == "Done") {
                                                        counter = parseInt(counter) + parseInt(1);
                                                    }
                                                });
                                                var changetasknumber = counter + "/" + $scope.allTasks.length;
                                                $scope.project.count = changetasknumber;
                                            }
                                        });
                                    }
                                }
                            });
                        }
                        ngDialog.close();
                    },
                    cancel: function() {
                        $scope.task = {};
                        ngDialog.close();
                    }
                }
            });
            $scope.error = "";
        };
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("TaskCtrl", [ "$scope", "$state", "$stateParams", "$filter", "TaskServices", "ngDialog", function($scope, $state, $stateParams, $filter, TaskServices, ngDialog) {
        $scope.task = {};
        $scope.sendingData = false;
        var idTask = $stateParams.id;
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("TaskFormCtrl", [ "$scope", "$state", "$stateParams", "$filter", "TasksServices", "ngDialog", "UserServices", "ProjectsServices", "$rootScope", "PreviousState", function($scope, $state, $stateParams, $filter, TaskServices, ngDialog, UserServices, ProjectsServices, $rootScope, PreviousState) {
        var idTask = $stateParams.id;
        $scope.duration = [];
        $scope.allStatus = [ "To-do", "Done", "In-Progress", "In-Review" ];
        $scope.usersAux = {};
        $scope.comments = [];
        $scope.task = {};
        $scope.comment = {};
        console.log(idTask);
        UserServices.find(0, "", function(err, users) {
            if (!err) {
                $scope.users = users;
            }
        });
        console.log(PreviousState, $stateParams);
        if (PreviousState.Params.id == $stateParams.id) {
            $scope.task.idProject = $stateParams.id;
            console.log("Agregar tarea");
            ProjectsServices.findById($scope.task.idProject, function(err, res) {
                console.log("by project", err, res);
                $scope.task.projectName = res.name;
            });
            $scope.comments = [];
            $scope.state = "";
            $scope.usersAux = {};
            $scope.task.hour = 0;
            $scope.task.mins = 0;
            $scope.task.secs = 0;
            $scope.task.startDate = moment();
            $scope.task.endDate = moment().add(1, "month");
            console.log("addtask", $scope.task);
        } else {
            TaskServices.findById(idTask, function(err, res) {
                $scope.task = res;
                console.log("start date find", $scope.task);
                var arrDuracion = $scope.task.duration.split(":");
                console.log("Array duracion", arrDuracion);
                $scope.task.hour = parseInt(arrDuracion[0]);
                $scope.task.mins = parseInt(arrDuracion[1]);
                $scope.task.secs = parseInt(arrDuracion[2]);
                if ($scope.task.startDate) {
                    $scope.task.startDate = moment($scope.task.startDate).format("DD/MM/YYYY");
                }
                if ($scope.task.endDate) {
                    $scope.task.endDate = moment($scope.task.endDate).format("DD/MM/YYYY");
                }
                $scope.state = $scope.task.status;
                if ($scope.task.comments) {
                    var arr = $scope.task.comments.split('"comment":');
                    var arr = $scope.task.comments ? $scope.task.comments.split('"comment":') : Array();
                    if (arr[0] == "[{") {
                        console.log(JSON.parse($scope.task.comments));
                        $scope.comments = JSON.parse($scope.task.comments);
                    } else {
                        $scope.comments = [];
                    }
                }
                console.log("$scope.task", $scope.task);
                if ($scope.task.users) {
                    $scope.task.users = JSON.parse($scope.task.users);
                    _.each($scope.task.users, function(user) {
                        $scope.usersAux[user.idUser] = true;
                    });
                } else {
                    $scope.task.users = [];
                }
            });
        }
        $scope.save = function() {
            if ($scope.task.description === undefined) {
                var msg = "El campo Descripción no puede estar vacio.";
                return $rootScope.showToaster(msg, "error");
            }
            if ($scope.task.name === undefined) {
                var msg = "El campo Nombre no puede estar vacio.";
                $rootScope.showToaster(msg, "error");
            } else {
                if ($scope.task.hour == undefined || $scope.task.hour == null) {
                    $scope.task.hour = "00";
                }
                if ($scope.task.mins == undefined || $scope.task.mins == null) {
                    $scope.task.mins = "00";
                }
                if ($scope.task.secs == undefined || $scope.task.secs == null) {
                    $scope.task.secs = "00";
                }
                $scope.task.duration = ($scope.task.hour < 10 ? "0" + $scope.task.hour : $scope.task.hour) + ":" + ($scope.task.mins < 10 ? "0" + $scope.task.mins : $scope.task.mins) + ":" + ($scope.task.secs < 10 ? "0" + $scope.task.secs : $scope.task.secs);
                console.log("push task");
                $scope.task.users = [];
                console.log($scope.usersAux);
                for (var user in $scope.usersAux) {
                    console.log(user);
                    if ($scope.usersAux[user]) {
                        $scope.task.users.push({
                            idUser: user
                        });
                    }
                }
                $scope.emailUsers = angular.copy($scope.task.users);
                $scope.task.users = JSON.stringify($scope.task.users);
                $scope.task.comments = JSON.stringify($scope.comments);
                console.log("new task id", $scope.task.id);
                if ($scope.task.id) {
                    if ($scope.task.startDate) {
                        var arrStart = $scope.task.startDate.split("/");
                        $scope.task.startDate = arrStart[2] + "/" + arrStart[1] + "/" + arrStart[0];
                    }
                    if ($scope.task.endDate) {
                        var arrStart = $scope.task.endDate.split("/");
                        $scope.task.endDate = arrStart[2] + "/" + arrStart[1] + "/" + arrStart[0];
                    }
                    console.log($scope.emailUsers);
                    console.log("TASK TO UPDATE", $scope.task);
                    ProjectsServices.saveProjectTask($scope.task, function(err, result) {
                        console.log("result:: ", result);
                        if (!err) {
                            $scope.task = {};
                            $state.go("app.projectEdit", {
                                id: result.idProject
                            });
                        }
                    });
                } else {
                    if ($scope.task.idProject) {
                        if ($scope.task.startDate) {
                            var arrStart = $scope.task.startDate.split("/");
                            $scope.task.startDate = new Date(arrStart[2], arrStart[1] - 1, arrStart[0]);
                        }
                        if ($scope.task.endDate) {
                            var arrStart = $scope.task.endDate.split("/");
                            $scope.task.endDate = new Date(arrStart[2], arrStart[1] - 1, arrStart[0]);
                        }
                        console.log("entrei aqui");
                        $scope.task.users = JSON.parse($scope.task.users);
                        console.log("TASK TO UPDATE else", $scope.task);
                        ProjectsServices.saveProjectTask($scope.task, function(err, result) {
                            console.log("result:: ", result);
                            if (!err) {
                                $scope.task = {};
                                $state.go("app.projectEdit", {
                                    id: result.idProject
                                });
                            }
                        });
                    } else {
                        if ($scope.task.startDate) {
                            var arrStart = $scope.task.startDate.split("/");
                            console.log(arrStart);
                            $scope.task.startDate = new Date(arrStart[2], arrStart[1] - 1, arrStart[0]);
                        }
                        if ($scope.task.endDate) {
                            var arrStart = $scope.task.endDate.split("/");
                            console.log(arrStart);
                            $scope.task.endDate = new Date(arrStart[2], arrStart[1] - 1, arrStart[0]);
                        }
                        console.log("TASK TO UPDATE else", $scope.task);
                        ProjectsServices.saveProjectTask($scope.task, function(err, result) {
                            console.log("result:: ", result);
                            if (!err) {
                                $scope.task = {};
                                $state.go("app.projectEdit", {
                                    id: result.idProject
                                });
                            }
                        });
                    }
                }
                var prevPag = window.location.origin + "/" + PreviousState.URL;
                jQuery(".closeForm").attr("href", prevPag);
            }
        };
        $scope.agregarComentario = function() {
            if ($scope.comment.comment) {
                $scope.comment.userName = $rootScope.userName;
                console.log($scope.comment);
                $scope.comments.push($scope.comment);
                $scope.comment = {};
            }
        };
        $scope.openModalComentario = function() {
            ngDialog.open({
                template: "/app/components/projects/views/project.task-comment.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        console.log($scope.review);
                        var windowIDs = ngDialog.getOpenDialogs();
                        $scope.agregarComentario();
                        ngDialog.close(windowIDs[1]);
                    },
                    cancel: function() {
                        var windowIDs = ngDialog.getOpenDialogs();
                        ngDialog.close(windowIDs[1]);
                    }
                }
            });
        };
        $scope.editComments = function(index, comment) {
            $scope.oldComment = angular.copy(comment);
            console.log($scope.comment);
            $scope.comment.comment = angular.copy(comment.comment);
            $scope.comments.splice(index, 1);
            ngDialog.open({
                template: "/app/components/projects/views/project.task-comment.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        console.log($scope.review);
                        var windowIDs = ngDialog.getOpenDialogs();
                        $scope.agregarComentario();
                        ngDialog.close(windowIDs[1]);
                    },
                    cancel: function() {
                        $scope.comments.splice(index, 0, $scope.oldComment);
                        var windowIDs = ngDialog.getOpenDialogs();
                        ngDialog.close(windowIDs[1]);
                    }
                }
            });
        };
        $scope.deleteComment = function(index) {
            console.log(index);
            $scope.comments.splice(index, 1);
            console.log($scope.comments);
        };
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("TasksCtrl", [ "$scope", "$rootScope", "$timeout", "$filter", "TasksServices", "ProjectsServices", "UserServices", "ngDialog", "PreviousState", "$stateParams", function($scope, $rootScope, $timeout, $filter, TasksServices, ProjectsServices, UserServices, ngDialog, PreviousState, $stateParams) {
        $scope.tasks = [];
        $scope.task = {};
        $scope.duration = {};
        $scope.users = [];
        $scope.usersAux = {};
        $scope.allTasks = [];
        $scope.filter = {};
        $scope.currentPage = 0;
        $scope.comments = [];
        $scope.comment = {};
        $scope.allStatus = [ "To-do", "Done", "In-Progress", "In-Review" ];
        $scope.state = "";
        $scope.filterTask = {};
        $scope.filterTask.limit = 15;
        $scope.filterTask.offset = 0;
        $scope.filterTask.filter = [];
        var idUser = $stateParams.id;
        var timeout;
        $scope.$watch("filter", function() {
            $timeout.cancel(timeout);
            timeout = $timeout(function() {
                $scope.filterTasks();
            }, 250);
        }, true);
        if ($rootScope.isAdmin == "true" && PreviousState.Name != "app.users") {
            $scope.allStatus = [ "Done", "In-Progress", "In-Review" ];
            TasksServices.findByFilter($scope.filterTask, function(err, tasks, countItems) {
                if (!err) {
                    console.log("tasks", tasks, countItems);
                    $scope.allTasks = tasks;
                    $scope.tasks = tasks.slice(0, PAGE_SIZE - 1);
                    $scope.total = countItems;
                }
            });
        } else if ($rootScope.isAdmin == "true" && PreviousState.Name == "app.users") {
            $scope.allStatus = [ "Done", "In-Progress", "In-Review" ];
            TasksServices.findByIdUser(idUser, $scope.filterTask, function(err, tasks, countItems) {
                if (!err) {
                    console.log("tasks", tasks, countItems);
                    $scope.allTasks = tasks;
                    $scope.tasks = tasks.slice(0, PAGE_SIZE - 1);
                    $scope.total = countItems;
                }
            });
        } else if ($rootScope.isClient == "true") {
            $scope.allStatus = [ "In-Progress", "In-Review" ];
            TasksServices.findByIdClient($rootScope.userIdClient, function(err, tasks) {
                if (!err) {
                    $scope.allTasks = tasks;
                    $scope.tasks = tasks.slice(0, PAGE_SIZE - 1);
                    $scope.total = tasks.length;
                    console.log($scope.allTasks);
                }
            });
        } else {
            $scope.allStatus = [ "In-Progress", "In-Review" ];
            console.log($rootScope.userId);
            TasksServices.findByIdUser($rootScope.userId, $scope.filterTask, function(err, tasks, countItems) {
                if (!err) {
                    console.log("tasksFilter", tasks, countItems);
                    $scope.allTasks = tasks;
                    $scope.tasks = tasks.slice(0, PAGE_SIZE - 1);
                    $scope.total = countItems;
                }
            });
        }
        UserServices.find(0, "", function(err, users) {
            if (!err) {
                $scope.users = users;
            }
        });
        $scope.editTask = function(index, task) {
            $scope.task = angular.copy(task);
            if ($scope.task.duration) {
                var duration = $scope.task.duration.split(":");
                $scope.task.hour = parseInt(duration[0]);
                $scope.task.mins = parseInt(duration[1]);
                $scope.task.secs = parseInt(duration[2]);
            }
            if ($scope.task.startDate) {
                $scope.task.startDate = moment($scope.task.startDate).format("DD/MM/YYYY");
            }
            if ($scope.task.endDate) {
                $scope.task.endDate = moment($scope.task.endDate).format("DD/MM/YYYY");
            }
            $scope.state = $scope.task.status;
            try {
                var arr = $scope.task.comments.split('"comment":');
                var arr = $scope.task.comments ? $scope.task.comments.split('"comment":') : Array();
                if (arr[0] == "[{") {
                    $scope.comments = JSON.parse($scope.task.comments);
                } else {
                    $scope.comments = [];
                }
            } catch (e) {
                console.log("No tiene comentarios.");
            }
            console.log("$scope.task", $scope.task);
            if ($scope.task.users) {
                $scope.task.users = JSON.parse($scope.task.users);
                _.each($scope.task.users, function(user) {
                    $scope.usersAux[user.idUser] = true;
                });
            } else {
                $scope.task.users = [];
            }
            ngDialog.open({
                template: "/app/components/projects/views/project.task.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        console.log("push task");
                        $scope.task.users = [];
                        console.log($scope.usersAux);
                        for (var user in $scope.usersAux) {
                            console.log(user);
                            if ($scope.usersAux[user]) {
                                $scope.task.users.push({
                                    idUser: user
                                });
                            }
                        }
                        $scope.emailUsers = angular.copy($scope.task.users);
                        $scope.task.users = JSON.stringify($scope.task.users);
                        $scope.task.comments = JSON.stringify($scope.comments);
                        if ($scope.task.id) {
                            if ($scope.task.startDate) {
                                var arrStart = $scope.task.startDate.split("/");
                                $scope.task.startDate = new Date(arrStart[2], arrStart[1] - 1, arrStart[0]);
                            }
                            if ($scope.task.endDate) {
                                var arrStart = $scope.task.endDate.split("/");
                                $scope.task.endDate = new Date(arrStart[2], arrStart[1] - 1, arrStart[0]);
                            }
                            console.log($scope.emailUsers);
                            $scope.task.duration = $scope.task.hour + ":" + $scope.task.mins + ":" + $scope.task.secs;
                            console.log("TASK TO UPDATE", $scope.task);
                            ProjectsServices.saveProjectTask($scope.task, function(err, result) {
                                console.log("result::: ", result);
                                if (!err) {
                                    $scope.tasks[index] = angular.copy($scope.task);
                                    $scope.task = {};
                                }
                            });
                        }
                        ngDialog.close();
                    },
                    cancel: function() {
                        $scope.task = {};
                        ngDialog.close();
                    }
                }
            });
            $scope.error = "";
        };
        $scope.filterTasks = function() {
            $scope.filterTask.offset = 0;
            $scope.filterTask.filter = [];
            if ($scope.filter) {
                if ($scope.filter.projectName) {
                    $scope.filterTask.filter.push({
                        projectName: $scope.filter.projectName
                    });
                }
                if ($scope.filter.name) {
                    $scope.filterTask.filter.push({
                        name: $scope.filter.name
                    });
                }
                if ($scope.filter.description) {
                    $scope.filterTask.filter.push({
                        description: $scope.filter.description
                    });
                }
            }
            if ($rootScope.isAdmin == "true" && PreviousState.Name != "app.users") {
                $scope.allStatus = [ "Done", "In-Progress", "In-Review" ];
                TasksServices.findByFilter($scope.filterTask, function(err, tasks, countItems) {
                    if (!err) {
                        console.log("tasks", tasks, countItems);
                        $scope.allTasks = tasks;
                        $scope.tasks = tasks.slice(0, PAGE_SIZE - 1);
                        $scope.total = countItems;
                    }
                });
            } else if ($rootScope.isAdmin == "true" && PreviousState.Name == "app.users") {
                $scope.allStatus = [ "Done", "In-Progress", "In-Review" ];
                console.log("PREVIUS STATE app.users :: ", PreviousState.Name);
                TasksServices.findByIdUser(idUser, $scope.filterTask, function(err, tasks, countItems) {
                    if (!err) {
                        console.log("tasks", tasks, countItems);
                        $scope.allTasks = tasks;
                        $scope.tasks = tasks.slice(0, PAGE_SIZE - 1);
                        $scope.total = countItems;
                    }
                });
            } else if ($rootScope.isClient == "true") {
                $scope.allStatus = [ "In-Progress", "In-Review" ];
                TasksServices.findByIdClient($rootScope.userIdClient, function(err, tasks) {
                    if (!err) {
                        $scope.allTasks = tasks;
                        $scope.tasks = tasks.slice(0, PAGE_SIZE - 1);
                        $scope.total = tasks.length;
                        console.log($scope.allTasks);
                    }
                });
            } else {
                $scope.allStatus = [ "In-Progress", "In-Review" ];
                console.log($rootScope.userId);
                TasksServices.findByIdUser($rootScope.userId, $scope.filterTask, function(err, tasks, countItems) {
                    if (!err) {
                        console.log("tasksFilter", tasks, countItems);
                        $scope.allTasks = tasks;
                        $scope.tasks = tasks.slice(0, PAGE_SIZE - 1);
                        $scope.total = countItems;
                    }
                });
            }
        };
        $scope.pager = function(page) {
            console.log("page", page - 1);
            var offset = PAGE_SIZE * (page - 1);
            $scope.filterTask.offset = offset;
            if ($rootScope.isAdmin == "true" && PreviousState.Name != "app.users") {
                $scope.allStatus = [ "Done", "In-Progress", "In-Review" ];
                TasksServices.findByFilter($scope.filterTask, function(err, tasks, countItems) {
                    if (!err) {
                        console.log("tasks", tasks, countItems);
                        $scope.allTasks = tasks;
                        $scope.tasks = tasks.slice(0, PAGE_SIZE - 1);
                        $scope.total = countItems;
                    }
                });
            } else if ($rootScope.isAdmin == "true" && PreviousState.Name == "app.users") {
                $scope.allStatus = [ "Done", "In-Progress", "In-Review" ];
                console.log("PREVIUS STATE app.users :: ", PreviousState.Name);
                TasksServices.findByIdUser(idUser, $scope.filterTask, function(err, tasks, countItems) {
                    if (!err) {
                        console.log("tasks", tasks, countItems);
                        $scope.allTasks = tasks;
                        $scope.tasks = tasks.slice(0, PAGE_SIZE - 1);
                        $scope.total = countItems;
                    }
                });
            } else if ($rootScope.isClient == "true") {
                $scope.allStatus = [ "In-Progress", "In-Review" ];
                TasksServices.findByIdClient($rootScope.userIdClient, function(err, tasks) {
                    if (!err) {
                        $scope.allTasks = tasks;
                        $scope.tasks = tasks.slice(0, PAGE_SIZE - 1);
                        $scope.total = tasks.length;
                        console.log($scope.allTasks);
                    }
                });
            } else {
                $scope.allStatus = [ "In-Progress", "In-Review" ];
                console.log($rootScope.userId);
                TasksServices.findByIdUser($rootScope.userId, $scope.filterTask, function(err, tasks, countItems) {
                    if (!err) {
                        console.log("tasksFilter", tasks, countItems);
                        $scope.allTasks = tasks;
                        $scope.tasks = tasks.slice(0, PAGE_SIZE - 1);
                        $scope.total = countItems;
                    }
                });
            }
        };
        $scope.agregarComentario = function() {
            if ($scope.comment.comment) {
                $scope.comment.userName = $rootScope.userName;
                $scope.comments.push($scope.comment);
                $scope.comment = {};
            }
        };
        $scope.editComments = function(index, comment) {
            $scope.oldComment = angular.copy(comment);
            console.log($scope.comment);
            $scope.comment.comment = angular.copy(comment.comment);
            $scope.comments.splice(index, 1);
            ngDialog.open({
                template: "/app/components/projects/views/project.task-comment.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        console.log($scope.review);
                        var windowIDs = ngDialog.getOpenDialogs();
                        $scope.agregarComentario();
                        ngDialog.close(windowIDs[1]);
                    },
                    cancel: function() {
                        $scope.comments.splice(index, 0, $scope.oldComment);
                        var windowIDs = ngDialog.getOpenDialogs();
                        ngDialog.close(windowIDs[1]);
                    }
                }
            });
        };
        $scope.openModalComentario = function() {
            $scope.comment = {};
            ngDialog.open({
                template: "/app/components/projects/views/project.task-comment.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        console.log($scope.review);
                        var windowIDs = ngDialog.getOpenDialogs();
                        $scope.agregarComentario();
                        ngDialog.close(windowIDs[1]);
                    },
                    cancel: function() {
                        var windowIDs = ngDialog.getOpenDialogs();
                        ngDialog.close(windowIDs[1]);
                    }
                }
            });
        };
        $scope.changeStatus = function() {
            console.log("TASK", $scope.task.status, "STATE", $scope.state);
            if ($scope.state == "In-Progress" && $scope.task.status == "In-Review") {
                console.log("OPEN MODAL");
                ngDialog.open({
                    template: "/app/components/projects/views/project.task-review.modal.html",
                    showClose: true,
                    scope: $scope,
                    disableAnimation: true,
                    data: {
                        confirm: function() {
                            console.log($scope.review);
                            var windowIDs = ngDialog.getOpenDialogs();
                            sendEmail($scope.task, $scope.review.user);
                            ngDialog.close(windowIDs[1]);
                        },
                        cancel: function() {
                            var windowIDs = ngDialog.getOpenDialogs();
                            ngDialog.close(windowIDs[1]);
                        }
                    }
                });
            }
            $scope.state = $scope.task.status;
        };
        $scope.taskForm = function(task) {
            console.log("task form::", task);
            $scope.taskForm = task;
        };
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("tasks_trelloCtrl", [ "$scope", "$rootScope", "$timeout", "$filter", "tasks_trelloServices", "ProjectsServices", "UserServices", "ngDialog", "$state", "$stateParams", function($scope, $rootScope, $timeout, $filter, tasks_trelloServices, ProjectsServices, UserServices, ngDialog, $state, $stateParams) {
        $scope.tasks_trello = [];
        $scope.task_trello = {};
        $scope.duration = {};
        $scope.users = [];
        $scope.usersAux = {};
        $scope.allTasks_trello = [];
        $scope.filter = {};
        $scope.currentPage = 0;
        $scope.comments = [];
        $scope.comment = {};
        $scope.allStatus = [ "To-do", "Done", "In-Progress", "In-Review" ];
        $scope.state = "";
        $scope.boards = [];
        var key = "2f132aeb2a02c90e0966cbcfd9f45329";
        var token = "c9e22df4e936322b7949cc9b98c0e972f8991099f8bbb5733e70956abcd06ff4";
        var timeout;
        $scope.$watch("filter", function() {
            $timeout.cancel(timeout);
            timeout = $timeout(function() {
                $scope.filterTasks_trello();
            }, 250);
        }, true);
        if ($rootScope.isAdmin == "true") {
            $scope.allStatus = [ "Done", "In-Progress", "In-Review" ];
            tasks_trelloServices.find($scope.currentPage, $scope.query, function(err, tasks_trello, countItems) {
                if (!err) {
                    $scope.allTasks_trello = tasks_trello;
                    if (tasks_trello) {
                        $scope.tasks_trello = tasks_trello.slice(0, PAGE_SIZE);
                        $scope.total = tasks_trello.length;
                    }
                }
            });
        } else if ($rootScope.isClient == "true") {
            $scope.allStatus = [ "In-Progress", "In-Review" ];
            tasks_trelloServices.findByIdClient($rootScope.userIdClient, function(err, tasks_trello) {
                if (!err) {
                    $scope.tasks_trello = tasks_trello;
                    $scope.tasks_trello = tasks_trello.slice(0, PAGE_SIZE);
                    $scope.total = tasks_trello.length;
                }
            });
        } else {
            $scope.allStatus = [ "Done", "In-Progress", "In-Review" ];
            tasks_trelloServices.find($scope.currentPage, $scope.query, function(err, tasks_trello, countItems) {
                if (!err) {
                    $scope.allTasks_trello = tasks_trello;
                    if (tasks_trello) {
                        $scope.tasks_trello = tasks_trello.slice(0, PAGE_SIZE);
                        $scope.total = tasks_trello.length;
                    }
                }
            });
        }
        UserServices.find(0, "", function(err, users) {
            if (!err) {
                $scope.users = users;
            }
        });
        $scope.addBoard = function() {
            ProjectsServices.find($scope.currentPage, $scope.query, function(err, projects, countItems) {
                if (!err) {
                    $scope.getProjects = projects;
                    $scope.selected = {
                        value: $scope.getProjects
                    };
                }
            });
            tasks_trelloServices.getBoards(function(resp) {
                $scope.boards = resp;
                $scope.selected = {
                    url: $scope.boards
                };
            });
            ngDialog.open({
                template: "/app/components/tasks/taskTrello/views/createTable.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    cancel: function() {
                        ngDialog.close();
                    },
                    confirm: function() {
                        var trelloObj = {
                            idBoard: $scope.selected.url.id,
                            url: $scope.selected.url.url,
                            project: $scope.selected.value.id
                        };
                        tasks_trelloServices.saveBoards(trelloObj, function(resp) {});
                        $state.reload();
                    }
                }
            });
        };
        $scope.editBoard = function(board) {
            console.log(board);
            $scope.selected = {};
            ProjectsServices.find($scope.currentPage, $scope.query, function(err, projects, countItems) {
                if (!err) {
                    $scope.getProjects = projects;
                    $scope.selected.value = $scope.getProjects.find(function(element) {
                        return element.id == board.proyecto_id;
                    });
                }
            });
            tasks_trelloServices.getBoards(function(resp) {
                $scope.boards = resp;
                $scope.selected.url = $scope.boards.find(function(element) {
                    return element.id == board.tablero_id;
                });
            });
            ngDialog.open({
                template: "/app/components/tasks/taskTrello/views/createTable.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        var trelloObj = {
                            id: board.id,
                            idBoard: $scope.selected.url.id,
                            url: $scope.selected.url.url,
                            project: $scope.selected.value.id
                        };
                        tasks_trelloServices.updateBoard(trelloObj, function(res, err) {});
                        $state.reload();
                    },
                    cancel: function() {
                        ngDialog.close();
                    }
                }
            });
        };
        $scope.deleteBoardTrello = function(id) {
            console.log("Board trello", id);
            tasks_trelloServices.deleteBoardTrello(id, function(err, res) {
                console.log("Tablero trello eliminada::", err, res);
            });
        };
        $scope.filterTasks_trello = function() {
            $scope.currentPage = 0;
            $scope.tasks_trello = $filter("filter")($scope.allTasks_trello, $scope.filter);
            if ($scope.tasks_trello) {
                $scope.total = $scope.tasks_trello.length;
                $scope.tasks_trello = $scope.tasks_trello.slice(0, PAGE_SIZE);
            }
        };
        $scope.pager = function(page) {
            var offset = PAGE_SIZE * (page - 1);
            $scope.tasks_trello = $scope.allTasks_trello.slice(offset, offset + PAGE_SIZE);
        };
        $scope.agregarComentario = function() {
            if ($scope.comment.comment) {
                $scope.comment.userName = $rootScope.userName;
                $scope.comments.push($scope.comment);
                $scope.comment = {};
            }
        };
        $scope.editComments = function(index, comment) {
            $scope.oldComment = angular.copy(comment);
            $scope.comment.comment = angular.copy(comment.comment);
            $scope.comments.splice(index, 1);
            ngDialog.open({
                template: "/app/components/projects/views/project.task-comment.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        var windowIDs = ngDialog.getOpenDialogs();
                        $scope.agregarComentario();
                        ngDialog.close(windowIDs[1]);
                    },
                    cancel: function() {
                        $scope.comments.splice(index, 0, $scope.oldComment);
                        var windowIDs = ngDialog.getOpenDialogs();
                        ngDialog.close(windowIDs[1]);
                    }
                }
            });
        };
        $scope.openModalComentario = function() {
            $scope.comment = {};
            ngDialog.open({
                template: "/app/components/projects/views/project.task-comment.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        var windowIDs = ngDialog.getOpenDialogs();
                        $scope.agregarComentario();
                        ngDialog.close(windowIDs[1]);
                    },
                    cancel: function() {
                        var windowIDs = ngDialog.getOpenDialogs();
                        ngDialog.close(windowIDs[1]);
                    }
                }
            });
        };
        $scope.changeStatus = function() {
            if ($scope.state == "In-Progress" && $scope.task_trello.status == "In-Review") {
                ngDialog.open({
                    template: "/app/components/projects/views/project.task-review.modal.html",
                    showClose: true,
                    scope: $scope,
                    disableAnimation: true,
                    data: {
                        confirm: function() {
                            var windowIDs = ngDialog.getOpenDialogs();
                            sendEmail($scope.task_trello, $scope.review.user);
                            ngDialog.close(windowIDs[1]);
                        },
                        cancel: function() {
                            var windowIDs = ngDialog.getOpenDialogs();
                            ngDialog.close(windowIDs[1]);
                        }
                    }
                });
            }
            $scope.state = $scope.task_trello.status;
        };
        $scope.deleteBoard = function(board) {
            tasks_trelloServices.deleteBoardTrello(board.id, function(res, err) {
                tasks_trelloServices.find($scope.currentPage, $scope.query, function(err, tasks_trello, countItems) {
                    if (!err) {
                        $scope.allTasks_trello = tasks_trello;
                        if (tasks_trello) {
                            $scope.tasks_trello = tasks_trello.slice(0, PAGE_SIZE);
                            $scope.total = tasks_trello.length;
                        }
                    }
                });
            });
        };
        $scope.tutorialBot = function() {
            var vm = this;
            vm.currentStep = 1;
            vm.steps = [ {
                step: 1,
                name: "First step",
                template: "step1.html"
            }, {
                step: 2,
                name: "Second step",
                template: "step2.html"
            }, {
                step: 3,
                name: "Third step",
                template: "step3.html"
            }, {
                step: 4,
                name: "Fourth step",
                template: "step4.html"
            } ];
            vm.user = {};
            vm.gotoStep = function(newStep) {
                vm.currentStep = newStep;
            };
            vm.getStepTemplate = function() {
                for (var i = 0; i < vm.steps.length; i++) {
                    if (vm.currentStep == vm.steps[i].step) {
                        return vm.steps[i].template;
                    }
                }
            };
            ngDialog.open({
                template: "/app/components/tasks/taskTrello/views/tutorialBot.modal.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    confirm: function() {
                        ngDialog.close();
                    },
                    cancel: function() {
                        ngDialog.close();
                    }
                }
            });
            $scope.error = "";
        };
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("task_trelloCtrl", [ "$scope", "$rootScope", "$state", "$stateParams", "$filter", "tasks_trelloServices", "ngDialog", "ProjectsServices", "ClientServices", function($scope, $rootScope, $state, $stateParams, $filter, tasks_trelloServices, ngDialog, ProjectsServices, ClientServices) {
        $scope.isLoaded = false;
        $scope.sendingData = false;
        var idTask_trello = $stateParams.id;
        $scope.board = {};
        $scope.tasks = [];
        $scope.task_trello = {};
        $scope.boardLabels = [];
        $scope.membersBoard = [];
        $scope.membersCard = [];
        $scope.isEditing = false;
        $scope.isCardMembers = true;
        $scope.isBoardMembers = false;
        $scope.tareas = [];
        $scope.lists = [];
        $scope.selectedList = {};
        $scope.listas = [];
        $scope.labels = {};
        $scope.userList = [];
        var key = Trello_Key;
        var token = Trello_Token;
        var projectId;
        try {
            if (idTask_trello) {
                tasks_trelloServices.findById(idTask_trello, function(err, tasks_trello, countItems) {
                    $scope.board = angular.copy(tasks_trello[0]);
                    console.log("BOARD", $scope.board);
                    tasks_trelloServices.getLists($scope.board.tablero_id, function(resp, err) {
                        $scope.lists.push.apply($scope.lists, resp);
                        $scope.listas = angular.copy(resp);
                        console.log("listas", $scope.listas);
                        angular.forEach($scope.lists, function(list) {
                            if (list.name.toLowerCase() == "in-progress" || list.name.toLowerCase() == "tasks") {
                                $scope.userList.push(list);
                                console.log("USER LIST", $scope.userList);
                                tasks_trelloServices.getCardByLists(list.id, function(resp, err) {
                                    if (resp) {
                                        $scope.tareas.push.apply($scope.tareas, resp);
                                        console.log("TAREAS", $scope.tareas);
                                        angular.forEach($scope.tareas, function(tarea, index) {
                                            if ($scope.tareas.length == index + 1) {
                                                $scope.isLoaded = true;
                                                console.log("TASKS", $scope.tasks);
                                            }
                                            var fixedTarea = angular.copy(tarea);
                                            tarea.idboard = $scope.board.tablero_id;
                                            tarea.idProyecto = $scope.board.proyecto_id;
                                            tarea.id_project = $scope.board.proyecto_id;
                                            tarea.idTask = tarea.id;
                                            tarea.card_id = tarea.id;
                                            tarea.project = $scope.board.projectName;
                                            tarea.longIdCard = tarea.id;
                                            tasks_trelloServices.saveTaskTrello(tarea, function(err, result) {
                                                tasks_trelloServices.getLabelsByCard(tarea.id, function(resp, err) {
                                                    if (resp) {
                                                        var objAux = {
                                                            id: "",
                                                            idBoard: $scope.board.tablero_id,
                                                            name: "All",
                                                            color: ""
                                                        };
                                                        resp.unshift(objAux);
                                                        $scope.labels.selected = angular.copy(objAux.name);
                                                        tarea.selectStatus = resp;
                                                        tarea.status = "";
                                                        angular.forEach(resp, function(status) {
                                                            if (resp.length > 1 && tarea.status != "" && tarea.status != "All") {
                                                                tarea.status += " | ";
                                                            }
                                                            tarea.statusAll += status.name;
                                                            tarea.status += status.name == "All" ? "" : status.name;
                                                        });
                                                        tasks_trelloServices.findByIdCard(tarea.id, tarea.id, function(err, idCard) {
                                                            if (!err) {
                                                                angular.forEach(idCard, function(element) {
                                                                    if (tarea.id == element.card_id) {
                                                                        tarea.id = element.id;
                                                                        tarea.isPlayable = true;
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                                tasks_trelloServices.getListByCard(tarea.id, function(resp, err) {
                                                    if (resp) {
                                                        tarea.listaId = angular.copy(resp.id);
                                                        tarea.listaName = angular.copy(resp.name);
                                                        console.log(resp);
                                                    }
                                                });
                                            });
                                        });
                                        setTimeout(function() {
                                            $scope.tasks = $scope.tareas;
                                        }, 500);
                                        $scope.tasks = $scope.tareas;
                                    }
                                });
                            }
                        });
                    });
                    var objAux = {
                        id: "",
                        name: "All"
                    };
                    $scope.userList.unshift(objAux);
                    $scope.selectedList.selected = angular.copy(objAux);
                    tasks_trelloServices.getLabels($scope.board.tablero_id, function(resp, err) {
                        if (resp) {
                            var objAux = {
                                id: "",
                                idBoard: $scope.board.tablero_id,
                                name: "All",
                                color: ""
                            };
                            resp.unshift(objAux);
                            $scope.boardLabels = angular.copy(resp);
                        }
                        console.log("BOARD LABELS", $scope.boardLabels);
                    });
                    tasks_trelloServices.getMembers($scope.board.tablero_id, function(res, err) {
                        var idMembers = angular.copy(res);
                        angular.forEach(idMembers, function(member) {
                            tasks_trelloServices.getMemberById(member.id, function(res, err) {
                                if (res) {
                                    $scope.membersBoard.push(res);
                                }
                            });
                        });
                    });
                });
                $scope.mostrarLabels = false;
                $scope.desplegarLabels = function() {
                    $scope.mostrarLabels = !$scope.mostrarLabels;
                };
                $scope.editTrello = function(item) {
                    angular.forEach($scope.membersBoard, function(memberBoard) {
                        if (memberBoard.isAsigned) {
                            delete memberBoard.isAsigned;
                        }
                    });
                    $scope.task_trello = item;
                    $scope.isCardMembers = true;
                    $scope.isBoardMembers = false;
                    tasks_trelloServices.getCardMembers($scope.task_trello.card_id, function(res, err) {
                        $scope.membersCard = res;
                        if (res) {
                            tasks_trelloServices.getChecklistCard($scope.task_trello.card_id, function(res, err) {
                                if (res) {
                                    if (res[0] && res[0].checkItems) {
                                        var checklist = res[0].checkItems;
                                        angular.forEach(checklist, function(item) {
                                            if (item.state == "complete") {
                                                item.complete = true;
                                            } else {
                                                item.complete = false;
                                            }
                                        });
                                        $scope.checklist = checklist;
                                    }
                                    ngDialog.open({
                                        template: "/app/components/tasks/taskTrello/views/taskTrello.modal.html",
                                        showClose: true,
                                        scope: $scope,
                                        disableAnimation: true,
                                        data: {
                                            confirm: function() {
                                                if (item.name != "") {
                                                    tasks_trelloServices.updateCard(item, function(res, err) {
                                                        if (item.description) {
                                                            tasks_trelloServices.addComment(item, function(res, err) {});
                                                        }
                                                    });
                                                    ngDialog.close();
                                                }
                                            },
                                            cancel: function() {
                                                ngDialog.close();
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });
                };
                $scope.mostrarLabel = false;
                $scope.makeActive = function(getLabel) {
                    $scope.selectedType = getLabel;
                    if (getLabel == "label") {
                        $scope.mostrarLabel = !$scope.mostrarLabel;
                    }
                };
                $scope.showAllMembers = function() {
                    $scope.isCardMembers = false;
                    $scope.isBoardMembers = true;
                    angular.forEach($scope.membersBoard, function(memberBoard) {
                        if ($scope.membersCard) {
                            angular.forEach($scope.membersCard, function(memberCard) {
                                if (memberCard.id == memberBoard.id) {
                                    memberBoard.isAsigned = true;
                                    return;
                                }
                            });
                        }
                    });
                };
                $scope.showCardMembers = function() {
                    $scope.isCardMembers = true;
                    $scope.isBoardMembers = false;
                };
                $scope.assingMember = function(member) {
                    var obj = {
                        idMember: member.id,
                        idCard: $scope.task_trello.card_id
                    };
                    if (!member.isAsigned) {
                        tasks_trelloServices.unassignMember(obj, function(res, err) {
                            if (res) {
                                delete member.isAsigned;
                                $scope.membersCard = res;
                            }
                        });
                    } else {
                        tasks_trelloServices.assignMember(obj, function(res, err) {
                            if (res) {
                                $scope.membersCard = JSON.parse(res);
                            }
                        });
                    }
                };
                $scope.editStatus = function(status) {
                    $scope.originalStatus = angular.copy(status);
                    $scope.isEditing = true;
                    status.isEdited = true;
                };
                $scope.confirmStatus = function(status) {
                    $scope.isEditing = false;
                    delete status.isEdited;
                    if (status.id != $scope.originalStatus.id) {
                        angular.forEach($scope.boardLabels, function(label) {
                            if (status.id == label.id) {
                                status.name = label.name;
                                status.color = label.color;
                                status.idBoard = label.idBoard;
                            }
                        });
                        tasks_trelloServices.desactiveLabel($scope.task_trello.card_id, $scope.originalStatus.id, function(res, err) {
                            tasks_trelloServices.updateLabelTask($scope.task_trello.card_id, status.id, function(res, err) {});
                        });
                    }
                };
                $scope.cancelEditStatus = function(status) {
                    status.id = $scope.originalStatus.id;
                    status.name = $scope.originalStatus.name;
                    status.color = $scope.originalStatus.color;
                    status.idBoard = $scope.originalStatus.idBoard;
                    $scope.isEditing = false;
                    delete status.isEdited;
                };
                $scope.updateChecklist = function(item) {
                    console.log(item);
                    item.card_id = $scope.task_trello.card_id;
                    if (item.complete == true) {
                        item.state = "complete";
                    } else {
                        item.state = "incomplete";
                    }
                    tasks_trelloServices.updateChecklistCard(item, function(res, err) {});
                };
                $scope.tutorial = function() {
                    var vm = this;
                    vm.currentStep = 1;
                    vm.steps = [ {
                        step: 1,
                        name: "First step",
                        template: "step1.html"
                    }, {
                        step: 2,
                        name: "Second step",
                        template: "step2.html"
                    }, {
                        step: 3,
                        name: "Third step",
                        template: "step3.html"
                    } ];
                    vm.user = {};
                    vm.gotoStep = function(newStep) {
                        vm.currentStep = newStep;
                    };
                    vm.getStepTemplate = function() {
                        for (var i = 0; i < vm.steps.length; i++) {
                            if (vm.currentStep == vm.steps[i].step) {
                                return vm.steps[i].template;
                            }
                        }
                    };
                    ngDialog.open({
                        template: "/app/components/tasks/taskTrello/views/tutorial.modal.html",
                        showClose: true,
                        scope: $scope,
                        disableAnimation: true,
                        data: {
                            confirm: function() {
                                ngDialog.close();
                            },
                            cancel: function() {
                                ngDialog.close();
                            }
                        }
                    });
                    $scope.error = "";
                };
                $scope.tutorialBot = function() {
                    var vm = this;
                    vm.currentStep = 1;
                    vm.steps = [ {
                        step: 1,
                        name: "First step",
                        template: "step1.html"
                    }, {
                        step: 2,
                        name: "Second step",
                        template: "step2.html"
                    }, {
                        step: 3,
                        name: "Third step",
                        template: "step3.html"
                    }, {
                        step: 4,
                        name: "Fourth step",
                        template: "step4.html"
                    } ];
                    vm.user = {};
                    vm.gotoStep = function(newStep) {
                        vm.currentStep = newStep;
                    };
                    vm.getStepTemplate = function() {
                        for (var i = 0; i < vm.steps.length; i++) {
                            if (vm.currentStep == vm.steps[i].step) {
                                return vm.steps[i].template;
                            }
                        }
                    };
                    ngDialog.open({
                        template: "/app/components/tasks/taskTrello/views/tutorialBot.modal.html",
                        showClose: true,
                        scope: $scope,
                        disableAnimation: true,
                        data: {
                            confirm: function() {
                                ngDialog.close();
                            },
                            cancel: function() {
                                ngDialog.close();
                            }
                        }
                    });
                    $scope.error = "";
                };
            }
        } catch (error) {
            console.log("NO EXISTEN LISTS EN EL BOARD");
        }
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("UserCtrl", [ "$scope", "$state", "$stateParams", "$filter", "UserServices", "ClientServices", "ngDialog", "EvaluateServices", "TracksServices", "WeeklyHourServices", "$rootScope", "$http", "$timeout", function($scope, $state, $stateParams, $filter, UserServices, ClientServices, ngDialog, EvaluateServices, TracksServices, WeeklyHourServices, $rootScope, $http, $timeout) {
        $scope.user = {};
        $scope.sendingData = false;
        var idUser = $stateParams.id;
        $scope.clients = [];
        $scope.performance = {};
        $scope.date = {};
        $rootScope.jiraUser = {};
        $scope.vinculate = false;
        $scope.tabUser = 1;
        $scope.imageLoading = false;
        $scope.imageSrc = "";
        $scope.imageHandler = {
            dataURL: ""
        };
        if (idUser) {
            if (window.localStorage.isDeveloper == "true") {
                UserServices.currentUser(function(err, result) {
                    $scope.imageHandler.dataURL = result.photo ? `${FILES_BASE}${result.photo}` : "";
                    $scope.user = result;
                });
            } else {
                UserServices.findById(idUser, function(err, result) {
                    $scope.imageHandler.dataURL = result.photo ? `${FILES_BASE}${result.photo}` : "";
                    $scope.user = result;
                });
            }
        }
        ClientServices.find($scope.currentPage, $scope.query, function(err, clients, countItems) {
            if (!err) {
                console.log("clients", clients, countItems);
                $scope.clients = angular.copy(clients);
            }
        });
        $scope.save = function() {
            $scope.error = "";
            console.log("user to save", $scope.user);
            if (!$scope.user.name || !$scope.user.email || !$scope.user.role) {
                $rootScope.showToaster("Please fill all fields", "error");
                return;
            }
            if ($scope.user.password.length < 8) {
                $rootScope.showToaster("The password must be at least 8 characters", "error");
                return;
            }
            $scope.sendingData = true;
            UserServices.save($scope.user, function(err, result) {
                if (err) {
                    console.log("error", err);
                    $scope.error = err.message || err.error.message || err.error || err;
                    $sendingData = false;
                    console.log("dale");
                } else {
                    try {
                        if (result.status != "Successfully registered") {
                            $state.go("app.users");
                        } else {
                            $rootScope.userPhoto = $scope.imageHandler.dataURL;
                            $state.go("app.users");
                        }
                        if ($scope.imageHandler.dataURL && $scope.user.id == $rootScope.userId) {
                            $rootScope.userPhoto = $scope.imageHandler.dataURL;
                        }
                    } catch (error) {
                        $state.go("app.users");
                    }
                }
            });
        };
        $scope.delete = function() {
            $scope.sendingData = true;
            ngDialog.open({
                template: "/app/components/users/views/userModalView.html",
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    title: $filter("translate")("users.delete_user"),
                    content: $filter("translate")("users.confirm_delete"),
                    confirm: function() {
                        UserServices.remove($scope.user.id, function(err, result) {
                            if (err) {
                                $scope.error = err.message || err.error.message || err.error || err;
                                $sendingData = false;
                            } else {
                                $state.go("app.users");
                            }
                        });
                    },
                    cancel: function() {
                        ngDialog.close();
                        $scope.sendingData = false;
                    }
                }
            });
        };
        $scope.tab1 = function() {
            var actualMonth = moment().month();
            var pastMonth = moment().month() - 1;
            var allMonths = [ "Enero", "Febrero", "Mayo", "Abril", "Marzo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];
            $scope.date.minDate = moment().subtract(6, "year");
            $scope.date.maxDate = moment().add(0, "year");
            $scope.date.startDate = moment().subtract(1, "year");
            $scope.date.year = moment().year();
            $scope.performance.actual = {};
            $scope.performance.past = {};
            $scope.performance.allMonths = {};
            $scope.identify = true;
            $scope.tabUser = 1;
            $scope.performance.actual.month = {
                idMonth: actualMonth + 1,
                month: allMonths[actualMonth],
                year: moment().year()
            };
            $scope.performance.past.month = {
                idMonth: pastMonth + 1,
                month: allMonths[pastMonth],
                year: moment().year()
            };
            $scope.performance.actual.month.year = moment().year();
            $scope.performance.past.month.year = moment().year();
            if (window.localStorage.isDeveloper == "true") {
                TracksServices.findCurrentByMonth($scope.performance.actual.month, function(err, result) {
                    $scope.performance.actual.month.salary = Object.values(result[0])[0];
                    WeeklyHourServices.currentUser(idUser, function(err, result) {
                        $scope.performance.actual.month.costHour = result[0].costHour;
                        console.log(result[0]);
                        UserServices.saveCurrentPerformance($scope.performance.actual.month, function(err, result) {
                            console.log("save performance", err, result);
                        });
                    });
                });
                UserServices.getPerformanceCurrent($scope.performance.past.month, function(err, result) {
                    console.log("Result past month", result, err);
                    $scope.performance.past.month = result[0];
                });
            } else if (idUser) {
                TracksServices.findByMonth($scope.performance.actual.month, idUser, function(err, result) {
                    $scope.performance.actual.month.salary = Object.values(result[0])[0];
                    WeeklyHourServices.findByIdUser(idUser, function(err, result) {
                        $scope.performance.actual.month.costHour = result[0].costHour;
                        console.log(result[0]);
                        UserServices.savePerformance($scope.performance.actual.month, idUser, function(err, result) {
                            console.log("save performance", err, result);
                        });
                    });
                });
                UserServices.getPerformanceById($scope.performance.past.month, idUser, function(err, result) {
                    console.log("Result past month", result, err);
                    $scope.performance.past.month = result[0];
                });
            } else {}
            $scope.moreMonths = function() {
                $scope.performance.allMonths = {
                    idUser: idUser,
                    actMonth: $scope.performance.actual.month.idMonth,
                    pastMonth: $scope.performance.past.month.idMonth,
                    year: $scope.date.year
                };
                UserServices.allPerformances($scope.performance.allMonths, function(err, result) {
                    if (!err) {
                        $scope.performance.moreMonths = result;
                    }
                });
            };
            $scope.filterYear = function(year) {
                $scope.performance.allMonths = {};
                $scope.performance.allMonths.idUser = idUser;
                $scope.identify = false;
                $scope.performance.allMonths.year = moment(year).year();
                console.log("$scope.performance::", $scope.performance);
                $scope.performance.allMonths.actMonth = "";
                $scope.performance.allMonths.pastMonth = "";
                UserServices.allPerformances($scope.performance.allMonths, function(err, result) {
                    $scope.performance.allMonths = result;
                    if ($scope.performance.allMonths[0].year == $scope.performance.actual.month.year) {
                        $scope.identify = true;
                    }
                });
            };
            console.log("$scope.performance::", $scope.performance);
        };
        $scope.tab2 = function() {
            $scope.tabUser = 2;
            if ($scope.user.jiraToken != null) {
                $scope.vinculate = true;
            } else {
                $scope.jiraInt = function() {
                    if ($scope.user.jiraToken == null) {
                        ngDialog.open({
                            template: "/app/shared/views/alert.modal.html",
                            showClose: true,
                            scope: $scope,
                            disableAnimation: true,
                            data: {
                                titleRequired: "Integración usuario con Jira.",
                                jiraIntegrate: "Para integrar su usuario con Jira es necesario ingresar al link: ",
                                linkJira: "https://id.atlassian.com/manage-profile/security/api-tokens",
                                jiraSecondP: " y 'Crear TOKEN API'. Luego de obtener el token ingresarlo aquí:",
                                confirm: function() {
                                    console.log($rootScope.jiraUser);
                                    UserServices.save($rootScope.jiraUser, function(err, result) {
                                        console.log("Jira token guardado correctamente");
                                    });
                                },
                                cancel: function() {}
                            }
                        });
                    }
                };
            }
        };
        $scope.cleanFile = function() {
            angular.forEach(angular.element("input[type='file']"), function(inputElem) {
                angular.element(inputElem).val(null);
            });
        };
        $scope.toBase64 = function() {
            if (!$scope.imageSrc) return;
            $scope.imageLoading = true;
            const reader = new FileReader($scope.imageSrc);
            reader.onloadend = (() => {
                $scope.imageHandler.dataURL = reader.result;
                $scope.user.image_base = $scope.imageHandler.dataURL;
                $timeout(() => $scope.imageLoading = false, 0);
                $scope.cleanFile();
            });
            reader.readAsDataURL($scope.imageSrc);
        };
        $scope.$watch("imageSrc", function(nw, od) {
            $scope.toBase64();
        });
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("UsersCtrl", [ "$scope", "$timeout", "UserServices", "ngDialog", function($scope, $timeout, UserServices, ngDialog) {
        $scope.users = [];
        $scope.filter = {};
        $scope.query = "";
        $scope.currentPage = 0;
        UserServices.find($scope.currentPage, $scope.query, function(err, users, countItems) {
            if (!err) {
                console.log("users", users, countItems);
                $scope.users = users;
                $scope.total = countItems;
            }
        });
        $scope.pager = function(page) {
            var offset = PAGE_SIZE * (page - 1);
            UserServices.find(offset, $scope.query, function(err, users, countItems) {
                console.log("users", users);
                $scope.users = users;
            });
        };
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("WeeklyHourCtrl", [ "$scope", "$state", "$stateParams", "$rootScope", "$filter", "$timeout", "WeeklyHourServices", "UserServices", "ngDialog", function($scope, $state, $stateParams, $rootScope, $filter, $timeout, WeeklyHourServices, UserServices, ngDialog) {
        $scope.users = [];
        $scope.user = {};
        $scope.select = {};
        $scope.weeklyHour = {};
        $scope.query = "";
        $scope.currentPage = 0;
        var idWeeklyHour = $stateParams.id;
        if (idWeeklyHour) {
            WeeklyHourServices.findById(idWeeklyHour, function(err, response) {
                if (!err) {
                    $scope.weeklyHour = angular.copy(response);
                    if ($scope.weeklyHour.costHour && $scope.weeklyHour.costHour != "") {
                        $scope.weeklyHour.costHour = parseFloat($scope.weeklyHour.costHour);
                    }
                    if ($scope.weeklyHour.workLoad && $scope.weeklyHour.workLoad != "") {
                        $scope.weeklyHour.workLoad = parseFloat($scope.weeklyHour.workLoad);
                    }
                    if ($scope.weeklyHour.idUser && $scope.weeklyHour.idUser != "") {
                        UserServices.findById($scope.weeklyHour.idUser, function(err, resp) {
                            $scope.select.user = angular.copy(resp);
                        });
                    }
                }
            });
        }
        UserServices.find($scope.currentPage, $scope.query, function(err, users, countItems) {
            if (!err) {
                $scope.users = users;
                $scope.total = countItems;
            }
        });
        $scope.save = function() {
            var weeklyHour = angular.copy($scope.weeklyHour);
            if ($scope.select.user) {
                weeklyHour.idUser = $scope.select.user.id;
                weeklyHour.userName = $scope.select.user.name;
            }
            weeklyHour.borrado = 0;
            console.log("weeklyHour to save", weeklyHour);
            WeeklyHourServices.save(weeklyHour, function(err, result) {
                if (!err) {
                    console.log(result);
                    $state.go("app.weeklyHours");
                }
            });
        };
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.controller("WeeklyHoursCtrl", [ "$scope", "$interval", "$rootScope", "$filter", "$timeout", "WeeklyHourServices", "ngDialog", function($scope, $interval, $rootScope, $filter, $timeout, WeeklyHourServices, ngDialog) {
        $scope.weeklyHours = [];
        $scope.query = "";
        $scope.currentPage = 0;
        WeeklyHourServices.find($scope.currentPage, $scope.query, function(err, weeklyHours, countItems) {
            if (!err) {
                $scope.weeklyHours = weeklyHours;
                $scope.total = countItems;
            }
        });
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var Module = ng.module("LexTracking");
    Module.run(function($rootScope, $state, $window) {
        $rootScope.BASEURL = BASE_URL;
        $rootScope.url = window.location.origin;
        $rootScope.$on("$stateChangeSuccess", function(evt, toState, toParams, fromState, fromParams) {
            evt.preventDefault();
            var token = $window.localStorage[TOKEN_KEY];
            if ($state.current.name != "login" && !token) {
                $state.go("login");
            } else {
                $rootScope.userId = $window.localStorage["userId"];
                $rootScope.userName = $window.localStorage["userName"];
                $rootScope.userEmail = $window.localStorage["userEmail"];
                $rootScope.userRole = $window.localStorage["userRole"];
                $rootScope.isAdmin = $window.localStorage["isAdmin"];
            }
            $rootScope.userProfile = $rootScope.url + "/#/app/user/edit/" + $rootScope.userId;
            console.log("$state", $state);
            if ($state.current.name == "app.userEdit" && $rootScope.userRole == "developer") {
                if ($state.params.id != $rootScope.userId) {
                    console.log("$state if", $state);
                    window.localStorage.clear();
                    $state.go("login");
                }
            }
        });
    });
    Module.controller("MainCtrl", [ "$log", "$window", "$rootScope", "$scope", "$state", "$timeout", "TracksServices", "ProjectsServices", "WeeklyHourServices", "ngDialog", "tasks_automaticServices", "TasksServices", function($log, $window, $rootScope, $scope, $state, $timeout, TracksServices, ProjectsServices, WeeklyHourServices, ngDialog, tasks_automaticServices, TasksServices) {
        $scope.thisHide = false;
        $scope.userToolsActive = false;
        $rootScope.inprogress = false;
        $rootScope.toggleActive = function() {
            $scope.userToolsActive = !$scope.userToolsActive;
            console.log("$scope.userToolsActive", $scope.userToolsActive);
        };
        $scope.hideItems = function() {
            $scope.thisHide = !$scope.thisHide;
            $rootScope.shohSwitchTooltip = false;
            console.log("$scope.thisHide", $scope.thisHide);
        };
        var clock;
        $rootScope.timerRunning = false;
        $rootScope.currentTrack = {};
        $scope.timeStart = 0;
        $scope.timeEnd = 0;
        $scope.mode = "Start";
        $scope.timer = "00:00:00";
        $scope.currency = "";
        function checkTime(i) {
            i = i < 1 ? 0 : i;
            if (i < 10) i = "0" + i;
            return i;
        }
        $scope.toggleSelectUsers = function(event) {
            console.log("event", event.target.innerText);
            if (event.target.innerText == "-") {
                event.target.innerText = "+";
                document.querySelectorAll(".toggleSelectUsers")[0].style.display = "none";
            } else if (event.target.innerText == "+") {
                event.target.innerText = "-";
                document.querySelectorAll(".toggleSelectUsers")[0].style.display = "table-row-group";
            }
        };
        function getCurrentDate() {
            var today = new Date(), day = today.getDate(), month = today.getMonth() + 1, year = today.getFullYear(), hours = checkTime(today.getHours()), minutes = checkTime(today.getMinutes()), seconds = checkTime(today.getSeconds());
            return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        }
        function updatePageTitle() {
            if ($rootScope.timerRunning && $scope.timer) {
                document.title = "Tracking: " + $scope.timer;
            } else {
                document.title = "Tracking";
            }
        }
        $scope.startTimer = function(initTime) {
            $scope.mode = "Stop";
            var today = new Date();
            $scope.timeEnd = today.getTime() + initTime;
            var ms = Math.floor(($scope.timeEnd - $scope.timeStart) / 1e3);
            var h = checkTime(Math.floor(ms / 3600));
            ms = Math.floor(ms % 3600);
            var m = checkTime(Math.floor(ms / 60));
            ms = Math.floor(ms % 60);
            var s = checkTime(Math.floor(ms));
            $scope.timer = h + ":" + m + ":" + s;
            updatePageTitle();
            clock = $timeout(function() {
                $scope.startTimer(initTime);
            }, 500);
        };
        $scope.stopTimer = function() {
            $scope.mode = "Start";
            $timeout.cancel(clock);
            $rootScope.currentTrack = {};
        };
        $scope.toggleTimer = function(initTime) {
            initTime = initTime || 0;
            if ($scope.mode === "Start") {
                var today = new Date();
                $scope.timeStart = today.getTime();
                $rootScope.timerRunning = true;
                $scope.startTimer(initTime);
            } else {
                $scope.stopTimer();
            }
        };
        $rootScope.startTrack = function(task, fromDashboard) {
            if (!task) return;
            return new Promise(resolve => {
                WeeklyHourServices.find($scope.currentPage, $scope.query, function(err, weeklyHours, countItems) {
                    angular.forEach(weeklyHours, function(value, index) {
                        if (value.idUser == $rootScope.userId) {
                            if (value.currency == null || value.currency == "") {
                                value.currency = "$";
                            }
                            $scope.currency = value.currency;
                            return;
                        }
                    });
                    if (task.status && task.status.toLowerCase() === "to-do") {
                        task.status = "In-Progress";
                        ProjectsServices.saveProjectTask(task, function(err, result) {
                            console.log("Update Status::", err, result);
                        });
                    }
                    console.log("TTT::", task);
                    if ($rootScope.currentTrack.id) {
                        $rootScope.currentTrack.endTime = getCurrentDate();
                        TracksServices.update($rootScope.currentTrack, function(err, result) {
                            if (!err) {
                                $scope.toggleTimer();
                            }
                        });
                    } else {
                        $rootScope.currentTrack = {
                            idUser: $rootScope.userId,
                            idTask: fromDashboard ? task.idTask : task.id,
                            taskName: task.name || task.taskName,
                            projectName: task.projectName,
                            startTime: getCurrentDate(),
                            endTime: undefined,
                            idProyecto: task.idProject || task.projectId,
                            typeTrack: task.typeTrack || task.type,
                            currency: $scope.currency
                        };
                        console.log("🚀  --\x3e $rootScope.currentTrack ", $rootScope.currentTrack);
                        TracksServices.create($rootScope.currentTrack, function(err, result) {
                            if (!err) {
                                result = result[0];
                                $rootScope.currentTrack.id = result.id;
                                $scope.toggleTimer();
                                $rootScope.topBar.filterTask = angular.copy($rootScope.currentTrack);
                                $rootScope.topBar.filterTask.name = $rootScope.topBar.filterTask.taskName;
                                $rootScope.topBar.filterTask.id = $rootScope.topBar.filterTask.idTask;
                                if (!$rootScope.topBar.taskscondition || $rootScope.topBar.taskscondition.lenght == 0) {
                                    $rootScope.topBar.taskscondition = [ $rootScope.topBar.filterTask ];
                                }
                            }
                        });
                    }
                    resolve();
                });
            });
        };
        $scope.startTrackAuto = function(task_automatic) {
            console.log("ID proyecto automatico", task_automatic);
            if (task_automatic.idProyecto && task_automatic.idProyecto != null && task_automatic.idProyecto != 0) {
                if ($rootScope.currentTrack.id) {
                    $rootScope.currentTrack.endTime = getCurrentDate();
                    TracksServices.update($rootScope.currentTrack, function(err, result) {
                        if (!err) {
                            console.log("saved auto task", result);
                            $scope.toggleTimer();
                        }
                    });
                } else {
                    $rootScope.currentTrack = {
                        idProyecto: task_automatic.idProyecto,
                        idUser: $rootScope.userId,
                        idTask: task_automatic.id,
                        taskName: task_automatic.error,
                        startTime: getCurrentDate(),
                        endTime: undefined,
                        typeTrack: "automatic"
                    };
                    TracksServices.createAutoTask($rootScope.currentTrack, function(err, result) {
                        console.log("resultx::", result);
                        if (!err) {
                            console.log("saved auto task", result);
                            $rootScope.currentTrack.id = result.id;
                            $scope.toggleTimer();
                        }
                    });
                }
            } else {
                ngDialog.open({
                    template: "/app/shared/views/alert.modal.html",
                    showClose: true,
                    scope: $scope,
                    disableAnimation: true,
                    data: {
                        msg: "La tarea automatica necesita asociarse a un proyecto.",
                        titleRequired: "Seleccione proyecto.",
                        prj: {
                            getProj: ProjectsServices.find($scope.currentPage, $scope.query, function(err, projects, countItems) {
                                if (!err) {
                                    $scope.getProjects = projects;
                                    $scope.selected = {
                                        value: $scope.getProjects
                                    };
                                    console.log("Projects select::", $scope.getProjects, $scope.selected);
                                }
                            })
                        },
                        confirm: function() {
                            console.log("ID asociar proyecto", $scope.selected.value.id);
                            var obj = {
                                id: task_automatic.id,
                                idProyecto: $scope.selected.value.id,
                                error: task_automatic.error
                            };
                            console.log(obj);
                            if ($scope.selected.value.id != undefined) {
                                tasks_automaticServices.saveTask_Automatic(obj, function(err, result) {
                                    if (!err) {
                                        console.log("Task automatic actualizada:", result);
                                        $rootScope.currentTrack = {
                                            idUser: $rootScope.userId,
                                            idTask: task_automatic.id,
                                            idProyecto: $scope.selected.value.id,
                                            taskName: obj.error,
                                            startTime: getCurrentDate(),
                                            endTime: undefined,
                                            typeTrack: "automatic"
                                        };
                                        TracksServices.createAutoTask($rootScope.currentTrack, function(err, result) {
                                            console.log("resultx::", err, result);
                                            if (!err) {
                                                console.log("saved auto task", result);
                                                $rootScope.currentTrack.id = result.id;
                                                $scope.toggleTimer();
                                                $state.go("app.tasks_automatic");
                                            }
                                        });
                                    }
                                });
                            }
                        },
                        cancel: function() {}
                    }
                });
            }
        };
        $scope.startTrackTrello = function(tasks_trello) {
            WeeklyHourServices.find($scope.currentPage, $scope.query, function(err, weeklyHours, countItems) {
                if (!err) {
                    angular.forEach(weeklyHours, function(value, index) {
                        if (value.idUser == $rootScope.userId) {
                            if (value.currency == null || value.currency == "") {
                                value.currency = "$";
                            }
                            $scope.currency = value.currency;
                            return;
                        }
                    });
                    $rootScope.inprogress = true;
                    if ($rootScope.currentTrack.id) {
                        $rootScope.currentTrack.endTime = getCurrentDate();
                        TracksServices.update($rootScope.currentTrack, function(err, result) {
                            if (!err) {
                                $scope.toggleTimer();
                            }
                        });
                    } else {
                        $rootScope.currentTrack = {
                            idTask: tasks_trello.id,
                            idUser: $rootScope.userId,
                            idBoard: tasks_trello.idboard,
                            id_project: tasks_trello.id_project,
                            idProyecto: parseInt(tasks_trello.idProyecto),
                            taskName: tasks_trello.name,
                            startTime: getCurrentDate(),
                            endTime: undefined,
                            typeTrack: "trello",
                            currency: $scope.currency,
                            projectName: tasks_trello.project
                        };
                        console.log("TrelloTrack::", $rootScope.currentTrack);
                        TracksServices.createTrelloTask($rootScope.currentTrack, function(err, result) {
                            if (!err) {
                                $rootScope.currentTrack.id = result[0].id;
                                $scope.toggleTimer();
                                $rootScope.inprogress = false;
                                $rootScope.topBar.filterTask = angular.copy($rootScope.currentTrack);
                                $rootScope.topBar.filterTask.name = $rootScope.topBar.filterTask.taskName;
                                $rootScope.topBar.filterTask.id = $rootScope.topBar.filterTask.idTask;
                                if (!$rootScope.topBar.taskscondition || $rootScope.topBar.taskscondition.lenght == 0) {
                                    $rootScope.topBar.taskscondition = [ $rootScope.topBar.filterTask ];
                                }
                                console.log(result[0]);
                            }
                        });
                    }
                }
            });
        };
        $scope.startJiraTrack = function(jira) {
            if ($rootScope.currentTrack.id) {
                $rootScope.currentTrack.endTime = getCurrentDate();
                TracksServices.update($rootScope.currentTrack, function(err, result) {
                    if (!err) {
                        console.log("saved jira task", result);
                        $scope.toggleTimer();
                    }
                });
            } else {
                console.log(jira);
                $rootScope.currentTrack = {
                    idTask: jira.idTask,
                    idUser: $rootScope.userId,
                    idBoard: jira.idBoard,
                    idProyecto: jira.idProyecto,
                    taskName: jira.name,
                    startTime: getCurrentDate(),
                    endTime: undefined,
                    typeTrack: "jira"
                };
                console.log("jiraTrack::", $rootScope.currentTrack);
                TracksServices.createJiraTask($rootScope.currentTrack, function(err, result) {
                    console.log("result jira::", result);
                    if (!err) {
                        $rootScope.currentTrack.id = result[0].id;
                        $scope.toggleTimer();
                        console.log("saved id jiratask", $rootScope.currentTrack.id);
                    }
                });
            }
        };
        $scope.projectsTracked = [];
        $rootScope.currentTrack.trackCost = {};
        $rootScope.currentTrack.tracked = {};
        var convertTime = function(value) {
            var h = moment.duration(value).hours();
            var m = moment.duration(value).minutes();
            var s = moment.duration(value).seconds();
            if (h <= 9) {
                h = "0" + h;
            }
            if (m <= 9) {
                m = "0" + m;
            }
            if (s <= 9) {
                s = "0" + s;
            }
            var finalTracked = h + ":" + m + ":" + s;
            console.log("finaltracked", finalTracked);
            return finalTracked;
        };
        var ConvertTimeToDecimal = function(value) {
            var time = value.split(":");
            var horas = parseFloat(time[0]);
            var minutes = parseFloat(time[1]) / 60;
            var seconds = parseFloat(time[2]) / 3600;
            var fraccionaria = minutes + seconds;
            var decimal = parseFloat(horas + fraccionaria);
            console.log("Tiempo en decimal::", decimal);
            return decimal;
        };
        $scope.stopTrack = function() {
            var ms = 0;
            console.log("stopTrack::", $rootScope.currentTrack, $rootScope.currentTrack.id);
            if ($rootScope.currentTrack && $rootScope.currentTrack.id) {
                $rootScope.currentTrack.endTime = getCurrentDate();
                var start = moment(new Date($rootScope.currentTrack.startTime));
                var end = moment(new Date($rootScope.currentTrack.endTime));
                var tracked = moment.duration(end.diff(start));
                $rootScope.currentTrack.duracion = convertTime(tracked);
                var decimalTime = ConvertTimeToDecimal(convertTime(tracked));
                getTotalCost(decimalTime);
                function getTotalCost(decimalTime) {
                    var idHourCost = $rootScope.userId;
                    console.log(idHourCost);
                    WeeklyHourServices.find($scope.currentPage, $scope.query, function(err, weeklyHours, countItems) {
                        if (!err) {
                            console.log(weeklyHours);
                            if (weeklyHours.length > 0) {
                                var exist = false;
                                angular.forEach(weeklyHours, function(value, key) {
                                    if (value.idUser == $rootScope.userId) {
                                        exist = true;
                                        console.log(value.costHour, "costo hora idUser");
                                        var costo = parseInt(value.costHour);
                                        console.log("costo", costo);
                                        if (value.currency == null || value.currency == "") {
                                            value.currency = "$";
                                        }
                                        $rootScope.currentTrack.currency = value.currency;
                                        console.log(value.currency);
                                        var result = decimalTime * costo;
                                        console.log("total cost", result);
                                        getCost(result);
                                        console.log($rootScope.currentTrack);
                                    }
                                });
                                console.log(weeklyHours);
                                if (exist === false) {
                                    TracksServices.update($rootScope.currentTrack, function(err, result) {
                                        console.log($rootScope.currentTrack);
                                        console.log("Track actualizado con exito 1");
                                        $rootScope.timerRunning = false;
                                        $scope.stopTimer();
                                    });
                                }
                            } else {
                                TracksServices.update($rootScope.currentTrack, function(err, result) {
                                    console.log("Track actualizado con exito 2");
                                    console.log($rootScope.currentTrack);
                                    $rootScope.timerRunning = false;
                                    $scope.stopTimer();
                                });
                            }
                        }
                    });
                }
                var getCost = function(value) {
                    $rootScope.currentTrack.trackCost = JSON.stringify(value);
                    if ($rootScope.currentTrack.idProyecto) {
                        ProjectsServices.findById($rootScope.currentTrack.idProyecto, function(err, result) {
                            var proj = result;
                            tracked = moment.duration(proj.tracked);
                            var newTrack = moment.duration($rootScope.currentTrack.duracion);
                            var projUpd = moment.duration(newTrack).add(tracked);
                            $rootScope.currentTrack.totalTrack = convertTime(projUpd);
                            $rootScope.currentTrack.projCost = Number(proj.totalCost) + Number($rootScope.currentTrack.trackCost);
                            console.log("PROJECT BY ID", proj.totalCost, $rootScope.currentTrack.trackCost);
                            TracksServices.update($rootScope.currentTrack, function(err, result) {
                                console.log("Track actualizado con exito 3");
                                $rootScope.timerRunning = false;
                                console.log($rootScope.currentTrack);
                                $scope.stopTimer();
                            });
                        });
                    } else {
                        TracksServices.update($rootScope.currentTrack, function(err, result) {
                            console.log("Track actualizado con exito 4");
                            $rootScope.timerRunning = false;
                            console.log($rootScope.currentTrack);
                            $scope.stopTimer();
                        });
                    }
                };
            }
        };
        if (!$window.localStorage[TOKEN_KEY]) {
            $log.error("You are not logged in");
            $state.go("login");
        } else {
            $rootScope.showTrackTooltip = true;
            $rootScope.showManualTrackTooltip = false;
            $log.info("Welcome back", $window.localStorage["userName"]);
            $rootScope.userId = $window.localStorage["userId"];
            $rootScope.userName = $window.localStorage["userName"];
            $rootScope.userEmail = $window.localStorage["userEmail"];
            $rootScope.userRole = $window.localStorage["userRole"];
            $rootScope.isAdmin = $window.localStorage["isAdmin"];
            $rootScope.isClient = $window.localStorage["isClient"];
            if ($rootScope.isClient == "true") {
                $rootScope.userIdClient = $window.localStorage["idUserClient"];
            }
            TracksServices.getCurrentUserLastTrack($rootScope.userId, function(err, track) {
                if (!err) {
                    if (track) {
                        console.log("track", track);
                        if (!track.endTime || track.endTime == "0000-00-00 00:00:00") {
                            $rootScope.currentTrack = track;
                            $rootScope.topBar.filterTask = angular.copy($rootScope.currentTrack);
                            var now = new Date().getTime();
                            var start = new Date(track.startTime).getTime();
                            var ms = now - start;
                            $scope.toggleTimer(ms);
                        }
                    }
                }
            });
        }
        $rootScope.topBar = {};
        $rootScope.topBar.filterTask = "";
        $rootScope.topBar.filterTasks = [];
        $rootScope.topBar.tasks = [];
        $rootScope.searchTasks = function(text) {
            console.log("🚀  --\x3e topBar.filterTask", $rootScope.topBar.filterTask);
            if (text) {
                $rootScope.topBar.filterTasks = {
                    filter: [ {
                        name: text
                    } ],
                    limit: 100,
                    offset: 0
                };
                console.log("🚀  --\x3e TEXT", $rootScope.topBar.filterTasks);
                TasksServices.findByFilter($rootScope.topBar.filterTasks, function(err, tasks, countItems) {
                    if (!err) {
                        console.log("TEXT dsadsa tasks", tasks, countItems);
                        $rootScope.topBar.tasks = tasks;
                        console.log("🚀  --\x3e TEXT $scope.topBar.tasks", $rootScope.topBar.tasks);
                    }
                });
            }
        };
    } ]);
})(angular);

(function(ng) {
    "use strict";
    var app = ng.module("LexTracking");
    app.run([ "$rootScope", "$state", "$stateParams", function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.pageSize = PAGE_SIZE;
    } ]);
    app.config([ "$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(false);
        if (window.localStorage[TOKEN_KEY]) {
            $urlRouterProvider.otherwise("/app/dashboard");
        } else {
            $urlRouterProvider.otherwise("/login");
        }
        $stateProvider.state("Default", {});
        $stateProvider.state("app", {
            abstract: true,
            url: "/app",
            templateUrl: "app/shared/views/app.html",
            controller: "MainCtrl"
        }).state("app.dashboard", {
            url: "/dashboard",
            templateUrl: "app/components/dashboard/views/indexView.html",
            controller: "DashboardCtrl"
        }).state("login", {
            url: "/login",
            templateUrl: "app/components/session/views/indexView.html",
            controller: "AuthCtrl"
        }).state("app.users", {
            url: "/users",
            templateUrl: "app/components/users/views/usersView.html",
            controller: "UsersCtrl"
        }).state("app.userNew", {
            url: "/user/new",
            templateUrl: "app/components/users/views/userFormView.html",
            controller: "UserCtrl"
        }).state("app.userEdit", {
            url: "/user/edit/:id",
            templateUrl: "app/components/users/views/userFormView.html",
            controller: "UserCtrl"
        }).state("app.clients", {
            url: "/clients",
            templateUrl: "app/components/clients/views/clientsView.html",
            controller: "ClientsCtrl"
        }).state("app.clientNew", {
            url: "/client/new",
            templateUrl: "app/components/clients/views/clientFormView.html",
            controller: "ClientCtrl"
        }).state("app.clientEdit", {
            url: "/client/edit/:id",
            templateUrl: "app/components/clients/views/clientFormView.html",
            controller: "ClientCtrl"
        }).state("app.projects", {
            url: "/projects",
            templateUrl: "app/components/projects/views/projectsView.html",
            controller: "ProjectsCtrl"
        }).state("app.projectNew", {
            url: "/project/new",
            templateUrl: "app/components/projects/views/projectFormView.html",
            controller: "ProjectCtrl"
        }).state("app.projectEdit", {
            url: "/project/edit/:id",
            templateUrl: "app/components/projects/views/projectFormView.html",
            controller: "ProjectCtrl"
        }).state("app.tasks", {
            url: "/tasks",
            templateUrl: "app/components/tasks/tasks/views/tasksView.html",
            controller: "TasksCtrl",
            resolve: {
                PreviousState: [ "$state", function($state) {
                    var currentStateData = {
                        Name: $state.current.name,
                        Params: $state.params,
                        URL: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                } ]
            }
        }).state("app.tasks-user", {
            url: "/tasks/user/:id",
            templateUrl: "app/components/tasks/tasks/views/tasksView.html",
            controller: "TasksCtrl",
            resolve: {
                PreviousState: [ "$state", function($state) {
                    var currentStateData = {
                        Name: $state.current.name,
                        Params: $state.params,
                        URL: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                } ]
            }
        }).state("app.taskNew", {
            url: "/task/new",
            templateUrl: "app/components/tasks/tasks/views/taskFormView.html",
            controller: "TaskCtrl"
        }).state("app.taskEdit", {
            url: "/task/:id",
            templateUrl: "app/components/tasks/tasks/views/taskFormView.html",
            controller: "TaskCtrl"
        }).state("app.taskForm", {
            url: "/task/edit/:id",
            templateUrl: "app/components/tasks/tasks/views/taskEditFormView.html",
            controller: "TaskFormCtrl",
            resolve: {
                PreviousState: [ "$state", function($state) {
                    var currentStateData = {
                        Name: $state.current.name,
                        Params: $state.params,
                        URL: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                } ]
            }
        }).state("app.reports", {
            url: "/reports",
            templateUrl: "app/components/reports/views/reportsView.html",
            controller: "ReportsCtrl"
        }).state("app.hour", {
            url: "/reports",
            templateUrl: "app/components/reports/views/reportsView.html",
            controller: "ReportsCtrl"
        }).state("app.finance", {
            url: "/reports",
            templateUrl: "app/components/reports/views/reportsView.html",
            controller: "ReportsCtrl"
        }).state("app.budgets", {
            url: "/budget",
            templateUrl: "app/components/budgets/views/budgetsView.html",
            controller: "BudgetsCtrl"
        }).state("app.budgetNew", {
            url: "/budget/new",
            templateUrl: "app/components/budgets/views/budgetFormView.html",
            controller: "BudgetCtrl"
        }).state("app.budgetEdit", {
            url: "/budget/edit/:id",
            templateUrl: "app/components/budgets/views/budgetFormView.html",
            controller: "BudgetCtrl"
        }).state("app.hoursCost", {
            url: "/hour-cost",
            templateUrl: "app/components/hours-cost/views/hoursCostView.html",
            controller: "HoursCostCtrl"
        }).state("app.hourCostNew", {
            url: "/hour-cost/new",
            templateUrl: "app/components/hours-cost/views/hourCostFormView.html",
            controller: "HourCostCtrl"
        }).state("app.hourCostEdit", {
            url: "/hour-cost/edit/:id",
            templateUrl: "app/components/hours-cost/views/hourCostFormView.html",
            controller: "HourCostCtrl"
        }).state("app.finances", {
            url: "/finance",
            templateUrl: "app/components/finances/views/financesView.html",
            controller: "FinancesCtrl"
        }).state("app.financeNew", {
            url: "/finance/new",
            templateUrl: "app/components/finances/views/financeFormView.html",
            controller: "FinanceCtrl"
        }).state("app.financeEdit", {
            url: "/finance/edit/:id",
            templateUrl: "app/components/finances/views/financeFormView.html",
            controller: "FinanceCtrl"
        }).state("app.tasks_automatic", {
            url: "/tasks_automatic",
            templateUrl: "app/components/tasks/task_automatic/views/tasks_automaticView.html",
            controller: "tasks_automaticCtrl"
        }).state("app.task_automaticEdit", {
            url: "/tasks_automatic/edit/:id",
            templateUrl: "app/components/tasks/task_automatic/views/task_automaticFormView.html",
            controller: "task_automaticCtrl"
        }).state("app.sales", {
            url: "/sale",
            templateUrl: "app/components/sales/views/salesView.html",
            controller: "SalesCtrl"
        }).state("app.saleNew", {
            url: "/sale/new",
            templateUrl: "app/components/sales/views/saleFormView.html",
            controller: "SaleCtrl"
        }).state("app.saleEdit", {
            url: "/sale/edit/:id",
            templateUrl: "app/components/sales/views/saleFormView.html",
            controller: "SaleCtrl"
        }).state("app.banks", {
            url: "/banks",
            templateUrl: "app/components/banks/views/banksView.html",
            controller: "BanksCtrl"
        }).state("app.bankNew", {
            url: "/bank/new",
            templateUrl: "app/components/banks/views/bankFormView.html",
            controller: "BankCtrl"
        }).state("app.bankEdit", {
            url: "/bank/edit/:id",
            templateUrl: "app/components/banks/views/bankFormView.html",
            controller: "BankCtrl"
        }).state("app.bills", {
            url: "/bills",
            templateUrl: "app/components/bills/views/billsView.html",
            controller: "BillsCtrl"
        }).state("app.billNew", {
            url: "/bill/new",
            templateUrl: "app/components/bills/views/billFormView.html",
            controller: "BillCtrl"
        }).state("app.billEdit", {
            url: "/bill/edit/:id",
            templateUrl: "app/components/bills/views/billFormView.html",
            controller: "BillCtrl"
        }).state("app.weeklyHours", {
            url: "/weeklyHour",
            templateUrl: "app/components/weeklyHours/views/weeklyHoursView.html",
            controller: "WeeklyHoursCtrl"
        }).state("app.weeklyHourNew", {
            url: "/weeklyHour/new",
            templateUrl: "app/components/weeklyHours/views/weeklyHourFormView.html",
            controller: "WeeklyHourCtrl"
        }).state("app.weeklyHourEdit", {
            url: "/weeklyHour/edit/:id",
            templateUrl: "app/components/weeklyHours/views/weeklyHourFormView.html",
            controller: "WeeklyHourCtrl"
        }).state("app.evaluate", {
            url: "/evaluate",
            templateUrl: "app/components/evaluate/views/evaluateView.html",
            controller: "EvalCtrl"
        }).state("app.evaluateForm", {
            url: "/evaluate/user/:id",
            templateUrl: "app/components/evaluate/views/evaluateFormView.html",
            controller: "EvalFormCtrl"
        }).state("app.bots", {
            url: "/bots",
            templateUrl: "app/components/Apps/catalogs/bots/views/botsView.html",
            controller: "BotsCtrl"
        }).state("app.botNew", {
            url: "/bot/new",
            templateUrl: "app/components/Apps/catalogs/bots/views/botFormView.html",
            controller: "BotCtrl"
        }).state("app.botEdit", {
            url: "/bot/edit/:id",
            templateUrl: "app/components/Apps/catalogs/bots/views/botFormView.html",
            controller: "BotCtrl"
        }).state("app.easyWebs", {
            url: "/easywebs",
            templateUrl: "app/components/Apps/catalogs/easyWeb/views/easyWebsView.html",
            controller: "EasyWebsCtrl"
        }).state("app.easyWebNew", {
            url: "/easyWeb/new",
            templateUrl: "app/components/Apps/catalogs/easyWeb/views/easyWebFormView.html",
            controller: "EasyWebCtrl"
        }).state("app.easyWebEdit", {
            url: "/easyWeb/edit/:id",
            templateUrl: "app/components/Apps/catalogs/easyWeb/views/easyWebFormView.html",
            controller: "EasyWebCtrl"
        }).state("app.minsoftwares", {
            url: "/minsoftwares",
            templateUrl: "app/components/Apps/catalogs/minSoftware/views/minSoftwaresView.html",
            controller: "MinSoftwaresCtrl"
        }).state("app.minsoftwareNew", {
            url: "/minsoftware/new",
            templateUrl: "app/components/Apps/catalogs/minSoftware/views/minSoftwareFormView.html",
            controller: "MinSoftwareCtrl"
        }).state("app.minsoftwareEdit", {
            url: "/minsoftware/edit/:id",
            templateUrl: "app/components/Apps/catalogs/minSoftware/views/minSoftwareFormView.html",
            controller: "MinSoftwareCtrl"
        }).state("app.smarthouses", {
            url: "/smarthouses",
            templateUrl: "app/components/Apps/catalogs/smartHouses/views/smartHousesView.html",
            controller: "SmartHousesCtrl"
        }).state("app.smarthouseNew", {
            url: "/smarthouses/new",
            templateUrl: "app/components/Apps/catalogs/smartHouses/views/smartHouseFormView.html",
            controller: "SmartHouseCtrl"
        }).state("app.smarthouseEdit", {
            url: "/smarthouses/edit/:id",
            templateUrl: "app/components/Apps/catalogs/smartHouses/views/smartHouseFormView.html",
            controller: "SmartHouseCtrl"
        }).state("app.mailSenders", {
            url: "/mailsenders",
            templateUrl: "app/components/Apps/catalogs/mailSender/views/mailSendersView.html",
            controller: "MailSendersCtrl"
        }).state("app.mailSenderNew", {
            url: "/mailsenders/new",
            templateUrl: "app/components/Apps/catalogs/mailSender/views/mailSenderFormView.html",
            controller: "MailSenderCtrl"
        }).state("app.mailSenderEdit", {
            url: "/mailsenders/edit/:id",
            templateUrl: "app/components/Apps/catalogs/mailSender/views/mailSenderFormView.html",
            controller: "MailSenderCtrl"
        }).state("app.hosting", {
            url: "/hosting",
            templateUrl: "app/components/Apps/catalogs/hosting/views/hostingsView.html",
            controller: "HostingsCtrl"
        }).state("app.hostingNew", {
            url: "/hosting/new",
            templateUrl: "app/components/Apps/catalogs/hosting/views/hostingFormView.html",
            controller: "HostingCtrl"
        }).state("app.hostingEdit", {
            url: "/hosting/edit/:id",
            templateUrl: "app/components/Apps/catalogs/hosting/views/hostingFormView.html",
            controller: "HostingCtrl"
        }).state("app.products", {
            url: "/products",
            templateUrl: "app/components/Apps/catalogs/products/views/productsView.html",
            controller: "ProductsCtrl"
        }).state("app.productNew", {
            url: "/product/new",
            templateUrl: "app/components/Apps/catalogs/products/views/productFormView.html",
            controller: "ProductCtrl"
        }).state("app.productEdit", {
            url: "/product/edit/:id",
            templateUrl: "app/components/Apps/catalogs/products/views/productFormView.html",
            controller: "ProductCtrl"
        }).state("app.taskManager", {
            url: "/taskManager",
            templateUrl: "app/components/tasks/taskManager/views/taskManagerView.html",
            controller: "taskManagerCtrl"
        }).state("app.taskManagerEdit", {
            url: "/taskManager/:id",
            templateUrl: "app/components/taskManager/views/taskManagerEditView.html",
            controller: "taskManagerEditCtrl"
        }).state("app.tasks_trello", {
            url: "/taskTrello",
            templateUrl: "app/components/tasks/taskTrello/views/taskTrelloView.html",
            controller: "tasks_trelloCtrl"
        }).state("app.tasks_trelloEdit", {
            url: "/taskTrello/edit/:id",
            templateUrl: "app/components/tasks/taskTrello/views/taskTrelloFormView.html",
            controller: "task_trelloCtrl"
        }).state("app.jira", {
            url: "/jira",
            templateUrl: "app/components/tasks/jira/views/jiraView.html",
            controller: "JiraCtrl"
        }).state("app.jiraTasks", {
            url: "/jira-tasks/:id",
            templateUrl: "app/components/tasks/jira/views/jiraTaskView.html",
            controller: "JiraTaskCtrl"
        }).state("app.jiraTaskForm", {
            url: "/jira-task/:id",
            templateUrl: "app/components/tasks/jira/views/jiraTaskFormView.html",
            controller: "JiraTaskFormCtrl"
        }).state("app.jiraTaskNew", {
            url: "/jira-new-task/:idboard",
            templateUrl: "app/components/tasks/jira/views/jiraTaskFormView.html",
            controller: "JiraTaskFormCtrl"
        }).state("app.calendar", {
            url: "/calendar",
            templateUrl: "app/components/calendar/views/calendarView.html",
            controller: "CalendarCtrl"
        });
    } ]);
})(angular);