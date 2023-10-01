import http from 'node:http'
import { json } from './middlewares/json.js'
import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
 


  const database = new Database()
 const server = http.createServer(async(req, res) => {
  const {method, url} = req

  await json(req, res)
  

  if(method === 'GET' && url === '/users'){

    const users = database.select('users')
    return res
    .end(JSON.stringify(users))
  } 

  if(method === 'POST' && url ==='/users'){
   
    const {name, email} = req.body

    const user = {
      id: randomUUID(),
      name,
      email,
    }
    if(user){

      database.insert('users', user)

      return res
       
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(user))
    }
    
    return res.end('Dados pendentes')
  }

  //Early return 

  return res.writeHead(404).end('Not Found')
})

server.listen(3333)

