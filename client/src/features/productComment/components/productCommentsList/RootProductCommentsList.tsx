import { List, ListItem } from "@/components/utility/list";

import { RootProductCommentContext } from "../../contexts/RootProductCommentContext";
import { useRootProductComments } from "../../contexts/RootProductCommentsContext";
import { RootProductCommentCard } from "../productCommentCard/RootProductCommentCard";

function RootProductCommentsList() {
  const { rootProductComments } = useRootProductComments();

  return (
    <List>
      {rootProductComments.map((rootProductComment) => (
        <ListItem
          key={rootProductComment.id}
          containerProps={{ className: "bg-dark flex-wrap gap-0" }}
        >
          <RootProductCommentContext.Provider value={rootProductComment}>
            <RootProductCommentCard />
          </RootProductCommentContext.Provider>
        </ListItem>
      ))}
    </List>
  );
}

export default RootProductCommentsList;
