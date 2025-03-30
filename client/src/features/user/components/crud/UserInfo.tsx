import { EntityInfo } from "@/components/ui/crud";

import userCrudApi from "../../api/crud.api";
import USER_INFO_ITEMS from "./UserInfoItems";

function UserInfo() {
  return (
    <EntityInfo
      entityKey="user"
      getByIdMethod={userCrudApi.getById}
      getEntityFromData={(data) => data.user}
      info={USER_INFO_ITEMS}
    />
  );
}

export default UserInfo;
