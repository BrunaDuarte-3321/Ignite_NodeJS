 import http from 'node:http'


 const users = []
 const server = http.createServer((req, res) => {
  const {method, url} = req

  if(method === 'GET' && url === '/users'){
    return res.end('Listagem de usuários')
  } 

  if(method === 'POST' && url ==='/users'){
   /*  const {} = req
    const {id, name, email} = req */

    const user = {
      id: 1,
      name: "Bruna",
      email: "Teste"
    }
    if(user){
      users.push(user)
      return res
      .send
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
    }
    
    return res.end('Dados pendentes')
  }

  //Early return 

  return res.writeHead(404).end('Not Found')
})

server.listen(3333)

