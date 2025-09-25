import { TechName } from '@/shared/config/constants/technologies'
import { Award, GraduationCap, Medal } from 'lucide-react'
import { FC } from 'react'

export type AchievementType = keyof typeof achievementCat
export const achievementCat = {
  Título: 10,
  Bootcamp: 8,
  Certificado: 9
} as const

export const achievementIcons: Record<AchievementType, FC> = {
  Título: GraduationCap,
  Certificado: Award,
  Bootcamp: Medal
} as const

export type SkillDomain = keyof typeof skillDomainCategories
export const skillDomainCategories = {
  Fullstack: 10,
  Cloud: 9,
  Backend: 8,
  Frontend: 8,
  'Base de datos': 8,
  Diseño: 8
} as const

export type DevContribution = keyof typeof devContribution
export const devContribution = {
  Especializado: 10,
  Aplicables: 8,
  Fundamentos: 6
} as const

export const devContributionColor = {
  Especializado: 'var(--gr-from)',
  Aplicables: 'var(--gr-via)',
  Fundamentos: 'var(--gr-to)'
} as const

export const devContributionMapper: Partial<Record<DevContribution, string>> = {
  Aplicables: 'applicable',
  Especializado: 'specialized',
  Fundamentos: 'fundamentals'
}

export type AchievementWeight = keyof typeof achievementWeight
export const achievementWeight = {
  low: 1,
  medium: 2,
  high: 3,
  veryHigh: 4
} as const

export type Achievements = {
  path: string
  name: string
  achievementType: AchievementType
  skillDomain: SkillDomain[]
  technologies: TechName[]
  acquisitionDate: string
  devContribution: DevContribution
  weight: AchievementWeight
  AdditionalImages?: string[]
}

export const defaultPriorityOrder = ['Contribución', 'Skill', 'Fecha', 'Nombre'] as const
export type OrderBy = (typeof defaultPriorityOrder)[number]
export type OrderDirection = 'asc' | 'desc'

export const FIELD_DEFAULT_DIR: Partial<Record<OrderBy, OrderDirection>> = {
  Contribución: 'desc',
  Skill: 'desc',
  Fecha: 'desc',
  Nombre: 'asc'
}

type IssueDate = { from?: string; to?: string }

export type FiltersAchievements = {
  achievementType?: AchievementType
  skillDomain?: SkillDomain[]
  technologies?: TechName[]
  acquisitionRange?: IssueDate
  devContribution?: DevContribution
  orderBy?: OrderBy[]
  orderDirection?: OrderDirection
}
