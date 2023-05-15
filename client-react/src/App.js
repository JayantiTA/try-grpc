import { useEffect, useState } from 'react'
import './App.css'
import { HelloRequest, RepeatHelloRequest } from './proto/helloworld_pb'
import { GreeterClient } from './proto/helloworld_grpc_web_pb'

function App() {
  const client = new GreeterClient('http://localhost:8080',
    null, null)
  const request = new HelloRequest()
  request.setName('a'.repeat(80))
  // request.setName('World')

  const streamRequest = new RepeatHelloRequest();
  streamRequest.setName('World');
  streamRequest.setCount(5);

  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log("before send: " + Date.now());
    client.sayHello(request, {}, (err, response) => {
      if (err) {
        console.log(`Unexpected error for sayHello: code = ${err.code}` +
                    `, message = "${err.message}"`);
      } else {
        console.log("after receive: " + Date.now());
      }
    });

    // const stream = client.sayRepeatHello(streamRequest, {});
    // stream.on('data', (response) => {
    //   console.log(response.getMessage());
    // });
    // stream.on('error', (err) => {
    //   console.log(`Unexpected stream error: code = ${err.code}` +
    //               `, message = "${err.message}"`);
    // });
  }, [count])

  return (
    <>
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
