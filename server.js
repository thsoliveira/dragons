const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const mockedUser = 'callum';
const mockedPassword = 'arcanum';

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === mockedUser && password === mockedPassword) {
    return res.send({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY2FsbHVtIiwicGFzc3dvcmQiOiJhcmNhbnVtIn0.qvieV7pKTjfeBv9U8UgrYXvoOX0wAUI1ytNoe7makTY',
    })
  }

  return res.status(401).send({
    error: 'Usuário e senha não conferem',
  })
})

server.listen(3000, () => {
  console.log('JSON Server is running')
})