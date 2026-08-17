
const Iyzipay = require('iyzipay');

const iyzi = new Iyzipay({
    apiKey: 'sandbox-qfN7Gky6uFuUxRujQ3WsV3MHZsb8fzP7',
    secretKey: 'sandbox-QhYKM83L7iNV0B1LANoXrRkjJNwByBvS',
    uri: 'https://sandbox-api.iyzipay.com'
});

iyzi.threedsInitialize.create({
    locale: 'tr',
    conversationId: 'test-123',
    price: '50.00',
    paidPrice: '50.00',
    currency: 'TRY',
    basketId: 'B1',
    paymentChannel: 'WEB',
    paymentGroup: 'PRODUCT',
    callbackUrl: 'https://www.mazzgord.com/odeme/sonuc',
    buyer: {
        id: 'BY1',
        name: 'Mehmet',
        surname: 'Akoğlu',
        gsmNumber: '+905386295040',
        email: 'mali.akoglu@gmail.com',
        identityNumber: '74300864791',
        lastLoginDate: '2026-07-12 12:00:00',
        registrationDate: '2026-07-12 12:00:00',
        registrationAddress: 'Kınıklı Mah. Pamukkale Denizli 20160',
        ip: '85.34.78.112',
        city: 'Denizli',
        country: 'TR',
        zipCode: '20160'
    },
    shippingAddress: {
        contactName: 'Mehmet Akoğlu',
        city: 'Denizli',
        country: 'TR',
        address: 'Kınıklı Mah. Pamukkale Denizli 20160',
        zipCode: '20160'
    },
    billingAddress: {
        contactName: 'Mehmet Akoğlu',
        city: 'Denizli',
        country: 'TR',
        address: 'Kınıklı Mah. Pamukkale Denizli 20160',
        zipCode: '20160'
    },
    basketItems: [{
        id: 'IT1',
        name: 'Çeviri Hizmeti',
        category1: 'Hizmet',
        category2: 'Çeviri',
        itemType: 'VIRTUAL',
        price: '50.00'
    }]
}, function(err, result) {
    if (err) {
        console.log('Hata:', JSON.stringify(err));
        return;
    }
    console.log('Sonuc:', JSON.stringify(result, null, 2));
});
