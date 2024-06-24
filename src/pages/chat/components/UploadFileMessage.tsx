'use client';
import type { UploadFile, UploadProps } from 'antd';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { beforeUpload } from '../../../+core/utilities/file.utility';

// type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type Props = {
  fileList: UploadFile[];
  onChange: UploadProps['onChange'];
};

const UploadFileMessage = ({ fileList, onChange }: Props) => {
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as any);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return fileList ? (
    <div className='file-message'>
      <ImgCrop rotationSlider>
        <Upload
          listType='picture-card'
          fileList={fileList}
          multiple
          onChange={onChange}
          onPreview={onPreview}
          beforeUpload={beforeUpload}
          className='text-xs'
        >
          {fileList.length < 5 && '+ Upload'}
        </Upload>
      </ImgCrop>
    </div>
  ) : (
    <></>
  );
};

export default UploadFileMessage;
