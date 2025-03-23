const QuestionPage = async ({ params }) => {
  const { qid } = await params;

  return <main className={"p-2 font-thin"}>{`question number: ${qid}`}</main>;
};
export default QuestionPage;
