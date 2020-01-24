import { SubscribeMessage, WebSocketGateway, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'http';

@WebSocketGateway()
export class WebsocketGateway {

  @WebSocketServer() server;

  afterInit() {
    // tslint:disable-next-line:no-console
    console.log('Websocket Started');
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    // tslint:disable-next-line:no-console
    console.log('User Connected');
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    // tslint:disable-next-line:no-console
    console.log('User Disconnected');
  }

  notifyConnectedClients(mediaId: string, userId: string) {
    this.server.emit('events', { mediaId, userId });
  }

}
