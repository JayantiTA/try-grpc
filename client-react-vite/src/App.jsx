import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import helloworld from './proto/helloworld_grpc_web_pb';

function App() {
  const client = new helloworld.GreeterClient('http://localhost:8080',
    null, null)
  const request = new helloworld.HelloRequest()
  request.setName('a')

  const streamRequest = new helloworld.RepeatHelloRequest();
  streamRequest.setName('World');
  streamRequest.setCount(5);

  const [count, setCount] = useState(0)

  useEffect(() => {
    client.sayHello(request, {}, (err, response) => {
      if (err) {
        console.log(`Unexpected error for sayHello: code = ${err.code}` +
                    `, message = "${err.message}"`);
      } else {
        console.log(response.getMessage());
      }
    });

    const stream = client.sayRepeatHello(streamRequest, {});
    stream.on('data', (response) => {
      console.log(response.getMessage());
    });
    stream.on('error', (err) => {
      console.log(`Unexpected stream error: code = ${err.code}` +
                  `, message = "${err.message}"`);
    });
  }, [count])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
