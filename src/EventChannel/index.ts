import { EventEmitter } from "eventemitter3";
import { GameCard } from "../domain/cards";

// TODO: adapter between client and server
// it will be proper WS connection, but for now it is just async event bus
export class EventChannel extends EventEmitter {

}
