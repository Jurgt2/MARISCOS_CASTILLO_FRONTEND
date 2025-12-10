import { useState, useEffect } from 'react'
import { Table } from '../store/orderStore'
import { useOrderStore } from '../store/orderStore'
import toast from 'react-hot-toast'
import api from '../services/api'

interface TableMapProps {
  tables: Table[]
  selectedTables: Table[]
  setSelectedTables: (tables: Table[]) => void
  onTableUpdate: () => void
}

const TableMap = ({ tables, onTableUpdate }: TableMapProps) => {
  const { currentTable, setCurrentTable, setCurrentOrder, clearOrder } = useOrderStore()

  const handleTableClick = async (table: Table) => {
    let updatedTables: Table[] = [];
    if (table.status === 'DISPONIBLE') {
      if (!currentTable || currentTable.id !== table.id) {
        setCurrentTable(table)
      }
      clearOrder()
      toast.success(`Mesa ${table.number} seleccionada`)
      // Selección múltiple
      if (table && table.id) {
        if (Array.isArray(selectedTables)) {
          if (selectedTables.some(t => t.id === table.id)) {
            updatedTables = selectedTables.filter(t => t.id !== table.id)
          } else {
            updatedTables = [...selectedTables, table]
          }
        } else {
          updatedTables = [table]
        }
        setSelectedTables(updatedTables)
      }
    } else if (table.status === 'OCUPADA') {
      try {
        const response = await api.get(`/orders/table/${table.id}`)
        setCurrentTable(table)
        setCurrentOrder(response.data)
        toast.success(`Orden de mesa ${table.number} cargada`)
      } catch (error) {
        toast.error('Error al cargar la orden')
      }
    }
  }

  const getTableColor = (status: string) => {
    switch (status) {
      case 'DISPONIBLE':
        return 'bg-success hover:bg-success/80'
      case 'OCUPADA':
        return 'bg-error hover:bg-error/80'
      case 'RESERVADA':
        return 'bg-warning hover:bg-warning/80'
      default:
        return 'bg-gray-400'
    }
  }

  const getTableIcon = (capacity: number) => {
    if (capacity <= 2) return '👥'
    if (capacity <= 4) return '👨‍👩‍👦‍👦'
    return '👨‍👩‍👧‍👦👨‍👩‍👧‍👦'
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {tables.map((table) => {
        const isSelected = selectedTables.some(t => t.id === table.id)
        return (
          <div
            key={table.id}
            onClick={() => handleTableClick(table)}
            className={`table-card ${getTableColor(table.status)} ${
              isSelected ? 'ring-4 ring-primary' : ''
            } rounded-xl p-6 text-white shadow-lg text-center cursor-pointer`}
          >
            <div className="text-3xl mb-2">{getTableIcon(table.capacity)}</div>
            <div className="font-bold text-lg">Mesa {table.number}</div>
            <div className="text-sm">{table.capacity} personas</div>
            <div className="text-xs mt-2">{table.status}</div>
            {isSelected && <div className="mt-2 w-4 h-4 rounded-full bg-primary mx-auto"></div>}
          </div>
        )
      })}
    </div>
  )
}

export default TableMap
