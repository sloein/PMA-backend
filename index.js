const Koa = require('koa');
const XLSX = require('xlsx');
const path = require('path');
const app = new Koa();

// 指定本地 Excel 文件的路径
const filePath = path.resolve(__dirname, 'test.xlsx');

// 读取 Excel 文件
const workbook = XLSX.readFile(filePath);
const first_sheet = workbook.Sheets[workbook.SheetNames[0]];
const excelJson = XLSX.utils.sheet_to_json(first_sheet);

app.use(async (ctx) => {
  let url = ctx.url;
  let query = decodeURIComponent(url.substr(1)); // 从 URL 中提取 query 参数并解码

  // 筛选 excelJson 中的内容
  let filteredData = excelJson
    .filter(item => 
      (item['储罐编号'] === query) || 
      (item['原许可储存货种'] && item['原许可储存货种'].includes(query))
    )
   ;
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Content-Type', 'application/json');
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type');
  ctx.set('Access-Control-Max-Age', '86400');
  ctx.set('Access-Control-Allow-Credentials', 'true');
  ctx.set('Access-Control-Expose-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.body = {
    query,
    filteredData
  };
});

app.listen(3000);
console.log('[demo] start-quick is starting at port 3000');
