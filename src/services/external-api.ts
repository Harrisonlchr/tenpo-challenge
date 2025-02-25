import { AxiosSingleton } from "./instances";

export interface IData {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

class ExternalApi {
  private static instance: ExternalApi;
  private instanceAxios;

  private constructor(baseURL: string) {
    this.instanceAxios = AxiosSingleton.getInstance(baseURL);
  }

  static getInstance(baseURL: string): ExternalApi {
    if (!ExternalApi.instance) {
      ExternalApi.instance = new ExternalApi(baseURL);
    }
    return ExternalApi.instance;
  }

  async login(email: string, password: string): Promise<string> {
    if (!email || !password) {
      throw new Error("Email y Contraseña son requeridos");
    }
    return "fake-token";
  }

  async getData() {
    const response = await this.instanceAxios.get<Array<IData>, Array<IData>>(
      "/photos"
    );
    return response;
  }
}

export const externalApi = ExternalApi.getInstance(
  "https://jsonplaceholder.typicode.com"
);
