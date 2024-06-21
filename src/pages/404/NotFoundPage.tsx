import { useNavigate } from 'react-router-dom';
import ButtonBig from '../../components/ui/button/ButtonBig';
import { MY_ROUTE } from '../../routes/route.constant';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className='w-full m-auto h-[100vh] flex justify-center items-center'>
      <div className='flex flex-col items-center'>
        <div className='pack-text-black-800-24 text-[40px] mb-2'>404</div>
        <div className='pack-text-black-800-24 text-[40px]'>Page Not Found</div>
        <span className='mt-12 font-semibold pack-text-primary-900-16'>
          Trang bạn đang tìm kiếm không tồn tại
        </span>
        <span className='mt-6 text-center pack-text-gray-900-14'>
          Địa chỉ của trang bạn đang tìm kiếm đã được nhập sai, hoặc <br /> Nó không thể được sử
          dụng do thay đổi hoặc xóa địa chỉ.
          <br /> Vui lòng kiểm tra lại địa chỉ hoặc quay lại trang chủ.
        </span>
        <ButtonBig
          className='mt-16 w-44 py-2 rounded-[20px] pack-text-gray-800-14-n text-white'
          onClick={() => navigate(MY_ROUTE.HOME)}
        >
          Đi tới màn hình chính
        </ButtonBig>
        <ButtonBig
          className='mt-2 w-44 py-2 rounded-[20px] pack-text-gray-800-14-n bg-white border-solid border-primary-custom-900 text-primary-custom-900'
          onClick={() => navigate(-1)}
        >
          Quay lại trang trước
        </ButtonBig>
      </div>
    </div>
  );
}
