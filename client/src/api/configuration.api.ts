import autoBind from "auto-bind";

import PATH from "@/constants/path";
import { HTTP } from "@/lib/axios";

abstract class ApiConfiguration {
  protected readonly PATH;
  protected readonly HTTP;

  constructor() {
    autoBind(this);
    this.PATH = PATH;
    this.HTTP = HTTP;
  }
}

export default ApiConfiguration;
