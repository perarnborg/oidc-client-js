// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var path = require('path');

var port = 8081;
var url = "http://localhost:" + port;

var express = require('express');
var app = express();

var static = express.static(path.join(__dirname, 'public'));
app.use(function (req, res, next) {
    res.set('Content-Security-Policy', "default-src 'self' https://demo.identityserver.io");
    next();
  });
app.use(static);

app.get("/oidc-client.js", function(req, res){
    res.sendFile(path.join(__dirname, '../../dist/oidc-client.js'));
});

app.get("/signin-oidc", function(req, res){
    res.sendFile(path.join(__dirname, 'public/user-manager-sample-callback.html'));
});

app.get("/silent-refresh-oidc.html", function(req, res){
    res.sendFile(path.join(__dirname, 'public/user-manager-sample-silent.html'));
});

var oidc = require('./oidc.js');
oidc(url, app);

console.log("listening on " + url);

app.listen(port);
