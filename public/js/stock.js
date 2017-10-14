$(document).ready(function() {
    $('#datepicker').datepicker();

    // Holds the portfolio
    var portfolio = [];
    var stock = {'ticker': '', 'name': '', 'bought': '', 'current': '', 'sentiments': ''};

    portfolio.push(stock);
    console.log(portfolio);
});
