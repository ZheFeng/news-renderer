import express from 'express';
import path from 'path';
import news from '../../newsSample';

const router = express.Router();

const buildPath = path.join(__dirname, '../../public/dist');
const cdnPath = '/static/dist/';

function getChunckPath(chunckName) {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'production' || NODE_ENV === 'stage') {
    const stats = require(`${buildPath}/stats`);
    return `${cdnPath}${stats.assetsByChunkName[chunckName]}`;
  }
  return `/${chunckName}.js`;
}

/* GET home page. */
router.get('/', (req, res) => {
  const scripts = [
    'main',
  ].map(getChunckPath);
  res.render('index', { title: 'News Renderer', scripts });
});

router.get('/api/error', (req, res, next) => {
  next(new Error('test error'));
});

function sortCompare(a, b, orderBy, order) {
  const va = a[orderBy];
  const vb = b[orderBy];
  if (va === vb) {
    return orderBy === 'id' ? 1 : sortCompare(a, b, 'id', order);
  }
  const factor = order === 'desc' ? 1 : -1;
  return va < vb ? 1 * factor : -1 * factor;
}
function orderAry(ary, orderBy = 'id', order = 'asc') {
  return ary.sort((a, b) => sortCompare(a, b, orderBy, order));
}

function searchAry(ary, search) {
  if (!search) {
    return [...ary];
  }
  return [...ary].filter(item => {
    let match = false;
    Object.keys(item).forEach(key => {
      if (!match) {
        const val = item[key].toString().toLowerCase().trim();
        match = val.indexOf(search.toLowerCase().trim()) >= 0;
      }
    });
    return match;
  });
}

function sendData(req, res) {
  const numberPerPage = parseInt(req.query.numberPerPage, 10);
  const offset = parseInt(req.query.offset, 10);
  const orderBy = req.query.orderBy;
  const order = req.query.order;
  const search = req.query.search;

  const searchResult = searchAry(news, search);
  const ary = orderAry(searchResult, orderBy, order);
  if (!numberPerPage) {
    res.send({
      entities: ary,
      total: searchResult.length,
    });
  }
  res.send({
    entities: ary.slice(offset, offset + numberPerPage),
    total: searchResult.length,
  });
}
router.get('/api/news', sendData);

export default router;
