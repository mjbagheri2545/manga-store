import autoBind from "auto-bind";

import PATH from "@/constants/path";
import { HTTP } from "@/lib/axios";

abstract class ApiConfiguration {
  protected readonly path;
  protected readonly http;

  constructor() {
    autoBind(this);
    this.path = PATH;
    this.http = HTTP;
  }
}

export default ApiConfiguration;
