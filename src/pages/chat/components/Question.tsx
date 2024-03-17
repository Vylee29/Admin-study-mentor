import { format } from 'date-fns';
import { DATE_FORMAT } from '../../../+core/constants/commons.constant';

function Question({
  name,
  title,
  content,
  createAt,
}: {
  name: string;
  title: string;
  content: string;
  createAt: string;
}) {
  return (
    <div className='w-full text-center border border-solid rounded-xl mt-6 py-4 bg-gray-350'>
      <div className='text-xl font-semibold'>
        {name} - {title}
      </div>
      <div className='text-base text-black-800'>
        {content} - {format(createAt, DATE_FORMAT)}
      </div>
    </div>
  );
}

export default Question;
