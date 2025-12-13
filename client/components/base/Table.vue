<template>
  <div class="base-table">
    <div v-if="showHeader" class="table-header">
      <div class="header-left">
        <slot name="header-left">
          <h3 v-if="title">{{ title }}</h3>
        </slot>
      </div>
      <slot name="header-right">
        <div class="header-actions">
          <BaseInput
            height="35px"
            v-if="searchable"
            v-model="localSearch"
            type="text"
            :placeholder="searchPlaceholder"
            @input="onSearch"
          />

          <div v-if="showColumnToggle" class="column-toggle mt-5 mx-5">
            <BaseButton
              icon="mingcute:column-fill"
              @click="showColumnsDropdown = !showColumnsDropdown"
              bg="bg-primary-1"
            />
            <div
              v-if="showColumnsDropdown"
              class="columns-dropdown px-20 py-10 mt-5"
            >
              <div
                v-for="column in columns"
                :key="column.key"
                class="f-s-14 f-w-500 py-5 cursor-pointer"
              >
                <label>
                  <input
                    v-model="column.visible"
                    type="checkbox"
                    @change="onColumnVisibilityChange"
                  />
                  {{ column.label }}
                </label>
              </div>
            </div>
          </div>

          <div v-if="exportable" class="mt-5">
            <BaseButton
              icon="line-md:file-export"
              bg="bg-secondary-1"
              @click="onExport"
            />
          </div>
        </div>
      </slot>
    </div>

    <div class="table-container" :class="{ 'with-border': bordered }">
      <table class="base-table__table" :class="tableClass">
        <thead>
          <tr>
            <th v-if="selectable" class="select-column">
              <input
                v-model="allSelected"
                type="checkbox"
                @change="toggleSelectAll"
              />
            </th>

            <th
              v-for="column in visibleColumns"
              :key="column.key"
              :class="[
                `text-${column.align || 'left'}`,
                {
                  sortable: column.sortable,
                  'sort-asc':
                    currentSort.key === column.key &&
                    currentSort.direction === 'asc',
                  'sort-desc':
                    currentSort.key === column.key &&
                    currentSort.direction === 'desc',
                },
              ]"
              @click="column.sortable ? sortTable(column.key) : null"
            >
              <div class="column-header">
                <span class="f-s-14 f-w-500">{{ column.label }}</span>
                <span v-if="column.sortable" class="sort-indicator">
                  <ChevronUpIcon
                    v-if="
                      currentSort.key === column.key &&
                      currentSort.direction === 'asc'
                    "
                    class="icon"
                  />
                  <ChevronDownIcon
                    v-if="
                      currentSort.key === column.key &&
                      currentSort.direction === 'desc'
                    "
                    class="icon"
                  />
                  <ChevronUpDownIcon v-else class="icon" />
                </span>
              </div>
            </th>

            <th v-if="hasActions" class="flex justify-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, index) in paginatedData"
            :key="row.id || index"
            :class="[getRowClass(row, index), { selected: isSelected(row) }]"
            @click="onRowClick(row)"
            @dblclick="onRowDblClick(row)"
            class="f-s-12"
          >
            <td v-if="selectable" class="select-column">
              <input
                v-model="selectedRows"
                :value="row"
                type="checkbox"
                @click.stop
              />
            </td>

            <td
              v-for="column in visibleColumns"
              :key="column.key"
              :class="`text-${column.align || 'left'}`"
            >
              <slot
                :name="`cell-${column.key}`"
                :value="getValue(row, column.key)"
                :row="row"
                :column="column"
              >
                {{ formatValue(getValue(row, column.key), column) }}
              </slot>
            </td>

            <td v-if="hasActions" class="actions-column">
              <slot name="actions" :row="row" :index="index">
                <div class="action-buttons"></div>
              </slot>
            </td>
          </tr>

          <tr v-if="paginatedData.length === 0">
            <td :colspan="totalColumns" class="empty-state">
              <slot name="empty">
                <div class="flex w-100 align-center justify-center">
                  <span class="f-s-14 f-w-500">No data available</span>
                </div>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showFooter" class="table-footer">
      <div class="footer-left">
        <slot name="footer-left">
          <div
            v-if="selectable && selectedRows.length > 0"
            class="selected-info"
          >
            {{ selectedRows.length }} item(s) selected
          </div>
        </slot>
      </div>

      <div class="footer-right" v-if="paginated">
        <slot name="footer-right">
          <div class="pagination">
            <div class="pagination-info">
              Showing {{ startIndex }} to {{ endIndex }} of
              {{ filteredData.length }} entries
            </div>

            <div class="pagination-controls">
              <button
                :disabled="currentPage === 1"
                @click="changePage(currentPage - 1)"
                class="pagination-btn"
              >
                Previous
              </button>

              <span class="pagination-page">
                Page {{ currentPage }} of {{ totalPages }}
              </span>

              <button
                :disabled="currentPage === totalPages"
                @click="changePage(currentPage + 1)"
                class="pagination-btn"
              >
                Next
              </button>
            </div>

            <div v-if="pageSizeOptions" class="page-size-selector">
              <select v-model="localPageSize" @change="onPageSizeChange">
                <option
                  v-for="size in pageSizeOptions"
                  :key="size"
                  :value="size"
                >
                  {{ size }} / page
                </option>
              </select>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

