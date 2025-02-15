// TODO: adapter between client and server
// it will be proper HTTP/WS connection, but for now it is just async event bus

export class GameAdapter {
    emit(event: string, data: any) {
        // TODO: emit event to the server
    }

    on(event: string, callback: (data: any) => void) {
        // TODO: listen to event from the server
    }
}
