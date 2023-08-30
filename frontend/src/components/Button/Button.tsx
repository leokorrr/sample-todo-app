import React, { useEffect, useState } from 'react'
import { ButtonStates, IButton } from './types'

const BUTTON_VARIATIONS = {
  danger: 'bg-red-500 px-[12px] disabled:bg-red-500/[.5]',
  primary: 'bg-blue-500 px-[20px] disabled:bg-blue-500/[.5]'
}

export const Button: React.FC<IButton> = (props) => {
  const {
    onClick = () => {},
    title,
    isLoading = false,
    isDisabled = false,
    variation = 'primary',
    type = 'button'
  } = props

  const [buttonState, setButtonState] = useState<ButtonStates>('idle')

  const disabledCondition = buttonState === 'disabled' || buttonState === 'busy'

  const handleButtonClick = () => onClick()

  useEffect(() => {
    if (isLoading) {
      setButtonState('busy')
    } else {
      setButtonState('idle')
    }
  }, [isLoading])

  useEffect(() => {
    if (isDisabled) {
      setButtonState('disabled')
    } else {
      setButtonState('idle')
    }
  }, [isDisabled])

  return (
    <button
      type={type}
      className={`text-[14px] py-[6px] ${BUTTON_VARIATIONS[variation]}`}
      onClick={handleButtonClick}
      disabled={disabledCondition}
    >
      {title}
    </button>
  )
}
