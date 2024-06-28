'use client';
import { useQuery } from '@tanstack/react-query';
import { UserType } from '../../../+core/enums/user.enum';
import {
  detailedQuestionKeys,
  getDetailedQuestionApi,
} from '../../../+core/services/question.service';
import {
  getStudentReportApi,
  getStudentReportKeys,
  getTutorReportApi,
  getTutorReportKeys,
} from '../../../+core/services/user.service';
import { DetailedQuestion } from '../../questions/components/DetailedQuestion';

function ReportQuestionPage({
  questionId,
  reportId,
  userType,
}: {
  questionId: string;
  reportId: string;
  userType: UserType;
}) {
  const detailedQuestionQuery = useQuery({
    queryKey: detailedQuestionKeys.all,
    queryFn: () => getDetailedQuestionApi(questionId),
    select: (data) => data?.data.data,
  });

  const detailedStudentReportQuery = useQuery({
    queryKey: getStudentReportKeys.all,
    queryFn: () => getStudentReportApi(reportId),
    select: (data) => data?.data.data,
    enabled: userType === UserType.STUDENT,
  });

  const detailedTutorReportQuery = useQuery({
    queryKey: getTutorReportKeys.all,
    queryFn: () => getTutorReportApi(reportId),
    select: (data) => data?.data.data,
    enabled: userType === UserType.TUTOR,
  });

  return (
    <div className='w-full bg-[#F3F9FA]'>
      <div className='w-full flex flex-col gap-8'>
        <DetailedQuestion questionId={questionId} />
        {/* {detailedQuestionQuery?.data?.questionId && detailedQuestionQuery?.data?.student?.id && (
          <div className='w-3/5 rounded-lg bg-white-900'>
            <ReportQuestionForm
              questionId={detailedQuestionQuery?.data?.questionId}
              studentId={detailedQuestionQuery?.data?.student?.id}
            />
          </div>
        )} */}
      </div>
    </div>
  );
}

export default ReportQuestionPage;
