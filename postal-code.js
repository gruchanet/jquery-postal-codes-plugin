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
                            if (data.city) {
                                // fill elem with city
                                cityElem.val(data.city);

                                if (options.validate) {
                                    resetInputStyles(postalInput);
                                    unblockFormSubmission(postalInput.parents('form'));
                                }
                            } else {
                                // reset elem with city
                                cityElem.val('');

                                inputErrorStyles(postalInput);
                                blockFormSubmission(postalInput.parents('form'));
                            }
                        },
                        error: function () { // xhr
                            // TODO: error handling
                        }
                    });
                }, options.delay);
            } else {
                if (options.validate) {
                    inputErrorStyles(postalInput);
                    blockFormSubmission(postalInput.parents('form'));
                }
            }
        });
    };

    $.fn.postalCode.defaults = {
        format: /\d{2}-\d{3}/i, // xx-xxx
        outputSelector: undefined,
        validate: true,
        delay: 200,
        url: undefined
    };

    function inputErrorStyles(input) {
        // set error styles:
        // for input
        $(input).css('border-color', '#a94442');
        // for label
        $('[for="' + $(input).attr('id') + '"]').css('color', '#a94442');
    }

    function resetInputStyles(input) {
        // reset styles:
        // for input
        $(input).css('border-color', '');
        // for label
        $('[for="' + $(input).attr('id') + '"]').css('color', '');
    }

    function blockFormSubmission(form) {
        form.on('submit', function (event) {
            return false;
        });
    }

    function unblockFormSubmission(form) {
        form.off('submit');
    }

})(jQuery);