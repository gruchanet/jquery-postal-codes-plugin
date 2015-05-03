(function ($) {
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
            var postalInput = $(this);
            var postalCode = postalInput.val();
            var isPostalCodeCorrect = postalCode.search(options.format) !== -1;

            if (isPostalCodeCorrect) {
                setTimeout(function () {
                    $.ajax({
                        url: options.url,
                        method: 'GET',
                        data: { code: postalCode },
                        dataType: 'json',
                        success: function (data) {
                            // fill elem with city
                            cityElem.val(data.city);

                            if (options.validate) {
                                // reset styles
                                postalInput.css('border-color', '');
                                // for label
                                $('[for="' + postalInput.attr('id') + '"]').css('color', '');
                            }
                        },
                        error: function () { // xhr
                            // TODO: error handling
                        }
                    });
                }, options.delay);
            } else {
                if (options.validate) {
                    // set error styles:
                    // for input
                    postalInput.css('border-color', '#a94442');
                    // for label
                    $('[for="' + postalInput.attr('id') + '"]').css('color', '#a94442');
                }
            }
        });
    };

    $.fn.postalCode.defaults = {
        format: /\d{2}-\d{3}/i, // xx-xxx
        outputSelector: undefined,
        validate: false,
        delay: 200,
        url: undefined
    };

})(jQuery);