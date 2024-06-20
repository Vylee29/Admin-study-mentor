import { DefaultOptionType } from 'antd/es/select';

export type OptionItem = {
    label: string | React.ReactNode;
    value: string | number | boolean | null;
    // disabled?: boolean;
} & DefaultOptionType;

export type OptionItems = OptionItem[];
