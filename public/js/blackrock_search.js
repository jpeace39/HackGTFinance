// $(document).ready(function() {
//     var Aladdin = new blk.API({});
//     Aladdin.searchSecurities({
//         query: 'AAPL',
//         rows: 1,
//         useDefaultDocumentType: true
//     }, function(data, err) {
//         console.log(data);
//         var securities = data.resultMap.SEARCH_RESULTS[0].resultList;
//         console.log(securities);
//     });
// });



// $(function() {
//     var stocks = '';
//     var x = 0;
//
    // $.ajax({
    //     url: '/stocks',
    //     method: 'GET',
    //     dataType: 'json'
    // }).done(function(data) {
    //     var total = 0;
    //     var total_two = 0;
    //     for (var i = 0; i < data.length; i++) {
    //         total += data[i]['purchased_shares'];
    //     }
    //
    //     for (var i = 0; i < data.length; i++) {
    //         console.log(total_two);
    //         total_two += +((data[i]['purchased_shares'] / total).toFixed(2));
    //         stocks += data[i]['ticker'].toUpperCase() + '~' + +((data[i]['purchased_shares'] / total).toFixed(2)) + '|';
    //     }
    //     console.log(stocks);
    //     console.log(total_two);
    // });
//     var x = stocks;
//     var Aladdin = new blk.API();
//     Aladdin.portfolioAnalysis({
//         positions: 'AAPL~0.38|MSFT~0.62|',
//         filter: 'countryCode:US'
//     }, function(data) {
//     var portfolio = data.resultMap.PORTFOLIOS[0].portfolios[0];
//     $('#holdings').DataTable({
//       data: portfolio.holdings.map(function(holding) {
//         return [holding.ticker, holding.description, holding.assetType, holding.weight]
//       }),
//       columns: [{
//         title: 'Ticker'
//       }, {
//         title: 'Description'
//       }, {
//         title: 'Asset Type'
//       }, {
//         title: 'Weight'
//       }],
//       order: [
//         [0, 'desc']
//       ]
//     });
//     $('#returns').highcharts('StockChart', {
//       rangeSelector: {
//         selected: 5
//       },
//       series: [{
//         name: 'Portfolio',
//         data: portfolio.returns.performanceChart.map(function(point) {
//           return [point[0], point[1] * 10000]
//         }),
//         tooltip: {
//           valueDecimals: 2
//         }
//       }]
//     });
//
//     });
// });

$(function() {
    $.ajax({
        url: '/stocks',
        method: 'GET',
        dataType: 'json'
    }).done(function(data) {
        var stocks = '';
        var i;
        for (i = 0; i < data.length - 1; i++) {
            stocks += data[i]['ticker'].toUpperCase() + ',';
        }
        stocks += data[i]['ticker'].toUpperCase();

        var Aladdin = new blk.API();
        Aladdin.performanceData({
        identifiers: stocks
        }, function(data) {
        $('#container').highcharts('StockChart', {
          rangeSelector: {
            selected: 5
          },
          title: {
            text: data.resultMap.RETURNS.map(function(returns) {
              return returns.ticker
            }).join('/') + ' Stock Return ($10,000 Investment)'
          },
          series: data.resultMap.RETURNS.map(function(returns) {
            return {
              name: returns.ticker,
              data: returns.performanceChart.map(function(point) {
                return [point[0], point[1] * 10000]
              }),
              tooltip: {
                valueDecimals: 2
              }
            }
          })
        });
        });
    });
});
