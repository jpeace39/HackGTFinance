$(document).ready(function() {
    $('#datepicker').datepicker();
    var arr = [];

    arr.push('AAPL');
    arr.push('MSFT');

    for (i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
});
