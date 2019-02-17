var express = require('express');
var router = express.Router();
var paypal = require('paypal-rest-sdk');
var models = require('../models');
var nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/checkout', function(req, res, next) {
  res.render('checkout', { title: 'Express' });
});
router.get('/checkout/pagar/cancel/', function(req, res, next) {
  models.Invoice.findOne({
    where: {paypalid: req.query["paymentId"]},
  }).then(function(invoiceObj){
    console.log(">>", invoiceObj);
    res.render('checkout_cancel', { orderid: 'sadasas'});
  })
});

function mailHTML(_name, _reason, _date, _description, _invoice, _amount , _subamount, _total, _url) {
  var _html_ = '<html><head>\
  <meta name="viewport" content="width=device-width, initial-scale=1.0">\
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\
  <title>Please pay total_Value due by due_date_Value</title>\
  <style type="text/css" rel="stylesheet" media="all">@media only screen and (max-width: 600px) {.email-body_inner,.email-footer{width:100% !important;}}@media only screen and (max-width: 500px) {.button{width:100% !important;}}</style>\
</head>\
<body style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; height: 100%; margin: 0; line-height: 1.4; background-color: #F2F4F6; color: #74787E; -webkit-text-size-adjust: none; width: 100% !important;">\
  <span class="preheader" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; visibility: hidden; mso-hide: all; font-size: 1px; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; display: none !important;">This is an invoice for your purchase on purchase_date_Value. Please submit payment by due_date_Value</span>\
  <table class="email-wrapper" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; width: 100%; margin: 0; padding: 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; background-color: #F2F4F6;" width="100%" cellpadding="0" cellspacing="0">\
    <tbody style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box;"><tr>\
      <td style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; word-break: break-word;" align="center">\
        <table class="email-content" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; width: 100%; margin: 0; padding: 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0;" width="100%" cellpadding="0" cellspacing="0">\
          <tbody style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box;"><tr>\
            <td class="email-masthead" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; word-break: break-word; padding: 25px 0; text-align: center;">\
              <a class="email-masthead_name" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; color: #BBBFC3; font-size: 16px; font-weight: bold; text-decoration: none; text-shadow: 0 1px 0 white;" href="https://example.com">\
      product_name_Value\
    </a>\
            </td>\
          </tr>\
          <tr>\
            <td class="email-body" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; word-break: break-word; width: 100%; margin: 0; padding: 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; border-top: 1px solid #EDEFF2; border-bottom: 1px solid #EDEFF2; background-color: #FFF;" width="100%" cellpadding="0" cellspacing="0">\
              <table class="email-body_inner" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; width: 570px; margin: 0 auto; padding: 0; -premailer-width: 570px; -premailer-cellpadding: 0; -premailer-cellspacing: 0; background-color: #FFF;" align="center" width="570" cellpadding="0" cellspacing="0">\
                <tbody style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box;"><tr>\
                  <td class="content-cell" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; word-break: break-word; padding: 35px;">\
                    <h1 style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; margin-top: 0; color: #2F3133; font-size: 19px; font-weight: bold; text-align: left;">Hola ' + _name + ',</h1>\
                    <p style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; line-height: 1.5em; text-align: left; margin-top: 0; color: #74787E; font-size: 16px;">Gracias por ' + _reason + '.</p>\
                    <table class="attribute-list" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box;" width="100%" cellpadding="0" cellspacing="0">\
                      <tbody style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box;"><tr>\
                        <td class="attribute-list-container" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; word-break: break-word;">\
                          <table style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box;" width="100%" cellpadding="0" cellspacing="0">\
                            <tbody style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box;"><tr>\
                              <td class="attribute-list-item" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; word-break: break-word;"><strong style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box;">Monto:</strong> ' + _amount + '</td>\
                            </tr>\
                          </tbody></table>\
                        </td>\
                      </tr>\
                    </tbody></table>\
                    <table class="purchase" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; width: 100%; margin: 0; padding: 35px 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0;" width="100%" cellpadding="0" cellspacing="0">\
                      <tbody style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box;"><tr>\
                        <td style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; word-break: break-word;">\
                          <h3 style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; margin-top: 0; color: #2F3133; font-size: 14px; font-weight: bold; text-align: left;">' + _invoice + '</h3></td>\
                        <td style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; word-break: break-word;">\
                          <h3 class="align-right" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; margin-top: 0; color: #2F3133; font-size: 14px; font-weight: bold; text-align: right;">' + _date + '</h3></td>\
                      </tr>\
                      <tr>\
                        <td style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; word-break: break-word;" colspan="2">\
                          <table class="purchase_content" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; width: 100%; margin: 0; padding: 25px 0 0 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0;" width="100%" cellpadding="0" cellspacing="0">\
                            <tbody style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box;"><tr>\
                              <th class="purchase_heading" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; padding-bottom: 8px; border-bottom: 1px solid #EDEFF2;">\
                                <p style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; line-height: 1.5em; text-align: left; margin-top: 0; color: #9BA2AB; font-size: 12px; margin: 0;">Descripcion</p>\
                              </th>\
                              <th class="purchase_heading" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; padding-bottom: 8px; border-bottom: 1px solid #EDEFF2;">\
                                <p class="align-right" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; line-height: 1.5em; text-align: right; margin-top: 0; color: #9BA2AB; font-size: 12px; margin: 0;">Amount</p>\
                              </th>\
                            </tr>\
                            <tr>\
                              <td class="purchase_item" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; word-break: break-word; padding: 10px 0; color: #74787E; font-size: 15px; line-height: 18px;" width="80%">' + _description + '</td>\
                              <td class="align-right" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; word-break: break-word; text-align: right;" width="20%">' + _subamount + '</td>\
                            </tr>\
                            <tr>\
                              <td class="purchase_footer" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; word-break: break-word; padding-top: 15px; border-top: 1px solid #EDEFF2;" width="80%" valign="middle">\
                                <p class="purchase_total purchase_total--label" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; line-height: 1.5em; text-align: right; margin-top: 0; color: #2F3133; font-size: 16px; margin: 0; font-weight: bold; padding: 0 15px 0 0;">Total</p>\
                              </td>\
                              <td class="purchase_footer" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; word-break: break-word; padding-top: 15px; border-top: 1px solid #EDEFF2;" width="20%" valign="middle">\
                                <p class="purchase_total" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; line-height: 1.5em; text-align: right; margin-top: 0; color: #2F3133; font-size: 16px; margin: 0; font-weight: bold;">' + _total + '</p>\
                              </td>\
                            </tr>\
                          </tbody></table>\
                        </td>\
                      </tr>\
                    </tbody></table>\
                    <p style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; line-height: 1.5em; text-align: left; margin-top: 0; color: #74787E; font-size: 16px;">Si desea mas informacion acerca de este comprobante no dude en contactarnos a:<a style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; color: #3869D4;" href="' + _url + '">Soporte</a></p>\
                    <p style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; line-height: 1.5em; text-align: left; margin-top: 0; color: #74787E; font-size: 16px;">Gracias,\
                      <br>Colegio Latino</p>\
                  </td>\
                </tr>\
              </tbody></table>\
            </td>\
          </tr>\
          <tr>\
            <td style="font-family: Arial, \'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; word-break: break-word;">\
              <table class="email-footer" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; width: 570px; margin: 0 auto; padding: 0; -premailer-width: 570px; -premailer-cellpadding: 0; -premailer-cellspacing: 0; text-align: center;" align="center" width="570" cellpadding="0" cellspacing="0">\
                <tbody style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box;"><tr>\
                  <td class="content-cell" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; word-break: break-word; padding: 35px;" align="center">\
                    <p class="sub align-center" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; line-height: 1.5em; text-align: center; margin-top: 0; color: #AEAEAE; font-size: 12px;">© 2019 product_name_Value. All rights reserved.</p>\
                    <p class="sub align-center" style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif; box-sizing: border-box; line-height: 1.5em; text-align: center; margin-top: 0; color: #AEAEAE; font-size: 12px;">\
                      company_name_Value\
                      <br>company_addres_Value\
                    </p>\
                  </td>\
                </tr>\
              </tbody></table>\
            </td>\
          </tr>\
        </tbody></table>\
      </td>\
    </tr>\
  </tbody></table>\
</body></html>';
return _html_;
}

