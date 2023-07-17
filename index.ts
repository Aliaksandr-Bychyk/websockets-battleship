import { httpServer } from './src/http_server/index';
import initWebSocet from './src/ws_server/index';

const HTTP_PORT = 8181;

console.log(`Start static http server on the http://localhost:${HTTP_PORT}`);

initWebSocet();
httpServer.listen(HTTP_PORT);
