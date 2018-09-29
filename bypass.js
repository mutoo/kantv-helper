(function() {
    var jq;

    try {
        if (!window.webpackJsonp) {
            throw new Error('Could not retrieve the module from this bundle.');
        }
        jq = window.webpackJsonp([], [], ['7t+N']);

        if (!jq) {
            throw new Error('Could not retrieve jquery by given moduleId.');
        }

        if (!jq.ajaxPrefilter) {
            throw new Error('Could not found ajaxPrefilter function in jq Object.');
        }
    } catch (e) {
        console.warn(e + ' Try using window.jQuery.');
        jq = window.jQuery;
    }

    jq.ajaxPrefilter(function(opt) {
        if (opt.url == window.currentPartInfo.url.wxSubscribe) {
            var success = opt.success;
            opt.success = function(res) {
                if (res && res.data) {
                    res.data.subscribe = 1;
                } else {
                    console.error('Could not manipulate the response.');
                }
                success(res);
            };
        }
    });
})();