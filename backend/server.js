const axios = require('axios');

const express = require('express');
var cors = require('cors');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

axios.defaults.headers.common['X-User-Key'] = 'amiami_dev';

const AMIAMI_NEWEST = "https://api.amiami.com/api/v1.0/items?s_sortkey=regtimed&pagemax=10&s_st_list_preorder_available=1&s_cate_tag=14";

router.get('/new', (req, res) => {
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

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));