
var ipedal = require('ipedal')
var pedal = ipedal.client('http://localhost:10001/')

var keypress = require('keypress')
var times = []

keypress(process.stdin)

function nonPrint(c) {
  return c <= 32 || c == 127
}
process.stdin.on('keypress', function(ch, key) {
  var name = ch
  if (!name || nonPrint(name.charCodeAt(0))) name = (key && key.name)
  var ctrl = false
  var shift = false
  if (key && key.ctrl) {
    name = 'Ctrl+' + name
    ctrl = true
  }
  if (key && key.shift) {
    shift = true
  }
  handleKey(name, ctrl, shift)
})

var stack = []

function handleKey(name, ctrl, shift) {
  if (pedal.state != 'down') return

  if (name == 'backspace' && stack.length >= 1 && stack[stack.length - 1].length == 1) {
    var out = stack.pop()
    process.stdout.write('\b\x1B[0;38;5;239m' + out + '\b')
    return
  }
  stack.push(name)
  var color = 81
  if (ctrl) color = 210
  if (shift) color = 227
  if (name.length == 1) {
    if (!shift) color = 255
    process.stdout.write('\x1B[1;38;5;' + color + 'm' + name + '')
  } else {
    process.stdout.write('\x1B[1;38;5;' + color + 'm<' + name + '>')
  }
}

pedal.on('down', function() {
  process.stdout.write('\x1B[H\x1B[J')
  process.stdout.write('\x1b[0;38;5;245mKey sequence: ')
  times.push(new Date().getTime())
  if (times.length >= 3) {
    if (times[times.length - 3] >= new Date().getTime() - 1000) {
      process.exit()
    }
  }
})

pedal.on('up', function() {
  process.stdout.write('\x1B[H\x1B[J')
  process.stdout.write('\x1b[1;38;5;247mhttp://bit.ly/bcbk4vim ')
  stack = []
})

pedal.emit('up')

process.stdin.setRawMode(true)
process.stdin.resume()


