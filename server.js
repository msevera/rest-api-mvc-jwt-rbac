const express = require('express');
const API = require('./api');

const api = new API(express());
api.start();
