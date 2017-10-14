$(document).ready(function() {
    // var url = "https://www.blackrock.com/tools/api-tester/hackathon?apiType=searchSecurities";
    var Aladdin = new blk.API({});
    Aladdin.searchSecurities({
        query: 'AAPL',
        rows: 1,
        useDefaultDocumentType: true
    }, function(data) {
        var securities = data.resultMap.SEARCH_RESULTS[0].resultList;
        console.log(securities);
    });
});
