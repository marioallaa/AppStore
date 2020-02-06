

let currency = [
    ['EUR', "USD"],
    ['AUD', "JPY"],
    ['GBP', "AUD"],
    ['USD', "JPY"],
    ['EUR', "JPY"]
];
let o = 0;
function getTable() {
    $.each(currency, function (i, c) {
        let api_url = "https://api.exchangeratesapi.io/latest?base="+c[0]+"&symbols="+c[1];

        $.getJSON(api_url, {format: "json"}).done(function (d) {
            let api_url = "https://api.exchangeratesapi.io/latest?base="+c[1]+"&symbols="+c[0];
            $.getJSON(api_url, {format: "json"}).done(function (a) {
                if (d){
                    $('#'+i+"a").html(c[0]);
                    $('#'+i+"b").html(c[1]);
                    let o = d['rates'][c[1]] + '';
                    let oo = a['rates'][c[0]] + '';
                    $('#'+i+"c").html(o.substring(0, 6));
                    $('#'+i+"d").html(oo.substring(0, 6));
                }
            })

        })
    });
    o++;
    console.log("loaded times: " + o)
}
getTable();
setTimeout(getTable, 250);
