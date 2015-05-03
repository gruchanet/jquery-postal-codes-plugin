$(document).ready(function () {

    $('#postalCode').postalCode({
        outputSelector: '#postalCity',
        validate: true,
        url: '../server/postal_codes.php'
    });

});