// Icons (you can replace with your own icon components)
const ChevronUpIcon = { template: '<span>↑</span>' };
const ChevronDownIcon = { template: '<span>↓</span>' };
const ChevronUpDownIcon = { template: '<span>↕</span>' };

interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  visible?: boolean;
  align?: 'left' | 'center' | 'right';
  format?: (value: any) => string;
  width?: string;
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

interface Props {
  // Data
  data: any[];
  columns: TableColumn[];

  // Basic options
  title?: string;
  bordered?: boolean;
  striped?: boolean;
  hover?: boolean;
  condensed?: boolean;

  // Functionality
  selectable?: boolean;
  searchable?: boolean;
  paginated?: boolean;
  exportable?: boolean;
  editable?: boolean;
  deletable?: boolean;
  showColumnToggle?: boolean;

  // Search
  searchPlaceholder?: string;
  searchFields?: string[];

  // Pagination
  pageSize?: number;
  pageSizeOptions?: number[];

  // Events
  onRowClick?: (row: any) => void;
  onRowDblClick?: (row: any) => void;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onExport?: () => void;

  // Slots
  showHeader?: boolean;
  showFooter?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  columns: () => [],
  bordered: true,
  striped: true,
  hover: true,
  condensed: false,
  selectable: false,
  searchable: false,
  paginated: false,
  exportable: false,
  editable: false,
  deletable: false,
  showColumnToggle: false,
  showHeader: true,
  showFooter: true,
  searchPlaceholder: 'Search...',
  pageSize: 10,
  pageSizeOptions: () => [10, 25, 50, 100],
});

const emit = defineEmits<{
  'update:selected': [rows: any[]];
  'row-click': [row: any];
  'row-dblclick': [row: any];
  edit: [row: any];
  delete: [row: any];
  export: [];
  sort: [sort: SortConfig];
  'page-change': [page: number];
}>();

// Reactive state
const selectedRows = ref<any[]>([]);
const localSearch = ref('');
const currentSort = ref<SortConfig>({ key: '', direction: 'asc' });
const currentPage = ref(1);
const localPageSize = ref(props.pageSize);
const showColumnsDropdown = ref(false);

// Computed properties
const visibleColumns = computed(() =>
  props.columns.filter((col) => col.visible !== false)
);

const hasActions = computed(
  () => props.editable || props.deletable || !!useSlots().actions
);

const totalColumns = computed(
  () =>
    visibleColumns.value.length +
    (props.selectable ? 1 : 0) +
    (hasActions.value ? 1 : 0)
);

