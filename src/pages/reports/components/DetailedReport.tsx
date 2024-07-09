'use client';

import { DetailedQuestion } from '../../questions/components/DetailedQuestion';
import ReportForm from './ReportForm';

type Iprops = { questionId: string; reportId: string; setVisible: (value: boolean) => void };
function ReportQuestionPage({ questionId, reportId, setVisible }: Iprops) {
  return (
    <div className='w-full'>
      <div className='w-full flex flex-col gap-8'>
        <DetailedQuestion questionId={questionId} />
        <ReportForm reportId={reportId} setVisible={setVisible} />
      </div>
    </div>
  );
}

export default ReportQuestionPage;
