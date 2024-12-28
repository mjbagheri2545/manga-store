import { Tag } from "@prisma/client";

import { Permissions, PermissionsAction } from "@/types";

export type TagPermissionsAction = PermissionsAction;

export type TagPermissions = Permissions<Tag, TagPermissionsAction>;
