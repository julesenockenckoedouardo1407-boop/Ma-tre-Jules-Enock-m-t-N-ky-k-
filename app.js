
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function show(id){
  $$('.panel').forEach(p=>p.classList.remove('active'));
  $(id).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}
$$('[data-go]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.go)));
$('#homeBtn').onclick=()=>show('#home');

const formulas = {
  rectangle: {name:'Rectangle', perimeter:'P = 2 × (L + l)', area:'A = L × l'},
  square: {name:'Carré', perimeter:'P = 4 × c', area:'A = c × c'},
  parallelogram: {name:'Parallélogramme', perimeter:'P = 2 × (a + b)', area:'A = base × hauteur'},
  rhombus: {name:'Losange', perimeter:'P = 4 × c', area:'A = (D × d) ÷ 2'},
  triangle: {name:'Triangle', perimeter:'P = a + b + c', area:'A = (base × hauteur) ÷ 2'},
  trapezoid: {name:'Trapèze', perimeter:'P = a + b + c + d', area:'A = ((B + b) × h) ÷ 2'}
};

function n(v){ return Number(String(v).replace(',','.')); }
function fmt(v){ return Number.isInteger(v) ? String(v) : String(Math.round(v*100000)/100000); }
function money(v){return fmt(v)}

$('#calcForm').addEventListener('submit', e=>{
  e.preventDefault();
  const a=n($('#a').value), b=n($('#b').value), op=$('#op').value;
  let r;
  if(!Number.isFinite(a)||!Number.isFinite(b)){ $('#calcResult').innerHTML='<b>Entre deux nombres valides.</b>'; return; }
  if(op==='+') r=a+b; if(op==='-') r=a-b; if(op==='×') r=a*b; if(op==='÷') r=b===0?null:a/b;
  $('#calcResult').innerHTML = r===null ? '<b>Division par zéro impossible.</b>' : `<div class="step">${fmt(a)} ${op} ${fmt(b)} = <b>${fmt(r)}</b></div>`;
});

$('#fracForm').addEventListener('submit', e=>{
  e.preventDefault();
  const a=n($('#fa').value), b=n($('#fb').value), c=n($('#fc').value), d=n($('#fd').value), op=$('#fop').value;
  if(![a,b,c,d].every(Number.isFinite)||b===0||d===0){$('#fracResult').textContent='Vérifie les numérateurs et dénominateurs.';return}
  let num,den;
  if(op==='+'){num=a*d+c*b;den=b*d}
  if(op==='-'){num=a*d-c*b;den=b*d}
  if(op==='×'){num=a*c;den=b*d}
  if(op==='÷'){if(c===0){$('#fracResult').textContent='Division par zéro impossible.';return}num=a*d;den=b*c}
  const g=(x,y)=>{x=Math.abs(x);y=Math.abs(y);while(y){[x,y]=[y,x%y]}return x||1};
  const gg=g(num,den); num/=gg;den/=gg;
  $('#fracResult').innerHTML=`<div class="step">1. Calcul : <span class="formula">${a}/${b} ${op} ${c}/${d}</span></div><div class="step">2. Résultat : <b>${num}/${den}</b></div>`;
});

$('#geoForm').addEventListener('submit',e=>{
  e.preventDefault();
  const type=$('#geoType').value, goal=$('#geoGoal').value;
  const x=n($('#g1').value), y=n($('#g2').value), z=n($('#g3').value);
  let formula='', calc='';
  if(type==='rectangle'){
    if(goal==='area'){formula='A = L × l';calc=`${x} × ${y} = ${fmt(x*y)}`}
    else {formula='P = 2 × (L + l)';calc=`2 × (${x} + ${y}) = ${fmt(2*(x+y))}`}
  } else if(type==='square'){
    if(goal==='area'){formula='A = c × c';calc=`${x} × ${x} = ${fmt(x*x)}`}
    else {formula='P = 4 × c';calc=`4 × ${x} = ${fmt(4*x)}`}
  } else if(type==='triangle'){
    if(goal==='area'){formula='A = (base × hauteur) ÷ 2';calc=`(${x} × ${y}) ÷ 2 = ${fmt(x*y/2)}`}
    else {formula='P = a + b + c';calc=`${x} + ${y} + ${z} = ${fmt(x+y+z)}`}
  } else if(type==='parallelogram'){
    if(goal==='area'){formula='A = base × hauteur';calc=`${x} × ${y} = ${fmt(x*y)}`}
    else {formula='P = 2 × (a + b)';calc=`2 × (${x} + ${y}) = ${fmt(2*(x+y))}`}
  }
  $('#geoResult').innerHTML=`<div class="step"><b>Formule :</b> <span class="formula">${formula}</span></div><div class="step"><b>Remplacement :</b> ${calc}</div><div class="step"><b>Réponse :</b> ${calc.split('=')[1].trim()}</div>`;
});

$('#speedForm').addEventListener('submit',e=>{
  e.preventDefault();
  const d=n($('#sd').value), t=n($('#st').value), what=$('#swhat').value;
  if(!Number.isFinite(d)||!Number.isFinite(t)||t===0){$('#speedResult').textContent='Entre des valeurs valides.';return}
  let formula, value;
  if(what==='v'){formula='V = D ÷ T';value=d/t}
  if(what==='d'){formula='D = V × T';value=d*t}
  if(what==='t'){formula='T = D ÷ V';value=d/t}
  $('#speedResult').innerHTML=`<div class="step"><b>Formule :</b> <span class="formula">${formula}</span></div><div class="step"><b>Calcul :</b> ${fmt(value)}</div><div class="step"><b>Réponse :</b> ${fmt(value)}</div>`;
});

$('#commerceForm').addEventListener('submit',e=>{
  e.preventDefault();
  const pa=n($('#pa').value), pv=n($('#pv').value), q=n($('#qty').value)||1;
  if(!Number.isFinite(pa)||!Number.isFinite(pv)){ $('#commerceResult').textContent='Entre un prix d’achat et un prix de vente valides.';return}
  const diff=pv-pa, totalPA=pa*q,totalPV=pv*q;
  const taux=pa!==0?diff/pa*100:0;
  $('#commerceResult').innerHTML=`<div class="step">Prix d'achat total : <b>${money(totalPA)}</b></div><div class="step">Prix de vente total : <b>${money(totalPV)}</b></div><div class="step">${diff>=0?'Bénéfice':'Perte'} par unité : <b>${money(Math.abs(diff))}</b></div><div class="step">Taux par rapport au prix d'achat : <b>${fmt(Math.abs(taux))}%</b></div>`;
});

$('#meanForm').addEventListener('submit',e=>{
  e.preventDefault();
  const vals=$('#meanVals').value.split(/[,; ]+/).filter(Boolean).map(n).filter(Number.isFinite);
  if(!vals.length){$('#meanResult').textContent='Entre plusieurs nombres.';return}
  const sum=vals.reduce((a,b)=>a+b,0), m=sum/vals.length;
  $('#meanResult').innerHTML=`<div class="step">Somme : <b>${fmt(sum)}</b></div><div class="step">Nombre de valeurs : <b>${vals.length}</b></div><div class="step">Moyenne = somme ÷ nombre de valeurs = <b>${fmt(m)}</b></div>`;
});

const grammarExercises=[
  ['Nature du mot','Dans « Le petit garçon court », quelle est la nature de « petit » ?','adjectif'],
  ['Sujet','Dans « Marie lit un livre », quel est le sujet ?','marie'],
  ['Pluriel','Mets « cheval » au pluriel.','chevaux'],
  ['Conjugaison','Conjugue « finir » au présent avec « nous ».','finissons'],
  ['Antonyme','Donne l’antonyme de « grand ».','petit'],
  ['Orthographe','Complète : « Ils ___ à l’école. » (aller, présent)','vont']
];
let exIndex=0;
function loadExercise(){
  const e=grammarExercises[exIndex%grammarExercises.length];
  $('#exerciseType').textContent=e[0]; $('#exerciseQuestion').textContent=e[1]; $('#exerciseAnswer').value=''; $('#exerciseFeedback').textContent='';
}
$('#nextExercise').onclick=()=>{exIndex++;loadExercise()};
$('#checkExercise').onclick=()=>{
  const e=grammarExercises[exIndex%grammarExercises.length], ans=$('#exerciseAnswer').value.trim().toLowerCase();
  $('#exerciseFeedback').textContent=ans===e[2]?'✓ Réponse correcte.':'Réponse à revoir. Indice : relis la question et vérifie la règle concernée.';
};
loadExercise();

$('#letterForm').addEventListener('submit',e=>{
  e.preventDefault();
  const name=$('#lname').value.trim()||'Nom de l’élève', dest=$('#ldest').value.trim()||'Madame, Monsieur', subject=$('#lsubject').value.trim()||'Demande', body=$('#lbody').value.trim()||'Je vous écris afin de vous présenter ma demande.';
  $('#letterOut').textContent=`${dest}\n\nObjet : ${subject}\n\nMadame, Monsieur,\n\n${body}\n\nJe vous prie d’agréer, Madame, Monsieur, l’expression de mes salutations distinguées.\n\n${name}`;
});

if('serviceWorker' in navigator){
  window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
}
