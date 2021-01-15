import * as sio from 'socket.io-client';
import { API_SERVER_URL } from '../lib/constants';

const socket = sio.connect(API_SERVER_URL);

export default function getSocket() {
	return socket;
}
