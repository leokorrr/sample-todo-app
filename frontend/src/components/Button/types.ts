export interface IButton {
  onClick?: () => void
  title: string
  isLoading?: boolean
  isDisabled?: boolean
  variation?: 'primary' | 'danger'
  type?: 'submit' | 'button'
}

export type ButtonStates = 'idle' | 'busy' | 'disabled'