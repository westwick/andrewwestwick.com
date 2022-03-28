var c = document.getElementById('c')
var w = (c.width = window.innerWidth),
  h = (c.height = window.innerHeight),
  ctx = c.getContext('2d'),
  opts = {
    len: 20,
    count: 15,
    baseTime: 10,
    addedTime: 10,
    dieChance: 0.05,
    spawnChance: 1,
    sparkChance: 0,
    sparkDist: 10,
    sparkSize: 2,

    color: 'hsl(hue,100%,light%)',
    baseLight: 50,
    addedLight: 10, // [50-10,50+10]
    shadowToTimePropMult: 6,
    baseLightInputMultiplier: 0.01,
    addedLightInputMultiplier: 0.02,

    cx: 0,
    cy: 0,
    repaintAlpha: 0.04,
    hueChange: 0.1,
  },
  tick = 0,
  lines = [],
  dieX = w / 2 / opts.len,
  dieY = h / 2 / opts.len,
  baseRad = (Math.PI * 2) / 6

ctx.fillStyle = 'rgba(17, 18, 30, 1)'
ctx.fillRect(0, 0, w, h)

function loop() {
  window.requestAnimationFrame(loop)

  ++tick

  ctx.globalCompositeOperation = 'source-over'
  ctx.shadowBlur = 0
  ctx.fillStyle = 'rgba(17,18,30,.05)'
  ctx.fillRect(0, 0, w, h)
  ctx.globalCompositeOperation = 'lighter'

  if (lines.length < opts.count && Math.random() < opts.spawnChance)
    lines.push(new Line())

  lines.map(function (line) {
    line.step()
  })
}
function Line() {
  this.reset()
}
Line.prototype.reset = function () {
  var maxX = Math.ceil(w / 24) * 24
  var maxY = Math.ceil(h / 24) * 24
  this.startX = Math.random() < 0.5 ? maxX : 0
  this.startY = Math.random() < 0.5 ? maxY : 0
  this.x = 0
  this.y = 0
  this.addedX = 0
  this.addedY = 0

  this.rad = 0

  this.lightInputMultiplier =
    opts.baseLightInputMultiplier +
    opts.addedLightInputMultiplier * Math.random()

  this.color = opts.color.replace('hue', 200)
  this.cumulativeTime = 0

  this.beginPhase()
}
Line.prototype.beginPhase = function () {
  this.x += this.addedX
  this.y += this.addedY

  this.time = 0
  this.targetTime = (opts.baseTime + opts.addedTime * Math.random()) | 0

  this.rad += baseRad * (Math.random() < 0.5 ? 1 : -1)
  this.addedX = Math.cos(this.rad)
  this.addedY = Math.sin(this.rad)

  if (Math.random() < opts.dieChance) {
    this.reset()
  }
  if (this.startX === 0 && this.x < 0) {
    this.reset()
  }
  if (this.startY === 0 && this.y < 0) {
    this.reset()
  }
  if (this.startX > 0 && this.x > this.startX) {
    this.reset()
  }
  if (this.startY > 0 && this.y > this.startY) {
    this.reset()
  }
}
Line.prototype.step = function () {
  ++this.time
  ++this.cumulativeTime

  if (this.time >= this.targetTime) this.beginPhase()

  var prop = this.time / this.targetTime,
    wave = Math.sin((prop * Math.PI) / 2),
    x = this.addedX * wave,
    y = this.addedY * wave

  ctx.shadowBlur = prop * opts.shadowToTimePropMult
  ctx.fillStyle = ctx.shadowColor = this.color.replace(
    'light',
    opts.baseLight +
      opts.addedLight *
        Math.sin(this.cumulativeTime * this.lightInputMultiplier)
  )
  ctx.fillRect(
    this.startX + (this.x + x) * opts.len,
    this.startY + (this.y + y) * opts.len,
    3,
    3
  )
}
loop()

window.addEventListener('resize', function () {
  w = c.width = window.innerWidth
  h = c.height = window.innerHeight
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, w, h)

  opts.cx = w
  opts.cy = h
})
