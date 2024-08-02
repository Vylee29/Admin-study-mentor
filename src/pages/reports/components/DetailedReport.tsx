'use client';

import { OptionReport } from '../../../+core/models/report.model';
import { DetailedQuestion } from '../../questions/components/DetailedQuestion';
import ReportForm from './ReportForm';

type Iprops = {
  questionId: string;
  reportId: string;
  setVisible: (value: boolean) => void;

  option?: OptionReport;
};
function ReportQuestionPage({ questionId, reportId, setVisible, option }: Iprops) {
  return (
    <div className='w-full'>
      <div className='flex flex-col w-full gap-8'>
        <DetailedQuestion questionId={questionId} />
        <ReportForm reportId={reportId} setVisible={setVisible} option={option} />
      </div>
    </div>
  );
}

export default ReportQuestionPage;
