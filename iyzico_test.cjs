
const Iyzipay = require('iyzipay').default || require('iyzipay');

console.log("iyzipay exports:", Object.keys(Iyzipay));

const iyzi = new Iyzipay({
    apiKey: 'sandbox-qfN7Gky6uFuUxRujQ3WsV3MHZsb8fzP7',
    secretKey: 'sandbox-QhYKM83L7iNV0B1LANoXrRkjJNwByBvS',
    uri: 'https://sandbox-api.iyzipay.com'
});

console.log("iyzi methods:", Object.keys(iyzi));

iyzi.binNumber.retrieve({
    locale: 'tr',
    conversationId: 'test',
    binNumber: '554960'
}, function(err, result) {
    if (err) {
        console.log('Hata:', JSON.stringify(err));
        return;
    }
    console.log('Sonuc:', JSON.stringify(result, null, 2));
});
