
const iyzipay = require('iyzipay');

const iyzi = new iyzipay.Iyzipay({
    apiKey: 'sandbox-qfN7Gky6uFuUxRujQ3WsV3MHZsb8fzP7',
    secretKey: 'sandbox-QhYKM83L7iNV0B1LANoXrRkjJNwByBvS',
    uri: 'https://sandbox-api.iyzipay.com'
});

iyzi.binNumber.retrieve({
    locale: 'tr',
    conversationId: 'test',
    binNumber: '554960'
}, function(err, result) {
    if (err) {
        console.log('❌ Hata:', err);
        return;
    }
    console.log('✅ Sonuç:', JSON.stringify(result, null, 2));
});
