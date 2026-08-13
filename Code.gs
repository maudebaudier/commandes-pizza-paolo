/**
 * Commandes Pizza Paolo — petit serveur Google Apps Script.
 * La page est hebergee sur GitHub Pages ; ce script ne fait que
 * lire et ecrire les commandes dans un Google Sheet.
 */

var SHEET_NAME = 'Commandes';

function getSheet_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('SHEET_ID');
  var ss = null;
  if (id) {
    try { ss = SpreadsheetApp.openById(id); } catch (e) { ss = null; }
  }
  if (!ss) {
    ss = SpreadsheetApp.create('Commandes Pizza Paolo');
    props.setProperty('SHEET_ID', ss.getId());
  }
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['id', 'prenom', 'total', 'date', 'detail', 'json']);
    sh.setFrozenRows(1);
  }
  return sh;
}

/** Lance cette fonction une fois pour voir l'adresse de ton tableau dans le journal. */
function monTableau() {
  var url = getSheet_().getParent().getUrl();
  Logger.log(url);
  return url;
}

function readAll_() {
  var sh = getSheet_();
  var last = sh.getLastRow();
  if (last < 2) return [];
  var rows = sh.getRange(2, 1, last - 1, 6).getValues();
  var out = [];
  rows.forEach(function (r) {
    if (!r[0]) return;
    try { out.push(JSON.parse(r[5])); } catch (e) {}
  });
  return out;
}

function detail_(o) {
  return (o.items || []).map(function (l) { return l.q + ' x ' + l.n; }).join(', ');
}

function save_(o) {
  var sh = getSheet_();
  var last = sh.getLastRow();
  var row = -1;
  if (last >= 2) {
    var ids = sh.getRange(2, 1, last - 1, 1).getValues();
    for (var i = 0; i < ids.length; i++) {
      if (String(ids[i][0]) === String(o.id)) { row = i + 2; break; }
    }
  }
  var values = [o.id, o.prenom, o.total, new Date(), detail_(o), JSON.stringify(o)];
  if (row > 0) sh.getRange(row, 1, 1, 6).setValues([values]);
  else sh.appendRow(values);
}

function delete_(id) {
  var sh = getSheet_();
  var last = sh.getLastRow();
  if (last < 2) return;
  var ids = sh.getRange(2, 1, last - 1, 1).getValues();
  for (var i = ids.length - 1; i >= 0; i--) {
    if (String(ids[i][0]) === String(id)) sh.deleteRow(i + 2);
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function handle_(payload) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    if (payload.action === 'save' && payload.order) save_(payload.order);
    if (payload.action === 'delete' && payload.id) delete_(payload.id);
    return json_({ ok: true, orders: readAll_() });
  } finally {
    lock.releaseLock();
  }
}

function doPost(e) {
  var payload = {};
  try { payload = JSON.parse(e.postData.contents); } catch (err) {}
  return handle_(payload);
}

function doGet(e) {
  return handle_({ action: (e && e.parameter && e.parameter.action) || 'list' });
}
