import { FC } from 'react'
import { Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useQueryClient } from 'react-query'
import { useApi } from '../../hooks/useApi'
import { generateUrl } from '../../services/generateUrl'

const { Search } = Input

export const TaskSearchForm: FC = () => {
  const api = useApi()
  const queryClient = useQueryClient()

  const onSearch = (value: string) => {
    api.get(`v1/tasks/?${generateUrl({ search: value })}`).then((response) => {
      queryClient.setQueryData(`v1/tasks/`, response.data)
    })
  }

  return (
    <Search
      placeholder="Поиск по названию"
      allowClear
      enterButton={
        <Button type="primary" icon={<SearchOutlined />}>
          Найти
        </Button>
      }
      size="large"
      onSearch={onSearch}
    />
  )
}
