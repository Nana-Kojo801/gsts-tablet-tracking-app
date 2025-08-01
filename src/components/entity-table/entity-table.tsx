import DataTable from './data-table'
import { useMemo, useState } from 'react'
import SearchAndActions from './search-actions'
import Pagination from './pagination'
import type { EntityTableProps } from './types'

const EntityTable = <T, IdType = unknown>({
  entries,
  getRowId,
  pageSize,
  columns,
  dataActions,
  showDataActions = true,
  searchPlaceholder,
  searchTerms,
  renderData = ({ defaultData }) => defaultData,
  filters = {},
}: EntityTableProps<T, IdType>) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState(
    filters
      ? Object.fromEntries(
          Object.entries(filters).map((entry) => [
            entry[1].key,
            entry[1].options[0].value,
          ]),
        )
      : {},
  )
  console.log('Filter state:', filter)
  const filteredEntries = useMemo(
    () =>
      entries
        .filter((entry) => {
          let count = 0
          for (const key in filter) {
            if ((filters[key]?.customValue)) {
              if (filters[key].customValue(entry, filter[key])) count++
            } else {
              const value = filter[key]
              if (!value) count++
              else if ((entry as any)[key] === value) {
                count++
              }
            }
          }
          return count === Object.keys(filter).length
        })
        .filter((entry) => {
          let count = 0
          searchTerms.forEach((term) => {
            const value = term.term
              ? term.term(entry)
              : (entry[term.key!] as string)
            if (value.toLowerCase().includes(searchQuery.toLowerCase()))
              count += 1
          })
          return count > 0
        }),
    [entries, filter, searchQuery],
  )

  const [page, setPage] = useState(1)
  const paginatedEntries = filteredEntries.slice(
    (page - 1) * pageSize,
    page * pageSize,
  )

  // Reset to page 1 if entries change
  // (optional: can add useEffect for this if needed)

  return (
    <div className="space-y-4">
      {/* Search and Actions */}
      <SearchAndActions
        searchPlaceholder={searchPlaceholder}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        dataActions={dataActions}
        filters={filters}
        filter={filter}
        setFilter={setFilter}
      />

      {/* Data Table */}
      <DataTable<T>
        actions={dataActions}
        showDataActions={showDataActions}
        entries={paginatedEntries}
        columns={columns}
        getRowId={getRowId}
        renderData={renderData}
      />

      {/* Pagination */}
      <Pagination
        entries={entries}
        filteredEntries={filteredEntries}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
      />
    </div>
  )
}
export default EntityTable
