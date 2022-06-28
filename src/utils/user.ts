import { useEffect } from 'react'

import { useHttp } from 'utils/http'
import { cleanObject } from 'utils/index'
import { useAsync } from 'utils/use-async'
import { User } from "screens/project-list/search-panel";

export const useUsers = (param?: Partial<User>) => {

  const client = useHttp()
  const { run, ...result } = useAsync<User[]>()

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [param])
  return result
}