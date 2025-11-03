import QuestionFooter from './QuestionFooter';
import QuestionList from './QuestionList';
import QuestionTitle from './QuestionTitle';

const QuestionTemplate = ({ uuid }: { uuid: string }) => {
  console.log('uuid:', uuid);

  return (
    <main className="mx-10 pb-14">
      <QuestionTitle />
      <QuestionList />
      <QuestionFooter />
    </main>
  );
};

export default QuestionTemplate;
