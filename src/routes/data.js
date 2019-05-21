var express = require("express");
var fs = require("fs");
var path = require("path");

var datajson = fs.readFileSync(path.join(__dirname,'../',"data.json"));

var data = JSON.parse(datajson)

module.exports = data;
