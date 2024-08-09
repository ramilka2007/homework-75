export interface MessageInfo {
  decode: string;
  encode: string;
  password: string;
}

export interface Message {
  message: string;
  password: string;
}

export interface EncodedMsg {
  encoded: string;
}

export interface DecodedMsg {
  decoded: string;
}