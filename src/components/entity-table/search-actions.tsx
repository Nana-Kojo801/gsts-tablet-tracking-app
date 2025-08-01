import { Download, Plus, Search, Upload } from 'lucide-react'
import { Input } from '../ui/input'
import type { EntityTableFiltersType, EntityTableProps } from './types'
import { Button } from '../ui/button'
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from '@/components/ui/select'

type SearchAndActionsProps<T, IdType> = {
  searchPlaceholder: EntityTableProps<T, IdType>['searchPlaceholder']
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  dataActions: EntityTableProps<T, IdType>['dataActions']
  filters: EntityTableFiltersType<T>
  filter: { [key: string]: any }
  setFilter: React.Dispatch<React.SetStateAction<SearchAndActionsProps<T, IdType>["filter"]>>
}

const SearchAndActions = <T, IdType>({
  searchPlaceholder,
  searchQuery,
  setSearchQuery,
  dataActions,
  filters,
  filter,
  setFilter
}: SearchAndActionsProps<T, IdType>) => {
  return (
    <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-5 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-1 gap-3 items-center">
          {/* Search */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2 items-center justify-end">
          {dataActions.onImport && (
            <Button
              onClick={dataActions.onImport}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Import</span>
            </Button>
          )}
          {dataActions.onExport && (
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
          )}
          {dataActions.onAdd && (
            <Button
              className="flex items-center space-x-2"
              onClick={() => dataActions.onAdd!()}
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </Button>
          )}
        </div>
      </div>

      {/* Filters - Now in its own row below search and actions */}
      {Object.keys(filters).length > 0 && (
        <div className="flex gap-4 mt-4 pt-4 border-t border-border/50">
          {Object.entries(filters).map(([key, filterConfig]) => {
            return (
              <div key={key} className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">
                  {filterConfig.label}
                </label>
                <Select
                  value={filter[filterConfig.key as string]}
                  onValueChange={(value) => {
                    setFilter((prev) => ({
                      ...prev,
                      [filterConfig.key]: value,
                    }))
                  }}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {filterConfig.options.map((opt, index) => (
                      <SelectItem key={index} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SearchAndActions
