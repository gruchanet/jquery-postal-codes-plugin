(function($) {
    'use strict';

    $.fn.postalCode = function (options) {
        // skip if incorrect options object passed
        if (!options.url || !options.outputSelector) {
            return;
        }
        // merge options with default settings
        options = $.extend({}, $.fn.postalCode.defaults, options);

        // get output elem
        var cityElem = $(options.outputSelector).first();

        // handling `key pressing` event
        $(this).keyup(function () {
            var postalCode = $(this).val();
            var isPostalCodeCorrect = postalCode.search(options.format) !== -1;

            if (isPostalCodeCorrect) {
                setTimeout(function () {
                    $.ajax({
                        url: options.url,
                        method: 'GET',
                        data: { code: postalCode },
                        dataType: 'json',
                        success: function (data) {
                            $(cityElem).val(data.city);
                        },
                        error: function (xhr) {
                            // TODO: error handling
                        }
                    })
                }, options.delay);
            }
        });
    };

    $.fn.postalCode.defaults = {
        format: /\d{2}-\d{3}/i, // xx-xxx
        outputSelector: undefined,
        delay: 200,
        url: undefined
    };

})(jQuery);