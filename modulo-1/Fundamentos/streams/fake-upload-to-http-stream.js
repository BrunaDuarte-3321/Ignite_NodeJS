import {Readable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1
  _read(){
    const i = this.index++

    setTimeout(() => {
      if(i > 5){
        this.push(null)
      } else {
        const buff = Buffer.from(String(i))

        this.push(buff)
      }
    }, 1000)
   
  }
}
const stream = new OneToHundredStream()
const url = 'http://localhost:3334'

fetch(url, {
  method: 'POST',
  body: stream,
  duplex: 'half'
  
}).then(response => {
  return response.text()
}).then(data => {
  console.log(data)
})