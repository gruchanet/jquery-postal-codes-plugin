$(document).ready(function () {

    $('#postalCode').postalCode({
        outputSelector: '#postalCity',
        url: '../server/postal_codes.php'
    });

});