const filteredData = computed(() => {
  let result = [...props.data];

  // Apply search
  if (localSearch.value && props.searchable) {
    const searchTerm = localSearch.value.toLowerCase();
    result = result.filter((row) => {
      const searchFields =
        props.searchFields || props.columns.map((col) => col.key);
      return searchFields.some((field) =>
        String(getValue(row, field)).toLowerCase().includes(searchTerm)
      );
    });
  }

  // Apply sorting
  if (currentSort.value.key) {
    result.sort((a, b) => {
      const aVal = getValue(a, currentSort.value.key);
      const bVal = getValue(b, currentSort.value.key);

      if (aVal < bVal) return currentSort.value.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return currentSort.value.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return result;
});

const totalPages = computed(() =>
  Math.ceil(filteredData.value.length / localPageSize.value)
);

const paginatedData = computed(() => {
  if (!props.paginated) return filteredData.value;

  const start = (currentPage.value - 1) * localPageSize.value;
  const end = start + localPageSize.value;
  return filteredData.value.slice(start, end);
});

const startIndex = computed(() =>
  props.paginated ? (currentPage.value - 1) * localPageSize.value + 1 : 1
);

const endIndex = computed(() => {
  if (!props.paginated) return filteredData.value.length;
  const end = currentPage.value * localPageSize.value;
  return Math.min(end, filteredData.value.length);
});

const allSelected = computed({
  get: () =>
    selectedRows.value.length === paginatedData.value.length &&
    paginatedData.value.length > 0,
  set: (value: boolean) => {
    if (value) {
      selectedRows.value = [...paginatedData.value];
    } else {
      selectedRows.value = [];
    }
    emit('update:selected', selectedRows.value);
  },
});

const tableClass = computed(() => ({
  'table-striped': props.striped,
  'table-hover': props.hover,
  'table-condensed': props.condensed,
}));

// Methods
const getValue = (row: any, key: string) => {
  return key.split('.').reduce((obj, prop) => obj?.[prop], row);
};

const formatValue = (value: any, column: TableColumn) => {
  if (column.format) {
    return column.format(value);
  }
  return value ?? '-';
};

const sortTable = (key: string) => {
  if (currentSort.value.key === key) {
    currentSort.value.direction =
      currentSort.value.direction === 'asc' ? 'desc' : 'asc';
  } else {
    currentSort.value = { key, direction: 'asc' };
  }
  emit('sort', currentSort.value);
};

const toggleSelectAll = () => {
  allSelected.value = !allSelected.value;
};

const isSelected = (row: any) => {
  return selectedRows.value.includes(row);
};

const onRowClick = (row: any) => {
  emit('row-click', row);
  if (props.onRowClick) {
    props.onRowClick(row);
  }
};

const onRowDblClick = (row: any) => {
  emit('row-dblclick', row);
  if (props.onRowDblClick) {
    props.onRowDblClick(row);
  }
};

const onEdit = (row: any) => {
  emit('edit', row);
  if (props.onEdit) {
    props.onEdit(row);
  }
};

const onDelete = (row: any) => {
  emit('delete', row);
  if (props.onDelete) {
    props.onDelete(row);
  }
};

const onExport = () => {
  emit('export');
  if (props.onExport) {
    props.onExport();
  }
};

const onSearch = () => {
  currentPage.value = 1;
};

const onPageSizeChange = () => {
  currentPage.value = 1;
};

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    emit('page-change', page);
  }
};

const getRowClass = (row: any, index: number) => {
  const classes = [];
  if (index % 2 === 0 && props.striped) {
    classes.push('row-striped');
  }
  return classes.join(' ');
};

const onColumnVisibilityChange = () => {
  // Column visibility changed
};

// Watchers
watch(selectedRows, (newVal) => {
  emit('update:selected', newVal);
});

watch(
  () => props.data,
  () => {
    currentPage.value = 1;
    selectedRows.value = [];
  }
);

watch(
  () => props.pageSize,
  (newVal) => {
    localPageSize.value = newVal;
  }
);
</script>

<style scoped>
.base-table {
  width: 100%;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
}

.header-actions {
  display: flex;
  align-items: center;
}

.search-input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 200px;
}

.column-toggle {
  position: relative;
}

.toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.columns-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 150px;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
  color: #000;
}

.column-item {
  padding: 0.25rem 0;
}

.table-container {
  overflow-x: auto;
}

.table-container.with-border {
  border-radius: 4px;
}

.base-table__table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #aca5a542;
}

.base-table__table thead {
  border-bottom: 1px solid #ccc8c885;
}

.base-table__table th {
  padding: 0.75rem;
  text-align: left;
}

.base-table__table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ccc8c885;
}

.base-table__table th {
  font-weight: 600;
  position: relative;
}

.base-table__table th.sortable {
  cursor: pointer;
  user-select: none;
}

.column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sort-indicator {
  margin-left: 0.5rem;
}

.icon {
  width: 12px;
  height: 12px;
}

.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}

.table-striped tbody tr:nth-child(even) {
}

.table-hover tbody tr:hover {
  background-color: #ccc8c827;
  transition: 1s;
}

.table-condensed th,
.table-condensed td {
  padding: 0.5rem;
}

.select-column {
  width: 40px;
  text-align: center;
}

.actions-column {
  display: flex;
  justify-content: center;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding: 0.5rem 0;
}

.selected-info {
  color: #6c757d;
  font-size: 0.875rem;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.pagination-info {
  color: #6c757d;
  font-size: 0.875rem;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-btn {
  padding: 0.375rem 0.75rem;
  border: 1px solid #dee2e6;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.pagination-page {
  font-size: 0.875rem;
}

.page-size-selector select {
  padding: 0.375rem 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background: white;
}

/* Responsive */
@media (max-width: 768px) {
  .table-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .header-actions {
    justify-content: space-between;
  }

  .table-footer {
    flex-direction: column;
    gap: 1rem;
  }

  .pagination {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
