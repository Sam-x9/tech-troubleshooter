'use strict';
const questions=[{"category": "Wi-Fi & internet", "question": "One website will not load.", "scenario": "Other websites open normally on the same laptop. What is the best next step?", "choices": ["Factory-reset the router", "Investigate that website or app", "Replace the Wi-Fi adapter", "Reinstall the operating system"], "answer": 1, "why": "Other sites working suggests the problem is narrower than a complete internet outage. Check that site or app before changing the whole network."}, {"category": "Wi-Fi & internet", "question": "Your laptop is offline. Your phone is not.", "scenario": "The phone can browse on the same Wi-Fi, with mobile data turned off. Where would you focus first?", "choices": ["Your laptop and its connection", "A complete outage of the whole network", "Buying a new router immediately", "Restarting the school network"], "answer": 0, "why": "A working device on the same Wi-Fi is a useful clue. Check the laptop\u2019s connection and settings before assuming the whole network is down."}, {"category": "Slow computer", "question": "Many tabs. One slow browser.", "scenario": "Your browser is slow, but other apps respond normally. What should you try first?", "choices": ["Download a random speed booster", "Delete unfamiliar system files", "Save work and close unneeded tabs", "Replace the computer immediately"], "answer": 2, "why": "Start with the affected app. Closing unneeded tabs after saving work is a small, reversible step you can test."}, {"category": "Slow computer", "question": "An unfamiliar process uses a lot of memory.", "scenario": "You notice it in Task Manager on your school computer. What is the safest next step?", "choices": ["End every process in the list", "Disable security software", "Delete the program\u2019s system folder", "Identify the process or ask IT before ending it"], "answer": 3, "why": "High resource use does not tell you whether a process is safe to stop. Unknown system or managed processes should be identified before changing them."}, {"category": "Printer problems", "question": "Print produced a PDF file.", "scenario": "You expected a paper copy, but your computer asked where to save a PDF. What should you check?", "choices": ["The Wi-Fi password", "The selected print destination", "The keyboard settings", "The monitor cable"], "answer": 1, "why": "A PDF destination saves a file. Choose the intended physical printer in the print dialog."}, {"category": "Troubleshooting method", "question": "You have tried one change.", "scenario": "You reconnected the laptop to Wi-Fi. What should you do next?", "choices": ["Change three more settings", "Assume the problem is solved", "Repeat the original task and note the result", "Reset every device nearby"], "answer": 2, "why": "Testing tells you whether that change helped. One change at a time makes the result easier to understand."}];

const root=document.getElementById('quiz');
let index=0,answers=[];
function el(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e}
function focusHeading(){const h=root.querySelector('h2');h.tabIndex=-1;h.focus({preventScroll:true})}
function draw(){
 const q=questions[index];root.replaceChildren();
 const top=el('div','quiz-top');top.append(el('span','', 'SCENARIO '+(index+1)+' / '+questions.length),el('span','',q.category));
 const progress=el('div','quiz-progress');progress.setAttribute('aria-hidden','true');const bar=el('span');bar.style.width=((index/questions.length)*100)+'%';progress.append(bar);
 root.append(top,progress,el('h2','',q.question),el('p','scenario',q.scenario));
 const opts=el('div','options');root.append(opts);
 q.choices.forEach((text,i)=>{const b=el('button','option');b.type='button';b.append(el('b','','ABCD'[i]),el('span','',text));b.addEventListener('click',()=>choose(i));opts.append(b)});
 const feedback=el('div','feedback');feedback.id='feedback';feedback.setAttribute('role','status');feedback.hidden=true;root.append(feedback);
 const next=el('button','primary',index===questions.length-1?'See my results →':'Next scenario →');next.type='button';next.id='next';next.hidden=true;next.addEventListener('click',()=>{index++;if(index<questions.length)draw();else results();focusHeading()});root.append(next);
}
function choose(i){
 if(answers[index]!==undefined)return;
 const q=questions[index];answers[index]=i;
 root.querySelectorAll('.option').forEach((b,j)=>{b.disabled=true;if(j===q.answer)b.classList.add('correct');else if(j===i)b.classList.add('incorrect')});
 const f=document.getElementById('feedback');f.hidden=false;f.append(el('h3','',i===q.answer?'Good choice.':'Here’s a better next step.'),el('p','',(i===q.answer?'':q.choices[q.answer]+'. ')+q.why));document.getElementById('next').hidden=false;
}
function results(){
 const score=answers.filter((a,i)=>a===questions[i].answer).length;root.replaceChildren();
 root.append(el('p','eyebrow','PRACTICE COMPLETE'),el('h2','',score===questions.length?'A thoughtful troubleshooter.':'Every check teaches you something.'));
 const value=el('div','score-number',String(score));value.append(el('small','',' / '+questions.length));root.append(value,el('p','', 'Review your answers, then take the same approach to a real problem: identify, check, try, and test.'));
 const actions=el('div','actions');const retry=el('button','primary','Try again ↺');retry.type='button';retry.addEventListener('click',()=>{index=0;answers=[];draw();focusHeading()});const link=el('a','text-link','Review the guides →');link.href='problems.html';actions.append(retry,link);root.append(actions);
 questions.forEach((q,i)=>{const item=el('article','review-item');item.append(el('h3','',(answers[i]===q.answer?'✓ Correct — ':'Review — ')+q.question),el('p','',q.why));root.append(item)});
}
draw();
