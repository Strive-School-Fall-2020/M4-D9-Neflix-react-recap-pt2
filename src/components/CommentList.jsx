import React from "react";

import { ListGroup, Badge } from "react-bootstrap";

const CommentList = ({ comments }) => {
  return (
    <>
      {comments &&
        comments.length > 0 &&
        comments.map((comment) => {
          let variant = "";

          switch (comment.rate) {
            case 1:
              variant = "danger";
              break;
            case 2:
              variant = "warning";
              break;
            case 3:
              variant = "secondary";
              break;
            default:
              variant = "success";
              break;
          }
          return (
            <ListGroup key={comment._id}>
              <ListGroup.Item>
                <Badge pill variant={variant} className="mr-3">
                  {comment.rate}
                </Badge>
                {comment.comment}
              </ListGroup.Item>
            </ListGroup>
          );
        })}
    </>
  );
};

export default CommentList;
