const axios = require('axios');
const cheerio = require('cheerio');

const express = require('express');
var cors = require('cors');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

axios.defaults.headers.common['X-User-Key'] = 'amiami_dev';

const AMIAMI_NEWEST = "https://api.amiami.com/api/v1.0/items?pagemax=30&s_st_list_preorder_available=1&s_cate_tag=14";
const AMIAMI_LOOKUP = "https://api.amiami.com/api/v1.0/item?gcode=";
const SOLARIS_LOOKUP = "https://mfc.solarisjapan.com/";

router.get('/new', (req, res) => {
    console.log("new figures request");
    axios.get(AMIAMI_NEWEST)
        .then((apiRes) => {
            response = apiRes.data.items;
        }).catch((err) => {
            response = "error"
        }).then(() => {
            return res.json({
                message: response
            });
        });
});

router.get('/item/:gcode', (req, res) => {
    console.log("item request for " + req.params.gcode);
    axios.get(AMIAMI_LOOKUP + req.params.gcode)
        .then((apiRes) => {
            response = apiRes.data.item;
        }).catch((err) => {
            response = "error";
            console.log("error looking up figure");
        }).then(() => {
            return res.json({
                message: response
            });
        });
});

router.get('/solaris/:jan', (req, res) => {
    console.log("solaris request for " + req.params.jan);
    axios(SOLARIS_LOOKUP + req.params.jan)
        .then((response) => {
            html = response.data;
            $ = cheerio.load(html);
            value = $('meta[itemprop="price"]').attr("content");
        }).catch((err) => {
            value = "error";
            console.log("error looking up figure");
        }).then(() => {
            console.log(value);
            return res.json({
                message: value
            });
        });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));