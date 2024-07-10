import { DownloadOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Image } from 'antd';
import {
  detailedQuestionKeys,
  getDetailedQuestionApi,
} from '../../../+core/services/question.service';
import { imageUtility } from '../../../+core/utilities/image.utility';
import CustomSkeletonParagraph from '../../../components/ui/skeleton/CustomSkeletonParagraphProps';

interface IProps {
  questionId: string;
}

export function DetailedQuestion({ questionId }: IProps) {
  const detailedQuestionQuery = useQuery({
    queryKey: detailedQuestionKeys.list({ questionId }),
    queryFn: () => getDetailedQuestionApi(questionId),
    select: (data) => data?.data.data,
  });

  return (
    <div className='w-full rounded-lg bg-white-900'>
      {detailedQuestionQuery?.isFetching ? (
        <CustomSkeletonParagraph height={60} />
      ) : (
        <div className='flex items-center gap-4'>
          <Image
            src={imageUtility(detailedQuestionQuery?.data?.student?.avatar?.fileKey)}
            alt='avatar'
            className='rounded-full !w-10 !h-10 object-cover'
          />
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
        {detailedQuestionQuery?.isFetching ? (
          <CustomSkeletonParagraph height={60} />
        ) : (
          <>
            {detailedQuestionQuery?.data?.title ? (
              <div className='text-lg text-black flex items-center gap-1'>
                <div className='font-bold'>Tiêu đề: </div>
                <span>{detailedQuestionQuery?.data?.title}</span>
              </div>
            ) : (
              <div className='text-gray-500 italic text-sm'>Không có tiêu đề</div>
            )}
            <div className='font-bold text-lg'>Nội dung câu hỏi:</div>
            {detailedQuestionQuery?.data?.content ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: detailedQuestionQuery?.data.content,
                }}
                className='border rounded-lg border-gray-600 border-solid p-2 mt-2'
              />
            ) : (
              <div className='text-gray-300 text-base italic mb-2'>Không có nội dung</div>
            )}

            {detailedQuestionQuery?.data?.fileQuestions &&
              detailedQuestionQuery?.data?.fileQuestions?.length > 0 && (
                <>
                  <div className='w-full font-bold text-lg text-black mb-4 items-center flex'>
                    Tệp đính kèm
                  </div>
                  <ul className='flex gap-2 flex-wrap pl-0 w-full'>
                    {detailedQuestionQuery?.data?.fileQuestions?.map((file) => {
                      return (
                        <div key={file.fileKey} className='flex gap-2 items-center w-full'>
                          <div
                            key={file.fileKey}
                            className='border rounded-lg border-gray-600 flex items-center justify-between p-4 border-solid w-full'
                          >
                            <div className='flex items-center'>{file.fileName}</div>
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
        {detailedQuestionQuery?.isFetching ? (
          <CustomSkeletonParagraph height={60} />
        ) : (
          <>
            {detailedQuestionQuery?.data?.answers?.[0]?.content ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: detailedQuestionQuery?.data.answers?.[0]?.content,
                }}
                className='border rounded-lg border-gray-600 border-solid p-2'
              />
            ) : (
              <div className='text-gray-300 text-base italic mb-2'>Không có nội dung</div>
            )}
            {detailedQuestionQuery?.data?.answers &&
              detailedQuestionQuery?.data?.answers[0]?.fileAttachmentAnswers.length > 0 && (
                <>
                  <div className='w-full font-bold text-lg text-black mb-4 items-center flex mt-2'>
                    Tệp đính kèm
                  </div>
                  <ul className='flex gap-2 flex-wrap pl-0 w-full'>
                    {detailedQuestionQuery?.data?.answers?.[0]?.fileAttachmentAnswers?.map(
                      (file) => {
                        return (
                          <div
                            key={file.fileKey}
                            className='w-full border rounded-lg border-gray-600 flex items-center justify-between p-4 border-solid'
                          >
                            <div className='flex items-center'>
                              <div className='font-bold text-md max-w-4/5 truncate text-black-800'>
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
  );
}
