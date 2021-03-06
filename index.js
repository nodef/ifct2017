const nlp = require('./nlp');

const REGEX = {
  '1937': /193\d|194\d/i,
  '1951': /195\d/i,
  '1963': /196\d/i,
  '1971': /197\d/i,
  '1989': /198\d|199\d/i,
  '2017': /200\d|201\d/i,
  father: /(father)/i,
  challenge: /challeng|difficult|inconsistent|fragment|exhaust/i,
  interest: /interest|bioactive|first/i,
  limitation: /limitation|exact/i,
  learn: /learn|underst|more/i,
  funder: /fund|financ|money|contribut|donat|pay|paid/i,
  when: /when|date|day|month|year|last/i,
  why: /why|cause|reason/i,
  publisher: /publish|issu|creat|wr(i|o)t|ma(k|de)|develop|produc|print|announc|report|declar|distribut|spread|disseminat|circulat/i,
  credit: /credit|acknowledg/i,
  supporter: /support|back|help/i,
  source: /source|from|origin|take|derive|borrow|obtain/i,
  data: /data|info/i,
  form: /form|shape|appear|configur|structure|dispos/i,
  group: /type|group|category|class|sort|kind|variety|collection|cluster/i,
  column: /column|component|part|piece|bit|constituent|element|ingredient|unit|module|item|section|portion/i,
  what: /what|about/i,
};
const USER = /user|utilizer|applier/i;
const USE = /use|using|utiliz|employ|appl/i;
const WHO = /who|person|people|member/i;
var corpus = null;




function load() {
  if (corpus) return corpus;
  corpus = require('./corpus');
  return corpus;
}


function about(txt) {
  if (!corpus) load();
  var txt = nlp(txt), re = REGEX;
  if(USER.test(txt) || (USE.test(txt) && WHO.test(txt))) return corpus.get('user');
  if(USE.test(txt)) return corpus.get('use');
  for(var k in re)
    if(re[k].test(txt)) return corpus.get(k);
  return null;
}
about.load = load;
module.exports = about;
