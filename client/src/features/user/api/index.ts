import ApiConfiguration from "@/api/configuration.api";

import AccountApi from "./account.api";

class Api extends ApiConfiguration {
  readonly account;

  constructor() {
    super();
    this.account = new AccountApi();
  }
}

const API = new Api();

export default API;
