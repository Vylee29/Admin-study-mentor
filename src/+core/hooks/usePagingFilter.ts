'use client';
import { debounce } from 'lodash';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { removeEmptyParams } from '../helpers/remove-params.helper';
import { IPaginationInfo, initialPagingState } from '../types/paging.type';

export type PagingFilterType<T> = {
  initialPaging?: IPaginationInfo;
  initialFilter?: T;
  debounceTime?: number;
  searchParamDefault?: string[];
};

export function usePagingFilter<T extends object>({
  initialPaging = initialPagingState,
  initialFilter,
  debounceTime = 0,
  searchParamDefault,
}: PagingFilterType<T>) {
  const [filter, setFilter] = useState<T & IPaginationInfo>({
    ...initialPaging,
    ...initialFilter,
  } as T & IPaginationInfo);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  // when filter change, update url by new filter
  const handleFilterChange = debounce((filter: T) => {
    // const k= removeEmptyParams(filter);
    setFilter((prev) => {
      const newFilter = { ...prev, ...filter, page: 1 };
      return newFilter;
    });
  }, debounceTime);

  // when paging change, update url by new paging
  const handlePageChange = (paging: { page: number; pageSize: number }) => {
    const newParams = { ...filter, ...paging };
    setFilter(newParams);
  };

  const resetFilterPaging = (obj?: any) => {
    setFilter({
      page: initialPaging.page,
      pageSize: initialPaging.pageSize,
      ...obj,
    } as any);
  };

  useEffect(() => {
    const newParams = new URLSearchParams();
    if (searchParams) {
      for (const key of searchParamDefault || []) {
        const keep = searchParams.get(key);
        if (keep) {
          newParams.set(key, keep);
        }
      }
    }
    navigate(
      `${pathname}?${queryString.stringify({
        ...removeEmptyParams<T & IPaginationInfo>(filter),
      })}&${newParams.toString()}`,
    );
  }, [filter]);

  return {
    filter,
    handleFilterChange,
    handlePageChange,
    resetFilterPaging,
  };
}
