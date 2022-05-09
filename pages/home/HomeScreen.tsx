import { useState, useCallback, useEffect } from "react";
import {
  collection,
  DocumentData,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import db from "../../firebase";
import AnswersList from "../answer/AnswersList";
import Chats from "../chat/Chats";

type UseGetChatbotInfo = {
  chats: string[];
  request: string[];
  selectAnswer: (answer: string, status: string) => void;
};

const useGetChatbotInfo = (): UseGetChatbotInfo => {
  const [request, setRequest] = useState<string[]>([]);
  const [chats, setChats] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("init");
  const [data, setData] = useState<any>({});

  useEffect(() => {
    (async () => {
      const dbData: any = {};
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        collection(db, "questions")
      );
      querySnapshot.forEach((doc) => {
        dbData[doc.id] = doc.data();
      });
      setData(dbData);
      nextQuestion(status, dbData[status]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addChats = useCallback(
    (chat: any): void => {
      setChats((prevChats) => {
        return [...prevChats, chat];
      });
    },
    [setChats]
  );

  const nextQuestion = (
    status: string,
    data: { question: string; answers: string[] }
  ): void => {
    const { question, answers } = data;
    addChats({
      text: question,
      type: "question",
    });
    setStatus(status);
    setRequest(answers);
  };

  const selectAnswer = useCallback(
    (answer: string, status: string): void => {
      switch (true) {
        default:
          addChats({
            text: answer,
            type: "answer",
          });
          setTimeout(() => nextQuestion(status, data[status]), 800);
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [request]
  );
  return { chats, request, selectAnswer };
};

const HomeScreen = (): JSX.Element => {
  const { chats, request, selectAnswer } = useGetChatbotInfo();

  useEffect(() => {
    const scrollArea: HTMLElement | null =
      document.getElementById("scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  });

  return (
    <div className="background">
      <section className="entire-screen">
        <div className="title">Chatbot Demo</div>
        <div className="absolute-style" id={"scroll-area"}>
          <Chats chats={chats} />
          <AnswersList request={request} selectAnswer={selectAnswer} />
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
