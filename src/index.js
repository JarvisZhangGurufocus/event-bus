class EventBus {
  constructor () {
    this.events = {}
  }

  subscribe (event, handler) {
    if (!event || !handler) {
      return
    }
    if (!this.events[event]) {
      this.events[event] = []
    }
    var index = this.events[event].indexOf(handler)
    if (index > -1) {
      this.events[event].splice(index, 1)
    }
    this.events[event].push(handler)
  }

  unSubscribe (event, handler) {
    if (!event || !handler) {
      return
    }
    if (!this.events[event]) {
      return
    }
    var index = this.events[event].indexOf(handler)
    if (index > -1) {
      this.events[event].splice(index, 1)
    }
  }
  
  publish (event, data) {
    if (!event) {
      return
    }
    var events = this.events[event]
    if (!events) {
      return
    }
    for (let i = 0; i < events.length; i++) {
      var stop = events[i](data)
      if (stop === true) {
        return
      }
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = EventBus;
}