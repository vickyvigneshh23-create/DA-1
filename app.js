const money = n => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
const number = n => new Intl.NumberFormat('en-US').format(n);
const seed = [
 ['2026-01-03','ORD-1001','Wireless Headphones','Electronics','North',2,79,'Online'],
 ['2026-01-05','ORD-1002','Running Shoes','Apparel', 'South',1,95,'Retail'],
 ['2026-01-08','ORD-1003','Desk Lamp','Home', 'East',3,34,'Online'],
 ['2026-01-11','ORD-1004','Smart Watch','Electronics','West',1,199,'Partner'],
 ['2026-01-13','ORD-1005','Cotton T-Shirt','Apparel','North',4,22,'Online'],
 ['2026-01-17','ORD-1006','Coffee Maker','Home','South',2,89,'Retail'],
 ['2026-01-20','ORD-1007','Bluetooth Speaker','Electronics','East',3,59,'Online'],
 ['2026-01-24','ORD-1008','Backpack','Apparel','West',2,48,'Partner'],
 ['2026-02-02','ORD-1009','Smart Watch','Electronics','North',2,199,'Online'],
 ['2026-02-04','ORD-1010','Desk Lamp','Home','South',5,34,'Retail'],
 ['2026-02-07','ORD-1011','Running Shoes','Apparel','East',2,95,'Online'],
 ['2026-02-10','ORD-1012','Wireless Headphones','Electronics','West',3,79,'Partner'],
 ['2026-02-14','ORD-1013','Coffee Maker','Home','North',1,89,'Online'],
 ['2026-02-18','ORD-1014','Cotton T-Shirt','Apparel','South',6,22,'Retail'],
 ['2026-02-22','ORD-1015','Bluetooth Speaker','Electronics','East',2,59,'Online'],
 ['2026-03-01','ORD-1016','Backpack','Apparel','North',3,48,'Retail'],
 ['2026-03-04','ORD-1017','Smart Watch','Electronics','South',2,199,'Online'],
 ['2026-03-08','ORD-1018','Coffee Maker','Home','West',2,89,'Partner'],
 ['2026-03-12','ORD-1019','Running Shoes','Apparel','East',4,95,'Online'],
 ['2026-03-16','ORD-1020','Wireless Headphones','Electronics','North',1,79,'Retail'],
 ['2026-03-20','ORD-1021','Desk Lamp','Home','South',4,34,'Online'],
 ['2026-03-24','ORD-1022','Cotton T-Shirt','Apparel','West',5,22,'Retail'],
 ['2026-04-02','ORD-1023','Bluetooth Speaker','Electronics','North',4,59,'Online'],
 ['2026-04-05','ORD-1024','Backpack','Apparel','South',2,48,'Partner'],
 ['2026-04-09','ORD-1025','Smart Watch','Electronics','East',1,199,'Retail'],
 ['2026-04-13','ORD-1026','Coffee Maker','Home','West',3,89,'Online'],
 ['2026-04-18','ORD-1027','Running Shoes','Apparel','North',2,95,'Online'],
 ['2026-04-23','ORD-1028','Wireless Headphones','Electronics','South',3,79,'Partner'],
 ['2026-05-02','ORD-1029','Desk Lamp','Home','East',5,34,'Online'],
 ['2026-05-06','ORD-1030','Cotton T-Shirt','Apparel','West',7,22,'Retail'],
 ['2026-05-11','ORD-1031','Smart Watch','Electronics','North',2,199,'Partner'],
 ['2026-05-16','ORD-1032','Backpack','Apparel','South',4,48,'Online'],
 ['2026-05-21','ORD-1033','Coffee Maker','Home','East',2,89,'Retail'],
 ['2026-05-25','ORD-1034','Bluetooth Speaker','Electronics','West',3,59,'Online'],
 ['2026-06-01','ORD-1035','Running Shoes','Apparel','North',3,95,'Partner'],
 ['2026-06-05','ORD-1036','Wireless Headphones','Electronics','South',4,79,'Online'],
 ['2026-06-09','ORD-1037','Desk Lamp','Home','West',6,34,'Retail'],
 ['2026-06-13','ORD-1038','Smart Watch','Electronics','East',2,199,'Online'],
 ['2026-06-18','ORD-1039','Cotton T-Shirt','Apparel','North',5,22,'Retail'],
 ['2026-06-24','ORD-1040','Coffee Maker','Home','South',3,89,'Online']
].map(r=>({date:r[0],order:r[1],product:r[2],category:r[3],region:r[4],units:+r[5],price:+r[6],channel:r[7]}));
let data = [...seed], charts = {};
const $ = id => document.getElementById(id);
const revenue = r => r.units*r.price;
const uniq = arr => [...new Set(arr)].sort();
function fillSelect(id, values){ const el=$(id), old=el.value; el.innerHTML='<option value="all">All '+(id==='regionFilter'?'regions':id==='categoryFilter'?'categories':'channels')+'</option>'+values.map(v=>`<option>${escapeHtml(v)}</option>`).join(''); if(values.includes(old))el.value=old; }
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function setupFilters(){
  fillSelect('regionFilter',uniq(data.map(d=>d.region)));
  fillSelect('categoryFilter',uniq(data.map(d=>d.category)));
  fillSelect('channelFilter',uniq(data.map(d=>d.channel)));
  const dates=data.map(d=>d.date).sort();
  $('dateFrom').min=dates[0]||''; $('dateFrom').max=dates.at(-1)||''; $('dateTo').min=dates[0]||''; $('dateTo').max=dates.at(-1)||'';
  if(!$('dateFrom').value)$('dateFrom').value=dates[0]||'';
  if(!$('dateTo').value)$('dateTo').value=dates.at(-1)||'';
}
function filtered(){
  return data.filter(d=>(!$('dateFrom').value||d.date>=$('dateFrom').value)&&(!$('dateTo').value||d.date<=$('dateTo').value)&&($('regionFilter').value==='all'||d.region===$('regionFilter').value)&&($('categoryFilter').value==='all'||d.category===$('categoryFilter').value)&&($('channelFilter').value==='all'||d.channel===$('channelFilter').value));
}
const palette=['#7667e8','#42a5e8','#f2a65a','#31b78a','#e77b9b','#8b9bb4'];
function makeChart(id,type,labels,values,label){
  if(charts[id])charts[id].destroy();
  const ctx=$(id).getContext('2d');
  charts[id]=new Chart(ctx,{type,data:{labels,datasets:[{label,data:values,backgroundColor:type==='line'?'rgba(118,103,232,.12)':palette,borderColor:type==='line'?'#7667e8':palette,borderWidth:type==='line'?2:1,fill:type==='line',tension:.35,pointRadius:type==='line'?3:0,borderRadius:type==='bar'?5:0}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:type==='doughnut',position:'bottom',labels:{usePointStyle:true,boxWidth:7,padding:16,font:{size:10}}},tooltip:{callbacks:{label:c=>`${c.dataset.label||c.label}: ${money(c.parsed.y??c.parsed)}`}}},scales:type==='doughnut'?{}:{x:{grid:{display:false},ticks:{color:'#8992a5',font:{size:10},maxRotation:0,autoSkip:true}},y:{beginAtZero:true,grid:{color:'#eef1f6'},ticks:{color:'#8992a5',font:{size:10},callback:v=>'$'+v}}}}});
}
function render(){
  const rows=filtered(), total=rows.reduce((s,r)=>s+revenue(r),0), orders=new Set(rows.map(r=>r.order)).size, units=rows.reduce((s,r)=>s+r.units,0);
  $('revenueKpi').textContent=money(total);$('ordersKpi').textContent=number(orders);$('unitsKpi').textContent=number(units);$('aovKpi').textContent=money(orders?total/orders:0);
  const daily={}; rows.forEach(r=>daily[r.date]=(daily[r.date]||0)+revenue(r));
  makeChart('revenueChart','line',Object.keys(daily).sort(),Object.keys(daily).sort().map(k=>daily[k]),'Revenue');
  const cat={};rows.forEach(r=>cat[r.category]=(cat[r.category]||0)+revenue(r));
  makeChart('categoryChart','doughnut',Object.keys(cat),Object.values(cat),'Revenue');
  const reg={};rows.forEach(r=>reg[r.region]=(reg[r.region]||0)+revenue(r));
  makeChart('regionChart','bar',Object.keys(reg),Object.values(reg),'Revenue');
  const channel={};rows.forEach(r=>channel[r.channel]=(channel[r.channel]||0)+revenue(r));
  makeChart('channelChart','bar',Object.keys(channel),Object.values(channel),'Revenue');
  const prod={};rows.forEach(r=>{const p=prod[r.product]||(prod[r.product]={category:r.category,units:0,orders:new Set(),revenue:0});p.units+=r.units;p.orders.add(r.order);p.revenue+=revenue(r);});
  const sorted=Object.entries(prod).sort((a,b)=>b[1].revenue-a[1].revenue);
  $('productsTable').innerHTML=sorted.map(([name,p])=>`<tr><td>${escapeHtml(name)}</td><td>${escapeHtml(p.category)}</td><td>${number(p.units)}</td><td>${p.orders.size}</td><td class="revenue-cell">${money(p.revenue)}</td><td>${total?(p.revenue/total*100).toFixed(1):'0.0'}%</td></tr>`).join('')||'<tr><td colspan="6">No data matches these filters.</td></tr>';
  $('recordCount').textContent=`${rows.length} records · ${orders} orders`;
}
function parseCSV(text){
  const lines=text.trim().split(/\r?\n/); if(lines.length<2)throw new Error('CSV needs a header and at least one data row.');
  const headers=lines.shift().split(',').map(h=>h.trim().toLowerCase().replace(/[^a-z0-9]/g,''));
  const get=(obj,keys)=>{for(const k of keys){const i=headers.indexOf(k);if(i>=0)return obj[i]??'';}return '';};
  const parsed=lines.map((line,i)=>{const cells=line.split(',').map(x=>x.trim());const o={};headers.forEach((h,j)=>o[h]=cells[j]||'');const date=get(o,['date','orderdate','salesdate']);const order=get(o,['order','orderid','ordernumber'])||`CSV-${i+1}`;const product=get(o,['product','productname','item'])||'Unspecified';const category=get(o,['category','productcategory'])||'Other';const region=get(o,['region','salesregion'])||'Other';const units=Number(get(o,['units','quantity','qty']))||0;const price=Number(get(o,['price','unitprice','sellingprice']))||0;const channel=get(o,['channel','saleschannel'])||'Other';if(!/^\d{4}-\d{2}-\d{2}$/.test(date))throw new Error(`Invalid/missing date on CSV row ${i+2}. Use YYYY-MM-DD.`);return {date,order,product,category,region,units,price,channel};});
  return parsed;
}
['dateFrom','dateTo','regionFilter','categoryFilter','channelFilter'].forEach(id=>$(id).addEventListener('change',render));
$('resetBtn').addEventListener('click',()=>{['regionFilter','categoryFilter','channelFilter'].forEach(id=>$(id).value='all');$('dateFrom').value=data.map(d=>d.date).sort()[0]||'';$('dateTo').value=data.map(d=>d.date).sort().at(-1)||'';render();});
$('csvUpload').addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;try{data=parseCSV(await f.text());setupFilters();render();alert(`Loaded ${data.length} rows from ${f.name}`);}catch(err){alert('Could not load CSV: '+err.message);}e.target.value='';});
$('exportBtn').addEventListener('click',()=>{const rows=filtered();const head=['date','order_id','product','category','region','units','unit_price','revenue','channel'];const csv=[head.join(','),...rows.map(r=>[r.date,r.order,`"${r.product.replace(/"/g,'""')}"`,r.category,r.region,r.units,r.price,revenue(r),r.channel].join(','))].join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='filtered_sales_data.csv';a.click();URL.revokeObjectURL(a.href);});
setupFilters();render();
