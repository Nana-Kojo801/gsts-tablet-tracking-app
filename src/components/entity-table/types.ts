export type RenderDataType<T, IdType> = (props: {
  column: EntityTableProps<T, IdType>['columns'][0]
  entry: T
  defaultData: string
}) => string | React.ReactNode

export type EntityTableFiltersType<T> = {
  [key: string]: {
    key: keyof T | string
    label: string
    customValue?: (entry: T, value: any) => boolean
    options: { label: string; value: any }[]
  }
}

export type EntityTableProps<T, IdType = unknown> = {
  searchPlaceholder: string
  entries: T[]
  getRowId: (entry: T) => IdType
  pageSize: number
  columns: { key: keyof T | string; label: string }[]
  searchTerms: { term?: (entry: T) => string; key?: keyof T }[]
  showDataActions?: boolean
  dataActions: {
    onAdd?: () => void
    onEdit?: (item: T) => void
    onDelete?: (item: T) => void
    onImport?: () => void
    onExport?: (entries: T[]) => void
  }
  renderData?: RenderDataType<T, IdType>
  filters?: EntityTableFiltersType<T>
}