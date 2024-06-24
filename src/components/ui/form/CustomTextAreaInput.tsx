import { Form, Input } from 'antd';
import { FormItemProps, Rule } from 'antd/es/form';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
const { TextArea } = Input;

export type CustomTextAreaInputProps<T extends object> = {
  placeholder?: string;
  spanCol?: number;
  disabled?: boolean;
  classNameInput?: string;
  classNameForm?: string;
  type?: string;
  defaultValue?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  label?: React.ReactNode;
  rules?: Rule[];
  rows?: number;
  draggable?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  autoFocus?: boolean;
  fileUpload: React.ReactNode;
  isActive?: boolean;
} & FormItemProps<T>;

export const CustomTextAreaInput = <T extends object>({
  label,
  name,
  rules,
  placeholder = '',
  disabled,
  classNameInput,
  spanCol,
  classNameForm,
  rows = 1,
  draggable,
  defaultValue,
  value,
  onChange,
  autoFocus,
  suffix,
  fileUpload: file,
  isActive = true,
}: CustomTextAreaInputProps<T>) => {
  const [row, setRow] = useState(rows);
  const onChangeEvent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isActive) {
      if (
        (row <= 5 && e.target.value.split('\n').length > row) ||
        e.target.value.split('\n').length < row
      ) {
        setRow(e.target.value.split('\n').length);
      }
    }
    onChange && onChange(e);
  };

  useEffect(() => {
    if (rows) {
      setRow(rows);
    }
  }, [rows]);

  return (
    <div
      className={
        suffix ? 'text-area w-full border-solid rounded-md border-gray-200 bg-white-900' : ''
      }
    >
      {file && <div className='p-2'>{file}</div>}
      <div className='flex items-end'>
        <Form.Item<T>
          name={name}
          rules={rules}
          label={label && <label className='w-full whitespace-normal'>{label}</label>}
          wrapperCol={{ span: spanCol }}
          className={clsx('!m-0', classNameForm)}
        >
          <TextArea
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={value}
            onChange={onChangeEvent}
            className={`h-full ${classNameInput}`}
            disabled={disabled}
            rows={row}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && isActive) {
                setRow(1);
                e.preventDefault();
              }
            }}
            draggable={draggable}
            autoFocus={autoFocus}
          />
        </Form.Item>
        {suffix && <div className='p-2'>{suffix}</div>}
      </div>
    </div>
  );
};
