$(document).ready(function() {
    // $('#datepicker').datepicker();
    var user = 'Pranay';

    function updateStocks() {
        $.ajax({
            url: '/stocks',
            method: 'GET',
            dataType: 'json'
        }).done(function(data) {
            for (var i = 0; i < data.length; i++) {
                $('ul').append('<li><a href="#">'+ data[i]['ticker'] + '</a></li>');
                // $('tabs ul').append('<li><a href="#">' + x + '</a></li>');
                $('#table_body').append('<tr class="stocks" value="'+ data[i]['ticker'] +'" onClick="on(this.value)">' +
                                        '<td class="ticker">' + data[i]['ticker'] + '</td>' +
                                        '<td>' + data[i]['name'] + '</td>' +
                                        '<td>$' + data[i]['purchased_price'] + '</td>' +
                                        '<td></td>' +
                                        '<td></td>' +
                                        '</tr>');
            }
        });
    }

    updateStocks();

    // Holds the portfolio
    var portfolio = [];


    $('.add_stock').click(function() {
        var stock = {'user': 'Pranay', 'ticker': '', 'name': '', 'bought': '', 'shares': '', 'purchase_date': ''};
        stock['ticker'] = $('.input_ticker').val();
        stock['bought'] = parseInt($('.input_price').val());
        stock['shares'] = parseInt($('.input_shares').val());
        stock['purchase_date'] = $('.input_date').val();

        var api_url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%3D%22INPUT%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=quote";
        var my_url = api_url.replace("INPUT", stock['ticker']);
        var name;

        $.ajax({
            url: my_url,
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'quote'
        }).done(function(data) {
            name = data.query.results.quote.Name;
            console.log(data);
            console.log(name);
            if (name != null) {
                stock['name'] = name;
                if (/^\d+$/.test(stock['bought']) && /^\d+$/.test(stock['shares']) && stock['name'] != 'WRONG') {
                    $('.error').text('');
                    stock['bought'].toFixed(2);
                    stock['ticker'].toUpperCase();
                    $.ajax({
                        url: '/portfolio',
                        data: stock,
                        method: 'POST',
                        dataType: 'json'
                    }).done(function(data) {
                        if (data.error) {
                            $('.error').text("You must provide only numbers for price/shares!");
                            setTimeout(function() {
                                $('.error').text('');
                            }, 1000);
                        } else {
                            $('.message').text("Successfully added!");
                            setTimeout(function() {
                                $('.message').text('');
                            }, 1000);
                        }
                        $('#table_body *').remove();
                        updateStocks();
                        console.log(data);
                    });
                } else {
                    $('.error').text("You must provide a proper stock ticker with only numbers for price/shares!");
                    setTimeout(function() {
                        $('.error').text('');
                    }, 1000);
                }
            } else {
                $('.error').text("You must input a proper stock ticker!");
                setTimeout(function() {
                    $('.error').text('');
                }, 1000);
            }
        });
    });
});
