export interface DataResponse {
  name: string;
  online: boolean;
  token: string;
  _id: string;
}

export interface LoginResponse {
  ok: boolean;
  data?: DataResponse;
  error?: string;
}

export interface SystemMessage {
  chat: string;
  user: {
    id: null;
    name: string;
  };
}

export interface ioResponse {
  on: (arg0: string, arg1: (socket: any) => Promise<void>) => void;
  emit: (arg0: string, arg1: SystemMessage) => void;
}
