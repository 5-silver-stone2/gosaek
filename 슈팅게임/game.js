const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
function resize(){
  canvas.width = Math.min(800, window.innerWidth - 40);
  canvas.height = Math.min(600, window.innerHeight - 200);
}
window.addEventListener('resize', resize);
resize();

// 플레이어 설정
const player = { x: canvas.width/2, y: canvas.height - 60, r:18, vx:0 };
let keys = {};
let mouse = { x: player.x, y: player.y, down:false };

// 발사체
const bullets = [];
// 적 목록
const enemies = [];
let lastSpawn = 0;

// 마우스 및 키 입력
canvas.addEventListener('mousemove', (e)=>{
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});
canvas.addEventListener('mousedown', ()=>{ mouse.down = true; shoot(); });
canvas.addEventListener('mouseup', ()=>{ mouse.down = false; });
window.addEventListener('keydown',(e)=>{ keys[e.key] = true; if(e.key===' ') shoot(); });
window.addEventListener('keyup',(e)=>{ keys[e.key] = false; });

function shoot(){
  // 플레이어와 마우스 사이의 각도를 구함 (삼각함수 사용)
  // [TRIG] 사용: Math.atan2 -> 플레이어와 목표(마우스) 사이의 각도를 계산
  const angle = Math.atan2(mouse.y - player.y, mouse.x - player.x);
  const speed = 8;
  // [TRIG] 사용: Math.cos, Math.sin -> 각도로부터 x,y 속도 성분을 계산하여 총알이 조준 방향으로 날아감
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;
  bullets.push({ x: player.x, y: player.y, vx, vy, r:4 });
}

function spawnEnemy(time){
  const baseX = Math.random() * (canvas.width - 80) + 40;
  const amplitude = 40 + Math.random()*60; // 좌우 진폭
  const freq = 0.002 + Math.random()*0.004; // 주파수
  // phase는 서로 다른 시작위상
  const phase = Math.random()*Math.PI*2;
  enemies.push({ baseX, amplitude, freq, phase, y: -30, speed: 0.6 + Math.random()*0.8, life:1, born: time });
}

function update(dt, time){
  // 플레이어 이동: 방향키(좌/우)로만 이동
  player.vx *= 0.9;
  if(keys['ArrowLeft']) player.vx -= 0.5;
  if(keys['ArrowRight']) player.vx += 0.5;
  player.x += player.vx;
  player.x = Math.max(20, Math.min(canvas.width-20, player.x));

  // 발사 자동연사 옵션 (마우스 누르면 연속 발사)
  if(mouse.down && time%200 < 16) shoot();

  // 발사체 업데이트
  for(let i=bullets.length-1;i>=0;i--){
    const b = bullets[i];
    b.x += b.vx;
    b.y += b.vy;
    if(b.x< -10 || b.x>canvas.width+10 || b.y< -10 || b.y>canvas.height+10) bullets.splice(i,1);
  }

  // 적 스폰
  if(time - lastSpawn > 1000){ spawnEnemy(time); lastSpawn = time; }

  // 적 업데이트: y는 속도로 내려오고 x는 사인함수로 좌우 진동
  for(let i=enemies.length-1;i>=0;i--){
    const e = enemies[i];
    e.y += e.speed * dt * 0.06;
    // [TRIG] 사용: Math.sin -> 적의 baseX에 주기적으로 좌우 변위를 더해 물결치며 내려오게 함
    e.x = e.baseX + e.amplitude * Math.sin(e.freq * (time + e.phase));
    // 충돌 검사: 총알
    for(let j=bullets.length-1;j>=0;j--){
      const b = bullets[j];
      const dx = b.x - e.x; const dy = b.y - e.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < b.r + 14){ bullets.splice(j,1); enemies.splice(i,1); break; }
    }
    if(e.y > canvas.height + 50) enemies.splice(i,1);
  }
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // 플레이어 그리기
  ctx.fillStyle = '#88f';
  ctx.beginPath(); ctx.arc(player.x, player.y, player.r, 0, Math.PI*2); ctx.fill();
  // 캐논 방향 표시(조준선)
  // [TRIG] 사용: atan2, cos, sin을 사용해 방향 벡터를 얻음 (위와 중복된 원리)
  const aimAngle = Math.atan2(mouse.y - player.y, mouse.x - player.x);
  const aimLen = 28;
  ctx.strokeStyle = '#ffd27f'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(player.x, player.y);
  ctx.lineTo(player.x + Math.cos(aimAngle)*aimLen, player.y + Math.sin(aimAngle)*aimLen);
  ctx.stroke();

  // 총알 그리기
  ctx.fillStyle = '#fff';
  bullets.forEach(b=>{ ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,Math.PI*2); ctx.fill(); });

  // 적 그리기
  enemies.forEach(e=>{
    ctx.fillStyle = '#f66';
    ctx.beginPath(); ctx.arc(e.x, e.y, 14, 0, Math.PI*2); ctx.fill();
  });
}

let last = performance.now();
function loop(t){
  const dt = t - last;
  update(dt, t);
  draw();
  last = t;
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
