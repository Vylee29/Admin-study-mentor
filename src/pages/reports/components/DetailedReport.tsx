'use client';
import { DownloadOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Image } from 'antd';
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
import { imageUtility } from '../../../+core/utilities/image.utility';
import CustomSkeletonParagraph from '../../../components/ui/skeleton/CustomSkeletonParagraphProps';

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
        <div className='rounded-lg bg-white-900 p-8'>
          {detailedQuestionQuery?.isFetching ? (
            <CustomSkeletonParagraph height={60} />
          ) : (
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10'>
                <Image
                  src={imageUtility(detailedQuestionQuery?.data?.student?.avatar?.fileKey)}
                  alt='avatar'
                  className='rounded-full h-full w-full'
                />
              </div>
              <div>
                <div className='text-xl'>Câu hỏi của</div>
                <div className='font-bold text-2xl'>
                  {detailedQuestionQuery?.data?.student.fullName}
                </div>
              </div>
            </div>
          )}
          <div className='h-[1px] w-full my-8 bg-gray-600' />
          <div>
            <div className='w-full font-bold text-lg text-black mb-4 items-center flex'>
              <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
              Thông tin câu hỏi
            </div>
            <div className='h-[1px] w-full mb-4 bg-gray-600' />
            {detailedQuestionQuery?.isFetching ? (
              <CustomSkeletonParagraph height={60} />
            ) : (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailedQuestionQuery?.data?.content || '',
                  }}
                  className='text-lg text-black'
                />
                {detailedQuestionQuery?.data?.fileQuestions &&
                  detailedQuestionQuery?.data?.fileQuestions?.length > 0 && (
                    <>
                      <div className='w-full font-bold text-lg text-black mb-4 items-center flex'>
                        Tệp đính kèm
                      </div>
                      <ul className='flex gap-2 flex-wrap pl-0 w-full'>
                        {detailedQuestionQuery?.data?.fileQuestions?.map((file) => {
                          return (
                            <div key={file.fileKey} className='flex gap-2 items-center'>
                              <div
                                key={file.fileKey}
                                className='border rounded-lg border-gray-600 flex items-center justify-between p-4 border-solid'
                              >
                                <div className='flex items-center'></div>
                                <DownloadOutlined className='text-[#4EA8B4] text-2xl cursor-pointer' />
                              </div>
                            </div>
                          );
                        })}
                      </ul>
                    </>
                  )}
              </>
            )}
          </div>
          <div className='mt-8'>
            <div className='w-full font-bold text-lg text-black mb-4 items-center flex'>
              <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
              Thông tin câu trả lời
            </div>
            <div className='h-[1px] w-full mb-4 bg-gray-600' />
            {detailedQuestionQuery?.isFetching ? (
              <CustomSkeletonParagraph height={60} />
            ) : (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailedQuestionQuery?.data?.answers?.[0]?.content || '',
                  }}
                  className='text-lg text-black'
                />
                {detailedQuestionQuery?.data?.answers &&
                  detailedQuestionQuery?.data?.answers[0].fileAttachmentAnswers.length > 0 && (
                    <>
                      <div className='w-full font-bold text-lg text-black mb-4 items-center flex'>
                        Tệp đính kèm
                      </div>
                      <ul className='flex gap-2 flex-wrap pl-0 w-full'>
                        {detailedQuestionQuery?.data?.answers?.[0].fileAttachmentAnswers?.map(
                          (file) => {
                            return (
                              <div
                                key={file.fileKey}
                                className='w-full border rounded-lg border-gray-600 flex items-center justify-between p-4 border-solid'
                              >
                                <div className='flex items-center'>
                                  <div className='font-bold text-md mx-4 max-w-4/5 truncate text-black-800'>
                                    {file.fileName}
                                  </div>
                                </div>
                                <a
                                  href={imageUtility(file.fileKey)}
                                  type='download'
                                  className='hover:opacity-90'
                                >
                                  <DownloadOutlined className='text-[#4EA8B4] text-2xl cursor-pointer' />
                                </a>
                              </div>
                            );
                          },
                        )}
                      </ul>
                    </>
                  )}
              </>
            )}
          </div>
        </div>
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
