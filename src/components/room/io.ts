import {io as connect} from 'socket.io-client';
import getSessionId from 'src/lib/getSessionId';

const io = connect('http://localhost:5000', {
	query: {sessionID: getSessionId()},
});

export default io;
