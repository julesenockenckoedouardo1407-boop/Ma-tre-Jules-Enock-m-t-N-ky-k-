
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

/* ===================== MOTEUR DE PROBLÈMES — SANS IA ===================== */
function normText(s){
  return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim();
}
function nums(text){
  const m=String(text).replace(/\u00a0/g,' ').match(/-?\d+(?:[.,]\d+)?/g)||[];
  return m.map(x=>Number(x.replace(',','.'))).filter(Number.isFinite);
}
function findNumAfter(text, patterns){
  const re=new RegExp(`(?:${patterns.join('|')})\s*(?:est|de|d[’']|a|mesure)?\s*(-?\d+(?:[.,]\d+)?)`,'i');
  const m=text.match(re); return m?Number(m[1].replace(',','.')):null;
}
function unitFrom(text, units){
  const re=new RegExp('(-?\\d+(?:[.,]\\d+)?)\\s*('+units.join('|')+')','i');
  const m=text.match(re); return m?{value:Number(m[1].replace(',','.')),unit:m[2].toLowerCase()}:null;
}
function resultSteps(title, steps){
  return `<div class="problem-title"><b>${title}</b></div>` + steps.map((x,i)=>`<div class="step"><b>${i+1}. ${x[0]}</b>${x[1]?`<div>${x[1]}</div>`:''}</div>`).join('');
}
function solveProblemText(raw){
  const t=normText(raw);
  if(!t) return {html:'<b>Écris d’abord un énoncé.</b>',ok:false};
  const ns=nums(raw);

  // POURCENTAGE
  if(/%|pour cent|pourcentage/.test(t)){
    const pctMatch=raw.match(/(-?\d+(?:[.,]\d+)?)\s*%/);
    const pct=pctMatch?Number(pctMatch[1].replace(',','.')):null;
    const after=pctMatch?raw.slice(pctMatch.index+pctMatch[0].length):raw;
    const baseMatch=after.match(/(-?\d+(?:[.,]\d+)?)/);
    const base=baseMatch?Number(baseMatch[1].replace(',','.')):null;
    if(pct!==null&&base!==null){
      const v=base*pct/100;
      return {html:resultSteps('Pourcentage',[
        ['Données',`Pourcentage = ${fmt(pct)} % ; nombre = ${fmt(base)}`],
        ['Règle',`Valeur = nombre × pourcentage ÷ 100`],
        ['Calcul',`${fmt(base)} × ${fmt(pct)} ÷ 100 = ${fmt(v)}`],
        ['Réponse',`<b>${fmt(v)}</b>`]
      ]),ok:true};
    }
  }

  // RECTANGLE
  if(/rectangle|terrain rectangulaire|champ rectangulaire|piece rectangulaire|pi[eè]ce rectangulaire/.test(t)){
    const L=findNumAfter(raw,['longueur','L']);
    const l=findNumAfter(raw,['largeur','l']);
    const vals=(L!==null&&l!==null)?[L,l]:ns.slice(0,2);
    if(vals.length>=2){
      const a=vals[0],b=vals[1], P=2*(a+b), A=a*b;
      const wantP=/perimetre|périmètre/.test(t), wantA=/aire|surface/.test(t);
      const steps=[['Données',`Longueur = ${fmt(a)} ; largeur = ${fmt(b)}`]];
      if(wantP||!wantA) steps.push(['Formule du périmètre','P = 2 × (L + l)'],['Calcul',`P = 2 × (${fmt(a)} + ${fmt(b)}) = <b>${fmt(P)}</b>`],['Réponse',`Périmètre = <b>${fmt(P)}</b>`]);
      if(wantA||!wantP) steps.push(['Formule de l’aire','A = L × l'],['Calcul',`A = ${fmt(a)} × ${fmt(b)} = <b>${fmt(A)}</b>`],['Réponse',`Surface / aire = <b>${fmt(A)}</b>`]);
      return {html:resultSteps('Rectangle',steps),ok:true};
    }
  }

  // CARRE
  if(/carre|cote du carre|carr[eé]/.test(t)){
    const c=findNumAfter(raw,['cote','côté','c']);
    const a=c!==null?c:ns[0];
    if(Number.isFinite(a)){
      const P=4*a,A=a*a; const wantP=/perimetre|périmètre/.test(t), wantA=/aire|surface/.test(t);
      const steps=[['Donnée',`Côté = ${fmt(a)}`]];
      if(wantP||!wantA) steps.push(['Formule','P = 4 × c'],['Calcul',`P = 4 × ${fmt(a)} = <b>${fmt(P)}</b>`],['Réponse',`Périmètre = <b>${fmt(P)}</b>`]);
      if(wantA||!wantP) steps.push(['Formule','A = c × c'],['Calcul',`A = ${fmt(a)} × ${fmt(a)} = <b>${fmt(A)}</b>`],['Réponse',`Aire = <b>${fmt(A)}</b>`]);
      return {html:resultSteps('Carré',steps),ok:true};
    }
  }

  // TRIANGLE
  if(/triangle/.test(t) && ns.length>=2){
    const base=findNumAfter(raw,['base']) ?? ns[0];
    const h=findNumAfter(raw,['hauteur']) ?? ns[1];
    if(/aire|surface/.test(t)){
      const A=base*h/2;
      return {html:resultSteps('Triangle',[
        ['Données',`Base = ${fmt(base)} ; hauteur = ${fmt(h)}`],
        ['Formule','A = (base × hauteur) ÷ 2'],
        ['Calcul',`A = (${fmt(base)} × ${fmt(h)}) ÷ 2 = <b>${fmt(A)}</b>`],
        ['Réponse',`Aire = <b>${fmt(A)}</b>`]
      ]),ok:true};
    }
  }

  // VITESSE / DISTANCE / TEMPS
  if(/vitesse|km\/h|km par heure|distance.*temps|parcourt.*en/.test(t) && ns.length>=2){
    const km=unitFrom(raw,['km','kilometres','kilomètres','m']);
    const h=unitFrom(raw,['h','heure','heures','min','minute','minutes']);
    if(km&&h){
      let d=km.value, time=h.value, timeLabel=h.unit;
      if(/^min|minute/.test(timeLabel)){time=time/60; timeLabel='h';}
      if(/vitesse/.test(t)||/km\/h|km par heure/.test(t)){
        const v=d/time;
        return {html:resultSteps('Vitesse',[
          ['Données',`Distance = ${fmt(d)} ${km.unit} ; temps = ${fmt(h.value)} ${h.unit}`],
          ['Formule','V = D ÷ T'],
          ['Conversion',h.unit.match(/^min|minute/)?`${fmt(h.value)} min = ${fmt(time)} h`: 'Temps déjà exprimé en heures'],
          ['Calcul',`V = ${fmt(d)} ÷ ${fmt(time)} = <b>${fmt(v)} km/h</b>`],
          ['Réponse',`Vitesse = <b>${fmt(v)} km/h</b>`]
        ]),ok:true};
      }
    }
  }

  // MOYENNE
  if(/moyenne|notes|moyenne arithmetique/.test(t) && ns.length>=2){
    const sum=ns.reduce((a,b)=>a+b,0), m=sum/ns.length;
    return {html:resultSteps('Moyenne',[
      ['Données',`Valeurs : ${ns.map(fmt).join(' ; ')}`],
      ['Formule','Moyenne = somme des valeurs ÷ nombre de valeurs'],
      ['Calcul',`Somme = ${fmt(sum)} ; nombre de valeurs = ${ns.length}`],
      ['Calcul final',`${fmt(sum)} ÷ ${ns.length} = <b>${fmt(m)}</b>`],
      ['Réponse',`Moyenne = <b>${fmt(m)}</b>`]
    ]),ok:true};
  }

  // BENEFICE / PERTE
  if(/benefice|b[eé]n[eé]fice|perte|prix d'achat|prix d’achat|prix de vente/.test(t) && ns.length>=2){
    const pa=findNumAfter(raw,["prix d'achat","prix d’achat","achete","acheté"]) ?? ns[0];
    const pv=findNumAfter(raw,['prix de vente','vendu','vends','vente']) ?? ns[1];
    if(Number.isFinite(pa)&&Number.isFinite(pv)){
      const diff=pv-pa;
      return {html:resultSteps('Commerce',[
        ['Données',`Prix d’achat = ${fmt(pa)} ; prix de vente = ${fmt(pv)}`],
        ['Règle',`Bénéfice / perte = prix de vente − prix d’achat`],
        ['Calcul',`${fmt(pv)} − ${fmt(pa)} = <b>${fmt(diff)}</b>`],
        ['Réponse',diff>=0?`Bénéfice = <b>${fmt(diff)}</b>`:`Perte = <b>${fmt(Math.abs(diff))}</b>`]
      ]),ok:true};
    }
  }

  // PROPORTIONNALITE / REGLE DE TROIS
  if(/proportion|regle de trois|r[eè]gle de trois|coutent|co[uû]te|pour .* combien/.test(t) && ns.length>=3){
    const a=ns[0],b=ns[1],c=ns[2];
    if(b!==0){
      const x=b*c/a;
      return {html:resultSteps('Proportionnalité',[
        ['Données',`${fmt(a)} correspond à ${fmt(b)} ; on cherche la valeur correspondant à ${fmt(c)}`],
        ['Règle de trois',`x = (${fmt(b)} × ${fmt(c)}) ÷ ${fmt(a)}`],
        ['Calcul',`x = (${fmt(b)} × ${fmt(c)}) ÷ ${fmt(a)} = <b>${fmt(x)}</b>`],
        ['Réponse',`Valeur cherchée = <b>${fmt(x)}</b>`]
      ]),ok:true};
    }
  }

  // CALCUL SIMPLE DANS UN ENONCE
  if(ns.length===2 && /somme|total|addition|ajoute|plus/.test(t)){
    const r=ns[0]+ns[1];
    return {html:resultSteps('Addition', [['Données',`${fmt(ns[0])} et ${fmt(ns[1])}`],['Calcul',`${fmt(ns[0])} + ${fmt(ns[1])} = <b>${fmt(r)}</b>`],['Réponse',`<b>${fmt(r)}</b>`]]),ok:true};
  }

  return {html:`<div class="problem-title"><b>Le moteur n’a pas encore reconnu cet énoncé.</b></div><p>Essaie un problème contenant clairement les mots <b>rectangle</b>, <b>longueur</b>, <b>largeur</b>, <b>vitesse</b>, <b>distance</b>, <b>pourcentage</b>, <b>moyenne</b>, <b>proportion</b> ou <b>prix d’achat / prix de vente</b>, avec les nombres nécessaires.</p>`,ok:false};
}

