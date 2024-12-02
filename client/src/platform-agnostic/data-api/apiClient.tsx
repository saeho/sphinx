'use client';

import { useState, useEffect } from 'react';

const ENV = {
  API_URL: 'http://localhost:4000/v1/',
};

/**
 * Types
 */

type APIParams = Partial<{
  onCompleted: (data: any, error: any) => void;
}>;

type MutationResults = [
  (params: any) => void,
  {
    error: any;
    mutating: boolean;
  }
];

type QueryResults = [
  {
    data: any;
    error: any;
    loading: boolean;
  },
  () => void
];

/**
 * Fetch data
 */

function fetchData(method: string, apiName: string, params: any, onCompleted: any) {
  const isGETRequest = method === 'GET';

  fetch(ENV.API_URL + apiName, {
    method,
    headers: new Headers({
      'Content-Type': 'application/json; charset=utf-8',
    }),
    body: isGETRequest ? undefined : JSON.stringify(params || null),
  }).then(async(res) => {

    if (res.status === 200) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.startsWith('application/json')) {
        const jsonData = await res.json();
        onCompleted(jsonData, null);
        return;
      }

      const plainText = await res.text();
      onCompleted(plainText, null);

    } else {
      onCompleted(null, {
        status: res.status,
        message: res.statusText,
      });
    }
  }).catch(err => {
    onCompleted(null, err);
    console.warn('API Error: ' + apiName);
    console.warn(err);
  });
}

/**
 * Consistent data fetch() API hook
 */

export function useQuery(apiName: string, params: any, requestType: 'GET' | 'POST' = 'GET'): QueryResults {

  const [refetchCount, setRefetchCount] = useState(0);
  const [qryState, setQryState] = useState({
    data: null as any,
    error: null as any,
    loading: false as boolean,
  });

  useEffect(() => {
    setQryState({...qryState, loading: true});
    fetchData(requestType, apiName, params, (fetchedData: any, error: any) => {
      setQryState({...qryState, data: fetchedData, error, loading: false});
    });
  }, [apiName, refetchCount]);

  const refetch = () => {
    setRefetchCount(refetchCount + 1);
  };

  return [qryState, refetch];
}

/**
 * Consistent data mutation fetch() API hook
 */

export function useMutation(apiName: string, params: APIParams = {}, requestType: 'POST' | 'DELETE' = 'POST'): MutationResults {

  const [mtnState, setMtnState] = useState({
    error: null,
    mutating: false,
  });

  const { onCompleted } = params;
  const mutation = (params: any) => {
    setMtnState({...mtnState, mutating: true});
    fetchData(requestType, apiName, params, (fetchedData: any, error: any) => {
      setMtnState({error, mutating: false});

      if (onCompleted) {
        onCompleted(fetchedData || {}, error);
      }
    });
  };

  return [mutation, mtnState];
}

