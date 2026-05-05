Java.perform(function () {
    var System = Java.use("java.lang.System");
    System.exit.implementation = function (code) {
        console.log("[*] System.exit(" + code + ") was called and intercepted. App stays alive!");
    };
});
