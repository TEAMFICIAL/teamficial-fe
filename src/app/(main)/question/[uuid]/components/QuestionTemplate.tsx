import QuestionList from './QuestionList';
import QuestionTitle from './QuestionTitle';

const QuestionTemplate = ({ uuid }: { uuid: string }) => {
  console.log('uuid:', uuid);

  return (
    <main className="mx-10">
      <QuestionTitle />
      <QuestionList />
    </main>
  );
};

export default QuestionTemplate;