if($('#solveProblem')){
  $('#solveProblem').onclick=()=>{
    const r=solveProblemText($('#problemText').value);
    $('#problemResult').className='result'+(r.ok?'':' warning');
    $('#problemResult').innerHTML=r.html;
  };
  $('#clearProblem').onclick=()=>{ $('#problemText').value=''; $('#problemResult').className='result'; $('#problemResult').innerHTML='La résolution détaillée apparaîtra ici.'; };
  $$('.exampleProblem').forEach(b=>b.onclick=()=>{ $('#problemText').value=b.textContent; show('#problem'); $('#solveProblem').click(); });
}


/* ===================== V3 EXPERT — MODULES AVANCÉS SANS IA ===================== */
const $id=(x)=>document.getElementById(x);
const advFields=$id('advFields');
function advForm(){
 const t=$id('advType')?.value; if(!advFields)return;
 const map={
 shareEqual:`<label>Quantité totale<input id="av1" inputmode="decimal"></label><label>Nombre de personnes<input id="av2" inputmode="numeric"></label>`,
 shareRatio:`<label>Quantité totale<input id="av1" inputmode="decimal"></label><label>Parts (ex. 2,3,5)<input id="av2"></label>`,
 cost:`<label>Prix d'achat<input id="av1" inputmode="decimal"></label><label>Frais supplémentaires<input id="av2" inputmode="decimal"></label><label>Nombre d'articles<input id="av3" inputmode="numeric" value="1"></label>`,
 workdays:`<label>Nombre total de jours<input id="av1" inputmode="numeric"></label><label>Jours non travaillés<input id="av2" inputmode="numeric"></label><label>Production par jour<input id="av3" inputmode="decimal"></label>`,
 compound:`<label>Quantité initiale<input id="av1" inputmode="decimal"></label><label>Opération 1<select id="av2"><option value="add">Ajouter</option><option value="sub">Retirer</option><option value="mul">Multiplier par</option></select></label><label>Valeur 1<input id="av3" inputmode="decimal"></label><label>Opération 2<select id="av4"><option value="mul">Multiplier par</option><option value="add">Ajouter</option><option value="sub">Retirer</option></select></label><label>Valeur 2<input id="av5" inputmode="decimal"></label>`,
 discount:`<label>Prix initial<input id="av1" inputmode="decimal"></label><label>Taux (%)<input id="av2" inputmode="decimal"></label><label>Type<select id="av3"><option value="discount">Remise</option><option value="increase">Augmentation</option></select></label>`};
 advFields.innerHTML=map[t];
}
$id('advType')?.addEventListener('change',advForm); advForm();
$id('advSolve')?.addEventListener('click',()=>{
 const t=$id('advType').value,n=x=>Number(x), f=(title,steps)=>resultSteps(title,steps); let h='';
 if(t==='shareEqual'){let q=n($id('av1').value),p=n($id('av2').value); if(q>=0&&p>0)h=f('Partage égal',[['Données',`Total = ${fmt(q)} ; personnes = ${fmt(p)}`],['Règle','Part = total ÷ nombre de personnes'],['Calcul',`${fmt(q)} ÷ ${fmt(p)} = <b>${fmt(q/p)}</b>`],['Réponse',`Chaque personne reçoit <b>${fmt(q/p)}</b>.`]]);}
 if(t==='shareRatio'){let q=n($id('av1').value),parts=$id('av2').value.split(/[,; ]+/).map(Number).filter(x=>x>0),s=parts.reduce((a,b)=>a+b,0); if(q>=0&&parts.length&&s)h=f('Partage proportionnel',[['Données',`Total = ${fmt(q)} ; parts = ${parts.join(' : ')}`],['Total des parts',`${parts.join(' + ')} = <b>${fmt(s)}</b>`],['Valeur d’une part',`${fmt(q)} ÷ ${fmt(s)} = <b>${fmt(q/s)}</b>`],['Répartition',parts.map((p,i)=>`Part ${i+1} = ${p} × ${fmt(q/s)} = <b>${fmt(p*q/s)}</b>`).join('<br>')]]);}
 if(t==='cost'){let a=n($id('av1').value),r=n($id('av2').value),q=n($id('av3').value);if(q>0)h=f('Prix de revient',[['Données',`Achat = ${fmt(a)} ; frais = ${fmt(r)} ; quantité = ${fmt(q)}`],['Coût total',`${fmt(a)} + ${fmt(r)} = <b>${fmt(a+r)}</b>`],['Prix de revient unitaire',`${fmt(a+r)} ÷ ${fmt(q)} = <b>${fmt((a+r)/q)}</b>`],['Réponse',`Prix de revient unitaire = <b>${fmt((a+r)/q)}</b>`]]);}
 if(t==='workdays'){let total=n($id('av1').value),off=n($id('av2').value),prod=n($id('av3').value),days=total-off;if(days>=0)h=f('Jours de travail',[['Données',`Jours totaux = ${fmt(total)} ; jours non travaillés = ${fmt(off)}`],['Jours travaillés',`${fmt(total)} − ${fmt(off)} = <b>${fmt(days)}</b>`],['Production totale',`${fmt(days)} × ${fmt(prod)} = <b>${fmt(days*prod)}</b>`],['Réponse',`Jours travaillés = <b>${fmt(days)}</b> ; production = <b>${fmt(days*prod)}</b>`]]);}
 if(t==='compound'){let v=n($id('av1').value),a=n($id('av3').value),b=n($id('av5').value),o1=$id('av2').value,o2=$id('av4').value;if([v,a,b].every(Number.isFinite)){let r1=o1==='add'?v+a:o1==='sub'?v-a:v*a;let r2=o2==='add'?r1+b:o2==='sub'?r1-b:r1*b;h=f('Problème composé',[['Valeur initiale',`<b>${fmt(v)}</b>`],['Étape 1',`${fmt(v)} ${o1==='add'?'+':o1==='sub'?'−':'×'} ${fmt(a)} = <b>${fmt(r1)}</b>`],['Étape 2',`${fmt(r1)} ${o2==='add'?'+':o2==='sub'?'−':'×'} ${fmt(b)} = <b>${fmt(r2)}</b>`],['Réponse',`Résultat final = <b>${fmt(r2)}</b>`]]);}}
 if(t==='discount'){let p=n($id('av1').value),r=n($id('av2').value),typ=$id('av3').value;if(p>=0&&r>=0){let delta=p*r/100,res=typ==='discount'?p-delta:p+delta;h=f(typ==='discount'?'Remise':'Augmentation',[['Données',`Prix = ${fmt(p)} ; taux = ${fmt(r)} %`],['Calcul du taux',`${fmt(p)} × ${fmt(r)} ÷ 100 = <b>${fmt(delta)}</b>`],['Prix final',typ==='discount'?`${fmt(p)} − ${fmt(delta)} = <b>${fmt(res)}</b>`:`${fmt(p)} + ${fmt(delta)} = <b>${fmt(res)}</b>`],['Réponse',`Prix final = <b>${fmt(res)}</b>`]]);}}
 $id('advResult').innerHTML=h||'<b>Vérifie les données saisies.</b>';
});
const conv={m:1,cm:.01,km:1000,kg:1,g:.001,L:1,mL:.001,h:3600,min:60,s:1};
$id('cvGo')?.addEventListener('click',()=>{let v=Number($id('cvValue').value),a=$id('cvFrom').value,b=$id('cvTo').value;let groups=(a==='m'||a==='cm'||a==='km')&&(b==='m'||b==='cm'||b==='km')||(a==='kg'||a==='g')&&(b==='kg'||b==='g')||(a==='L'||a==='mL')&&(b==='L'||b==='mL')||(a==='h'||a==='min'||a==='s')&&(b==='h'||b==='min'||b==='s');$id('cvResult').innerHTML=groups&&Number.isFinite(v)?`${fmt(v)} ${a} = <b>${fmt(v*conv[a]/conv[b])} ${b}</b>`:'Choisis des unités de la même famille.';});
let score=Number(localStorage.getItem('mn_score')||0),qnum=Number(localStorage.getItem('mn_qnum')||1),train;
function newTrain(){let type=Math.floor(Math.random()*5),a=2+Math.floor(Math.random()*18),b=2+Math.floor(Math.random()*18);if(type===0)train={q:`Calcule ${a} + ${b}.`,a:a+b};if(type===1)train={q:`Calcule ${a} × ${b}.`,a:a*b};if(type===2)train={q:`Quel est ${a}% de ${b*10}?`,a:a*b};if(type===3)train={q:`Un rectangle mesure ${a} m sur ${b} m. Quelle est son aire ?`,a:a*b};if(type===4)train={q:`${a} élèves se partagent ${b*a} objets également. Combien chacun ?`,a:b};$id('trainQuestion').textContent=train.q;$id('trainAnswer').value='';$id('trainFeedback').textContent='';$id('score').textContent=score;$id('qnum').textContent=qnum;}
$id('trainCheck')?.addEventListener('click',()=>{let x=Number($id('trainAnswer').value);if(x===train.a){score++;$id('trainFeedback').innerHTML='✓ Correct !';}else $id('trainFeedback').innerHTML=`À revoir. La réponse attendue est <b>${fmt(train.a)}</b>.`;localStorage.setItem('mn_score',score);});
$id('trainNext')?.addEventListener('click',()=>{qnum++;localStorage.setItem('mn_qnum',qnum);newTrain();});newTrain();