router.get('/checkout/pagar/success/', function(req, res, next) {
    let transporter = nodemailer.createTransport({
      host: "smtp.webfaction.com",
      port: 25,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'latino_mailbox_host56725a', // generated ethereal user
        pass: 'host56725@mail@latino1' // generated ethereal password
      }
    });
  
    var rand=Math.floor((Math.random() * 100) + 54);
    var host='local'//req.get('host');
    var link="http://"+host+"/verify?id="+rand;
    let mailOptions = {
      from: '"Fred Foo 👻" <rrojasen@continental.edu.pe>', // sender address
      to: "rrojasen@continental.edu.pe", // list of receivers
      subject: "Orden", // Subject line
      html: mailHTML('bichito', 'ser buena persona', '2012-12-12', 'web-012200', '12', '13', '14', '15', 'http://google.com')	 // html body
    };
  
    let info = transporter.sendMail(mailOptions)
  

  res.render('checkout_success', { orderid: 'sadasas'});
});
router.post('/checkout/pagar/', function(req, res, next) {
  paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
    'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
  });
  var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/checkout/pagar/success/",
        "cancel_url": "http://localhost:3000/checkout/pagar/cancel/"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "item",
                "sku": "item",
                "price": "1.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "1.00"
        },
        "description": "This is the payment description."
    }]
  };    
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        console.log("Create Payment Response");
        paypalID = payment["id"];
        models.Invoice
        .build({ code: 'fii', paypalid: paypalID})
        .save();
        
        res.redirect(payment["links"][1]["href"]);
        
        res.render('checkout_wait', { title: 'Express' });
    }
  });
});

module.exports = router;
