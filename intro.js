(()=>{
const intro=document.getElementById('loadingIntro'),status=document.getElementById('introStatus'),fill=document.getElementById('introProgressFill'),stage=document.querySelector('.introStage');let finished=false;const timers=[];const sections=[document.getElementById('scene'),document.querySelector('header'),document.querySelector('footer')];sections.forEach(el=>el.inert=true);
document.getElementById('terminal').append(stage);stage.classList.add('logoForeground');
function later(fn,delay){timers.push(setTimeout(fn,delay))}
function dockModel(){stage.style.transition='none';stage.classList.remove('modelDocking');const badge=document.querySelector('.badge').getBoundingClientRect();stage.classList.add('headerModel');stage.style.left=`${badge.left+badge.width/2}px`;stage.style.top=`${badge.top+badge.height/2}px`;stage.style.width=`${badge.width}px`;stage.style.height=`${badge.height}px`}
function finish(){if(finished)return;finished=true;dockModel();timers.forEach(clearTimeout);fill.style.width='100%';intro.classList.add('leaving');document.body.classList.remove('booting');sections.forEach(el=>el.inert=false);setTimeout(()=>{intro.hidden=true;document.body.classList.remove('briefingReveal')},1100)}
window.addEventListener('resize',()=>{if(finished&&stage.classList.contains('headerModel'))dockModel()});

later(()=>{document.querySelector('.introReadout').classList.add('textIn')},400);
let begun=false;window.startBriefing=()=>{if(begun)return;begun=true;
later(()=>{document.body.classList.add('briefingReveal');window.settleMedallion?.();const badgeNode=document.querySelector('.badge'),badge=badgeNode.getBoundingClientRect(),header=document.querySelector('header');const headerTransform=new DOMMatrixReadOnly(getComputedStyle(header).transform);const current=stage.getBoundingClientRect();stage.style.transition='none';document.getElementById('terminal').append(stage);stage.style.left=`${current.left+current.width/2}px`;stage.style.top=`${current.top+current.height/2}px`;stage.style.width=`${current.width}px`;stage.getBoundingClientRect();stage.style.transition='';stage.classList.add('modelDocking');stage.style.left=`${badge.left+badge.width/2-headerTransform.m41}px`;stage.style.top=`${badge.top+badge.height/2-headerTransform.m42}px`;stage.style.width=`${badge.width}px`;intro.classList.add('docking');document.querySelector('.introReadout').classList.add('textOut')},4800);
later(()=>{intro.classList.add('leaving');if(window.tacticalMap?.flyTo)window.tacticalMap.flyTo(3,6.2,2200)},5650);later(finish,6900);
};
})();
