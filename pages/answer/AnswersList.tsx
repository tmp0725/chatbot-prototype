import { Key } from "react";
import Button from "@mui/material/Button";

const AnswersList = (props: any): JSX.Element => {
  const { request, selectAnswer } = props;

  const handleClick = (content: string, nextId: string): void => {
    selectAnswer(content, nextId);
  };

  return (
    <>
      {request?.map((answer: { content: string; nextId: string }, id: Key) => {
        const { content, nextId } = answer;
        return (
          <div key={id}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleClick(content, nextId)}
            >
              {content}
            </Button>
          </div>
        );
      })}
    </>
  );
};

export default AnswersList;
