import { API_ROOT } from "@/app/utillities/const"
import { Menu } from "@/app/types/menu"

export const getMenu = async (isAdmin?: boolean) => {
  const res = await fetch(`${API_ROOT}/menu/${isAdmin ? 'admin' : ''}`)
  const data = await res.json()
  return data as Menu[]
}