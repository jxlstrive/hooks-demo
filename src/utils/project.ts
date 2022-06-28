import { useEffect } from 'react'

import { useHttp } from 'utils/http'
import { cleanObject } from 'utils/index'
import { useAsync } from 'utils/use-async'
import { Project } from 'screens/project-list/list'

// Partial 联合类型（之前定义的 name、personId, 都是 Project 类型的一部分）
export const useProjects = (param?: Partial<Project>) => {

  const client = useHttp()
  const { run, ...result } = useAsync<Project[]>()

  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [param])
  return result
}
