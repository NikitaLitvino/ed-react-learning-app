export interface IUser {
  email: string
  first_name: string
  id: number
  is_admin: boolean
  last_name: string
  completed_tasks: ITask[]
  active_tasks: ITask[]
}

export interface ITask {
  id: string
  title: string
  description: string
  specialization: string
  technologies: string
  attachments: string
}

export interface ITechnology {
  id: number
  title: string
}

export interface ISpecialization {
  id: number
  title: string
}

export interface IAttachment {
  id: number
  url: string
}

export interface IFilter{
  specialization: '',
  technologies:string,
}

export type taskAction={
  type: string
  task:ITask
}

export type filterAction={
  type: string
  filter:IFilter
}
export interface DjangoResponse<T> {
  count: number
  next: number
  previous: number
  results: T
}
