
import * as io from 'socket.io-client';


export class SocketioHelper {
	static init(uri: string, options?: SocketIOClient.ConnectOpts): SocketIOClient.Socket{
		return io(uri, options);
	}
}